"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { qualifyLead, type QualificationResult } from "@/lib/ai/qualification";
import type { EmailTemplateKey } from "@/types/automations";

export async function toggleAutomationActive(id: string, active: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from("automations")
    .update({ active, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/automations/${id}`);
  revalidatePath("/dashboard/automations");
}

export async function updateAutomation(
  id: string,
  updates: { name: string; description: string; actions: string[] }
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("automations")
    .update({
      name: updates.name,
      description: updates.description || null,
      actions: updates.actions,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/automations/${id}`);
  revalidatePath("/dashboard/automations");
}

/**
 * Test-runs the qualification step of this automation against a fixed
 * sample lead. This exercises the real qualifyLead() service — it does
 * NOT send a real email, write to Airtable, or post to Slack, since none
 * of those integrations exist yet. The result is logged as activity,
 * explicitly labeled as a test so it's never mistaken for a real run.
 */
export async function testAutomation(
  automationId: string,
  automationName: string
): Promise<QualificationResult> {
  const result = await qualifyLead({
    service: "Full Platform",
    company: "Sample Co.",
    budget: 6000,
    timeline: "2 weeks",
    description: "This is a sample lead used to test the automation end to end.",
  });

  const supabase = createClient();
  await supabase.from("automation_activity").insert({
    lead_id: null,
    automation_name: automationName,
    action: `TEST RUN — qualification result: ${result.status.replace("_", " ")} (score ${result.score}/100). No real email, Airtable, or Slack actions were sent.`,
  });

  revalidatePath(`/dashboard/automations/${automationId}`);
  return result;
}

export async function updateEmailTemplate(
  key: EmailTemplateKey,
  updates: { subject: string; body: string; bookingLink?: string; followUpInstructions?: string }
) {
  if (key === "not_qualified" && /you are not qualified/i.test(updates.body)) {
    throw new Error(
      'Keep the not-qualified template professional — remove "you are not qualified" from the body.'
    );
  }

  const supabase = createClient();
  const { error } = await supabase.from("email_templates").upsert(
    {
      key,
      subject: updates.subject,
      body: updates.body,
      booking_link: updates.bookingLink ?? null,
      follow_up_instructions: updates.followUpInstructions ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/automations");
}
