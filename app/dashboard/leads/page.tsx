import type { Metadata } from "next";
import { Users } from "lucide-react";
import { DashboardTopbar } from "@/components/navigation";
import { EmptyState } from "@/components/ui";
import { LeadsToolbar } from "@/components/leads/LeadsToolbar";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { getLeads, type LeadsQuery } from "@/lib/leads";
import type { LeadStatus } from "@/types/leads";

export const metadata: Metadata = { title: "Leads — NorthFlow AI" };

interface LeadsPageProps {
  searchParams: {
    search?: string;
    status?: string;
    sortBy?: string;
    sortDir?: string;
  };
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const status = (searchParams.status as LeadStatus | "all" | undefined) ?? "all";
  const sortBy = (searchParams.sortBy as LeadsQuery["sortBy"]) ?? "date";
  const sortDir = (searchParams.sortDir as LeadsQuery["sortDir"]) ?? "desc";
  const search = searchParams.search ?? "";

  const { leads, hasTable } = await getLeads({ search, status, sortBy, sortDir });
  const isFiltered = Boolean(search) || status !== "all";

  return (
    <>
      <DashboardTopbar title="Leads" />
      <div className="px-5 py-8 lg:px-8">
        <h1 className="font-display text-xl text-foreground lg:hidden">Leads</h1>

        <div className="mt-4 lg:mt-0">
          <LeadsToolbar search={search} status={status} sortBy={sortBy} sortDir={sortDir} />
        </div>

        <div className="mt-6">
          {!hasTable ? (
            <EmptyState
              icon={Users}
              title="No leads table yet"
              description="Run the leads migration (supabase/migrations/0002_leads.sql) against your Supabase project to start capturing leads."
            />
          ) : leads.length === 0 ? (
            <EmptyState
              icon={Users}
              title={isFiltered ? "No leads match your filters" : "No leads yet"}
              description={
                isFiltered
                  ? "Try a different search term or clear the status filter."
                  : "Leads captured from your intake forms and automations will show up here."
              }
            />
          ) : (
            <LeadsTable leads={leads} />
          )}
        </div>
      </div>
    </>
  );
}
