"use client";

import { motion } from "framer-motion";
import { Eyebrow, Section, Card } from "@/components/ui";
import { fadeUp, staggerChildren } from "@/styles/motion";

const industries = [
  { name: "Real Estate", body: "Qualify buyers and sellers before your agents ever pick up the phone." },
  { name: "Home Services", body: "Turn quote requests into booked jobs without the back-and-forth." },
  { name: "Financial Services", body: "Route high-intent prospects to the right advisor, instantly." },
  { name: "Coaching & Consulting", body: "Fill your calendar with calls that are actually worth taking." },
];

export function IndustriesSection() {
  return (
    <Section tone="light">
      <Eyebrow>Industries</Eyebrow>
      <h2 className="mt-4 max-w-xl font-display text-3xl text-foreground sm:text-4xl">
        Built for teams that sell on trust.
      </h2>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-14 grid gap-6 sm:grid-cols-2"
      >
        {industries.map((industry) => (
          <motion.div key={industry.name} variants={fadeUp}>
            <Card className="h-full">
              <h3 className="font-display text-lg text-foreground">{industry.name}</h3>
              <p className="mt-2 text-sm text-muted">{industry.body}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
