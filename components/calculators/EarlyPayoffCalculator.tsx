"use client";

import { useState } from "react";
import { extraPayment } from "@/src/core/finance";
import {
  NumberField,
  SegmentedField,
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

export default function EarlyPayoffCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [ratePct, setRatePct] = useState(6.5);
  const [years, setYears] = useState(30);
  const [extraMonthly, setExtraMonthly] = useState(200);

  const baseMonths = years * 12;
  const { payoffMonths, monthsSaved, interestSaved } = extraPayment({
    principal: loanAmount,
    ratePct,
    years,
    extraMonthly,
  });

  const preset = [100, 200, 500].includes(extraMonthly) ? extraMonthly : 0;

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Loan amount" value={loanAmount} onChange={setLoanAmount} min={10000} max={2000000} step={5000} prefix="$" slider />
            <NumberField label="Interest rate" value={ratePct} onChange={setRatePct} min={0} max={12} step={0.05} suffix="%" slider />
            <NumberField label="Loan term" value={years} onChange={setYears} min={5} max={40} step={1} suffix="yrs" slider />
            <SegmentedField
              label="Quick extra amount"
              value={preset}
              onChange={(v) => setExtraMonthly(v)}
              options={[
                { label: "+$100", value: 100 },
                { label: "+$200", value: 200 },
                { label: "+$500", value: 500 },
              ]}
            />
            <NumberField label="Extra monthly payment" value={extraMonthly} onChange={setExtraMonthly} min={0} max={5000} step={25} prefix="$" slider />
          </>
        }
        results={
          <ResultsPanel title="Early payoff savings">
            <ResultRow label="Interest saved" value={money(interestSaved)} emphasis />
            <div className="mt-4">
              <ResultRow label="Time saved" value={fmtMonths(monthsSaved)} />
              <ResultRow label="New payoff time" value={fmtMonths(payoffMonths)} />
              <ResultRow label="Original payoff time" value={fmtMonths(baseMonths)} />
            </div>
            <div className="mt-4 rounded-lg bg-white/60 p-3 text-sm text-muted">
              Paying an extra{" "}
              <span className="font-semibold text-ink">{money(extraMonthly)}</span>/mo
              pays off your loan{" "}
              <span className="font-semibold text-ink">{fmtMonths(monthsSaved)}</span>{" "}
              sooner.
            </div>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
