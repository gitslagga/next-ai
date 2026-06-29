import { HeroSection } from "@/components/sections/HeroSection";
import React from "react";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { getRequestLocale } from "@/lib/locale";
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Homepage — full landing page with all sections
 * Hero → Services → Portfolio → About → CTA → Contact
 */
export default async function HomePage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();

  return (
    <>
      <HeroSection locale={locale} />
      <ServicesSection locale={locale} />
      <PortfolioSection locale={locale} />
      <CtaSection locale={locale} />
      <AboutSection locale={locale} />
      <ContactSection locale={locale} />
      <SpeedInsights />
    </>
  );
}
