import React from "react";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: string;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  direction?: "column" | "row" | "row-reverse";
}

export const Stack: React.FC<StackProps> = ({ gap = "1rem", align = "stretch", justify = "start", direction = "column", className = "", style, children, ...props }) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems: align === "start" ? "flex-start" : align === "end" ? "flex-end" : align,
        justifyContent:
          justify === "start"
            ? "flex-start"
            : justify === "end"
            ? "flex-end"
            : justify === "between"
            ? "space-between"
            : justify === "around"
            ? "space-around"
            : "center",
        gap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
