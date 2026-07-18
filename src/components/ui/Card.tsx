import React, { forwardRef } from "react";

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-md shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`px-6 py-5 border-b border-slate-200 dark:border-slate-800 ${className}`} {...props}>
      {children}
    </div>
  )
);

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className = "", ...props }, ref) => (
    <h3 ref={ref} className={`text-xl font-semibold text-slate-900 dark:text-slate-100 ${className}`} {...props}>
      {children}
    </h3>
  )
);

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
);

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 ${className}`} {...props}>
      {children}
    </div>
  )
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";
