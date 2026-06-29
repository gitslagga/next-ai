import { cookies, headers } from "next/headers";
import {
  LOCALE_COOKIE_NAME,
  resolveLocale,
  resolveLocaleFromAcceptLanguage,
  type Locale,
} from "@/lib/constants";

/**
 * Reads the locale from request cookies and falls back to browser language.
 */
export const getRequestLocale = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale) {
    return resolveLocale(cookieLocale);
  }

  const headerStore = await headers();
  return resolveLocaleFromAcceptLanguage(headerStore.get("accept-language") ?? undefined);
};
