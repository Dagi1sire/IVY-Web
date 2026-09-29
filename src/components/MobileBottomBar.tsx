import React from "react";
import { Phone, Calendar } from "lucide-react";
import { useRouter } from "../context/RouterContext";
import { useLanguage } from "../i18n/LanguageContext";

export const MobileBottomBar: React.FC = () => {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-30 block md:hidden bg-[var(--color-surface)]/95 backdrop-blur-md border-t border-[var(--color-line)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-3 pt-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile quick actions"
    >
      <div className="max-w-[500px] mx-auto grid grid-cols-2 gap-2.5">
        <a
          href="tel:0917730032"
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full border-1.5 border-[var(--color-green)] text-[var(--color-green)] font-semibold text-[0.92rem] bg-transparent no-underline active:bg-[var(--color-soft-green)] transition-colors"
        >
          <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Call 0917 730 032</span>
        </a>

        <button
          type="button"
          onClick={() => navigate("/visit")}
          className="btn-primary py-3 px-3 text-[0.92rem] font-semibold flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{t.nav.bookVisit}</span>
        </button>
      </div>
    </aside>
  );
};
