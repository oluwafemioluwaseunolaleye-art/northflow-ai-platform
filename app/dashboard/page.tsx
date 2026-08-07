import type { Metadata } from "next";
import { DashboardTopbar } from "@/components/navigation";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { AICommandCenter } from "@/components/dashboard/AICommandCenter";
import { getDashboardMetrics, getGreeting } from "@/lib/dashboard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard — NorthFlow AI" };

export default async function DashboardOverviewPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName =
    (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "there";

  const metrics = await getDashboardMetrics();

  return (
    <>
      <DashboardTopbar title="Dashboard" />
      <div className="px-5 py-8 lg:px-8">
        <h1 className="font-display text-2xl text-foreground sm:text-3xl">
          {getGreeting()}, {firstName}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Here&apos;s what&apos;s happening across your automation systems.
        </p>

        <div className="mt-8">
          <MetricsGrid metrics={metrics} />
        </div>

        <div className="mt-6">
          <AICommandCenter metrics={metrics} />
        </div>
      </div>
    </>
  );
}
