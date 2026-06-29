import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Web app manifest for installability and richer browser integration.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEXT AI",
    short_name: "NEXT AI",
    description:
      "NEXT AI is a blockchain software development studio focused on smart contracts, dApps, DeFi, NFT platforms, and security.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a1a",
    theme_color: "#0a0a1a",
    categories: ["technology", "business", "finance"],
    lang: "en",
    orientation: "portrait",
    id: SITE_URL,
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
