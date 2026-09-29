import express, { Request, Response } from "express";
import { checkRateLimit } from "./rateLimiter.ts";
import {
  saveVisitRequest,
  updateVisitRequestNotify,
  getVisitRequestById,
  listAllVisitRequests,
  updateVisitRequestFields,
} from "./db.ts";
import { sendVisitNotifications } from "./services/notify.ts";
import { generateVisitQuestions } from "./services/gemini.ts";
import {
  ChildAgeGroup,
  ProgramInterest,
  PreferredDay,
  VisitRequestDoc,
} from "./types.ts";

export const apiApp = express();

// Parse JSON bodies
apiApp.use(express.json());

// Helper to normalize Ethiopian phone numbers
export function normalizeEthiopianPhone(input: string): string | null {
  if (!input || typeof input !== "string") return null;

  // Strip spaces, dashes, parentheses
  const cleaned = input.replace(/[\s\-\(\)\.]/g, "").trim();

  // Pattern checks
  // 09xxxxxxxx or 07xxxxxxxx (10 digits)
  if (/^0[79]\d{8}$/.test(cleaned)) {
    return "+251" + cleaned.substring(1);
  }

  // +2519xxxxxxxx or +2517xxxxxxxx (13 chars)
  if (/^\+251[79]\d{8}$/.test(cleaned)) {
    return cleaned;
  }

  // 2519xxxxxxxx or 2517xxxxxxxx (12 digits)
  if (/^251[79]\d{8}$/.test(cleaned)) {
    return "+" + cleaned;
  }

  // 9xxxxxxxx or 7xxxxxxxx (9 digits)
  if (/^[79]\d{8}$/.test(cleaned)) {
    return "+251" + cleaned;
  }

  return null;
}

// 1. Visit request submission
apiApp.post("/api/visit-requests", async (req: Request, res: Response): Promise<void> => {
  try {
    const clientIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown-ip";

    // Rate Limiting
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      res.status(429).json({
        ok: false,
        error: rateCheck.reason || "Too many requests. Please wait or call 0917 730 032 directly.",
      });
      return;
    }

    const body = req.body || {};

    // Reject unknown fields
    const allowedKeys = new Set([
      "parentName",
      "phone",
      "childAgeGroup",
      "program",
      "preferredDay",
      "message",
      "consent",
      "website", // honeypot
      "language",
    ]);

    for (const key of Object.keys(body)) {
      if (!allowedKeys.has(key)) {
        res.status(400).json({ ok: false, error: `Unexpected field: ${key}` });
        return;
      }
    }

    // Honeypot check: reject bots with a fake success
    if (body.website && String(body.website).trim().length > 0) {
      console.log("Honeypot triggered, returning silent success.");
      res.json({ ok: true });
      return;
    }

    // Validate parent name (2 to 80 chars)
    const parentName = typeof body.parentName === "string" ? body.parentName.trim() : "";
    if (parentName.length < 2 || parentName.length > 80) {
      res.status(400).json({
        ok: false,
        error: "Parent or guardian name must be between 2 and 80 characters.",
      });
      return;
    }

    // Validate and normalize phone
    const normalizedPhone = normalizeEthiopianPhone(body.phone);
    if (!normalizedPhone) {
      res.status(400).json({
        ok: false,
        error:
          "Please enter a valid Ethiopian phone number (e.g., 0911234567, 0711234567, or +251911234567).",
      });
      return;
    }

    // Validate childAgeGroup
    const validAgeGroups: ChildAgeGroup[] = ["under_1", "1_to_2", "above_2"];
    const childAgeGroup: ChildAgeGroup = body.childAgeGroup;
    if (!validAgeGroups.includes(childAgeGroup)) {
      res.status(400).json({
        ok: false,
        error: "Child age group must be one of: under_1, 1_to_2, above_2.",
      });
      return;
    }

    // Validate program
    const validPrograms: ProgramInterest[] = ["daycare", "therapy", "not_sure"];
    const program: ProgramInterest = body.program;
    if (!validPrograms.includes(program)) {
      res.status(400).json({
        ok: false,
        error: "Program must be one of: daycare, therapy, not_sure.",
      });
      return;
    }

    // Validate preferredDay
    const validDays: PreferredDay[] = ["mon", "tue", "wed", "thu", "fri", "sat"];
    const preferredDay: PreferredDay = body.preferredDay;
    if (!validDays.includes(preferredDay)) {
      res.status(400).json({
        ok: false,
        error: "Preferred day must be one of: mon, tue, wed, thu, fri, sat.",
      });
      return;
    }

    // Validate consent
    if (body.consent !== true) {
      res.status(400).json({
        ok: false,
        error: "Consent to be contacted is required.",
      });
      return;
    }

    // Clean optional message (up to 500 chars)
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 500) : "";
    const language = body.language === "am" ? "am" : "en";

    // Prepare Document
    const nowIso = new Date().toISOString();
    const docData: Omit<VisitRequestDoc, "id"> = {
      createdAt: nowIso,
      parentName,
      phone: normalizedPhone,
      childAgeGroup,
      program,
      preferredDay,
      message,
      status: "new",
      notes: "",
      assignedTo: "",
      contactedAt: null,
      updatedAt: nowIso,
      updatedBy: "system",
      source: "website",
      language,
      notify: {
        telegram: "skipped",
        email: "skipped",
        errors: "",
      },
    };

    // 1. Save visit request first (Never lose a request!)
    const { id } = await saveVisitRequest(docData);
    console.log(`Saved visit request with ID: ${id}`);

    // 2. Dispatch notifications in parallel with individual try/catch
    sendVisitNotifications({ ...docData, id })
      .then(async (notifyResult) => {
        await updateVisitRequestNotify(id, notifyResult);
      })
      .catch((err) => {
        console.error("Background notification runner error:", err?.message || err);
      });

    // 3. Return success immediately to client
    res.json({ ok: true, id });
  } catch (err: any) {
    console.error("Error handling visit request:", err?.message || err);
    res.status(500).json({
      ok: false,
      error: "We couldn't send that. Please try again or call 0917 730 032.",
    });
  }
});

