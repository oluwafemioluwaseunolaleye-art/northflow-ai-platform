import type { Config } from "tailwindcss";

// NOTE: Placeholder brand tokens. Replace with the exact values from the
// NorthFlow AI marketing site (colors, font stack, radii) once shared —
// this file does not read from or depend on that project in any way.
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#80a8ff",
          400: "#4d7fff",
          500: "#2457ff",
          600: "#1440db",
          700: "#0f30ad",
          800: "#0d2685",
          900: "#0b1e66",
          950: "#060f38"
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
