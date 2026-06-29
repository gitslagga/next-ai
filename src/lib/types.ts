/**
 * Core type definitions for the blockchain marketing site
 */

/** Navigation link structure */
export interface NavLink {
  readonly label: string;
  readonly href: string;
}

/** Service offering card */
export interface Service {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
}

/** Portfolio / case study item */
export interface PortfolioItem {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly tags: readonly string[];
  readonly results: readonly string[];
}

/** Team member profile */
export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly imageUrl: string;
  readonly socials?: Readonly<Record<string, string>>;
}

/** Contact form data sent from the frontend */
export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly company?: string;
  readonly service: string;
  readonly message: string;
}

/** Standard API response envelope (follows api-conventions.md) */
export interface ApiResponse<T = unknown> {
  readonly data: T | null;
  readonly error: string | null;
  readonly meta: {
    readonly timestamp: string;
    readonly status: number;
  };
}

/** Contact form validation errors (mutable - built up incrementally) */
export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/** Statistic for hero/metrics section */
export interface Stat {
  readonly value: string;
  readonly label: string;
  readonly suffix?: string;
}
