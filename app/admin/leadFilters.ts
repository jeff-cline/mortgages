import { and, desc, eq, type SQL } from "drizzle-orm";
import { leads } from "@/src/db/schema";

export const LEAD_STATUSES = ["new", "contacted", "qualified", "closed", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export function isLeadStatus(v: unknown): v is LeadStatus {
  return typeof v === "string" && (LEAD_STATUSES as readonly string[]).includes(v);
}

export type LeadFilters = {
  status?: LeadStatus;
  insured?: boolean;
};

/** Parse raw query params (string | string[] | undefined) into normalized filters. */
export function parseLeadFilters(params: {
  status?: string | string[];
  insured?: string | string[];
}): LeadFilters {
  const statusRaw = Array.isArray(params.status) ? params.status[0] : params.status;
  const insuredRaw = Array.isArray(params.insured) ? params.insured[0] : params.insured;

  const filters: LeadFilters = {};
  if (isLeadStatus(statusRaw)) filters.status = statusRaw;
  if (insuredRaw === "1") filters.insured = true;
  return filters;
}

/** Build the drizzle WHERE clause for the given filters (or undefined for none). */
export function leadWhere(filters: LeadFilters): SQL | undefined {
  const clauses: SQL[] = [];
  if (filters.status) clauses.push(eq(leads.status, filters.status));
  if (filters.insured) clauses.push(eq(leads.insuranceOptIn, true));
  if (clauses.length === 0) return undefined;
  return and(...clauses);
}

/** Serialize filters back into a URLSearchParams query string (no leading ?). */
export function filtersToQuery(filters: LeadFilters): string {
  const sp = new URLSearchParams();
  if (filters.status) sp.set("status", filters.status);
  if (filters.insured) sp.set("insured", "1");
  return sp.toString();
}

export const leadOrder = desc(leads.createdAt);
