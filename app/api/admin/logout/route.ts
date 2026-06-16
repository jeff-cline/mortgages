import { destroySession } from "@/src/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  await destroySession();
  return Response.json({ ok: true });
}
