import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
      <Icon size={28} strokeWidth={1.5} className="text-muted" />
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="max-w-sm text-sm text-muted">{description}</p>
    </div>
  );
}
