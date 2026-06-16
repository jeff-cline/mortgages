"use client";

import { useState } from "react";
import { commercialMortgage } from "@/src/core/finance";
import {
  NumberField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
} from "./_shared";

export default function CommercialCalculator() {
  const [loanAmount, setLoanAmount] = useState(750000);
  const [ratePct, setRatePct] = useState(7);
  const [amortYears, setAmortYears] = useState(25);
  const [termYears, setTermYears] = useState(7);

  const { monthlyPayment, balloonBalance, totalInterestToTerm, totalPaidToTerm } =
    commercialMortgage({ loanAmount, ratePct, amortYears, termYears });

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Loan amount" value={loanAmount} onChange={setLoanAmount} min={50000} max={10000000} step={25000} prefix="$" slider />
            <NumberField label="Interest rate" value={ratePct} onChange={setRatePct} min={0} max={15} step={0.05} suffix="%" slider />
            <NumberField label="Amortization" value={amortYears} onChange={setAmortYears} min={5} max={30} step={1} suffix="yrs" slider />
            <NumberField label="Loan term (balloon)" value={termYears} onChange={setTermYears} min={1} max={amortYears} step={1} suffix="yrs" slider />
          </>
        }
        results={
          <ResultsPanel title="Commercial loan estimate">
            <ResultRow label="Monthly payment" value={money(monthlyPayment)} emphasis />
            <div className="mt-4">
              <ResultRow label={`Balloon balance due (yr ${termYears})`} value={money(balloonBalance)} />
              <ResultRow label="Total interest through term" value={money(totalInterestToTerm)} />
              <ResultRow label="Total paid through term" value={money(totalPaidToTerm)} />
            </div>
            <div className="mt-4 rounded-lg bg-white/60 p-3 text-sm text-muted">
              Payments amortize over {amortYears} years; the remaining balance is
              due as a balloon at the {termYears}-year term.
            </div>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
