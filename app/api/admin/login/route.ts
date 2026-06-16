import { eq } from "drizzle-orm";
import { getDb } from "@/src/db/client";
import { adminUsers } from "@/src/db/schema";
import { verifyPassword } from "@/src/auth/password";
import { createSession } from "@/src/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; password?: unknown }
    | null;

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const db = getDb();
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createSession(user.id);

  return Response.json({
    ok: true,
    redirect: user.mustChangePassword ? "/admin/change-password" : "/admin",
  });
}
