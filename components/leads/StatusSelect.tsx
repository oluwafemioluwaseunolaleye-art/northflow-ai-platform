"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus } from "@/lib/actions/leads";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/types/leads";

export function StatusSelect({ leadId, currentStatus }: { leadId: string; currentStatus: LeadStatus }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const status = event.target.value as LeadStatus;
    setError(null);
    startTransition(async () => {
      try {
        await updateLeadStatus(leadId, status);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update status.");
      }
    });
  }

  return (
    <div>
      <select
        defaultValue={currentStatus}
        onChange={handleChange}
        disabled={isPending}
        className="h-10 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground outline-none focus:border-gold disabled:opacity-60"
      >
        {LEAD_STATUSES.map((status) => (
          <option key={status} value={status}>
            {LEAD_STATUS_LABELS[status]}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
