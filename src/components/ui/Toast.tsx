"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  title?: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  toast: (opts: {
    message: string;
    title?: string;
    variant?: ToastVariant;
    duration?: number;
  }) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const variantConfig: Record<
  ToastVariant,
  { icon: React.ElementType; iconClass: string; accent: string }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-green-600 dark:text-green-400",
    accent: "border-l-green-500",
  },
  error: {
    icon: XCircle,
    iconClass: "text-red-600 dark:text-red-400",
    accent: "border-l-red-500",
  },
  warning: {
    icon: AlertCircle,
    iconClass: "text-amber-600 dark:text-amber-400",
    accent: "border-l-amber-500",
  },
  info: {
    icon: Info,
    iconClass: "text-blue-600 dark:text-blue-400",
    accent: "border-l-blue-500",
  },
};

// Monotonic id counter — avoids Date.now()/Math.random() and stays stable across renders.
let toastSeq = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    ({
      message,
      title,
      variant = "info",
      duration = 4000,
    }: {
      message: string;
      title?: string;
      variant?: ToastVariant;
      duration?: number;
    }) => {
      toastSeq += 1;
      const id = `toast-${toastSeq}`;
      setToasts((prev) => [...prev, { id, message, title, variant, duration }]);
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, timer);
      }
      return id;
    },
    [dismiss]
  );

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed bottom-0 right-0 z-[100] flex w-full max-w-sm flex-col gap-2 p-4"
      >
        {toasts.map((t) => {
          const config = variantConfig[t.variant];
          const Icon = config.icon;
          return (
            <div
              key={t.id}
              role="status"
              className={`pointer-events-auto flex items-start gap-3 rounded-lg border border-l-4 ${config.accent} border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900 motion-safe:animate-[toastIn_200ms_cubic-bezier(0.16,1,0.3,1)]`}
            >
              <Icon size={20} className={`mt-0.5 shrink-0 ${config.iconClass}`} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                {t.title && (
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {t.title}
                  </p>
                )}
                <p className="text-sm text-slate-600 dark:text-slate-300 break-words">
                  {t.message}
                </p>
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
