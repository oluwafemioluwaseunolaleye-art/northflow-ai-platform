"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { dashboardNavItems, dashboardFooterNavItems } from "@/lib/constants";

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="dark hidden w-64 shrink-0 flex-col border-r border-border bg-background lg:flex">
      <div className="flex h-20 items-center px-6">
        <Link href="/dashboard" className="font-display text-lg text-foreground">
          NorthFlow <span className="text-gold">AI</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-gold/10 text-gold"
                  : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <Icon size={18} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-border px-4 py-4">
        {dashboardFooterNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-gold/10 text-gold"
                  : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <Icon size={18} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
