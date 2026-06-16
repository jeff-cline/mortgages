import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/src/auth/session";
import { getDb } from "@/src/db/client";
import { leads, offers, type Lead, type Offer } from "@/src/db/schema";
import { LEAD_STATUSES, isLeadStatus } from "../../leadFilters";

export const dynamic = "force-dynamic";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const moneyCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function fmtMoney(v: string | null, cents = false) {
  if (v == null || v === "") return "—";
  const n = Number(v);
  if (!Number.isFinite(n)) return "—";
  return (cents ? moneyCents : money).format(n);
}

function fmtPct(v: string | null) {
  if (v == null || v === "") return "—";
  const n = Number(v);
  return Number.isFinite(n) ? `${n.toFixed(2)}%` : "—";
}

function fmtDateTime(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function fullName(l: Lead) {
  return [l.firstName, l.lastName].filter(Boolean).join(" ") || "—";
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const db = getDb();
  const [lead] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  if (!lead) notFound();

  const leadOffers = await db.select().from(offers).where(eq(offers.leadId, id));

  async function updateStatus(formData: FormData) {
    "use server";
    await requireAdmin();
    const status = formData.get("status");
    if (!isLeadStatus(status)) return;
    await getDb().update(leads).set({ status }).where(eq(leads.id, id));
    revalidatePath(`/admin/leads/${id}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin" className="text-sm text-muted hover:text-brand">
            ← Back to leads
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-ink">{fullName(lead)}</h1>
          <p className="text-sm text-muted">
            Submitted {fmtDateTime(lead.createdAt)} · ID {lead.id}
          </p>
        </div>

        {/* Status control */}
        <form action={updateStatus} className="flex items-end gap-2">
          <div>
            <label htmlFor="status" className="block text-xs font-medium text-muted mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={lead.status ?? "new"}
              className="h-9 rounded-md border border-line bg-white px-3 text-sm capitalize outline-none focus:border-brand-600"
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn h-9 bg-brand text-white hover:bg-brand-700 shadow-sm px-4 text-sm"
          >
            Update
          </button>
        </form>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Section title="Contact">
          <Field label="First name" value={lead.firstName} />
          <Field label="Last name" value={lead.lastName} />
          <Field label="Email" value={lead.email} />
          <Field label="Phone" value={lead.phone} />
          <Field
            label="Insurance opt-in"
            value={lead.insuranceOptIn ? "Yes" : "No"}
          />
        </Section>

        <Section title="Loan">
          <Field label="Purpose" value={lead.purpose} className="capitalize" />
          <Field label="Property value" value={fmtMoney(lead.propertyValue)} />
          <Field label="Down payment" value={fmtMoney(lead.downPayment)} />
          <Field label="Loan amount" value={fmtMoney(lead.loanAmount)} />
          <Field label="Credit band" value={lead.creditBand} />
        </Section>

        <Section title="Source">
          <Field label="Region" value={lead.region} />
          <Field label="ZIP" value={lead.zip} />
          <Field label="Source page" value={lead.sourcePage} />
          <Field label="Chosen affiliate" value={lead.chosenAffiliate} />
          <Field label="Status" value={lead.status} className="capitalize" />
        </Section>
      </div>

      {/* Offers */}
      <div className="rounded-xl border border-line bg-white shadow-[var(--shadow-card)]">
        <div className="border-b border-line px-4 py-3">
          <h2 className="text-sm font-semibold text-ink">
            Generated offers ({leadOffers.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-2.5 font-semibold">Lender</th>
                <th className="px-4 py-2.5 font-semibold">Rate</th>
                <th className="px-4 py-2.5 font-semibold">APR</th>
                <th className="px-4 py-2.5 font-semibold">Monthly</th>
                <th className="px-4 py-2.5 font-semibold">Fees</th>
                <th className="px-4 py-2.5 font-semibold">Points</th>
              </tr>
            </thead>
            <tbody>
              {leadOffers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    No offers generated for this lead.
                  </td>
                </tr>
              )}
              {leadOffers.map((o: Offer) => (
                <tr key={o.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-2.5 font-medium text-ink">{o.name || "—"}</td>
                  <td className="px-4 py-2.5">{fmtPct(o.rate)}</td>
                  <td className="px-4 py-2.5">{fmtPct(o.apr)}</td>
                  <td className="px-4 py-2.5">{fmtMoney(o.monthlyPayment, true)}</td>
                  <td className="px-4 py-2.5">{fmtMoney(o.fees)}</td>
                  <td className="px-4 py-2.5">
                    {o.points == null || o.points === "" ? "—" : Number(o.points).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-white shadow-[var(--shadow-card)]">
      <div className="border-b border-line px-4 py-3">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
      </div>
      <dl className="divide-y divide-line">{children}</dl>
    </div>
  );
}

function Field({
  label,
  value,
  className,
}: {
  label: string;
  value: string | null;
  className?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-2.5">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={`text-sm text-ink text-right ${className ?? ""}`}>
        {value == null || value === "" ? "—" : value}
      </dd>
    </div>
  );
}
