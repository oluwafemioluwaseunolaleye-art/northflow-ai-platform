"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui";
import { marketingNavItems, marketingCta } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ctaClasses = cn(
  "inline-flex h-11 items-center justify-center rounded-full bg-gold px-6 text-sm font-medium",
  "tracking-wide text-midnight shadow-gold transition-colors hover:bg-gold-light"
);

export function MarketingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="dark sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-lg tracking-wide text-foreground">
          NorthFlow <span className="text-gold">AI</span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {marketingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/login" className="text-sm text-foreground/80 hover:text-gold">
            Log in
          </Link>
          <Link href={marketingCta.href} target="_blank" rel="noopener noreferrer" className={ctaClasses}>
            {marketingCta.label}
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {marketingNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-foreground/85 hover:bg-foreground/5"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-3 border-t border-border pt-4">
                <Link href="/login" onClick={() => setOpen(false)} className="px-3 text-sm">
                  Log in
                </Link>
                <Link
                  href={marketingCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={cn(ctaClasses, "mx-3")}
                >
                  {marketingCta.label}
                </Link>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
