import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PHASES } from "@/src/content/phases";

export function generateMetadata(): Metadata {
  return {
    title: "Compare mortgage offers & run the numbers in minutes",
    description:
      "Mortgages+ helps you compare real, personalized mortgage offers from multiple lenders and run the numbers with free calculators — from pre-qualification to closing. No SSN required, no impact to your credit score.",
  };
}

const KEY_CALCULATORS: { slug: string; title: string; blurb: string }[] = [
  {
    slug: "payment",
    title: "Mortgage Payment",
    blurb: "See your full monthly PITI — principal, interest, taxes, insurance, PMI.",
  },
  {
    slug: "affordability",
    title: "Affordability",
    blurb: "Find the home price and payment that fit your income and debts.",
  },
  {
    slug: "refinance",
    title: "Refinance",
    blurb: "Compare your current loan and find your break-even point.",
  },
  {
    slug: "amortization",
    title: "Amortization",
    blurb: "Watch principal and interest split out over the life of your loan.",
  },
  {
    slug: "rent-vs-buy",
    title: "Rent vs. Buy",
    blurb: "Weigh renting against owning to see which builds more wealth.",
  },
  {
    slug: "dti",
    title: "Debt-to-Income",
    blurb: "Check the ratio lenders use to decide how much you qualify for.",
  },
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

const VALUE_PROPS: { title: string; body: string; icon: React.ReactNode }[] = [
  {
    title: "Multiple lender offers",
    body: "Stop calling lenders one by one. Compare personalized offers from several partners in one place and let them compete for your business.",
    icon: (
      <path d="M3 7h18M3 12h18M3 17h12" strokeWidth="2" strokeLinecap="round" stroke="currentColor" fill="none" />
    ),
  },
  {
    title: "Real, free calculators",
    body: "Eight battle-tested calculators cover every decision — payment, affordability, refinance, amortization, DTI and more — with live results and no sign-up.",
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
    icon: (
      <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z" strokeWidth="2" strokeLinejoin="round" stroke="currentColor" fill="none" />
    ),
  },
  {
    title: "Lead-to-close guidance",
    body: "Our phase-by-phase journey guide walks you from your first estimate all the way through closing and servicing, so you always know the next step.",
    icon: (
      <path d="M5 12l4 4L19 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" fill="none" />
    ),
  },
];

const TESTIMONIALS: { name: string; city: string; quote: string }[] = [
  {
    name: "Marcus & Dana R.",
    city: "Austin, TX",
    quote:
      "We compared four offers in one afternoon and saved nearly half a point on our rate. The payment calculator showed us exactly what we'd owe each month — no surprises.",
  },
  {
    name: "Priya N.",
    city: "Columbus, OH",
    quote:
      "As a first-time buyer I was overwhelmed until I found the phase guide. The checklists kept me on track from pre-approval all the way to the closing table.",
  },
  {
    name: "Tom W.",
    city: "Sacramento, CA",
    quote:
      "The refinance calculator made the break-even math obvious. I refinanced, dropped my PMI, and the whole thing took less time than I expected.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-surface to-white">
        <div className="container-page py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Mortgages, simplified
            </p>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight text-brand sm:text-5xl lg:text-6xl">
              Compare real mortgage offers and run the numbers — in minutes.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
              Free calculators for every phase of your home loan, plus side-by-side personalized
              offers from multiple lending partners. Make the smartest decision with confidence.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/quote" variant="accent" size="lg">
                Get my quote
              </ButtonLink>
              <ButtonLink href="/calculators" variant="outline" size="lg">
                Explore calculators
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-muted">
              No SSN required · Free · No impact to your credit score
            </p>
          </div>
        </div>
      </section>

      {/* TRUST / LOGO BAND */}
      <section className="border-b border-line bg-white">
        <div className="container-page py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted">
            As seen alongside leading lenders
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-bold tracking-tight text-muted/60">
            <span>NorthBridge</span>
            <span>Summit&nbsp;Lending</span>
            <span>BlueHarbor</span>
            <span>Cardinal&nbsp;Home</span>
            <span>Everline</span>
          </div>
        </div>
      </section>

      {/* CALCULATORS HIGHLIGHT */}
      <section className="bg-surface">
        <div className="container-page py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Free tools</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              Run the numbers on every decision
            </h2>
            <p className="mt-4 text-lg text-muted">
              Live, no-sign-up calculators that turn big questions into clear answers.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_CALCULATORS.map((c) => (
              <Link key={c.slug} href={`/calculators/${c.slug}`} className="group block">
                <Card className="h-full transition-shadow group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.10),0_16px_40px_rgba(15,23,42,0.10)]">
                  <CardBody className="flex h-full flex-col">
                    <h3 className="text-lg font-semibold text-brand group-hover:text-brand-700">
                      {c.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted">{c.blurb}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent">
                      Open calculator
                      <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <ButtonLink href="/calculators" variant="outline" size="md">
              See all calculators
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* PHASES OVERVIEW */}
      <section className="bg-white">
        <div className="container-page py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              The complete guide
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              Every phase of your mortgage journey
            </h2>
            <p className="mt-4 text-lg text-muted">
              From your first estimate to full ownership — guidance and checklists for all eight
              phases.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {PHASES.map((p) => (
              <Link key={p.slug} href={`/phases/${p.slug}`} className="group block">
                <div className="flex h-full flex-col rounded-xl border border-line bg-white p-4 transition-colors group-hover:border-accent">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-xs font-bold text-white">
                    {p.order}
                  </span>
                  <span className="mt-3 text-sm font-semibold leading-snug text-brand group-hover:text-brand-700">
                    {p.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <ButtonLink href="/phases" variant="ghost" size="md">
              Explore the full journey →
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface">
        <div className="container-page py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              Three simple steps
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-lg font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-brand">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="bg-white">
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
              <Card key={v.title} className="h-full">
                <CardBody className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/5 text-brand">
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

      {/* TESTIMONIALS */}
      <section className="bg-surface">
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
              <Card key={t.name} className="h-full">
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
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-brand">{t.name}</p>
                    <p className="text-xs text-muted">{t.city}</p>
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
      <section className="bg-brand">
        <div className="container-page py-20 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to see your offers?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Get personalized mortgage offers in minutes. No SSN required, and it won't affect your
            credit score.
          </p>
          <div className="mt-9">
            <ButtonLink href="/quote" variant="accent" size="lg">
              Get my quote
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
