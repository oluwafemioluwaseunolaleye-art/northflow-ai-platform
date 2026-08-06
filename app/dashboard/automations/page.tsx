import type { Metadata } from "next";
import { DashboardPagePlaceholder } from "@/components/dashboard/PagePlaceholder";

export const metadata: Metadata = { title: "Automations — NorthFlow AI" };

export default function AutomationsPage() {
  return (
    <DashboardPagePlaceholder
      title="Automations"
      description="Automation workflows and email sequences will be configured here."
    />
  );
}
