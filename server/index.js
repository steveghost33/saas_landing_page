import express from "express";
import cors from "cors";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_CONTACT_FIELD_LENGTH = 1000;
const MAX_CHAT_MESSAGES = 16;
const CORS_ORIGINS = process.env.CORS_ORIGINS
  ?.split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = CORS_ORIGINS?.length
  ? {
      origin(origin, callback) {
        if (!origin || CORS_ORIGINS.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
      },
    }
  : {};

app.use(cors(corsOptions));
app.use(express.json({ limit: "32kb" }));

const DATA_FILE = path.join(__dirname, "contacts.json");
fs.ensureFileSync(DATA_FILE);

let contacts = [];
try {
  contacts = fs.readJsonSync(DATA_FILE);
} catch {
  contacts = [];
  fs.writeJsonSync(DATA_FILE, contacts, { spaces: 2 });
}

const normalizeField = (value, maxLength = MAX_CONTACT_FIELD_LENGTH) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

app.post("/api/contact", async (req, res) => {
  const name = normalizeField(req.body?.name, 120);
  const email = normalizeField(req.body?.email, 254).toLowerCase();
  const service = normalizeField(req.body?.service, 120);
  const date = normalizeField(req.body?.date, 120);
  const message = normalizeField(req.body?.message);

  if (!name || !email || !isValidEmail(email)) {
    return res.status(400).json({ error: "A valid name and email are required." });
  }

  const entry = {
    id: Date.now(),
    name,
    email,
    service,
    date,
    message,
    receivedAt: new Date().toISOString(),
  };
  contacts.push(entry);
  await fs.writeJson(DATA_FILE, contacts, { spaces: 2 });
  res.json({ success: true, entry });
});

app.post("/api/chat", async (req, res) => {
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "Chat service not configured." });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages history is required." });
  }

  let systemIncluded = false;
  const sanitizedHistory = messages
    .slice(-MAX_CHAT_MESSAGES)
    .map((m) => ({
      role: m?.role,
      content: typeof m?.content === "string" ? m.content.trim() : "",
    }))
    .filter((m) => {
      if (!m.content || m.content.length > 2000) return false;
      if (m.role === "system") {
        if (systemIncluded) return false;
        systemIncluded = true;
        return true;
      }
      return m.role === "user" || m.role === "assistant";
    });

  if (sanitizedHistory.length === 0) {
    return res.status(400).json({ error: "Invalid message history." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: sanitizedHistory,
        max_tokens: 350,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI chat error", response.status);
      return res.status(502).json({ error: "Chat service unavailable." });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ error: "No response from chat provider." });
    }

    res.json({ reply });
  } catch (error) {
    console.error("OpenAI chat error", error.message);
    res.status(502).json({ error: "Chat service unavailable." });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});

export default app;
