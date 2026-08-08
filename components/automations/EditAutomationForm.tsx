"use client";

import { useState, useTransition } from "react";
import { Pencil } from "lucide-react";
import { updateAutomation } from "@/lib/actions/automations";
import type { Automation } from "@/types/automations";

export function EditAutomationForm({ automation }: { automation: Automation }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(automation.name);
  const [description, setDescription] = useState(automation.description ?? "");
  const [actionsText, setActionsText] = useState(automation.actions.join("\n"));
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSave() {
    setError(null);
    const actions = actionsText
      .split("\n")
      .map((a) => a.trim())
      .filter(Boolean);

    startTransition(async () => {
      try {
        await updateAutomation(automation.id, { name, description, actions });
        setOpen(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save.");
      }
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-gold/50"
      >
        <Pencil size={14} strokeWidth={1.75} />
        Edit
      </button>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border p-4">
      <div>
        <label className="text-xs font-medium uppercase tracking-wide2 text-muted">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-gold"
        />
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wide2 text-muted">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
        />
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wide2 text-muted">
          Actions (one per line)
        </label>
        <textarea
          value={actionsText}
          onChange={(e) => setActionsText(e.target.value)}
          rows={6}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="h-9 rounded-full bg-gold px-4 text-xs font-medium text-midnight transition-colors hover:bg-gold-light disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="h-9 rounded-full border border-border px-4 text-xs font-medium text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
