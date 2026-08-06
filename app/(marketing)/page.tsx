import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { AISolutions } from "@/components/marketing/AISolutions";
import { WorkflowVisualization } from "@/components/marketing/WorkflowVisualization";
import { InteractiveDemo } from "@/components/marketing/InteractiveDemo";
import { ChatDemo } from "@/components/marketing/ChatDemo";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { IntegrationsSection } from "@/components/marketing/IntegrationsSection";
import { IndustriesSection } from "@/components/marketing/IndustriesSection";
import { WhyUsSection } from "@/components/marketing/WhyUsSection";
import { FounderSection } from "@/components/marketing/FounderSection";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "NorthFlow AI — AI Automation for Discerning Teams",
  description:
    "NorthFlow AI qualifies leads, runs your follow-up, and books the appointment — automation with the discretion of someone who understands your business.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <AISolutions />
      <WorkflowVisualization />
      <InteractiveDemo />
      <ChatDemo />
      <HowItWorksSection />
      <IntegrationsSection />
      <IndustriesSection />
      <WhyUsSection />
      <FounderSection />
      <CTASection />
    </>
  );
}
