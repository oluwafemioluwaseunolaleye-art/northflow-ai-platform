"use client";

import { motion } from "framer-motion";
import { Eyebrow, Section } from "@/components/ui";
import { fadeUp, staggerChildren } from "@/styles/motion";

const integrations = [
  "Google Calendar",
  "Outlook",
  "HubSpot",
  "Salesforce",
  "Twilio",
  "Gmail",
  "Zapier",
  "Meta Ads",
];

export function IntegrationsSection() {
  return (
    <Section tone="dark">
      <Eyebrow>Integrations</Eyebrow>
      <h2 className="mt-4 max-w-xl font-display text-3xl text-foreground sm:text-4xl">
        Works with the tools you already run on.
      </h2>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {integrations.map((name) => (
          <motion.div
            key={name}
            variants={fadeUp}
            className="flex h-20 items-center justify-center rounded-xl border border-border text-center text-sm text-foreground/80 transition-colors hover:border-gold/50 hover:text-gold"
          >
            {name}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
