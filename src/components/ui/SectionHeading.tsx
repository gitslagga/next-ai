/**
 * Props for SectionHeading component
 */
interface SectionHeadingProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly centered?: boolean;
  readonly className?: string;
}

/**
 * Consistent section heading with gradient accent line
 * Used across all page sections for visual consistency
 */
export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps): React.ReactElement {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
        {title}
      </h2>
      <div
        className={`h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-6 ${
          centered ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
