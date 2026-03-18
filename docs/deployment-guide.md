# Deployment & CI/CD Guide — FEA Landing Page

Complete guide to deploy the FEA landing page on Vultr VPS with zero-downtime CI/CD via GitHub Actions.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [SSH Access to the Server](#2-ssh-access-to-the-server)
3. [Server Setup from Scratch](#3-server-setup-from-scratch)
4. [Application First Deploy (Staging)](#4-application-first-deploy-staging)
5. [Create Staging Branch](#5-create-staging-branch)
6. [GitHub Actions CI/CD Setup (Staging)](#6-github-actions-cicd-setup-staging)
7. [GitHub Secrets Configuration](#7-github-secrets-configuration)
8. [How Zero-Downtime Deployment Works](#8-how-zero-downtime-deployment-works)
9. [Post-Deploy Verification](#9-post-deploy-verification)
10. [Rollback Procedure](#10-rollback-procedure)
11. [Production Deployment (Step-by-Step)](#11-production-deployment-step-by-step)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Architecture Overview

### Environment Separation

Both staging and production run on the **same VPS**, separated by folder, port, PM2 process, and domain.

| Component       | Staging                  | Production                  |
| --------------- | ------------------------ | --------------------------- |
| Branch          | `staging`                | `main`                      |
| Server folder   | `/var/www/fea-staging`   | `/var/www/fea-production`   |
| PM2 process     | `fea-staging`            | `fea-production`            |
| Port            | `3000`                   | `3001`                      |
| Nginx config    | `fea-staging`            | `fea-production`            |
| Domain          | IP / staging subdomain   | `funkyland.io`              |
| Log files       | `fea-staging-*.log`      | `fea-production-*.log`      |
| `.env.local`    | Sandbox/test credentials | Production credentials      |

### Current Flow (Staging)

```
Developer pushes to `staging` branch
        │
        ▼
GitHub Actions triggered
        │
        ├── 1. SSH into Vultr VPS
        ├── 2. cd /var/www/fea-staging
        ├── 3. Pull latest code
        ├── 4. npm ci → npm run build
        ├── 5. pm2 reload fea-staging (zero-downtime)
        ├── 6. Health check → auto-rollback on failure
        │
        ▼
Live at http://149.248.18.251 (port 3000 via Nginx)
```

**Stack on server:**

| Component     | Purpose                                          |
| ------------- | ------------------------------------------------ |
| Node.js 20    | Runtime                                          |
| PM2           | Process manager (keeps app alive, zero-downtime) |
| Nginx         | Reverse proxy (port 80/443 → app ports)          |
| Let's Encrypt | SSL certificate (when domain is configured)      |

---

## 2. SSH Access to the Server

### Server Details

| Field      | Value              |
| ---------- | ------------------ |
| IP Address | `149.248.18.251`   |
| Username   | `root`             |
| Password   | `5vC$u75dpg[CQ8ab` |
| OS         | Ubuntu 22.04 x64   |
| RAM        | 2048 MB            |
| Storage    | 25 GB NVMe         |
| Location   | Los Angeles        |

### Connect via Git Bash (Windows)

```bash
ssh root@149.248.18.251
```

Enter the password when prompted. You're now on the server.

### Connect via SSH Key (optional)

```bash
ssh -i ~/.ssh/funkyland-key root@149.248.18.251
```

### Exit the server

```bash
exit
```

This returns you to your local terminal. SSH does NOT affect your local Git/GitHub.

---

## 3. Server Setup from Scratch

> Run ALL commands below **on the server** (after SSH-ing in).

### 3.1 Update system packages

```bash
apt update && apt upgrade -y
```

### 3.2 Install Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

Verify:

```bash
node -v   # Should show v20.x.x
npm -v    # Should show 10.x.x
```

### 3.3 Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### 3.4 Install Nginx (Reverse Proxy)

```bash
apt-get install -y nginx
systemctl enable nginx
systemctl start nginx
```

Verify: Open `http://149.248.18.251` in your browser — you should see the Nginx welcome page.

### 3.5 Configure Nginx for Staging

Create the site config:

```bash
nano /etc/nginx/sites-available/fea-staging
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name 149.248.18.251;
    # When you have a staging subdomain, replace with:
    # server_name staging.funkyland.io;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        proxy_pass http://127.0.0.1:3000;
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

Enable the site and remove default:

```bash
ln -sf /etc/nginx/sites-available/fea-staging /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
```

Test and reload Nginx:

```bash
nginx -t
systemctl reload nginx
```

### 3.6 Configure Firewall (UFW)

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status
```

### 3.7 Add Swap (recommended for 2GB RAM)

Next.js builds can be memory-intensive. Add swap to prevent OOM during builds:

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

---

## 4. Application First Deploy (Staging)

### 4.1 Create app directory and clone

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/tabrez-88/fea-landing-page.git fea-staging
cd fea-staging
```

> Note: We clone into `fea-staging` (not the default repo name) to keep environments separated.

### 4.2 Checkout staging branch

```bash
git checkout staging
```

### 4.3 Create the `.env.local` file

```bash
nano /var/www/fea-staging/.env.local
```

Paste your environment variables:

```env
# ─── Google Sheets API ───────────────────────────────────────────────
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ─── Mailtrap (Email) ───────────────────────────────────────────────
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass

# ─── Email Configuration ────────────────────────────────────────────
NOTIFICATION_EMAIL=contact@funkyland.io
SENDER_EMAIL=noreply@funkyland.io
```

> **Staging uses sandbox/test credentials.** Production (future) will have its own `.env.local` with real credentials.

### 4.4 Install dependencies and build

```bash
npm ci
npm run build
```

### 4.5 Start with PM2

The `ecosystem.config.js` is already in the repo. Start it:

```bash
mkdir -p /var/log/pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

`pm2 startup` will output a command — **copy and run that command** to enable auto-start on server reboot.

### 4.6 Verify

```bash
pm2 status
curl http://localhost:3000
```

Open `http://149.248.18.251` in your browser — your staging site should be live!

---

## 5. Create Staging Branch

Run these **on your local machine** (not the server):

```bash
cd "c:/Users/rivol/OneDrive/Documents/GitHub/fea-landing-page"
git checkout -b staging
git push -u origin staging
```

### Branch Strategy

| Branch    | Purpose                                     | Deploys to              |
| --------- | ------------------------------------------- | ----------------------- |
| `main`    | Stable code, source of truth                | Production (future)     |
| `staging` | Push here → auto-deploys to VPS staging     | `http://149.248.18.251` |

**Workflow:**

1. Develop on `main` (or feature branches)
2. When ready to deploy, merge into `staging`
3. GitHub Actions auto-deploys to the VPS
4. Zero downtime — site stays up during deploy

---

## 6. GitHub Actions CI/CD Setup (Staging)

### 6.1 Workflow file

The workflow file is already created at `.github/workflows/deploy-staging.yml`.

It triggers on every push to the `staging` branch and:

1. SSHs into the VPS
2. Pulls latest code into `/var/www/fea-staging`
3. Runs `npm ci` and `npm run build` (with `NODE_OPTIONS` for memory)
4. Runs `pm2 reload fea-staging` (zero-downtime)
5. Health checks port 3000 — auto-rollback on failure

> For production CI/CD, see [Section 11.10](#1110-cicd-for-production).

---

## 7. GitHub Secrets Configuration

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these 3 secrets:

| Secret Name    | Value              |
| -------------- | ------------------ |
| `VPS_HOST`     | `149.248.18.251`   |
| `VPS_USER`     | `root`             |
| `VPS_PASSWORD` | `5vC$u75dpg[CQ8ab` |

### How to add:

1. Go to: `https://github.com/tabrez-88/fea-landing-page/settings/secrets/actions`
2. Click **New repository secret**
3. Name: `VPS_HOST` → Value: `149.248.18.251` → Click **Add secret**
4. Repeat for `VPS_USER` and `VPS_PASSWORD`

---

## 8. How Zero-Downtime Deployment Works

The key is **PM2 cluster mode** + `pm2 reload`:

```
Before deploy:
  Instance 1: serving requests ✅
  Instance 2: serving requests ✅

During deploy (pm2 reload):
  Instance 1: restarting with new code... ⏳
  Instance 2: still serving requests ✅    ← users don't notice anything

  Instance 1: serving requests (new code) ✅
  Instance 2: restarting with new code... ⏳

After deploy:
  Instance 1: serving requests (new code) ✅
  Instance 2: serving requests (new code) ✅
```

- `pm2 reload` (NOT `restart`) does a **graceful reload** — one instance at a time
- `instances: 2` in ecosystem.config.js ensures at least one instance is always up
- Nginx proxies to port 3000, PM2 handles load balancing between instances

**Your site is NEVER down during a deploy.**

---

## 9. Post-Deploy Verification

After pushing to `staging`:

### Check GitHub Actions

1. Go to: `https://github.com/tabrez-88/fea-landing-page/actions`
2. You should see the "Deploy to Staging" workflow running
3. Click on it to see live logs

### Check on the server (SSH in)

```bash
# App status
pm2 status

# Recent logs
pm2 logs fea-staging --lines 20

# Which commit is deployed
cd /var/www/fea-staging && git log --oneline -1

# System resources
htop
```

### Check the site

Open `http://149.248.18.251` in your browser.

---

## 10. Rollback Procedure

If something goes wrong, SSH into the server and run:

```bash
cd /var/www/fea-staging

# See recent commits
git log --oneline -5

# Rollback to a specific commit
git reset --hard <commit-hash>
npm ci
npm run build
pm2 reload fea-staging --update-env
```

The CI/CD workflow also has **automatic rollback** — if the health check fails after deploy, it reverts to the previous commit automatically.

---

## 11. Production Deployment (Step-by-Step)

This section mirrors the staging setup. Follow each step in order.

### Prerequisites

Before starting, make sure you have:

- Staging already deployed and working (Sections 1–10)
- Domain `funkyland.io` with DNS access
- Mailtrap account with Sending (production) enabled
- A separate Google Sheet for production (named `FEA Submissions`)

---

### 11.1 Point domain to VPS

In your DNS provider, add these **A records**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `149.248.18.251` | Auto |
| A | `www` | `149.248.18.251` | Auto |

> DNS propagation can take 5–30 minutes. Check with: `ping funkyland.io`

---

### 11.2 Clone production copy on the server

SSH into the server and run:

```bash
ssh root@149.248.18.251
```

```bash
cd /var/www
git clone https://github.com/tabrez-88/fea-landing-page.git fea-production
cd fea-production
git checkout main
```

---

### 11.3 Create production `.env.local`

```bash
nano /var/www/fea-production/.env.local
```

Paste with **production credentials** (NOT sandbox):

```env
# ─── Google Sheets API ───────────────────────────────────────────────
# Use the PRODUCTION sheet (named "FEA Submissions", NOT the [STAGING] one)
GOOGLE_SHEETS_SPREADSHEET_ID=your_PRODUCTION_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ─── Mailtrap SENDING (Production) ──────────────────────────────────
# These are DIFFERENT from sandbox. See Section 11.8 for how to get them.
MAILTRAP_HOST=live.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USER=api
MAILTRAP_PASS=your_mailtrap_api_token

# ─── Email Configuration ────────────────────────────────────────────
NOTIFICATION_EMAIL=contact@funkyland.io
SENDER_EMAIL=noreply@funkyland.io
```

> **Key differences from staging:**
> - `GOOGLE_SHEETS_SPREADSHEET_ID` → production sheet ID
> - `MAILTRAP_HOST` → `live.smtp.mailtrap.io` (not sandbox)
> - `MAILTRAP_PORT` → `587` (not 2525)
> - `MAILTRAP_USER` → `api` (not sandbox username)
> - `MAILTRAP_PASS` → API token (not sandbox password)

---

### 11.4 Install dependencies and build

```bash
cd /var/www/fea-production
npm ci
export NODE_OPTIONS="--max-old-space-size=1024"
npm run build
```

---

### 11.5 Start with PM2

```bash
cd /var/www/fea-production
pm2 start ecosystem.production.config.js
```

> `pm2 startup` was already configured during staging setup (Section 4.5), so auto-start on reboot is already enabled. You just need to save the updated process list so production is included.

```bash
pm2 save
```

Verify:

```bash
pm2 status
```

You should see 4 processes total:

```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ port     │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┤
│ 0  │ fea-staging        │ cluster  │      │ online    │ 3000     │
│ 1  │ fea-staging        │ cluster  │      │ online    │ 3000     │
│ 2  │ fea-production     │ cluster  │      │ online    │ 3001     │
│ 3  │ fea-production     │ cluster  │      │ online    │ 3001     │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┘
```

Quick health check:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001
# Should return 200
```

---

### 11.6 Configure Nginx for production domain

Create the production site config:

```bash
nano /etc/nginx/sites-available/fea-production
```

Paste:

```nginx
server {
    listen 80;
    server_name funkyland.io www.funkyland.io;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3001;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        proxy_pass http://127.0.0.1:3001;
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

Enable the site:

```bash
ln -sf /etc/nginx/sites-available/fea-production /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

Verify: Open `http://funkyland.io` in your browser — your production site should be live!

---

### 11.7 Add SSL with Let's Encrypt

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d funkyland.io -d www.funkyland.io
```

Certbot will:
1. Ask for your email (for renewal reminders)
2. Ask to agree to terms → Yes
3. Ask to redirect HTTP to HTTPS → **Yes (recommended)**
4. Automatically configure Nginx with SSL

Verify: Open `https://funkyland.io` — you should see the padlock icon.

SSL auto-renews. To test renewal:

```bash
certbot renew --dry-run
```

---

### 11.8 Mailtrap Production Setup (Sending)

Mailtrap Sending is separate from Sandbox. This makes emails **actually deliver** to `contact@funkyland.io`.

#### Step 1: Enable Sending in Mailtrap

1. Log into [mailtrap.io](https://mailtrap.io)
2. In the left sidebar, switch to **Sending** (not Testing)
3. Go to **Sending Domains**
4. Click **Add Domain** → enter `funkyland.io`

#### Step 2: Add DNS records for domain verification

Mailtrap will show you DNS records to add. Typically:

| Type  | Name                              | Value                          | Purpose |
|-------|-----------------------------------|--------------------------------|---------|
| TXT   | `_dmarc.funkyland.io`             | `v=DMARC1; p=none; ...`       | DMARC   |
| TXT   | `funkyland.io`                    | `v=spf1 include:...`          | SPF     |
| CNAME | `mta._domainkey.funkyland.io`     | `...mailtrap.io`               | DKIM    |
| CNAME | `mailtrap._domainkey.funkyland.io`| `...mailtrap.io`               | DKIM    |

> The exact values will be shown in the Mailtrap dashboard. Add them to your DNS provider.

#### Step 3: Verify domain

Go back to Mailtrap → click **Verify All** on each record. It may take a few minutes for DNS to propagate.

#### Step 4: Get API credentials

Once verified:

1. Go to **Sending** → **SMTP/API Settings**
2. Select **SMTP** tab
3. You'll see:
   - Host: `live.smtp.mailtrap.io`
   - Port: `587`
   - Username: `api`
   - Password: `your_api_token_here`

Use these values in the production `.env.local` (Section 11.3).

---

### 11.9 Production Google Sheet

Create a separate sheet for production:

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named **`FEA Submissions`** (no [STAGING] prefix)
3. Create two tabs with headers exactly matching the staging sheet:

**Tab: `Creator Submissions`**

| Date | Name | Email | Company/Studio | Project Title | Asset Type | Engagement Type | Description | Stage | Capital Profile | Website/Deck | Status | Notes |
|------|------|-------|----------------|---------------|------------|-----------------|-------------|-------|-----------------|--------------|--------|-------|

**Tab: `Partner Submissions`**

| Date | Name | Email | Organization | Role | Category | Area of Focus | Message | Website | Status | Notes |
|------|------|-------|--------------|------|----------|---------------|---------|---------|--------|-------|

4. Share the sheet with your service account email (same as staging)
5. Copy the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/{THIS_PART}/edit`
6. Use that ID as `GOOGLE_SHEETS_SPREADSHEET_ID` in production `.env.local`

---

### 11.10 CI/CD for Production

The workflow file is already created at `.github/workflows/deploy-production.yml`.

It triggers on every push to the `main` branch and:

1. SSHs into the VPS
2. Pulls latest code into `/var/www/fea-production`
3. Runs `npm ci` and `npm run build` (with `NODE_OPTIONS` for memory)
4. Runs `pm2 reload fea-production` (zero-downtime)
5. Health checks port 3001 — auto-rollback on failure

**GitHub Secrets are already configured** (same VPS, same secrets from Section 7).

---

### 11.11 Verify production deployment

```bash
# On the server
pm2 status                          # 4 processes (2 staging + 2 production)
curl http://localhost:3001           # Production responds
cd /var/www/fea-production && git log --oneline -1   # Correct commit
```

In your browser:
- `https://funkyland.io` → production site
- `http://149.248.18.251` → staging site (or `https://staging.funkyland.io`)

---

### 11.12 Production workflow

```bash
# 1. Work on feature branches
git checkout -b feat/new-section
# make changes...
git add . && git commit -m "feat: add new section"
git push origin feat/new-section

# 2. Test on staging first
git checkout staging
git merge feat/new-section
git push origin staging
# → auto-deploys to staging, verify at http://149.248.18.251

# 3. When staging looks good, deploy to production
git checkout main
git merge staging
git push origin main
# → auto-deploys to production, verify at https://funkyland.io
```

---

### End result on the VPS

```
/var/www/
├── fea-staging/        ← staging branch, port 3000
└── fea-production/     ← main branch, port 3001

PM2:
├── fea-staging    (2 instances, port 3000)
└── fea-production (2 instances, port 3001)

Nginx:
├── fea-staging    → 149.248.18.251:80    → localhost:3000
│                  → staging.funkyland.io  → localhost:3000
└── fea-production → funkyland.io:443     → localhost:3001

Environment:
├── fea-staging/.env.local     → Sandbox Mailtrap + [STAGING] Sheet
└── fea-production/.env.local  → Production Mailtrap + Production Sheet
```

---

## 12. Troubleshooting

### App won't start

```bash
# Check PM2 logs
pm2 logs fea-staging --lines 50 --err

# Check if port 3000 is in use
lsof -i :3000

# Restart from scratch
pm2 delete fea-staging
cd /var/www/fea-staging
pm2 start ecosystem.config.js
```

### Nginx errors

```bash
# Test config
nginx -t

# Check Nginx logs
tail -20 /var/log/nginx/error.log

# Restart Nginx
systemctl restart nginx
```

### Build fails on server

```bash
# Check disk space
df -h

# Check memory
free -m

# Swap should already be enabled (Section 3.7)
swapon --show
```

### GitHub Actions fails

1. Check the Actions tab: `https://github.com/tabrez-88/fea-landing-page/actions`
2. Click the failed run to see logs
3. Common issues:
   - **SSH connection timeout**: Check VPS is running, firewall allows port 22
   - **Build fails**: Run `npm run build` locally first to verify
   - **Secrets wrong**: Double-check secrets in repo settings

### Can't SSH into server

```bash
# Check if server is reachable
ping 149.248.18.251

# Try with verbose output
ssh -v root@149.248.18.251
```

---

## Quick Reference — Daily Workflow

```bash
# 1. Work on your code locally (on main or feature branch)
git add .
git commit -m "feat: add new section"

# 2. When ready to deploy, merge into staging
git checkout staging
git merge main
git push origin staging

# 3. GitHub Actions auto-deploys — check status at:
# https://github.com/tabrez-88/fea-landing-page/actions

# 4. Staging is live at http://149.248.18.251 with zero downtime
```
