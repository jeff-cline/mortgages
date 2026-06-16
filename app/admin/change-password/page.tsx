"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Could not update password.");
        setLoading(false);
        return;
      }
      router.push("/admin");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="text-xl font-semibold text-brand">Mortgages+ Admin</div>
          <p className="mt-1 text-sm text-muted">Set a new password to continue</p>
        </div>
        <div className="rounded-xl border border-line bg-white shadow-[var(--shadow-card)] p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-ink mb-1">
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-11 rounded-lg border border-line px-3 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
              />
              <p className="mt-1 text-xs text-muted">At least 8 characters.</p>
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-ink mb-1">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full h-11 rounded-lg border border-line px-3 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn w-full h-11 bg-brand text-white hover:bg-brand-700 shadow-sm disabled:opacity-60"
            >
              {loading ? "Saving…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
