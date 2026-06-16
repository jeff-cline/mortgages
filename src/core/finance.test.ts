import { describe, it, expect } from "vitest";
import {
  monthlyPI,
  amortization,
  totalInterest,
  monthlyPITI,
  affordability,
  refiBreakevenMonths,
  dti,
} from "./finance";

// ─── TASK A: Monthly payment & amortization ───────────────────────────────────

describe("monthlyPI", () => {
  it("computes standard amortized payment: $300k @ 6.5% / 30yr ≈ $1896.20", () => {
    expect(monthlyPI(300000, 6.5, 30)).toBeCloseTo(1896.2, 1);
  });

  it("handles zero interest rate: returns principal / n", () => {
    expect(monthlyPI(120000, 0, 10)).toBe(1000);
  });

  it("returns a positive number for standard inputs", () => {
    expect(monthlyPI(200000, 5, 30)).toBeGreaterThan(0);
  });
});

describe("amortization", () => {
  it("produces 360 rows for a 30-year loan", () => {
    const rows = amortization(200000, 5, 30);
    expect(rows.length).toBe(360);
  });

  it("last row balance is approximately 0 (no rounding drift)", () => {
    const rows = amortization(200000, 5, 30);
    expect(rows[rows.length - 1].balance).toBeCloseTo(0, 2);
  });

  it("sum of principal repaid equals original principal", () => {
    const rows = amortization(200000, 5, 30);
    const sumPrincipal = rows.reduce((acc, r) => acc + r.principal, 0);
    expect(sumPrincipal).toBeCloseTo(200000, 0);
  });

  it("month numbers run from 1 to n*12", () => {
    const rows = amortization(200000, 5, 30);
    expect(rows[0].month).toBe(1);
    expect(rows[359].month).toBe(360);
  });

  it("each row: payment = principal + interest", () => {
    const rows = amortization(200000, 5, 30);
    rows.forEach((r) => {
      expect(r.payment).toBeCloseTo(r.principal + r.interest, 6);
    });
  });

  it("handles zero interest rate", () => {
    const rows = amortization(120000, 0, 10);
    expect(rows.length).toBe(120);
    expect(rows[rows.length - 1].balance).toBeCloseTo(0, 2);
  });
});

describe("totalInterest", () => {
  it("total interest on $200k @ 5% / 30yr is > $180k", () => {
    expect(totalInterest(200000, 5, 30)).toBeGreaterThan(180000);
  });

  it("zero interest rate means zero total interest", () => {
    expect(totalInterest(120000, 0, 10)).toBeCloseTo(0, 2);
  });
});

// ─── TASK B: PITI, affordability, refi, DTI ──────────────────────────────────

describe("monthlyPITI", () => {
  it("adds tax, insurance, HOA, and PMI on top of PI when LTV > 80%", () => {
    // principal=200000, homeValue=220000 → LTV ≈ 90.9% → PMI applies
    // monthlyPI(200000, 6, 30): r=0.005, n=360, 1.005^360≈6.022575
    // ≈ 200000 * 0.005 * 6.022575 / 5.022575 ≈ 1199.10
    // tax: 1.2/100 * 220000 / 12 = 220
    // insurance: 1200/12 = 100
    // HOA: 50
    // PMI: 0.5/100 * 220000 / 12 ≈ 91.67
    // Total ≈ 1660.77
    const result = monthlyPITI({
      principal: 200000,
      ratePct: 6,
      years: 30,
      annualTaxPct: 1.2,
      annualInsurance: 1200,
      monthlyHOA: 50,
      pmiAnnualPct: 0.5,
      homeValue: 220000,
    });
    expect(result).toBeCloseTo(1660.77, 0);
  });

  it("does NOT add PMI when LTV <= 80%", () => {
    // principal=160000, homeValue=220000 → LTV ≈ 72.7% → no PMI
    const withPMI = monthlyPITI({
      principal: 200000,
      ratePct: 6,
      years: 30,
      annualTaxPct: 1.2,
      annualInsurance: 1200,
      monthlyHOA: 50,
      pmiAnnualPct: 0.5,
      homeValue: 220000,
    });
    const noPMI = monthlyPITI({
      principal: 160000,
      ratePct: 6,
      years: 30,
      annualTaxPct: 1.2,
      annualInsurance: 1200,
      monthlyHOA: 50,
      pmiAnnualPct: 0.5,
      homeValue: 220000,
    });
    expect(noPMI).toBeLessThan(withPMI);
  });

  it("PMI absent when LTV exactly at 80% (boundary)", () => {
    // principal=176000, homeValue=220000 → LTV=80% → no PMI
    // monthlyPI(176000,6,30) ≈ 1055.21
    // tax=220, ins=100, hoa=50, pmi=0
    // total ≈ 1425.21
    const result = monthlyPITI({
      principal: 176000,
      ratePct: 6,
      years: 30,
      annualTaxPct: 1.2,
      annualInsurance: 1200,
      monthlyHOA: 50,
      pmiAnnualPct: 0.5,
      homeValue: 220000,
    });
    expect(result).toBeCloseTo(1425.21, 0);
  });
});

