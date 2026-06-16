"use client";

import { useState } from "react";
import { dti } from "@/src/core/finance";
import {
  NumberField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
} from "./_shared";

function band(ratioPct: number): { label: string; color: string; bar: string } {
  if (ratioPct <= 36) return { label: "Healthy", color: "text-accent", bar: "bg-accent" };
  if (ratioPct <= 43) return { label: "Manageable", color: "text-gold", bar: "bg-gold" };
  return { label: "High", color: "text-red-600", bar: "bg-red-500" };
}

export default function DtiCalculator() {
  const [grossAnnualIncome, setGrossAnnualIncome] = useState(120000);
  const [housing, setHousing] = useState(2000);
  const [car, setCar] = useState(450);
  const [creditCards, setCreditCards] = useState(150);
  const [studentLoans, setStudentLoans] = useState(300);
  const [other, setOther] = useState(0);

  const grossMonthlyIncome = grossAnnualIncome / 12;
  const totalDebt = housing + car + creditCards + studentLoans + other;
  const ratio = dti(totalDebt, grossMonthlyIncome);
  const ratioPct = isFinite(ratio) ? ratio * 100 : 0;
  const b = band(ratioPct);

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Gross annual income" value={grossAnnualIncome} onChange={setGrossAnnualIncome} min={20000} max={1000000} step={5000} prefix="$" slider />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <NumberField label="Housing (rent/mortgage)" value={housing} onChange={setHousing} min={0} max={20000} step={50} prefix="$" />
              <NumberField label="Car payment" value={car} onChange={setCar} min={0} max={5000} step={25} prefix="$" />
              <NumberField label="Credit cards (min)" value={creditCards} onChange={setCreditCards} min={0} max={5000} step={25} prefix="$" />
              <NumberField label="Student loans" value={studentLoans} onChange={setStudentLoans} min={0} max={5000} step={25} prefix="$" />
              <NumberField label="Other debts" value={other} onChange={setOther} min={0} max={5000} step={25} prefix="$" />
            </div>
          </>
        }
        results={
          <ResultsPanel title="Debt-to-income ratio">
            <ResultRow
              label="Your DTI"
              value={<span className={b.color}>{ratioPct.toFixed(1)}%</span>}
              emphasis
            />
            <div className="mt-2">
              <div className="h-3 w-full overflow-hidden rounded-full bg-line">
                <div
                  className={`h-full ${b.bar} transition-all`}
                  style={{ width: `${Math.min(100, ratioPct)}%` }}
                />
              </div>
              <p className={`mt-2 text-sm font-semibold ${b.color}`}>{b.label}</p>
            </div>
            <div className="mt-4">
              <ResultRow label="Total monthly debt" value={money(totalDebt)} />
              <ResultRow label="Gross monthly income" value={money(grossMonthlyIncome)} />
            </div>
            <p className="mt-4 text-xs text-muted">
              Most lenders look for a DTI of 43% or below. 36% or under is ideal
              and unlocks the best rates.
            </p>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
