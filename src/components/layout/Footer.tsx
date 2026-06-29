import Link from "next/link";
import React from "react";
import { getSiteContent, type Locale } from "@/lib/constants";

interface FooterProps {
  readonly locale: Locale;
}

/**
 * Site-wide footer with navigation, social links, and copyright
 * Features a gradient top border for visual separation
 */
export function Footer({ locale }: FooterProps): React.ReactElement {
  const currentYear = new Date().getFullYear();
  const { company, navLinks, ui } = getSiteContent(locale);

  return (
    <footer className="relative border-t border-primary/10 bg-dark-400">
      {/* Gradient top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold gradient-text font-mono">
              {company.name}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {company.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{ui.footerQuickLinks}</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{ui.footerContact}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {company.email}
                </a>
              </li>
              <li>{company.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} {company.name}. {ui.footerRightsReserved}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors text-sm"
            >
              {ui.socialTwitter}
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors text-sm"
            >
              {ui.socialGithub}
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors text-sm"
            >
              {ui.socialDiscord}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
