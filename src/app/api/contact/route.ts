import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
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

interface MailConfig {
  readonly host: string;
  readonly port: number;
  readonly secure: boolean;
  readonly username: string;
  readonly password: string;
  readonly from: string;
  readonly to: string;
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 10;
const ALIYUN_DEFAULT_SMTP_HOST = "smtp.qiye.aliyun.com";
const ALIYUN_DEFAULT_SMTP_PORT = 465;

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Loads required SMTP settings for Aliyun enterprise email.
 */
const getMailConfig = (): MailConfig => {
  const username = process.env.ALIYUN_EMAIL_USERNAME?.trim();
  const password = process.env.ALIYUN_EMAIL_PASSWORD?.trim();
  const from = process.env.ALIYUN_EMAIL_FROM?.trim();
  const to = process.env.ALIYUN_EMAIL_TO?.trim();

  if (!username || !password || !from || !to) {
    throw new Error(
      "Missing required email environment variables: ALIYUN_EMAIL_USERNAME, ALIYUN_EMAIL_PASSWORD, ALIYUN_EMAIL_FROM, ALIYUN_EMAIL_TO.",
    );
  }

  const host = process.env.ALIYUN_EMAIL_SMTP_HOST?.trim() || ALIYUN_DEFAULT_SMTP_HOST;
  const portRaw = process.env.ALIYUN_EMAIL_SMTP_PORT?.trim();
  const parsedPort = portRaw ? Number.parseInt(portRaw, 10) : ALIYUN_DEFAULT_SMTP_PORT;
  if (Number.isNaN(parsedPort) || parsedPort <= 0) {
    throw new Error("ALIYUN_EMAIL_SMTP_PORT must be a positive number.");
  }

  const secureRaw = process.env.ALIYUN_EMAIL_SMTP_SECURE?.trim().toLowerCase();
  const secure = secureRaw ? secureRaw === "true" : parsedPort === ALIYUN_DEFAULT_SMTP_PORT;

  return {
    host,
    port: parsedPort,
    secure,
    username,
    password,
    from,
    to,
  };
};

/**
 * Escapes user-provided values for safe HTML email rendering.
 */
const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

/**
 * Sends contact-form notification via Aliyun enterprise email SMTP.
 */
const sendContactNotification = async (body: ContactFormData): Promise<void> => {
  const mailConfig = getMailConfig();

  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure,
    auth: {
      user: mailConfig.username,
      pass: mailConfig.password,
    },
  });

  const company = body.company?.trim() || "Not provided";

  await transporter.sendMail({
    from: mailConfig.from,
    to: mailConfig.to,
    replyTo: body.email,
    subject: `[NEXT AI] New contact inquiry from ${body.name.trim()}`,
    text: [
      "A new contact form has been submitted.",
      "",
      `Name: ${body.name.trim()}`,
      `Email: ${body.email.trim()}`,
      `Company: ${company}`,
      `Service: ${body.service.trim() || "Not provided"}`,
      "",
      "Message:",
      body.message.trim(),
    ].join("\n"),
    html: `
      <h2>New contact inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(body.name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email.trim())}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Service:</strong> ${escapeHtml(body.service.trim() || "Not provided")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(body.message.trim()).replaceAll("\n", "<br />")}</p>
    `,
  });
};

/**
 * Fire-and-forget mail dispatch so API response is not coupled to SMTP availability.
 */
const dispatchContactNotification = (body: ContactFormData): void => {
  void sendContactNotification(body)
    .then(() => {
      logger.info("Contact notification email sent", {
        name: body.name,
        email: body.email,
        service: body.service,
      });
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      logger.error("Contact notification email failed", {
        name: body.name,
        email: body.email,
        service: body.service,
        error: message,
      });
    });
};

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

  logger.debug("Client identifier candidates", {
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

    // Send notification email
    logger.info("Contact form submitted", {
      name: body.name,
      email: body.email,
      company: body.company ?? "not provided",
      service: body.service,
      messageLength: body.message.length,
    });
    dispatchContactNotification(body);

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
