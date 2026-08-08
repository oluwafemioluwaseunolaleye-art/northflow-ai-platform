"use client";

import { useState, useTransition } from "react";
import { Pause, Play } from "lucide-react";
import { toggleAutomationActive } from "@/lib/actions/automations";

export function PauseToggleButton({ id, active }: { id: string; active: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);
    startTransition(async () => {
      try {
        await toggleAutomationActive(id, !active);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update.");
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-gold/50 disabled:opacity-50"
      >
        {active ? <Pause size={14} strokeWidth={1.75} /> : <Play size={14} strokeWidth={1.75} />}
        {isPending ? "Updating..." : active ? "Pause" : "Resume"}
      </button>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
