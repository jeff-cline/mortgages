"use client";

import { useState } from "react";
import { monthlyPI, refiBreakevenMonths } from "@/src/core/finance";
import {
  NumberField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
  money2,
} from "./_shared";

export default function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState(280000);
  const [currentRatePct, setCurrentRatePct] = useState(7.25);
  const [currentYearsLeft, setCurrentYearsLeft] = useState(27);
  const [newRatePct, setNewRatePct] = useState(5.75);
  const [newYears, setNewYears] = useState(30);
  const [closingCosts, setClosingCosts] = useState(6000);

  const currentPayment = monthlyPI(currentBalance, currentRatePct, currentYearsLeft);
  const newPayment = monthlyPI(currentBalance, newRatePct, newYears);
  const monthlySavings = currentPayment - newPayment;
  const breakeven = refiBreakevenMonths({ currentPayment, newPayment, closingCosts });

  const breakevenLabel = !isFinite(breakeven)
    ? "No monthly savings at these terms"
    : `Break even in ${Math.ceil(breakeven)} months`;

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Current loan balance" value={currentBalance} onChange={setCurrentBalance} min={10000} max={2000000} step={5000} prefix="$" slider />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <NumberField label="Current rate" value={currentRatePct} onChange={setCurrentRatePct} min={0} max={15} step={0.05} suffix="%" />
              <NumberField label="Years left" value={currentYearsLeft} onChange={setCurrentYearsLeft} min={1} max={40} step={1} suffix="yr" />
              <NumberField label="New rate" value={newRatePct} onChange={setNewRatePct} min={0} max={15} step={0.05} suffix="%" />
              <NumberField label="New term" value={newYears} onChange={setNewYears} min={5} max={40} step={1} suffix="yr" />
            </div>
            <NumberField label="Closing costs" value={closingCosts} onChange={setClosingCosts} min={0} max={50000} step={250} prefix="$" slider />
          </>
        }
        results={
          <ResultsPanel title="Refinance analysis">
            <ResultRow
              label="Monthly savings"
              value={monthlySavings > 0 ? money2(monthlySavings) : "—"}
              emphasis
            />
            <div
              className={[
                "mt-4 rounded-lg p-4 text-center text-base font-semibold",
                isFinite(breakeven)
                  ? "bg-accent/10 text-accent"
                  : "bg-gold/10 text-ink",
              ].join(" ")}
            >
              {breakevenLabel}
            </div>
            <div className="mt-4">
              <ResultRow label="Current payment (P&I)" value={money2(currentPayment)} />
              <ResultRow label="New payment (P&I)" value={money2(newPayment)} />
              <ResultRow label="Closing costs" value={money(closingCosts)} />
              {monthlySavings > 0 && (
                <ResultRow label="Annual savings" value={money(monthlySavings * 12)} />
              )}
            </div>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
