# Deploy runbook — mortgages.plus

Production host: `137.220.56.129` (Debian 13). The app runs as its **own** isolated unit
on a shared multi-tenant box; it must never disturb the co-hosted `r0cketship` app (port
3000) which serves 20+ other domains.

## Topology

- App dir: `/var/www/mortgages`
- Process: pm2 `mortgagesplus`, listening on **127.0.0.1:3010**
- DB: PostgreSQL `mortgagesplus_prod` (local, owner role `mortgagesplus_prod`)
- TLS: Let's Encrypt cert for `mortgages.plus` + `www.mortgages.plus` (certbot, auto-renew)
- nginx: the `mortgages.plus` server block in `/etc/nginx/sites-available/whitelabels`
  proxies to `127.0.0.1:3010`. Every other domain in that file still proxies to `:3000`.

## Environment (`/var/www/mortgages/.env`, chmod 600, NOT in git)

```
NODE_ENV=production
PORT=3010
DATABASE_URL=postgres://mortgagesplus_prod:<password>@localhost:5432/mortgagesplus_prod
SESSION_SECRET=<32-byte hex>
LEAD_NOTIFY_TO=jeff.cline@me.com
# Email via Zapmail-provisioned Google SMTP mailbox:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<zapmail mailbox address>
SMTP_PASS=<gmail app password>
MAIL_FROM=<zapmail mailbox address>
```

## First-time deploy

```bash
# 1. Provision DB (as postgres superuser)
sudo -u postgres psql -c "CREATE ROLE mortgagesplus_prod LOGIN PASSWORD '<pw>'"
sudo -u postgres psql -c "CREATE DATABASE mortgagesplus_prod OWNER mortgagesplus_prod"

# 2. Ship code (from a workstation)
rsync -az --exclude node_modules --exclude .next --exclude .env \
  ./ root@137.220.56.129:/var/www/mortgages/

# 3. On the server
cd /var/www/mortgages
npm install            # builds argon2 native module
npm run build          # build is safe without DATABASE_URL
npm run db:migrate
npm run db:seed        # creates admin jeff.cline@me.com / TEMP!23 (must change on first login)

# 4. Start
pm2 start deploy/ecosystem.config.cjs && pm2 save

# 5. TLS + HTTPS server block (only the mortgages.plus names)
certbot --nginx -d mortgages.plus -d www.mortgages.plus --redirect \
  --non-interactive --agree-tos -m jeff.cline@me.com
```

## Redeploy (code update)

```bash
rsync -az --exclude node_modules --exclude .next --exclude .env ./ root@137.220.56.129:/var/www/mortgages/
ssh root@137.220.56.129 'cd /var/www/mortgages && npm install && npm run build && npm run db:migrate && pm2 restart mortgagesplus --update-env'
```

## Safety notes

- Only ever edit the `mortgages.plus` server block in nginx. Back up `whitelabels` first.
- `nginx -t` before every `systemctl reload nginx`.
- The email mailbox is shared with r0cketship's Zapmail account (~50 sends/day/mailbox).
