import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import CalcArt from "@/components/calculators/CalcArt";
import { PHASES } from "@/src/content/phases";
import {
  CALCULATORS,
  CALCULATOR_CATEGORIES,
  type CalculatorEntry,
} from "./mortgage-calculators/registry";

export function generateMetadata(): Metadata {
  return {
    title: "Compare mortgage offers & run the numbers in minutes",
    description:
      "Mortgages+ helps you compare real, personalized mortgage offers from multiple lenders and run the numbers with free calculators — from pre-qualification to closing. No SSN required, no impact to your credit score.",
    alternates: { canonical: "/" },
  };
}

const STATS: { value: string; label: string; accent: string }[] = [
  { value: "16", label: "Free calculators", accent: "text-gold" },
  { value: "Multiple", label: "Lender offers compared", accent: "text-accent" },
  { value: "8", label: "Phases, fully covered", accent: "text-gold" },
  { value: "$0", label: "Cost · no SSN required", accent: "text-accent" },
];

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "1",
    title: "Tell us about your goal",
    body: "Answer a few quick questions about the home you want and your finances. No SSN, no hard credit pull — just a clear picture of where you stand.",
  },
  {
    n: "2",
    title: "Compare personalized offers",
    body: "See side-by-side offers from multiple lending partners, with rates, payments, and fees laid out so you can compare true total cost at a glance.",
  },
  {
    n: "3",
    title: "Protect your investment & close",
    body: "Move toward closing with confidence, with phase-by-phase guidance and optional protection so your investment stays safe long after the keys are yours.",
  },
];

const VALUE_PROPS: {
  title: string;
  body: string;
  icon: React.ReactNode;
  chip: string;
}[] = [
  {
    title: "Multiple lender offers",
    body: "Stop calling lenders one by one. Compare personalized offers from several partners in one place and let them compete for your business.",
    chip: "bg-accent/10 text-accent",
    icon: (
      <path d="M3 7h18M3 12h18M3 17h12" strokeWidth="2" strokeLinecap="round" stroke="currentColor" fill="none" />
    ),
  },
  {
    title: "Real, free calculators",
    body: "Sixteen battle-tested calculators cover every decision — payment, affordability, refinance, amortization, DTI and more — with live results and no sign-up.",
    chip: "bg-gold/15 text-[#a37f00]",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" strokeWidth="2" stroke="currentColor" fill="none" />
        <path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2" strokeWidth="2" strokeLinecap="round" stroke="currentColor" fill="none" />
      </>
    ),
  },
  {
    title: "Portable protection",
    body: "Explore optional mortgage protection that helps keep your payments current through life's surprises — coverage that travels with you, not your lender.",
    chip: "bg-brand/10 text-brand",
    icon: (
      <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z" strokeWidth="2" strokeLinejoin="round" stroke="currentColor" fill="none" />
    ),
  },
  {
    title: "Lead-to-close guidance",
    body: "Our phase-by-phase journey guide walks you from your first estimate all the way through closing and servicing, so you always know the next step.",
    chip: "bg-accent/10 text-accent",
    icon: (
      <path d="M5 12l4 4L19 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" fill="none" />
    ),
  },
];

const TESTIMONIALS: { name: string; city: string; quote: string; ring: string }[] = [
  {
    name: "Marcus & Dana R.",
    city: "Austin, TX",
    ring: "bg-accent",
    quote:
      "We compared four offers in one afternoon and saved nearly half a point on our rate. The payment calculator showed us exactly what we'd owe each month — no surprises.",
  },
  {
    name: "Priya N.",
    city: "Columbus, OH",
    ring: "bg-brand",
    quote:
      "As a first-time buyer I was overwhelmed until I found the phase guide. The checklists kept me on track from pre-approval all the way to the closing table.",
  },
  {
    name: "Tom W.",
    city: "Sacramento, CA",
    ring: "bg-gold",
    quote:
      "The refinance calculator made the break-even math obvious. I refinanced, dropped my PMI, and the whole thing took less time than I expected.",
  },
];

const CATEGORY_ACCENTS: Record<string, string> = {
  "Payments & Costs": "from-accent/15 to-accent/0 text-accent",
  "Payoff & Amortization": "from-gold/20 to-gold/0 text-[#a37f00]",
  "Affordability & Rates": "from-brand/10 to-brand/0 text-brand",
  "Specialty Loans": "from-accent/12 to-gold/10 text-accent",
};

