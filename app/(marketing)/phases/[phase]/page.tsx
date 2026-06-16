import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { PHASES, getPhase } from "@/src/content/phases";

export function generateStaticParams() {
  return PHASES.map((p) => ({ phase: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phase: string }>;
}): Promise<Metadata> {
  const { phase } = await params;
  const p = getPhase(phase);
  if (!p) return { title: "Phase not found" };
  return {
    title: `${p.title} — Mortgage Journey Guide`,
    description: `${p.tagline} ${p.intro.split("\n\n")[0]}`.slice(0, 155),
  };
}

export default async function PhasePage({
  params,
}: {
  params: Promise<{ phase: string }>;
}) {
  const { phase } = await params;
  const p = getPhase(phase);
  if (!p) notFound();

  const prev = PHASES.find((x) => x.order === p.order - 1);
  const next = PHASES.find((x) => x.order === p.order + 1);
  const intall = PHASES.length;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="container-page py-16">
      <JsonLd data={faqJsonLd} />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/phases" className="hover:text-brand">
          Mortgage journey
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{p.title}</span>
      </nav>

      {/* Header */}
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Phase {p.order} of {intall}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand sm:text-5xl">
          {p.title}
        </h1>
        <p className="mt-4 text-xl text-muted">{p.tagline}</p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="max-w-3xl">
          {/* Intro */}
          <div className="space-y-4 text-lg leading-relaxed text-ink/80">
            {p.intro.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Sections */}
          <div className="mt-12 space-y-10">
            {p.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl font-bold tracking-tight text-brand">{s.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink/80">{s.body}</p>
              </section>
            ))}
          </div>

          {/* Checklist */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-brand">
              Your {p.title.toLowerCase()} checklist
            </h2>
            <ul className="mt-6 space-y-3">
              {p.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.5 7.6a1 1 0 0 1-1.42.004l-3.5-3.52a1 1 0 1 1 1.42-1.41l2.79 2.806 6.79-6.882a1 1 0 0 1 1.414-.012Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-base leading-relaxed text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-brand">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-4">
              {p.faq.map((f) => (
                <div key={f.q} className="rounded-xl border border-line bg-white p-5">
                  <dt className="font-semibold text-ink">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Sidebar CTA */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="bg-surface">
            <CardBody>
              <h3 className="text-lg font-bold text-brand">Run the numbers</h3>
              <p className="mt-2 text-sm text-muted">
                Put this phase into practice with the calculator built for it.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <ButtonLink
                  href={`/mortgage-calculators/${p.recommendedCalculator}`}
                  variant="primary"
                  size="md"
                >
                  Open calculator
                </ButtonLink>
                <ButtonLink href="/quote" variant="accent" size="md">
                  Get my quote
                </ButtonLink>
              </div>
              <p className="mt-4 text-xs text-muted">
                No SSN required · Free · No impact to your credit score
              </p>
            </CardBody>
          </Card>
        </aside>
      </div>

      {/* Prev / Next navigation */}
      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/phases/${prev.slug}`} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.10)]">
              <CardBody>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  ← Previous phase
                </span>
                <p className="mt-1 text-base font-semibold text-brand group-hover:text-brand-700">
                  {prev.title}
                </p>
              </CardBody>
            </Card>
          </Link>
        ) : (
          <Link href="/phases" className="group">
            <Card className="h-full transition-shadow group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.10)]">
              <CardBody>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  ← Overview
                </span>
                <p className="mt-1 text-base font-semibold text-brand group-hover:text-brand-700">
                  All phases
                </p>
              </CardBody>
            </Card>
          </Link>
        )}
        {next ? (
          <Link href={`/phases/${next.slug}`} className="group sm:text-right">
            <Card className="h-full transition-shadow group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.10)]">
              <CardBody>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Next phase →
                </span>
                <p className="mt-1 text-base font-semibold text-brand group-hover:text-brand-700">
                  {next.title}
                </p>
              </CardBody>
            </Card>
          </Link>
        ) : (
          <Link href="/quote" className="group sm:text-right">
            <Card className="h-full bg-brand text-white transition-shadow group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.20)]">
              <CardBody>
                <span className="text-xs font-semibold uppercase tracking-wide text-white/60">
                  You're ready →
                </span>
                <p className="mt-1 text-base font-semibold text-white">Get my quote</p>
              </CardBody>
            </Card>
          </Link>
        )}
      </nav>
    </article>
  );
}
