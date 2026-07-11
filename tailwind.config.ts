import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        "pv-primary": "var(--pv-primary)",
        "pv-heart": "var(--pv-heart)",
        "pv-bg": "var(--pv-bg)",
        "pv-card": "var(--pv-card)",
        "pv-text": "var(--pv-text)",
        "pv-border": "var(--pv-border)",
        "pv-muted": "var(--pv-muted)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        display: ["var(--font-space-grotesk)", ...fontFamily.sans],
      },
      borderRadius: {
        pv: "8px",
        "pv-sm": "6px",
      },
      borderWidth: {
        pv: "2.5px",
      },
    },
  },
  plugins: [],
}

export default config
