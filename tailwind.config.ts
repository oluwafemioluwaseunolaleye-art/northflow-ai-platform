import type { Config } from "tailwindcss";

// NorthFlow AI visual identity — premium / luxury / AI-focused.
// Palette named per brand brief: Deep Navy, Royal Navy, Midnight, Luxury Gold,
// Light Gold, White, Off White. Exact hex values here are a considered first
// pass; swap for locked brand values if the design team finalizes different
// ones later — every color in the app is driven from this single source.
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#05070D",
        "deep-navy": "#0A1330",
        "royal-navy": "#142451",
        gold: {
          DEFAULT: "#C9A227",
          light: "#E8D6A0",
        },
        offwhite: "#F7F5EF",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wide2: "0.14em",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(201, 162, 39, 0.35)",
        elevated: "0 20px 60px -20px rgba(5, 7, 13, 0.45)",
      },
      backgroundImage: {
        "gold-line":
          "linear-gradient(90deg, transparent 0%, #C9A227 50%, transparent 100%)",
      },
      container: {
        center: true,
        padding: { DEFAULT: "1.25rem", lg: "2rem" },
        screens: { "2xl": "1280px" },
      },
    },
  },
  plugins: [],
};

export default config;
