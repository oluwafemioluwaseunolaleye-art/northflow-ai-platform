import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui";

function Pipeline({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground">
            {step}
          </span>
          {i < steps.length - 1 && <ArrowRight size={14} strokeWidth={1.75} className="text-muted" />}
        </div>
      ))}
    </div>
  );
}

/**
 * Purely informational — documents where automation currently runs
 * (external, in production today) versus where it's headed as this app
 * takes over. Doesn't imply either pipeline is wired up inside this app.
 */
export function ArchitectureDiagram() {
  return (
    <Card>
      <h3 className="text-xs font-medium uppercase tracking-wide2 text-gold">
        Automation Architecture
      </h3>

      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide2 text-muted">
          Current (external, in production)
        </p>
        <div className="mt-2">
          <Pipeline steps={["Tally", "Airtable", "Make", "AI", "Qualification", "Email", "Airtable", "Slack"]} />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wide2 text-muted">
          Target (as this app takes over)
        </p>
        <div className="mt-2">
          <Pipeline steps={["Tally", "Make", "Supabase", "Web App"]} />
        </div>
      </div>

      <p className="mt-5 text-sm text-muted">
        This app doesn&apos;t replace the current pipeline yet — it&apos;s built to sit
        alongside it and take over piece by piece without breaking what&apos;s already running.
      </p>
    </Card>
  );
}
