import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Zap,
  CalendarClock,
  BarChart3,
  Plug,
  Settings,
  UserCircle,
  HelpCircle,
} from "lucide-react";

export const marketingNavItems = [
  { label: "Solutions", href: "/solutions" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
] as const;

// Primary conversion action across the marketing site — routes out to the
// existing Tally intake flow, not an internal page or dashboard action.
export const TALLY_URL =
  process.env.NEXT_PUBLIC_TALLY_URL ?? "https://tally.so/r/jaX7Za";

export const marketingCta = { label: "Book a Free AI Audit", href: TALLY_URL } as const;

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const dashboardNavItems: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Automations", href: "/dashboard/automations", icon: Zap },
  { label: "Appointments", href: "/dashboard/appointments", icon: CalendarClock },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Integrations", href: "/dashboard/integrations", icon: Plug },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

// Bottom-of-sidebar items. "Log out" is an action (server action), not a
// route, so it's handled separately in the sidebar components.
export const dashboardFooterNavItems: DashboardNavItem[] = [
  { label: "Account", href: "/dashboard/profile", icon: UserCircle },
  { label: "Help", href: "mailto:support@northflow.ai", icon: HelpCircle },
];
