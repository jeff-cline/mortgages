import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { type Offer, usd, pct } from "@/components/funnel/types";

export function OfferCard({ offer, best }: { offer: Offer; best?: boolean }) {
  return (
    <Card
      className={[
        "relative overflow-hidden transition-shadow hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_40px_rgba(15,23,42,0.10)]",
        best ? "ring-2 ring-accent" : "",
      ].join(" ")}
    >
      {/* colored brand accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: offer.color }}
        aria-hidden="true"
      />
      {best && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-sm">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
          </svg>
          Best APR
        </span>
      )}
      <CardBody className="p-6 pt-7">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: offer.color }}
            aria-hidden="true"
          >
            {offer.brand.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-ink">{offer.name}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">{offer.brand}</p>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Rate</p>
            <p className="text-3xl font-bold leading-none text-brand">{pct(offer.rate, 3)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">APR</p>
            <p className="text-xl font-semibold leading-none text-ink">{pct(offer.apr, 3)}</p>
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-surface px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Est. monthly payment</p>
          <p className="text-2xl font-bold text-accent">
            {usd.format(offer.monthlyPayment)}
            <span className="text-base font-medium text-muted">/mo</span>
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-muted">Points</dt>
            <dd className="font-semibold text-ink">{offer.points.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="text-muted">Fees</dt>
            <dd className="font-semibold text-ink">{usd.format(offer.fees)}</dd>
          </div>
        </dl>

        <p className="mt-5 text-sm leading-relaxed text-muted">{offer.blurb}</p>

        <div className="mt-6">
          <ButtonLink
            href={offer.ctaUrl}
            variant={best ? "accent" : "primary"}
            size="md"
            className="w-full"
          >
            Apply with {offer.brand}
          </ButtonLink>
        </div>
      </CardBody>
    </Card>
  );
}
