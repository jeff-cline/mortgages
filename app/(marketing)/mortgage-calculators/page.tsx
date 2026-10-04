import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import CalcArt from "@/components/calculators/CalcArt";
import { CALCULATORS, CALCULATOR_CATEGORIES } from "./registry";

const BASE = "https://mortgages.plus";

export function generateMetadata(): Metadata {
  const title = "Mortgage Calculators — Free Tools for Every Loan Decision";
  const description =
    "Free mortgage calculators for every loan decision: estimate monthly payments and PITI, gauge affordability and DTI, compare rates, plan payoff and amortization, weigh a refinance, and model FHA, reverse and commercial loans.";
  return {
    title,
    description,
    alternates: { canonical: "/mortgage-calculators" },
    openGraph: {
      title,
      description,
      url: `${BASE}/mortgage-calculators`,
      type: "website",
    },
  };
}

export default function MortgageCalculatorsPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mortgage Calculators",
    itemListElement: CALCULATORS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.keyword,
      url: `${BASE}/mortgage-calculators/${c.slug}`,
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
    ],
  };

  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd data={breadcrumb} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #1b9c85 0, transparent 45%), radial-gradient(circle at 85% 30%, #e6b800 0, transparent 40%)",
          }}
        />
        <div className="container-page relative py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              Free tools · No sign-up
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Mortgage Calculators
            </h1>
            <p className="mt-5 text-xl text-white/80">
              One hub for every number that matters — from your first affordability
              check to your final payoff payment.
            </p>
            <div className="mt-7 space-y-4 text-base leading-relaxed text-white/70">
              <p>
                Buying or refinancing a home is a sequence of decisions, and each one
                turns on a number. How much house can you afford? What will the full
                monthly payment really be once taxes, insurance and PMI are included?
                Is it worth paying points for a lower rate, or making extra payments to
                retire the loan early? Our free mortgage calculators answer each
                question with live results and no sign-up.
              </p>
              <p>
                We built a dedicated tool for every phase — affordability and
                debt-to-income before you shop, payment and closing-cost estimates while
                you compare homes, amortization and payoff planning once you own, and
                refinance, FHA, reverse and commercial calculators for specialized
                needs. Pick the calculator that matches your decision below, then request
                a personalized quote when you are ready to act.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/quote" variant="accent" size="lg">
                Get my quote
              </ButtonLink>
              <ButtonLink href="#calculators" variant="outline" size="lg" className="!border-white/40 !bg-white/10 !text-white hover:!bg-white/20">
                Jump to calculators
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      <div id="calculators" className="container-page py-16 sm:py-20">
        {CALCULATOR_CATEGORIES.map((category) => {
          const entries = CALCULATORS.filter((c) => c.category === category);
          if (entries.length === 0) return null;
          return (
            <section key={category} className="mb-16 last:mb-0 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
                {category}
              </h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/mortgage-calculators/${c.slug}`}
                    className="group block"
                  >
                    <Card className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.10),0_18px_44px_rgba(15,23,42,0.14)]">
                      <CardBody className="flex h-full flex-col">
                        <CalcArt art={c.art} className="h-14 w-14 shrink-0" />
                        <h3 className="mt-4 text-lg font-semibold text-brand group-hover:text-brand-700">
                          {c.keyword}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                          {c.cardBlurb}
                        </p>
                        <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent">
                          Open calculator
                          <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CLOSING CTA */}
      <section className="bg-surface">
        <div className="container-page py-16">
          <Card className="overflow-hidden bg-brand text-white">
            <CardBody className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Done running the numbers?
                </h2>
                <p className="mt-3 text-white/75">
                  Turn your estimates into real offers. Compare personalized rates from
                  multiple lending partners — free, with no impact to your credit score.
                </p>
              </div>
              <ButtonLink href="/quote" variant="accent" size="lg" className="shrink-0">
                Get my quote
              </ButtonLink>
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}
