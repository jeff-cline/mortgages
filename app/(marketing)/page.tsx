import { ButtonLink } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <section className="container-page py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Mortgages, simplified</p>
      <h1 className="mx-auto mt-4 max-w-3xl text-balance text-5xl font-bold tracking-tight text-brand">
        Compare real mortgage offers and run the numbers — in minutes.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
        Free calculators for every phase of your home loan, plus side-by-side offers from multiple
        lending partners.
      </p>
      <div className="mt-10 flex items-center justify-center gap-4">
        <ButtonLink href="/quote" variant="accent" size="lg">Get my quote</ButtonLink>
        <ButtonLink href="/calculators" variant="outline" size="lg">Explore calculators</ButtonLink>
      </div>
    </section>
  );
}
