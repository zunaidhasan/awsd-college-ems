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
          primary: "#1E3A8A",
          secondary: "#15803D",
          accent: "#CA8A04",
          danger: "#EF4444",
          success: "#16A34A",
          warning: "#F59E0B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAFC",
          dark: "#0F172A",
          darker: "#020617",
        },
        neutral: {
          150: "#F2F4F7",
          450: "#94A3B8",
          650: "#475569",
          850: "#1E293B",
        },
        slate: {
          850: "#0F172A",
        },
        yellow: {
          350: "#F5C325",
        },
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#334155",
        },
        text: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          inverse: "#F8FAFC",
        },
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15, 23, 42, 0.06)",
        md: "0 8px 24px rgba(15, 23, 42, 0.08)",
        lg: "0 20px 60px rgba(15, 23, 42, 0.12)",
        xl: "0 30px 80px rgba(15, 23, 42, 0.14)",
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
