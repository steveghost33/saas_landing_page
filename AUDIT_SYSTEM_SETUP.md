# Local SEO Audit System - Setup & Testing Guide

## Overview

This system replaces the old Tech Health Check/CRM Checklist sequence with a personalized Local Search Visibility Audit workflow. Leads sign up via popup, you research their business, and automated emails deliver audit insights + follow-ups.

---

## 🔧 Setup Steps

### 1. Run Database Migration

The new system requires 6 new columns in the `subscribers` table. Run this command:

```bash
node server/db/migrate.js
```

**What it adds:**
- `business_name` — Lead's business name
- `business_location` — City/location
- `service_type` — Type of service (optional)
- `research_status` — 'pending', 'completed', or 'skipped'
- `research_data` — JSONB with audit findings (GBP score, issues, competitors, etc.)
- `research_completed_at` — Timestamp when research was submitted

### 2. Verify Environment Variables

Ensure these are set:

```env
DATABASE_URL=postgresql://...  # Your database connection
RESEND_API_KEY=...              # For email sending
ADMIN_SECRET=...                # For admin research form access
ADMIN_EMAIL=...                 # Where research alerts go (optional, defaults to steven@ellatechsolutions.com)
SITE_URL=...                    # e.g., https://www.ellatechsolutions.com
```

### 3. Start the App

```bash
npm run dev
```

---

## 🔄 Complete User Flow

### Lead Signup → Email Sequence

```
1. Visitor sees popup after 2.5 seconds
   ├─ Fills: Name, Email, Business Name, Location
   └─ Submits via /api/subscribe

2. You get email notification
   ├─ Subject: "New lead: [Business Name] — Research needed"
   ├─ Includes: Lead name, email, location
   └─ Has link: /admin/research-form?lead_id={id}

3. You research the business (~10-15 min)
   ├─ Check Google Business Profile
   ├─ Scan website for issues
   ├─ Note 2-3 competitors
   └─ Identify quick wins

4. You submit research via form
   ├─ Fills: GBP score, rating, reviews
   ├─ Lists: Website issues, competitors, quick wins, summary
   └─ Submits → POST /api/admin/research-submit

5. System auto-generates & sends
   ├─ Email 1 (immediate): Full audit with findings
   ├─ Email 2 (day 2): How to fix #1 priority
   ├─ Email 3 (day 5): Check-in + consultation offer
   └─ Email 4 (day 8): Final push to book

6. Follow-up emails auto-send on schedule
   └─ Via cron job that hits GET /api/process-emails
```

---

## 🧪 Testing Locally

### Test 1: Sign Up via Popup

1. Go to `http://localhost:5173`
2. Wait 2.5 seconds for popup
3. Fill form:
   - Name: "John Doe"
   - Email: "test@example.com"
   - Business: "ABC Plumbing"
   - Location: "Detroit, MI"
4. Click "Send me the free resources"

**Expected:**
- Success message: "Research underway — you'll hear from us within 2 hours"
- No immediate email sent (awaiting your research)
- New row in `subscribers` table with `sequence_step=0`, `research_status='pending'`

### Test 2: Submit Research

1. Go to `http://localhost:5173/admin/research-form?lead_id=1` (adjust lead_id)
2. Enter admin token (from `.env` `ADMIN_SECRET`)
3. Fill research data:
   - GBP Score: 75
   - Rating: 4.5
   - Reviews: 24
   - Website Issues: "Slow page load", "No mobile optimization"
   - Competitors: "Competitor A, 1", "Competitor B, 2"
   - Quick Wins: "Claim GBP", "Add photos"
   - Summary: "Strong online presence but needs mobile work"
4. Click "Submit Research & Send Audit Email"

**Expected:**
- Success page
- Email sent to lead with audit findings
- `subscribers` row updated:
  - `sequence_step=1` (waiting for Email 2)
  - `research_status='completed'`
  - `research_data` = JSONB with all findings
  - `next_email_at` = NOW + 2 days

### Test 3: Verify Email Sequence

To test emails sending on schedule (without waiting 2+ days):

```sql
-- Manually update next_email_at to past date to trigger sending
UPDATE subscribers
SET next_email_at = NOW() - INTERVAL '1 day'
WHERE id = 1 AND sequence_step = 1;

-- Then trigger the email processor
curl http://localhost:4000/api/process-emails
```

