import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-full transition duration-200 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-primary hover:bg-blue-900 text-white focus:ring-brand-primary",
    secondary: "bg-brand-secondary hover:bg-green-800 text-white focus:ring-brand-secondary",
    outline: "border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-brand-primary",
    danger: "bg-brand-danger hover:bg-red-700 text-white focus:ring-brand-danger",
    success: "bg-brand-secondary hover:bg-green-800 text-white focus:ring-brand-secondary",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs min-h-[38px]",
    md: "px-4 py-2.5 text-sm min-h-[42px]",
    lg: "px-6 py-3 text-base min-h-[48px]",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
