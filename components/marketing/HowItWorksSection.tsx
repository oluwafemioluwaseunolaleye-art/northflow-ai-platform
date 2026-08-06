"use client";

import { motion } from "framer-motion";
import { Eyebrow, Section } from "@/components/ui";
import { fadeUp, staggerChildren } from "@/styles/motion";

const steps = [
  {
    number: "01",
    title: "Connect your sources",
    body: "Your forms, ads, and inbox feed leads into NorthFlow automatically.",
  },
  {
    number: "02",
    title: "AI qualifies in real time",
    body: "Each lead is scored and enriched against your criteria within seconds.",
  },
  {
    number: "03",
    title: "Automation takes the next step",
    body: "Follow-up sequences trigger instantly, in your voice and on your schedule.",
  },
  {
    number: "04",
    title: "The call gets booked",
    body: "Qualified leads land directly on your calendar — ready for your team.",
  },
];

export function HowItWorksSection() {
  return (
    <Section tone="light">
      <Eyebrow>How It Works</Eyebrow>
      <h2 className="mt-4 max-w-xl font-display text-3xl text-foreground sm:text-4xl">
        Four steps. No manual handoffs.
      </h2>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {steps.map((step) => (
          <motion.div key={step.number} variants={fadeUp}>
            <span className="font-display text-3xl text-gold">{step.number}</span>
            <h3 className="mt-4 text-lg font-medium text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
