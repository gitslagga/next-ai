import React from "react";
import { ImageResponse } from "next/og";

const BRAND_COLORS = {
  dark: "#0a0a1a",
  darkSoft: "#11182e",
  stroke: "rgba(103, 232, 249, 0.72)",
  primary: "#00f0ff",
  accent: "#b347ea",
  text: "#f8fafc",
  muted: "#94a3b8",
} as const;

interface BrandMarkProps {
  readonly size: number;
}

interface BrandImageOptions {
  readonly width: number;
  readonly height: number;
  readonly title?: string;
  readonly subtitle?: string;
}

/**
 * Renders the reusable NEXT AI brand mark for metadata images.
 */
export function BrandMark({ size }: BrandMarkProps): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        display: "flex",
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id="bg-gradient" x1="10%" y1="5%" x2="90%" y2="95%">
          <stop offset="0%" stopColor={BRAND_COLORS.darkSoft} />
          <stop offset="100%" stopColor={BRAND_COLORS.dark} />
        </linearGradient>
        <linearGradient id="stroke-gradient" x1="12%" y1="10%" x2="90%" y2="92%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="42%" stopColor={BRAND_COLORS.primary} />
          <stop offset="100%" stopColor="#d8b4fe" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="94" height="94" rx="24" fill="url(#bg-gradient)" />
      <rect x="4.5" y="4.5" width="91" height="91" rx="22.5" fill="none" stroke={BRAND_COLORS.stroke} strokeWidth="3" />
      <path
        d="M27 70V30L73 70V30"
        stroke="url(#stroke-gradient)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Creates branded image responses for icons and social share cards.
 */
export function createBrandImageResponse({
  width,
  height,
  title,
  subtitle,
}: BrandImageOptions): ImageResponse {
  const isCard = Boolean(title);
  const markSize = isCard ? 180 : Math.round(Math.min(width, height) * 0.92);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          background: isCard
            ? `linear-gradient(135deg, ${BRAND_COLORS.dark} 0%, #090914 50%, #151534 100%)`
            : BRAND_COLORS.dark,
          color: BRAND_COLORS.text,
        }}
      >
        {isCard ? (
          <>
            <div
              style={{
                position: "absolute",
                left: "-10%",
                top: "-20%",
                width: "38%",
                height: "54%",
                borderRadius: "9999px",
                background: "rgba(0, 240, 255, 0.14)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "-10%",
                bottom: "-20%",
                width: "40%",
                height: "56%",
                borderRadius: "9999px",
                background: "rgba(179, 71, 234, 0.16)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 28,
                display: "flex",
                borderRadius: 44,
                border: `1px solid ${BRAND_COLORS.stroke}`,
              }}
            />
          </>
        ) : null}
        {isCard ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "72px 80px",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 40,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
              <BrandMark size={markSize} />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div
                  style={{
                    fontSize: 76,
                    fontWeight: 700,
                    lineHeight: 1.08,
                    letterSpacing: "-0.04em",
                    maxWidth: 520,
                  }}
                >
                  {title}
                </div>
                {subtitle ? (
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      color: BRAND_COLORS.muted,
                      lineHeight: 1.25,
                      maxWidth: 460,
                    }}
                  >
                    {subtitle}
                  </div>
                ) : null}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  color: BRAND_COLORS.primary,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Blockchain Studio
              </div>
              <div style={{ fontSize: 20, color: BRAND_COLORS.muted }}>
                Smart Contracts • dApps • DeFi
              </div>
            </div>
          </div>
        ) : (
          <BrandMark size={markSize} />
        )}
      </div>
    ),
    { width, height },
  );
}
