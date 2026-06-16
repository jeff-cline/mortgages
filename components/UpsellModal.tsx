"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { usd } from "@/components/funnel/types";

type Status = "idle" | "submitting" | "protected" | "declined" | "error";

export function UpsellModal({
  leadId,
  loanAmount,
  onClose,
}: {
  leadId: string;
  loanAmount: number;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function choose(optIn: boolean) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead/insurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, optIn }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus(optIn ? "protected" : "declined");
    } catch {
      setStatus("error");
    }
  }

  const done = status === "protected" || status === "declined";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upsell-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-brand/40 backdrop-blur-sm"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-line bg-white shadow-[var(--shadow-card)]">
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {done ? (
          <div className="p-8 text-center">
            <div
              className={[
                "mx-auto flex h-14 w-14 items-center justify-center rounded-full",
                status === "protected" ? "bg-accent/10 text-accent" : "bg-surface text-brand",
              ].join(" ")}
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
                <path
                  d="M5 12.5l4 4 10-10"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="mt-5 text-xl font-bold text-brand">
              {status === "protected"
                ? "You're protected. Mortgages+ is on us."
                : "All set — your offers are saved."}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {status === "protected"
                ? "We'll be in touch shortly with your portable life policy details."
                : "You can revisit protection anytime from your account."}
            </p>
            <div className="mt-6">
              <Button variant="primary" size="md" onClick={onClose} className="w-full">
                Back to my offers
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Illustration: a home shielded / paid off */}
            <div className="relative overflow-hidden rounded-t-xl bg-brand px-8 pb-8 pt-10 text-center text-white">
              <div className="mx-auto flex h-24 w-24 items-center justify-center">
                <svg viewBox="0 0 96 96" className="h-24 w-24" fill="none" aria-hidden="true">
                  {/* shield */}
                  <path
                    d="M48 8l30 10v22c0 22-13 35-30 48C31 75 18 62 18 40V18L48 8z"
                    fill="rgba(255,255,255,0.08)"
                    stroke="rgba(230,184,0,0.9)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* house */}
                  <path
                    d="M33 50l15-12 15 12"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M37 49v17h22V49"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M45 66v-9h6v9"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 id="upsell-title" className="mt-4 text-2xl font-bold tracking-tight text-balance">
                Protect your investment with a portable life policy
              </h2>
            </div>

            <div className="px-8 py-7">
              <p className="text-base leading-relaxed text-ink">
                If the unexpected happens, your{" "}
                <span className="font-semibold text-brand">{usd.format(loanAmount)}</span> mortgage is
                paid in full — your family keeps the home, free and clear.
              </p>

              <div className="mt-6 flex items-baseline justify-center gap-2 rounded-xl border border-line bg-surface py-5">
                <span className="text-4xl font-bold text-accent">$82.12</span>
                <span className="text-lg font-medium text-muted">/mo</span>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-lg bg-gold/10 px-4 py-3">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-gold" fill="currentColor" aria-hidden="true">
                  <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                </svg>
                <p className="text-sm font-medium text-ink">
                  Enroll today and get <span className="font-bold">Mortgages+</span> — free.
                </p>
              </div>

              <p className="mt-5 text-center text-xs text-muted">
                Brought to you by one of the world&apos;s leading providers in portable protection.
              </p>

              {status === "error" && (
                <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-center text-sm font-medium text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => choose(true)}
                  disabled={status === "submitting"}
                  className="w-full"
                >
                  {status === "submitting" ? "One moment…" : "Add protection — get Mortgages+ free"}
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => choose(false)}
                  disabled={status === "submitting"}
                  className="w-full"
                >
                  No thanks, continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
