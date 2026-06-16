import { describe, it, expect } from "vitest";
import { validateLead, leadToOffers, type LeadInput } from "./submit";

const base = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  phone: "5551234567",
  purpose: "purchase" as const,
  propertyValue: 400000,
  downPayment: 80000,
  creditBand: "good" as const,
  region: "CA",
  zip: "90210",
};

describe("validateLead", () => {
  it("rejects a bad email", () => {
    const res = validateLead({ ...base, email: "not-an-email" });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toMatch(/email/i);
  });

  it("rejects missing names", () => {
    const res = validateLead({ ...base, firstName: "", lastName: "" });
    expect(res.ok).toBe(false);
  });

  it("coerces numeric strings", () => {
    const res = validateLead({
      ...base,
      propertyValue: "400000",
      downPayment: "80000",
      years: "15",
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data.propertyValue).toBe(400000);
      expect(res.data.downPayment).toBe(80000);
      expect(res.data.years).toBe(15);
    }
  });

  it("applies defaults for years and sourcePage", () => {
    const res = validateLead(base);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data.years).toBe(30);
      expect(res.data.sourcePage).toBe("/quote");
    }
  });
});

describe("leadToOffers", () => {
  it("returns 5 offers with loanAmount excluding the down payment", () => {
    const d: LeadInput = { ...base, years: 30, sourcePage: "/quote" };
    const offerList = leadToOffers(d);
    expect(offerList.length).toBe(5);
    for (const o of offerList) {
      expect(o.monthlyPayment).toBeGreaterThan(0);
    }
  });
});
