import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Search crawler directives for the production site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/contact",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}