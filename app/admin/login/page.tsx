"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Login failed");
        setLoading(false);
        return;
      }
      router.push(data.redirect ?? "/admin");
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
          <p className="mt-1 text-sm text-muted">Sign in to manage leads</p>
        </div>
        <div className="rounded-xl border border-line bg-white shadow-[var(--shadow-card)] p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-lg border border-line px-3 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
