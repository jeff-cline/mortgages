"use client";

import { useState } from "react";
import { fhaMortgage } from "@/src/core/finance";
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

export default function FhaCalculator() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPaymentPct, setDownPaymentPct] = useState(3.5);
  const [ratePct, setRatePct] = useState(6.5);
  const [years, setYears] = useState<15 | 30>(30);
  const [annualTaxPct, setAnnualTaxPct] = useState(1.1);
  const [annualInsurance, setAnnualInsurance] = useState(1500);

  const safeDp = Math.max(3.5, downPaymentPct);
  const {
    baseLoan,
    upfrontMip,
    financedLoan,
    monthlyPI,
    monthlyMip,
    monthlyTax,
    monthlyInsurance,
    totalMonthly,
  } = fhaMortgage({
    homePrice,
    downPaymentPct: safeDp,
    ratePct,
    years,
    annualTaxPct,
    annualInsurance,
  });

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Home price" value={homePrice} onChange={setHomePrice} min={50000} max={1500000} step={5000} prefix="$" slider />
            <NumberField label="Down payment" value={downPaymentPct} onChange={setDownPaymentPct} min={3.5} max={50} step={0.5} suffix="%" slider />
            <NumberField label="Interest rate" value={ratePct} onChange={setRatePct} min={0} max={12} step={0.05} suffix="%" slider />
            <SegmentedField
              label="Loan term"
              value={years}
              onChange={(v) => setYears(v)}
              options={[
                { label: "15 yr", value: 15 },
                { label: "30 yr", value: 30 },
              ]}
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <NumberField label="Property tax (annual)" value={annualTaxPct} onChange={setAnnualTaxPct} min={0} max={5} step={0.05} suffix="%" />
              <NumberField label="Insurance (annual)" value={annualInsurance} onChange={setAnnualInsurance} min={0} max={20000} step={100} prefix="$" />
            </div>
          </>
        }
        results={
          <ResultsPanel title="FHA loan estimate">
            <ResultRow label="Total monthly payment" value={money(totalMonthly)} emphasis />
            <div className="mt-4">
              <ResultRow label="Principal & interest" value={money2(monthlyPI)} />
              <ResultRow label="Monthly MIP" value={money2(monthlyMip)} />
              <ResultRow label="Property tax" value={money2(monthlyTax)} />
              <ResultRow label="Homeowners insurance" value={money2(monthlyInsurance)} />
            </div>
            <div className="mt-4">
              <ResultRow label="Base loan amount" value={money(baseLoan)} />
              <ResultRow label="Financed UFMIP (1.75%)" value={money(upfrontMip)} />
              <ResultRow label="Total financed loan" value={money(financedLoan)} />
            </div>
            <p className="mt-4 rounded-lg bg-white/60 p-3 text-xs text-muted">
              FHA loans require mortgage insurance (MIP): a 1.75% upfront premium
              (financed into the loan) plus an annual premium paid monthly.
            </p>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
