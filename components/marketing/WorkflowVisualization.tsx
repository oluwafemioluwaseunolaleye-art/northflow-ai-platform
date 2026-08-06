"use client";

import { motion } from "framer-motion";
import { Users, Sparkles, Workflow, CalendarCheck } from "lucide-react";
import { Eyebrow, Section } from "@/components/ui";

const stages = [
  { icon: Users, label: "Lead Comes In", detail: "Form, call, or message" },
  { icon: Sparkles, label: "AI Qualifies It", detail: "Scored against your criteria" },
  { icon: Workflow, label: "Automation Runs", detail: "Follow-up sequenced instantly" },
  { icon: CalendarCheck, label: "Appointment Booked", detail: "Straight onto your calendar" },
];

export function WorkflowVisualization() {
  return (
    <Section tone="dark">
      <Eyebrow>The Workflow</Eyebrow>
      <h2 className="mt-4 max-w-xl font-display text-3xl text-foreground sm:text-4xl">
        One motion, from first contact to booked call.
      </h2>

      <div className="relative mt-16">
        {/* Connecting line — animates in behind the stage nodes */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
          className="absolute left-0 right-0 top-8 hidden h-px bg-gold-line md:block"
        />

        <div className="grid gap-10 md:grid-cols-4">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-background text-gold">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <p className="mt-5 text-sm font-medium text-foreground">{stage.label}</p>
                <p className="mt-1 text-sm text-muted">{stage.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
