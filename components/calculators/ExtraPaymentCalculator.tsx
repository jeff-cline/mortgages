"use client";

import { useState } from "react";
import { extraPayment, monthlyPI } from "@/src/core/finance";
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

function yearsMonths(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} yr${y === 1 ? "" : "s"}`);
  if (m > 0) parts.push(`${m} mo${m === 1 ? "" : "s"}`);
  return parts.length ? parts.join(" ") : "0 mos";
}

export default function ExtraPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(320000);
  const [ratePct, setRatePct] = useState(6.5);
  const [years, setYears] = useState<15 | 20 | 30>(30);
  const [extraMonthly, setExtraMonthly] = useState(250);

  const basePayment = monthlyPI(loanAmount, ratePct, years);
  const { monthsSaved, interestSaved, payoffMonths } = extraPayment({
    principal: loanAmount,
    ratePct,
    years,
    extraMonthly,
  });

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
            <NumberField label="Extra monthly payment" value={extraMonthly} onChange={setExtraMonthly} min={0} max={5000} step={25} prefix="$" slider />
          </>
        }
        results={
          <ResultsPanel title="Pay off faster">
            <ResultRow label="Total interest saved" value={money(interestSaved)} emphasis />
            <div className="mt-4">
              <ResultRow label="Time saved" value={yearsMonths(monthsSaved)} />
              <ResultRow label="New payoff time" value={yearsMonths(payoffMonths)} />
              <ResultRow label="Base monthly (P&I)" value={money2(basePayment)} />
              <ResultRow label="With extra" value={money2(basePayment + extraMonthly)} />
            </div>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
