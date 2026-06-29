import { getSiteContent, type Locale } from "@/lib/constants";
import React from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface AboutSectionProps {
  readonly locale: Locale;
}

/**
 * About section with company story, values, and team grid
 * Used on homepage (preview) and /about page (full)
 */
export function AboutSection({ locale }: AboutSectionProps): React.ReactElement {
  const { team, ui } = getSiteContent(locale);

  return (
    <section className="relative py-20 md:py-32" id="about">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Info */}
        <SectionHeading
          title={ui.aboutTitle}
          subtitle={ui.aboutSubtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{ui.aboutStoryTitle}</h3>
            <p className="text-gray-400 leading-relaxed">{ui.aboutStoryBody}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{ui.aboutApproachTitle}</h3>
            <p className="text-gray-400 leading-relaxed">{ui.aboutApproachBody}</p>
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {ui.aboutTeamTitle}
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <GlowCard key={member.name} className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
                <span className="text-2xl font-bold gradient-text">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h4 className="text-white font-semibold">{member.name}</h4>
              <p className="text-primary text-sm font-medium mb-3">
                {member.role}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {member.bio}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
