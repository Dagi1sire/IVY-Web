import React, { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../context/RouterContext";
import { CheckCircle2, AlertCircle, Phone, Calendar, Clock, Loader2 } from "lucide-react";

interface FormValues {
  parentName: string;
  phone: string;
  childAgeGroup: "under_1" | "1_to_2" | "above_2";
  program: "daycare" | "therapy" | "not_sure";
  preferredDay: "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  message: string;
  consent: boolean;
  website: string; // Honeypot
}

export const VisitRequestSection: React.FC<{
  initialProgram?: "daycare" | "therapy" | "not_sure";
  id?: string;
}> = ({ initialProgram, id = "visit-form" }) => {
  const { t, language } = useLanguage();
  const { visitPresetProgram } = useRouter();

  const [form, setForm] = useState<FormValues>({
    parentName: "",
    phone: "",
    childAgeGroup: "1_to_2",
    program: initialProgram || visitPresetProgram || "daycare",
    preferredDay: "mon",
    message: "",
    consent: false,
    website: "", // Must remain empty
  });

  const [errors, setErrors] = useState<{
    parentName?: string;
    phone?: string;
    consent?: string;
  }>({});

  const [touched, setTouched] = useState<{
    parentName?: boolean;
    phone?: boolean;
    consent?: boolean;
  }>({});

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProgram) {
      setForm((prev) => ({ ...prev, program: initialProgram }));
    } else if (visitPresetProgram) {
      setForm((prev) => ({ ...prev, program: visitPresetProgram }));
    }
  }, [initialProgram, visitPresetProgram]);

  // Validation function
  const validate = (values: FormValues) => {
    const errs: { parentName?: string; phone?: string; consent?: string } = {};

    const name = values.parentName.trim();
    if (name.length < 2 || name.length > 80) {
      errs.parentName = t.visitSection.validation.nameRequired;
    }

    // Phone validation
    const rawPhone = values.phone.replace(/[\s\-\(\)\.]/g, "").trim();
    const isValidPhone =
      /^0[79]\d{8}$/.test(rawPhone) ||
      /^\+251[79]\d{8}$/.test(rawPhone) ||
      /^251[79]\d{8}$/.test(rawPhone) ||
      /^[79]\d{8}$/.test(rawPhone);

    if (!isValidPhone) {
      errs.phone = t.visitSection.validation.phoneInvalid;
    }

    if (!values.consent) {
      errs.consent = t.visitSection.validation.consentRequired;
    }

    return errs;
  };

  const handleBlur = (field: "parentName" | "phone" | "consent") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(form);
    setErrors(errs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ parentName: true, phone: true, consent: true });
    setSubmitError(null);

    const errs = validate(form);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/visit-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: form.parentName.trim(),
          phone: form.phone.trim(),
          childAgeGroup: form.childAgeGroup,
          program: form.program,
          preferredDay: form.preferredDay,
          message: form.message.trim(),
          consent: form.consent,
          website: form.website, // honeypot
          language,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setSubmitSuccess(true);
        // Clear sensitive inputs but keep good user experience
        setForm((prev) => ({
          ...prev,
          parentName: "",
          phone: "",
          message: "",
          consent: false,
        }));
        setTouched({});
        setErrors({});
      } else {
        setSubmitError(data.error || t.visitSection.errorMessage);
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setSubmitError(t.visitSection.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id={id} className="py-12 md:py-16 scroll-mt-20">
      <div className="card-soft p-6 sm:p-10 max-w-[760px] mx-auto shadow-xs border border-[var(--color-line)]">
        {/* Header */}
        <div className="mb-8 text-center max-w-[580px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-soft-green)] text-[var(--color-green)] text-[0.85rem] font-semibold mb-3">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>{t.visitSection.title}</span>
          </div>
          <h2 className="text-fluid-h2 mb-3">{t.visitSection.title}</h2>
          <p className="text-[var(--color-muted)] text-[1.02rem] leading-relaxed">
            {t.visitSection.subtitle}
          </p>
        </div>

        {/* Aria live region for screen readers */}
        <div aria-live="polite" className="sr-only">
          {submitSuccess && t.visitSection.successMessage}
          {submitError && submitError}
        </div>

        {submitSuccess ? (
          <div className="bg-[var(--color-soft-green)] border border-[var(--color-green)]/30 rounded-2xl p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-green)] text-white flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)]">
              {t.visitSection.successMessage}
            </h3>
            <p className="text-[var(--color-muted)] text-base">
              {t.visitSection.fallbackCall}
            </p>
            <div className="pt-2">
              <a
                href="tel:0917730032"
                className="btn-primary py-3 px-6 text-base inline-flex items-center gap-2 no-underline"
              >
                <Phone className="w-4 h-4" />
                <span>0917 730 032</span>
              </a>
            </div>
            <button
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="text-sm font-semibold text-[var(--color-green)] underline underline-offset-4 hover:opacity-80 block mx-auto mt-4 bg-transparent border-none cursor-pointer"
            >
              Book another visit
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Honeypot field (hidden from view and assistive tech) */}
            <div
              style={{ display: "none" }}
              aria-hidden="true"
              className="hidden"
            >
              <label htmlFor="website">Website address</label>
              <input
                id="website"
                type="text"
                name="website"
                value={form.website}
                onChange={(e) =>
                  setForm({ ...form, website: e.target.value })
                }
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Error banner if submit failed */}
            {submitError && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                <div className="text-sm leading-relaxed font-medium">
                  {submitError}
                </div>
              </div>
            )}

            {/* Parent Name */}
            <div>
              <label
                htmlFor="parentName"
                className="block text-[0.94rem] font-semibold text-[var(--color-text)] mb-1.5"
              >
                {t.visitSection.nameLabel}{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="parentName"
                name="parentName"
                type="text"
                required
                minLength={2}
                maxLength={80}
                placeholder={t.visitSection.namePlaceholder}
                value={form.parentName}
                onChange={(e) =>
                  setForm({ ...form, parentName: e.target.value })
                }
                onBlur={() => handleBlur("parentName")}
                aria-invalid={!!(touched.parentName && errors.parentName)}
                aria-describedby={
                  touched.parentName && errors.parentName
                    ? "name-error"
                    : undefined
                }
                className={`w-full px-4 py-3 rounded-xl border bg-[var(--color-surface)] text-[var(--color-text)] text-base placeholder:text-[var(--color-muted)]/50 transition-colors focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent ${
                  touched.parentName && errors.parentName
                    ? "border-red-500"
                    : "border-[var(--color-line)]"
                }`}
              />
              {touched.parentName && errors.parentName && (
                <p id="name-error" className="mt-1.5 text-xs text-red-600 font-medium">
                  {errors.parentName}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-[0.94rem] font-semibold text-[var(--color-text)] mb-1.5"
              >
                {t.visitSection.phoneLabel}{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder={t.visitSection.phonePlaceholder}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                onBlur={() => handleBlur("phone")}
                aria-invalid={!!(touched.phone && errors.phone)}
                aria-describedby={
                  touched.phone && errors.phone
                    ? "phone-error"
                    : "phone-help"
                }
                className={`w-full px-4 py-3 rounded-xl border bg-[var(--color-surface)] text-[var(--color-text)] text-base placeholder:text-[var(--color-muted)]/50 transition-colors focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent ${
                  touched.phone && errors.phone
                    ? "border-red-500"
                    : "border-[var(--color-line)]"
                }`}
              />
              {touched.phone && errors.phone ? (
                <p id="phone-error" className="mt-1.5 text-xs text-red-600 font-medium">
                  {errors.phone}
                </p>
              ) : (
                <p id="phone-help" className="mt-1 text-xs text-[var(--color-muted)]">
                  {t.visitSection.phoneHelp}
                </p>
              )}
            </div>

            {/* Child's Age Group (Chips/Buttons) */}
            <fieldset>
              <legend className="block text-[0.94rem] font-semibold text-[var(--color-text)] mb-2">
                {t.visitSection.ageGroupLabel}
              </legend>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { value: "under_1", label: t.visitSection.ageUnder1 },
                  { value: "1_to_2", label: t.visitSection.age1to2 },
                  { value: "above_2", label: t.visitSection.ageAbove2 },
                ].map((item) => {
                  const isSelected = form.childAgeGroup === item.value;
                  return (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() =>
                        setForm({
                          ...form,
                          childAgeGroup: item.value as FormValues["childAgeGroup"],
                        })
                      }
                      className={`min-h-[48px] px-3 py-2.5 rounded-xl border text-[0.88rem] sm:text-[0.92rem] font-medium transition-all text-center cursor-pointer ${
                        isSelected
                          ? "bg-[var(--color-green)] text-white border-[var(--color-green)] font-semibold shadow-xs"
                          : "bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-line)] hover:bg-[var(--color-soft-green)]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Interested In (Chips/Buttons) */}
            <fieldset>
              <legend className="block text-[0.94rem] font-semibold text-[var(--color-text)] mb-2">
                {t.visitSection.programLabel}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { value: "daycare", label: t.visitSection.programDaycare },
                  { value: "therapy", label: t.visitSection.programTherapy },
                  { value: "not_sure", label: t.visitSection.programNotSure },
                ].map((item) => {
                  const isSelected = form.program === item.value;
                  return (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() =>
                        setForm({
                          ...form,
                          program: item.value as FormValues["program"],
                        })
                      }
                      className={`min-h-[48px] px-3 py-2.5 rounded-xl border text-[0.88rem] sm:text-[0.92rem] font-medium transition-all text-center cursor-pointer ${
                        isSelected
                          ? "bg-[var(--color-green)] text-white border-[var(--color-green)] font-semibold shadow-xs"
                          : "bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-line)] hover:bg-[var(--color-soft-green)]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Best day to visit */}
            <fieldset>
              <legend className="block text-[0.94rem] font-semibold text-[var(--color-text)] mb-2">
                {t.visitSection.dayLabel}
              </legend>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { value: "mon", label: t.visitSection.days.mon },
                  { value: "tue", label: t.visitSection.days.tue },
                  { value: "wed", label: t.visitSection.days.wed },
                  { value: "thu", label: t.visitSection.days.thu },
                  { value: "fri", label: t.visitSection.days.fri },
                  { value: "sat", label: t.visitSection.days.sat },
                ].map((item) => {
                  const isSelected = form.preferredDay === item.value;
                  return (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() =>
                        setForm({
                          ...form,
                          preferredDay: item.value as FormValues["preferredDay"],
                        })
                      }
                      className={`min-h-[44px] px-2 py-2 rounded-xl border text-[0.85rem] font-medium transition-all text-center cursor-pointer ${
                        isSelected
                          ? "bg-[var(--color-green)] text-white border-[var(--color-green)] font-semibold"
                          : "bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-line)] hover:bg-[var(--color-soft-green)]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Message (Optional) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="message"
                  className="block text-[0.94rem] font-semibold text-[var(--color-text)]"
                >
                  {t.visitSection.messageLabel}
                </label>
                <span className="text-xs text-[var(--color-muted)]">
                  {form.message.length}/500
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={3}
                maxLength={500}
                placeholder={t.visitSection.messagePlaceholder}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-text)] text-base placeholder:text-[var(--color-muted)]/50 transition-colors focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent resize-y"
              />
            </div>

            {/* Consent checkbox */}
            <div className="pt-2">
              <label
                htmlFor="consent"
                className="flex items-start gap-3 cursor-pointer select-none group"
              >
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) =>
                    setForm({ ...form, consent: e.target.checked })
                  }
                  onBlur={() => handleBlur("consent")}
                  aria-invalid={!!(touched.consent && errors.consent)}
                  className="w-5 h-5 mt-0.5 rounded text-[var(--color-orange)] focus:ring-[var(--color-orange)] border-[var(--color-line)] cursor-pointer"
                />
                <span className="text-[0.92rem] text-[var(--color-text)] leading-snug group-hover:text-[var(--color-green)] transition-colors">
                  {t.visitSection.consentText}{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </span>
              </label>
              {touched.consent && errors.consent && (
                <p className="mt-1.5 text-xs text-red-600 font-medium pl-8">
                  {errors.consent}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-4 text-base font-bold shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.visitSection.submitting}</span>
                  </span>
                ) : (
                  <span>{t.visitSection.submitButton}</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
