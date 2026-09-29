import React, { useEffect } from "react";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { RouterProvider, useRouter } from "./context/RouterContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MobileBottomBar } from "./components/MobileBottomBar";

// Pages
import { HomePage } from "./pages/HomePage";
import { DaycarePage } from "./pages/DaycarePage";
import { TherapyPage } from "./pages/TherapyPage";
import { VisitPage } from "./pages/VisitPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { AdminPage } from "./pages/AdminPage";

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();
  const { isAmharic } = useLanguage();

  // Dynamic document title update per page and SEO sync
  useEffect(() => {
    let title = "IVY Childcare Services | Daycare & Early Intervention in Addis Ababa";
    if (currentPath === "/daycare") {
      title = isAmharic
        ? "የህጻናት ማቆያ (ዴይኬር) እና ክፍያዎች | IVY Childcare Services"
        : "Daycare Programs & Fees | IVY Childcare Services";
    } else if (currentPath === "/therapy") {
      title = isAmharic
        ? "ቴራፒ እና ልዩ ድጋፍ | IVY Childcare Services"
        : "Therapy & Special Support Programs | IVY Childcare Services";
    } else if (currentPath === "/visit") {
      title = isAmharic
        ? "የጉብኝት ቀጠሮ ይያዙ | IVY Childcare Services"
        : "Book a Visit & Assessment | IVY Childcare Services";
    } else if (currentPath === "/privacy") {
      title = isAmharic
        ? "የግላዊነት ማስታወሻ | IVY Childcare Services"
        : "Privacy Notice | IVY Childcare Services";
    } else if (currentPath === "/admin") {
      title = "Staff Portal | IVY Childcare Services";
    }
    document.title = title;
  }, [currentPath, isAmharic]);

  const renderPage = () => {
    switch (currentPath) {
      case "/daycare":
        return <DaycarePage />;
      case "/therapy":
        return <TherapyPage />;
      case "/visit":
        return <VisitPage />;
      case "/privacy":
        return <PrivacyPage />;
      case "/admin":
        return <AdminPage />;
      case "/":
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      {/* Semantic Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-orange)] focus:text-white focus:rounded-lg font-bold"
      >
        Skip to main content
      </a>

      {/* Sticky Header */}
      <Header />

      {/* Main Page Landmark */}
      <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed Mobile Bottom Bar on phones < 700px */}
      <MobileBottomBar />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </LanguageProvider>
  );
}
