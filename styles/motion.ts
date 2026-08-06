import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion variants so entrance/scroll animation stays
 * consistent (and restrained) across marketing pages. Prefer these over
 * one-off animation objects in individual components.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerChildren: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
