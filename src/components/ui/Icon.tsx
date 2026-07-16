import React from "react";
import * as Icons from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  ariaLabel?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, color = "currentColor", ariaLabel, className = "", ...props }) => {
  const IconComponent = Icons[name] as LucideIcon | undefined;
  if (!IconComponent) return null;

  return (
    <IconComponent
      size={size}
      color={color}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : "presentation"}
      className={className}
      {...props}
    />
  );
};
