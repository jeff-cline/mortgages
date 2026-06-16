import { z } from "zod";
import { buildOffers, type Offer } from "@/src/core/offers";
import { getDb } from "@/src/db/client";
import { leads, offers as offersTable } from "@/src/db/schema";

export const leadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  purpose: z.enum(["purchase", "refinance"]),
  propertyValue: z.coerce.number().positive(),
  downPayment: z.coerce.number().min(0),
  creditBand: z.enum(["excellent", "good", "fair", "poor"]),
  region: z.string().min(2), // US state code
  zip: z.string().min(3),
  years: z.coerce.number().positive().default(30),
  sourcePage: z.string().default("/quote"),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function validateLead(
  raw: unknown,
):
  | { ok: true; data: LeadInput }
  | { ok: false; error: string } {
  const parsed = leadSchema.safeParse(raw);
  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }
  const error = parsed.error.issues
    .map((issue) => {
      const path = issue.path.join(".");
      return path ? `${path}: ${issue.message}` : issue.message;
    })
    .join("; ");
  return { ok: false, error };
}

export function leadToOffers(d: LeadInput): Offer[] {
  const loanAmount = Math.max(0, d.propertyValue - d.downPayment);
  return buildOffers({
    loanAmount,
    years: d.years,
    creditBand: d.creditBand,
    region: d.region,
    purpose: d.purpose,
  });
}

export async function persistLead(
  d: LeadInput,
  offerList: Offer[],
): Promise<{ leadId: string; topOffer: Offer | null }> {
  const db = getDb();
  const loanAmount = Math.max(0, d.propertyValue - d.downPayment);
  const topOffer = offerList[0] ?? null;

  const [leadRow] = await db
    .insert(leads)
    .values({
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
      phone: d.phone,
      purpose: d.purpose,
      propertyValue: String(d.propertyValue),
      downPayment: String(d.downPayment),
      loanAmount: String(loanAmount),
      creditBand: d.creditBand,
      region: d.region,
      zip: d.zip,
      sourcePage: d.sourcePage,
      chosenOfferId: topOffer?.affiliateId ?? null,
      chosenAffiliate: topOffer?.name ?? null,
      status: "new",
      rawJson: d,
    })
    .returning({ id: leads.id });

  const leadId = leadRow.id;

  if (offerList.length > 0) {
    await db.insert(offersTable).values(
      offerList.map((o) => ({
        leadId,
        affiliateId: o.affiliateId,
        name: o.name,
        rate: String(o.rate),
        apr: String(o.apr),
        monthlyPayment: String(o.monthlyPayment),
        fees: String(o.fees),
        points: String(o.points),
      })),
    );
  }

  return { leadId, topOffer };
}
