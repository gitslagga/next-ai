"use client";
import React from "react";

import { useState, useCallback, type FormEvent } from "react";
import {
  getSiteContent,
  type Locale,
} from "@/lib/constants";
import type { ContactFormData, ContactFormErrors, ApiResponse } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ContactSectionProps {
  readonly locale: Locale;
}

/** Reusable form input styles */
const INPUT_STYLES =
  "w-full bg-dark-100 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors";

/** Form error text styles */
const ERROR_STYLES = "text-red-400 text-xs mt-1";

/**
 * Validates contact form fields and returns structured errors
 */
const validateForm = (
  data: ContactFormData,
  messages: {
    readonly requiredName: string;
    readonly shortName: string;
    readonly requiredEmail: string;
    readonly invalidEmail: string;
    readonly requiredMessage: string;
    readonly shortMessage: string;
  },
): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = messages.requiredName;
  } else if (data.name.length < 2) {
    errors.name = messages.shortName;
  }

  if (!data.email.trim()) {
    errors.email = messages.requiredEmail;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = messages.invalidEmail;
  }

  if (!data.message.trim()) {
    errors.message = messages.requiredMessage;
  } else if (data.message.length < 10) {
    errors.message = messages.shortMessage;
  }

  return errors;
};

/** Renders a single form field with label, input, and error message */
function FormField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required = false,
}: {
  readonly id: string;
  readonly name?: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly error?: string;
  readonly type?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
}): React.ReactElement {
  const fieldName = name ?? id;
  const labelText = required ? `${label} *` : label;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {labelText}
      </label>
      <input
        id={id}
        name={fieldName}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_STYLES}
        placeholder={placeholder}
      />
      {error && <p className={ERROR_STYLES} role="alert">{error}</p>}
    </div>
  );
}

/**
 * Contact form section with client-side validation.
 * Posts to /api/contact endpoint following RESTful conventions.
 */
export function ContactSection({ locale }: ContactSectionProps): React.ReactElement {
  const { services, ui, formErrors, formStatus } = getSiteContent(locale);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    service: "smart-contracts",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = useCallback(
    (field: keyof ContactFormData, value: string): void => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (field in prev && prev[field as keyof ContactFormErrors]) {
          return { ...prev, [field]: undefined };
        }
        return prev;
      });
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();

      // Read form data directly from the event target to avoid stale state dependency
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);
      const data: ContactFormData = {
        name: (formDataObj.get("name") as string) ?? "",
        email: (formDataObj.get("email") as string) ?? "",
        company: (formDataObj.get("company") as string) ?? "",
        service: (formDataObj.get("service") as string) ?? "smart-contracts",
        message: (formDataObj.get("message") as string) ?? "",
      };

      const validationErrors = validateForm(data, formErrors);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("loading");
      setErrors({});

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const json: ApiResponse = await res.json();

        if (!res.ok) {
          setStatus("error");
          setStatusMessage(json.error ?? formStatus.unknownError);
          return;
        }

        setStatus("success");
        setStatusMessage(formStatus.success);
        setFormData({ name: "", email: "", company: "", service: "smart-contracts", message: "" });
      } catch {
        setStatus("error");
        setStatusMessage(formStatus.networkError);
      }
    },
    [formErrors, formStatus],
  );

  return (
    <section className="relative py-20 md:py-32" id="contact">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={ui.contactTitle}
          subtitle={ui.contactSubtitle}
        />

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              id="name"
              label={ui.contactNameLabel}
              value={formData.name}
              onChange={(v) => handleChange("name", v)}
              error={errors.name}
              placeholder={ui.contactNamePlaceholder}
              required
            />
            <FormField
              id="email"
              label={ui.contactEmailLabel}
              type="email"
              value={formData.email}
              onChange={(v) => handleChange("email", v)}
              error={errors.email}
              placeholder={ui.contactEmailPlaceholder}
              required
            />
          </div>

          {/* Company (optional) */}
          <FormField
            id="company"
            label={ui.contactCompanyLabel}
            value={formData.company ?? ""}
            onChange={(v) => handleChange("company", v)}
            placeholder={ui.contactCompanyPlaceholder}
          />

          {/* Service Select */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
              {ui.contactServiceLabel}
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={(e) => handleChange("service", e.target.value)}
              className={INPUT_STYLES}
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              {`${ui.contactMessageLabel} *`}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              rows={5}
              className={INPUT_STYLES}
              placeholder={ui.contactMessagePlaceholder}
            />
            {errors.message && (
              <p className={ERROR_STYLES} role="alert">{errors.message}</p>
            )}
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div
              className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
              role="alert"
            >
              {statusMessage}
            </div>
          )}
          {status === "error" && (
            <div
              className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
              role="alert"
            >
              {statusMessage}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={status === "loading"}
          >
            {status === "loading" ? ui.contactSendingButton : ui.contactSendButton}
          </Button>
        </form>
      </div>
    </section>
  );
}
