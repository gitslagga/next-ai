import React from "react";

import type { ServiceIconName } from "@/lib/types";

interface ServiceIconProps {
  readonly name: ServiceIconName;
}

const ICON_PATHS: Readonly<Record<ServiceIconName, React.ReactNode>> = {
  "file-code": (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M10 13l-2 2 2 2M14 17l2-2-2-2" />
    </>
  ),
  monitor: (
    <>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8M12 17v4M9 8l-2 2 2 2M15 12l2-2-2-2" />
    </>
  ),
  landmark: (
    <>
      <path d="m3 10 9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 18h18M2 22h20" />
    </>
  ),
  palette: (
    <>
      <path d="M12 22a10 10 0 1 1 10-10c0 2.2-1.8 4-4 4h-1.7a2 2 0 0 0-1.8 2.8A2.2 2.2 0 0 1 12 22Z" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6M10 22h4M8.5 15.5A7 7 0 1 1 16 15c-.9.7-1 1.4-1 3H9c0-1.8-.1-2.2-.5-2.5Z" />
      <path d="M12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4" />
    </>
  ),
  bot: (
    <>
      <rect width="18" height="14" x="3" y="7" rx="3" />
      <path d="M12 3v4M8 12h.01M16 12h.01M8 17h8" />
      <circle cx="12" cy="2" r="1" />
    </>
  ),
  "shopping-cart": (
    <>
      <circle cx="9" cy="20" r="1" /><circle cx="19" cy="20" r="1" />
      <path d="M3 4h2l2.4 10.4A2 2 0 0 0 9.3 16h8.9a2 2 0 0 0 1.9-1.5L22 7H6" />
    </>
  ),
  "message-circle": (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.8 9.8 0 0 1-4-.9L3 21l1.7-4.3A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" />
    </>
  ),
  gamepad: (
    <>
      <path d="M8 8h8a5 5 0 0 1 4.7 3.3l1.1 3.1A3.5 3.5 0 0 1 18.5 19a3.5 3.5 0 0 1-2.5-1l-1-1H9l-1 1a3.5 3.5 0 0 1-5.8-3.6l1.1-3.1A5 5 0 0 1 8 8Z" />
      <path d="M7 12v4M5 14h4M16 13h.01M19 15h.01" />
    </>
  ),
};

/** A crisp, consistent line icon for a service card. */
export function ServiceIcon({ name }: ServiceIconProps): React.ReactElement {
  return (
    <div className="relative mb-5 flex size-12 items-center justify-center rounded-xl border border-primary/25 bg-dark-300 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,240,255,0.08)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/45 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,240,255,0.16)]">
      <div className="absolute inset-px rounded-[10px] bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <svg
        aria-hidden="true"
        className="relative size-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        {ICON_PATHS[name]}
      </svg>
    </div>
  );
}
