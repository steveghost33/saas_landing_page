# 🚀 Quick Start Guide

## What You Need to Do Right Now

### Step 1: Run Database Migration (CRITICAL)
```bash
node server/db/migrate.js
```
This adds the new columns needed for the audit system.

### Step 2: Update Your .env
Add these to your `.env` file (if not already there):
```env
ADMIN_SECRET=your_secret_admin_token
ADMIN_EMAIL=your_email@example.com
RESEND_API_KEY=your_resend_api_key
```

### Step 3: Deploy
Push to your deployment platform (Vercel, etc.)

### Step 4: Test
1. Go to your website
2. Wait 2.5 seconds for popup
3. Fill: Name, Email, Business Name, Location
4. Verify success message appears
5. Check your email for research alert
6. Click link → research form should load

---

## How It Works

### When Someone Visits Your Site
1. Popup appears after 2.5 seconds
2. They fill: name, email, business name, location
3. They submit
4. **You get email alert** with research link

### When You Do Research
1. Click research link (or go to `/admin/research-form?lead_id=X`)
2. Enter admin token
3. Fill in audit findings (10-15 minutes per lead)
4. Click submit
5. **Lead gets Email 1 immediately** with audit
6. **Emails 2-4 auto-send** on days 2, 5, 8

---

## Key URLs

| Page | URL |
|------|-----|
| Admin Research Form | `/admin/research-form` |
| Admin Research Form (pre-filled) | `/admin/research-form?lead_id=1` |
| API - Process Emails | `GET /api/process-emails` |

---

## What Gets Sent to Leads

### Email 1 (Immediate)
- Full audit findings
- GBP score, rating, reviews
- Website issues found
- Competitor benchmarking
- Quick wins they can do
- CTA: Book consultation

### Email 2 (Day 2)
- How to fix their #1 priority
- Specific walkthrough
- Shows your expertise
- CTA: Book free 30-min call

### Email 3 (Day 5)
- Personal check-in ("Did you tackle that?")
- Offer to help with full strategy
- Direct reply encouraged
- CTA: Book call

### Email 4 (Day 8)
- Final note (last email)
- Leaves door open
- CTA: Book session

---

## Important Notes

- ⚠️ Run migration FIRST (before deploying)
- ⚠️ Set `ADMIN_SECRET` in production `.env`
- ⚠️ Cron job should hit `/api/process-emails` every hour
- ✅ Everything else is automatic

---

## Need Help?

See `AUDIT_SYSTEM_SETUP.md` for:
- Detailed setup instructions
- Complete testing guide
- Troubleshooting
- Database queries

---

**That's it. You're ready to go.**
