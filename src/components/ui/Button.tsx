import React, { forwardRef } from "react";
import { Spinner } from "./Spinner";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  as?: React.ElementType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as: Component = "button",
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      icon,
      children,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyle =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition duration-200 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-brand-primary text-white hover:bg-blue-900 focus:ring-brand-primary",
      secondary: "bg-brand-secondary text-white hover:bg-green-800 focus:ring-brand-secondary",
      ghost: "bg-transparent text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-brand-primary",
      danger: "bg-brand-danger text-white hover:bg-red-700 focus:ring-brand-danger",
      success: "bg-brand-secondary text-white hover:bg-green-800 focus:ring-brand-secondary",
      outline: "border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-brand-primary",
    } as const;

    const sizes = {
      sm: "px-3 py-2 text-xs min-h-[38px]",
      md: "px-4 py-2.5 text-sm min-h-[42px]",
      lg: "px-6 py-3 text-base min-h-[48px]",
    } as const;

    const widthClass = fullWidth ? "w-full" : "";
    const isDisabled = disabled || loading;

    return (
      <Component
        ref={ref}
        type={Component === "button" ? type : undefined}
        className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`.trim()}
        aria-busy={loading ? true : undefined}
        disabled={Component === "button" ? isDisabled : undefined}
        data-loading={loading ? "true" : undefined}
        {...props}
      >
        {loading ? <Spinner size={18} className="text-current" /> : icon}
        <span className="inline-flex items-center justify-center">{children}</span>
      </Component>
    );
  }
);

Button.displayName = "Button";
