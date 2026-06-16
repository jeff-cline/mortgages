# mortgages.plus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a best-in-class, SEO-first mortgage lead-aggregation site with deep calculators, a multi-affiliate offer engine, an insurance-upsell lead funnel, and a built-in CRM, deployed to mortgages.plus.

**Architecture:** A single self-contained Next.js (App Router) app. Pure TypeScript "core" modules (finance math, offer engine) are unit-tested and have zero framework/DB deps. A thin DB layer (Drizzle + Postgres) persists leads, offers, and admin auth. Server actions / route handlers wire the funnel and CRM. Deployed independently on the existing server (own dir, DB, pm2 process, port), with nginx re-pointed for mortgages.plus only.

**Tech Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Drizzle ORM · PostgreSQL · Vitest · nodemailer (Zapmail SMTP) · pm2 · nginx.

---

## File Structure

```
src/
  core/
    finance.ts          # pure mortgage math (payment, amortization, affordability, refi, DTI...)
    finance.test.ts
    offers.ts           # affiliate offer engine (rate models per affiliate/region/credit)
    offers.test.ts
    affiliates.ts       # seed data: 5 mock affiliate programs + rate model params
  db/
    schema.ts           # drizzle tables: leads, offers, admin_users, admin_sessions
    client.ts           # drizzle/pg pool
    migrate.ts          # run migrations
    seed.ts             # seed offers + admin user
  auth/
    password.ts         # hash/verify (argon2), session token mint/verify
    password.test.ts
    session.ts          # cookie-based session read/require helpers
  email/
    notify.ts           # sendLeadNotification() via Zapmail SMTP (nodemailer)
  lead/
    submit.ts           # server action: validate + persist lead, return offers
    submit.test.ts
app/
  layout.tsx, globals.css, page.tsx (home)
  (marketing)/phases/[phase]/page.tsx        # 8 phase landing pages (static params)
  calculators/page.tsx                        # hub
  calculators/[slug]/page.tsx                 # 8 calculator pages
  quote/page.tsx                              # multi-step lead funnel
  api/lead/route.ts                           # POST lead -> offers JSON
  api/leads/export/route.ts                   # admin CSV export
  admin/login/page.tsx
  admin/(dash)/page.tsx                       # leads table + stats
  admin/(dash)/leads/[id]/page.tsx            # lead detail
  admin/change-password/page.tsx              # forced first-login reset
  sitemap.ts, robots.ts
components/
  ui/* (Button, Card, Field, Stepper...), calculators/*, OfferCard.tsx, UpsellModal.tsx
deploy/
  ecosystem.config.cjs   # pm2 config
  nginx-mortgages.plus.conf  # reference server block
  deploy.sh              # build + ship + restart (run from local)
```

---

## Phase 0 — Scaffold & tooling

### Task 0.1: Initialize Next.js app

**Files:** Create `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `vitest.config.ts`.

- [ ] **Step 1:** Scaffold with the official template (run in repo root, which already has `.git` and `docs/`):
```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --no-turbopack --use-npm --yes
```
Expected: app files created, `npm install` completes. If it refuses on non-empty dir, scaffold in `/tmp/m` and copy files in (preserve `.git`, `docs/`).

- [ ] **Step 2:** Add Vitest:
```bash
npm i -D vitest @vitest/coverage-v8
npm i drizzle-orm pg argon2 nodemailer zod
npm i -D drizzle-kit @types/pg @types/nodemailer
```

- [ ] **Step 3:** Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
export default defineConfig({ test: { environment: "node", include: ["src/**/*.test.ts"] } });
```

- [ ] **Step 4:** Add scripts to `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`, `"db:migrate": "tsx src/db/migrate.ts"`, `"db:seed": "tsx src/db/seed.ts"`. Add `tsx` dev dep: `npm i -D tsx`.

