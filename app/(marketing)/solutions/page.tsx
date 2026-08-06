import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = { title: "Solutions — NorthFlow AI" };

export default function SolutionsPage() {
  return (
    <PageHero
      eyebrow="Solutions"
      title="Built around how your team already works."
      description="A breakdown of NorthFlow's lead qualification, automation, and scheduling solutions is coming to this page."
    />
  );
}
