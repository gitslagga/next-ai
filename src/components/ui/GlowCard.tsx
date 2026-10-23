import type { ReactNode } from "react";
import React from "react";

/**
 * Props for GlowCard component
 */
interface GlowCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly hover?: boolean;
  readonly id?: string;
}

/**
 * Card component with gradient border and glow effect
 * Used for service cards, portfolio items, and feature highlights
 */
export function GlowCard({
  children,
  className = "",
  hover = true,
  id,
}: GlowCardProps): React.ReactElement {
  return (
    <div
      id={id}
      className={`gradient-border rounded-xl bg-dark-50/80 backdrop-blur-sm p-6 ${
        hover ? "hover:glow hover:-translate-y-1 transition-all duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
