import type { Metadata } from "next";
import { DashboardPagePlaceholder } from "@/components/dashboard/PagePlaceholder";

export const metadata: Metadata = { title: "Analytics — NorthFlow AI" };

export default function AnalyticsPage() {
  return (
    <DashboardPagePlaceholder
      title="Analytics"
      description="Reporting on leads, conversions, and automation performance will live here."
    />
  );
}
