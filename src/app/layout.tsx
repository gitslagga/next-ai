import type { Metadata, Viewport } from "next";
import React from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteContent, SITE_URL } from "@/lib/constants";
import { getRequestLocale } from "@/lib/locale";
import "./globals.css";

/**
 * Optimized font loading via next/font.
 * Inter is the primary sans-serif body font.
 * JetBrains Mono is used for code and branding elements.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a1a",
  colorScheme: "dark",
};

/**
 * Global site metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { seo } = getSiteContent(locale);

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: "NEXT AI",
    manifest: "/manifest.webmanifest",
    title: {
      default: seo.rootTitleDefault,
      template: seo.rootTitleTemplate,
    },
    description: seo.rootDescription,
    keywords: [...seo.keywords],
    authors: [{ name: "NEXT AI" }],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: SITE_URL,
      locale: seo.openGraphLocale,
      siteName: "NEXT AI",
      title: seo.rootTitleDefault,
      description: seo.openGraphDescription,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "NEXT AI — Blockchain software development studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.rootTitleDefault,
      description: seo.openGraphDescription,
      images: ["/twitter-image"],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "NEXT AI",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

/**
 * Root layout wrapping all pages.
 * Provides Navbar, main content area, and Footer.
 * Fonts loaded via next/font for zero layout shift.
 */
export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}): Promise<React.ReactElement> {
  const locale = await getRequestLocale();

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-dark-400 text-gray-200 antialiased font-sans">
        <Navbar locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
