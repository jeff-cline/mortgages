"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/funnel/Stepper";
import {
  type LeadForm,
  type Offer,
  type Purpose,
  type CreditBand,
  US_STATES,
  usd,
} from "@/components/funnel/types";

const CREDIT_OPTIONS: { value: CreditBand; label: string; desc: string }[] = [
  { value: "excellent", label: "Excellent", desc: "760+ — top-tier rates" },
  { value: "good", label: "Good", desc: "700–759 — strong options" },
  { value: "fair", label: "Fair", desc: "640–699 — competitive offers" },
  { value: "poor", label: "Poor", desc: "Below 640 — we'll still help" },
];

type FormState = {
  purpose: Purpose | "";
  propertyValue: string;
  downPayment: string;
  creditBand: CreditBand | "";
  region: string;
  zip: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const EMPTY: FormState = {
  purpose: "",
  propertyValue: "",
  downPayment: "",
  creditBand: "",
  region: "",
  zip: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function num(s: string): number {
  const n = Number(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function QuoteWizard({
  onComplete,
}: {
  onComplete: (leadId: string, offers: Offer[], loanAmount: number) => void;
}) {
  const [step, setStep] = useState(1); // 1..4
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const propertyValue = num(form.propertyValue);
  const downPayment = num(form.downPayment);
  const loanAmount = Math.max(0, propertyValue - downPayment);
  const downPct = propertyValue > 0 ? (downPayment / propertyValue) * 100 : 0;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function validateStep(s: number): Record<string, string> {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!form.purpose) e.purpose = "Please choose a goal.";
    }
    if (s === 2) {
      if (propertyValue <= 0) e.propertyValue = "Enter a property value greater than 0.";
      if (downPayment <= 0) e.downPayment = "Enter a down payment greater than 0.";
      else if (downPayment >= propertyValue)
        e.downPayment = "Down payment must be less than the property value.";
    }
    if (s === 3) {
      if (!form.creditBand) e.creditBand = "Select your credit range.";
      if (!form.region) e.region = "Select your state.";
      if (!/^\d{5}$/.test(form.zip.trim())) e.zip = "Enter a valid 5-digit ZIP.";
    }
    if (s === 4) {
      if (!form.firstName.trim()) e.firstName = "Required.";
      if (!form.lastName.trim()) e.lastName = "Required.";
      if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email address.";
      if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid phone number.";
    }
    return e;
  }

  function next() {
    const e = validateStep(step);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  }

  function back() {
    setSubmitError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  async function submit() {
    const e = validateStep(4);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload: LeadForm & { years: number; sourcePage: string } = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        purpose: form.purpose as Purpose,
        propertyValue,
        downPayment,
        creditBand: form.creditBand as CreditBand,
        region: form.region,
        zip: form.zip.trim(),
        years: 30,
        sourcePage: "/quote",
      };
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.leadId) {
        setSubmitError(data?.error ?? "We couldn't process your request. Please try again.");
        return;
      }
      onComplete(data.leadId as string, (data.offers ?? []) as Offer[], loanAmount);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Stepper current={step} />
      <Card>
        <CardBody className="p-6 sm:p-8">
          {step === 1 && (
            <StepGoal
              value={form.purpose}
              error={errors.purpose}
              onChange={(v) => set("purpose", v)}
            />
          )}

          {step === 2 && (
            <StepProperty
              form={form}
              errors={errors}
              loanAmount={loanAmount}
              downPct={downPct}
              onChange={set}
            />
          )}

          {step === 3 && (
            <StepProfile form={form} errors={errors} onChange={set} />
          )}

          {step === 4 && (
            <StepContact form={form} errors={errors} onChange={set} />
          )}

          {submitError && (
            <p
              role="alert"
              className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
            >
              {submitError}
            </p>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button variant="outline" size="md" onClick={back} disabled={submitting}>
                Back
              </Button>
            ) : (
              <span />
            )}
            {step < 4 ? (
              <Button variant="primary" size="md" onClick={next}>
                Continue
              </Button>
            ) : (
              <Button variant="accent" size="md" onClick={submit} disabled={submitting}>
                {submitting ? "Finding your offers…" : "See my offers"}
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

/* ---------- Field primitives ---------- */

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-sm font-medium text-red-600">{msg}</p>;
}

function inputClass(hasError?: boolean) {
  return [
    "w-full rounded-lg border bg-white px-4 py-2.5 text-ink shadow-sm outline-none transition-colors",
    "placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20",
    hasError ? "border-red-400" : "border-line",
  ].join(" ");
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

/* ---------- Step 1: Goal ---------- */

function StepGoal({
  value,
  error,
  onChange,
}: {
  value: Purpose | "";
  error?: string;
  onChange: (v: Purpose) => void;
}) {
  const options: { value: Purpose; title: string; desc: string }[] = [
    { value: "purchase", title: "Buying a home", desc: "Find financing for a new purchase." },
    { value: "refinance", title: "Refinancing", desc: "Lower your rate or tap equity." },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold text-brand">What&apos;s your goal?</h2>
      <p className="mt-1 text-sm text-muted">We&apos;ll tailor your offers to it.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              aria-pressed={active}
              className={[
                "rounded-xl border p-5 text-left transition-all",
                active
                  ? "border-brand bg-brand/5 ring-2 ring-brand/30"
                  : "border-line bg-white hover:border-brand/40 hover:bg-surface",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  active ? "bg-brand text-white" : "bg-surface text-brand",
                ].join(" ")}
              >
                {o.value === "purchase" ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path d="M4 11l8-7 8 7M6 10v9h12v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path d="M4 8h13l-3-3M20 16H7l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <p className="mt-3 text-base font-semibold text-ink">{o.title}</p>
              <p className="mt-1 text-sm text-muted">{o.desc}</p>
            </button>
          );
        })}
      </div>
      <FieldError msg={error} />
    </div>
  );
}

/* ---------- Step 2: Property ---------- */

function StepProperty({
  form,
  errors,
  loanAmount,
  downPct,
  onChange,
}: {
  form: FormState;
  errors: Record<string, string>;
  loanAmount: number;
  downPct: number;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-brand">Property details</h2>
      <p className="mt-1 text-sm text-muted">Tell us the value and your down payment.</p>

      <div className="mt-6 space-y-5">
        <div>
          <Label htmlFor="propertyValue">Property value</Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
            <input
              id="propertyValue"
              inputMode="numeric"
              value={form.propertyValue}
              onChange={(e) => onChange("propertyValue", e.target.value)}
              placeholder="400,000"
              className={inputClass(!!errors.propertyValue) + " pl-8"}
            />
          </div>
          <FieldError msg={errors.propertyValue} />
        </div>

        <div>
          <Label htmlFor="downPayment">Down payment</Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
            <input
              id="downPayment"
              inputMode="numeric"
              value={form.downPayment}
              onChange={(e) => onChange("downPayment", e.target.value)}
              placeholder="80,000"
              className={inputClass(!!errors.downPayment) + " pl-8"}
            />
          </div>
          <FieldError msg={errors.downPayment} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-surface px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Loan amount</p>
          <p className="mt-1 text-xl font-bold text-brand">{usd.format(loanAmount)}</p>
        </div>
        <div className="rounded-lg bg-surface px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Down payment</p>
          <p className="mt-1 text-xl font-bold text-accent">{downPct.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 3: Profile ---------- */

function StepProfile({
  form,
  errors,
  onChange,
}: {
  form: FormState;
  errors: Record<string, string>;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-brand">Your profile</h2>
      <p className="mt-1 text-sm text-muted">This helps us match you to the right lenders.</p>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-medium text-ink">Credit range</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {CREDIT_OPTIONS.map((o) => {
            const active = form.creditBand === o.value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => onChange("creditBand", o.value)}
                aria-pressed={active}
                className={[
                  "rounded-xl border p-4 text-left transition-all",
                  active
                    ? "border-brand bg-brand/5 ring-2 ring-brand/30"
                    : "border-line bg-white hover:border-brand/40 hover:bg-surface",
                ].join(" ")}
              >
                <p className="text-sm font-semibold text-ink">{o.label}</p>
                <p className="mt-0.5 text-xs text-muted">{o.desc}</p>
              </button>
            );
          })}
        </div>
        <FieldError msg={errors.creditBand} />
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="region">State</Label>
          <select
            id="region"
            value={form.region}
            onChange={(e) => onChange("region", e.target.value)}
            className={inputClass(!!errors.region)}
          >
            <option value="">Select a state…</option>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
          <FieldError msg={errors.region} />
        </div>
        <div>
          <Label htmlFor="zip">ZIP code</Label>
          <input
            id="zip"
            inputMode="numeric"
            maxLength={5}
            value={form.zip}
            onChange={(e) => onChange("zip", e.target.value.replace(/\D/g, ""))}
            placeholder="90210"
            className={inputClass(!!errors.zip)}
          />
          <FieldError msg={errors.zip} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 4: Contact ---------- */

function StepContact({
  form,
  errors,
  onChange,
}: {
  form: FormState;
  errors: Record<string, string>;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-brand">Where should we send your offers?</h2>
      <p className="mt-1 text-sm text-muted">No spam — just your personalized matches.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <input
            id="firstName"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="Jane"
            className={inputClass(!!errors.firstName)}
          />
          <FieldError msg={errors.firstName} />
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <input
            id="lastName"
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Doe"
            className={inputClass(!!errors.lastName)}
          />
          <FieldError msg={errors.lastName} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="jane@example.com"
            className={inputClass(!!errors.email)}
          />
          <FieldError msg={errors.email} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="phone">Phone</Label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(555) 123-4567"
            className={inputClass(!!errors.phone)}
          />
          <FieldError msg={errors.phone} />
        </div>
      </div>
    </div>
  );
}
