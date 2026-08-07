import type { Metadata } from "next";
import { updatePassword } from "@/lib/actions/auth";
import { AuthAlert } from "@/components/ui";

export const metadata: Metadata = { title: "Set New Password — NorthFlow AI" };

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">Set a new password</h1>
      <p className="mt-2 text-sm text-muted">Choose a new password for your account.</p>

      <div className="mt-6">
        <AuthAlert error={searchParams.error} />
      </div>

      <form action={updatePassword} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm text-foreground/80">
            New password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="h-11 rounded-lg border border-border bg-background/40 px-3 text-sm text-foreground outline-none focus:border-gold"
          />
          <span className="text-xs text-muted">At least 8 characters.</span>
        </div>

        <button
          type="submit"
          className="mt-2 h-11 rounded-full bg-gold text-sm font-medium text-midnight shadow-gold transition-colors hover:bg-gold-light"
        >
          Update password
        </button>
      </form>
    </div>
  );
}