describe("affordability", () => {
  it("returns a positive home price for typical inputs", () => {
    const price = affordability({
      grossMonthlyIncome: 10000,
      monthlyDebts: 500,
      ratePct: 6.5,
      years: 30,
      downPayment: 50000,
    });
    expect(price).toBeGreaterThan(0);
  });

  it("monotonicity: higher income → equal or higher affordable price", () => {
    const low = affordability({
      grossMonthlyIncome: 8000,
      monthlyDebts: 400,
      ratePct: 6.5,
      years: 30,
      downPayment: 40000,
    });
    const high = affordability({
      grossMonthlyIncome: 12000,
      monthlyDebts: 400,
      ratePct: 6.5,
      years: 30,
      downPayment: 40000,
    });
    expect(high).toBeGreaterThanOrEqual(low);
  });

  it("lower DTI max → lower affordable price", () => {
    const conservative = affordability({
      grossMonthlyIncome: 10000,
      monthlyDebts: 500,
      ratePct: 6.5,
      years: 30,
      downPayment: 50000,
      dtiMax: 0.36,
    });
    const liberal = affordability({
      grossMonthlyIncome: 10000,
      monthlyDebts: 500,
      ratePct: 6.5,
      years: 30,
      downPayment: 50000,
      dtiMax: 0.50,
    });
    expect(conservative).toBeLessThan(liberal);
  });

  it("defaults to dtiMax=0.43 and taxInsRate=0.015", () => {
    const withDefaults = affordability({
      grossMonthlyIncome: 10000,
      monthlyDebts: 500,
      ratePct: 6.5,
      years: 30,
      downPayment: 50000,
    });
    const explicit = affordability({
      grossMonthlyIncome: 10000,
      monthlyDebts: 500,
      ratePct: 6.5,
      years: 30,
      downPayment: 50000,
      dtiMax: 0.43,
      taxInsRate: 0.015,
    });
    expect(withDefaults).toBeCloseTo(explicit, 0);
  });
});

describe("refiBreakevenMonths", () => {
  it("returns months to break even on closing costs", () => {
    // Save $100/month, $3000 closing costs → 30 months
    const result = refiBreakevenMonths({
      currentPayment: 1500,
      newPayment: 1400,
      closingCosts: 3000,
    });
    expect(result).toBeCloseTo(30, 1);
  });

  it("returns Infinity when new payment >= current payment", () => {
    const result = refiBreakevenMonths({
      currentPayment: 1400,
      newPayment: 1500,
      closingCosts: 3000,
    });
    expect(result).toBe(Infinity);
  });

  it("returns Infinity when payments are equal", () => {
    const result = refiBreakevenMonths({
      currentPayment: 1500,
      newPayment: 1500,
      closingCosts: 3000,
    });
    expect(result).toBe(Infinity);
  });
});

describe("dti", () => {
  it("returns ratio of monthly debt to gross income", () => {
    expect(dti(2000, 8000)).toBeCloseTo(0.25, 5);
  });

  it("returns Infinity when income is 0", () => {
    expect(dti(500, 0)).toBe(Infinity);
  });

  it("returns 0 when debt is 0", () => {
    expect(dti(0, 5000)).toBe(0);
  });
});
