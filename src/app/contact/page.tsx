import type { Metadata } from "next";
import React from "react";
import { ContactSection } from "@/components/sections/ContactSection";
import { getSiteContent } from "@/lib/constants";
import { getRequestLocale } from "@/lib/locale";

/**
 * Page metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { seo } = getSiteContent(locale);

  return {
    title: seo.pages.contact.title,
    description: seo.pages.contact.description,
  };
}

/**
 * Contact page — inquiry form
 */
export default async function ContactPage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();

  return (
    <div className="pt-32 pb-20">
      <ContactSection locale={locale} />
    </div>
  );
}
