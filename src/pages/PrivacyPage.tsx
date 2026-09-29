import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../context/RouterContext";
import { Shield, ArrowLeft, Phone, Lock, Eye, Trash2 } from "lucide-react";

export const PrivacyPage: React.FC = () => {
  const { t, isAmharic } = useLanguage();
  const { navigate } = useRouter();

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-green)] hover:underline mb-8 bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.privacyPage.backHome}</span>
        </button>

        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] text-xs font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>{t.privacyPage.title}</span>
            </div>
            <h1 className="text-fluid-h1 font-extrabold text-[var(--color-navy)] mb-4">
              {t.privacyPage.title}
            </h1>
            <p className="text-[1.12rem] text-[var(--color-muted)] leading-relaxed">
              {t.privacyPage.intro}
            </p>
          </div>

          <div className="card-soft p-6 sm:p-8 space-y-8 border border-[var(--color-line)]">
            {/* What we collect */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--color-green)] font-bold text-base">
                <Lock className="w-4 h-4" />
                <h2>{t.privacyPage.whatWeCollectTitle}</h2>
              </div>
              <p className="text-[0.98rem] text-[var(--color-muted)] leading-relaxed m-0">
                {t.privacyPage.whatWeCollectText}
              </p>
            </div>

            {/* Why we collect */}
            <div className="space-y-2 pt-6 border-t border-[var(--color-line)]">
              <div className="flex items-center gap-2 text-[var(--color-green)] font-bold text-base">
                <Eye className="w-4 h-4" />
                <h2>{t.privacyPage.whyWeCollectTitle}</h2>
              </div>
              <p className="text-[0.98rem] text-[var(--color-muted)] leading-relaxed m-0">
                {t.privacyPage.whyWeCollectText}
              </p>
            </div>

            {/* Who can see it */}
            <div className="space-y-2 pt-6 border-t border-[var(--color-line)]">
              <div className="flex items-center gap-2 text-[var(--color-green)] font-bold text-base">
                <Shield className="w-4 h-4" />
                <h2>{t.privacyPage.whoCanSeeTitle}</h2>
              </div>
              <p className="text-[0.98rem] text-[var(--color-muted)] leading-relaxed m-0">
                {t.privacyPage.whoCanSeeText}
              </p>
            </div>

            {/* How to request deletion */}
            <div className="space-y-2 pt-6 border-t border-[var(--color-line)]">
              <div className="flex items-center gap-2 text-[var(--color-green)] font-bold text-base">
                <Trash2 className="w-4 h-4" />
                <h2>{t.privacyPage.deletionTitle}</h2>
              </div>
              <p className="text-[0.98rem] text-[var(--color-muted)] leading-relaxed m-0">
                {t.privacyPage.deletionText}
              </p>
              <div className="pt-2">
                <a
                  href="tel:0917730032"
                  className="btn-secondary py-2.5 px-4 text-sm font-semibold inline-flex items-center gap-2 no-underline"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 0917 730 032</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
