import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../context/RouterContext";
import { Phone, Shield, MapPin, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const { t, isAmharic } = useLanguage();
  const { navigate } = useRouter();

  return (
    <footer
      className="bg-[var(--color-footer-bg)] text-[var(--color-footer-text)] transition-colors duration-200 mt-16 pt-12 pb-24 md:pb-12 border-t border-[var(--color-line)]"
      role="contentinfo"
    >
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/10">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center font-bold text-sm">
                IVY
              </div>
              <span className="font-heading font-extrabold text-xl text-white">
                {t.footer.name}
              </span>
            </div>
            <p className="text-[0.92rem] text-[var(--color-footer-muted)] leading-relaxed max-w-[320px]">
              {isAmharic
                ? "የህጻናት ማቆያ እና የቅድመ-ጣልቃገብነት ቴራፒ አገልግሎት በአዲስ አበባ።"
                : "Daycare and therapeutic early-intervention center in Addis Ababa, Ethiopia."}
            </p>
          </div>

          {/* Key Facts Col */}
          <div className="space-y-2.5">
            <h3 className="font-heading font-bold text-base text-white mb-2">
              {isAmharic ? "መረጃ" : "Details & Fees"}
            </h3>
            <p className="text-[0.92rem] text-[var(--color-footer-muted)] m-0">
              {t.footer.registrationNote}
            </p>
            <p className="text-[0.92rem] text-[var(--color-footer-muted)] m-0">
              {t.footer.photoConsent}
            </p>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-base text-white mb-2">
              {isAmharic ? "አድራሻ እና ስልክ" : "Contact & Visit"}
            </h3>
            <div className="flex items-center gap-2 text-[0.94rem] text-white">
              <MapPin className="w-4 h-4 text-[var(--color-green)] shrink-0" />
              <span>{t.footer.address}</span>
            </div>
            <div>
              <a
                href="tel:0917730032"
                className="inline-flex items-center gap-2 text-white hover:text-[var(--color-green)] font-semibold text-lg no-underline transition-colors"
              >
                <Phone className="w-4 h-4 text-[var(--color-green)]" />
                <span>0917 730 032</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-footer-muted)]">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} {t.footer.name}.</span>
            <span>{t.footer.allRightsReserved}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/privacy")}
              className="text-[var(--color-footer-muted)] hover:text-white underline underline-offset-4 bg-transparent border-none cursor-pointer transition-colors"
            >
              {t.footer.privacyLink}
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="text-[var(--color-footer-muted)] hover:text-white bg-transparent border-none cursor-pointer transition-colors"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
