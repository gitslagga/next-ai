import { getSiteContent, type Locale } from "@/lib/constants";
import React from "react";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  readonly locale: Locale;
}

/**
 * Hero section for the homepage
 * Features animated gradient background, key stats, and primary CTA
 */
export function HeroSection({ locale }: HeroSectionProps): React.ReactElement {
  const { company, stats, ui } = getSiteContent(locale);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-float" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-float"
        style={{ animationDelay: "-3s" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-primary text-sm font-medium">
              {ui.heroBadge}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up">
            <span className="text-white">{ui.heroHeadingBefore} </span>
            <span className="gradient-text">{ui.heroHeadingHighlight}</span>
            <br />
            <span className="text-white">{ui.heroHeadingAfter}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {company.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" href="/contact">
              {ui.heroPrimaryCta}
            </Button>
            <Button variant="outline" size="lg" href="/portfolio">
              {ui.heroSecondaryCta}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text font-mono">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-sm">{stat.suffix}</span>
                  )}
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
