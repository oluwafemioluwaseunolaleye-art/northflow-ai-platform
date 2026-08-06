"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Eyebrow, Section, Card } from "@/components/ui";

type ScenarioKey = "hot" | "warm" | "cold";

const scenarios: Record<
  ScenarioKey,
  { label: string; message: string; score: number; verdict: string }
> = {
  hot: {
    label: "\u201cWe need this running by next month.\u201d",
    message: "Budget confirmed, timeline urgent, decision-maker on the thread.",
    score: 94,
    verdict: "Route to sales — call within the hour.",
  },
  warm: {
    label: "\u201cJust comparing a few options right now.\u201d",
    message: "Genuine interest, no timeline yet, still gathering information.",
    score: 61,
    verdict: "Add to nurture sequence — check in next week.",
  },
  cold: {
    label: "\u201cWhat does your company even do?\u201d",
    message: "Low intent signal, likely outside your ideal customer profile.",
    score: 22,
    verdict: "Auto-reply with resources — no rep time spent.",
  },
};

export function InteractiveDemo() {
  const [active, setActive] = useState<ScenarioKey>("hot");
  const scenario = scenarios[active];

  return (
    <Section tone="dark">
      <Eyebrow>Try It Yourself</Eyebrow>
      <h2 className="mt-4 max-w-xl font-display text-3xl text-foreground sm:text-4xl">
        Pick a lead. Watch it get qualified.
      </h2>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
        <div className="flex flex-col gap-3">
          {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`rounded-xl border px-5 py-4 text-left text-sm transition-colors ${
                active === key
                  ? "border-gold bg-gold/10 text-foreground"
                  : "border-border text-muted hover:border-gold/40 hover:text-foreground"
              }`}
            >
              {scenarios[key].label}
            </button>
          ))}
        </div>

        <Card className="min-h-[260px]">
          <div className="flex items-center gap-2 text-gold">
            <Sparkles size={18} strokeWidth={1.5} />
            <span className="text-xs font-medium uppercase tracking-wide2">
              AI Qualification
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              <p className="text-sm text-muted">{scenario.message}</p>

              <div className="mt-6 flex items-end gap-3">
                <motion.span
                  key={scenario.score}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="font-display text-4xl text-foreground"
                >
                  {scenario.score}
                </motion.span>
                <span className="mb-1 text-sm text-muted">/ 100 fit score</span>
              </div>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scenario.score}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-gold"
                />
              </div>

              <p className="mt-6 border-t border-border pt-5 text-sm font-medium text-foreground">
                {scenario.verdict}
              </p>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </Section>
  );
}
