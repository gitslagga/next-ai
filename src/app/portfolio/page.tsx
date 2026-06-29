import type { Metadata } from "next";
import React from "react";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { getSiteContent } from "@/lib/constants";
import { getRequestLocale } from "@/lib/locale";

/**
 * Page metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { seo } = getSiteContent(locale);

  return {
    title: seo.pages.portfolio.title,
    description: seo.pages.portfolio.description,
  };
}

/**
 * Portfolio page — full case study gallery
 */
export default async function PortfolioPage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();

  return (
    <div className="pt-32 pb-20">
      <PortfolioSection locale={locale} />
      <CtaSection locale={locale} />
    </div>
  );
}
