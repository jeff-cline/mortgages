import { eq } from "drizzle-orm";
import { getDb } from "@/src/db/client";
import { adminUsers } from "@/src/db/schema";
import { hashPassword } from "@/src/auth/password";
import { getSessionUser } from "@/src/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { newPassword?: unknown } | null;
  const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";

  if (newPassword.length < 8) {
    return Response.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  const passwordHash = await hashPassword(newPassword);

  await getDb()
    .update(adminUsers)
    .set({ passwordHash, mustChangePassword: false, updatedAt: new Date() })
    .where(eq(adminUsers.id, user.id));

  return Response.json({ ok: true });
}
