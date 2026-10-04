# Mortgages+ (mortgages.plus)

SEO-first mortgage **lead-aggregation** site: deep mortgage calculators, a multi-affiliate
offer engine, a lead-capture funnel with a portable life-insurance upsell, and a built-in
admin CRM with email notifications.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Drizzle ORM · PostgreSQL ·
Vitest · nodemailer (Zapmail SMTP) · pm2 · nginx.

## Layout

```
app/(marketing)/        public site: home, /calculators, /calculators/[slug],
                        /phases, /phases/[phase], /quote
app/admin/              CRM: login, forced password change, dashboard, lead detail
app/api/                lead + insurance endpoints, admin auth, CSV export
src/core/               pure finance math + affiliate offer engine (unit-tested)
src/db/                 Drizzle schema, client, migrate, seed
src/auth/               argon2 password hashing + cookie sessions
src/lead/               lead validation + persistence pipeline
src/email/              Zapmail SMTP lead notifications
src/content/            mortgage-phase editorial content
components/             UI kit, calculators, funnel, offer card, upsell modal, admin
deploy/                 pm2 config, nginx reference, deploy runbook
docs/superpowers/       design spec + implementation plan
```

## Develop

```bash
npm install
npm run dev          # http://localhost:3010
npm test             # vitest (finance + offers + auth + lead)
npm run build
```

Requires a `.env` with at least `DATABASE_URL` for DB-backed features (the build itself
runs without one). See `deploy/README.md` for the full env and the production runbook.

## Admin

`/admin/login` — seeded user `jeff.cline@me.com` (password set at seed; forced change on
first login).

## Data

`npm run db:generate` (emit SQL from schema) · `npm run db:migrate` · `npm run db:seed`.
