import type { Metadata } from "next";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/actions/auth";
import { AuthAlert } from "@/components/ui";

export const metadata: Metadata = { title: "Reset Password — NorthFlow AI" };

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string };
}) {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">Reset your password</h1>
      <p className="mt-2 text-sm text-muted">
        Enter your email and we&apos;ll send you a link to reset it.
      </p>

      <div className="mt-6">
        <AuthAlert error={searchParams.error} message={searchParams.message} />
      </div>

      <form action={requestPasswordReset} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-foreground/80">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11 rounded-lg border border-border bg-background/40 px-3 text-sm text-foreground outline-none focus:border-gold"
          />
        </div>

        <button
          type="submit"
          className="mt-2 h-11 rounded-full bg-gold text-sm font-medium text-midnight shadow-gold transition-colors hover:bg-gold-light"
        >
          Send reset link
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        <Link href="/login" className="text-gold hover:underline">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
