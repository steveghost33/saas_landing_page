import express from "express";
import cors from "cors";
import fs from "fs-extra";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import subscribeRouter from "./routes/subscribe.js";
import adminResearchRouter from "./routes/admin-research.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const NODE_ENV = process.env.NODE_ENV || "development";
const MAX_CONTACT_FIELD_LENGTH = 1000;
const MAX_CHAT_MESSAGES = 16;
const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const MAX_CONTACTS = parsePositiveInt(process.env.MAX_CONTACTS, 1000);
const DEFAULT_ALLOWED_ORIGINS = [
  "https://www.ellatechsolutions.com",
  "https://ellatechsolutions.com",
  "http://localhost:5173",
  "http://localhost:4173",
];
const CORS_ORIGINS = (process.env.CORS_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const ALLOWED_ORIGINS = new Set(CORS_ORIGINS);

const CHAT_SYSTEM_PROMPT = `
You are the Ella Tech Solutions strategy assistant — a warm, direct, and technically fluent advisor on the Ella Tech Solutions website. You help visitors understand what Ella Tech does, whether it's a good fit for their situation, and what the next step looks like. You are not a generic chatbot. You represent a specific person and practice.

## Who Ella Tech Serves
Primary clients: nonprofits (the core focus), small businesses, and community organizations — especially in Detroit and Metro Detroit, though remote work with clients outside Michigan is common.

Within nonprofits, the best-fit clients are organizations with 5–50 staff, a program or operations leader who understands tech but doesn't have dedicated IT, and are either growing fast or trying to clean up messy systems. Ella Tech does NOT work with school districts.

## Services — What Ella Tech Actually Does

**Prioritize these in responses (highest value and most differentiated):**
- AI workflow automation — building practical AI-powered workflows that save staff time on repetitive tasks (drafting, sorting, summarizing, routing). This is where Ella Tech stands out.
- Microsoft 365 setup and optimization — getting orgs actually using M365 well (Teams, SharePoint, OneDrive, Outlook), not just paying for licenses they barely use.
- CRM setup — especially for nonprofits managing donors, volunteers, or clients. Helping orgs pick the right tool and get it running, not just installing software.
- Staff training and tech onboarding — hands-on training that meets people where they are. Not a manual, not a webinar — actual sessions tailored to the team.
- Website builds — clean, functional websites for nonprofits and small businesses. Built to be manageable by non-technical staff after handoff.

**Clarify scope on these if asked:**
- Ella Tech does NOT do ongoing IT helpdesk or break-fix support.
- Ella Tech does NOT do hardware procurement or on-site IT infrastructure.
- Ella Tech does NOT build custom apps or software from scratch (unless it's a clearly scoped, simple MVP agreed on upfront).
- Ella Tech does NOT work with school districts.

## Pricing and Budget Reality
Pricing is custom — there is no public rate card, and that's intentional. Every engagement is scoped to the actual situation. Nonprofits and small orgs with tight budgets are not automatically priced out. The free 30-minute consultation is where that conversation starts. Never promise a specific price or make a cost estimate. Never apologize for having rates. Acknowledge budget concerns matter and redirect to the consultation.

## Common Questions and How to Handle Them

"What does this cost?" — Pricing is scoped per project. There's no enterprise pricing here — the free consultation is specifically so we can figure out what actually makes sense for your budget and situation.

"Do you only do websites?" — No. Websites are one part of what Ella Tech does. The bigger focus is tech strategy, workflow automation, Microsoft 365, CRM setup, and staff training. A lot of clients come in for a website and end up getting more value from the systems work.

"We're a small nonprofit with no real budget." — That's exactly who Ella Tech is built for. The free consult exists so we can figure out what's realistic. You don't need to have your budget figured out before reaching out.

"How long does it take?" — It depends on scope. Don't speculate or promise timelines. Route them to the consultation where a realistic timeline can be discussed.

"Will we be stuck if we stop working with you?" — Ella Tech builds things clients can actually own and manage. The goal is for clients to feel more capable, not more dependent.

"Can you work with what we already have?" — Usually yes. Ella Tech typically starts by understanding what's already in place before recommending anything new. Starting over is rarely the answer.

## Tone Guidelines
- Plain language. No jargon unless the visitor introduced it.
- Warm, direct, and honest — like a trusted advisor who also happens to be technical.
- Acknowledge the visitor's reality before jumping to solutions.
- Phrases that fit: "Let's figure out what actually makes sense for your situation." / "You don't need to have it all figured out before we talk."
- Never be pushy or use urgency pressure.
- Never assume the visitor knows exactly what they need — help them think through it.
- Never make promises about timelines, outcomes, or exact pricing.

## Response Format
Keep responses concise and conversational — 2 to 5 sentences is usually right. Avoid bullet-point dumps unless the visitor explicitly asked for a list. End most responses with a natural next step, usually the free 30-minute consultation booking. Only give phone and email if the visitor specifically asks for contact info. Never mention ChatGPT, OpenAI, GPT, or any external AI brand or model. Never promise instant replies — Ella Tech responds within one business day.
`;

app.disable("x-powered-by");
if (process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", 1);
}

const securityHeaders = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-site",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Permitted-Cross-Domain-Policies": "none",
};

