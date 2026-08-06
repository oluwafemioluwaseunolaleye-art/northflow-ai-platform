import Link from "next/link";
import { Container } from "@/components/ui";
import { marketingNavItems } from "@/lib/constants";

export function MarketingFooter() {
  return (
    <footer className="dark border-t border-border bg-background">
      <Container className="py-14">
        <div className="gold-rule mb-10" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xs">
            <span className="font-display text-lg text-foreground">
              NorthFlow <span className="text-gold">AI</span>
            </span>
            <p className="mt-3 text-sm text-muted">
              AI-driven automation for teams who expect precision, not noise.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {marketingNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-foreground/70 hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/login" className="text-sm text-foreground/70 hover:text-gold">
              Log in
            </Link>
          </nav>
        </div>

        <p className="mt-14 text-xs text-muted">
          © {new Date().getFullYear()} NorthFlow AI. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
