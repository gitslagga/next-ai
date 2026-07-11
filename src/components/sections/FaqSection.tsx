import React from "react";
import { getSiteContent, type Locale } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqJsonLd } from "@/lib/seo";

interface FaqSectionProps {
  readonly locale: Locale;
}

const HEADINGS: Readonly<Record<Locale, { title: string; subtitle: string }>> = {
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Straight answers about scope, timelines, security and pricing.",
  },
  zh: {
    title: "常见问题",
    subtitle: "关于合作范围、周期、安全与报价的直接回答。",
  },
};

/**
 * FAQ section — renders questions as semantic <details> and injects
 * matching FAQPage JSON-LD for SEO and generative-engine citation.
 */
export function FaqSection({ locale }: FaqSectionProps): React.ReactElement {
  const { faq } = getSiteContent(locale);
  const heading = HEADINGS[locale];

  return (
    <section className="relative py-20 md:py-28" id="faq">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={heading.title} subtitle={heading.subtitle} />

        <div className="mt-10 space-y-3">
          {faq.map((entry) => (
            <details
              key={entry.question}
              className="group rounded-lg border border-primary/10 bg-dark-300/40 p-5 transition-colors hover:border-primary/30"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-white marker:hidden flex items-start justify-between gap-4">
                <span>{entry.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                {entry.answer}
              </p>
            </details>
          ))}
        </div>

        <JsonLd id="ld-faq" payload={buildFaqJsonLd(locale)} />
      </div>
    </section>
  );
}
