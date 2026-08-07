import type { Metadata } from "next";
import Link from "next/link";
import { signIn } from "@/lib/actions/auth";
import { AuthAlert } from "@/components/ui";

export const metadata: Metadata = { title: "Log In — NorthFlow AI" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string; redirectTo?: string };
}) {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">Log in</h1>
      <p className="mt-2 text-sm text-muted">Welcome back — enter your details to continue.</p>

      <div className="mt-6">
        <AuthAlert error={searchParams.error} message={searchParams.message} />
      </div>

      <form action={signIn} className="flex flex-col gap-4">
        <input type="hidden" name="redirectTo" value={searchParams.redirectTo ?? "/dashboard"} />

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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm text-foreground/80">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-gold hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="h-11 rounded-lg border border-border bg-background/40 px-3 text-sm text-foreground outline-none focus:border-gold"
          />
        </div>

        <button
          type="submit"
          className="mt-2 h-11 rounded-full bg-gold text-sm font-medium text-midnight shadow-gold transition-colors hover:bg-gold-light"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-gold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
