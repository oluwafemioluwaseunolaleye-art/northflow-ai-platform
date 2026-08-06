"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Eyebrow, Section } from "@/components/ui";

type Message = { from: "lead" | "ai"; text: string };

const conversation: Message[] = [
  { from: "lead", text: "Hi, I saw your ad — how does pricing work?" },
  { from: "ai", text: "Happy to walk you through it. Are you looking at this for a team or just yourself?" },
  { from: "lead", text: "A team of about 12." },
  { from: "ai", text: "Got it — I've flagged this for our team lead plan. Want me to grab 15 minutes on their calendar this week?" },
  { from: "lead", text: "Yes, Thursday works." },
];

export function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (visibleCount >= conversation.length) return;

    const timer = setTimeout(() => setVisibleCount((c) => c + 1), visibleCount === 0 ? 300 : 900);
    return () => clearTimeout(timer);
  }, [inView, visibleCount]);

  return (
    <Section tone="light" ref={ref}>
      <Eyebrow>Chat Demo</Eyebrow>
      <h2 className="mt-4 max-w-xl font-display text-3xl text-foreground sm:text-4xl">
        The same conversation your best rep would have.
      </h2>

      <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-elevated">
        <div className="flex flex-col gap-3">
          {conversation.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.from === "ai"
                  ? "self-start rounded-bl-sm bg-gold/10 text-foreground"
                  : "self-end rounded-br-sm bg-foreground/5 text-foreground"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}

          {inView && visibleCount < conversation.length && visibleCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-1 self-start rounded-2xl rounded-bl-sm bg-gold/10 px-4 py-3"
            >
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: dot * 0.15 }}
                  className="h-1.5 w-1.5 rounded-full bg-gold"
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Section>
  );
}
