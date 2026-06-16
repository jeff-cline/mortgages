import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq, gt } from "drizzle-orm";
import { getDb } from "@/src/db/client";
import { adminSessions, adminUsers, type AdminUser } from "@/src/db/schema";
import { mintToken } from "./password";

const COOKIE_NAME = "mp_admin";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/** Create a 30-day session for the user and set the httpOnly session cookie. */
export async function createSession(userId: string): Promise<void> {
  const token = mintToken();
  const expiresAt = new Date(Date.now() + THIRTY_DAYS_MS);

  await getDb().insert(adminSessions).values({ token, userId, expiresAt });

  const c = await cookies();
  c.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/** Resolve the current admin user from the session cookie, or null. */
export async function getSessionUser(): Promise<AdminUser | null> {
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const db = getDb();
  const [session] = await db
    .select()
    .from(adminSessions)
    .where(
      and(eq(adminSessions.token, token), gt(adminSessions.expiresAt, new Date())),
    )
    .limit(1);

  if (!session || !session.userId) return null;

  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, session.userId))
    .limit(1);

  return user ?? null;
}

/** Return the current admin user or redirect to the login page. */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** Delete the current session row and clear the cookie. */
export async function destroySession(): Promise<void> {
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value;
  if (token) {
    await getDb().delete(adminSessions).where(eq(adminSessions.token, token));
  }
  c.delete(COOKIE_NAME);
}
