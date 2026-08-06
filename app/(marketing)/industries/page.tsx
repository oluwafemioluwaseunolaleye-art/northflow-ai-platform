import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = { title: "Industries — NorthFlow AI" };

export default function IndustriesPage() {
  return (
    <PageHero
      eyebrow="Industries"
      title="Tuned to the way your industry sells."
      description="Industry-specific detail on how NorthFlow AI adapts to different sales motions is coming to this page."
    />
  );
}