- [ ] **Step 5:** Verify build + test harness:
```bash
npm run build && npx vitest run
```
Expected: build succeeds; vitest reports "No test files found" (ok for now).

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "chore: scaffold Next.js app with Tailwind + Vitest"
```

### Task 0.2: Brand tokens & base layout

**Files:** Modify `app/globals.css`, `app/layout.tsx`; Create `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/site/Header.tsx`, `components/site/Footer.tsx`.

- [ ] **Step 1:** Define brand palette in `globals.css` (CSS vars: `--brand` deep navy `#0B2545`, `--accent` emerald `#1B9C85`, `--gold` `#E6B800`, neutral grays). Set base typography (Inter via `next/font`), container width.
- [ ] **Step 2:** Build `Header` (logo "Mortgages+", nav: Calculators, How it works/Phases, Get my quote CTA) and `Footer` (legal disclaimer placeholder, links). Sticky header.
- [ ] **Step 3:** Wire Header/Footer into `app/layout.tsx`; set default `metadata` (title template `%s · Mortgages+`, description, OpenGraph).
- [ ] **Step 4:** Verify `npm run build` succeeds.
- [ ] **Step 5: Commit** `feat: brand tokens, header/footer, base layout`.

---

## Phase 1 — Finance core (TDD, pure functions, no deps)

### Task 1.1: Monthly payment & amortization

**Files:** Create `src/core/finance.ts`, `src/core/finance.test.ts`.

- [ ] **Step 1: Write failing tests** (`finance.test.ts`):
```ts
import { describe, it, expect } from "vitest";
import { monthlyPI, amortization, totalInterest } from "./finance";

describe("monthlyPI", () => {
  it("computes standard 30yr payment", () => {
    // 300000 @ 6.5% / 30yr -> 1896.20
    expect(monthlyPI(300000, 6.5, 30)).toBeCloseTo(1896.20, 1);
  });
  it("handles 0% interest as principal/months", () => {
    expect(monthlyPI(120000, 0, 10)).toBeCloseTo(1000, 5);
  });
});

describe("amortization", () => {
  it("schedule length equals term in months and ends at ~0 balance", () => {
    const sched = amortization(200000, 5, 30);
    expect(sched).toHaveLength(360);
    expect(sched[359].balance).toBeCloseTo(0, 1);
  });
  it("sum of principal repaid equals original principal", () => {
    const sched = amortization(200000, 5, 30);
    const paid = sched.reduce((s, r) => s + r.principal, 0);
    expect(paid).toBeCloseTo(200000, 0);
  });
});

describe("totalInterest", () => {
  it("is positive and reasonable for a 30yr loan", () => {
    expect(totalInterest(200000, 5, 30)).toBeGreaterThan(180000);
  });
});
```
- [ ] **Step 2: Run, expect fail** (`npx vitest run src/core/finance.test.ts`) — "monthlyPI is not a function".
- [ ] **Step 3: Implement** in `finance.ts`:
```ts
export interface AmortRow { month: number; payment: number; principal: number; interest: number; balance: number; }

export function monthlyPI(principal: number, annualRatePct: number, years: number): number {
  const n = Math.round(years * 12);
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

export function amortization(principal: number, annualRatePct: number, years: number): AmortRow[] {
  const n = Math.round(years * 12);
  const r = annualRatePct / 100 / 12;
  const pmt = monthlyPI(principal, annualRatePct, years);
  const rows: AmortRow[] = [];
  let bal = principal;
  for (let m = 1; m <= n; m++) {
    const interest = bal * r;
    let principalPaid = pmt - interest;
    if (m === n) principalPaid = bal; // clear rounding drift on final row
    bal = Math.max(0, bal - principalPaid);
    rows.push({ month: m, payment: interest + principalPaid, principal: principalPaid, interest, balance: bal });
  }
  return rows;
}

export function totalInterest(principal: number, annualRatePct: number, years: number): number {
  return amortization(principal, annualRatePct, years).reduce((s, r) => s + r.interest, 0);
}
```
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(core): monthly payment + amortization`.

### Task 1.2: Full housing payment (PITI + PMI), affordability, refi break-even, DTI

**Files:** Modify `src/core/finance.ts`, `src/core/finance.test.ts`.

- [ ] **Step 1: Write failing tests** for:
  - `monthlyPITI({principal, ratePct, years, annualTaxPct, annualInsurance, monthlyHOA, pmiAnnualPct, homeValue})` → sums PI + taxes/12 + insurance/12 + HOA + PMI (PMI applies only while balance/homeValue > 0.80).
  - `affordability({grossMonthlyIncome, monthlyDebts, ratePct, years, dtiMax=0.43, downPayment, taxInsRate=0.015})` → returns max home price. Assert monotonic: higher income → higher price.
  - `refiBreakevenMonths({currentPayment, newPayment, closingCosts})` → `ceil(closingCosts/(savings))`; returns `Infinity` if no savings.
  - `dti(monthlyDebt, grossMonthlyIncome)` → ratio; `0` income → `Infinity`.
  Include exact numeric expectations computed from the formulas above (compute once and hard-code with `toBeCloseTo`).
- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** the four functions in `finance.ts` per the signatures above. PMI: include `pmi = balance/homeValue > 0.8 ? homeValue * pmiAnnualPct/12 : 0` using starting balance. Affordability: invert PITI via binary search on home price until DTI back-ratio ≤ dtiMax.
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(core): PITI, affordability, refi, DTI`.

