import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../context/RouterContext";
import { therapyPrograms } from "../config/siteContent";
import { VisitRequestSection } from "../components/VisitRequestSection";
import { Sparkles, Calendar, Clock, CheckCircle, ArrowRight } from "lucide-react";

export const TherapyPage: React.FC = () => {
  const { t, isAmharic } = useLanguage();
  const { navigate, setVisitPresetProgram } = useRouter();

  const handleBookAssessment = () => {
    setVisitPresetProgram("therapy");
    const el = document.getElementById("therapy-visit-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/visit");
    }
  };

  return (
    <div className="space-y-14 py-8 md:py-12">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-[720px] mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.therapyPage.title}</span>
          </div>
          <h1 className="text-fluid-h1 font-extrabold text-[var(--color-navy)] mb-4">
            {t.therapyPage.title}
          </h1>
          <p className="text-[1.15rem] text-[var(--color-muted)] leading-relaxed mb-6">
            {t.therapyPage.intro}
          </p>

          <button
            type="button"
            onClick={handleBookAssessment}
            className="btn-primary py-3.5 px-7 text-base font-semibold shadow-xs"
          >
            {t.therapyPage.bookAssessment}
          </button>
        </div>

        {/* Program Cards */}
        <div className="mb-14">
          <h2 className="text-fluid-h2 mb-6">{t.therapyPage.programsTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full-day program */}
            <div className="card-soft p-6 sm:p-7 flex flex-col justify-between border border-[var(--color-line)] hover:border-[var(--color-green)] transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-heading text-[var(--color-navy)] m-0">
                    {isAmharic ? "ሙሉ ቀን ፕሮግራም" : "Full-day program"}
                  </h3>
                  <span className="font-heading font-extrabold text-xl text-[var(--color-green)]">
                    30,000 ETB
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[var(--color-green)] shrink-0" />
                  <span>
                    Monday to Friday, 7:00 AM to 3:00 PM (1:00 to 9:00 local)
                  </span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  30,000 ETB / month
                </div>
              </div>
            </div>

            {/* After-school program */}
            <div className="card-soft p-6 sm:p-7 flex flex-col justify-between border border-[var(--color-line)] hover:border-[var(--color-green)] transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-heading text-[var(--color-navy)] m-0">
                    {isAmharic ? "ከመደበኛ ትምህርት በኋላ (አፍተር-ስኩል)" : "After-school program"}
                  </h3>
                  <span className="font-heading font-extrabold text-xl text-[var(--color-green)]">
                    8,000 ETB
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[var(--color-green)] shrink-0" />
                  <span>
                    Monday to Friday, 3:00 PM to 6:00 PM (9:00 to 12:00 local)
                  </span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  8,000 ETB / month, therapy included
                </div>
              </div>
            </div>

            {/* Saturday sessions */}
            <div className="card-soft p-6 sm:p-7 flex flex-col justify-between border border-[var(--color-line)] hover:border-[var(--color-green)] transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-heading text-[var(--color-navy)] m-0">
                    {isAmharic ? "የቅዳሜ ፕሮግራሞች" : "Saturday sessions"}
                  </h3>
                  <span className="font-heading font-extrabold text-xl text-[var(--color-green)]">
                    2,000 ETB
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[var(--color-green)] shrink-0" />
                  <span>
                    Saturday sessions
                  </span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  2,000 ETB / month
                </div>
              </div>
            </div>

            {/* One-hour therapy */}
            <div className="card-soft p-6 sm:p-7 flex flex-col justify-between border border-[var(--color-line)] hover:border-[var(--color-green)] transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-heading text-[var(--color-navy)] m-0">
                    {isAmharic ? "የአንድ ሰዓት ቴራፒ" : "One-hour therapy"}
                  </h3>
                  <span className="font-heading font-extrabold text-xl text-[var(--color-green)]">
                    1,000 ETB
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted)] m-0">
                  {isAmharic
                    ? "ከባለሙያ ጋር የሚደረግ የግል የቴራፒ ክፍለ ጊዜ።"
                    : "Individual session with a professional."}
                </p>
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  1,000 ETB / hour
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[0.94rem] text-[var(--color-muted)] font-medium">
            {t.therapyPage.registrationNote}
          </p>
        </div>

        {/* Numbered Timeline (1 to 5) */}
        <div className="py-8 border-y border-[var(--color-line)] mb-14">
          <h2 className="text-fluid-h2 mb-8">
            {t.therapyPage.timelineTitle}
          </h2>

          <div className="space-y-6 max-w-[800px]">
            {t.therapyPage.steps.map((s) => (
              <div
                key={s.step}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)]"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-green)] text-white font-heading font-bold text-lg flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-[var(--color-text)] m-0">
                    {s.title}
                  </h3>
                  <p className="text-[var(--color-muted)] text-[0.98rem] leading-relaxed m-0">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing Line */}
          <div className="mt-8 p-6 rounded-2xl bg-[var(--color-soft-green)]/60 border border-[var(--color-green)]/20 max-w-[800px]">
            <p className="text-[1.08rem] font-semibold text-[var(--color-navy)] leading-relaxed m-0">
              {t.therapyPage.closingLine}
            </p>
          </div>
        </div>

        {/* Visit Section pre-set for Therapy */}
        <VisitRequestSection initialProgram="therapy" id="therapy-visit-form" />
      </div>
    </div>
  );
};
