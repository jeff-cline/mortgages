import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

const nav = [
  { href: "/calculators", label: "Calculators" },
  { href: "/phases/pre-approval", label: "How it works" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-brand text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">M</span>
          Mortgages<span className="text-accent">+</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-muted hover:text-brand">
              {n.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/quote" variant="accent" size="sm">
          Get my quote
        </ButtonLink>
      </div>
    </header>
  );
}
