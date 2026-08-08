import { addLeadNote } from "@/lib/actions/leads";

export function AddNoteForm({ leadId }: { leadId: string }) {
  const action = addLeadNote.bind(null, leadId);

  return (
    <form action={action} className="flex gap-2">
      <input
        name="content"
        placeholder="Add a note..."
        required
        className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-gold"
      />
      <button
        type="submit"
        className="h-10 shrink-0 rounded-full bg-gold px-4 text-xs font-medium text-midnight transition-colors hover:bg-gold-light"
      >
        Add note
      </button>
    </form>
  );
}
