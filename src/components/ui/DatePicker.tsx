import React, { forwardRef, useId } from "react";
import { Calendar } from "lucide-react";

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  error?: string;
}

/**
 * Thin, accessible wrapper around the native date input. Uses the platform
 * date picker (best cross-device UX, no extra JS) while matching the styling
 * of the shared Input component. A trailing calendar glyph is layered on top
 * for visual affordance.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, helperText, error, className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || `date-${generatedId}`;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="w-full mb-4">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type="date"
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            className={`w-full px-3.5 py-2 pr-10 border rounded-md text-sm bg-white/90 dark:bg-slate-900 outline-none transition duration-200 ease-out focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-500 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""} ${className}`.trim()}
            {...props}
          />
          <Calendar
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />
        </div>
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
