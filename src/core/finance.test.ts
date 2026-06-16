import { describe, it, expect } from "vitest";
import {
  monthlyPI,
  amortization,
  totalInterest,
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
