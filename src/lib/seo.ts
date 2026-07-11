import type { Locale } from "@/lib/constants";
import { SITE_URL, getSiteContent } from "@/lib/constants";

/**
 * Recursive JSON-LD value. Kept as a JSON-shaped union so we can
 * embed schema.org objects without resorting to `any`.
 */
export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonLdValue[]
  | { readonly [key: string]: JsonLdValue | undefined };

/** Breadcrumb node passed to buildBreadcrumbJsonLd */
export interface BreadcrumbInput {
  readonly name: string;
  readonly path: string;
}

const absoluteUrl = (path: string): string => {
  if (path.startsWith("http")) {
    return path;
  }
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const bcp47 = (locale: Locale): string => (locale === "zh" ? "zh-CN" : "en-US");

/**
 * Organization / ProfessionalService schema — the anchor entity
 * for Knowledge Graph and generative-engine citations.
 */
export const buildOrganizationJsonLd = (locale: Locale): JsonLdValue => {
  const { company, seo, services } = getSiteContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}#organization`,
    name: company.name,
    alternateName: "NEXT AI Studio",
    url: SITE_URL,
    logo: absoluteUrl("/icon"),
    image: absoluteUrl("/opengraph-image"),
    email: `mailto:${company.email}`,
    description: seo.rootDescription,
    slogan: company.tagline,
    foundingDate: "2019",
    inLanguage: [bcp47("en"), bcp47("zh")],
    knowsAbout: [...seo.keywords],
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
    areaServed: [
      { "@type": "Place", name: "Worldwide" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "China" },
      { "@type": "Country", name: "Singapore" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: company.location,
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: company.email,
        availableLanguage: ["English", "Chinese"],
        areaServed: "Worldwide",
      },
    ],
    sameAs: [
      "https://github.com/gitslagga",
    ],
  };
};

/**
 * WebSite schema with SearchAction — enables sitelinks search box
 * and helps AI engines understand site scope.
 */
export const buildWebSiteJsonLd = (locale: Locale): JsonLdValue => {
  const { seo } = getSiteContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: "NEXT AI",
    description: seo.rootDescription,
    inLanguage: bcp47(locale),
    publisher: { "@id": `${SITE_URL}#organization` },
  };
};

/**
 * ItemList of services — rich results in SERPs and a concrete
 * citation surface for generative engines.
 */
export const buildServicesJsonLd = (locale: Locale): JsonLdValue => {
  const { services, company } = getSiteContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/services#list`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    inLanguage: bcp47(locale),
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/services#${service.id}`,
        name: service.title,
        serviceType: service.title,
        description: service.description,
        url: `${SITE_URL}/services#${service.id}`,
        provider: { "@id": `${SITE_URL}#organization` },
        areaServed: "Worldwide",
        brand: company.name,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.title,
          itemListElement: service.features.map((feature) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: feature },
          })),
        },
      },
    })),
  };
};

/**
 * Portfolio ItemList schema — turns case studies into structured
 * CreativeWork entries that engines can cite.
 */
export const buildPortfolioJsonLd = (locale: Locale): JsonLdValue => {
  const { portfolio } = getSiteContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/portfolio#list`,
    numberOfItems: portfolio.length,
    inLanguage: bcp47(locale),
    itemListElement: portfolio.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/portfolio#${item.id}`,
        name: item.title,
        genre: item.category,
        description: item.description,
        image: absoluteUrl(item.imageUrl),
        keywords: [...item.tags].join(", "),
        creator: { "@id": `${SITE_URL}#organization` },
        url: `${SITE_URL}/portfolio#${item.id}`,
      },
    })),
  };
};

/**
 * Team roster schema — improves the About page's entity graph.
 */
export const buildTeamJsonLd = (locale: Locale): JsonLdValue => {
  const { team } = getSiteContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/about#team`,
    numberOfItems: team.length,
    inLanguage: bcp47(locale),
    itemListElement: team.map((member, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        description: member.bio,
        image: absoluteUrl(member.imageUrl),
        worksFor: { "@id": `${SITE_URL}#organization` },
      },
    })),
  };
};

/**
 * FAQPage schema — highly favored by AI answer engines for
 * direct-quote citation (Google AI Overview, ChatGPT, Perplexity).
 */
export const buildFaqJsonLd = (locale: Locale): JsonLdValue => {
  const { faq } = getSiteContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: bcp47(locale),
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
};

/**
 * BreadcrumbList — improves nav understanding for classic crawlers
 * and AI answer engines.
 */
export const buildBreadcrumbJsonLd = (
  crumbs: readonly BreadcrumbInput[],
): JsonLdValue => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
};

/** WebPage schema — attaches per-page metadata to the org entity. */
export const buildWebPageJsonLd = (input: {
  readonly locale: Locale;
  readonly path: string;
  readonly title: string;
  readonly description: string;
}): JsonLdValue => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.title,
    description: input.description,
    inLanguage: bcp47(input.locale),
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/opengraph-image"),
    },
  };
};

/**
 * Serializes JSON-LD safely for embedding inside a <script> tag.
 * Escapes `<` to prevent premature tag closing (XSS safe).
 */
export const serializeJsonLd = (payload: JsonLdValue): string => {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
};
