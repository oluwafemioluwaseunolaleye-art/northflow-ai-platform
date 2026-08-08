import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardTopbar } from "@/components/navigation";
import { ContactInfoCard } from "@/components/leads/ContactInfoCard";
import { ProjectCard } from "@/components/leads/ProjectCard";
import { QualificationPanel } from "@/components/leads/QualificationPanel";
import { ActivityFeed } from "@/components/leads/ActivityFeed";
import { StatusSelect } from "@/components/leads/StatusSelect";
import { getLeadById, getLeadActivity } from "@/lib/leads";
import { formatDate } from "@/utils/format";

interface LeadDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: LeadDetailPageProps): Promise<Metadata> {
  const lead = await getLeadById(params.id);
  return { title: lead ? `${lead.name} — NorthFlow AI` : "Lead — NorthFlow AI" };
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const lead = await getLeadById(params.id);
  if (!lead) notFound();

  const activity = await getLeadActivity(lead.id);

  return (
    <>
      <DashboardTopbar title={lead.name} />
      <div className="px-5 py-8 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-xl text-foreground lg:hidden">{lead.name}</h1>
            <p className="text-sm text-muted">Lead since {formatDate(lead.createdAt)}</p>
          </div>
          <StatusSelect leadId={lead.id} currentStatus={lead.status} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ContactInfoCard lead={lead} />
          <ProjectCard lead={lead} />
        </div>

        <div className="mt-6">
          <QualificationPanel lead={lead} />
        </div>

        <div className="mt-6">
          <ActivityFeed leadId={lead.id} activity={activity} />
        </div>
      </div>
    </>
  );
}
