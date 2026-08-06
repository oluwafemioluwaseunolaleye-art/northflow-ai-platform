import type { Metadata } from "next";
import { DashboardPagePlaceholder } from "@/components/dashboard/PagePlaceholder";

export const metadata: Metadata = { title: "Dashboard — NorthFlow AI" };

export default function DashboardOverviewPage() {
  return (
    <DashboardPagePlaceholder
      title="Overview"
      description="Account activity, KPIs, and health at a glance will live here."
    />
  );
}
