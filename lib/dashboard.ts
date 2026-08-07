import { createClient } from "@/lib/supabase/server";

export interface DashboardMetrics {
  totalLeads: number;
  qualified: number;
  bookings: number;
  /** Average response time in minutes, or null if there's no data yet. */
  responseTimeMinutes: number | null;
  activeAutomations: number;
  leadsProcessed: number;
  hasData: boolean;
}

const EMPTY_METRICS: DashboardMetrics = {
  totalLeads: 0,
  qualified: 0,
  bookings: 0,
  responseTimeMinutes: null,
  activeAutomations: 0,
  leadsProcessed: 0,
  hasData: false,
};

/**
 * Reads live counts from Supabase once the `leads`, `automations`, and
 * `appointments` tables exist (see supabase/migrations). Until that schema
 * is defined, every query below fails fast and we fall back to a clean
 * zeroed state — never fabricated numbers.
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const supabase = createClient();

    const [leadsRes, qualifiedRes, bookingsRes, automationsRes] = await Promise.all([
      supabase.from("leads").select("id", { count: "exact", head: true }),
      supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "qualified"),
      supabase.from("appointments").select("id", { count: "exact", head: true }),
      supabase.from("automations").select("id", { count: "exact", head: true }).eq("active", true),
    ]);

    if (leadsRes.error || qualifiedRes.error || bookingsRes.error || automationsRes.error) {
      return EMPTY_METRICS;
    }

    const totalLeads = leadsRes.count ?? 0;

    return {
      totalLeads,
      qualified: qualifiedRes.count ?? 0,
      bookings: bookingsRes.count ?? 0,
      responseTimeMinutes: null, // requires a timestamp diff query once the schema exists
      activeAutomations: automationsRes.count ?? 0,
      leadsProcessed: totalLeads,
      hasData: totalLeads > 0,
    };
  } catch {
    // Tables don't exist yet, or Supabase isn't configured — show a clean
    // empty state rather than an error screen.
    return EMPTY_METRICS;
  }
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
