import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: "light" | "dark";
  container?: boolean;
}

/**
 * Wraps a page section with consistent vertical rhythm and lets it opt into
 * the dark (midnight/navy) or light (off-white/white) surface treatment.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { className, tone = "light", container = true, children, ...props },
  ref
) {
  const content = container ? <Container>{children}</Container> : children;
  return (
    <section
      ref={ref}
      className={cn("py-20 lg:py-28", tone === "dark" && "dark bg-background", className)}
      {...props}
    >
      {content}
    </section>
  );
});