### Task 1.3: Rent-vs-buy & extra-payment payoff

**Files:** Modify `src/core/finance.ts`, `src/core/finance.test.ts`.

- [ ] **Step 1: Write failing tests** for:
  - `extraPayment({principal, ratePct, years, extraMonthly})` → `{ monthsSaved, interestSaved, payoffMonths }`. Assert extra>0 reduces payoffMonths below term and interestSaved>0.
  - `rentVsBuy({homePrice, downPayment, ratePct, years, monthlyRent, appreciationPct=3, rentInflationPct=3, horizonYears})` → `{ buyCost, rentCost, advantage }` (net cost over horizon; buy nets home equity+appreciation against payments). Assert returns finite numbers and `advantage = rentCost - buyCost`.
- [ ] **Step 2–4:** fail → implement → pass.
- [ ] **Step 5: Commit** `feat(core): rent-vs-buy + extra-payment payoff`.

---

## Phase 2 — Affiliate offer engine (TDD)

### Task 2.1: Affiliate seed data

**Files:** Create `src/core/affiliates.ts`.

- [ ] **Step 1:** Define `AffiliateProgram` type and export `AFFILIATES: AffiliateProgram[]` — 5 distinct mock programs, each with: `id, name, brand, color, baseRate30 (e.g. 6.1–6.9), pointsBias, feeFlat, regionAdj (map of region→delta), creditAdj (excellent/good/fair/poor → delta), aprSpread, blurb, ctaUrl ("#apply")`. Give them believable names (e.g. "SummitPoint Lending", "BlueHarbor Home Loans", "Crestline Mortgage", "Anchor Rate Direct", "Northstar Funding"). No test needed (static data) — covered via offers tests.
- [ ] **Step 2: Commit** `feat(core): seed 5 mock affiliate programs`.

### Task 2.2: Offer engine

**Files:** Create `src/core/offers.ts`, `src/core/offers.test.ts`.

