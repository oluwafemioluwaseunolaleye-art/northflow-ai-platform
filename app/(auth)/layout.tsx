import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center bg-background px-5 py-16">
      <Link href="/" className="mb-10 font-display text-xl text-foreground">
        NorthFlow <span className="text-gold">AI</span>
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-elevated">
        {children}
      </div>
    </div>
  );
}
