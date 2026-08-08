import Link from "next/link";
import { Zap } from "lucide-react";
import { Card } from "@/components/ui";
import { StatusPill } from "./StatusPill";
import type { Automation } from "@/types/automations";

export function AutomationCard({ automation }: { automation: Automation }) {
  return (
    <Link href={`/dashboard/automations/${automation.id}`}>
      <Card className="h-full transition-shadow duration-300 hover:shadow-gold">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
            <Zap size={18} strokeWidth={1.75} />
          </div>
          <StatusPill active={automation.active} />
        </div>
        <h3 className="mt-4 font-display text-lg text-foreground">{automation.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {automation.description ?? "No description yet."}
        </p>
        {automation.triggerLabel && (
          <p className="mt-3 text-xs text-muted">Trigger: {automation.triggerLabel}</p>
        )}
      </Card>
    </Link>
  );
}
