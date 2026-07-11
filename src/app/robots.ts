import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Search and AI crawler directives for the production site.
 *
 * Explicitly opts-in major generative-engine crawlers (GEO) so
 * ChatGPT, Perplexity, Google AI Overview, Claude etc. can cite
 * the site with fresh content.
 */
export default function robots(): MetadataRoute.Robots {
  const aiUserAgents: readonly string[] = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Bingbot",
    "ClaudeBot",
    "Claude-Web",
    "Amazonbot",
    "DuckAssistBot",
    "YouBot",
    "MistralAI-User",
    "meta-externalagent",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      ...aiUserAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/api/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
