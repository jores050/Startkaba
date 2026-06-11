import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charte graphique officielle StartKaba
        background: "#FFFFFF",
        foreground: "#000000",
        primary: "#0722AB", // Bleu principal
        green: "#1A6B00", // Vert principal
        "green-light": "#AEFF94", // Vert clair
        cta: "#F77E2D", // Orange — boutons / CTA
        // Tokens fonctionnels dérivés
        surface: "#FFFFFF",
        border: "#E2E4F0",
        muted: "#5C5F6E",
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
