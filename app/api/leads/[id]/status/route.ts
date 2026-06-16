import { eq } from "drizzle-orm";
import { getDb } from "@/src/db/client";
import { leads } from "@/src/db/schema";
import { getSessionUser } from "@/src/auth/session";
import { isLeadStatus } from "@/app/admin/leadFilters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = (await req.json().catch(() => null)) as { status?: unknown } | null;

  if (!isLeadStatus(body?.status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  await getDb().update(leads).set({ status: body.status }).where(eq(leads.id, id));

  return Response.json({ ok: true });
}
