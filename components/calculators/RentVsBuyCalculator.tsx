"use client";

import { useState } from "react";
import { rentVsBuy } from "@/src/core/finance";
import {
  NumberField,
  SegmentedField,
  ResultRow,
  ResultsPanel,
  QuoteCTA,
  CalcShell,
  money,
} from "./_shared";

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [ratePct, setRatePct] = useState(6.5);
  const [years, setYears] = useState<15 | 20 | 30>(30);
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [horizonYears, setHorizonYears] = useState(7);
  const [appreciationPct, setAppreciationPct] = useState(3);
  const [rentInflationPct, setRentInflationPct] = useState(3);

  const { buyCost, rentCost, advantage } = rentVsBuy({
    homePrice,
    downPayment,
    ratePct,
    years,
    monthlyRent,
    horizonYears,
    appreciationPct,
    rentInflationPct,
  });

  const buyingWins = advantage > 0;
  const verdict = buyingWins
    ? `Buying is cheaper by ${money(advantage)} over ${horizonYears} years`
    : `Renting is cheaper by ${money(-advantage)} over ${horizonYears} years`;

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
            <NumberField label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} min={500} max={15000} step={50} prefix="$" slider />
            <NumberField label="Time horizon" value={horizonYears} onChange={setHorizonYears} min={1} max={30} step={1} suffix="yr" slider />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <NumberField label="Home appreciation" value={appreciationPct} onChange={setAppreciationPct} min={0} max={10} step={0.25} suffix="%/yr" />
              <NumberField label="Rent inflation" value={rentInflationPct} onChange={setRentInflationPct} min={0} max={10} step={0.25} suffix="%/yr" />
            </div>
          </>
        }
        results={
          <ResultsPanel title={`Over ${horizonYears} years`}>
            <div
              className={[
                "rounded-lg p-4 text-center text-lg font-bold",
                buyingWins ? "bg-accent/10 text-accent" : "bg-brand/10 text-brand",
              ].join(" ")}
            >
              {verdict}
            </div>
            <div className="mt-4">
              <ResultRow label="Net cost of buying" value={money(buyCost)} />
              <ResultRow label="Net cost of renting" value={money(rentCost)} />
            </div>
            <p className="mt-4 text-xs text-muted">
              Buying cost nets out equity built and home appreciation against
              payments, taxes and insurance. Lower net cost wins.
            </p>
          </ResultsPanel>
        }
      />
      <QuoteCTA />
    </div>
  );
}