function initials(name: string) {
  return name
    .replace(/&.*/, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function HomePage() {
  const byCategory = CALCULATOR_CATEGORIES.map((cat) => ({
    category: cat,
    items: CALCULATORS.filter((c) => c.category === cat),
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-700 to-brand text-white">
        {/* decorative color shapes */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
        <div className="container-page relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Mortgages, simplified
              </p>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Compare real mortgage offers and run the numbers{" "}
                <span className="bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
                  in minutes.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                Free calculators for every phase of your home loan, plus side-by-side
                personalized offers from multiple lending partners. Make the smartest decision
                with confidence.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href="/quote" variant="accent" size="lg">
                  Get my quote
                </ButtonLink>
                <ButtonLink
                  href="/mortgage-calculators"
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Explore calculators
                </ButtonLink>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/70">
                {["No SSN required", "Free", "No impact to your credit score"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.1-.3Z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15">
                <Image
                  src="/images/hero-home.jpg"
                  alt="A bright, modern family home with a welcoming front porch"
                  width={1600}
                  height={1067}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/70 via-brand/10 to-transparent" aria-hidden="true" />
              </div>
              {/* floating accent card */}
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-white p-4 shadow-xl sm:flex sm:items-center sm:gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 17l6-6 4 4 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 8h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-bold text-brand">Lower your rate</p>
                  <p className="text-xs text-muted">Compare offers side by side</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / TRUST BAND */}
      <section className="border-b border-line bg-gradient-to-r from-accent to-accent-600">
        <div className="container-page py-8">
          <dl className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-white">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-white/85">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CALCULATORS SHOWCASE */}
      <section className="bg-surface">
        <div className="container-page py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">Free tools</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                Mortgage calculators for every decision
              </h2>
              <p className="mt-4 text-lg text-muted">
                Sixteen live, no-sign-up calculators that turn big questions into clear answers —
                organized by where you are in the journey.
              </p>
            </div>
            <ButtonLink href="/mortgage-calculators" variant="accent" size="md">
              See all mortgage calculators →
            </ButtonLink>
          </div>

          <div className="mt-12 space-y-12">
            {byCategory.map(({ category, items }) => (
              <div key={category}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand">
                    {category}
                  </h3>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((c: CalculatorEntry) => (
                    <Link
                      key={c.slug}
                      href={`/mortgage-calculators/${c.slug}`}
                      className="group block"
                    >
                      <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-accent group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.10),0_16px_40px_rgba(15,23,42,0.10)]">
                        <CardBody className="flex h-full items-start gap-3 p-4">
                          <CalcArt art={c.art} className="h-12 w-12 shrink-0 rounded-xl" />
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold leading-snug text-brand group-hover:text-brand-700">
                              {c.keyword}
                            </h4>
                            <span
                              className={`mt-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r px-2 py-0.5 text-[11px] font-semibold ${CATEGORY_ACCENTS[category]}`}
                            >
                              {c.shortLabel}
                            </span>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <ButtonLink href="/mortgage-calculators" variant="outline" size="lg">
              Browse all 16 calculators
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white">
        <div className="container-page py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-last lg:order-first">
              <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-line">
                <Image
                  src="/images/keys.jpg"
                  alt="Hand holding a set of house keys in front of a new home"
                  width={1200}
                  height={901}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-gold px-5 py-4 text-brand shadow-lg sm:block">
                <p className="text-2xl font-extrabold leading-none">3</p>
                <p className="text-xs font-semibold">simple steps</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">How it works</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                From first question to keys in hand
              </h2>
              <ol className="mt-8 space-y-6">
                {STEPS.map((s, i) => (
                  <li key={s.n} className="flex gap-4">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-bold text-white shadow-sm ${
                        i === 0 ? "bg-accent" : i === 1 ? "bg-brand" : "bg-gold"
                      }`}
                    >
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-brand">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-9">
                <ButtonLink href="/quote" variant="accent" size="lg">
                  Get my quote
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="bg-surface">
        <div className="container-page py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Why Mortgages+
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              Everything you need, nothing you don't
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {VALUE_PROPS.map((v) => (
              <Card key={v.title} className="h-full transition-shadow hover:shadow-[0_4px_12px_rgba(15,23,42,0.10),0_16px_40px_rgba(15,23,42,0.10)]">
                <CardBody className="flex gap-4">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${v.chip}`}>
                    <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                      {v.icon}
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-brand">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.body}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PHASES STRIP */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="container-page relative py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              The complete guide
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Every phase of your mortgage journey
            </h2>
            <p className="mt-4 text-lg text-white/75">
              From your first estimate to full ownership — guidance and checklists for all eight
              phases.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {PHASES.map((p) => (
              <Link key={p.slug} href={`/phases/${p.slug}`} className="group block">
                <div className="flex h-full flex-col rounded-xl border border-white/15 bg-white/5 p-4 transition-colors group-hover:border-gold group-hover:bg-white/10">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent to-gold text-xs font-bold text-brand">
                    {p.order}
                  </span>
                  <span className="mt-3 text-sm font-semibold leading-snug text-white group-hover:text-gold">
                    {p.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <ButtonLink
              href="/phases"
              variant="outline"
              size="md"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Explore the full journey →
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white">
        <div className="container-page py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              From the community
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              Buyers who ran the numbers first
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="h-full transition-shadow hover:shadow-[0_4px_12px_rgba(15,23,42,0.10),0_16px_40px_rgba(15,23,42,0.10)]">
                <CardBody className="flex h-full flex-col">
                  <div className="flex gap-1 text-gold" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.74.99-5.79L1.58 7.62l5.82-.85L10 1.5z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${t.ring}`}>
                      {initials(t.name)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-brand">{t.name}</p>
                      <p className="text-xs text-muted">{t.city}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted">
            Testimonials are illustrative and provided for demonstration purposes.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/family-home.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/90 to-accent/85" aria-hidden="true" />
        <div className="container-page relative py-24 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to see your offers?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Get personalized mortgage offers in minutes. No SSN required, and it won't affect your
            credit score.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/quote" variant="accent" size="lg">
              Get my quote
            </ButtonLink>
            <ButtonLink
              href="/mortgage-calculators"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Explore calculators
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
