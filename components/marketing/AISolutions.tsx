"use client";

import { motion } from "framer-motion";
import { Brain, MessageSquareText, CalendarClock, BarChart3 } from "lucide-react";
import { Eyebrow, Section, Card } from "@/components/ui";
import { fadeUp, staggerChildren } from "@/styles/motion";

const solutions = [
  {
    icon: Brain,
    title: "AI Lead Qualification",
    body: "Every inbound lead is scored against your ideal customer profile in seconds.",
  },
  {
    icon: MessageSquareText,
    title: "Automated Follow-Up",
    body: "Sequenced outreach across email and SMS, written in your voice.",
  },
  {
    icon: CalendarClock,
    title: "Appointment Booking",
    body: "Qualified leads land directly on your calendar — no coordination required.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    body: "See exactly where leads convert, stall, or drop off across the funnel.",
  },
];

export function AISolutions() {
  return (
    <Section tone="light">
      <Eyebrow>AI Solutions</Eyebrow>
      <h2 className="mt-4 max-w-xl font-display text-3xl text-foreground sm:text-4xl">
        Every stage of the funnel, handled with the same care.
      </h2>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-14 grid gap-6 sm:grid-cols-2"
      >
        {solutions.map((solution) => {
          const Icon = solution.icon;
          return (
            <motion.div key={solution.title} variants={fadeUp}>
              <Card className="flex h-full items-start gap-4 transition-shadow duration-300 hover:shadow-gold">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground">{solution.title}</h3>
                  <p className="mt-2 text-sm text-muted">{solution.body}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
