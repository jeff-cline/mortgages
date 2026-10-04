import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import CalcArt from "@/components/calculators/CalcArt";
import { CALCULATORS, getCalculator } from "../registry";

const BASE = "https://mortgages.plus";

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCalculator(slug);
  if (!c) return { title: "Calculator not found" };
  const url = `${BASE}/mortgage-calculators/${c.slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/mortgage-calculators/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      type: "website",
    },
  };
}

export default async function CalculatorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCalculator(slug);
  if (!c) notFound();

  const { Component } = c;
  const url = `${BASE}/mortgage-calculators/${c.slug}`;
  const related = c.related
    .map((s) => getCalculator(s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: c.keyword,
    description: c.metaDescription,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mortgage Calculators",
        item: `${BASE}/mortgage-calculators`,
      },
      { "@type": "ListItem", position: 3, name: c.keyword, item: url },
    ],
  };

  return (
    <article className="container-page py-12 sm:py-16">
      <JsonLd data={appJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumb} />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/mortgage-calculators" className="hover:text-brand">
          Mortgage Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{c.keyword}</span>
      </nav>

      {/* Header */}
      <header className="flex items-center gap-5">
        <CalcArt art={c.art} className="h-16 w-16 shrink-0" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {c.category}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
            {c.keyword}
          </h1>
        </div>
      </header>

      {/* Calculator */}
      <div className="mt-10">
        <Card>
          <CardBody className="p-6 sm:p-8">
            <Component />
          </CardBody>
        </Card>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_300px]">
        <div className="max-w-3xl">
          {/* Intro / SEO copy */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-brand">
              About the {c.keyword.toLowerCase()}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink/80">
              {c.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-brand">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-4">
              {c.faq.map((f) => (
                <div
                  key={f.q}
                  className="rounded-xl border border-line bg-white p-5 shadow-[var(--shadow-card)]"
                >
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
              <h3 className="text-lg font-bold text-brand">Ready for real numbers?</h3>
              <p className="mt-2 text-sm text-muted">
                Compare personalized offers from multiple lending partners.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <ButtonLink href="/quote" variant="accent" size="md">
                  Get my quote
                </ButtonLink>
                <ButtonLink href="/mortgage-calculators" variant="outline" size="md">
                  All calculators
                </ButtonLink>
              </div>
              <p className="mt-4 text-xs text-muted">
                No SSN required · Free · No impact to your credit score
              </p>
            </CardBody>
          </Card>
        </aside>
      </div>

      {/* Related calculators */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-line pt-12">
          <h2 className="text-xl font-bold tracking-tight text-brand">
            Related calculators
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/mortgage-calculators/${r.slug}`}
                className="group block"
              >
                <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.10),0_16px_40px_rgba(15,23,42,0.10)]">
                  <CardBody className="flex items-center gap-4">
                    <CalcArt art={r.art} className="h-12 w-12 shrink-0" />
                    <div>
                      <h3 className="text-sm font-semibold text-brand group-hover:text-brand-700">
                        {r.keyword}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {r.cardBlurb}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
