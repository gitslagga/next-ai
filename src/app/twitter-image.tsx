import { createBrandImageResponse } from "./brand-image";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";
export const alt = "NEXT AI social preview image";

/**
 * Generates the Twitter/X share image for large card previews.
 */
export default function TwitterImage(): Response {
  return createBrandImageResponse({
    ...size,
    title: "NEXT AI",
    subtitle: "Smart contracts, dApps, DeFi, and security.",
  });
}
