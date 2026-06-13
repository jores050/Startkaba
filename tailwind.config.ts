import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charte graphique officielle StartKaba
        background: "var(--sk-bg)",
        foreground: "var(--sk-text)",
        primary: "#0722AB",
        green: "#1A6B00",
        "green-light": "#AEFF94",
        cta: "#F77E2D",
        // Tokens fonctionnels — liés aux CSS vars, s'adaptent au dark mode
        surface: "var(--sk-surface)",
        border: "var(--sk-border)",
        muted: "var(--sk-muted)",
        mid: "var(--sk-mid)",
        ink: "var(--sk-text)",
        app: "var(--sk-bg)",
        "primary-light": "var(--sk-primary-light)",
        "cta-bg": "var(--sk-cta-bg)",
        "green-bg": "var(--sk-green-bg)",
        error: "#C03A1B",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
