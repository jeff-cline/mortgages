"use client";

import { useState } from "react";
import { affordability, monthlyPI } from "@/src/core/finance";
import {
  NumberField,
  SegmentedField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
} from "./_shared";

export default function AffordabilityCalculator() {
  const [grossAnnualIncome, setGrossAnnualIncome] = useState(120000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(60000);
  const [ratePct, setRatePct] = useState(6.5);
  const [years, setYears] = useState<15 | 20 | 30>(30);

  const grossMonthlyIncome = grossAnnualIncome / 12;
  const maxPrice = affordability({
    grossMonthlyIncome,
    monthlyDebts,
    ratePct,
    years,
    downPayment,
  });
  const loan = Math.max(0, maxPrice - downPayment);
  const pi = loan > 0 ? monthlyPI(loan, ratePct, years) : 0;
  const estTaxIns = (maxPrice * 0.015) / 12;
  const estMonthly = pi + estTaxIns;

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Gross annual income" value={grossAnnualIncome} onChange={setGrossAnnualIncome} min={20000} max={1000000} step={5000} prefix="$" slider />
            <NumberField label="Monthly debt payments" value={monthlyDebts} onChange={setMonthlyDebts} min={0} max={10000} step={50} prefix="$" slider />
            <NumberField label="Down payment" value={downPayment} onChange={setDownPayment} min={0} max={500000} step={5000} prefix="$" slider />
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
          <ResultsPanel title="What you can afford">
            <ResultRow label="Maximum home price" value={money(maxPrice)} emphasis />
            <div className="mt-4">
              <ResultRow label="Estimated monthly payment" value={money(estMonthly)} />
              <ResultRow label="Loan amount" value={money(loan)} />
              <ResultRow label="Down payment" value={money(downPayment)} />
            </div>
            <p className="mt-4 text-xs text-muted">
              Based on a 43% debt-to-income limit and an estimated 1.5% for taxes
              and insurance. Lenders may qualify you for more or less.
            </p>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
