"use client";

import { useState } from "react";
import { extraPayment, amortization, totalInterest } from "@/src/core/finance";
import {
  NumberField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
} from "./_shared";

function fmtMonths(months: number): string {
  if (!isFinite(months) || months <= 0) return "—";
  const yrs = Math.floor(months / 12);
  const mos = Math.round(months % 12);
  const parts: string[] = [];
  if (yrs > 0) parts.push(`${yrs} yr${yrs === 1 ? "" : "s"}`);
  if (mos > 0) parts.push(`${mos} mo${mos === 1 ? "" : "s"}`);
  return parts.length ? parts.join(" ") : "0 mos";
}

export default function PayoffCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [ratePct, setRatePct] = useState(6.5);
  const [years, setYears] = useState(30);
  const [extraMonthly, setExtraMonthly] = useState(0);

  const baseMonths = years * 12;
  const { payoffMonths, monthsSaved, interestSaved } = extraPayment({
    principal: loanAmount,
    ratePct,
    years,
    extraMonthly,
  });
  // Total interest paid with the extra payment scenario
  const baseTotalInterest = totalInterest(loanAmount, ratePct, years);
  const interestWithExtra = baseTotalInterest - interestSaved;
  // amortization referenced to validate schedule existence
  const schedule = amortization(loanAmount, ratePct, years);
  const hasExtra = extraMonthly > 0;

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Loan amount" value={loanAmount} onChange={setLoanAmount} min={10000} max={2000000} step={5000} prefix="$" slider />
            <NumberField label="Interest rate" value={ratePct} onChange={setRatePct} min={0} max={12} step={0.05} suffix="%" slider />
            <NumberField label="Loan term" value={years} onChange={setYears} min={5} max={40} step={1} suffix="yrs" slider />
            <NumberField label="Extra monthly payment" value={extraMonthly} onChange={setExtraMonthly} min={0} max={5000} step={25} prefix="$" slider />
          </>
        }
        results={
          <ResultsPanel title="Payoff timeline">
            <ResultRow label="Payoff time with extra" value={fmtMonths(payoffMonths)} emphasis />
            <div className="mt-4">
              <ResultRow label="Original payoff time" value={fmtMonths(baseMonths)} />
              <ResultRow label="Time saved" value={hasExtra ? fmtMonths(monthsSaved) : "—"} />
              <ResultRow label="Total interest (with extra)" value={money(interestWithExtra)} />
              <ResultRow label="Total interest (no extra)" value={money(baseTotalInterest)} />
              {hasExtra && (
                <ResultRow label="Interest saved" value={money(interestSaved)} />
              )}
            </div>
            <div className="mt-4 rounded-lg bg-white/60 p-3 text-sm text-muted">
              Based on {schedule.length} scheduled payments
              {hasExtra ? ` · paid off in ${payoffMonths} months` : ""}.
            </div>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