- [ ] **Step 1: Write failing tests** (`offers.test.ts`):
```ts
import { describe, it, expect } from "vitest";
import { buildOffers } from "./offers";

const input = { loanAmount: 320000, years: 30, creditBand: "good" as const, region: "TX", purpose: "purchase" as const };

describe("buildOffers", () => {
  it("returns one offer per affiliate, sorted by APR ascending", () => {
    const offers = buildOffers(input);
    expect(offers.length).toBe(5);
    for (let i = 1; i < offers.length; i++) expect(offers[i].apr).toBeGreaterThanOrEqual(offers[i-1].apr);
  });
  it("worse credit yields higher rates", () => {
    const good = buildOffers({ ...input, creditBand: "excellent" })[0];
    const poor = buildOffers({ ...input, creditBand: "poor" })[0];
    expect(poor.rate).toBeGreaterThan(good.rate);
  });
  it("varies by region (different areas, different quotes)", () => {
    const tx = buildOffers({ ...input, region: "TX" })[0].rate;
    const ca = buildOffers({ ...input, region: "CA" })[0].rate;
    expect(tx).not.toBe(ca);
  });
  it("is deterministic for identical input", () => {
    expect(buildOffers(input)).toEqual(buildOffers(input));
  });
  it("each offer has a positive monthly payment and fees", () => {
    for (const o of buildOffers(input)) { expect(o.monthlyPayment).toBeGreaterThan(0); expect(o.fees).toBeGreaterThanOrEqual(0); }
  });
});
```
- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** `buildOffers(input)`: for each affiliate compute `rate = baseRate30 + creditAdj[band] + regionAdj[region] + purposeAdj`, clamp to [2,12]; `apr = rate + aprSpread + points-derived`; `monthlyPayment = monthlyPI(loanAmount, rate, years)` (import from `finance.ts`); `fees = feeFlat`; include `points`, `affiliateId/name/brand/color/blurb/ctaUrl`. Deterministic (no RNG; if jitter wanted, derive from a hash of `affiliateId+region`). Sort by `apr`.
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(core): affiliate offer engine`.

---

## Phase 3 — Database layer

### Task 3.1: Schema

**Files:** Create `src/db/schema.ts`, `src/db/client.ts`, `drizzle.config.ts`.

- [ ] **Step 1:** `client.ts`: pg `Pool` from `process.env.DATABASE_URL`, export `db = drizzle(pool)`.
- [ ] **Step 2:** `schema.ts` (pgTable):
  - `leads`: `id` uuid pk default, `createdAt`, `firstName, lastName, email, phone`, `purpose`, `propertyValue numeric`, `downPayment numeric`, `loanAmount numeric`, `creditBand`, `region`, `zip`, `sourcePage`, `chosenOfferId`, `chosenAffiliate`, `insuranceOptIn boolean default false`, `status` text default `'new'`, `rawJson jsonb`.
  - `offers`: cache of generated offers per lead (`id, leadId, affiliateId, name, rate numeric, apr numeric, monthlyPayment numeric, fees numeric, points numeric`).
  - `adminUsers`: `id, email unique, passwordHash, mustChangePassword boolean default true, createdAt, updatedAt`.
  - `adminSessions`: `token pk, userId, expiresAt`.
- [ ] **Step 3:** `drizzle.config.ts` pointing at `src/db/schema.ts`, out `drizzle/`.
- [ ] **Step 4:** Generate SQL: `npx drizzle-kit generate`. Commit the generated migration.
- [ ] **Step 5: Commit** `feat(db): schema + drizzle config`.

### Task 3.2: Migrate + seed

**Files:** Create `src/db/migrate.ts`, `src/db/seed.ts`.

- [ ] **Step 1:** `migrate.ts`: run drizzle migrator against `DATABASE_URL`.
- [ ] **Step 2:** `seed.ts`: insert the admin user `jeff.cline@me.com` with `passwordHash = await hash("TEMP!23")` and `mustChangePassword = true` (idempotent upsert on email). (Auth `hash` from Phase 4 — order Phase 4 before running seed, or inline argon2 here.)
- [ ] **Step 3:** Local verify against a throwaway DB (or the prod DB at deploy): document that `npm run db:migrate && npm run db:seed` is run at deploy time.
- [ ] **Step 4: Commit** `feat(db): migrate + seed scripts`.

---

## Phase 4 — Auth (TDD)

### Task 4.1: Password hashing + session tokens

**Files:** Create `src/auth/password.ts`, `src/auth/password.test.ts`.

- [ ] **Step 1: Write failing tests:**
```ts
import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword, mintToken } from "./password";
describe("password", () => {
  it("verifies a correct password and rejects wrong", async () => {
    const h = await hashPassword("TEMP!23");
    expect(await verifyPassword("TEMP!23", h)).toBe(true);
    expect(await verifyPassword("nope", h)).toBe(false);
  });
  it("mints distinct opaque tokens", () => {
    expect(mintToken()).not.toBe(mintToken());
    expect(mintToken().length).toBeGreaterThanOrEqual(32);
  });
});
```
- [ ] **Step 2:** fail → **Step 3:** implement with `argon2` (`hashPassword`/`verifyPassword`) and `crypto.randomBytes(32).toString("hex")` (`mintToken`) → **Step 4:** pass.
- [ ] **Step 5: Commit** `feat(auth): password hashing + tokens`.

### Task 4.2: Session helpers

**Files:** Create `src/auth/session.ts`.

- [ ] **Step 1:** `createSession(userId)` inserts adminSessions row (30-day expiry), sets httpOnly secure cookie `mp_admin`. `getSession()` reads cookie → row → user. `requireAdmin()` redirects to `/admin/login` if absent. `destroySession()`. (No unit test — exercised by integration/manual; keep functions tiny.)
- [ ] **Step 2: Commit** `feat(auth): cookie sessions`.

---

## Phase 5 — Lead funnel

### Task 5.1: Lead submit (server) — TDD where logic lives

**Files:** Create `src/lead/submit.ts`, `src/lead/submit.test.ts`, `app/api/lead/route.ts`.

- [ ] **Step 1:** Define `LeadInput` zod schema (contact + loan fields). Write failing test for `validateLead(input)` (rejects bad email/missing fields, coerces numerics) and `leadToOffers(input)` (returns `buildOffers` result). Mock DB not required for these pure helpers.
- [ ] **Step 2–4:** fail → implement `validateLead` (zod) + `leadToOffers` → pass.
- [ ] **Step 5:** `persistLead(input, offers)` inserts lead + offers rows; `app/api/lead/route.ts` POST handler: validate → persist → fire `sendLeadNotification` (Phase 8, guarded by try/catch) → return offers JSON. (Persistence verified manually/integration at deploy.)
- [ ] **Step 6: Commit** `feat(lead): submit pipeline + API`.

### Task 5.2: Multi-step funnel UI

**Files:** Create `app/quote/page.tsx`, `components/funnel/Stepper.tsx`, `components/funnel/steps/*.tsx`, `components/OfferCard.tsx`, `components/UpsellModal.tsx`.

- [ ] **Step 1:** Client funnel with steps: (1) Purpose, (2) Property value + down payment, (3) Credit band + region/ZIP, (4) Contact info. Progress stepper, validation per step, back/next.
- [ ] **Step 2:** On final submit → POST `/api/lead` → render ranked `OfferCard`s (APR, rate, monthly payment, fees, affiliate brand, Apply CTA).
- [ ] **Step 3:** After offers render, trigger `UpsellModal`.
- [ ] **Step 4:** Verify `npm run build`.
- [ ] **Step 5: Commit** `feat(funnel): multi-step quote flow + offers`.

### Task 5.3: Insurance upsell

**Files:** `components/UpsellModal.tsx`, `app/api/lead/insurance/route.ts`.

- [ ] **Step 1:** Modal copy: "Protect your investment with a portable life policy." Show illustration of the financed home paid off on accidental death; price **$82.12/mo**; subtext "brought to you by one of the world's leading providers in portable protection"; primary button "Add protection — get Mortgages+ free", secondary "No thanks".
- [ ] **Step 2:** Choosing either posts to `/api/lead/insurance` with `{leadId, optIn}` → updates `leads.insuranceOptIn`. Confirmation state ("You're protected — Mortgages+ is on us.").
- [ ] **Step 3:** Verify build. **Step 4: Commit** `feat(funnel): portable life insurance upsell`.

---

## Phase 6 — Public site, calculators UI, SEO

### Task 6.1: Calculator components

**Files:** `components/calculators/*` (one per calculator), `app/calculators/page.tsx` (hub), `app/calculators/[slug]/page.tsx`.

- [ ] **Step 1:** Build interactive client components for all 8 calculators, each importing pure fns from `src/core/finance.ts`, with inputs, live results, and a "Get my personalized quote" CTA → `/quote`. Amortization shows a table + summary; payoff shows months/interest saved.
- [ ] **Step 2:** Hub page lists/links all 8 with descriptions. `[slug]` page renders the matching calculator with SEO copy and an FAQ block.
- [ ] **Step 3:** `generateStaticParams` for the 8 slugs; per-page `generateMetadata` (title/description targeting the calculator keyword).
- [ ] **Step 4:** Verify build. **Step 5: Commit** `feat(calculators): 8 interactive calculators + hub`.

### Task 6.2: Home + phase landing pages

**Files:** `app/page.tsx`, `app/phases/[phase]/page.tsx`, `src/content/phases.ts`.

- [ ] **Step 1:** `phases.ts` exports 8 phases (slug, title, intro, sections, recommended calculator, FAQ). 
- [ ] **Step 2:** Home: hero with primary CTA → `/quote`, calculator highlights, phase overview, trust band, testimonials, final CTA. Premium look.
- [ ] **Step 3:** `phases/[phase]` with `generateStaticParams` + `generateMetadata`; renders content + embedded recommended calculator + CTA.
- [ ] **Step 4:** Verify build. **Step 5: Commit** `feat(site): home + 8 phase landing pages`.

### Task 6.3: SEO plumbing

**Files:** `app/sitemap.ts`, `app/robots.ts`, JSON-LD helpers in `components/seo/JsonLd.tsx`.

- [ ] **Step 1:** `sitemap.ts` enumerates home, /quote, /calculators, 8 calculator slugs, 8 phase slugs. `robots.ts` allows all, points at sitemap.
- [ ] **Step 2:** Add FAQ + WebApplication JSON-LD to calculator pages; Organization JSON-LD in layout.
- [ ] **Step 3:** Verify build; fetch `/sitemap.xml` in dev. **Step 4: Commit** `feat(seo): sitemap, robots, JSON-LD`.

---

## Phase 7 — Admin CRM

### Task 7.1: Login + forced password reset

**Files:** `app/admin/login/page.tsx`, `app/admin/change-password/page.tsx`, `app/api/admin/login/route.ts`, `app/api/admin/password/route.ts`.

- [ ] **Step 1:** Login form → POST `/api/admin/login`: look up `adminUsers` by email, `verifyPassword`; on success `createSession`. If `mustChangePassword`, redirect to `/admin/change-password`.
- [ ] **Step 2:** Change-password page: requires session; POST `/api/admin/password` sets new `hashPassword`, `mustChangePassword=false`. Enforce min length 8. Then redirect to dashboard.
- [ ] **Step 3:** Verify build + manual flow note. **Step 4: Commit** `feat(admin): login + forced first-login password change`.

### Task 7.2: Dashboard, lead detail, CSV export

**Files:** `app/admin/(dash)/page.tsx`, `app/admin/(dash)/leads/[id]/page.tsx`, `app/api/leads/export/route.ts`, `components/admin/*`.

- [ ] **Step 1:** Dashboard (server component, `requireAdmin`): stat cards (total leads, this-week, insurance opt-in rate, by-status), filterable leads table (status, source, opt-in) with links to detail.
- [ ] **Step 2:** Lead detail: all fields, the offers shown, insurance choice, status selector (server action updates `leads.status`).
- [ ] **Step 3:** `/api/leads/export` streams CSV of leads (admin-guarded).
- [ ] **Step 4:** Verify build. **Step 5: Commit** `feat(admin): dashboard, lead detail, CSV export`.

---

## Phase 8 — Email notifications (Zapmail)

### Task 8.1: Lead notification email

**Files:** Create `src/email/notify.ts`.

- [ ] **Step 1:** `sendLeadNotification(lead)` builds an HTML summary (contact, loan params, top offer, insurance opt-in) and sends via nodemailer SMTP transport using env `SMTP_HOST/PORT/USER/PASS` (a Zapmail Google mailbox) to `LEAD_NOTIFY_TO=jeff.cline@me.com`. No-op with a logged warning if SMTP env is unset (so dev/build never breaks).
- [ ] **Step 2:** Call it from `app/api/lead/route.ts` inside try/catch (never block lead persistence on email failure).
- [ ] **Step 3:** Verify build. **Step 4: Commit** `feat(email): Zapmail lead notifications`.

> **Deploy-time:** resolve one active Zapmail Google mailbox's address + app password (via the Zapmail API key already stored encrypted in the r0cketship DB, or the Zapmail dashboard) and set SMTP_* env on the server. smtp.gmail.com:587.

---

## Phase 9 — Deploy to server (mortgages.plus)

> Run from local via the `/tmp/srun.exp` SSH helper (root@137.220.56.129). **Touch only mortgages.plus.**

### Task 9.1: Provision DB + app dir

- [ ] **Step 1:** Create DB + role on the box:
```sql
CREATE ROLE mortgagesplus_prod LOGIN PASSWORD '<gen>';
CREATE DATABASE mortgagesplus_prod OWNER mortgagesplus_prod;
```
- [ ] **Step 2:** `rsync` the built app (or git pull) to `/var/www/mortgages`. Write `/var/www/mortgages/.env` with `DATABASE_URL`, `SMTP_*`, `LEAD_NOTIFY_TO`, a fresh `SESSION_SECRET`.
- [ ] **Step 3:** `npm ci && npm run build` on the server; `npm run db:migrate && npm run db:seed`.

### Task 9.2: pm2 process

**Files:** `deploy/ecosystem.config.cjs`.

- [ ] **Step 1:** ecosystem: name `mortgagesplus`, `npm start`, cwd `/var/www/mortgages`, env `PORT=3010`.
- [ ] **Step 2:** `pm2 start deploy/ecosystem.config.cjs && pm2 save`. Verify `curl -I localhost:3010` → 200.

### Task 9.3: nginx cutover (surgical)

- [ ] **Step 1:** Back up: `cp /etc/nginx/sites-available/whitelabels{,.bak.$(date +%s)}`.
- [ ] **Step 2:** In the `server_name mortgages.plus www.mortgages.plus;` block ONLY, change `proxy_pass http://127.0.0.1:3000;` → `http://127.0.0.1:3010;`.
- [ ] **Step 3:** `nginx -t` (expect "syntax is ok / test is successful") → `systemctl reload nginx`.
- [ ] **Step 4:** Verify: `curl -sI https://mortgages.plus` serves the new app; spot-check 2 other domains (e.g. bath.ws, plmbrz.com) still 200 and unchanged.
- [ ] **Step 5: Commit** deploy configs.

---

## Phase 10 — GitHub mirror

### Task 10.1: Push to github.com/jeff-cline/mortgages

- [ ] **Step 1:** With the user-provided token: `git remote add origin https://<token>@github.com/jeff-cline/mortgages.git` (or create the repo first via API if it doesn't exist).
- [ ] **Step 2:** `git push -u origin main`. Confirm the branch + spec/plan/docs are present. Scrub the token from `.git/config` afterward (use a credential helper or remove the remote URL token).
- [ ] **Step 3:** Report the live URL + admin login to the user.

---

## Self-Review

- **Spec coverage:** phases pages (6.2), calculators (1.x/6.1), offer engine (2.x), funnel (5.x), insurance upsell (5.3), CRM + forced reset (7.x), email via Zapmail (8.1), safe deploy (9.x), GitHub (10.1), SEO (6.3). All spec sections mapped. ✓
- **Placeholders:** deploy values intentionally resolved at deploy time and flagged; no logic placeholders. ✓
- **Type consistency:** `monthlyPI`/`amortization`/`buildOffers` signatures reused consistently; `hashPassword`/`verifyPassword`/`mintToken` consistent across auth + seed. ✓