**Expected:**
- Email 2 sent (about fixing #1 issue)
- `subscribers` row: `sequence_step=2`, `next_email_at` = NOW + 3 days

Repeat for sequence_step 2 and 3 to test Emails 3 & 4.

---

## 📧 Email Sequence Details

### Email 1: Local Search Visibility Audit

- **Sent:** Immediately after research submission
- **Contains:** Full audit findings (GBP score, website issues, competitors, quick wins)
- **CTA:** "Book a consultation to discuss strategy"

### Email 2: Action Guide

- **Sent:** Day 2 (2 days after Email 1)
- **Subject:** "How to fix your #1 local search issue"
- **Contains:** Specific walkthrough for their top priority
- **CTA:** "Book a free 30-min strategy call"

### Email 3: Personal Check-in

- **Sent:** Day 5 (3 days after Email 2)
- **Subject:** "Did you get a chance to tackle that?"
- **Contains:** Follow-up asking if they implemented the quick win
- **CTA:** "Book your free 30-min call"

### Email 4: Final Push

- **Sent:** Day 8 (3 days after Email 3)
- **Subject:** "One more thing about your local search…"
- **Contains:** Final note about door being open for help
- **CTA:** "Book my free strategy session"
- **Note:** Marks as final email in sequence

---

## 🔑 Key API Endpoints

### Lead Signup
```
POST /api/subscribe
Body: {
  name, email, business_name, business_location,
  source (optional, defaults to "local-seo-audit-popup")
}
```

### Research Form (Admin)
```
GET /api/admin/research-form?lead_id={id}
  └─ Returns lead data for pre-filling form

GET /api/admin/research-form (no lead_id)
  └─ Returns all leads with research_status='pending'
```

### Submit Research
```
POST /api/admin/research-submit
Headers: { "x-admin-token": process.env.ADMIN_SECRET }
Body: {
  lead_id, gbp_completeness_score, gbp_rating, gbp_review_count,
  website_issues (array), competitors (array), quick_wins (array), summary
}
```

### Process Email Sequence
```
GET /api/process-emails
  └─ Sends any pending emails in sequence
  └─ Should be called every hour via cron job
  └─ (Already set up with cron-job.org)
```

---

## 🐛 Troubleshooting

### Popup not appearing
- Check: `LeadCapturePopup` is rendered in `App.jsx`
- Check: Dismissal state in localStorage (`ella_lead_popup_dismissed`)
- Clear localStorage and reload

### Research form loading errors
- Verify `ADMIN_SECRET` is set in `.env`
- Check: Lead ID exists in database
- Check: Browser console for API errors

### Emails not sending
- Verify `RESEND_API_KEY` is set
- Check: `process-emails` endpoint is being called by cron job
- Check: Server logs for `sendEmail` errors

### PDF generation fails
- `html-pdf` requires native dependencies (PhantomJS)
- If issues on deployment, consider upgrading to `puppeteer`

---

## 📊 Database Queries

### See all pending research leads
```sql
SELECT id, name, email, business_name, business_location, created_at
FROM subscribers
WHERE research_status = 'pending'
ORDER BY created_at DESC;
```

### View a lead's audit data
```sql
SELECT id, name, email, research_data, research_completed_at
FROM subscribers
WHERE id = 1;
```

### Check email sequence status
```sql
SELECT id, name, email, sequence_step, next_email_at, research_status
FROM subscribers
WHERE research_status = 'completed'
ORDER BY next_email_at ASC;
```

---

## 🚀 Production Deployment

### Before deploying:
1. ✅ Run database migration
2. ✅ Set all required environment variables
3. ✅ Test popup and research flow locally
4. ✅ Verify email sending (test email via Resend)
5. ✅ Confirm cron job is set up at cron-job.org

### On deployment:
1. Deploy code changes
2. Run migration on production database
3. Verify environment variables are set
4. Test full flow with real email
5. Monitor logs for any errors

---

## 📝 Files Changed/Created

### New Files:
- `server/db/migrations/001_add_audit_fields.js` — Migration script
- `server/db/migrate.js` — Migration runner
- `server/controllers/researchController.js` — Research form logic
- `server/routes/admin-research.js` — Admin routes
- `server/services/auditPdfService.js` — PDF generation
- `src/pages/Admin/ResearchForm.jsx` — Research form UI
- This file: `AUDIT_SYSTEM_SETUP.md`

### Modified Files:
- `server/controllers/subscribeController.js` — Updated to capture business info
- `server/services/emailService.js` — New audit email functions
- `server/emails/templates.js` — New email sequence
- `server/index.js` — Wired up admin routes
- `src/features/leadCapture/LeadCapturePopup.jsx` — Added form fields
- `src/components/LandingPages/DownloadSuccess.jsx` — Updated success messaging
- `src/App.jsx` — Added research form route

---

## 💡 Next Steps

1. **Run migration** when you have database access
2. **Test locally** using steps in Testing section
3. **Set up ADMIN_SECRET** in production `.env`
4. **Deploy** and verify cron job is working
5. **Monitor** first few leads through full sequence

For questions or issues, check logs or review endpoint implementations.
