export const tokens = {
  colors: {
    action: {
      primary: "#1E3A8A", // Deep Professional Blue (System-prompt §1)
      secondary: "#15803D", // Forest Green (System-prompt §1)
      accent: "#B45309", // Warm Amber (System-prompt §1)
      danger: "#ba1a1a",
      success: "#15803D",
      warning: "#B45309",
    },
    neutral: {
      100: "#f8f9ff",
      200: "#e5eeff",
      300: "#c5c5d3",
      400: "#757682",
      500: "#64748B",
      600: "#444651",
      700: "#334155",
      800: "#1e2937",
      900: "#111c2a",
    },
    surface: {
      base: "#f8f9ff",
      muted: "#eff4ff",
      card: "#ffffff",
      panel: "#0f172a",
      overlay: "rgba(17, 28, 42, 0.75)",
    },
  },
  typography: {
    fontFamily: {
      sans: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      bengali: "'Noto Sans Bengali', sans-serif",
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 800,
    },
    lineHeights: {
      normal: 1.5,
      relaxed: 1.75,
      tight: 1.25,
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  radii: {
    sm: "0.25rem",
    md: "0.5rem", // ROUND_EIGHT (8px)
    lg: "0.75rem",
    xl: "1rem",
    round: "9999px",
  },
  shadows: {
    sm: "0 1px 3px rgba(30, 58, 138, 0.02), 0 1px 2px rgba(30, 58, 138, 0.04)",
    md: "0 4px 12px rgba(30, 58, 138, 0.02), 0 2px 4px rgba(30, 58, 138, 0.04)",
    lg: "0 12px 24px rgba(30, 58, 138, 0.04), 0 4px 8px rgba(30, 58, 138, 0.06)",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

