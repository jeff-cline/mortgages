"use client";

import { useState } from "react";
import {
  NumberField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
} from "./_shared";

export default function ClosingCostsCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);

  const loanAmount = Math.max(0, homePrice - downPayment);

  const items = [
    { label: "Loan origination (0.5% of loan)", value: loanAmount * 0.005 },
    { label: "Appraisal", value: 600 },
    { label: "Title insurance (0.5% of price)", value: homePrice * 0.005 },
    { label: "Recording & transfer (0.4% of price)", value: homePrice * 0.004 },
    { label: "Prepaid escrow", value: 1200 },
    { label: "Underwriting", value: 1100 },
    { label: "Credit & misc.", value: 300 },
  ];

  const total = items.reduce((a, i) => a + i.value, 0);
  const pctOfPrice = homePrice > 0 ? (total / homePrice) * 100 : 0;

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Home price" value={homePrice} onChange={setHomePrice} min={50000} max={2000000} step={5000} prefix="$" slider />
            <NumberField label="Down payment" value={downPayment} onChange={setDownPayment} min={0} max={homePrice} step={5000} prefix="$" slider />
            <div className="rounded-lg bg-surface p-3 text-sm text-muted">
              Loan amount <span className="font-semibold text-ink">{money(loanAmount)}</span>
            </div>
          </>
        }
        results={
          <ResultsPanel title="Estimated closing costs">
            <ResultRow label="Total closing costs" value={money(total)} emphasis />
            <div className="mt-4">
              {items.map((i) => (
                <ResultRow key={i.label} label={i.label} value={money(i.value)} />
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-white/60 p-3 text-sm text-muted">
              About <span className="font-semibold text-ink">{pctOfPrice.toFixed(1)}%</span> of the
              purchase price.
            </div>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
