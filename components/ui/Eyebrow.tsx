import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Small uppercase label used sparingly as an "eyebrow" above headlines —
 * part of the luxury/editorial type treatment, not a generic pill badge.
 */
export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide2 text-gold",
        className
      )}
      {...props}
    />
  );
}
