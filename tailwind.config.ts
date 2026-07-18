import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "480px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        brand: {
          primary: "#00236f", // Academic Blue
          secondary: "#006d30", // Scholastic Green
          accent: "#ca8a04", // Heritage Amber
          danger: "#ba1a1a",
          success: "#006d30",
          warning: "#ca8a04",
        },
        surface: {
          DEFAULT: "#f8f9ff",
          muted: "#eff4ff",
          dark: "#0f172a",
          darker: "#020617",
        },
        neutral: {
          150: "#e5eeff",
          450: "#757682",
          650: "#444651",
          850: "#1e2937",
        },
        slate: {
          850: "#0f172a",
        },
        yellow: {
          350: "#ca8a04",
        },
        border: {
          DEFAULT: "#c5c5d3",
          dark: "#757682",
        },
        text: {
          DEFAULT: "#111c2a",
          muted: "#444651",
          inverse: "#f8f9ff",
        },
      },
      fontFamily: {
        bengali: ["var(--font-bengali)", "Inter", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0, 35, 111, 0.02), 0 1px 2px rgba(0, 35, 111, 0.04)",
        md: "0 4px 12px rgba(0, 35, 111, 0.02), 0 2px 4px rgba(0, 35, 111, 0.04)",
        lg: "0 12px 24px rgba(0, 35, 111, 0.04), 0 4px 8px rgba(0, 35, 111, 0.06)",
        xl: "0 30px 80px rgba(0, 35, 111, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
