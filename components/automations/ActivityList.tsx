import { Zap } from "lucide-react";
import { EmptyState } from "@/components/ui";
import type { LeadAutomationActivity } from "@/types/leads";
import { formatDate } from "@/utils/format";

export function ActivityList({ items }: { items: LeadAutomationActivity[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={Zap}
        title="No activity yet"
        description="Runs of this automation — real or test — will show up here."
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id} className="rounded-lg border border-border/60 px-4 py-3">
          <p className="text-xs text-muted">{formatDate(item.createdAt)}</p>
          <p className="mt-1 text-sm text-foreground">{item.action}</p>
        </li>
      ))}
    </ul>
  );
}
