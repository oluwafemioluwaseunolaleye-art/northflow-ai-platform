import type { Metadata } from "next";
import Link from "next/link";
import { signUp } from "@/lib/actions/auth";
import { AuthAlert } from "@/components/ui";

export const metadata: Metadata = { title: "Sign Up — NorthFlow AI" };

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">Create your account</h1>
      <p className="mt-2 text-sm text-muted">Set up your NorthFlow AI workspace.</p>

      <div className="mt-6">
        <AuthAlert error={searchParams.error} />
      </div>

      <form action={signUp} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm text-foreground/80">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="h-11 rounded-lg border border-border bg-background/40 px-3 text-sm text-foreground outline-none focus:border-gold"
          />
        </div>

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

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm text-foreground/80">
            Password
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
          Create account
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-gold hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
