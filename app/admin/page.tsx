import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/src/auth/session";
import { getDb } from "@/src/db/client";
import { leads, type Lead } from "@/src/db/schema";
import {
  LEAD_STATUSES,
  leadOrder,
  leadWhere,
  parseLeadFilters,
  filtersToQuery,
  type LeadFilters,
} from "./leadFilters";

export const dynamic = "force-dynamic";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function fmtMoney(v: string | null) {
  if (v == null || v === "") return "—";
  const n = Number(v);
  return Number.isFinite(n) ? money.format(n) : "—";
}

function fmtDate(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function fullName(l: Lead) {
  const n = [l.firstName, l.lastName].filter(Boolean).join(" ");
  return n || "—";
}

const statusStyles: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  qualified: "bg-violet-50 text-violet-700 border-violet-200",
  closed: "bg-green-50 text-green-700 border-green-200",
  lost: "bg-gray-100 text-gray-600 border-gray-200",
};

function StatusBadge({ status }: { status: string | null }) {
  const s = status ?? "new";
  const cls = statusStyles[s] ?? "bg-gray-100 text-gray-600 border-gray-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${cls}`}
    >
      {s}
    </span>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-[var(--shadow-card)]">
      <div className="text-xs font-medium uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-ink">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </div>
  );
}

type SP = Promise<{ status?: string | string[]; insured?: string | string[] }>;

export default async function AdminDashboardPage({ searchParams }: { searchParams: SP }) {
  const user = await requireAdmin();
  if (user.mustChangePassword) redirect("/admin/change-password");

  const filters = parseLeadFilters(await searchParams);

  const db = getDb();

  // All leads (for stats) + filtered leads (for table).
  const allLeads = await db.select().from(leads).orderBy(leadOrder);

  const where = leadWhere(filters);
  const rows = where
    ? await db.select().from(leads).where(where).orderBy(leadOrder)
    : allLeads;

  // Stats computed over all leads.
  const total = allLeads.length;
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const last7 = allLeads.filter(
    (l) => l.createdAt && new Date(l.createdAt).getTime() >= sevenDaysAgo,
  ).length;
  const insured = allLeads.filter((l) => l.insuranceOptIn).length;
  const insuredRate = total > 0 ? Math.round((insured / total) * 100) : 0;

  const byStatus = LEAD_STATUSES.map((s) => ({
    status: s,
    count: allLeads.filter((l) => (l.status ?? "new") === s).length,
  }));

  const exportQuery = filtersToQuery(filters);
  const exportHref = exportQuery
    ? `/api/leads/export?${exportQuery}`
    : "/api/leads/export";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-ink">Leads dashboard</h1>
        <a
          href={exportHref}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-white px-3 text-sm font-medium text-brand hover:bg-surface"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export CSV
        </a>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total leads" value={String(total)} />
        <Stat label="New (7 days)" value={String(last7)} />
        <Stat
          label="Insurance opt-in"
          value={String(insured)}
          sub={`${insuredRate}% of leads`}
        />
        <div className="rounded-xl border border-line bg-white p-4 shadow-[var(--shadow-card)]">
          <div className="text-xs font-medium uppercase tracking-wide text-muted">By status</div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink">
            {byStatus.map((s) => (
              <span key={s.status} className="capitalize">
                <span className="font-semibold">{s.count}</span> {s.status}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted">Filter:</span>
        <FilterLink label="All" active={!filters.status && !filters.insured} filters={{}} />
        {LEAD_STATUSES.map((s) => (
          <FilterLink
            key={s}
            label={s}
            active={filters.status === s}
            filters={{ ...filters, status: filters.status === s ? undefined : s }}
          />
        ))}
        <FilterLink
          label="Insured"
          active={!!filters.insured}
          filters={{ ...filters, insured: filters.insured ? undefined : true }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-[var(--shadow-card)]">
        <table className="w-full min-w-[1100px] text-sm">
          <thead>
            <tr className="border-b border-line bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <Th>Created</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Purpose</Th>
              <Th>Loan amount</Th>
              <Th>Region</Th>
              <Th>Credit</Th>
              <Th>Top lender</Th>
              <Th>Insurance</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={11} className="px-3 py-10 text-center text-muted">
                  No leads match the current filters.
                </td>
              </tr>
            )}
            {rows.map((l) => (
              <tr
                key={l.id}
                className="border-b border-line last:border-0 hover:bg-surface/70 transition-colors"
              >
                <Td>
                  <Link href={`/admin/leads/${l.id}`} className="block text-ink hover:text-brand">
                    {fmtDate(l.createdAt)}
                  </Link>
                </Td>
                <Td>
                  <Link
                    href={`/admin/leads/${l.id}`}
                    className="font-medium text-brand hover:underline"
                  >
                    {fullName(l)}
                  </Link>
                </Td>
                <Td className="text-muted">{l.email || "—"}</Td>
                <Td className="text-muted">{l.phone || "—"}</Td>
                <Td className="capitalize">{l.purpose || "—"}</Td>
                <Td>{fmtMoney(l.loanAmount)}</Td>
                <Td>{l.region || "—"}</Td>
                <Td>{l.creditBand || "—"}</Td>
                <Td>{l.chosenAffiliate || "—"}</Td>
                <Td className="text-center">
                  {l.insuranceOptIn ? (
                    <span className="text-green-600" title="Opted in">
                      ✓
                    </span>
                  ) : (
                    <span className="text-muted">–</span>
                  )}
                </Td>
                <Td>
                  <StatusBadge status={l.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2.5 font-semibold whitespace-nowrap">{children}</th>;
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`px-3 py-2.5 whitespace-nowrap ${className ?? ""}`}>{children}</td>
  );
}

function FilterLink({
  label,
  active,
  filters,
}: {
  label: string;
  active: boolean;
  filters: LeadFilters;
}) {
  const q = filtersToQuery(filters);
  const href = q ? `/admin?${q}` : "/admin";
  return (
    <Link
      href={href}
      className={`inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium capitalize transition-colors ${
        active
          ? "border-brand bg-brand text-white"
          : "border-line bg-white text-ink hover:bg-surface"
      }`}
    >
      {label}
    </Link>
  );
}
