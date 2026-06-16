"use client";

import { useState } from "react";
import { totalInterest, monthlyPI, amortization } from "@/src/core/finance";
import {
  NumberField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
  pct,
} from "./_shared";

export default function InterestCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [ratePct, setRatePct] = useState(6.5);
  const [years, setYears] = useState(30);

  const interest = totalInterest(loanAmount, ratePct, years);
  const pi = monthlyPI(loanAmount, ratePct, years);
  const totalPaid = pi * years * 12;
  const interestPctOfPrincipal = loanAmount > 0 ? (interest / loanAmount) * 100 : 0;
  const schedule = amortization(loanAmount, ratePct, years);
  const firstYearInterest = schedule
    .slice(0, 12)
    .reduce((acc, r) => acc + r.interest, 0);

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Loan amount" value={loanAmount} onChange={setLoanAmount} min={10000} max={2000000} step={5000} prefix="$" slider />
            <NumberField label="Interest rate" value={ratePct} onChange={setRatePct} min={0} max={12} step={0.05} suffix="%" slider />
            <NumberField label="Loan term" value={years} onChange={setYears} min={5} max={40} step={1} suffix="yrs" slider />
          </>
        }
        results={
          <ResultsPanel title="Interest over the life of the loan">
            <ResultRow label="Total interest paid" value={money(interest)} emphasis />
            <div className="mt-4">
              <ResultRow label="Total of all payments" value={money(totalPaid)} />
              <ResultRow label="Interest as % of principal" value={pct(interestPctOfPrincipal)} />
              <ResultRow label="First-year interest" value={money(firstYearInterest)} />
              <ResultRow label="Monthly principal & interest" value={money(pi)} />
            </div>
            <div className="mt-4 rounded-lg bg-white/60 p-3 text-sm text-muted">
              You repay{" "}
              <span className="font-semibold text-ink">{money(totalPaid)}</span> total
              on a <span className="font-semibold text-ink">{money(loanAmount)}</span> loan.
            </div>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
