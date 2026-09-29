import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { Info, Sparkles, HeartHandshake, TreePine, BookOpen } from "lucide-react";

interface GalleryTile {
  id: string;
  titleKey: "classroom" | "therapy" | "outdoor" | "team";
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  imageUrl?: string; // Replaceable image path or URL
  altText: string;
  accentBg: string;
}

export const OurSpaceGallery: React.FC = () => {
  const { t } = useLanguage();

  const tiles: GalleryTile[] = [
    {
      id: "classroom",
      titleKey: "classroom",
      description: "Bright, airy environment with child-height learning stations, Montessori-inspired sensory areas, and quiet reading nooks.",
      icon: BookOpen,
      altText: "IVY Childcare spacious classroom and sensory play area",
      accentBg: "from-emerald-50 to-green-100 dark:from-emerald-950/40 dark:to-green-900/30",
    },
    {
      id: "therapy",
      titleKey: "therapy",
      description: "Dedicated early-intervention spaces equipped for motor coordination, sensory integration, and calm one-on-one therapy sessions.",
      icon: Sparkles,
      altText: "IVY Childcare quiet, structured individual therapy room",
      accentBg: "from-sky-50 to-blue-100 dark:from-sky-950/40 dark:to-blue-900/30",
    },
    {
      id: "outdoor",
      titleKey: "outdoor",
      description: "Enclosed, shaded natural outdoor courtyard designed for safe gross-motor exploration, social play, and fresh air.",
      icon: TreePine,
      altText: "IVY Childcare secure outdoor play and garden area",
      accentBg: "from-amber-50 to-orange-100 dark:from-amber-950/40 dark:to-amber-900/30",
    },
    {
      id: "team",
      titleKey: "team",
      description: "Experienced Ethiopian early childhood educators, certified developmental therapists, and caring support staff.",
      icon: HeartHandshake,
      altText: "IVY Childcare educator and therapy professional team",
      accentBg: "from-teal-50 to-green-100 dark:from-teal-950/40 dark:to-emerald-900/30",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-8 max-w-[680px]">
          <h2 className="text-fluid-h2 mb-3">{t.gallery.heading}</h2>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-soft-green)] border border-[var(--color-green)]/20 text-[var(--color-text)]">
            <Info className="w-5 h-5 shrink-0 text-[var(--color-green)] mt-0.5" aria-hidden="true" />
            <p className="text-[0.92rem] leading-relaxed m-0 font-medium">
              {t.gallery.note}
            </p>
          </div>
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            const title = t.gallery.tiles[tile.titleKey];

            return (
              <div
                key={tile.id}
                className="card-soft overflow-hidden group hover:border-[var(--color-green)] transition-all flex flex-col"
              >
                {/* Visual placeholder box - easily swapped with <img> */}
                <div
                  className={`h-48 sm:h-52 bg-gradient-to-br ${tile.accentBg} flex flex-col items-center justify-center p-6 text-center border-b border-[var(--color-line)] relative`}
                >
                  {tile.imageUrl ? (
                    <img
                      src={tile.imageUrl}
                      alt={tile.altText}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface)] shadow-xs flex items-center justify-center text-[var(--color-green)] mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="font-heading font-bold text-lg text-[var(--color-text)]">
                        {title}
                      </span>
                      <span className="text-xs text-[var(--color-muted)] mt-1 font-medium">
                        Space & Facility Photo Placeholder
                      </span>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                    {title}
                  </h3>
                  <p className="text-[var(--color-muted)] text-[0.93rem] leading-relaxed m-0">
                    {tile.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
