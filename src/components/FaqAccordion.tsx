import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqAccordion: React.FC = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 0: true });

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
  ];

  const toggle = (idx: number) => {
    setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-5 h-5 text-[var(--color-green)]" aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-green)]">
            FAQ
          </span>
        </div>
        <h2 className="text-fluid-h2 mb-8">{t.faq.heading}</h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = !!openItems[idx];
            return (
              <details
                key={idx}
                open={isOpen}
                className="card-soft overflow-hidden transition-all duration-200"
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    toggle(idx);
                  }}
                  className="flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none hover:bg-[var(--color-surface-hover)] focus-visible:outline-2 focus-visible:outline-[var(--color-green)]"
                >
                  <span className="font-heading font-bold text-[1.08rem] sm:text-[1.15rem] text-[var(--color-text)]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[var(--color-soft-green)] flex items-center justify-center shrink-0 text-[var(--color-green)] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </summary>

                <div className="px-5 sm:px-6 pb-5 pt-1 text-[var(--color-muted)] text-[0.98rem] leading-relaxed border-t border-[var(--color-line)]/50">
                  <p className="m-0 max-w-[65ch]">{faq.a}</p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};
