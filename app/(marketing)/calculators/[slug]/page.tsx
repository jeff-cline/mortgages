import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { CALCULATORS, CALCULATOR_SLUGS } from "../registry";

export function generateStaticParams() {
  return CALCULATOR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = CALCULATORS[slug];
  if (!c) return { title: "Calculator not found" };
  return {
    title: c.title,
    description: c.description,
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CALCULATORS[slug];
  if (!c) notFound();

  const { Component } = c;
  const related = CALCULATOR_SLUGS.filter((s) => s !== slug).slice(0, 4);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: c.title,
    description: c.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <section className="container-page py-16">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={appJsonLd} />

      <nav className="mb-6 text-sm text-muted">
        <Link href="/calculators" className="hover:text-brand">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{c.title}</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-brand">{c.title}</h1>
        <p className="mt-4 text-lg text-muted">{c.description}</p>
      </div>

      <div className="mt-10">
        <Card>
          <CardBody className="p-6 sm:p-8">
            <Component />
          </CardBody>
        </Card>
      </div>

      <div className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-brand">
          About this calculator
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-ink/80">
          {c.longSeoIntro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-brand">
          Frequently asked questions
        </h2>
        <dl className="mt-6 space-y-4">
          {c.faq.map((f) => (
            <div key={f.q} className="rounded-xl border border-line bg-white p-5">
              <dt className="font-semibold text-ink">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-bold tracking-tight text-brand">
          Related calculators
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((s) => {
            const r = CALCULATORS[s];
            return (
              <Link key={s} href={`/calculators/${s}`} className="group block">
                <Card className="h-full transition-shadow group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.10)]">
                  <CardBody className="p-5">
                    <h3 className="text-sm font-semibold text-brand group-hover:text-brand-700">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted">{r.description}</p>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
