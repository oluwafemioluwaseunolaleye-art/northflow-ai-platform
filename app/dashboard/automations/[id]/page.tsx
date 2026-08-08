import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardTopbar } from "@/components/navigation";
import { Card } from "@/components/ui";
import { StatusPill } from "@/components/automations/StatusPill";
import { PauseToggleButton } from "@/components/automations/PauseToggleButton";
import { TestRunButton } from "@/components/automations/TestRunButton";
import { EditAutomationForm } from "@/components/automations/EditAutomationForm";
import { ActionsList } from "@/components/automations/ActionsList";
import { ActivityList } from "@/components/automations/ActivityList";
import { WorkflowVisualization } from "@/components/automations/WorkflowVisualization";
import { getAutomationById, getAutomationActivity } from "@/lib/automations";

interface AutomationDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: AutomationDetailPageProps): Promise<Metadata> {
  const automation = await getAutomationById(params.id);
  return { title: automation ? `${automation.name} — NorthFlow AI` : "Automation — NorthFlow AI" };
}

export default async function AutomationDetailPage({ params }: AutomationDetailPageProps) {
  const automation = await getAutomationById(params.id);
  if (!automation) notFound();

  const activity = await getAutomationActivity(automation.name);

  return (
    <>
      <DashboardTopbar title={automation.name} />
      <div className="px-5 py-8 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-display text-xl text-foreground">{automation.name}</h1>
            <div className="mt-2">
              <StatusPill active={automation.active} />
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-2">
            <PauseToggleButton id={automation.id} active={automation.active} />
            <TestRunButton automationId={automation.id} automationName={automation.name} />
          </div>
        </div>

        <EditAutomationForm automation={automation} />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xs font-medium uppercase tracking-wide2 text-gold">Trigger</h2>
            <p className="mt-3 text-sm text-foreground">{automation.triggerLabel ?? "—"}</p>
          </Card>
          <Card>
            <h2 className="text-xs font-medium uppercase tracking-wide2 text-gold">Actions</h2>
            <div className="mt-3">
              <ActionsList actions={automation.actions} />
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <WorkflowVisualization active={automation.active} />
        </div>

        <div className="mt-6">
          <Card>
            <h2 className="text-xs font-medium uppercase tracking-wide2 text-gold">Activity</h2>
            <div className="mt-4">
              <ActivityList items={activity} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
