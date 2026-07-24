import React from "react";
import { Inbox } from "lucide-react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon element (defaults to an inbox). Sized/coloured by the component. */
  icon?: React.ReactNode;
  title: string;
  description?: string;
  /** Optional call-to-action (e.g. a Button). */
  action?: React.ReactNode;
  /** Apply Bengali font stack to title/description. */
  bn?: boolean;
}

/**
 * Friendly placeholder for empty lists, no-results, and first-run states.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  bn = false,
  className = "",
  ...props
}) => (
  <div
    className={`flex flex-col items-center justify-center text-center px-6 py-12 ${className}`.trim()}
    role="status"
    {...props}
  >
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
      {icon ?? <Inbox size={30} strokeWidth={1.75} aria-hidden="true" />}
    </div>
    <h3 className={`text-base font-semibold text-slate-800 dark:text-slate-100 ${bn ? "font-bengali" : ""}`.trim()}>
      {title}
    </h3>
    {description && (
      <p className={`mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400 ${bn ? "font-bengali leading-relaxed" : ""}`.trim()}>
        {description}
      </p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);
