import type { Metadata } from "next";
import { DashboardPagePlaceholder } from "@/components/dashboard/PagePlaceholder";

export const metadata: Metadata = { title: "Profile — NorthFlow AI" };

export default function ProfilePage() {
  return (
    <DashboardPagePlaceholder
      title="Profile"
      description="Personal account details and preferences will be managed here."
    />
  );
}
