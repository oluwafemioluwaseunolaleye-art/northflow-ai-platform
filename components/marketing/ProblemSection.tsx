"use client";

import { motion } from "framer-motion";
import { Eyebrow, Section, Card } from "@/components/ui";
import { fadeUp, staggerChildren } from "@/styles/motion";

const problems = [
  {
    title: "Leads go cold waiting on a reply",
    body: "By the time someone follows up, the prospect has already moved on to a competitor.",
  },
  {
    title: "Good leads get buried with bad ones",
    body: "Without qualification, your team spends its best hours on the wrong conversations.",
  },
  {
    title: "Scheduling eats the momentum",
    body: "Every extra email to find a time is a chance for the prospect to change their mind.",
  },
];

export function ProblemSection() {
  return (
    <Section tone="light">
      <Eyebrow>The Problem</Eyebrow>
      <h2 className="mt-4 max-w-xl font-display text-3xl text-foreground sm:text-4xl">
        Speed and judgment rarely come from the same process.
      </h2>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {problems.map((problem) => (
          <motion.div key={problem.title} variants={fadeUp}>
            <Card className="h-full transition-transform duration-300 hover:-translate-y-1">
              <h3 className="font-display text-lg text-foreground">{problem.title}</h3>
              <p className="mt-3 text-sm text-muted">{problem.body}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
