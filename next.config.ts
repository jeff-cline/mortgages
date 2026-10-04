import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/calculators", destination: "/mortgage-calculators", permanent: true },
      {
        source: "/calculators/payment",
        destination: "/mortgage-calculators/mortgage-payment-calculator",
        permanent: true,
      },
      {
        source: "/calculators/affordability",
        destination: "/mortgage-calculators/mortgage-affordability-calculator",
        permanent: true,
      },
      {
        source: "/calculators/refinance",
        destination: "/mortgage-calculators/mortgage-refinance-calculator",
        permanent: true,
      },
      {
        source: "/calculators/amortization",
        destination: "/mortgage-calculators/mortgage-amortization-calculator",
        permanent: true,
      },
      {
        source: "/calculators/rent-vs-buy",
        destination: "/mortgage-calculators/rent-vs-buy-calculator",
        permanent: true,
      },
      {
        source: "/calculators/extra-payment",
        destination: "/mortgage-calculators/early-mortgage-payoff-calculator",
        permanent: true,
      },
      {
        source: "/calculators/closing-costs",
        destination: "/mortgage-calculators/closing-cost-calculator",
        permanent: true,
      },
      {
        source: "/calculators/dti",
        destination: "/mortgage-calculators/debt-to-income-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
