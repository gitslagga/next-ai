import React from "react";
import { serializeJsonLd, type JsonLdValue } from "@/lib/seo";

interface JsonLdProps {
  readonly id: string;
  readonly payload: JsonLdValue;
}

/**
 * Renders a JSON-LD <script> tag with safely escaped payload.
 * Used for schema.org structured data (SEO + generative-engine friendly).
 */
export function JsonLd({ id, payload }: JsonLdProps): React.ReactElement {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(payload) }}
    />
  );
}
