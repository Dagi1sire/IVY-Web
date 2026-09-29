import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { VisitRequestSection } from "../components/VisitRequestSection";
import { Phone, Clock, MapPin, Sparkles, ShieldCheck } from "lucide-react";

export const VisitPage: React.FC = () => {
  const { t, isAmharic } = useLanguage();

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        {/* Info Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Phone */}
          <div className="card-soft p-5 border border-[var(--color-line)] flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block">
                {isAmharic ? "ቀጥታ ስልክ" : "Direct Phone"}
              </span>
              <a
                href="tel:0917730032"
                className="text-lg font-bold font-heading text-[var(--color-navy)] hover:text-[var(--color-green)] no-underline"
              >
                0917 730 032
              </a>
              <p className="text-xs text-[var(--color-muted)] m-0 mt-0.5">
                {isAmharic ? "ጥሪዎችን በደስታ እንቀበላለን" : "Call us directly during opening hours"}
              </p>
            </div>
          </div>

          {/* Card 2: Hours */}
          <div className="card-soft p-5 border border-[var(--color-line)] flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block">
                {isAmharic ? "የስራ ሰዓት" : "Opening Hours"}
              </span>
              <span className="text-sm font-bold text-[var(--color-navy)] block">
                Mon&ndash;Fri 7:00 AM&ndash;6:00 PM
              </span>
              <span className="text-xs text-[var(--color-muted)] block">
                (1:00&ndash;12:00 local time)
              </span>
              <span className="text-xs text-[var(--color-muted)] block mt-0.5">
                Sat 7:00 AM&ndash;4:00 PM (1:00&ndash;10:00 local)
              </span>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="card-soft p-5 border border-[var(--color-line)] flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block">
                {isAmharic ? "ቦታ" : "Location"}
              </span>
              <span className="text-sm font-bold text-[var(--color-navy)] block">
                Addis Ababa, Ethiopia
              </span>
              <p className="text-xs text-[var(--color-muted)] m-0 mt-0.5">
                {isAmharic ? "ትክክለኛ አቅጣጫ በስልክ ይነገራል" : "Contact for specific gate & street directions"}
              </p>
            </div>
          </div>
        </div>

        {/* The Visit Request Form */}
        <VisitRequestSection id="visit-page-form" />
      </div>
    </div>
  );
};
