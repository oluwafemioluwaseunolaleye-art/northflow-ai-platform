import Link from "next/link";
import { Section } from "@/components/ui";
import { marketingCta } from "@/lib/constants";

export function CTASection() {
  return (
    <Section tone="dark" className="text-center">
      <div className="mx-auto max-w-xl">
        <h2 className="font-display text-3xl text-foreground sm:text-4xl">
          See what NorthFlow AI finds in your funnel.
        </h2>
        <p className="mt-4 text-sm text-muted sm:text-base">
          A free AI audit — no commitment, just a clear look at where leads
          are slipping through.
        </p>
        <Link
          href={marketingCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-sm font-medium tracking-wide text-midnight shadow-gold transition-colors hover:bg-gold-light"
        >
          {marketingCta.label}
        </Link>
      </div>
    </Section>
  );
}
