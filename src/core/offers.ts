import { monthlyPI } from "./finance";
import { AFFILIATES, type CreditBand } from "./affiliates";

export type { CreditBand };

export interface OfferInput {
  loanAmount: number;
  years: number;
  creditBand: CreditBand;
  region: string;       // state code; unknown falls back to regionAdj.default
  purpose: "purchase" | "refinance";
}

export interface Offer {
  affiliateId: string;
  name: string;
  brand: string;
  color: string;
  blurb: string;
  ctaUrl: string;
  rate: number;          // final note rate %, clamped to [2,12], rounded to 3 decimals
  apr: number;           // rate + aprSpread + points effect, rounded to 3 decimals
  points: number;        // discount points, derived from pointsBias (>=0)
  fees: number;          // >= 0
  monthlyPayment: number; // monthlyPI(loanAmount, rate, years)
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

export function buildOffers(input: OfferInput): Offer[] {
  const purposeAdj = input.purpose === "refinance" ? 0.125 : 0;

  const offers: Offer[] = AFFILIATES.map((affiliate) => {
    const regionDelta =
      input.region in affiliate.regionAdj
        ? affiliate.regionAdj[input.region]
        : affiliate.regionAdj["default"];

    const creditDelta = affiliate.creditAdj[input.creditBand];

    const rawRate =
      affiliate.baseRate30 + creditDelta + regionDelta + purposeAdj;

    const rate = round3(clamp(rawRate, 2, 12));
    const points = Math.max(0, round2(affiliate.pointsBias));
    const apr = round3(rate + affiliate.aprSpread + points * 0.04);
    const fees = affiliate.feeFlat;
    const monthlyPayment = monthlyPI(input.loanAmount, rate, input.years);

    return {
      affiliateId: affiliate.id,
      name: affiliate.name,
      brand: affiliate.brand,
      color: affiliate.color,
      blurb: affiliate.blurb,
      ctaUrl: affiliate.ctaUrl,
      rate,
      apr,
      points,
      fees,
      monthlyPayment,
    };
  });

  // Sort ascending by apr
  offers.sort((a, b) => a.apr - b.apr);

  return offers;
}
