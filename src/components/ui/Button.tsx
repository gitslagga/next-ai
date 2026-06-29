import Link from "next/link";
import React, { type ReactNode, type MouseEventHandler } from "react";

/** Button variant options */
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

/** Button size options */
type ButtonSize = "sm" | "md" | "lg";

/** Common props for the Button component */
interface ButtonProps {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly href?: string;
  readonly type?: "button" | "submit" | "reset";
  readonly disabled?: boolean;
  readonly onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  readonly [key: string]: unknown;
}

/** Base styles for each button variant */
const VARIANT_STYLES: Readonly<Record<ButtonVariant, string>> = {
  primary:
    "bg-gradient-to-r from-primary to-accent text-dark-400 font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]",
  secondary:
    "bg-dark-50 text-gray-200 border border-gray-700 hover:border-primary/50 hover:bg-dark-100",
  outline:
    "border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
  ghost: "text-gray-400 hover:text-primary hover:bg-primary/5",
};

/** Size-specific styles */
const SIZE_STYLES: Readonly<Record<ButtonSize, string>> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const BASE_STYLES =
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

/**
 * Reusable button/link component with multiple variants and sizes.
 * Automatically uses Next.js Link for internal hrefs (SPA navigation),
 * and renders as a button element when no href is provided.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ...rest
}: ButtonProps): React.ReactElement {
  const combinedStyles = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`;

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");

    if (isInternal) {
      return (
        <Link href={href} className={combinedStyles} onClick={onClick} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={combinedStyles}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      className={combinedStyles}
      {...rest}
    >
      {children}
    </button>
  );
}
