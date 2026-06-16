import type { MetadataRoute } from "next";
import { CALCULATOR_SLUGS } from "./(marketing)/calculators/registry";
import { PHASE_SLUGS } from "@/src/content/phases";

const BASE = "https://mortgages.plus";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["/", "/quote", "/calculators", "/phases"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const calculatorRoutes = CALCULATOR_SLUGS.map((slug) => ({
    url: `${BASE}/calculators/${slug}`,
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
