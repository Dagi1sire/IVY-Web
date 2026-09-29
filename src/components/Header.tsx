import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../context/RouterContext";
import { Logo } from "./Logo";
import { Phone, Menu, X, Globe } from "lucide-react";

export const Header: React.FC = () => {
  const { language, setLanguage, t, isAmharic } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.daycare, path: "/daycare" },
    { label: t.nav.therapy, path: "/therapy" },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "am" : "en");
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-line)] transition-colors duration-200">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
        {/* Logo */}
        <Logo onClick={() => handleNav("/")} />

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2 text-[0.96rem] font-medium"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNav(link.path)}
                className={`px-3 py-2 rounded-lg transition-colors border-none bg-transparent cursor-pointer ${
                  isActive
                    ? "text-[var(--color-green)] font-semibold"
                    : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Call Link */}
          <a
            href="tel:0917730032"
            className="flex items-center gap-1.5 text-[0.92rem] font-medium text-[var(--color-text)] hover:text-[var(--color-green)] px-2.5 py-1.5 rounded-lg transition-colors no-underline"
          >
            <Phone className="w-4 h-4 text-[var(--color-green)]" aria-hidden="true" />
            <span>0917 730 032</span>
          </a>

          {/* Book Visit Button */}
          <button
            type="button"
            onClick={() => handleNav("/visit")}
            className="btn-primary px-5 py-2.5 text-[0.94rem] shadow-xs"
          >
            {t.nav.bookVisit}
          </button>

          {/* Language Switch */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[var(--color-line)] text-[0.85rem] font-semibold text-[var(--color-text)] bg-[var(--color-surface)] hover:bg-[var(--color-soft-green)] transition-colors cursor-pointer"
            aria-label={`Switch language. Current: ${isAmharic ? "Amharic" : "English"}`}
            title="Switch Language / ቋንቋ ይቀይሩ"
          >
            <Globe className="w-3.5 h-3.5 text-[var(--color-green)]" aria-hidden="true" />
            <span>{isAmharic ? "English" : "አማርኛ"}</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Quick language toggle on mobile */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-full border border-[var(--color-line)] text-[0.8rem] font-semibold text-[var(--color-text)] bg-[var(--color-surface)]"
            aria-label="Switch Language"
          >
            {isAmharic ? "EN" : "አማ"}
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-soft-green)] border-none bg-transparent cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-5 shadow-lg">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleNav(link.path)}
                  className={`text-left px-4 py-3 rounded-xl text-base font-semibold border-none cursor-pointer transition-colors ${
                    isActive
                      ? "bg-[var(--color-soft-green)] text-[var(--color-green)]"
                      : "bg-transparent text-[var(--color-text)]"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-3 border-t border-[var(--color-line)] flex flex-col gap-3">
              <a
                href="tel:0917730032"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[var(--color-line)] text-base font-semibold text-[var(--color-text)] no-underline"
              >
                <Phone className="w-5 h-5 text-[var(--color-green)]" />
                <span>0917 730 032</span>
              </a>

              <button
                type="button"
                onClick={() => handleNav("/visit")}
                className="btn-primary py-3 text-base font-semibold w-full"
              >
                {t.nav.bookVisit}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
