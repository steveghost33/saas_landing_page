import {
  BOOKING_ONLY_CTA,
  CONTACT_ONLY_CTA,
  ETS_EMAIL,
  ETS_PHONE,
} from "./chatbotConfig.js";

export const normalizeTel = (phone) => {
  const digitsOnly = String(phone || "").replace(/[^\d]/g, "");
  if (!digitsOnly) return "";
  return digitsOnly.length === 10 ? `+1${digitsOnly}` : `+${digitsOnly}`;
};

export const makeSpacing = (text) =>
  String(text || "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export const stripContactArtifacts = (text) => {
  let value = String(text || "");
  value = value.replace(/^\s*#contact\s*$/gim, "");
  value = value.replace(/https?:\/\/\S*#contact\b/gi, "");
  value = value.replace(/\s#contact\b/gi, "");
  value = value.replace(/#contact\b/gi, "");
  return makeSpacing(value);
};

export const stripChatgptArtifacts = (text) => {
  let value = String(text || "");
  value = value.replace(/https?:\/\/(?:chat\.openai\.com|chatgpt\.com)\S*/gi, "");
  value = value.replace(/\bChatGPT\b/gi, "this assistant");
  value = value.replace(/\bOpenAI\b/gi, "");
  value = value.replace(/\bGPT\b/gi, "");
  value = value.replace(/\(\s*\)/g, "");
  value = value.replace(/\s{2,}/g, " ");
  return makeSpacing(value);
};

export const ensureQuestionMarks = (text) => {
  const lines = String(text || "").split("\n");
  const fixed = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return line;

    const looksLikeQuestion =
      /^(what|which|who|when|where|why|how|do you|are you|can you|could you|would you|is it|are there|does|did)\b/i.test(
        trimmed
      );
    const alreadyHasQuestionMark = trimmed.endsWith("?");
    const endsWithPunctuation = /[.:]$/.test(trimmed);

    if (looksLikeQuestion && !alreadyHasQuestionMark && !endsWithPunctuation) {
      return `${trimmed}?`;
    }

    return line;
  });

  return fixed.join("\n");
};

export const cleanBotText = (text) =>
  makeSpacing(ensureQuestionMarks(stripChatgptArtifacts(stripContactArtifacts(text))));

const normalize = (text) => String(text || "").toLowerCase().trim();
const containsAny = (text, phrases) => phrases.some((phrase) => text.includes(phrase));

export const userAskedForPhoneOrEmail = (text) => {
  const normalized = normalize(text);
  return containsAny(normalized, [
    "phone",
    "call",
    "telephone",
    "number",
    "email",
    "e-mail",
    "contact",
    "reach you",
    "reach out",
    "how do i contact",
    "how can i contact",
  ]);
};

export const intentFromText = (text) => {
  const normalized = normalize(text);

  const hasTraining =
    normalized.includes("staff training") ||
    (normalized.includes("training") && !normalized.includes("strength training")) ||
    normalized.includes("workshop");
  const hasConsulting =
    normalized.includes("tech consulting") ||
    normalized.includes("technology consulting") ||
    normalized.includes("consulting") ||
    normalized.includes("consultant");
  const hasSupport =
    normalized.includes("support") ||
    normalized.includes("help desk") ||
    normalized.includes("troubleshoot") ||
    normalized.includes("ongoing help") ||
    normalized.includes("it help") ||
    normalized.includes("fix") ||
    normalized.includes("broken");
  const hasQuote =
    normalized.includes("get a quote") ||
    normalized.includes("quote") ||
    normalized.includes("estimate") ||
    normalized.includes("pricing") ||
    normalized.includes("cost") ||
    normalized.includes("how much");

  if (hasTraining) return "staff_training";
  if (hasConsulting) return "tech_consulting";
  if (hasSupport) return "support";
  if (hasQuote) return "get_quote";
  return "";
};

export const serviceReply = (intent) => {
  if (intent === "tech_consulting") {
    return makeSpacing(
      `Tech consulting helps you make smart decisions and fix problems without guessing.\n\n` +
        `What it can include:\n` +
        `1. Review your current setup and goals\n` +
        `2. Recommend tools, workflows, and next steps\n` +
        `3. Create a plan and provide hands on implementation if needed\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "staff_training") {
    return makeSpacing(
      `Staff training helps your team use the tools correctly and consistently.\n\n` +
        `What it can include:\n` +
        `1. Live sessions tailored to your roles\n` +
        `2. Simple guides and walkthroughs your team can reuse\n` +
        `3. Practice time, Q and A, and follow up support\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "support") {
    return makeSpacing(
      `Support helps you troubleshoot issues and keep your technology running reliably.\n\n` +
        `What it can include:\n` +
        `1. Diagnose the problem and stabilize the issue\n` +
        `2. Fixes for accounts, email, Microsoft 365, devices, and websites\n` +
        `3. Ongoing support options if you need a long term partner\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "get_quote") {
    return makeSpacing(
      `Quotes depend on scope, timeline, and what you want done.\n\n` +
        `What we confirm during a consultation:\n` +
        `1. Your goal and what success looks like\n` +
        `2. The work required and recommended approach\n` +
        `3. Timeline and a clear price range or quote\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  return "";
};

export const contactReply = () => makeSpacing(CONTACT_ONLY_CTA);
export const isContactLine = (line) => line.includes(ETS_PHONE) || line.includes(ETS_EMAIL);

