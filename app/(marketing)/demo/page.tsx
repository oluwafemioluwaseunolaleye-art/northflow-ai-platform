import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/ui";
import { TALLY_URL } from "@/lib/constants";

export const metadata: Metadata = { title: "Book a Free AI Audit — NorthFlow AI" };

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Free AI Audit"
        title="See exactly where leads are slipping through."
        description="Fill out the form below and we'll walk your funnel with you — no commitment."
      />
      <Section tone="light" className="pt-0">
        <div className="overflow-hidden rounded-2xl border border-border shadow-elevated">
          <iframe
            src={`${TALLY_URL}?transparentBackground=1`}
            title="NorthFlow AI — Free AI Audit intake form"
            className="h-[900px] w-full"
            loading="lazy"
          />
        </div>
      </Section>
    </>
  );
}
