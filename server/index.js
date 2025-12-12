import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, "contacts.json");
fs.ensureFileSync(DATA_FILE);

let contacts = [];
try {
  contacts = fs.readJsonSync(DATA_FILE);
} catch {
  contacts = [];
  fs.writeJsonSync(DATA_FILE, contacts, { spaces: 2 });
}

app.post("/api/contact", async (req, res) => {
  const { name, email, service, date, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
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
    .map((m) => ({
      role: m?.role,
      content: typeof m?.content === "string" ? m.content.trim() : "",
    }))

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
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenAI chat error", response.status, errorBody);
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