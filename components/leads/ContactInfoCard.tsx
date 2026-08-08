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

export function ContactInfoCard({ lead }: { lead: Lead }) {
  return (
    <Card>
      <h2 className="text-xs font-medium uppercase tracking-wide2 text-gold">
        Contact Information
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Field label="Name" value={lead.name} />
        <Field label="Email" value={lead.email} />
        <Field label="Phone" value={lead.phone} />
        <Field label="Company" value={lead.company} />
      </div>
    </Card>
  );
}
