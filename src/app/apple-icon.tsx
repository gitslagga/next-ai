import { createBrandImageResponse } from "./brand-image";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

/**
 * Generates the Apple touch icon used when saving the site to iOS home screens.
 */
export default function AppleIcon(): Response {
  return createBrandImageResponse(size);
}
