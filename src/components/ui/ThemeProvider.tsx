"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { tokens } from "../../tokens/design-tokens";

export type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const buildCssVariables = (mode: ThemeMode) => {
  const vars: Record<string, string> = {
    "--color-bg": mode === "light" ? "#f8f9ff" : "#0f172a",
    "--color-surface": mode === "light" ? "#ffffff" : "#111827",
    "--color-border": mode === "light" ? "#c5c5d3" : "#334155",
    "--color-text": mode === "light" ? "#111c2a" : "#f8f9ff",
    "--color-muted": mode === "light" ? "#444651" : "#c5c5d3",
    "--color-primary": mode === "light" ? tokens.colors.action.primary : "#3b82f6",
    "--color-secondary": mode === "light" ? tokens.colors.action.secondary : "#10b981",
    "--color-accent": mode === "light" ? tokens.colors.action.accent : "#f59e0b",
    "--color-danger": mode === "light" ? tokens.colors.action.danger : "#ef4444",
    "--color-success": mode === "light" ? tokens.colors.action.success : "#10b981",
    "--radius-md": tokens.radii.md,
    "--shadow-sm": mode === "light" ? tokens.shadows.sm : "0 1px 2px rgba(0,0,0,0.4)",
    "--shadow-md": mode === "light" ? tokens.shadows.md : "0 8px 24px rgba(0,0,0,0.65)",
  };

  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
};

export const ThemeProvider: React.FC<{ defaultTheme?: ThemeMode; children: React.ReactNode }> = ({ defaultTheme = "light", children }) => {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("ui-theme") as ThemeMode | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = storedTheme ?? systemTheme ?? defaultTheme;
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [defaultTheme]);

  useEffect(() => {
    window.localStorage.setItem("ui-theme", theme);
    document.documentElement.dataset.theme = theme;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <style>{`:root {${buildCssVariables("light")}} [data-theme=dark] {${buildCssVariables("dark")}}`}</style>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
