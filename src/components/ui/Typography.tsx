import React, { forwardRef } from "react";

/**
 * Typography system — semantic text primitives with a consistent type scale.
 * Bengali content should pass `bn` so the Noto Sans Bengali stack (via the
 * `font-bengali` utility) is applied for correct rendering and readability.
 */

type TypographyElement = HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement;

interface BaseTypographyProps extends React.HTMLAttributes<TypographyElement> {
  /** Apply the Bengali font stack for correct Bangla glyphs and line-height. */
  bn?: boolean;
  as?: React.ElementType;
}

const bnClass = (bn?: boolean) => (bn ? "font-bengali leading-relaxed" : "");

export interface HeadingProps extends BaseTypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const headingSizes: Record<number, string> = {
  1: "text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight",
  2: "text-2xl sm:text-3xl font-extrabold tracking-tight",
  3: "text-xl sm:text-2xl font-bold tracking-tight",
  4: "text-lg sm:text-xl font-bold",
  5: "text-base font-semibold",
  6: "text-sm font-semibold uppercase tracking-wider",
};

export const Heading = forwardRef<TypographyElement, HeadingProps>(
  ({ level = 2, bn, as, className = "", children, ...props }, ref) => {
    const Component = (as ?? (`h${level}` as React.ElementType)) as React.ElementType;
    return (
      <Component
        ref={ref}
        className={`text-slate-900 dark:text-slate-100 ${headingSizes[level]} ${bnClass(bn)} ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";

export interface TextProps extends BaseTypographyProps {
  size?: "xs" | "sm" | "base" | "lg";
  tone?: "default" | "muted" | "subtle" | "inverse";
  weight?: "normal" | "medium" | "semibold" | "bold";
}

const textSizes = { xs: "text-xs", sm: "text-sm", base: "text-base", lg: "text-lg" } as const;
const textTones = {
  default: "text-slate-800 dark:text-slate-200",
  muted: "text-slate-600 dark:text-slate-400",
  subtle: "text-slate-500 dark:text-slate-500",
  inverse: "text-white",
} as const;
const textWeights = { normal: "font-normal", medium: "font-medium", semibold: "font-semibold", bold: "font-bold" } as const;

export const Text = forwardRef<TypographyElement, TextProps>(
  ({ size = "base", tone = "default", weight = "normal", bn, as: Component = "p", className = "", children, ...props }, ref) => (
    <Component
      ref={ref}
      className={`${textSizes[size]} ${textTones[tone]} ${textWeights[weight]} ${bnClass(bn)} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  )
);
Text.displayName = "Text";

/** Small uppercase label / eyebrow text used above headings. */
export const Eyebrow = forwardRef<HTMLSpanElement, BaseTypographyProps>(
  ({ bn, as: Component = "span", className = "", children, ...props }, ref) => (
    <Component
      ref={ref}
      className={`inline-block text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-accent ${bnClass(bn)} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  )
);
Eyebrow.displayName = "Eyebrow";
