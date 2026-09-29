import { VisitRequestDoc } from "../types.ts";

export interface NotifyResult {
  telegram: "sent" | "failed" | "skipped";
  email: "sent" | "failed" | "skipped";
  errors: string;
}

function escapeHtml(text: string): string {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatAgeGroup(ag: string): string {
  switch (ag) {
    case "under_1":
      return "Under 1 year";
    case "1_to_2":
      return "1 to 2 years";
    case "above_2":
      return "Above 2 years";
    default:
      return ag;
  }
}

function formatProgram(pr: string): string {
  switch (pr) {
    case "daycare":
      return "Daycare";
    case "therapy":
      return "Therapy & Special Support";
    case "not_sure":
      return "Not sure yet";
    default:
      return pr;
  }
}

function formatDay(d: string): string {
  const days: Record<string, string> = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
  };
  return days[d] || d;
}

export function getAddisAbabaTime(): string {
  try {
    return (
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Addis_Ababa",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date()) + " (EAT, Africa/Addis_Ababa)"
    );
  } catch {
    return new Date().toISOString() + " (UTC)";
  }
}

export async function sendVisitNotifications(
  doc: VisitRequestDoc
): Promise<NotifyResult> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const emailFrom = process.env.EMAIL_FROM?.trim() || "IVY Childcare <onboarding@resend.dev>";
  const notifyEmailsRaw = process.env.NOTIFY_EMAILS?.trim();

  const formattedTime = getAddisAbabaTime();
  const ageGroupDisplay = formatAgeGroup(doc.childAgeGroup);
  const programDisplay = formatProgram(doc.program);
  const dayDisplay = formatDay(doc.preferredDay);
  const messageDisplay = doc.message ? doc.message : "-";

  const errorMessages: string[] = [];

  // Telegram notification is skipped as requested
  const telegramStatus: "sent" | "failed" | "skipped" = "skipped";

  // Send Resend Email Notification
  const emailPromise = (async (): Promise<"sent" | "failed" | "skipped"> => {
    if (!resendKey || !notifyEmailsRaw) {
      return "skipped";
    }

    const emailRecipients = notifyEmailsRaw
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    if (emailRecipients.length === 0) {
      return "skipped";
    }

    try {
      const plainText =
        `New visit request\n\n` +
        `Parent: ${doc.parentName}\n` +
        `Phone: ${doc.phone}\n` +
        `Child's age group: ${ageGroupDisplay}\n` +
        `Interested in: ${programDisplay}\n` +
        `Best day to visit: ${dayDisplay}\n` +
        `Message: ${messageDisplay}\n` +
        `Language: ${doc.language === "am" ? "Amharic" : "English"}\n` +
        `Received: ${formattedTime}\n\n` +
        `Direct Call: tel:${doc.phone}`;

      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #D9E3D9; border-radius: 12px; background: #FFFFFF;">
          <h2 style="color: #1B2A4A; margin-top: 0;">New Visit Request &mdash; IVY Childcare</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #55607A; width: 140px;">Parent/Guardian:</td>
              <td style="padding: 8px 0; color: #1B2A4A; font-weight: 600;">${escapeHtml(doc.parentName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #55607A;">Phone:</td>
              <td style="padding: 8px 0;">
                <a href="tel:${doc.phone}" style="color: #C4621A; font-weight: 600; text-decoration: none;">${escapeHtml(doc.phone)} &rarr; Tap to Call</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #55607A;">Child Age:</td>
              <td style="padding: 8px 0; color: #1B2A4A;">${escapeHtml(ageGroupDisplay)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #55607A;">Interested in:</td>
              <td style="padding: 8px 0; color: #1B2A4A;">${escapeHtml(programDisplay)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #55607A;">Preferred Day:</td>
              <td style="padding: 8px 0; color: #1B2A4A;">${escapeHtml(dayDisplay)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #55607A;">Message:</td>
              <td style="padding: 8px 0; color: #1B2A4A;">${escapeHtml(messageDisplay)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #55607A;">Received:</td>
              <td style="padding: 8px 0; color: #55607A; font-size: 13px;">${escapeHtml(formattedTime)}</td>
            </tr>
          </table>
          <div style="background: #E3EEE4; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #1B2A4A;">
            Please call the parent within 24 hours to schedule their visit and prepare an age-appropriate room tour.
          </div>
        </div>
      `;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: emailFrom,
          to: emailRecipients,
          subject: `New visit request: ${doc.parentName}`,
          html: htmlBody,
          text: plainText,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Resend email failed status:", response.status, text.slice(0, 100));
        errorMessages.push(`Email HTTP ${response.status}`);
        return "failed";
      }
      return "sent";
    } catch (err: any) {
      console.error("Resend email error:", err?.name || err?.message);
      errorMessages.push(`Email: ${err?.message || "timeout"}`);
      return "failed";
    }
  })();

  const emailStatus = await emailPromise;

  return {
    telegram: telegramStatus,
    email: emailStatus,
    errors: errorMessages.join("; "),
  };
}
