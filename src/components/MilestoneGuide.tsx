import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { Sparkles, MessageSquareHeart, Check, Loader2, Info } from "lucide-react";

export const MilestoneGuide: React.FC = () => {
  const { t, language, isAmharic } = useLanguage();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    calmNote: string;
    suggestedQuestions: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/milestone-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query.trim(),
          language,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setResponse({
          calmNote: data.calmNote,
          suggestedQuestions: data.suggestedQuestions,
        });
      } else {
        setError("Could not generate guide. Please try again or ask during your visit.");
      }
    } catch (err) {
      setError("Network connection issue. You can discuss any questions during your visit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="card-soft p-6 sm:p-8 border border-[var(--color-line)] relative overflow-hidden bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-soft-green)]/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-soft-green)] flex items-center justify-center text-[var(--color-green)]">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-green)]">
              {isAmharic ? "የወላጆች ዝግጅት" : "Parent Preparation"}
            </span>
          </div>

          <h2 className="text-fluid-h3 mb-2">{t.guideHelper.title}</h2>
          <p className="text-[var(--color-muted)] text-[0.96rem] leading-relaxed mb-6">
            {t.guideHelper.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                rows={2}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.guideHelper.promptPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted)]/50 focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="btn-secondary px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.guideHelper.thinking}</span>
                  </>
                ) : (
                  <>
                    <MessageSquareHeart className="w-4 h-4" />
                    <span>{t.guideHelper.button}</span>
                  </>
                )}
              </button>

              <span className="text-xs text-[var(--color-muted)]">
                {isAmharic ? "የግል መረጃ አይጠየቅም" : "No child name or birthdate needed"}
              </span>
            </div>
          </form>

          {error && (
            <p className="mt-4 text-xs text-amber-600 font-medium">{error}</p>
          )}

          {response && (
            <div className="mt-6 pt-6 border-t border-[var(--color-line)] space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
                <p className="text-sm font-medium text-[var(--color-text)] leading-relaxed italic m-0">
                  &ldquo;{response.calmNote}&rdquo;
                </p>
              </div>

              <div>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--color-green)] mb-2.5">
                  {t.guideHelper.resultsTitle}
                </h3>
                <ul className="space-y-2 p-0 m-0 list-none">
                  {response.suggestedQuestions.map((q, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[0.92rem] text-[var(--color-text)] bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-line)]/60"
                    >
                      <Check className="w-4 h-4 shrink-0 text-[var(--color-green)] mt-0.5" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-[var(--color-muted)]">
                <Info className="w-4 h-4 shrink-0" />
                <span>{t.guideHelper.disclaimer}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
