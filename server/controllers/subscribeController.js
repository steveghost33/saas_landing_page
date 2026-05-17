import pool from "../db/pool.js";
import { scheduleEmailSequence } from "../services/emailService.js";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const normalizeField = (value, maxLength = 255) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const daysFromNow = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

export const subscribe = async (req, res) => {
  const name = normalizeField(req.body?.name, 120);
  const email = normalizeField(req.body?.email, 254).toLowerCase();
  const source = normalizeField(req.body?.source, 100) || "crm-setup-checklist";

  if (!name) return res.status(400).json({ error: "Name is required." });
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  try {
    const existing = await pool.query("SELECT id FROM subscribers WHERE email = $1", [email]);

    if (existing.rows.length > 0) {
      await pool.query("UPDATE subscribers SET name = $1 WHERE email = $2", [name, email]);
      return res.json({
        success: true,
        isReturning: true,
        message: "You're already on the list — your download is ready.",
      });
    }

    // sequence_step 1 = email 1 sent, next email (2) goes out in 2 days
    await pool.query(
      "INSERT INTO subscribers (name, email, source, sequence_step, next_email_at) VALUES ($1, $2, $3, 1, $4)",
      [name, email, source, daysFromNow(2)],
    );

    console.log(`New subscriber: ${name} <${email}> [${source}]`);

    scheduleEmailSequence({ name, email }).catch((err) =>
      console.error("Email send failed:", err.message),
    );

    return res.status(201).json({
      success: true,
      isReturning: false,
      message: "You're all set! Check your email — the Tech Health Check is on its way.",
    });
  } catch (err) {
    console.error("Subscribe error:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

export const processEmailSequence = async (req, res) => {
  try {
    const due = await pool.query(
      "SELECT * FROM subscribers WHERE sequence_step < 4 AND next_email_at <= NOW()",
    );

    const { email2, email3, email4 } = await import("../emails/templates.js");
    const { sendEmail } = await import("../services/emailService.js");

    let sent = 0;
    for (const sub of due.rows) {
      try {
        let template, nextStep, nextAt;

        if (sub.sequence_step === 1) {
          template = email2(sub.name);
          nextStep = 2;
          nextAt = daysFromNow(3); // day 5 total
        } else if (sub.sequence_step === 2) {
          template = email3(sub.name);
          nextStep = 3;
          nextAt = daysFromNow(3); // day 8 total
        } else if (sub.sequence_step === 3) {
          template = email4(sub.name);
          nextStep = 4;
          nextAt = null;
        }

        if (!template) continue;

        await sendEmail({ to: sub.email, subject: template.subject, html: template.html });
        await pool.query(
          "UPDATE subscribers SET sequence_step = $1, next_email_at = $2 WHERE id = $3",
          [nextStep, nextAt, sub.id],
        );
        sent++;
        console.log(`Sequence email ${nextStep} sent to ${sub.email}`);
      } catch (err) {
        console.error(`Failed to send to ${sub.email}:`, err.message);
      }
    }

    return res.json({ success: true, sent });
  } catch (err) {
    console.error("processEmailSequence error:", err.message);
    return res.status(500).json({ error: "Failed to process email sequence." });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM subscribers ORDER BY created_at DESC");
    return res.json({ count: result.rowCount, subscribers: result.rows });
  } catch (err) {
    console.error("getSubscribers error:", err.message);
    return res.status(500).json({ error: "Failed to fetch subscribers." });
  }
};

export const clearSubscribers = async (req, res) => {
  const token = req.headers["x-admin-token"] || req.query.token;
  const secret = process.env.ADMIN_SECRET;
  if (!secret || token !== secret) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  try {
    const result = await pool.query("DELETE FROM subscribers");
    console.log(`Cleared ${result.rowCount} subscribers.`);
    return res.json({ success: true, deleted: result.rowCount });
  } catch (err) {
    console.error("clearSubscribers error:", err.message);
    return res.status(500).json({ error: "Failed to clear subscribers." });
  }
};

export const markContacted = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE subscribers SET contacted = true, contacted_at = NOW() WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "Subscriber not found." });
    return res.json({ success: true, subscriber: result.rows[0] });
  } catch (err) {
    console.error("markContacted error:", err.message);
    return res.status(500).json({ error: "Failed to update subscriber." });
  }
};
