import React from "react";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export const Divider: React.FC<DividerProps> = ({ orientation = "horizontal", className = "", ...props }) => {
  if (orientation === "vertical") {
    return <div className={`w-px h-full bg-slate-200 dark:bg-slate-700 ${className}`} {...props} />;
  }

  return <hr className={`h-px border-0 bg-slate-200 dark:bg-slate-700 ${className}`} {...props} />;
};
