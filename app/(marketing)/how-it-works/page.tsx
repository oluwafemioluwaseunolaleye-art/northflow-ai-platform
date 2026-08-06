import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = { title: "How It Works — NorthFlow AI" };

export default function HowItWorksPage() {
  return (
    <PageHero
      eyebrow="How It Works"
      title="From first contact to booked appointment."
      description="A walkthrough of the NorthFlow AI workflow — qualification, sequencing, and scheduling — is coming to this page."
    />
  );
}
