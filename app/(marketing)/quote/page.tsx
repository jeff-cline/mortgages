"use client";

import { useState } from "react";
import { QuoteWizard } from "@/components/funnel/QuoteWizard";
import { OfferCard } from "@/components/OfferCard";
import { UpsellModal } from "@/components/UpsellModal";
import { Button } from "@/components/ui/Button";
import { type Offer } from "@/components/funnel/types";

type Results = {
  leadId: string;
  offers: Offer[];
  loanAmount: number;
};

export default function QuotePage() {
  const [results, setResults] = useState<Results | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);

  function handleComplete(leadId: string, offers: Offer[], loanAmount: number) {
    setResults({ leadId, offers, loanAmount });
    setShowUpsell(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="container-page py-14 sm:py-20">
      {!results ? (
        <>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Get your quote
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand">
              Compare real offers in a few quick steps
            </h1>
            <p className="mt-3 text-lg text-muted">
              Answer a few questions and we&apos;ll match you with lenders — no credit impact.
            </p>
          </div>
          <QuoteWizard onComplete={handleComplete} />
        </>
      ) : (
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {results.offers.length} matched {results.offers.length === 1 ? "offer" : "offers"}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand">
              Your personalized offers
            </h1>
            <p className="mt-3 text-lg text-muted">
              Sorted by APR — your best match is highlighted.
            </p>
          </div>

          {results.offers.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.offers.map((offer, i) => (
                <OfferCard key={offer.affiliateId} offer={offer} best={i === 0} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">
              No offers are available right now. We&apos;ll follow up by email.
            </p>
          )}

          {!showUpsell && (
            <div className="mt-12 flex justify-center">
              <Button variant="outline" size="md" onClick={() => setShowUpsell(true)}>
                View mortgage protection
              </Button>
            </div>
          )}
        </div>
      )}

      {results && showUpsell && (
        <UpsellModal
          leadId={results.leadId}
          loanAmount={results.loanAmount}
          onClose={() => setShowUpsell(false)}
        />
      )}
    </section>
  );
}
