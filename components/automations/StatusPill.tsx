import { cn } from "@/lib/utils";

export function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        active ? "bg-emerald-500/10 text-emerald-600" : "bg-muted/10 text-muted"
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-emerald-500" : "bg-muted")} />
      {active ? "ACTIVE" : "PAUSED"}
    </span>
  );
}
