import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../context/RouterContext";
import { FeeCalculator } from "../components/FeeCalculator";
import { VisitRequestSection } from "../components/VisitRequestSection";
import { Clock, Phone, Calendar, ShieldCheck, Heart } from "lucide-react";

export const DaycarePage: React.FC = () => {
  const { t, isAmharic } = useLanguage();
  const { navigate } = useRouter();

  const scrollToVisit = () => {
    const el = document.getElementById("daycare-visit-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/visit");
    }
  };

  return (
    <div className="space-y-12 py-8 md:py-12">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-[700px] mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>{t.daycarePage.title}</span>
          </div>
          <h1 className="text-fluid-h1 font-extrabold text-[var(--color-navy)] mb-4">
            {t.daycarePage.title}
          </h1>
          <p className="text-[1.12rem] text-[var(--color-muted)] leading-relaxed">
            {t.daycarePage.intro}
          </p>
        </div>

        {/* Interactive Fee Calculator */}
        <div className="mb-14">
          <FeeCalculator />
        </div>

        {/* Opening Hours Cards */}
        <div className="mb-14">
          <h2 className="text-fluid-h2 mb-6">{t.daycarePage.hoursTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[800px]">
            {/* Monday to Friday */}
            <div className="card-soft p-6 sm:p-7 space-y-2 border border-[var(--color-line)]">
              <div className="flex items-center gap-2.5 text-[var(--color-green)] font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>{t.daycarePage.monFriTitle}</span>
              </div>
              <div className="text-2xl font-bold font-heading text-[var(--color-navy)]">
                {t.daycarePage.monFriTime}
              </div>
              <div className="text-sm font-medium text-[var(--color-muted)]">
                ({t.daycarePage.monFriLocal})
              </div>
            </div>

            {/* Saturday */}
            <div className="card-soft p-6 sm:p-7 space-y-2 border border-[var(--color-line)]">
              <div className="flex items-center gap-2.5 text-[var(--color-green)] font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>{t.daycarePage.satTitle}</span>
              </div>
              <div className="text-2xl font-bold font-heading text-[var(--color-navy)]">
                {t.daycarePage.satTime}
              </div>
              <div className="text-sm font-medium text-[var(--color-muted)]">
                ({t.daycarePage.satLocal})
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Call to Register & Book a Visit */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] max-w-[800px] flex flex-col sm:flex-row items-center justify-between gap-4 mb-14">
          <div>
            <h3 className="text-lg font-bold text-[var(--color-navy)] m-0">
              {isAmharic ? "ልጅዎን ለማስመዝገብ ዝግጁ ኖት?" : "Ready to register or have questions?"}
            </h3>
            <p className="text-sm text-[var(--color-muted)] m-0 mt-1">
              {isAmharic
                ? "በቀጥታ በስልክ ይደውሉ ወይም የጉብኝት ቀን ይያዙ።"
                : "Call our admissions team or request a personal tour of our rooms."}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:0917730032"
              className="btn-secondary py-3 px-5 text-sm font-semibold flex-1 sm:flex-none justify-center gap-2 no-underline"
            >
              <Phone className="w-4 h-4" />
              <span>{t.daycarePage.callToRegister}</span>
            </a>

            <button
              type="button"
              onClick={scrollToVisit}
              className="btn-primary py-3 px-5 text-sm font-semibold flex-1 sm:flex-none justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.daycarePage.bookVisit}</span>
            </button>
          </div>
        </div>

        {/* Visit Section preselected for Daycare */}
        <VisitRequestSection initialProgram="daycare" id="daycare-visit-form" />
      </div>
    </div>
  );
};
