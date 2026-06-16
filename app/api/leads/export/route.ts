import { getDb } from "@/src/db/client";
import { leads, type Lead } from "@/src/db/schema";
import { getSessionUser } from "@/src/auth/session";
import { leadOrder, leadWhere, parseLeadFilters } from "@/app/admin/leadFilters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLUMNS: { header: string; get: (l: Lead) => unknown }[] = [
  { header: "createdAt", get: (l) => (l.createdAt ? new Date(l.createdAt).toISOString() : "") },
  { header: "firstName", get: (l) => l.firstName ?? "" },
  { header: "lastName", get: (l) => l.lastName ?? "" },
  { header: "email", get: (l) => l.email ?? "" },
  { header: "phone", get: (l) => l.phone ?? "" },
  { header: "purpose", get: (l) => l.purpose ?? "" },
  { header: "propertyValue", get: (l) => l.propertyValue ?? "" },
  { header: "downPayment", get: (l) => l.downPayment ?? "" },
  { header: "loanAmount", get: (l) => l.loanAmount ?? "" },
  { header: "creditBand", get: (l) => l.creditBand ?? "" },
  { header: "region", get: (l) => l.region ?? "" },
  { header: "zip", get: (l) => l.zip ?? "" },
  { header: "sourcePage", get: (l) => l.sourcePage ?? "" },
  { header: "chosenAffiliate", get: (l) => l.chosenAffiliate ?? "" },
  { header: "insuranceOptIn", get: (l) => (l.insuranceOptIn ? "true" : "false") },
  { header: "status", get: (l) => l.status ?? "" },
];

function csvCell(value: unknown): string {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const filters = parseLeadFilters({
    status: url.searchParams.get("status") ?? undefined,
    insured: url.searchParams.get("insured") ?? undefined,
  });

  const db = getDb();
  const where = leadWhere(filters);
  const rows = where
    ? await db.select().from(leads).where(where).orderBy(leadOrder)
    : await db.select().from(leads).orderBy(leadOrder);

  const lines: string[] = [];
  lines.push(COLUMNS.map((c) => csvCell(c.header)).join(","));
  for (const lead of rows) {
    lines.push(COLUMNS.map((c) => csvCell(c.get(lead))).join(","));
  }
  const csv = lines.join("\r\n") + "\r\n";

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="leads.csv"',
      "Cache-Control": "no-store",
    },
  });
}
