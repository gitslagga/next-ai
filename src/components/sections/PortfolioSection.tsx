import { getSiteContent, type Locale } from "@/lib/constants";
import React from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface PortfolioSectionProps {
  readonly locale: Locale;
}

/**
 * Portfolio section showcasing case studies
 * Features filterable project cards with results metrics
 */
export function PortfolioSection({ locale }: PortfolioSectionProps): React.ReactElement {
  const { portfolio, ui } = getSiteContent(locale);
  const featured = portfolio.slice(0, 6);

  return (
    <section className="relative py-20 md:py-32" id="portfolio">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={ui.portfolioTitle}
          subtitle={ui.portfolioSubtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <GlowCard key={item.id} className="flex flex-col h-full group">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                {item.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-300 bg-dark-100 px-2 py-1 rounded font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Results */}
              <div className="border-t border-gray-800 pt-4 space-y-1">
                {item.results.map((result) => (
                  <div
                    key={result}
                    className="flex items-center gap-2 text-sm"
                    >
                    <span className="text-primary font-mono text-xs">✓</span>
                    <span className="text-gray-300">{result}</span>
                  </div>
                ))}
              </div>
            </GlowCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" href="/portfolio">
            {ui.portfolioViewAllCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