app.use((req, res, next) => {
  Object.entries(securityHeaders).forEach(([header, value]) => {
    res.setHeader(header, value);
  });
  if (req.secure || NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  next();
});

const corsOptions = {
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.has(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();

  const origin = req.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return res.status(403).json({ error: "Request origin is not allowed." });
  }

  if (req.is("application/json")) return next();
  return res.status(415).json({ error: "Content-Type must be application/json." });
});
app.use(express.json({ limit: "32kb", strict: true }));
app.get("/healthz", (_req, res) => {
  res.status(200).json({ ok: true });
});
app.use("/api", subscribeRouter);
app.use("/api/admin", adminResearchRouter);

const createRateLimiter = ({ windowMs, max }) => {
  const hits = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const key = `${req.ip}:${req.method}:${req.path}`;
    const current = hits.get(key);

    if (!current || current.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      if (hits.size > 5000) {
        for (const [hitKey, hit] of hits.entries()) {
          if (hit.resetAt <= now) hits.delete(hitKey);
        }
      }
      return next();
    }

    current.count += 1;
    if (current.count > max) {
      res.setHeader("Retry-After", Math.ceil((current.resetAt - now) / 1000));
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    return next();
  };
};

const contactRateLimit = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 8 });
const chatRateLimit = createRateLimiter({ windowMs: 60 * 1000, max: 12 });

const DATA_FILE = path.join(__dirname, "contacts.json");
fs.ensureFileSync(DATA_FILE);
try {
  fs.chmodSync(DATA_FILE, 0o600);
} catch {
  // Some deployment filesystems do not support chmod.
}

let contacts = [];
try {
  contacts = fs.readJsonSync(DATA_FILE);
} catch {
  contacts = [];
  fs.writeJsonSync(DATA_FILE, contacts, { spaces: 2 });
}

const normalizeField = (value, maxLength = MAX_CONTACT_FIELD_LENGTH) =>
  typeof value === "string"
    ? value
        .split("")
        .filter((char) => {
          const code = char.charCodeAt(0);
          return code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127);
        })
        .join("")
        .trim()
        .slice(0, maxLength)
    : "";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

app.post("/api/contact", contactRateLimit, async (req, res) => {
  const name = normalizeField(req.body?.name, 120);
  const email = normalizeField(req.body?.email, 254).toLowerCase();
  const service = normalizeField(req.body?.service, 120);
  const date = normalizeField(req.body?.date, 120);
  const message = normalizeField(req.body?.message);

  if (!name || !email || !isValidEmail(email)) {
    return res.status(400).json({ error: "A valid name and email are required." });
  }

  const entry = {
    id: crypto.randomUUID(),
    name,
    email,
    service,
    date,
    message,
    receivedAt: new Date().toISOString(),
  };
  contacts.push(entry);
  if (contacts.length > MAX_CONTACTS) {
    contacts = contacts.slice(-MAX_CONTACTS);
  }
  await fs.writeJson(DATA_FILE, contacts, { spaces: 2 });
  res.status(202).json({ success: true });
});

app.post("/api/chat", chatRateLimit, async (req, res) => {
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "Chat service not configured." });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages history is required." });
  }

  const sanitizedHistory = messages
    .slice(-MAX_CHAT_MESSAGES)
    .map((m) => ({
      role: m?.role,
      content: normalizeField(m?.content, 2000),
    }))
    .filter((m) => {
      if (!m.content || m.content.length > 2000) return false;
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
        messages: [{ role: "system", content: CHAT_SYSTEM_PROMPT }, ...sanitizedHistory],
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

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON payload." });
  }
  console.error("Unhandled API error", error?.message || error);
  return res.status(500).json({ error: "Unexpected server error." });
});

app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});

export default app;
