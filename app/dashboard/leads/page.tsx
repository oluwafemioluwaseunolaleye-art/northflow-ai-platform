import type { Metadata } from "next";
import { DashboardPagePlaceholder } from "@/components/dashboard/PagePlaceholder";

export const metadata: Metadata = { title: "Leads — NorthFlow AI" };

export default function LeadsPage() {
  return (
    <DashboardPagePlaceholder
      title="Leads"
      description="Captured leads, AI qualification scores, and status will be managed here."
    />
  );
}
