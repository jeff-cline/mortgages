import type { MetadataRoute } from "next";
import { CALCULATORS } from "./(marketing)/mortgage-calculators/registry";
import { PHASE_SLUGS } from "@/src/content/phases";

const BASE = "https://mortgages.plus";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home = {
    url: `${BASE}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  };

  const masterCalculators = {
    url: `${BASE}/mortgage-calculators`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  };

  const calculatorRoutes = CALCULATORS.map((c) => ({
    url: `${BASE}/mortgage-calculators/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const quote = {
    url: `${BASE}/quote`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  };

  const phasesIndex = {
    url: `${BASE}/phases`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  };

  const phaseRoutes = PHASE_SLUGS.map((slug) => ({
    url: `${BASE}/phases/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    home,
    masterCalculators,
    ...calculatorRoutes,
    quote,
    phasesIndex,
    ...phaseRoutes,
  ];
}
