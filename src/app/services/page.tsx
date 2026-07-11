import type { Metadata } from "next";
import React from "react";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { getSiteContent } from "@/lib/constants";
import { getRequestLocale } from "@/lib/locale";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildServicesJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo";

/**
 * Page metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { seo } = getSiteContent(locale);

  return {
    title: seo.pages.services.title,
    description: seo.pages.services.description,
    alternates: {
      canonical: "/services",
      languages: {
        "en-US": "/services",
        "zh-CN": "/services",
        "x-default": "/services",
      },
    },
  };
}

/**
 * Services page — full services showcase
 */
export default async function ServicesPage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const { navLinks, seo } = getSiteContent(locale);
  const home = navLinks[0]?.label ?? "Home";
  const servicesLabel =
    navLinks.find((link) => link.href === "/services")?.label ?? "Services";

  return (
    <div className="pt-32 pb-20">
      <ServicesSection locale={locale} />
      <JsonLd id="ld-services" payload={buildServicesJsonLd(locale)} />
      <JsonLd
        id="ld-webpage-services"
        payload={buildWebPageJsonLd({
          locale,
          path: "/services",
          title: seo.pages.services.title,
          description: seo.pages.services.description,
        })}
      />
      <JsonLd
        id="ld-breadcrumb-services"
        payload={buildBreadcrumbJsonLd([
          { name: home, path: "/" },
          { name: servicesLabel, path: "/services" },
        ])}
      />
    </div>
  );
}
