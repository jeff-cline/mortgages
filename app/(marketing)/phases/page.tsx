import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { PHASES } from "@/src/content/phases";

export function generateMetadata(): Metadata {
  return {
    title: "Your mortgage journey, phase by phase",
    description:
      "A clear, step-by-step guide to every phase of getting a mortgage — from pre-qualification and pre-approval through house hunting, underwriting, closing, servicing, and refinancing.",
  };
}

export default function PhasesIndexPage() {
  return (
    <section className="container-page py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          The complete guide
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand sm:text-5xl">
          Your mortgage journey, phase by phase
        </h1>
        <p className="mt-4 text-lg text-muted">
          Buying or refinancing a home is a sequence of well-defined steps. We've broken the entire
          process into eight clear phases, each with practical guidance, action checklists, and the
          right calculator to help you make confident decisions from your first estimate to the day
          you own your home outright.
        </p>
      </div>

      {/* Stepped vertical layout */}
      <ol className="mt-14 space-y-5">
        {PHASES.map((p, i) => {
          const isLast = i === PHASES.length - 1;
          return (
            <li key={p.slug} className="relative">
              {/* connector line */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-14 hidden h-[calc(100%+1.25rem)] w-px bg-line sm:block"
                />
              )}
              <Link href={`/phases/${p.slug}`} className="group block">
                <Card className="transition-shadow group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.10),0_16px_40px_rgba(15,23,42,0.10)]">
                  <CardBody className="flex items-start gap-5">
                    <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                      {p.order}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-brand group-hover:text-brand-700">
                        {p.title}
                      </h2>
                      <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                    </div>
                    <span className="mt-1 hidden shrink-0 items-center text-sm font-semibold text-accent sm:inline-flex">
                      Read guide
                      <svg
                        className="ml-1 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
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
            </li>
          );
        })}
      </ol>
    </section>
  );
}
