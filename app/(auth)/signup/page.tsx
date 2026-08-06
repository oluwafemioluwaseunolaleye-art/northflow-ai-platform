import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sign Up — NorthFlow AI" };

export default function SignupPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">Create your account</h1>
      <p className="mt-2 text-sm text-muted">
        Authentication is not wired up yet — this is a placeholder for the sign-up form.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <div className="h-11 rounded-lg border border-border bg-background/40" />
        <div className="h-11 rounded-lg border border-border bg-background/40" />
        <div className="h-11 rounded-lg border border-border bg-background/40" />
        <button
          type="button"
          disabled
          className="h-11 rounded-full bg-gold text-sm font-medium text-midnight opacity-60"
        >
          Create account
        </button>
      </div>

      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-gold hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
