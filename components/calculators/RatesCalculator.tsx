"use client";

import { useState } from "react";
import { buildOffers, type CreditBand } from "@/src/core/offers";
import { US_STATES } from "@/components/funnel/types";
import {
  NumberField,
  SegmentedField,
  QuoteCTA,
  CalcShell,
  money,
} from "./_shared";

type Purpose = "purchase" | "refinance";

export default function RatesCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [years, setYears] = useState<15 | 30>(30);
  const [creditBand, setCreditBand] = useState<CreditBand>("excellent");
  const [region, setRegion] = useState("CA");
  const [purpose, setPurpose] = useState<Purpose>("purchase");

  const offers = buildOffers({ loanAmount, years, creditBand, region, purpose });

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Loan amount" value={loanAmount} onChange={setLoanAmount} min={50000} max={2000000} step={5000} prefix="$" slider />
            <SegmentedField
              label="Loan term"
              value={years}
              onChange={(v) => setYears(v)}
              options={[
                { label: "15 yr", value: 15 },
                { label: "30 yr", value: 30 },
              ]}
            />
            <SegmentedField
              label="Credit"
              value={creditBand}
              onChange={(v) => setCreditBand(v)}
              options={[
                { label: "Excellent", value: "excellent" },
                { label: "Good", value: "good" },
                { label: "Fair", value: "fair" },
                { label: "Poor", value: "poor" },
              ]}
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-ink" htmlFor="rates-region">
                State
              </label>
              <select
                id="rates-region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <SegmentedField
              label="Purpose"
              value={purpose}
              onChange={(v) => setPurpose(v)}
              options={[
                { label: "Purchase", value: "purchase" },
                { label: "Refinance", value: "refinance" },
              ]}
            />
          </>
        }
        results={
          <div className="rounded-xl border border-brand/15 bg-gradient-to-br from-surface to-white p-6 shadow-[var(--shadow-card)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
              Ranked rate comparison
            </p>
            <ul className="space-y-3">
              {offers.map((o, i) => (
                <li
                  key={o.affiliateId}
                  className="rounded-lg border border-line bg-white/70 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className="inline-block h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: o.color }}
                      />
                      <span className="text-sm font-semibold text-ink">{o.name}</span>
                      {i === 0 && (
                        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                          Best APR
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-bold tracking-tight text-brand tabular-nums">
                      {o.rate.toFixed(3)}%
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-4">
                    <div>
                      <span className="block text-xs text-muted">APR</span>
                      <span className="font-semibold text-ink tabular-nums">{o.apr.toFixed(3)}%</span>
                    </div>
                    <div>
                      <span className="block text-xs text-muted">Monthly</span>
                      <span className="font-semibold text-ink tabular-nums">{money(o.monthlyPayment)}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-muted">Points</span>
                      <span className="font-semibold text-ink tabular-nums">{o.points.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-muted">Fees</span>
                      <span className="font-semibold text-ink tabular-nums">{money(o.fees)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Illustrative rates — not a commitment to lend. Actual rates depend on
              full underwriting.
            </p>
          </div>
        }
      />
      <QuoteCTA />
    </div>
  );
}
