import { Button } from "@/components/ui/Button";
import React from "react";
import { getSiteContent, type Locale } from "@/lib/constants";

interface CtaSectionProps {
  readonly locale: Locale;
}

/**
 * Call-to-action banner section
 * Full-width gradient background encouraging project inquiries
 */
export function CtaSection({ locale }: CtaSectionProps): React.ReactElement {
  const { ui } = getSiteContent(locale);

  return (
    <section className="relative py-16 md:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          {ui.ctaTitle}
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          {ui.ctaSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" href="/contact">
            {ui.ctaPrimary}
          </Button>
          <Button variant="outline" size="lg" href="/services">
            {ui.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
