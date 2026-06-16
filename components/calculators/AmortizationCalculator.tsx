"use client";

import { useMemo, useState } from "react";
import { amortization, monthlyPI, totalInterest } from "@/src/core/finance";
import {
  NumberField,
  SegmentedField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
  money2,
} from "./_shared";

interface YearRow {
  year: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState(320000);
  const [ratePct, setRatePct] = useState(6.5);
  const [years, setYears] = useState<15 | 20 | 30>(30);

  const payment = monthlyPI(loanAmount, ratePct, years);
  const interest = totalInterest(loanAmount, ratePct, years);
  const totalPaid = payment * years * 12;

  const yearly = useMemo<YearRow[]>(() => {
    const rows = amortization(loanAmount, ratePct, years);
    const out: YearRow[] = [];
    for (let y = 0; y < years; y++) {
      const slice = rows.slice(y * 12, y * 12 + 12);
      if (slice.length === 0) break;
      const principal = slice.reduce((a, r) => a + r.principal, 0);
      const interestY = slice.reduce((a, r) => a + r.interest, 0);
      out.push({
        year: y + 1,
        principal,
        interest: interestY,
        balance: slice[slice.length - 1].balance,
      });
    }
    return out;
  }, [loanAmount, ratePct, years]);

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Loan amount" value={loanAmount} onChange={setLoanAmount} min={10000} max={2000000} step={5000} prefix="$" slider />
            <NumberField label="Interest rate" value={ratePct} onChange={setRatePct} min={0} max={12} step={0.05} suffix="%" slider />
            <SegmentedField
              label="Loan term"
              value={years}
              onChange={(v) => setYears(v)}
              options={[
                { label: "15 yr", value: 15 },
                { label: "20 yr", value: 20 },
                { label: "30 yr", value: 30 },
              ]}
            />
          </>
        }
        results={
          <ResultsPanel title="Loan summary">
            <ResultRow label="Monthly payment (P&I)" value={money2(payment)} emphasis />
            <div className="mt-4">
              <ResultRow label="Total interest" value={money(interest)} />
              <ResultRow label="Total paid" value={money(totalPaid)} />
            </div>
          </ResultsPanel>
        }
      />

      <div className="mt-8">
        <h3 className="mb-3 text-sm font-semibold text-ink">Yearly amortization schedule</h3>
        <div className="max-h-96 overflow-auto rounded-xl border border-line">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-surface text-left">
              <tr className="text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-semibold">Year</th>
                <th className="px-4 py-3 text-right font-semibold">Principal</th>
                <th className="px-4 py-3 text-right font-semibold">Interest</th>
                <th className="px-4 py-3 text-right font-semibold">Balance</th>
              </tr>
            </thead>
            <tbody>
              {yearly.map((r) => (
                <tr key={r.year} className="border-t border-line/70">
                  <td className="px-4 py-2.5 font-medium text-ink">{r.year}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink">{money(r.principal)}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-muted">{money(r.interest)}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink">{money(r.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <QuoteCTA />
    </div>
  );
}
