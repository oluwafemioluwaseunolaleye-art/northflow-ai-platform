"use client";

import { useState, useTransition } from "react";
import { FlaskConical } from "lucide-react";
import { testAutomation } from "@/lib/actions/automations";

export function TestRunButton({
  automationId,
  automationName,
}: {
  automationId: string;
  automationName: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ status: string; score: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);
    startTransition(async () => {
      try {
        const res = await testAutomation(automationId, automationName);
        setResult({ status: res.status, score: res.score });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Test run failed.");
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/10 disabled:opacity-50"
      >
        <FlaskConical size={14} strokeWidth={1.75} />
        {isPending ? "Running test..." : "Test"}
      </button>
      {error && <p className="mt-2 max-w-xs text-xs text-red-500">{error}</p>}
      {result && (
        <p className="mt-2 max-w-xs text-xs text-muted">
          Test result:{" "}
          <span className="font-medium text-foreground">{result.status.replace("_", " ")}</span> (score{" "}
          {result.score}/100). No real email, Airtable, or Slack actions were sent.
        </p>
      )}
    </div>
  );
}
