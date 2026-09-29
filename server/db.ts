import fs from "fs";
import path from "path";
import { initializeApp, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore, FieldValue } from "firebase-admin/firestore";
import { VisitRequestDoc } from "./types.ts";
import { NotifyResult } from "./services/notify.ts";

// Local backup file path to guarantee NO request is ever lost
const DATA_DIR = path.join(process.cwd(), "server", "data");
const BACKUP_FILE = path.join(DATA_DIR, "visitRequests.json");

function ensureBackupDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUP_FILE)) {
    fs.writeFileSync(BACKUP_FILE, JSON.stringify([]), "utf-8");
  }
}

function readLocalBackup(): VisitRequestDoc[] {
  try {
    ensureBackupDir();
    const raw = fs.readFileSync(BACKUP_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read local backup file:", err);
    return [];
  }
}

function writeLocalBackup(records: VisitRequestDoc[]): void {
  try {
    ensureBackupDir();
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write local backup file:", err);
  }
}

let firestoreInstance: Firestore | null = null;
let firestoreAvailable = false;

function initFirestore(): Firestore | null {
  if (firestoreInstance) return firestoreInstance;

  try {
    const configPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (!fs.existsSync(configPath)) {
      console.warn("firebase-applet-config.json not found, using local storage mode");
      return null;
    }

    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    const app: App = getApps().length
      ? getApps()[0]
      : initializeApp({
          projectId: config.projectId,
        });

    firestoreInstance = config.firestoreDatabaseId
      ? getFirestore(app, config.firestoreDatabaseId)
      : getFirestore(app);

    return firestoreInstance;
  } catch (err: any) {
    console.warn("Firestore admin init note:", err?.message);
    return null;
  }
}

export async function saveVisitRequest(
  data: Omit<VisitRequestDoc, "id">
): Promise<{ id: string }> {
  const autoId =
    "req_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 7);
  const docWithId: VisitRequestDoc = {
    ...data,
    id: autoId,
  };

  // 1. Always write to safe persistent backup first
  const existing = readLocalBackup();
  existing.unshift(docWithId);
  writeLocalBackup(existing);

  // 2. Also save to Firestore collection 'visitRequests'
  const db = initFirestore();
  if (db) {
    try {
      await db.collection("visitRequests").doc(autoId).set({
        ...data,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      firestoreAvailable = true;
      console.log(`Visit request saved to Firestore document ID: ${autoId}`);
    } catch (err: any) {
      console.warn("Firestore direct write note (persisted to safe storage):", err?.message);
    }
  }

  return { id: autoId };
}

export async function updateVisitRequestNotify(
  id: string,
  notify: NotifyResult
): Promise<void> {
  // Update local backup
  const existing = readLocalBackup();
  const index = existing.findIndex((item) => item.id === id);
  if (index !== -1) {
    existing[index].notify = notify;
    existing[index].updatedAt = new Date().toISOString();
    writeLocalBackup(existing);
  }

  // Update Firestore
  const db = initFirestore();
  if (db) {
    try {
      await db.collection("visitRequests").doc(id).update({
        notify,
        updatedAt: FieldValue.serverTimestamp(),
      });
    } catch (err: any) {
      console.warn("Firestore update notify note:", err?.message);
    }
  }
}

export async function getVisitRequestById(
  id: string
): Promise<VisitRequestDoc | null> {
  const db = initFirestore();
  if (db) {
    try {
      const snap = await db.collection("visitRequests").doc(id).get();
      if (snap.exists) {
        return { id: snap.id, ...snap.data() } as VisitRequestDoc;
      }
    } catch {
      // Fallback to local backup
    }
  }

  const existing = readLocalBackup();
  return existing.find((item) => item.id === id) || null;
}

export async function listAllVisitRequests(): Promise<VisitRequestDoc[]> {
  const db = initFirestore();
  if (db) {
    try {
      const snap = await db
        .collection("visitRequests")
        .orderBy("createdAt", "desc")
        .limit(100)
        .get();
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as VisitRequestDoc));
      }
    } catch {
      // Fallback
    }
  }

  return readLocalBackup();
}

export async function updateVisitRequestFields(
  id: string,
  fields: Partial<VisitRequestDoc>
): Promise<void> {
  const existing = readLocalBackup();
  const index = existing.findIndex((item) => item.id === id);
  if (index !== -1) {
    existing[index] = { ...existing[index], ...fields, updatedAt: new Date().toISOString() };
    writeLocalBackup(existing);
  }

  const db = initFirestore();
  if (db) {
    try {
      await db.collection("visitRequests").doc(id).update({
        ...fields,
        updatedAt: FieldValue.serverTimestamp(),
      });
    } catch (err: any) {
      console.warn("Firestore fields update note:", err?.message);
    }
  }
}