// 2. Admin: Retry notification delivery
apiApp.post("/api/admin/retry-notify", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body || {};
    if (!id) {
      res.status(400).json({ ok: false, error: "Missing visit request id." });
      return;
    }

    const doc = await getVisitRequestById(id);
    if (!doc) {
      res.status(404).json({ ok: false, error: "Visit request not found." });
      return;
    }

    const notifyResult = await sendVisitNotifications(doc);
    await updateVisitRequestNotify(id, notifyResult);

    res.json({ ok: true, notify: notifyResult });
  } catch (err: any) {
    console.error("Admin retry notify error:", err?.message || err);
    res.status(500).json({ ok: false, error: "Failed to retry notifications." });
  }
});

// 3. Admin: List visit requests
apiApp.get("/api/admin/visit-requests", async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await listAllVisitRequests();
    res.json({ ok: true, requests });
  } catch (err: any) {
    console.error("Admin list requests error:", err?.message || err);
    res.status(500).json({ ok: false, error: "Failed to load visit requests." });
  }
});

// 4. Admin: Update status / notes
apiApp.patch("/api/admin/visit-requests/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, notes, assignedTo, contactedAt } = req.body;

    const updates: Partial<VisitRequestDoc> = {};
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (assignedTo !== undefined) updates.assignedTo = assignedTo;
    if (contactedAt !== undefined) updates.contactedAt = contactedAt;

    await updateVisitRequestFields(id, updates);
    res.json({ ok: true });
  } catch (err: any) {
    console.error("Admin update request error:", err?.message || err);
    res.status(500).json({ ok: false, error: "Failed to update visit request." });
  }
});

// 5. Gemini: Visit Preparation & Milestones Question Helper
apiApp.post("/api/milestone-guide", async (req: Request, res: Response): Promise<void> => {
  try {
    const { query, language } = req.body || {};
    if (!query || typeof query !== "string" || query.trim().length === 0) {
      res.status(400).json({ ok: false, error: "Query is required." });
      return;
    }

    const result = await generateVisitQuestions(
      query.trim().slice(0, 400),
      language === "am" ? "am" : "en"
    );

    res.json({ ok: true, ...result });
  } catch (err: any) {
    console.error("Milestone guide error:", err?.message || err);
    res.status(500).json({ ok: false, error: "Failed to generate visit guide." });
  }
});
