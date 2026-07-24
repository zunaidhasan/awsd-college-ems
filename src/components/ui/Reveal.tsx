"use client";

import React, { useEffect, useRef, useState } from "react";

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay in ms before the reveal transition starts (for staggering siblings). */
  delay?: number;
  /** Direction the element travels from as it fades in. */
  from?: "up" | "down" | "left" | "right" | "none";
  /** Render as a different element/component (e.g. "section", "li"). */
  as?: React.ElementType;
  /** Reveal only once (default) or every time it re-enters the viewport. */
  once?: boolean;
}

const offsetClass: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate-y-6",
  down: "-translate-y-6",
  left: "translate-x-6",
  right: "-translate-x-6",
  none: "",
};

/**
 * Fades and slides children into view as they enter the viewport, using an
 * IntersectionObserver. Motion is fully disabled for users who prefer reduced
 * motion — they simply see the content in its final state with no transition.
 */
export const Reveal: React.FC<RevealProps> = ({
  delay = 0,
  from = "up",
  as: Component = "div",
  once = true,
  className = "",
  style,
  children,
  ...props
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion: reveal immediately, skip the observer entirely.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Component
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-[transform,opacity] motion-reduce:transition-none ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${offsetClass[from]}`
      } ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms", ...style }}
      {...props}
    >
      {children}
    </Component>
  );
};
