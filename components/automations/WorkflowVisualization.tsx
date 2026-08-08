"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Users, Sparkles, DollarSign, GitBranch, Mail, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

function WorkflowNode({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full border",
          active ? "border-gold/50 bg-gold/10 text-gold" : "border-border bg-foreground/5 text-muted"
        )}
      >
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </div>
  );
}

function VerticalConnector({ active }: { active: boolean }) {
  return (
    <div className="relative h-8 w-px overflow-hidden bg-border">
      {active && (
        <motion.div
          className="absolute inset-x-0 h-4 bg-gold-line"
          initial={{ top: -16 }}
          animate={{ top: 32 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

function BranchPath({ d, active }: { d: string; active: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={active ? "#C9A227" : "#94a3b8"}
      strokeOpacity={active ? 1 : 0.4}
      strokeWidth={1.5}
      strokeDasharray="4 3"
      animate={active ? { strokeDashoffset: [0, -14] } : {}}
      transition={active ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
    />
  );
}

/**
 * Visualizes the lead qualification workflow: Lead Submitted → AI
 * Qualification → Budget Check → Qualified? → (Yes: Email → Booking) /
 * (No: Email). `active` dims the diagram and stops the flow animation
 * when the underlying automation is paused.
 */
export function WorkflowVisualization({ active = true }: { active?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-col items-center">
        <WorkflowNode icon={Users} label="Lead Submitted" active={active} />
        <VerticalConnector active={active} />
        <WorkflowNode icon={Sparkles} label="AI Qualification" active={active} />
        <VerticalConnector active={active} />
        <WorkflowNode icon={DollarSign} label="Budget Check" active={active} />
        <VerticalConnector active={active} />
        <WorkflowNode icon={GitBranch} label="Qualified?" active={active} />

        <div className="relative mt-1 w-full max-w-sm">
          <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="h-7 w-full">
            <BranchPath d="M50,0 L25,28" active={active} />
            <BranchPath d="M50,0 L75,28" active={active} />
          </svg>

          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wide2 text-emerald-500">Yes</span>
              <WorkflowNode icon={Mail} label="Email" active={active} />
              <VerticalConnector active={active} />
              <WorkflowNode icon={CalendarCheck} label="Booking" active={active} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wide2 text-muted">No</span>
              <WorkflowNode icon={Mail} label="Email" active={active} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
