"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { qualifyLead } from "@/lib/ai/qualification";
import type { LeadStatus } from "@/types/leads";

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const supabase = createClient();
  const { error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", leadId);

  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard/leads");
}

/**
 * Runs the AI qualification workflow (see lib/ai/qualification.ts) for a
 * lead and persists the result, logging it as automation activity so it
 * shows up in the lead's Activity feed.
 */
export async function runQualification(leadId: string) {
  const supabase = createClient();

  const { data: lead, error: fetchError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .single();

  if (fetchError || !lead) {
    throw new Error(fetchError?.message ?? "Lead not found.");
  }

  const result = await qualifyLead({
    service: lead.service,
    company: lead.company,
    budget: lead.budget !== null ? Number(lead.budget) : null,
    timeline: lead.timeline,
    description: lead.description,
  });

  const { error: updateError } = await supabase
    .from("leads")
    .update({
      qualification_status: result.status,
      qualification_score: result.score,
      qualification_reason: result.reason,
      qualified_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (updateError) throw new Error(updateError.message);

  await supabase.from("automation_activity").insert({
    lead_id: leadId,
    automation_name: "AI Qualification",
    action: `Result: ${result.status.replace("_", " ")} (score ${result.score}/100) — ${result.reason}${
      result.source === "rules-fallback" ? " [rule-based fallback]" : ""
    }`,
  });

  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard/leads");
}

export async function addLeadNote(leadId: string, formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();
  if (!content) return;

  const supabase = createClient();
  const { error } = await supabase.from("lead_notes").insert({ lead_id: leadId, content });
  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/leads/${leadId}`);
}
