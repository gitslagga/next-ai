import type { Metadata } from "next";
import React from "react";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { getSiteContent } from "@/lib/constants";
import { getRequestLocale } from "@/lib/locale";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPortfolioJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo";

/**
 * Page metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { seo } = getSiteContent(locale);

  return {
    title: seo.pages.portfolio.title,
    description: seo.pages.portfolio.description,
    alternates: {
      canonical: "/portfolio",
      languages: {
        "en-US": "/portfolio",
        "zh-CN": "/portfolio",
        "x-default": "/portfolio",
      },
    },
  };
}

/**
 * Portfolio page — full case study gallery
 */
export default async function PortfolioPage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const { navLinks, seo } = getSiteContent(locale);
  const home = navLinks[0]?.label ?? "Home";
  const portfolioLabel =
    navLinks.find((link) => link.href === "/portfolio")?.label ?? "Portfolio";

  return (
    <div className="pt-32 pb-20">
      <PortfolioSection locale={locale} />
      <CtaSection locale={locale} />
      <JsonLd id="ld-portfolio" payload={buildPortfolioJsonLd(locale)} />
      <JsonLd
        id="ld-webpage-portfolio"
        payload={buildWebPageJsonLd({
          locale,
          path: "/portfolio",
          title: seo.pages.portfolio.title,
          description: seo.pages.portfolio.description,
        })}
      />
      <JsonLd
        id="ld-breadcrumb-portfolio"
        payload={buildBreadcrumbJsonLd([
          { name: home, path: "/" },
          { name: portfolioLabel, path: "/portfolio" },
        ])}
      />
    </div>
  );
}
