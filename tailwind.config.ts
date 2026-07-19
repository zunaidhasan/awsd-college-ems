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
        // Stitch design system custom tokens
        danger: "#EF4444",
        "surface-container-highest": "#d8e3f6",
        "on-error": "#ffffff",
        "on-surface-variant": "#444651",
        "on-background": "#111c2a",
        "on-secondary-fixed": "#00210a",
        "primary-fixed-dim": "#b6c4ff",
        "on-surface": "#111c2a",
        "secondary-fixed-dim": "#79db8d",
        "on-secondary-container": "#007233",
        "on-primary": "#ffffff",
        "outline-variant": "#c5c5d3",
        "error-container": "#ffdad6",
        "on-primary-container": "#90a8ff",
        "surface-container": "#e5eeff",
        "surface-bright": "#f8f9ff",
        "secondary-container": "#92f5a4",
        secondary: "#006d30",
        "secondary-fixed": "#95f8a7",
        background: "#f8f9ff",
        "on-tertiary-container": "#e39f24",
        "surface-dim": "#cfdbee",
        "tertiary-fixed": "#ffddb0",
        "surface-container-high": "#dee9fc",
        "primary-fixed": "#dce1ff",
        error: "#ba1a1a",
        "tertiary-fixed-dim": "#ffba46",
        "on-tertiary-fixed-variant": "#614000",
        "surface-tint": "#4059aa",
        "on-secondary-fixed-variant": "#005323",
        tertiary: "#3c2600",
        "on-tertiary": "#ffffff",
        "on-primary-fixed": "#00164e",
        "surface-container-lowest": "#ffffff",
        "surface-dark": "#0F172A",
        "tertiary-container": "#593a00",
        "inverse-surface": "#26313f",
        outline: "#757682",
        "inverse-primary": "#b6c4ff",
        "surface-container-low": "#eff4ff",
        "on-secondary": "#ffffff",
        "on-error-container": "#93000a",
        primary: "#00236f",
        "surface-variant": "#d8e3f6",
        "primary-container": "#1e3a8a",
        "gray-muted": "#64748B",
        "inverse-on-surface": "#eaf1ff",
        "surface-light": "#F8FAFC",
        "on-primary-fixed-variant": "#264191",
        "on-tertiary-fixed": "#281800",
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
