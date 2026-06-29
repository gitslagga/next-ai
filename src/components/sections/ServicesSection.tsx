import { getSiteContent, type Locale } from "@/lib/constants";
import React from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ServicesSectionProps {
  readonly locale: Locale;
}

/**
 * Services section displaying all blockchain development offerings
 * Used on homepage (preview) and /services page (full)
 */
export function ServicesSection({ locale }: ServicesSectionProps): React.ReactElement {
  const { services, ui } = getSiteContent(locale);

  return (
    <section className="relative py-20 md:py-32" id="services">
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={ui.servicesTitle}
          subtitle={ui.servicesSubtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <GlowCard key={service.id} className="flex flex-col h-full">
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
