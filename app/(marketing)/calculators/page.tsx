import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { CALCULATORS, CALCULATOR_SLUGS } from "./registry";

export function generateMetadata(): Metadata {
  return {
    title: "Mortgage Calculators",
    description:
      "Free mortgage calculators for every step of buying or refinancing a home — estimate monthly payments, affordability, refinance break-even, amortization, rent vs. buy, extra payments, closing costs and your debt-to-income ratio.",
  };
}

export default function CalculatorsHubPage() {
  return (
    <section className="container-page py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Free tools
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand">
          Mortgage Calculators
        </h1>
        <p className="mt-4 text-lg text-muted">
          Run the numbers on every part of your home loan. Estimate payments,
          figure out what you can afford, weigh a refinance, and plan your
          payoff — all with live results and no sign-up required.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CALCULATOR_SLUGS.map((slug) => {
          const c = CALCULATORS[slug];
          return (
            <Link key={slug} href={`/calculators/${slug}`} className="group block">
              <Card className="h-full transition-shadow group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.10),0_16px_40px_rgba(15,23,42,0.10)]">
                <CardBody className="flex h-full flex-col">
                  <h2 className="text-lg font-semibold text-brand group-hover:text-brand-700">
                    {c.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted">{c.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent">
                    Open calculator
                    <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
                    </svg>
                  </span>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
