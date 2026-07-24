import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tailwind width class or arbitrary value, e.g. "w-full", "w-32". */
  width?: string;
  /** Tailwind height class, e.g. "h-4", "h-10". */
  height?: string;
  /** Fully rounded (avatars, chips). */
  circle?: boolean;
}

/**
 * Content placeholder shown while data loads. Uses `animate-pulse`, which is
 * automatically neutralised by the global `prefers-reduced-motion` rule.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = "w-full",
  height = "h-4",
  circle = false,
  className = "",
  ...props
}) => (
  <div
    aria-hidden="true"
    className={`animate-pulse bg-slate-200 dark:bg-slate-800 ${circle ? "rounded-full" : "rounded-md"} ${width} ${height} ${className}`.trim()}
    {...props}
  />
);

/** Multi-line text skeleton; the last line is shortened for realism. */
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ lines = 3, className = "" }) => (
  <div className={`space-y-2.5 ${className}`.trim()} aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} height="h-3.5" width={i === lines - 1 ? "w-2/3" : "w-full"} />
    ))}
  </div>
);

/** Card-shaped skeleton matching the Card component's padding and radius. */
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-md shadow-sm p-6 ${className}`.trim()}
    aria-hidden="true"
  >
    <div className="flex items-center gap-3 mb-4">
      <Skeleton circle width="w-11" height="h-11" />
      <div className="flex-1 space-y-2">
        <Skeleton height="h-4" width="w-1/2" />
        <Skeleton height="h-3" width="w-1/3" />
      </div>
    </div>
    <SkeletonText lines={3} />
  </div>
);
