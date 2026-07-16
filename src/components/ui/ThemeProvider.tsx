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
    "--color-bg": mode === "light" ? "#ffffff" : "#0f172a",
    "--color-surface": mode === "light" ? "#f8fafc" : "#111827",
    "--color-border": mode === "light" ? "#e2e8f0" : "#334155",
    "--color-text": mode === "light" ? "#0f172a" : "#f8fafc",
    "--color-muted": mode === "light" ? "#475569" : "#cbd5e1",
    "--color-primary": mode === "light" ? tokens.colors.action.primary : "#60a5fa",
    "--color-secondary": mode === "light" ? tokens.colors.action.secondary : "#34d399",
    "--color-accent": mode === "light" ? tokens.colors.action.accent : "#facc15",
    "--color-danger": mode === "light" ? tokens.colors.action.danger : "#f87171",
    "--color-success": mode === "light" ? tokens.colors.action.success : "#34d399",
    "--radius-md": tokens.radii.md,
    "--shadow-sm": mode === "light" ? "0 1px 2px rgba(15,23,42,0.06)" : "0 1px 2px rgba(15,23,42,0.4)",
    "--shadow-md": mode === "light" ? "0 8px 24px rgba(15,23,42,0.08)" : "0 8px 24px rgba(15,23,42,0.65)",
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
      <style>{`:root {${buildCssVariables("light")}} [data-theme='dark'] {${buildCssVariables("dark")}}`}</style>
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
