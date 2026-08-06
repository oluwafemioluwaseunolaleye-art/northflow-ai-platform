import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = { title: "About — NorthFlow AI" };

export default function AboutPage() {
  return (
    <PageHero
      eyebrow="About"
      title="Why we built NorthFlow AI."
      description="The team, philosophy, and story behind NorthFlow AI will live on this page."
    />
  );
}
