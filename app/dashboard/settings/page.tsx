import type { Metadata } from "next";
import { DashboardPagePlaceholder } from "@/components/dashboard/PagePlaceholder";

export const metadata: Metadata = { title: "Settings — NorthFlow AI" };

export default function SettingsPage() {
  return (
    <DashboardPagePlaceholder
      title="Settings"
      description="Account, team, and workspace configuration will live here."
    />
  );
}
