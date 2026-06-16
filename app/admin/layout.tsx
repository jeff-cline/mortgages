import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="bg-brand text-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-base font-semibold tracking-tight">
                Mortgages+ <span className="text-white/70">Admin</span>
              </Link>
              <nav className="hidden sm:flex items-center gap-1">
                <Link
                  href="/admin"
                  className="rounded-md px-3 py-1.5 text-sm text-white/85 hover:bg-white/10"
                >
                  Leads
                </Link>
              </nav>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6">{children}</main>
    </div>
  );
}
