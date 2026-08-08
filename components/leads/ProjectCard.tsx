import { Card } from "@/components/ui";
import type { Lead } from "@/types/leads";

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide2 text-muted">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value ?? "—"}</p>
    </div>
  );
}

export function ProjectCard({ lead }: { lead: Lead }) {
  return (
    <Card>
      <h2 className="text-xs font-medium uppercase tracking-wide2 text-gold">Project</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Field label="Service" value={lead.service} />
        <Field
          label="Budget"
          value={lead.budget !== null ? `$${lead.budget.toLocaleString()}` : null}
        />
        <Field label="Timeline" value={lead.timeline} />
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide2 text-muted">Description</p>
        <p className="mt-1 text-sm text-foreground">{lead.description ?? "—"}</p>
      </div>
    </Card>
  );
}
