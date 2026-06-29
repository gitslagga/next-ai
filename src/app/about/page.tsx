import type { Metadata } from "next";
import React from "react";
import { AboutSection } from "@/components/sections/AboutSection";
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
    title: seo.pages.about.title,
    description: seo.pages.about.description,
  };
}

/**
 * About page — company story and team
 */
export default async function AboutPage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();

  return (
    <div className="pt-32 pb-20">
      <AboutSection locale={locale} />
      <CtaSection locale={locale} />
    </div>
  );
}
