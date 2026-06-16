export type CreditBand = "excellent" | "good" | "fair" | "poor";

export interface AffiliateProgram {
  id: string;
  name: string;
  brand: string;        // short brand label
  color: string;        // hex, for UI
  baseRate30: number;   // base 30yr rate %, e.g. 6.4
  pointsBias: number;   // tendency to charge points (0..1.5)
  feeFlat: number;      // flat lender fees in $
  regionAdj: Record<string, number>;   // state code -> rate delta; includes `default`
  creditAdj: Record<CreditBand, number>; // band -> rate delta
  aprSpread: number;    // added to rate to approximate APR
  blurb: string;        // one-line marketing line
  ctaUrl: string;       // "#apply"
}

export const AFFILIATES: AffiliateProgram[] = [
  {
    id: "summitpoint",
    name: "SummitPoint Lending",
    brand: "SummitPoint",
    color: "#1a6b3c",
    baseRate30: 6.25,
    pointsBias: 0.5,
    feeFlat: 995,
    regionAdj: {
      CA: 0.10,
      TX: -0.05,
      NY: 0.15,
      FL: 0.05,
      WA: 0.08,
      CO: -0.10,
      AZ: -0.05,
      GA: 0.03,
      default: 0,
    },
    creditAdj: {
      excellent: -0.30,
      good: 0,
      fair: 0.45,
      poor: 1.10,
    },
    aprSpread: 0.18,
    blurb: "Competitive rates backed by personalized mountain-state expertise.",
    ctaUrl: "#apply",
  },
  {
    id: "blueharbor",
    name: "BlueHarbor Home Loans",
    brand: "BlueHarbor",
    color: "#1e4fa3",
    baseRate30: 6.50,
    pointsBias: 0.0,
    feeFlat: 0,
    regionAdj: {
      CA: -0.10,
      TX: 0.05,
      NY: 0.05,
      FL: -0.05,
      WA: -0.15,
      CO: 0.05,
      AZ: 0.10,
      GA: 0.08,
      default: 0,
    },
    creditAdj: {
      excellent: -0.35,
      good: 0,
      fair: 0.50,
      poor: 1.20,
    },
    aprSpread: 0.12,
    blurb: "Zero lender fees — more of your money stays in your pocket.",
    ctaUrl: "#apply",
  },
  {
    id: "crestline",
    name: "Crestline Mortgage",
    brand: "Crestline",
    color: "#7b3fa0",
    baseRate30: 6.10,
    pointsBias: 1.25,
    feeFlat: 1500,
    regionAdj: {
      CA: 0.05,
      TX: 0.10,
      NY: 0.20,
      FL: 0.08,
      WA: 0.05,
      CO: -0.05,
      AZ: 0.00,
      GA: -0.05,
      default: 0,
    },
    creditAdj: {
      excellent: -0.40,
      good: 0,
      fair: 0.55,
      poor: 1.30,
    },
    aprSpread: 0.22,
    blurb: "Buy down your rate with flexible points — save thousands long-term.",
    ctaUrl: "#apply",
  },
  {
    id: "anchorratedirect",
    name: "Anchor Rate Direct",
    brand: "AnchorRate",
    color: "#c45c00",
    baseRate30: 6.75,
    pointsBias: 0.25,
    feeFlat: 500,
    regionAdj: {
      CA: -0.15,
      TX: -0.10,
      NY: 0.10,
      FL: -0.08,
      WA: -0.10,
      CO: 0.05,
      AZ: -0.05,
      GA: 0.05,
      default: 0,
    },
    creditAdj: {
      excellent: -0.25,
      good: 0,
      fair: 0.40,
      poor: 1.00,
    },
    aprSpread: 0.10,
    blurb: "Direct-to-consumer pricing with fast digital closings.",
    ctaUrl: "#apply",
  },
  {
    id: "northstar",
    name: "Northstar Funding",
    brand: "Northstar",
    color: "#2b7a8f",
    baseRate30: 6.40,
    pointsBias: 0.75,
    feeFlat: 750,
    regionAdj: {
      CA: 0.08,
      TX: 0.03,
      NY: 0.12,
      FL: 0.03,
      WA: -0.08,
      CO: -0.12,
      AZ: 0.05,
      GA: 0.00,
      default: 0,
    },
    creditAdj: {
      excellent: -0.35,
      good: 0,
      fair: 0.48,
      poor: 1.15,
    },
    aprSpread: 0.15,
    blurb: "Trusted by homeowners across the country for over two decades.",
    ctaUrl: "#apply",
  },
];
