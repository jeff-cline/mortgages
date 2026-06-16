import type { MetadataRoute } from "next";
import { CALCULATORS } from "./(marketing)/mortgage-calculators/registry";
import { PHASE_SLUGS } from "@/src/content/phases";

const BASE = "https://mortgages.plus";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["/", "/quote", "/mortgage-calculators", "/phases"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const calculatorRoutes = CALCULATORS.map((c) => ({
    url: `${BASE}/mortgage-calculators/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const phaseRoutes = PHASE_SLUGS.map((slug) => ({
    url: `${BASE}/phases/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...calculatorRoutes, ...phaseRoutes];
}
