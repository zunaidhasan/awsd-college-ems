import React from "react";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: string;
  minColumnWidth?: string;
}

export const Grid: React.FC<GridProps> = ({ columns = 2, gap = "1rem", minColumnWidth = "240px", className = "", style, children, ...props }) => {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
        gap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
