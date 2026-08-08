import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type {
  Lead,
  LeadStatus,
  LeadNote,
  LeadEmailActivity,
  LeadAppointment,
  LeadAutomationActivity,
} from "@/types/leads";

export interface LeadsQuery {
  search?: string;
  status?: LeadStatus | "all";
  sortBy?: "date" | "name" | "budget" | "status";
  sortDir?: "asc" | "desc";
}

const SORT_COLUMNS: Record<NonNullable<LeadsQuery["sortBy"]>, string> = {
  date: "created_at",
  name: "name",
  budget: "budget",
  status: "status",
};

interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: number | string | null;
  timeline: string | null;
  description: string | null;
  status: LeadStatus;
  qualification_status: Lead["qualificationStatus"];
  qualification_score: number | null;
  qualification_reason: string | null;
  qualified_at: string | null;
  created_at: string;
  updated_at: string;
}

function mapLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    service: row.service,
    budget: row.budget !== null ? Number(row.budget) : null,
    timeline: row.timeline,
    description: row.description,
    status: row.status,
    qualificationStatus: row.qualification_status,
    qualificationScore: row.qualification_score,
    qualificationReason: row.qualification_reason,
    qualifiedAt: row.qualified_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Server-rendered list query — search, status filter, and sort all happen
 * in the database, driven by URL search params (see LeadsToolbar). Returns
 * an empty list (not an error) if the `leads` table doesn't exist yet or
 * Supabase isn't configured.
 */
export async function getLeads(query: LeadsQuery): Promise<{ leads: Lead[]; hasTable: boolean }> {
  try {
    const supabase = createClient();
    let q = supabase.from("leads").select("*");

    if (query.search) {
      // Commas are the `.or()` filter separator — strip them so a search
      // containing one doesn't corrupt the filter string.
      const term = query.search.replace(/,/g, "").trim();
      if (term) {
        q = q.or(`name.ilike.%${term}%,company.ilike.%${term}%,email.ilike.%${term}%`);
      }
    }

    if (query.status && query.status !== "all") {
      q = q.eq("status", query.status);
    }

    const column = SORT_COLUMNS[query.sortBy ?? "date"];
    q = q.order(column, { ascending: query.sortDir === "asc" });

    const { data, error } = await q;
    if (error) return { leads: [], hasTable: false };

    return { leads: (data ?? []).map(mapLead), hasTable: true };
  } catch {
    return { leads: [], hasTable: false };
  }
}

export const getLeadById = cache(async (id: string): Promise<Lead | null> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
    if (error || !data) return null;
    return mapLead(data);
  } catch {
    return null;
  }
});

export interface LeadActivity {
  notes: LeadNote[];
  emails: LeadEmailActivity[];
  appointments: LeadAppointment[];
  automationActivity: LeadAutomationActivity[];
}

const EMPTY_ACTIVITY: LeadActivity = {
  notes: [],
  emails: [],
  appointments: [],
  automationActivity: [],
};

/**
 * Pulls all four activity feeds for a lead in parallel. Each query fails
 * independently into an empty array — a missing `lead_emails` table, say,
 * shouldn't blank out notes that do exist.
 */
export async function getLeadActivity(leadId: string): Promise<LeadActivity> {
  try {
    const supabase = createClient();

    const [notesRes, emailsRes, appointmentsRes, automationRes] = await Promise.all([
      supabase
        .from("lead_notes")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false }),
      supabase
        .from("lead_emails")
        .select("*")
        .eq("lead_id", leadId)
        .order("sent_at", { ascending: false }),
      supabase
        .from("appointments")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false }),
      supabase
        .from("automation_activity")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false }),
    ]);

    return {
      notes: notesRes.error
        ? []
        : (notesRes.data ?? []).map((r) => ({
            id: r.id,
            leadId: r.lead_id,
            content: r.content,
            createdAt: r.created_at,
          })),
      emails: emailsRes.error
        ? []
        : (emailsRes.data ?? []).map((r) => ({
            id: r.id,
            leadId: r.lead_id,
            direction: r.direction,
            subject: r.subject,
            snippet: r.snippet,
            sentAt: r.sent_at,
          })),
      appointments: appointmentsRes.error
        ? []
        : (appointmentsRes.data ?? []).map((r) => ({
            id: r.id,
            leadId: r.lead_id,
            scheduledAt: r.scheduled_at,
            status: r.status,
            notes: r.notes,
            createdAt: r.created_at,
          })),
      automationActivity: automationRes.error
        ? []
        : (automationRes.data ?? []).map((r) => ({
            id: r.id,
            leadId: r.lead_id,
            automationName: r.automation_name,
            action: r.action,
            createdAt: r.created_at,
          })),
    };
  } catch {
    return EMPTY_ACTIVITY;
  }
}
