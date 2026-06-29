import type { Metadata } from "next";
import React from "react";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { getSiteContent } from "@/lib/constants";
import { getRequestLocale } from "@/lib/locale";

/**
 * Page metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { seo } = getSiteContent(locale);

  return {
    title: seo.pages.services.title,
    description: seo.pages.services.description,
  };
}

/**
 * Services page — full services showcase
 */
export default async function ServicesPage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();

  return (
    <div className="pt-32 pb-20">
      <ServicesSection locale={locale} />
    </div>
  );
}
