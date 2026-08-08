import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Automation, EmailTemplate, EmailTemplateKey } from "@/types/automations";
import type { LeadAutomationActivity } from "@/types/leads";

interface AutomationRow {
  id: string;
  name: string;
  description: string | null;
  trigger_label: string | null;
  actions: string[] | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

function mapAutomation(row: AutomationRow): Automation {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    triggerLabel: row.trigger_label,
    actions: row.actions ?? [],
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAutomations(): Promise<{ automations: Automation[]; hasTable: boolean }> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("automations")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) return { automations: [], hasTable: false };
    return { automations: (data ?? []).map(mapAutomation), hasTable: true };
  } catch {
    return { automations: [], hasTable: false };
  }
}

export const getAutomationById = cache(async (id: string): Promise<Automation | null> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("automations").select("*").eq("id", id).single();
    if (error || !data) return null;
    return mapAutomation(data);
  } catch {
    return null;
  }
});

/**
 * Activity for a specific automation, matched by name (automation_activity
 * doesn't have a foreign key back to automations — see migration notes).
 * Includes both real runs and clearly-labeled test runs.
 */
export async function getAutomationActivity(automationName: string): Promise<LeadAutomationActivity[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("automation_activity")
      .select("*")
      .eq("automation_name", automationName)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) return [];
    return (data ?? []).map((r) => ({
      id: r.id,
      leadId: r.lead_id,
      automationName: r.automation_name,
      action: r.action,
      createdAt: r.created_at,
    }));
  } catch {
    return [];
  }
}

// Fallback copy — identical to the migration's defaults — so the editor
// still renders sensible content before the migration/table exists.
// updatedAt is epoch-zero so the UI can tell these apart from a real save.
const DEFAULT_TEMPLATES: Record<EmailTemplateKey, EmailTemplate> = {
  qualified: {
    key: "qualified",
    subject: "Let's find 30 minutes this week",
    body: "Hi {{first_name}},\n\nThanks for reaching out to NorthFlow AI — based on what you shared, this looks like a strong fit for what we do.\n\nI'd like to grab 30 minutes to walk through your goals and show you exactly how this would work for {{company}}.\n\n{{booking_link}}\n\nTalk soon,\nThe NorthFlow AI Team",
    bookingLink: "https://tally.so/r/jaX7Za",
    followUpInstructions: null,
    updatedAt: new Date(0).toISOString(),
  },
  not_qualified: {
    key: "not_qualified",
    subject: "Thanks for reaching out to NorthFlow AI",
    body: "Hi {{first_name}},\n\nThank you for telling us about {{company}} — we appreciate you taking the time.\n\nBased on what you've shared, we don't think now is the right time for us to work together, but we didn't want to leave you without a next step.\n\n{{resources_link}}\n\nIf your budget or timeline changes, we'd love to hear from you again.\n\nWarmly,\nThe NorthFlow AI Team",
    bookingLink: null,
    followUpInstructions: "Add lead to the 90-day nurture sequence and re-check budget/timeline automatically.",
    updatedAt: new Date(0).toISOString(),
  },
};

export async function getEmailTemplates(): Promise<Record<EmailTemplateKey, EmailTemplate>> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("email_templates").select("*");
    if (error || !data) return DEFAULT_TEMPLATES;

    const result = { ...DEFAULT_TEMPLATES };
    for (const row of data) {
      result[row.key as EmailTemplateKey] = {
        key: row.key,
        subject: row.subject,
        body: row.body,
        bookingLink: row.booking_link,
        followUpInstructions: row.follow_up_instructions,
        updatedAt: row.updated_at,
      };
    }
    return result;
  } catch {
    return DEFAULT_TEMPLATES;
  }
}
