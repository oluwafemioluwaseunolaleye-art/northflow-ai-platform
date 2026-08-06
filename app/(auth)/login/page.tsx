import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Log In — NorthFlow AI" };

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">Log in</h1>
      <p className="mt-2 text-sm text-muted">
        Authentication is not wired up yet — this is a placeholder for the sign-in form.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <div className="h-11 rounded-lg border border-border bg-background/40" />
        <div className="h-11 rounded-lg border border-border bg-background/40" />
        <button
          type="button"
          disabled
          className="h-11 rounded-full bg-gold text-sm font-medium text-midnight opacity-60"
        >
          Log in
        </button>
      </div>

      <p className="mt-6 text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-gold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
