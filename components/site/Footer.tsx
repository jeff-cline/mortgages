import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-brand text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">M</span>
            Mortgages<span className="text-accent">+</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/60">
            Smarter mortgage decisions from pre-qualification to closing. Compare offers, run the
            numbers, and protect your investment.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Calculators</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/calculators/payment" className="hover:text-white">Mortgage payment</Link></li>
            <li><Link href="/calculators/affordability" className="hover:text-white">Affordability</Link></li>
            <li><Link href="/calculators/refinance" className="hover:text-white">Refinance</Link></li>
            <li><Link href="/calculators" className="hover:text-white">All calculators</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/quote" className="hover:text-white">Get a quote</Link></li>
            <li><Link href="/admin/login" className="hover:text-white">Partner login</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-6 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} Mortgages+. For informational purposes only. Not a
            commitment to lend. Rates and offers shown are illustrative. Mortgages+ is a marketing
            platform and may receive compensation from partners.
          </p>
        </div>
      </div>
    </footer>
  );
}
