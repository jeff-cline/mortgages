"use client";

import { useState } from "react";
import { monthlyPI, monthlyPITI, totalInterest } from "@/src/core/finance";
import {
  NumberField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
  money2,
} from "./_shared";

const YEARS = 30 as const;

export default function ThirtyYearCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [ratePct, setRatePct] = useState(6.5);
  const [annualTaxPct, setAnnualTaxPct] = useState(1.1);
  const [annualInsurance, setAnnualInsurance] = useState(1500);

  const loanAmount = Math.max(0, homePrice - downPayment);
  const pi = monthlyPI(loanAmount, ratePct, YEARS);
  const tax = (annualTaxPct / 100) * homePrice / 12;
  const insurance = annualInsurance / 12;
  const ltv = homePrice > 0 ? loanAmount / homePrice : 0;
  const pmiAnnualPct = 0.5;
  const pmi = ltv > 0.8 ? (pmiAnnualPct / 100) * homePrice / 12 : 0;
  const total = monthlyPITI({
    principal: loanAmount,
    ratePct,
    years: YEARS,
    annualTaxPct,
    annualInsurance,
    monthlyHOA: 0,
    pmiAnnualPct,
    homeValue: homePrice,
  });
  const interest = totalInterest(loanAmount, ratePct, YEARS);
  const totalCost = pi * YEARS * 12 + downPayment;

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Home price" value={homePrice} onChange={setHomePrice} min={50000} max={2000000} step={5000} prefix="$" slider />
            <NumberField label="Down payment" value={downPayment} onChange={setDownPayment} min={0} max={homePrice} step={5000} prefix="$" slider />
            <NumberField label="Interest rate" value={ratePct} onChange={setRatePct} min={0} max={12} step={0.05} suffix="%" slider />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <NumberField label="Property tax (annual)" value={annualTaxPct} onChange={setAnnualTaxPct} min={0} max={5} step={0.05} suffix="%" />
              <NumberField label="Insurance (annual)" value={annualInsurance} onChange={setAnnualInsurance} min={0} max={20000} step={100} prefix="$" />
            </div>
            <div className="rounded-lg bg-surface p-3 text-sm text-muted">
              Term locked to <span className="font-semibold text-ink">30-year fixed</span>.
            </div>
          </>
        }
        results={
          <ResultsPanel title="30-year fixed payment">
            <ResultRow label="Total monthly (PITI)" value={money(total)} emphasis />
            <div className="mt-4">
              <ResultRow label="Principal & interest" value={money2(pi)} />
              <ResultRow label="Property tax" value={money2(tax)} />
              <ResultRow label="Homeowners insurance" value={money2(insurance)} />
              <ResultRow label={`PMI${ltv > 0.8 ? "" : " (not required)"}`} value={money2(pmi)} />
            </div>
            <div className="mt-4">
              <ResultRow label="Total interest over 30 years" value={money(interest)} />
              <ResultRow label="Total cost (P&I + down payment)" value={money(totalCost)} />
            </div>
            <div className="mt-4 rounded-lg bg-white/60 p-3 text-sm text-muted">
              Loan amount <span className="font-semibold text-ink">{money(loanAmount)}</span>
              {" · "}
              {(ltv * 100).toFixed(0)}% LTV
            </div>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
