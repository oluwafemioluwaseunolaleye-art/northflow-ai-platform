import { Card } from "@/components/ui";
import type { DashboardMetrics } from "@/lib/dashboard";

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-4 last:border-0">
      <span className="text-xs font-medium uppercase tracking-wide2 text-muted">{label}</span>
      <span className="font-display text-xl text-foreground">{value}</span>
    </div>
  );
}

/**
 * The AI Command Center — a live systems-status panel. Every number reads
 * straight from getDashboardMetrics(); once leads/automations/appointments
 * tables exist in Supabase, these numbers update automatically with no
 * changes needed here.
 */
export function AICommandCenter({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <Card className="dark bg-background">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide2 text-muted">
          System Status
        </span>
        <span className="flex items-center gap-2 text-xs font-medium text-gold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          ONLINE
        </span>
      </div>

      <div className="mt-2">
        <StatRow label="Active Automations" value={String(metrics.activeAutomations)} />
        <StatRow label="Leads Processed" value={String(metrics.leadsProcessed)} />
        <StatRow label="Qualified" value={String(metrics.qualified)} />
        <StatRow label="Bookings" value={String(metrics.bookings)} />
      </div>

      {!metrics.hasData && (
        <p className="mt-4 text-xs text-muted">
          No activity yet — this panel will populate automatically once leads start flowing in.
        </p>
      )}
    </Card>
  );
}
