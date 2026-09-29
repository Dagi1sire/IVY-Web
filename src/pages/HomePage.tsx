import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../context/RouterContext";
import { IvyVineAnimation } from "../components/IvyVineAnimation";
import { OurSpaceGallery } from "../components/OurSpaceGallery";
import { FaqAccordion } from "../components/FaqAccordion";
import { VisitRequestSection } from "../components/VisitRequestSection";
import { MilestoneGuide } from "../components/MilestoneGuide";
import { Calendar, FileText, Video, Sparkles, ArrowRight, Clock } from "lucide-react";

export const HomePage: React.FC = () => {
  const { t, isAmharic } = useLanguage();
  const { navigate, setVisitPresetProgram } = useRouter();

  const handleProgramClick = (path: string, prog?: "daycare" | "therapy") => {
    if (prog) setVisitPresetProgram(prog);
    navigate(path);
  };

  const scrollToVisit = () => {
    const el = document.getElementById("home-visit-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/visit");
    }
  };

  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <section className="pt-8 pb-14 md:pt-14 md:pb-20 relative overflow-hidden">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              {/* Hand-drawn Ivy vine animation */}
              <div className="w-full max-w-[340px] sm:max-w-[420px] mb-2">
                <IvyVineAnimation />
              </div>

              <h1 className="text-fluid-h1 font-extrabold tracking-tight text-[var(--color-navy)] leading-[1.18] max-w-[20ch]">
                {t.hero.title}
              </h1>

              <p className="text-[1.1rem] sm:text-[1.2rem] text-[var(--color-muted)] leading-relaxed max-w-[55ch]">
                {t.hero.intro}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToVisit}
                  className="btn-primary px-7 py-3.5 text-base shadow-sm font-semibold"
                >
                  {t.hero.bookVisit}
                </button>

                <a
                  href="#programs-overview"
                  className="btn-outline px-6 py-3.5 text-base font-semibold"
                >
                  {t.hero.seePrograms}
                </a>
              </div>
            </div>

            {/* Visual Hero Feature Badge */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="card-soft p-6 space-y-4 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-soft-green)]/30 border border-[var(--color-line)] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[var(--color-text)] m-0">
                  {isAmharic ? "ግልጽ እና የተሟላ መረጃ" : "Clear communication"}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed m-0">
                  {isAmharic
                    ? "በየቀኑ የጽሁፍ ሪፖርት፣ በየሳምንቱ አርብ የቪዲዮ ዝመና፤ ልጅዎ እንዴት እንዳለፈ ሁልጊዜ ግልጽ ነው።"
                    : "Daily written reports, weekly Friday video updates, and complete transparency into your child's milestones."}
                </p>
                <div className="pt-2 border-t border-[var(--color-line)] text-xs text-[var(--color-muted)] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[var(--color-green)]" />
                  <span>Mon&ndash;Fri 7:00 AM&ndash;6:00 PM (1:00&ndash;12:00 local)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose the program that fits your child */}
      <section id="programs-overview" className="py-12 md:py-16 scroll-mt-20">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center max-w-[640px] mx-auto">
            <h2 className="text-fluid-h2 mb-3">
              {t.programsPreview.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Daycare */}
            <div className="card-soft p-7 sm:p-8 flex flex-col justify-between hover:border-[var(--color-green)] transition-colors">
              <div className="space-y-4">
                <div className="inline-flex px-3 py-1 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] text-xs font-bold uppercase tracking-wider">
                  {t.programsPreview.daycareTitle}
                </div>
                <h3 className="text-fluid-h3 font-bold text-[var(--color-navy)] m-0">
                  {t.programsPreview.daycareTitle}
                </h3>
                <p className="text-[var(--color-muted)] text-[1.02rem] leading-relaxed">
                  {t.programsPreview.daycareDesc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--color-line)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="font-heading font-bold text-lg text-[var(--color-navy)]">
                  {t.programsPreview.daycarePrice}
                </span>
                <button
                  type="button"
                  onClick={() => handleProgramClick("/daycare", "daycare")}
                  className="btn-secondary px-5 py-2.5 text-sm font-semibold"
                >
                  {t.programsPreview.daycareButton}
                </button>
              </div>
            </div>

            {/* Card 2: Therapy & Special Support */}
            <div className="card-soft p-7 sm:p-8 flex flex-col justify-between hover:border-[var(--color-green)] transition-colors">
              <div className="space-y-4">
                <div className="inline-flex px-3 py-1 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] text-xs font-bold uppercase tracking-wider">
                  {t.programsPreview.therapyTitle}
                </div>
                <h3 className="text-fluid-h3 font-bold text-[var(--color-navy)] m-0">
                  {t.programsPreview.therapyTitle}
                </h3>
                <p className="text-[var(--color-muted)] text-[1.02rem] leading-relaxed">
                  {t.programsPreview.therapyDesc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--color-line)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="font-heading font-bold text-lg text-[var(--color-navy)]">
                  {t.programsPreview.therapyPrice}
                </span>
                <button
                  type="button"
                  onClick={() => handleProgramClick("/therapy", "therapy")}
                  className="btn-secondary px-5 py-2.5 text-sm font-semibold"
                >
                  {t.programsPreview.therapyButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You always know how your child's day went */}
      <section className="py-12 md:py-16 bg-[var(--color-soft-green)]/35 border-y border-[var(--color-line)]">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <div className="mb-10 max-w-[640px]">
            <h2 className="text-fluid-h2 mb-4">
              {t.reporting.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Daily Report */}
            <div className="card-soft p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[var(--color-text)] m-0">
                  {t.reporting.dailyTitle}
                </h3>
              </div>
              <p className="text-[var(--color-muted)] text-[0.98rem] leading-relaxed m-0">
                {t.reporting.dailyDesc}
              </p>
            </div>

            {/* Friday Video */}
            <div className="card-soft p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[var(--color-text)] m-0">
                  {t.reporting.fridayTitle}
                </h3>
              </div>
              <p className="text-[var(--color-muted)] text-[0.98rem] leading-relaxed m-0">
                {t.reporting.fridayDesc}
              </p>
            </div>
          </div>

          {/* Continuity note */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] max-w-[800px]">
            <p className="text-[1.02rem] text-[var(--color-text)] leading-relaxed font-medium m-0">
              {t.reporting.continuity}
            </p>
          </div>
        </div>
      </section>

      {/* Our space gallery */}
      <OurSpaceGallery />

      {/* Milestone & Visit Preparation guide (Gemini) */}
      <MilestoneGuide />

      {/* FAQ */}
      <FaqAccordion />

      {/* Visit Request Section */}
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        <VisitRequestSection id="home-visit-form" />
      </div>
    </div>
  );
};
