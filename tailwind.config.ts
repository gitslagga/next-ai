import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00f0ff",
          50: "#e6fefe",
          100: "#b3fcfe",
          200: "#80fafe",
          300: "#4df8fe",
          400: "#1af6fe",
          500: "#00f0ff",
          600: "#00c0cc",
          700: "#009099",
          800: "#006066",
          900: "#003033",
        },
        accent: {
          DEFAULT: "#b347ea",
          50: "#f3e6fc",
          100: "#e1b3f7",
          200: "#cf80f2",
          300: "#bd4ded",
          400: "#ab1ae8",
          500: "#b347ea",
          600: "#8f39bb",
          700: "#6b2a8c",
          800: "#471c5d",
          900: "#240e2e",
        },
        dark: {
          DEFAULT: "#0a0a1a",
          50: "#1a1a2e",
          100: "#16162a",
          200: "#121226",
          300: "#0e0e22",
          400: "#0a0a1a",
          500: "#080816",
          600: "#060612",
          700: "#04040e",
          800: "#02020a",
          900: "#000006",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "Fira Code", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "0 0 5px #00f0ff, 0 0 20px #00f0ff40" },
          "100%": { boxShadow: "0 0 10px #00f0ff, 0 0 40px #00f0ff60" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
