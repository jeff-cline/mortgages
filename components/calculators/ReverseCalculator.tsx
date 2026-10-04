"use client";

import { useState } from "react";
import { reverseMortgage } from "@/src/core/finance";
import {
  NumberField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
  pct,
} from "./_shared";

export default function ReverseCalculator() {
  const [age, setAge] = useState(70);
  const [homeValue, setHomeValue] = useState(500000);
  const [expectedRatePct, setExpectedRatePct] = useState(6);

  const safeAge = Math.max(62, age);
  const { principalLimitFactor, maxClaimAmount, availableProceeds } =
    reverseMortgage({
      age: safeAge,
      homeValue,
      expectedRatePct,
    });

  return (
    <div>
      <CalcShell
        inputs={
          <>
            <NumberField label="Youngest borrower age" value={age} onChange={setAge} min={62} max={99} step={1} slider />
            <NumberField label="Home value" value={homeValue} onChange={setHomeValue} min={100000} max={2000000} step={10000} prefix="$" slider />
            <NumberField label="Expected interest rate" value={expectedRatePct} onChange={setExpectedRatePct} min={2} max={12} step={0.05} suffix="%" slider />
          </>
        }
        results={
          <ResultsPanel title="Estimated reverse mortgage proceeds">
            <ResultRow label="Available proceeds" value={money(availableProceeds)} emphasis />
            <div className="mt-4">
              <ResultRow label="Principal limit factor" value={pct(principalLimitFactor * 100)} />
              <ResultRow label="Maximum claim amount" value={money(maxClaimAmount)} />
            </div>
            <p className="mt-4 rounded-lg bg-white/60 p-3 text-xs text-muted">
              Estimate only — actual HECM proceeds depend on current rates, fees,
              and FHA limits.
            </p>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
