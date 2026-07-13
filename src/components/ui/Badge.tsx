import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "success" | "neutral";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className = "",
  ...props
}) => {
  const baseStyle = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors";
  
  const variants = {
    primary: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
    secondary: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
    accent: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
    danger: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
    success: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
    neutral: "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300",
  };

  return (
    <span
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
