export function ActionsList({ actions }: { actions: string[] }) {
  if (actions.length === 0) {
    return <p className="text-sm text-muted">No actions configured yet.</p>;
  }

  return (
    <ol className="flex flex-col gap-2">
      {actions.map((action, i) => (
        <li key={`${i}-${action}`} className="flex items-start gap-3 text-sm text-foreground">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-medium text-gold">
            {i + 1}
          </span>
          {action}
        </li>
      ))}
    </ol>
  );
}
