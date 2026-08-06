"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Eyebrow, Section } from "@/components/ui";
import { fadeUp, staggerChildren } from "@/styles/motion";

const reasons = [
  "Set up around your existing sales process, not a generic template",
  "AI qualification tuned to your actual ideal customer, not keyword matching",
  "Full visibility into every automated conversation — nothing happens silently",
  "A team you can reach, not a support ticket queue",
];

export function WhyUsSection() {
  return (
    <Section tone="dark">
      <Eyebrow>Why NorthFlow</Eyebrow>
      <h2 className="mt-4 max-w-xl font-display text-3xl text-foreground sm:text-4xl">
        Automation should feel like judgment, not guesswork.
      </h2>

      <motion.ul
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-12 grid max-w-2xl gap-5"
      >
        {reasons.map((reason) => (
          <motion.li key={reason} variants={fadeUp} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <Check size={14} strokeWidth={2} />
            </span>
            <span className="text-sm text-foreground/85 sm:text-base">{reason}</span>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
