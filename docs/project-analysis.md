# FEA Landing Page — Project Analysis

> Generated: 2026-03-14
> Status: **Pre-launch / Slicing Complete — Backend Integration Pending**

---

## 1. Project Overview

| Item          | Detail                                     |
| ------------- | ------------------------------------------ |
| Framework     | Next.js 16.1.6 (App Router)                |
| Language      | TypeScript (strict)                        |
| Styling       | Tailwind CSS v4 + shadcn/ui + Radix UI     |
| Forms         | React Hook Form + Zod v4                   |
| Animation     | Motion (Framer Motion) v12                 |
| Node Required | >= 18.18.0 (recommended: 20 LTS or 22 LTS) |

---

## 2. Pages & Routes

| Route                        | Type        | Status       | Description                 |
| ---------------------------- | ----------- | ------------ | --------------------------- |
| `/`                          | Static Page | ✅ Complete  | Landing page (7 sections)   |
| `/bring-your-project-to-fea` | Client Page | ✅ Sliced    | Creator submission form     |
| `/partner-with-fea`          | Client Page | ✅ Sliced    | Partner submission form     |
| `/api/creator`               | API Route   | ⚠️ Stub Only | POST — logs to console only |
| `/api/partner`               | API Route   | ⚠️ Stub Only | POST — logs to console only |

---

## 3. Landing Page Sections (Home)

All sections are **fully sliced and animated**.

| #   | Component              | Description                                     |
| --- | ---------------------- | ----------------------------------------------- |
| 1   | `Jumbotron`            | Hero with logo, title, feature badges           |
| 2   | `WhatIsFEA`            | Platform explanation + illustration             |
| 3   | `WhoIsFEA`             | 3 audience segments (Creators, Supporters, etc) |
| 4   | `HowFEAWorks`          | Support Layer & Participation Layer             |
| 5   | `ExampleOpportunities` | Bullet list of example opportunities            |
| 6   | `CTA`                  | Links to Creator & Partner forms                |
| 7   | `Footer`               | Contact email, disclaimer, copyright            |

---

## 4. Form System

### 4.1 Creator Form (`/bring-your-project-to-fea`)

| Section          | Fields                                                           | Validation |
| ---------------- | ---------------------------------------------------------------- | ---------- |
| Project Overview | Primary Asset Type (radio), Engagement Type (radio)              | ✅ Zod     |
| Opportunity      | Project Title, Brief Description, Stage (radio), Capital Profile | ✅ Zod     |
| Contact          | Name*, Email*, Company/Studio, Website or Deck                   | ✅ Zod     |

**Zod Schema:** `lib/schemas/creator.ts`
**Hook:** `hooks/use-creator-form.ts`
**Endpoint:** `POST /api/creator`

### 4.2 Partner Form (`/partner-with-fea`)

| Section               | Fields                                                   | Validation |
| --------------------- | -------------------------------------------------------- | ---------- |
| Organization Details  | Partner Category (radio, 8 options)                      | ✅ Zod     |
| Organization Overview | Organization Name*, Your Role*, Area of Focus, Message\* | ✅ Zod     |
| Contact               | Name*, Email*, Website                                   | ✅ Zod     |

**Zod Schema:** `lib/schemas/partner.ts`
**Hook:** `hooks/use-partner-form.ts`
**Endpoint:** `POST /api/partner`

### 4.3 Shared Form Components

| Component        | Location           | Purpose                               |
| ---------------- | ------------------ | ------------------------------------- |
| `FormInput`      | `components/form/` | Text/email/url input with error state |
| `FormTextarea`   | `components/form/` | Textarea with error state             |
| `FormRadioGroup` | `components/form/` | Radio group with RHF Controller       |
| `FormHeader`     | `components/form/` | Dark nav header with logo             |
| `FormActions`    | `components/form/` | Back link + submit button             |
| `SuccessDialog`  | `components/form/` | Modal shown on successful submission  |

---

## 5. Current Flow (What Works Now)

