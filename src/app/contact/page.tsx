import type { Metadata } from "next";
import React from "react";
import { ContactSection } from "@/components/sections/ContactSection";
import { getSiteContent } from "@/lib/constants";
import { getRequestLocale } from "@/lib/locale";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";

/**
 * Page metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { seo } = getSiteContent(locale);

  return {
    title: seo.pages.contact.title,
    description: seo.pages.contact.description,
    alternates: {
      canonical: "/contact",
      languages: {
        "en-US": "/contact",
        "zh-CN": "/contact",
        "x-default": "/contact",
      },
    },
  };
}

/**
 * Contact page — inquiry form
 */
export default async function ContactPage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const { navLinks, seo } = getSiteContent(locale);
  const home = navLinks[0]?.label ?? "Home";
  const contactLabel =
    navLinks.find((link) => link.href === "/contact")?.label ?? "Contact";

  return (
    <div className="pt-32 pb-20">
      <ContactSection locale={locale} />
      <JsonLd
        id="ld-webpage-contact"
        payload={buildWebPageJsonLd({
          locale,
          path: "/contact",
          title: seo.pages.contact.title,
          description: seo.pages.contact.description,
        })}
      />
      <JsonLd
        id="ld-breadcrumb-contact"
        payload={buildBreadcrumbJsonLd([
          { name: home, path: "/" },
          { name: contactLabel, path: "/contact" },
        ])}
      />
    </div>
  );
}
