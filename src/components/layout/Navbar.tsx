"use client";
import React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getSiteContent,
  LOCALE_COOKIE_NAME,
  resolveLocale,
  type Locale,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  readonly locale: Locale;
}

/**
 * Responsive navigation bar with mobile hamburger menu.
 * Features scroll-aware background, smooth mobile transitions,
 * and proper keyboard accessibility.
 */
export function Navbar({ locale }: NavbarProps): React.ReactElement {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { navLinks, company, ui } = getSiteContent(currentLocale);

  // Check initial scroll position (handles browser back/forward restoration)
  useEffect(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  const handleScroll = useCallback((): void => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const switchLocale = useCallback(
    (nextLocale: Locale): void => {
      const normalized = resolveLocale(nextLocale);
      if (normalized === currentLocale) {
        return;
      }

      setCurrentLocale(normalized);
      document.cookie = `${LOCALE_COOKIE_NAME}=${normalized}; Path=/; Max-Age=31536000; SameSite=Lax`;
      router.refresh();
    },
    [currentLocale, router],
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-400/90 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={closeMenu}
          >
            <span className="text-xl md:text-2xl font-bold gradient-text font-mono">
              {company.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="inline-flex items-center rounded-lg border border-primary/30 bg-dark-200/60 p-1">
              <button
                type="button"
                className={`px-2 py-1 text-xs rounded ${currentLocale === "en" ? "bg-primary text-dark-400 font-semibold" : "text-gray-300"}`}
                onClick={() => switchLocale("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={`px-2 py-1 text-xs rounded ${currentLocale === "zh" ? "bg-primary text-dark-400 font-semibold" : "text-gray-300"}`}
                onClick={() => switchLocale("zh")}
              >
                中文
              </button>
            </div>
            <Button size="sm" href="/contact">
              {ui.navbarCta}
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            aria-label={ui.navbarToggleAriaLabel}
            aria-expanded={isOpen}
          >
            <span
              aria-hidden="true"
              className={`block h-0.5 w-6 bg-gray-300 transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`block h-0.5 w-6 bg-gray-300 transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`block h-0.5 w-6 bg-gray-300 transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        aria-hidden={!isOpen}
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-4 bg-dark-400/95 backdrop-blur-xl border-t border-primary/10 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              tabIndex={isOpen ? 0 : -1}
              className="block py-3 px-4 text-gray-300 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-1 px-2">
            <div className="inline-flex items-center rounded-lg border border-primary/30 bg-dark-200/60 p-1 w-full">
              <button
                type="button"
                className={`flex-1 px-2 py-2 text-xs rounded ${currentLocale === "en" ? "bg-primary text-dark-400 font-semibold" : "text-gray-300"}`}
                onClick={() => switchLocale("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={`flex-1 px-2 py-2 text-xs rounded ${currentLocale === "zh" ? "bg-primary text-dark-400 font-semibold" : "text-gray-300"}`}
                onClick={() => switchLocale("zh")}
              >
                中文
              </button>
            </div>
          </div>
          <div className="pt-2 px-2">
            <Button href="/contact" className="w-full" onClick={closeMenu}>
              {ui.navbarCta}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
