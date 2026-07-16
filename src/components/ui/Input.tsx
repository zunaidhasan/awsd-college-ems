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
        className={`w-full px-3.5 py-2 border rounded-xl text-sm bg-white/90 dark:bg-slate-900 outline-none transition duration-200 ease-out
          focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary
          border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500
          disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-500
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
