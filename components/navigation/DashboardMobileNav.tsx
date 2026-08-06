"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboardNavItems, dashboardFooterNavItems } from "@/lib/constants";

export function DashboardMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = [...dashboardNavItems, ...dashboardFooterNavItems];

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="dark lg:hidden">
      <div className="flex h-16 items-center justify-between border-b border-border bg-background px-5">
        <Link href="/dashboard" className="font-display text-base text-foreground">
          NorthFlow <span className="text-gold">AI</span>
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-foreground"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-b border-border bg-background"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                      active ? "bg-gold/10 text-gold" : "text-foreground/80"
                    )}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
