import { Eyebrow, Section } from "@/components/ui";

/**
 * Placeholder founder section. Real name, headshot, and bio copy should be
 * dropped in here once supplied — kept structurally ready rather than
 * inventing biographical details.
 */
export function FounderSection() {
  return (
    <Section tone="light">
      <Eyebrow>Founder</Eyebrow>
      <div className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-2xl text-gold">
          NF
        </div>
        <div>
          <h2 className="font-display text-2xl text-foreground">Founder Name</h2>
          <p className="mt-1 text-sm text-gold">Founder, NorthFlow AI</p>
          <p className="mt-4 max-w-xl text-sm text-muted">
            Founder bio to be added — the story behind why NorthFlow AI exists
            and the standard it&apos;s built to hold its automations to.
          </p>
        </div>
      </div>
    </Section>
  );
}
