import { createBrandImageResponse } from "./brand-image";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

/**
 * Generates the primary site icon for browsers and installed experiences.
 */
export default function Icon(): Response {
  return createBrandImageResponse(size);
}
