import { DashboardSidebar, DashboardMobileNav } from "@/components/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardMobileNav />
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </div>
  );
}
