"use client";

import { useState } from "react";
import { monthlyPI, monthlyPITI } from "@/src/core/finance";
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

export default function PaymentCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [ratePct, setRatePct] = useState(6.5);
  const [years, setYears] = useState<15 | 20 | 30>(30);
  const [annualTaxPct, setAnnualTaxPct] = useState(1.1);
  const [annualInsurance, setAnnualInsurance] = useState(1500);
  const [monthlyHOA, setMonthlyHOA] = useState(0);
  const [pmiAnnualPct, setPmiAnnualPct] = useState(0.5);

  const loanAmount = Math.max(0, homePrice - downPayment);
  const pi = monthlyPI(loanAmount, ratePct, years);
  const tax = (annualTaxPct / 100) * homePrice / 12;
  const insurance = annualInsurance / 12;
  const ltv = homePrice > 0 ? loanAmount / homePrice : 0;
  const pmi = ltv > 0.8 ? (pmiAnnualPct / 100) * homePrice / 12 : 0;
  const total = monthlyPITI({
    principal: loanAmount,
    ratePct,
    years,
    annualTaxPct,
    annualInsurance,
    monthlyHOA,
    pmiAnnualPct,
    homeValue: homePrice,
  });

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Home price" value={homePrice} onChange={setHomePrice} min={50000} max={2000000} step={5000} prefix="$" slider />
            <NumberField label="Down payment" value={downPayment} onChange={setDownPayment} min={0} max={homePrice} step={5000} prefix="$" slider />
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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <NumberField label="Property tax (annual)" value={annualTaxPct} onChange={setAnnualTaxPct} min={0} max={5} step={0.05} suffix="%" />
              <NumberField label="Insurance (annual)" value={annualInsurance} onChange={setAnnualInsurance} min={0} max={20000} step={100} prefix="$" />
              <NumberField label="HOA (monthly)" value={monthlyHOA} onChange={setMonthlyHOA} min={0} max={2000} step={25} prefix="$" />
              <NumberField label="PMI rate (annual)" value={pmiAnnualPct} onChange={setPmiAnnualPct} min={0} max={2} step={0.05} suffix="%" />
            </div>
          </>
        }
        results={
          <ResultsPanel title="Estimated monthly payment">
            <ResultRow label="Total monthly (PITI)" value={money(total)} emphasis />
            <div className="mt-4">
              <ResultRow label="Principal & interest" value={money2(pi)} />
              <ResultRow label="Property tax" value={money2(tax)} />
              <ResultRow label="Homeowners insurance" value={money2(insurance)} />
              <ResultRow label="HOA" value={money2(monthlyHOA)} />
              <ResultRow label={`PMI${ltv > 0.8 ? "" : " (not required)"}`} value={money2(pmi)} />
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
