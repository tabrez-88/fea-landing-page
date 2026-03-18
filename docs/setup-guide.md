# FEA — Integration Setup Guide

This guide walks you through setting up the Google Sheets and Mailtrap integrations so that form submissions from the FEA website are automatically stored and trigger email notifications.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Environment Separation](#2-environment-separation)
3. [Google Sheets Setup](#3-google-sheets-setup)
4. [Mailtrap Setup — Sandbox (Staging)](#4-mailtrap-setup--sandbox-staging)
5. [Mailtrap Setup — Production (Real Delivery)](#5-mailtrap-setup--production-real-delivery)
6. [Environment Variables Reference](#6-environment-variables-reference)
7. [Google Sheet Structure](#7-google-sheet-structure)
8. [Testing](#8-testing)
9. [Deployment Notes](#9-deployment-notes)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Overview

When a user submits a Creator or Partner form:

```
Form submitted → POST /api/creator or /api/partner
                          │
                  Server-side validation (Zod)
                          │
               ┌──────────┴──────────┐
               ▼                      ▼
    Append row to              Send email to
    Google Sheet           contact@funkyland.io
               │                      │
               └──────────┬──────────┘
                          ▼
                Return success to user
```

Both integrations run in parallel. If one fails, the other still executes. Only if **both** fail does the user see an error.

---

## 2. Environment Separation

Staging and Production use **the same code** but different `.env.local` values on each server. No code changes are needed to switch environments.

| Component          | Staging (testing)                        | Production (live)                     |
| ------------------ | ---------------------------------------- | ------------------------------------- |
| **Server folder**  | `/var/www/fea-staging`                   | `/var/www/fea-production`             |
| **Google Sheet**   | `[STAGING] FEA Submissions`              | `FEA Submissions`                     |
| **Sheet ID**       | Separate spreadsheet ID                  | Separate spreadsheet ID               |
| **Mailtrap mode**  | Sandbox (captured, not delivered)        | Sending (real delivery)               |
| **SMTP Host**      | `sandbox.smtp.mailtrap.io`               | `live.smtp.mailtrap.io`               |
| **SMTP Port**      | `2525`                                   | `587`                                 |
| **SMTP Auth**      | Sandbox username/password                | `api` / API token                     |
| **Emails sent?**   | No — captured in Mailtrap inbox          | Yes — delivered to `contact@funkyland.io` |
| **Sender address** | `noreply@funkyland.io` (shown in sandbox)| `noreply@funkyland.io` (real delivery)|

### Why separate sheets?

- Staging gets test data from development — you don't want that mixed with real submissions
- Production stays clean with only real user submissions
- Both use the same tab structure and column headers

### How it works

Each server has its own `.env.local` file with different values. The code reads from environment variables and behaves accordingly — no `if staging` logic needed.

---

## 3. Google Sheets Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** (top-left) → **New Project**
3. Name it `fea-submissions` (or any name you prefer)
4. Click **Create**
5. Make sure the new project is selected in the top-left dropdown

### Step 2: Enable the Google Sheets API

1. In Google Cloud Console, go to **APIs & Services** → **Library**
   - Direct link: `https://console.cloud.google.com/apis/library`
2. Search for **Google Sheets API**
3. Click on it → Click **Enable**
4. Wait for it to activate (takes a few seconds)

### Step 3: Create a Service Account

1. Go to **APIs & Services** → **Credentials**
   - Direct link: `https://console.cloud.google.com/apis/credentials`
2. Click **+ Create Credentials** → **Service account**
3. Fill in:
   - **Service account name:** `fea-sheets` (or any name)
   - **Service account ID:** auto-generated (e.g., `fea-sheets@fea-submissions.iam.gserviceaccount.com`)
4. Click **Create and Continue**
5. Skip the optional roles → Click **Continue**
6. Skip the optional users → Click **Done**

### Step 4: Generate a JSON Key

1. In the **Credentials** page, find your new service account
2. Click on the service account email to open it
3. Go to the **Keys** tab
4. Click **Add Key** → **Create new key**
5. Select **JSON** → Click **Create**
6. A `.json` file will download — **keep this safe, you need it**

The JSON file contains:

```json
{
  "type": "service_account",
  "project_id": "fea-submissions",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "fea-sheets@fea-submissions.iam.gserviceaccount.com",
  ...
}
```

You need two values from this file:

- `client_email` → This is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → This is your `GOOGLE_PRIVATE_KEY`

> **Note:** If your GCP organization blocks service account key creation (`iam.disableServiceAccountKeyCreation`), you can either:
> - Grant yourself the **Organization Policy Administrator** role at the organization level and disable the constraint
> - Use a **personal Gmail account** to create the GCP project (no org policy restrictions)

### Step 5: Create TWO Google Sheets

You need **two separate spreadsheets** — one for staging, one for production.

**Staging Sheet:**

1. Go to [Google Sheets](https://sheets.google.com/) and create a new spreadsheet
2. Rename it to **[STAGING] FEA Submissions**
3. Get the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_IS_HERE/edit
   ```
4. This ID goes into the staging `.env.local` as `GOOGLE_SHEETS_SPREADSHEET_ID`

**Production Sheet:**

1. Create another new spreadsheet
2. Rename it to **FEA Submissions**
3. Get its Spreadsheet ID
4. This ID goes into the production `.env.local` as `GOOGLE_SHEETS_SPREADSHEET_ID`

### Step 6: Set Up Sheet Tabs & Headers (both sheets)

Each spreadsheet needs **two tabs** with identical structure:

**Tab 1: `Creator Submissions`**

Rename the default "Sheet1" tab to `Creator Submissions` and add these headers in row 1:

| A    | B    | C     | D              | E             | F          | G               | H                 | I     | J               | K            | L      |
| ---- | ---- | ----- | -------------- | ------------- | ---------- | --------------- | ----------------- | ----- | --------------- | ------------ | ------ |
| Date | Name | Email | Company/Studio | Project Title | Asset Type | Engagement Type | Brief Description | Stage | Capital Profile | Website/Deck | Status |

**Tab 2: `Partner Submissions`**

Click the **+** button at the bottom to add a new tab. Rename it to `Partner Submissions` and add these headers in row 1:

| A    | B    | C     | D            | E    | F                | G             | H       | I       | J      |
| ---- | ---- | ----- | ------------ | ---- | ---------------- | ------------- | ------- | ------- | ------ |
| Date | Name | Email | Organization | Role | Partner Category | Area of Focus | Message | Website | Status |

> **Important:** The tab names must be exactly `Creator Submissions` and `Partner Submissions` (case-sensitive). Set up both tabs in **both** sheets.

### Step 7: Share Both Sheets with the Service Account

For **each** spreadsheet:

1. Click **Share** (top-right)
2. In the "Add people" field, paste the **service account email**
   (e.g., `fea-sheets@fea-submissions.iam.gserviceaccount.com`)
3. Set permission to **Editor**
4. Uncheck "Notify people"
5. Click **Share**

> **Tip:** Add conditional formatting on the Status column:
> - **New** → Blue background
> - **Qualified** → Green background
> - **Waitlist** → Yellow background
> - **Archived** → Gray background

---

## 4. Mailtrap Setup — Sandbox (Staging)

Mailtrap Sandbox captures all emails without actually delivering them. Perfect for testing email format and content. No domain verification needed.

### Step 1: Create a Mailtrap Account

1. Go to [mailtrap.io](https://mailtrap.io/) and sign up (free plan works)
2. Verify your email address

### Step 2: Get Your Sandbox SMTP Credentials

1. After signing in, you'll land on the Mailtrap dashboard
2. Go to **Email Testing** → **Inboxes** (left sidebar)
3. You should see a default inbox called **My Inbox** (or create one)
4. Click on **My Inbox** to open it
5. In the inbox view, find the **SMTP Settings** section
6. Look for the **Integrations** dropdown and select **Nodemailer**
7. You'll see your credentials:

   ```
   Host:     sandbox.smtp.mailtrap.io
   Port:     2525
   Username: your_mailtrap_username    ← this is MAILTRAP_USER
   Password: your_mailtrap_password    ← this is MAILTRAP_PASS
   ```

> **That's it!** No domain verification, no DNS records. The sandbox captures all emails regardless of the sender/recipient address.

### Step 3: View Emails in Sandbox

After a form submission, go to **Email Testing** → **Inboxes** → **My Inbox** in the Mailtrap dashboard. You'll see:

- The HTML email rendered exactly as recipients would see it
- The raw HTML source for debugging
- Spam analysis score
- Header details

### Staging `.env.local` values

```env
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=<your sandbox username>
MAILTRAP_PASS=<your sandbox password>
```

---

## 5. Mailtrap Setup — Production (Real Delivery)

When you're ready to send real emails to `contact@funkyland.io`, set up Mailtrap Sending.

### Step 1: Go to Email Sending

1. In the Mailtrap dashboard, go to **Email Sending** (left sidebar, separate from Email Testing)
2. Click **Domains** → **Add Domain**
3. Enter `funkyland.io`

### Step 2: Add DNS Records

Mailtrap will show you DNS records to add. Go to your domain registrar's DNS settings and add:

| Type  | Name                              | Value                              | Purpose |
| ----- | --------------------------------- | ---------------------------------- | ------- |
| TXT   | `funkyland.io`                    | `v=spf1 include:_spf.mailtrap.io ~all` | SPF     |
| CNAME | `rwmt1._domainkey.funkyland.io`   | *(shown in Mailtrap dashboard)*    | DKIM 1  |
| CNAME | `rwmt2._domainkey.funkyland.io`   | *(shown in Mailtrap dashboard)*    | DKIM 2  |
| TXT   | `_dmarc.funkyland.io`             | `v=DMARC1; p=none;`               | DMARC   |

> **Note:** The exact CNAME values will be shown in your Mailtrap dashboard. Copy them from there.

### Step 3: Verify the Domain

1. After adding the DNS records, go back to Mailtrap
2. Click **Verify DNS Records** (or **Verify All**)
3. DNS propagation can take 5 minutes to 24 hours
4. Once verified, you'll see green checkmarks next to each record

### Step 4: Get Your Sending API Token

1. In the Mailtrap dashboard, go to **Email Sending** → **SMTP/API Settings**
2. Copy the **API Token** — this is your `MAILTRAP_PASS` for production

### Production `.env.local` values

```env
MAILTRAP_HOST=live.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USER=api
MAILTRAP_PASS=<your Mailtrap API token>
```

> **The code stays exactly the same.** Only the environment variables differ between staging and production.

### Verify It Works

After deploying production, submit a test form and check:
1. `contact@funkyland.io` should receive the notification email
2. The email should pass SPF/DKIM checks (no spam folder)

---

## 6. Environment Variables Reference

### Full `.env.local` — Staging

```env
# ─── Google Sheets API ───────────────────────────────────────────────
GOOGLE_SHEETS_SPREADSHEET_ID=<staging sheet ID>
GOOGLE_SERVICE_ACCOUNT_EMAIL=fea-sheets@fea-development-486410.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ─── Mailtrap (Sandbox — emails captured, not delivered) ─────────────
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=<sandbox username>
MAILTRAP_PASS=<sandbox password>

# ─── Email Configuration ────────────────────────────────────────────
NOTIFICATION_EMAIL=contact@funkyland.io
SENDER_EMAIL=noreply@funkyland.io
```

### Full `.env.local` — Production

```env
# ─── Google Sheets API ───────────────────────────────────────────────
GOOGLE_SHEETS_SPREADSHEET_ID=<production sheet ID>
GOOGLE_SERVICE_ACCOUNT_EMAIL=fea-sheets@fea-development-486410.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ─── Mailtrap (Sending — real delivery to contact@funkyland.io) ──────
MAILTRAP_HOST=live.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USER=api
MAILTRAP_PASS=<your Mailtrap API token>

# ─── Email Configuration ────────────────────────────────────────────
NOTIFICATION_EMAIL=contact@funkyland.io
SENDER_EMAIL=noreply@funkyland.io
```

### Key differences

| Variable          | Staging                        | Production                    |
| ----------------- | ------------------------------ | ----------------------------- |
| `SPREADSHEET_ID`  | Staging sheet ID               | Production sheet ID           |
| `MAILTRAP_HOST`   | `sandbox.smtp.mailtrap.io`     | `live.smtp.mailtrap.io`       |
| `MAILTRAP_PORT`   | `2525`                         | `587`                         |
| `MAILTRAP_USER`   | Sandbox username               | `api`                         |
| `MAILTRAP_PASS`   | Sandbox password               | Mailtrap API token            |

> **Important:** The `GOOGLE_PRIVATE_KEY` value must be wrapped in **double quotes** and keep the `\n` newlines as literal `\n` characters. The code handles the conversion automatically.

---

## 7. Google Sheet Structure

Once submissions start flowing, your Google Sheet will look like this:

### Creator Submissions tab

| Date                | Name       | Email            | Company/Studio | Project Title  | Asset Type | Engagement Type       | Brief Description   | Stage       | Capital Profile | Website/Deck             | Status    |
| ------------------- | ---------- | ---------------- | -------------- | -------------- | ---------- | --------------------- | ------------------- | ----------- | --------------- | ------------------------ | --------- |
| 2026-03-14 10:30:00 | John Smith | john@example.com | Indie Films Co | The Last Light | Films & TV | Revenue participation | A story about...    | Development | $250K – $1M     | https://thelastlight.com | New       |
| 2026-03-14 14:15:00 | Jane Doe   | jane@example.com |                | Beat Drop      | Music      | Perks-driven support  | An album project... | Concept     |                 |                          | Qualified |

### Partner Submissions tab

| Date                | Name        | Email             | Organization     | Role | Partner Category           | Area of Focus | Message                 | Website              | Status |
| ------------------- | ----------- | ----------------- | ---------------- | ---- | -------------------------- | ------------- | ----------------------- | -------------------- | ------ |
| 2026-03-14 11:00:00 | Alice Brown | alice@capital.com | Capital Ventures | GP   | Capital Partner / Investor | Entertainment | We are interested in... | https://capitalv.com | New    |

### Managing Submissions

Use the **Status** column to organize submissions:

| Status        | Meaning                         |
| ------------- | ------------------------------- |
| **New**       | Just received, not yet reviewed |
| **Qualified** | Reviewed and worth pursuing     |
| **Waitlist**  | Interesting but not right now   |
| **Archived**  | Reviewed and not a fit          |

**Tips:**

- Use **Data → Create a Filter** to filter by Status
- Use **Data → Sort** to sort by Date (newest first)
- Add **conditional formatting** on the Status column for visual clarity
- Add a **Notes** column (M for Creator, K for Partner) for internal comments

---

## 8. Testing

### Local Testing (uses Sandbox)

1. Make sure your `.env.local` is configured with sandbox credentials
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Go to `http://localhost:3000/bring-your-project-to-fea`
4. Fill in the form and submit
5. Check:
   - **Google Sheet** → a new row should appear in the `[STAGING] FEA Submissions` sheet
   - **Mailtrap inbox** → go to Email Testing → Inboxes → My Inbox to see the captured email
   - **Browser** → success dialog should appear

6. Repeat for `http://localhost:3000/partner-with-fea`

### Testing Validation

You can test server-side validation with curl:

```bash
# Should fail with 422 (missing required fields)
curl -X POST http://localhost:3000/api/creator \
  -H "Content-Type: application/json" \
  -d '{"name": ""}'

# Should fail with 400 (invalid JSON)
curl -X POST http://localhost:3000/api/creator \
  -H "Content-Type: application/json" \
  -d 'not json'
```

---

## 9. Deployment Notes

### Vultr VPS (Current Setup)

See [deployment-guide.md](./deployment-guide.md) for the full CI/CD setup.

Each environment has its own `.env.local` on the server:

- **Staging:** `/var/www/fea-staging/.env.local` → sandbox credentials, staging sheet ID
- **Production:** `/var/www/fea-production/.env.local` → production credentials, production sheet ID

The `.env.local` files are **not** in Git (listed in `.gitignore`). They are created once on each server and persist across deployments.

### Other Platforms

The integration uses standard Node.js APIs and will work on any platform that supports Next.js:

- **Vercel:** Add env vars in project Settings → Environment Variables
- **Netlify:** Add env vars in site settings
- **Railway:** Add env vars in project settings

---

## 10. Troubleshooting

### "Google Sheets credentials are not configured"

- Check that `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` are set
- Make sure the private key is in **double quotes** in `.env.local`
- Restart the dev server after changing env vars

### "GOOGLE_SHEETS_SPREADSHEET_ID is not configured"

- Check that `GOOGLE_SHEETS_SPREADSHEET_ID` is set
- The ID is the long string in the Google Sheet URL between `/d/` and `/edit`
- Make sure you're using the correct sheet ID for your environment (staging vs production)

### Rows not appearing in Google Sheet

- Verify the service account email has **Editor** access to the sheet
- Check that the tab names are exactly `Creator Submissions` and `Partner Submissions`
- Check the server console for error messages

### "Mailtrap SMTP credentials are not configured"

- Check that `MAILTRAP_HOST`, `MAILTRAP_PORT`, `MAILTRAP_USER`, and `MAILTRAP_PASS` are all set
- Staging: host is `sandbox.smtp.mailtrap.io`, port is `2525`
- Production: host is `live.smtp.mailtrap.io`, port is `587`
- Restart the dev server after changing env vars

### Emails not appearing in Mailtrap inbox (Sandbox)

- Verify your SMTP credentials are correct (copy them fresh from the Mailtrap dashboard)
- Make sure you're looking at the correct inbox in **Email Testing** → **Inboxes**
- Check the server console for SMTP error messages
- Sandbox emails are captured instantly — there's no delivery delay

### Emails not being delivered (Production)

- Check that your domain (`funkyland.io`) is verified in Mailtrap → Email Sending → Domains
- Verify all DNS records (SPF, DKIM, DMARC) are properly set
- Check that you're using the production SMTP credentials (host: `live.smtp.mailtrap.io`)
- Check the Mailtrap Sending dashboard for delivery logs and bounce reasons
- Make sure the `SENDER_EMAIL` domain matches the verified domain

### Google Sheets API quota errors

- Free tier allows 300 requests per minute per project
- For pre-launch volume, this is more than sufficient
- If you hit limits, consider batching or upgrading to a paid tier

### Private key format issues

The private key in `.env.local` should look like this (all on one line with `\n`):

```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQ...[long string]...\n-----END PRIVATE KEY-----\n"
```

If you copied it from the JSON file, it already has `\n` characters. Keep them as-is.
