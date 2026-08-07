interface AuthAlertProps {
  error?: string;
  message?: string;
}

export function AuthAlert({ error, message }: AuthAlertProps) {
  if (!error && !message) return null;

  return (
    <div
      className={
        error
          ? "mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          : "mb-6 rounded-lg border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-foreground/90"
      }
    >
      {error ?? message}
    </div>
  );
}
