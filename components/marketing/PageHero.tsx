import { Section, Eyebrow } from "@/components/ui";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

/**
 * Lightweight header for marketing pages that don't yet have full content —
 * keeps placeholders on-brand instead of looking unfinished.
 */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <Section tone="dark" className="pb-16 pt-24 lg:pt-28">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-5 max-w-2xl font-display text-4xl text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-base text-muted">{description}</p>
    </Section>
  );
}