```
User visits landing page
        │
        ▼
Browses sections (animated, responsive)
        │
        ▼
Clicks CTA → goes to Creator or Partner form
        │
        ▼
Fills out form (client-side validation via Zod ✅)
        │
        ▼
Submits form
        │
        ▼
Hook sends POST to /api/creator or /api/partner
        │
        ▼
API route receives data → logs to server console ⚠️
        │
        ▼
Returns { success: true } → SuccessDialog shown ✅
```

**The user sees a success message, but the data goes NOWHERE except the server console log.**

---

## 6. What's Missing — Gap Analysis

### 🔴 Critical (Required for the task)

| #   | Gap                           | Description                                                                                          | Priority |
| --- | ----------------------------- | ---------------------------------------------------------------------------------------------------- | -------- |
| 1   | **Google Sheets Integration** | No integration exists. Need to add Google Sheets API or use a service account to append rows.        | HIGH     |
| 2   | **Email Notification**        | No email sending. Need to send notification to `tracereport@kssgroup.id` on each submission.         | HIGH     |
| 3   | **Environment Variables**     | No `.env` or `.env.example` file. Will need credentials for Google Sheets API + email service.       | HIGH     |
| 4   | **Server-side Validation**    | API routes accept any JSON body without validation. Zod schemas exist but are only used client-side. | HIGH     |

### 🟡 Recommended (Good practice for production)

| #   | Gap                          | Description                                                     | Priority |
| --- | ---------------------------- | --------------------------------------------------------------- | -------- |
| 5   | **Rate Limiting**            | No rate limiting on API routes. Forms could be spammed.         | MEDIUM   |
| 6   | **Honeypot / Anti-spam**     | No bot protection (CAPTCHA, honeypot field, or similar).        | MEDIUM   |
| 7   | **Error Logging**            | No structured error logging. Errors are caught but not tracked. | MEDIUM   |
| 8   | **Loading/Error UX on Home** | Home page has no loading states or error boundaries.            | LOW      |

### 🟢 Nice to Have (Future)

| #   | Gap                 | Description                                                             | Priority |
| --- | ------------------- | ----------------------------------------------------------------------- | -------- |
| 9   | **SEO / Meta Tags** | Basic meta exists but no Open Graph, Twitter cards, or structured data. | LOW      |
| 10  | **Analytics**       | No tracking (Google Analytics, Plausible, etc.).                        | LOW      |
| 11  | **Admin Dashboard** | No way to view submissions in-app (relies on Google Sheets for now).    | FUTURE   |

---

## 7. Integration Plan — What Needs to Be Built

### 7.1 Google Sheets Integration

**Goal:** Every form submission → new row in a Google Sheet.

**Sheet columns (as specified):**

| Date | Type | Project Title | Name | Email | Company | Status | Notes |
| ---- | ---- | ------------- | ---- | ----- | ------- | ------ | ----- |

- **Type** = `Creator` or `Partner`
- **Status** = `New` (default, can be changed manually in the sheet)
- **Notes** = empty (for manual use)

**Approach options:**

| Option                      | Pros                                   | Cons                                        |
| --------------------------- | -------------------------------------- | ------------------------------------------- |
| **A. Google Sheets API**    | Direct, full control, free             | Requires service account setup, more code   |
| **B. Google Apps Script**   | Simple webhook, no npm packages needed | Less control, depends on Apps Script uptime |
| **C. Third-party (Zapier)** | No code, quick setup                   | Paid service, external dependency           |

**Recommended: Option A (Google Sheets API)** — most reliable, free, and keeps everything in-code.

**Required:**

- Google Cloud project with Sheets API enabled
- Service account with JSON key
- Sheet shared with service account email
- npm package: `googleapis` or `google-spreadsheet`

**Env vars needed:**

```
GOOGLE_SHEETS_SPREADSHEET_ID=<sheet-id>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<service-account-email>
GOOGLE_PRIVATE_KEY=<private-key-from-json>
```

### 7.2 Email Notification

**Goal:** Send email to `tracereport@kssgroup.id` on every submission.

**Approach options:**

| Option                   | Pros                                     | Cons                                |
| ------------------------ | ---------------------------------------- | ----------------------------------- |
| **A. Resend**            | Simple API, generous free tier (100/day) | Requires domain verification        |
| **B. Nodemailer + SMTP** | No third-party dependency                | Needs SMTP credentials, more config |
| **C. SendGrid**          | Reliable, 100/day free                   | More complex setup                  |
| **D. Gmail SMTP**        | Free, easy for low volume                | Rate limited, less reliable         |

