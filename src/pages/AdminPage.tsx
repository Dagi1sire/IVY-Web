import React, { useState, useEffect } from "react";
import { useRouter } from "../context/RouterContext";
import { VisitRequestDoc } from "../../server/types";
import {
  Shield,
  RefreshCw,
  Phone,
  Calendar,
  Clock,
  Send,
  CheckCircle,
  AlertTriangle,
  Filter,
  ArrowLeft,
  User,
} from "lucide-react";

export const AdminPage: React.FC = () => {
  const { navigate } = useRouter();
  const [requests, setRequests] = useState<VisitRequestDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/visit-requests");
      const data = await res.json();
      if (res.ok && data.ok) {
        setRequests(data.requests || []);
      }
    } catch (err) {
      console.error("Failed to load requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRetryNotify = async (id?: string) => {
    if (!id) return;
    setRetryingId(id);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/retry-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setFeedback(`Notifications retried for ${id}. Telegram: ${data.notify.telegram}, Email: ${data.notify.email}`);
        fetchRequests();
      } else {
        setFeedback(`Retry failed: ${data.error || "Unknown error"}`);
      }
    } catch (err: any) {
      setFeedback(`Network error: ${err.message}`);
    } finally {
      setRetryingId(null);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/visit-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          contactedAt: newStatus === "contacted" ? new Date().toISOString() : undefined,
        }),
      });
      if (res.ok) {
        fetchRequests();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const filtered = requests.filter((r) => {
    if (statusFilter === "all") return true;
    return r.status === statusFilter;
  });

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-6">
        {/* Back and Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-green)] hover:underline mb-2 bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </button>
            <h1 className="text-2xl font-bold font-heading text-[var(--color-navy)] m-0">
              Staff Portal: Visit Requests
            </h1>
            <p className="text-xs text-[var(--color-muted)] m-0 mt-0.5">
              Secure internal records &bull; Direct notification dispatch &bull; Follow-up workflow
            </p>
          </div>

          <button
            type="button"
            onClick={fetchRequests}
            disabled={loading}
            className="btn-outline px-4 py-2 text-xs font-semibold inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {feedback && (
          <div className="p-3 rounded-xl bg-[var(--color-soft-green)] border border-[var(--color-green)] text-xs text-[var(--color-text)] font-medium">
            {feedback}
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-[var(--color-muted)] shrink-0" />
          {[
            { id: "all", label: "All Requests" },
            { id: "new", label: "New" },
            { id: "contacted", label: "Contacted" },
            { id: "visit_scheduled", label: "Visit Scheduled" },
            { id: "enrolled", label: "Enrolled" },
            { id: "not_proceeding", label: "Not Proceeding" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer shrink-0 transition-colors ${
                statusFilter === f.id
                  ? "bg-[var(--color-green)] text-white border-[var(--color-green)]"
                  : "bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-line)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="card-soft p-12 text-center text-sm text-[var(--color-muted)]">
            Loading visit requests...
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-soft p-12 text-center text-sm text-[var(--color-muted)]">
            No visit requests found for this filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((req) => (
              <div
                key={req.id}
                className="card-soft p-5 sm:p-6 border border-[var(--color-line)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-bold text-lg text-[var(--color-navy)]">
                        {req.parentName}
                      </span>
                      <span
                        className={`text-[0.72rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          req.status === "new"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
                            : req.status === "contacted"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200"
                            : req.status === "visit_scheduled"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {req.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted)]">
                      <a
                        href={`tel:${req.phone}`}
                        className="font-semibold text-[var(--color-orange)] hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{req.phone}</span>
                      </a>
                      <span>&bull;</span>
                      <span>Child: {req.childAgeGroup.replace("_", " ")}</span>
                      <span>&bull;</span>
                      <span>Program: {req.program}</span>
                      <span>&bull;</span>
                      <span>Best day: {req.preferredDay}</span>
                      <span>&bull;</span>
                      <span>Lang: {req.language}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={req.status}
                      onChange={(e) => handleUpdateStatus(req.id!, e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border border-[var(--color-line)] text-xs font-semibold bg-[var(--color-surface)] text-[var(--color-text)]"
                    >
                      <option value="new">Mark: New</option>
                      <option value="contacted">Mark: Contacted</option>
                      <option value="visit_scheduled">Mark: Scheduled</option>
                      <option value="enrolled">Mark: Enrolled</option>
                      <option value="not_proceeding">Mark: Not Proceeding</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleRetryNotify(req.id)}
                      disabled={retryingId === req.id}
                      title="Retry Email Notification"
                      className="btn-outline px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3 text-[var(--color-green)]" />
                      <span>{retryingId === req.id ? "Sending..." : "Retry Email"}</span>
                    </button>
                  </div>
                </div>

                {req.message && (
                  <div className="p-3 rounded-lg bg-[var(--color-surface-hover)] text-xs text-[var(--color-text)] border border-[var(--color-line)]/50">
                    <span className="font-semibold text-[var(--color-muted)] block mb-0.5">Parent Message:</span>
                    {req.message}
                  </div>
                )}

                {/* Dispatch Status Badges */}
                <div className="pt-2 border-t border-[var(--color-line)]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--color-muted)]">Dispatch:</span>
                    <span
                      className={`inline-flex items-center gap-1 font-medium ${
                        req.notify?.email === "sent"
                          ? "text-emerald-600"
                          : req.notify?.email === "skipped"
                          ? "text-gray-500"
                          : "text-red-500"
                      }`}
                    >
                      Email: {req.notify?.email || "pending"}
                    </span>
                  </div>

                  <span className="text-[var(--color-muted)] text-[0.72rem]">
                    ID: {req.id} &bull; {new Date(req.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
