import type { Metadata } from "next";
import { DashboardPagePlaceholder } from "@/components/dashboard/PagePlaceholder";

export const metadata: Metadata = { title: "Appointments — NorthFlow AI" };

export default function AppointmentsPage() {
  return (
    <DashboardPagePlaceholder
      title="Appointments"
      description="Booked appointments and calendar sync will be managed here."
    />
  );
}
