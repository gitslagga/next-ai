import { NextResponse } from "next/server";
import type { ContactFormData, ApiResponse } from "@/lib/types";
import { logger } from "@/lib/logger";
import {
  getSiteContent,
  LOCALE_COOKIE_NAME,
  resolveLocale,
  resolveLocaleFromAcceptLanguage,
} from "@/lib/constants";

/**
 * Simple in-memory rate limiter using IP-based tracking.
 * Resets entries every 15 minutes to prevent memory leaks.
 */
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 10;

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Extracts the best available client identifier for rate limiting.
 * Prefer the proxied client IP, and fall back to a weak fingerprint
 * so requests without forwarding headers do not all share one bucket.
 */
const getClientIdentifier = (request: Request): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  const candidateIp = [
    forwardedFor?.split(",")[0]?.trim(),
    realIp?.trim(),
    cfConnectingIp?.trim(),
  ].find((value) => Boolean(value));

  console.log("Client identifier candidates:", {
    forwardedFor,
    realIp,
    cfConnectingIp,
  });
  if (candidateIp) {
    return candidateIp;
  }

  const userAgent = request.headers.get("user-agent")?.trim() ?? "unknown-agent";
  const acceptLanguage = request.headers.get("accept-language")?.trim() ?? "unknown-language";

  return `${userAgent}:${acceptLanguage}`;
};

/**
 * Checks if a request should be rate limited.
 * Returns true if rate limit is exceeded.
 */
const isRateLimited = (identifier: string): boolean => {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;

  // Clean up expired entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  return entry.count > MAX_REQUESTS_PER_WINDOW;
};

/**
 * POST /api/contact
 *
 * Handles contact form submissions with rate limiting.
 * Returns a standardized API response following the { data, error, meta } envelope.
 */
export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  const timestamp = new Date().toISOString();
  const cookieLocale = request.headers
    .get("cookie")
    ?.match(new RegExp(`${LOCALE_COOKIE_NAME}=([^;]+)`))?.[1];
  const locale = cookieLocale
    ? resolveLocale(cookieLocale)
    : resolveLocaleFromAcceptLanguage(request.headers.get("accept-language") ?? undefined);
  const { api } = getSiteContent(locale);

  // Rate limiting by the best available client IP, with a weak fallback fingerprint.
  const identifier = getClientIdentifier(request);
  if (isRateLimited(identifier)) {
    return NextResponse.json(
      {
        data: null,
        error: api.tooManyRequests,
        meta: { timestamp, status: 429 },
      },
      { status: 429 },
    );
  }

  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const missing: string[] = [];
    if (!body.name?.trim()) missing.push("name");
    if (!body.email?.trim()) missing.push("email");
    if (!body.message?.trim()) missing.push("message");

    if (missing.length > 0) {
      return NextResponse.json(
        {
          data: null,
          error: `${api.missingRequiredPrefix} ${missing.join(", ")}`,
          meta: { timestamp, status: 400 },
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          data: null,
          error: api.invalidEmail,
          meta: { timestamp, status: 400 },
        },
        { status: 400 },
      );
    }

    // In production, this would send an email or store in a database
    logger.info("Contact form submitted", {
      name: body.name,
      email: body.email,
      company: body.company ?? "not provided",
      service: body.service,
      messageLength: body.message.length,
    });

    return NextResponse.json(
      {
        data: {
          received: true,
          message: api.receivedMessage,
        },
        error: null,
        meta: { timestamp, status: 201 },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error("Contact form submission failed", { error: message });

    const isJsonError = error instanceof SyntaxError;
    return NextResponse.json(
      {
        data: null,
        error: isJsonError
          ? api.invalidRequestBody
          : api.internalError,
        meta: { timestamp, status: isJsonError ? 400 : 500 },
      },
      { status: isJsonError ? 400 : 500 },
    );
  }
}
