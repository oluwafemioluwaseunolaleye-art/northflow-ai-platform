"use client";

import { useState, useTransition } from "react";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui";
import { runQualification } from "@/lib/actions/leads";
import { QUALIFICATION_LABELS, type Lead } from "@/types/leads";

const STATUS_COLOR: Record<string, string> = {
  qualified: "text-emerald-500",
  not_qualified: "text-red-500",
  needs_review: "text-gold",
};

export function QualificationPanel({ lead }: { lead: Lead }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleRun() {
    setError(null);
    startTransition(async () => {
      try {
        await runQualification(lead.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Qualification failed.");
      }
    });
  }

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xs font-medium uppercase tracking-wide2 text-gold">
          AI Qualification
        </h2>
        <button
          type="button"
          onClick={handleRun}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/10 disabled:opacity-50"
        >
          <Sparkles size={14} strokeWidth={1.75} />
          {isPending ? "Analyzing..." : lead.qualificationStatus ? "Re-run qualification" : "Run AI qualification"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      {lead.qualificationStatus ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide2 text-muted">Status</p>
            <p className={`mt-1 text-sm font-medium ${STATUS_COLOR[lead.qualificationStatus]}`}>
              {QUALIFICATION_LABELS[lead.qualificationStatus]}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide2 text-muted">Score</p>
            <p className="mt-1 text-sm text-foreground">
              {lead.qualificationScore !== null ? `${lead.qualificationScore}/100` : "—"}
            </p>
          </div>
          <div className="sm:col-span-3">
            <p className="text-xs font-medium uppercase tracking-wide2 text-muted">Reason</p>
            <p className="mt-1 text-sm text-foreground">{lead.qualificationReason}</p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">This lead hasn&apos;t been qualified yet.</p>
      )}
    </Card>
  );
}
