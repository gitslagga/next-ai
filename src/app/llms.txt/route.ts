import { NextResponse } from "next/server";
import { SITE_URL, getSiteContent } from "@/lib/constants";

export const dynamic = "force-static";
export const revalidate = 86400;

/**
 * Serves `/llms.txt` — a plaintext convention (https://llmstxt.org/)
 * that helps generative engines (ChatGPT, Perplexity, Claude, etc.)
 * discover the most citation-worthy resources on the site.
 */
export function GET(): NextResponse {
  const { company, services, seo, faq } = getSiteContent("en");

  const lines: string[] = [];
  lines.push(`# ${company.name}`);
  lines.push("");
  lines.push(`> ${seo.rootDescription}`);
  lines.push("");
  lines.push("## Site");
  lines.push(`- [Home](${SITE_URL}/): Landing overview, hero metrics, top services.`);
  lines.push(`- [Services](${SITE_URL}/services): Full service catalog with feature lists.`);
  lines.push(`- [Portfolio](${SITE_URL}/portfolio): Case studies with tech stack and outcomes.`);
  lines.push(`- [About](${SITE_URL}/about): Company story and team profiles.`);
  lines.push(`- [Contact](${SITE_URL}/contact): Project inquiry form (24h response).`);
  lines.push("");
  lines.push("## Services");
  for (const service of services) {
    lines.push(`- **${service.title}** — ${service.description}`);
  }
  lines.push("");
  lines.push("## FAQ");
  for (const entry of faq) {
    lines.push(`### ${entry.question}`);
    lines.push(entry.answer);
    lines.push("");
  }
  lines.push("## Contact");
  lines.push(`- Email: ${company.email}`);
  lines.push(`- Location: ${company.location}`);

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
