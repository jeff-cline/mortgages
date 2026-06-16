import {
  validateLead,
  leadToOffers,
  persistLead,
} from "@/src/lead/submit";
import { sendLeadNotification } from "@/src/email/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const v = validateLead(body);
  if (!v.ok) return Response.json({ error: v.error }, { status: 400 });

  const offerList = leadToOffers(v.data);
  const { leadId, topOffer } = await persistLead(v.data, offerList);

  // fire-and-forget notify, never block/fail the response on email
  try {
    await sendLeadNotification({ lead: v.data, leadId, topOffer });
  } catch {}

  return Response.json({ leadId, offers: offerList });
}
