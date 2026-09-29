import React, { useState } from "react";
import { feeData } from "../config/siteContent";
import { useLanguage } from "../i18n/LanguageContext";
import { Calculator, Check } from "lucide-react";

export type ScheduleOption = "full" | "half" | "three" | "dropIn";

export const FeeCalculator: React.FC = () => {
  const { t, isAmharic } = useLanguage();

  // Selected age index: 0 = "Above 2 years", 1 = "1 to 2 years", 2 = "6 months to 1 year"
  const [selectedAgeIndex, setSelectedAgeIndex] = useState<number>(0);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleOption>("full");

  // Age group labels for Amharic vs English
  const ageLabels = [
    { index: 0, en: "Above 2 years", am: "ከ 2 ዓመት በላይ" },
    { index: 1, en: "1 to 2 years", am: "ከ 1 እስከ 2 ዓመት" },
    { index: 2, en: "6 months to 1 year", am: "ከ 6 ወር እስከ 1 ዓመት" },
  ];

  const schedules: { key: ScheduleOption; label: string }[] = [
    { key: "full", label: t.daycarePage.schedules.full },
    { key: "half", label: t.daycarePage.schedules.half },
    { key: "three", label: t.daycarePage.schedules.three },
    { key: "dropIn", label: t.daycarePage.schedules.dropIn },
  ];

  // Calculate pricing from feeData
  const isDropIn = selectedSchedule === "dropIn";

  let monthlyAmount = 0;
  let termAmount = 0;
  let dropInAmount = 0;

  if (isDropIn) {
    dropInAmount = feeData.dropIn[selectedAgeIndex];
  } else if (selectedSchedule === "full") {
    [monthlyAmount, termAmount] = feeData.full[selectedAgeIndex];
  } else if (selectedSchedule === "half") {
    [monthlyAmount, termAmount] = feeData.half[selectedAgeIndex];
  } else if (selectedSchedule === "three") {
    [monthlyAmount, termAmount] = feeData.three[selectedAgeIndex];
  }

  const formatETB = (amount: number) => {
    return new Intl.NumberFormat(isAmharic ? "am-ET" : "en-ET").format(amount);
  };

  return (
    <div className="card-soft p-6 sm:p-8 shadow-xs border border-[var(--color-line)] max-w-[800px] mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-soft-green)] flex items-center justify-center text-[var(--color-green)]">
          <Calculator className="w-4 h-4" aria-hidden="true" />
        </div>
        <h2 className="text-fluid-h3 m-0">{t.daycarePage.calculatorTitle}</h2>
      </div>

      <div className="space-y-6">
        {/* Age Group Selector */}
        <div>
          <label className="block text-[0.95rem] font-semibold text-[var(--color-text)] mb-2.5">
            {t.daycarePage.ageLabel}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {ageLabels.map((ag) => {
              const isSelected = selectedAgeIndex === ag.index;
              return (
                <button
                  type="button"
                  key={ag.index}
                  onClick={() => setSelectedAgeIndex(ag.index)}
                  className={`min-h-[48px] px-3.5 py-2.5 rounded-xl border text-[0.92rem] font-medium transition-all text-center cursor-pointer flex items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-[var(--color-green)] text-white border-[var(--color-green)] font-semibold shadow-xs"
                      : "bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-line)] hover:bg-[var(--color-soft-green)]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected && <Check className="w-4 h-4 shrink-0" />}
                  <span>{isAmharic ? ag.am : ag.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule Selector */}
        <div>
          <label className="block text-[0.95rem] font-semibold text-[var(--color-text)] mb-2.5">
            {t.daycarePage.scheduleLabel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {schedules.map((s) => {
              const isSelected = selectedSchedule === s.key;
              return (
                <button
                  type="button"
                  key={s.key}
                  onClick={() => setSelectedSchedule(s.key)}
                  className={`min-h-[48px] px-3 py-2.5 rounded-xl border text-[0.9rem] font-medium transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-[var(--color-green)] text-white border-[var(--color-green)] font-semibold shadow-xs"
                      : "bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-line)] hover:bg-[var(--color-soft-green)]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculated Result Area */}
        <div
          aria-live="polite"
          className="mt-6 p-5 sm:p-6 rounded-2xl bg-[var(--color-soft-green)]/70 border border-[var(--color-green)]/20 transition-all"
        >
          {isDropIn ? (
            <div className="text-center sm:text-left sm:flex sm:items-baseline sm:justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-green)] block mb-1">
                  {t.daycarePage.schedules.dropIn}
                </span>
                <span className="text-xs text-[var(--color-muted)]">
                  {isAmharic
                    ? ageLabels[selectedAgeIndex].am
                    : ageLabels[selectedAgeIndex].en}
                </span>
              </div>
              <div className="mt-3 sm:mt-0">
                <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--color-navy)]">
                  {formatETB(dropInAmount)} ETB
                </span>
                <span className="ml-2 text-sm font-medium text-[var(--color-muted)]">
                  {t.daycarePage.priceDay}
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-line)]">
              {/* Monthly Rate */}
              <div className="pb-3 sm:pb-0 sm:pr-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-green)] block mb-1">
                  {t.daycarePage.priceMonthly}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[var(--color-navy)]">
                    {formatETB(monthlyAmount)} ETB
                  </span>
                  <span className="text-xs font-medium text-[var(--color-muted)]">
                    / month
                  </span>
                </div>
              </div>

              {/* Term Rate (2.5 Months) */}
              <div className="pt-3 sm:pt-0 sm:pl-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-green)] block mb-1">
                  {t.daycarePage.priceTerm}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[var(--color-navy)]">
                    {formatETB(termAmount)} ETB
                  </span>
                  <span className="text-xs font-medium text-[var(--color-muted)]">
                    / term (2.5 mo)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mandatory Fee Notes */}
        <p className="text-[0.92rem] text-[var(--color-muted)] leading-relaxed pt-1">
          {t.daycarePage.feesNote}
        </p>
      </div>
    </div>
  );
};