**Recommended: Option A (Resend)** — simplest API, works well with Next.js, free tier is enough for pre-launch.

**Env vars needed:**

```
RESEND_API_KEY=<api-key>
NOTIFICATION_EMAIL=tracereport@kssgroup.id
```

### 7.3 Server-side Validation

**Goal:** Reuse existing Zod schemas on the server side.

The Zod schemas already exist at:

- `lib/schemas/creator.ts`
- `lib/schemas/partner.ts`

These just need to be imported and used in the API routes with `.safeParse()`.

### 7.4 Environment Configuration

**Required `.env.local` file:**

```env
# Google Sheets
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

# Email (Resend)
RESEND_API_KEY=
NOTIFICATION_EMAIL=tracereport@kssgroup.id
```

---

## 8. Updated Flow (After Integration)

```
User fills out Creator or Partner form
        │
        ▼
Client-side validation (Zod) ✅
        │
        ▼
POST /api/creator  or  POST /api/partner
        │
        ▼
Server-side validation (Zod safeParse) 🔧 TO BUILD
        │
        ├─── ❌ Invalid → return 400 with error details
        │
        ▼ ✅ Valid
        │
        ├──→ Append row to Google Sheet 🔧 TO BUILD
        │     (Date, Type, Title, Name, Email, Company, "New", "")
        │
        ├──→ Send email to tracereport@kssgroup.id 🔧 TO BUILD
        │     (submission summary)
        │
        ▼
Return { success: true } → SuccessDialog shown ✅
```

---

## 9. File Structure (What to Add/Modify)

```
fea-landing-page/
├── app/
│   ├── api/
│   │   ├── creator/route.ts        ← 🔧 MODIFY (add validation + integrations)
│   │   └── partner/route.ts        ← 🔧 MODIFY (add validation + integrations)
├── lib/
│   ├── google-sheets.ts            ← 🆕 CREATE (Sheets API helper)
│   ├── email.ts                    ← 🆕 CREATE (email sending helper)
│   └── schemas/
│       ├── creator.ts              ← ✅ EXISTS (no changes needed)
│       └── partner.ts              ← ✅ EXISTS (no changes needed)
├── .env.example                    ← 🆕 CREATE (template for env vars)
└── package.json                    ← 🔧 MODIFY (add googleapis, resend)
```

---

## 10. Estimated New Dependencies

```json
{
  "googleapis": "^148.0.0",
  "resend": "^4.0.0"
}
```

---

## 11. Google Sheet Setup Checklist

- [ ] Create a Google Cloud project
- [ ] Enable Google Sheets API
- [ ] Create a Service Account
- [ ] Download the JSON key file
- [ ] Create a Google Sheet with headers: `Date | Type | Project Title | Name | Email | Company | Status | Notes`
- [ ] Share the sheet with the service account email (Editor access)
- [ ] Copy the Sheet ID from the URL
- [ ] Add credentials to `.env.local`

---

## 12. Summary (Updated 2026-03-14)

| Area                      | Status                            |
| ------------------------- | --------------------------------- |
| Landing page UI           | ✅ Complete                       |
| Creator form UI           | ✅ Complete                       |
| Partner form UI           | ✅ Complete                       |
| Client-side validation    | ✅ Complete                       |
| Animations                | ✅ Complete                       |
| Responsive design         | ✅ Complete                       |
| API routes                | ✅ Complete                       |
| Server-side validation    | ✅ Implemented (Zod safeParse)    |
| Google Sheets integration | ✅ Implemented (googleapis)       |
| Email notifications       | ✅ Implemented (Resend)           |
| Environment config        | ✅ Created (.env.example)         |
| Rate limiting / anti-spam | ⚠️ Not implemented (recommended)  |
| SEO / Open Graph          | ⚠️ Not implemented (nice to have) |
| Analytics                 | ⚠️ Not implemented (nice to have) |

> For setup instructions, see [setup-guide.md](./setup-guide.md)
