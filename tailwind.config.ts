import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          pitch: "#050507",
          jet: "#09090b",
          carbon: "#0f0f13",
          surface: "#141418",
        },
        lambo: {
          yellow: "#e6b800",
          yellowHover: "#ffc800",
          yellowGlow: "rgba(230, 184, 0, 0.18)",
          dim: "#87878c",
          faint: "#45454c",
          border: "#232328",
          borderLight: "#35353d",
          ink: "#ecebe7",
          white: "#fbfbfa",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest: "0.28em",
        ultra: "0.42em",
      },
      animation: {
        "drop-hint": "dropHint 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        dropHint: {
          "0%": { transform: "scaleY(0)", opacity: "1" },
          "45%": { transform: "scaleY(1)", opacity: "1" },
          "100%": { transform: "scaleY(1)", opacity: "0" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

