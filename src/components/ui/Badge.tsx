import React, { forwardRef } from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "success" | "neutral";
  size?: "sm" | "md";
  as?: React.ElementType;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = "neutral", size = "md", as: Component = "span", className = "", ...props }, ref) => {
    const baseStyle = "inline-flex items-center rounded-full font-semibold tracking-wide transition-colors";
    const variants = {
      primary: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      secondary: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      accent: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
      danger: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      success: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
      neutral: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    } as const;
    const sizes = {
      sm: "px-2 py-0.5 text-[10px]",
      md: "px-2.5 py-1 text-xs",
    } as const;

    return (
      <Component
        ref={ref}
        className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Badge.displayName = "Badge";
