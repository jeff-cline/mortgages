import { describe, it, expect } from "vitest";
import { buildOffers, type OfferInput, type Offer } from "./offers";
import { AFFILIATES } from "./affiliates";

const baseInput: OfferInput = {
  loanAmount: 400000,
  years: 30,
  creditBand: "good",
  region: "TX",
  purpose: "purchase",
};

describe("buildOffers", () => {
  it("returns exactly 5 offers (one per affiliate)", () => {
    const offers = buildOffers(baseInput);
    expect(offers).toHaveLength(5);
  });

  it("offers are sorted by apr ascending", () => {
    const offers = buildOffers(baseInput);
    for (let i = 1; i < offers.length; i++) {
      expect(offers[i].apr).toBeGreaterThanOrEqual(offers[i - 1].apr);
    }
  });

  it("poor credit yields a higher first-offer rate than excellent credit", () => {
    const excellentOffers = buildOffers({ ...baseInput, creditBand: "excellent" });
    const poorOffers = buildOffers({ ...baseInput, creditBand: "poor" });
    // Compare the lowest-apr offer from each set
    expect(poorOffers[0].rate).toBeGreaterThan(excellentOffers[0].rate);
  });

  it("different region produces different rates (TX vs CA)", () => {
    const txOffers = buildOffers({ ...baseInput, region: "TX" });
    const caOffers = buildOffers({ ...baseInput, region: "CA" });
    // At least one affiliate should differ between regions
    const txRates = txOffers.map((o) => o.rate);
    const caRates = caOffers.map((o) => o.rate);
    expect(txRates).not.toEqual(caRates);
  });

  it("is deterministic — same input produces identical output", () => {
    const first = buildOffers(baseInput);
    const second = buildOffers(baseInput);
    expect(first).toEqual(second);
  });

  it("every offer has a positive monthlyPayment", () => {
    const offers = buildOffers(baseInput);
    for (const offer of offers) {
      expect(offer.monthlyPayment).toBeGreaterThan(0);
    }
  });

  it("every offer has fees >= 0", () => {
    const offers = buildOffers(baseInput);
    for (const offer of offers) {
      expect(offer.fees).toBeGreaterThanOrEqual(0);
    }
  });

  it("refinance adds 0.125 to rate versus purchase", () => {
    const purchaseOffers = buildOffers({ ...baseInput, purpose: "purchase" });
    const refiOffers = buildOffers({ ...baseInput, purpose: "refinance" });
    // Check for each affiliate by id
    for (const refiOffer of refiOffers) {
      const purchaseOffer = purchaseOffers.find(
        (o) => o.affiliateId === refiOffer.affiliateId
      );
      expect(purchaseOffer).toBeDefined();
      // rate difference should be 0.125 (within floating point tolerance)
      expect(refiOffer.rate - purchaseOffer!.rate).toBeCloseTo(0.125, 5);
    }
  });

  it("unknown region falls back to default (same as a non-existent state)", () => {
    const knownDefaultOffers = buildOffers({ ...baseInput, region: "ZZ" });
    // All affiliates have default: 0, so rates should match a state with 0 adj
    // We verify it runs without error and returns 5 offers
    expect(knownDefaultOffers).toHaveLength(5);
  });

  it("rate is clamped to [2, 12]", () => {
    const offers = buildOffers(baseInput);
    for (const offer of offers) {
      expect(offer.rate).toBeGreaterThanOrEqual(2);
      expect(offer.rate).toBeLessThanOrEqual(12);
    }
  });

  it("rate is rounded to 3 decimal places", () => {
    const offers = buildOffers(baseInput);
    for (const offer of offers) {
      const rounded = Math.round(offer.rate * 1000) / 1000;
      expect(offer.rate).toBe(rounded);
    }
  });

  it("apr is rounded to 3 decimal places", () => {
    const offers = buildOffers(baseInput);
    for (const offer of offers) {
      const rounded = Math.round(offer.apr * 1000) / 1000;
      expect(offer.apr).toBe(rounded);
    }
  });

  it("points is non-negative and matches affiliate pointsBias rounded to 2 decimals", () => {
    const offers = buildOffers(baseInput);
    for (const offer of offers) {
      expect(offer.points).toBeGreaterThanOrEqual(0);
      const affiliate = AFFILIATES.find((a) => a.id === offer.affiliateId);
      expect(affiliate).toBeDefined();
      const expectedPoints = Math.round(affiliate!.pointsBias * 100) / 100;
      expect(offer.points).toBe(expectedPoints);
    }
  });

  it("offer includes brand, name, color, blurb, ctaUrl from affiliate", () => {
    const offers = buildOffers(baseInput);
    for (const offer of offers) {
      const affiliate = AFFILIATES.find((a) => a.id === offer.affiliateId);
      expect(affiliate).toBeDefined();
      expect(offer.name).toBe(affiliate!.name);
      expect(offer.brand).toBe(affiliate!.brand);
      expect(offer.color).toBe(affiliate!.color);
      expect(offer.blurb).toBe(affiliate!.blurb);
      expect(offer.ctaUrl).toBe(affiliate!.ctaUrl);
    }
  });

  it("apr equals rate + aprSpread + points * 0.04, rounded to 3 decimals", () => {
    const offers = buildOffers(baseInput);
    for (const offer of offers) {
      const affiliate = AFFILIATES.find((a) => a.id === offer.affiliateId);
      expect(affiliate).toBeDefined();
      const expectedApr =
        Math.round((offer.rate + affiliate!.aprSpread + offer.points * 0.04) * 1000) / 1000;
      expect(offer.apr).toBe(expectedApr);
    }
  });
});
