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
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        forest: {
          50: "#f2f7f4",
          100: "#e1ede6",
          200: "#c4dcce",
          300: "#9cc2ae",
          400: "#6fa189",
          500: "#4d846b",
          600: "#396a54",
          700: "#2d5444",
          800: "#234135",
          900: "#132820",
          950: "#0a1712",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        earth: {
          50: "#fdfbf7",
          100: "#f8f5ee",
          200: "#ece5d8",
          300: "#ded2be",
          400: "#c7b497",
          500: "#b29774",
          600: "#987d5b",
          700: "#7b6348",
          800: "#64503c",
          900: "#524233",
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
