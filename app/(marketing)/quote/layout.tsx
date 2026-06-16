import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote — Compare real mortgage offers",
  description:
    "Answer a few quick questions and compare real, personalized mortgage offers from multiple lenders — no SSN required and no impact to your credit score.",
  alternates: { canonical: "/quote" },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
