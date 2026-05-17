import pool from "../db/pool.js";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const normalizeField = (value, maxLength = 255) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export const subscribe = async (req, res) => {
  const name = normalizeField(req.body?.name, 120);
  const email = normalizeField(req.body?.email, 254).toLowerCase();
  const source = normalizeField(req.body?.source, 100) || "crm-setup-checklist";

  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  try {
    const existing = await pool.query("SELECT id FROM subscribers WHERE email = $1", [email]);

    if (existing.rows.length > 0) {
      await pool.query("UPDATE subscribers SET name = $1 WHERE email = $2", [name, email]);
      return res.json({
        success: true,
        message: "You're already on the list — downloads are ready.",
        downloads: {
          checklist: "/downloads/CRM-Setup-Checklist.pdf",
          healthCheck: "/downloads/Tech-Health-Check.pdf",
        },
      });
    }

    await pool.query(
      "INSERT INTO subscribers (name, email, source) VALUES ($1, $2, $3)",
      [name, email, source],
    );

    console.log(`New subscriber: ${name} <${email}> [${source}]`);

    return res.status(201).json({
      success: true,
      message: "Welcome! Your downloads are ready.",
      downloads: {
        checklist: "/downloads/CRM-Setup-Checklist.pdf",
        healthCheck: "/downloads/Tech-Health-Check.pdf",
      },
    });
  } catch (err) {
    console.error("Subscribe error:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
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

export const markContacted = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE subscribers SET contacted = true, contacted_at = NOW() WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Subscriber not found." });
    }
    return res.json({ success: true, subscriber: result.rows[0] });
  } catch (err) {
    console.error("markContacted error:", err.message);
    return res.status(500).json({ error: "Failed to update subscriber." });
  }
};
