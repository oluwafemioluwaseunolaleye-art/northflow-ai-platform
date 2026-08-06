import type { Metadata } from "next";
import { DashboardPagePlaceholder } from "@/components/dashboard/PagePlaceholder";

export const metadata: Metadata = { title: "Integrations — NorthFlow AI" };

export default function IntegrationsPage() {
  return (
    <DashboardPagePlaceholder
      title="Integrations"
      description="Connections to CRMs, calendars, and email providers will be managed here."
    />
  );
}
