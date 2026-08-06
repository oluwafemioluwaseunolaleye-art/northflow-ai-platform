"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether a CSS media query currently matches. Useful for the rare
 * cases where responsive behavior needs to happen in JS rather than pure
 * Tailwind breakpoints (e.g. swapping a component, not just its styles).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = () => setMatches(mediaQueryList.matches);

    listener();
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
