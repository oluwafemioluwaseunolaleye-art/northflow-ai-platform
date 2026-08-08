import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { DashboardTopbar } from "@/components/navigation";
import { EmptyState } from "@/components/ui";
import { WorkflowVisualization } from "@/components/automations/WorkflowVisualization";
import { AutomationCard } from "@/components/automations/AutomationCard";
import { EmailTemplateEditor } from "@/components/automations/EmailTemplateEditor";
import { ArchitectureDiagram } from "@/components/automations/ArchitectureDiagram";
import { getAutomations, getEmailTemplates } from "@/lib/automations";

export const metadata: Metadata = { title: "Automations — NorthFlow AI" };

export default async function AutomationsPage() {
  const [{ automations, hasTable }, templates] = await Promise.all([
    getAutomations(),
    getEmailTemplates(),
  ]);

  const primary = automations.find((a) => a.name === "AI Qualification") ?? automations[0];

  return (
    <>
      <DashboardTopbar title="Automations" />
      <div className="px-5 py-8 lg:px-8">
        <h1 className="font-display text-xl text-foreground lg:hidden">Automations</h1>

        <section className="mt-4 lg:mt-0">
          <h2 className="text-xs font-medium uppercase tracking-wide2 text-gold">
            Lead Qualification Workflow
          </h2>
          <div className="mt-4">
            <WorkflowVisualization active={primary?.active ?? true} />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-medium uppercase tracking-wide2 text-gold">Automations</h2>
          <div className="mt-4">
            {!hasTable ? (
              <EmptyState
                icon={Zap}
                title="No automations table yet"
                description="Run supabase/migrations/0003_automations_and_templates.sql against your Supabase project to enable this section."
              />
            ) : automations.length === 0 ? (
              <EmptyState
                icon={Zap}
                title="No automations yet"
                description="Automations you build will show up here."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {automations.map((automation) => (
                  <AutomationCard key={automation.id} automation={automation} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-medium uppercase tracking-wide2 text-gold">Email Templates</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <EmailTemplateEditor
              templateKey="qualified"
              template={templates.qualified}
              label="Qualified Leads"
            />
            <EmailTemplateEditor
              templateKey="not_qualified"
              template={templates.not_qualified}
              label="Not Qualified Leads"
            />
          </div>
        </section>

        <section className="mt-10">
          <ArchitectureDiagram />
        </section>
      </div>
    </>
  );
}
