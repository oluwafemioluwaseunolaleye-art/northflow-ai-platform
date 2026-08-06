import { UserCircle } from "lucide-react";

export function DashboardTopbar({ title }: { title: string }) {
  return (
    <div className="hidden h-20 items-center justify-between border-b border-border px-8 lg:flex">
      <h1 className="text-xl font-medium text-foreground">{title}</h1>
      <div className="flex items-center gap-3 text-sm text-muted">
        <UserCircle size={22} strokeWidth={1.5} />
        <span>Account</span>
      </div>
    </div>
  );
}
