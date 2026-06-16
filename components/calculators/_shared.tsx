"use client";

import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";

export const fmtUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const fmtUSD2 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function money(n: number): string {
  if (!isFinite(n)) return "—";
  return fmtUSD.format(Math.round(n));
}

export function money2(n: number): string {
  if (!isFinite(n)) return "—";
  return fmtUSD2.format(n);
}

export function pct(n: number): string {
  if (!isFinite(n)) return "—";
  return `${n.toFixed(1)}%`;
}

/** A labeled numeric field optionally paired with a range slider. */
export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  slider = false,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  slider?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-ink">{label}</label>
      <div className="flex items-center rounded-lg border border-line bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
        {prefix && <span className="pl-3 text-sm text-muted">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = e.target.value === "" ? 0 : Number(e.target.value);
            onChange(Number.isNaN(v) ? 0 : v);
          }}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-ink outline-none"
        />
        {suffix && <span className="pr-3 text-sm text-muted">{suffix}</span>}
      </div>
      {slider && min !== undefined && max !== undefined && (
        <input
          type="range"
          value={Number.isFinite(value) ? value : min}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand"
        />
      )}
    </div>
  );
}

/** A segmented control for choosing one of a fixed set of values. */
export function SegmentedField<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-ink">{label}</label>
      <div className="flex gap-1 rounded-lg border border-line bg-surface p-1">
        {options.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onChange(o.value)}
            className={[
              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              o.value === value
                ? "bg-brand text-white shadow-sm"
                : "text-muted hover:text-ink",
            ].join(" ")}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** A single line item in a results breakdown. */
export function ResultRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-baseline justify-between py-2",
        emphasis ? "" : "border-b border-line/70 last:border-0",
      ].join(" ")}
    >
      <span className={emphasis ? "text-sm font-semibold text-ink" : "text-sm text-muted"}>
        {label}
      </span>
      <span
        className={
          emphasis
            ? "text-2xl font-bold tracking-tight text-brand"
            : "text-sm font-semibold text-ink tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}

/** Highlighted results panel. */
export function ResultsPanel({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-brand/15 bg-gradient-to-br from-surface to-white p-6 shadow-[var(--shadow-card)]">
      {title && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

/** Standard footer CTA shared by all calculators. */
export function QuoteCTA() {
  return (
    <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">
        Ready to turn these numbers into a real loan?
      </p>
      <ButtonLink href="/quote" variant="accent" size="md">
        Get my personalized quote
      </ButtonLink>
    </div>
  );
}

/** Two-column responsive shell: inputs left, results right (stacks on mobile). */
export function CalcShell({
  inputs,
  results,
}: {
  inputs: ReactNode;
  results: ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5">{inputs}</div>
      <div className="space-y-5">{results}</div>
    </div>
  );
}
