import { createBrandImageResponse } from "./brand-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "NEXT AI — Blockchain software development studio";

/**
 * Generates the Open Graph share image for social and search previews.
 */
export default function OpenGraphImage(): Response {
  return createBrandImageResponse({
    ...size,
    title: "NEXT AI",
    subtitle: "Secure blockchain products for ambitious Web3 teams.",
  });
}
