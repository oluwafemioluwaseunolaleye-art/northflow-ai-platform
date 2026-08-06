"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";
import { fadeUp, staggerChildren } from "@/styles/motion";
import { marketingCta } from "@/lib/constants";

export function Hero() {
  return (
    <div className="dark relative overflow-hidden bg-background">
      <Container className="relative flex min-h-[86vh] flex-col justify-center py-24">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>AI Automation, Composed With Precision</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-6xl"
          >
            Automation that carries the weight of your judgment.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base text-muted lg:text-lg">
            NorthFlow AI qualifies leads, runs your follow-up, and books the
            appointment — with the discretion of someone who actually
            understands your business.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href={marketingCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-sm font-medium tracking-wide text-midnight shadow-gold transition-colors hover:bg-gold-light"
            >
              {marketingCta.label}
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm text-foreground/80 underline-offset-4 hover:text-gold hover:underline"
            >
              See how it works
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      <div className="gold-rule absolute bottom-0 left-0" />
    </div>
  );
}
