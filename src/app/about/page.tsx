import type { Metadata } from "next";
import React from "react";
import { AboutSection } from "@/components/sections/AboutSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { getSiteContent } from "@/lib/constants";
import { getRequestLocale } from "@/lib/locale";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildTeamJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo";

/**
 * Page metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { seo } = getSiteContent(locale);

  return {
    title: seo.pages.about.title,
    description: seo.pages.about.description,
    alternates: {
      canonical: "/about",
      languages: {
        "en-US": "/about",
        "zh-CN": "/about",
        "x-default": "/about",
      },
    },
  };
}

/**
 * About page — company story and team
 */
export default async function AboutPage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const { navLinks, seo } = getSiteContent(locale);
  const home = navLinks[0]?.label ?? "Home";
  const aboutLabel =
    navLinks.find((link) => link.href === "/about")?.label ?? "About";

  return (
    <div className="pt-32 pb-20">
      <AboutSection locale={locale} />
      <CtaSection locale={locale} />
      <JsonLd id="ld-team" payload={buildTeamJsonLd(locale)} />
      <JsonLd
        id="ld-webpage-about"
        payload={buildWebPageJsonLd({
          locale,
          path: "/about",
          title: seo.pages.about.title,
          description: seo.pages.about.description,
        })}
      />
      <JsonLd
        id="ld-breadcrumb-about"
        payload={buildBreadcrumbJsonLd([
          { name: home, path: "/" },
          { name: aboutLabel, path: "/about" },
        ])}
      />
    </div>
  );
}
