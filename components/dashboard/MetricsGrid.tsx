import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui";
import { Users, BadgeCheck, CalendarCheck, Timer } from "lucide-react";
import type { DashboardMetrics } from "@/lib/dashboard";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  isEmpty?: boolean;
}

function MetricCard({ icon: Icon, label, value, isEmpty }: MetricCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-muted">
        <Icon size={16} strokeWidth={1.75} />
        <span className="text-xs font-medium uppercase tracking-wide2">{label}</span>
      </div>
      <span className={isEmpty ? "font-display text-3xl text-muted" : "font-display text-3xl text-foreground"}>
        {value}
      </span>
    </Card>
  );
}

export function MetricsGrid({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        icon={Users}
        label="Total Leads"
        value={String(metrics.totalLeads)}
        isEmpty={metrics.totalLeads === 0}
      />
      <MetricCard
        icon={BadgeCheck}
        label="Qualified"
        value={String(metrics.qualified)}
        isEmpty={metrics.qualified === 0}
      />
      <MetricCard
        icon={CalendarCheck}
        label="Bookings"
        value={String(metrics.bookings)}
        isEmpty={metrics.bookings === 0}
      />
      <MetricCard
        icon={Timer}
        label="Response Time"
        value={metrics.responseTimeMinutes !== null ? `${metrics.responseTimeMinutes}m` : "—"}
        isEmpty={metrics.responseTimeMinutes === null}
      />
    </div>
  );
}
