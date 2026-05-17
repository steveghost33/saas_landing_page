const SITE_URL = process.env.SITE_URL || "https://www.ellatechsolutions.com";
const BOOKING_URL = `${SITE_URL}/#contact`;
const CHECKLIST_URL = `${SITE_URL}/downloads/CRM-Setup-Checklist.pdf`;
const HEALTH_CHECK_URL = `${SITE_URL}/downloads/Tech-Health-Check.pdf`;

const base = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ella Tech Solutions</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo bar -->
          <tr>
            <td style="padding-bottom:24px;">
              <span style="font-size:17px;font-weight:800;color:#1e40af;letter-spacing:-0.5px;">Ella Tech Solutions</span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;padding:36px 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                Ella Tech Solutions · Detroit, MI<br/>
                You're receiving this because you downloaded a free resource from
                <a href="${SITE_URL}" style="color:#94a3b8;">ellatechsolutions.com</a>.<br/>
                No spam — ever. Reply to this email to unsubscribe.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const btn = (href, label) =>
  `<a href="${href}" style="display:inline-block;background:#1d4ed8;color:#ffffff;font-weight:700;font-size:15px;padding:13px 28px;border-radius:10px;text-decoration:none;margin-top:8px;">${label}</a>`;

const divider = `<hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0;" />`;

// ── Email 1 — Immediate: Tech Health Check delivery ──────────────────────────
export const email1 = (name) => ({
  subject: `Your Tech Health Check is here, ${name}`,
  html: base(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0f172a;line-height:1.3;">
      Here's your Tech Health Check, ${name}
    </h1>
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;">
      Thanks for grabbing this — it takes about 10 minutes to work through and will give you a clear
      picture of where your systems are actually holding you back.
    </p>

    ${btn(HEALTH_CHECK_URL, "Download Tech Health Check →")}

    ${divider}

    <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#0f172a;">What to do with it:</p>
    <ol style="margin:0 0 20px;padding-left:20px;font-size:14px;color:#475569;line-height:1.9;">
      <li>Go through each section and be honest — most orgs have more gaps than they realize</li>
      <li>Circle the areas with the lowest scores</li>
      <li>Those are your priority items — we can work through them together</li>
    </ol>

    <p style="margin:0;font-size:14px;color:#475569;line-height:1.7;">
      In a couple days I'll send over the CRM Setup Checklist too — it pairs well with what
      you'll find in the health check.
    </p>

    ${divider}

    <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;">
      — Steven<br/>
      <span style="color:#94a3b8;">Ella Tech Solutions</span>
    </p>
  `),
});

// ── Email 2 — Day 2: CRM Setup Checklist delivery ────────────────────────────
export const email2 = (name) => ({
  subject: `The CRM checklist I promised you`,
  html: base(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0f172a;line-height:1.3;">
      As promised — your CRM Setup Checklist
    </h1>
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;">
      Hey ${name}, here's the checklist. This is the most-requested resource I share with
      nonprofits and small businesses — it walks you through choosing and launching a CRM
      in 3 weeks without the usual chaos.
    </p>

    ${btn(CHECKLIST_URL, "Download CRM Setup Checklist →")}

    ${divider}

    <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0f172a;">
      Why most CRM projects fail (and how this avoids it):
    </p>
    <p style="margin:0 0 20px;font-size:14px;color:#475569;line-height:1.7;">
      The three things that kill CRM adoption are choosing the wrong tool for the team size,
      skipping the data cleanup step, and launching without staff buy-in. The checklist
      addresses all three — in order.
    </p>

    <p style="margin:0;font-size:14px;color:#475569;line-height:1.7;">
      If you worked through the Tech Health Check, you'll already know which section of this
      checklist matters most for your situation.
    </p>

    ${divider}

    <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;">
      — Steven<br/>
      <span style="color:#94a3b8;">Ella Tech Solutions</span>
    </p>
  `),
});

// ── Email 3 — Day 5: Personal check-in ───────────────────────────────────────
export const email3 = (name) => ({
  subject: `Quick question, ${name}`,
  html: base(`
    <p style="margin:0 0 20px;font-size:15px;color:#0f172a;line-height:1.7;">
      Hey ${name},
    </p>
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;">
      Did you get a chance to go through the Tech Health Check?
    </p>
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;">
      I ask because most people who fill it out find one area that jumps out immediately —
      usually it's either disconnected tools, a CRM that nobody's actually using, or
      Microsoft 365 licenses that are basically just collecting dust.
    </p>
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;">
      Just curious what you found. If you want to talk through it, I do a free 30-minute
      session where we go over exactly what to fix first — no pitch, just clarity.
    </p>

    ${btn(BOOKING_URL, "Book a free 30-min session →")}

    ${divider}

    <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;">
      Either way, feel free to reply here — I read every message.<br/><br/>
      — Steven<br/>
      <span style="color:#94a3b8;">Ella Tech Solutions</span>
    </p>
  `),
});

// ── Email 4 — Day 8: Direct booking ask ──────────────────────────────────────
export const email4 = (name) => ({
  subject: `Still worth a quick call, ${name}?`,
  html: base(`
    <p style="margin:0 0 20px;font-size:15px;color:#0f172a;line-height:1.7;">
      Hey ${name},
    </p>
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;">
      Last note from me — I don't want to clutter your inbox.
    </p>
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;">
      If you've looked at the Tech Health Check and want help figuring out what to actually
      do about it, that's what the free session is for. 30 minutes, I'll tell you exactly
      what I'd fix first and why.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.7;">
      No pressure either way — but if the timing's right, here's the link:
    </p>

    ${btn(BOOKING_URL, "Book my free session →")}

    ${divider}

    <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;">
      — Steven<br/>
      <span style="color:#94a3b8;">Ella Tech Solutions</span>
    </p>

    <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">
      This is the last email in this sequence. Reply anytime if you want to reconnect later.
    </p>
  `),
});
