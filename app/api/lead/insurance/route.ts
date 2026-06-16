import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/src/db/client";
import { leads } from "@/src/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const insuranceSchema = z.object({
  leadId: z.string().min(1),
  optIn: z.boolean(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = insuranceSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { leadId, optIn } = parsed.data;
  const db = getDb();
  await db
    .update(leads)
    .set({ insuranceOptIn: optIn })
    .where(eq(leads.id, leadId));

  return Response.json({ ok: true });
}
