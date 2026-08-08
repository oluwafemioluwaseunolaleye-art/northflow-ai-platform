import { cn } from "@/lib/utils";
import { LEAD_STATUS_LABELS, type LeadStatus } from "@/types/leads";

const STYLES: Record<LeadStatus, string> = {
  new: "bg-foreground/10 text-foreground",
  qualified: "bg-emerald-500/10 text-emerald-600",
  not_qualified: "bg-red-500/10 text-red-500",
  contacted: "bg-blue-500/10 text-blue-500",
  booked: "bg-gold/10 text-gold",
  closed: "bg-muted/10 text-muted",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", STYLES[status])}>
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}
