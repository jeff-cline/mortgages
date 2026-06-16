# mortgages.plus — Design Spec

**Date:** 2026-06-15
**Owner:** Jeff Cline (jeff.cline@me.com)
**Domain:** mortgages.plus → 137.220.56.129
**Status:** Approved (2026-06-15)

## 1. Goal

A best-in-class, SEO-first mortgage **lead-aggregation** site covering all phases of the
mortgage journey, with deep mortgage **calculators**, a **multi-affiliate offer engine**
(realistic mock for the demo), a **lead-capture funnel** with a portable life-insurance
upsell, and a **built-in CRM** with email notifications.

## 2. Stack (matches the existing server)

- **Next.js (App Router) + TypeScript + Tailwind**, server-rendered for SEO.
- **PostgreSQL** (new DB `mortgagesplus_prod` on the box's existing local Postgres).
- **Drizzle ORM** (matches r0cketship conventions).
- **pm2** process `mortgagesplus` on **port 3010**.
- **nginx** reverse proxy, reusing the existing Let's Encrypt cert for mortgages.plus.
- **Email:** nodemailer over an existing **Zapmail** Google SMTP mailbox (reuses the
  Zapmail account already provisioned on the server).

## 3. Deployment (safe, surgical — protects 20+ other live domains)

The server runs one shared app (`r0cketship`, `/var/www/r0cketship`, port 3000) serving
many domains. mortgages.plus is currently just one server block pointed at it.

- New app deployed to `/var/www/mortgages`, independent of r0cketship.
- New pm2 process `mortgagesplus` on port 3010.
- Edit **only** the `mortgages.plus` server block in
  `/etc/nginx/sites-available/whitelabels` (line ~446) to proxy `127.0.0.1:3010`.
- Reuse existing cert `/etc/letsencrypt/live/mortgages.plus/`.
- **No other domain, config, app, or the shared DB is touched.**

## 4. Public site

Server-rendered, premium fintech aesthetic, fully responsive, fast.

### Phase landing pages (SEO)
Pre-qualification → Pre-approval → House hunting → Application → Underwriting →
Closing → Servicing → Refinance. Each: educational content + a relevant calculator + CTA.

### Calculator hub (primary SEO money pages)
1. Mortgage payment (P&I + taxes + insurance + PMI)
2. Affordability ("how much house can I afford")
3. Refinance break-even
4. Amortization schedule
5. Rent vs. buy
6. Extra-payment payoff
7. Closing-cost estimator
8. Debt-to-income (DTI)

All calculators use real, unit-tested financial math.

### SEO
Per-page metadata, semantic headings, JSON-LD (FAQ/Calculator), sitemap.xml, robots.txt.
Default keyword set (mortgage calculator, refinance calculator, affordability, etc.);
retarget once the client's keyword list / deep-research output is supplied.

## 5. Lead funnel (core)

1. CTA / calculator → multi-step form: loan purpose, property value, down payment,
   credit band, ZIP/region, loan amount → contact (name, email, phone).
2. Submit → **multi-affiliate offer engine** (realistic mock): 4–6 seeded affiliate
   lenders, each with its own rate model varying by credit band, loan type, and region,
   producing genuinely different quotes per area. Ranked offer cards (APR, points, fees,
   monthly payment, Apply CTA).
3. **Insurance upsell:** "Protect your investment with a portable life policy" — home
   paid off on accidental death, **$82.12/mo**, "brought to you by one of the world's
   leading providers in portable protection," **buy now → Mortgage Plus free**. Captures
   opt-in (demo; no real card processing).
4. Lead persisted with all inputs + chosen offer + upsell choice → **email alert to
   jeff.cline@me.com via Zapmail**.

## 6. Admin CRM (`/admin`)

- Login `jeff.cline@me.com` / `TEMP!23`; **forced password change on first login**.
- Lead table: filters (status, source page, insurance opt-in), detail view, status
  pipeline (new/contacted/qualified/closed), **CSV export**, summary stats.
- Hashed passwords (bcrypt/argon2), server-side sessions, CSRF protection.

## 7. Data model (Drizzle)

- `leads` — contact + loan inputs + source page + chosen offer id + insurance opt-in +
  status + timestamps.
- `offers` — seeded affiliate programs (name, brand, rate model params, fees).
- `admin_users` — email, password hash, `must_change_password`, timestamps.
- `admin_sessions` — session token, user id, expiry.

## 8. Email

Reuse the Zapmail account already on the box (encrypted API key in the existing DB; 6
active Google SMTP mailboxes). Send new-lead notifications via nodemailer over one
mailbox (smtp.gmail.com:587, app password). Sender mailbox + creds resolved at deploy.

## 9. Version control

Local git repo; mirrored to `github.com/jeff-cline/mortgages` (requires a GitHub token).

## 10. Out of scope (v1 / YAGNI)

Real payment processing, live affiliate APIs, live rate API (all realistic mocks now),
multi-tenancy, real insurance underwriting.

## 11. Testing

- TDD on calculators (financial math) and the offer engine — correctness is critical.
- Integration tests: lead submission persistence, admin auth + forced password reset.

## 12. Open items

- Client keyword list not yet supplied → launch with default set, retarget later.
- Optional deep-research pass to build the full keyword/content map (post-launch unless
  requested sooner).
