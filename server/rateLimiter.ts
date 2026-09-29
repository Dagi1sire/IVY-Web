interface IpRecord {
  hourlyTimestamps: number[];
  dailyTimestamps: number[];
}

const store = new Map<string, IpRecord>();

// Clean up old records periodically
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  for (const [ip, record] of store.entries()) {
    record.dailyTimestamps = record.dailyTimestamps.filter((t) => t > oneDayAgo);
    if (record.dailyTimestamps.length === 0) {
      store.delete(ip);
    }
  }
}, 10 * 60 * 1000);

if (typeof cleanupTimer.unref === "function") {
  cleanupTimer.unref();
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  reason?: string;
} {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  let record = store.get(ip);
  if (!record) {
    record = { hourlyTimestamps: [], dailyTimestamps: [] };
    store.set(ip, record);
  }

  // Filter timestamps
  record.hourlyTimestamps = record.hourlyTimestamps.filter((t) => t > oneHourAgo);
  record.dailyTimestamps = record.dailyTimestamps.filter((t) => t > oneDayAgo);

  if (record.hourlyTimestamps.length >= 5) {
    return {
      allowed: false,
      reason:
        "Hourly request limit reached (max 5 per hour). Please call 0917 730 032 directly.",
    };
  }

  if (record.dailyTimestamps.length >= 20) {
    return {
      allowed: false,
      reason:
        "Daily request limit reached (max 20 per day). Please call 0917 730 032 directly.",
    };
  }

  // Record this hit
  record.hourlyTimestamps.push(now);
  record.dailyTimestamps.push(now);

  return { allowed: true };
}
