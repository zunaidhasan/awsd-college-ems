import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3.5 py-2 border rounded-lg text-sm bg-transparent outline-none transition-all
          focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary
          border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100
          disabled:bg-gray-50 dark:disabled:bg-slate-800 disabled:text-gray-400
          ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};
