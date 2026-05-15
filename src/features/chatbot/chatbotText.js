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

  const hasAI =
    normalized.includes("ai") ||
    normalized.includes("artificial intelligence") ||
    normalized.includes("automation") ||
    normalized.includes("workflow") ||
    normalized.includes("automate");
  const hasM365 =
    normalized.includes("microsoft") ||
    normalized.includes("microsoft 365") ||
    normalized.includes("m365") ||
    normalized.includes("office 365") ||
    normalized.includes("teams") ||
    normalized.includes("sharepoint") ||
    normalized.includes("onedrive") ||
    normalized.includes("outlook");
  const hasCRM =
    normalized.includes("crm") ||
    normalized.includes("donor") ||
    normalized.includes("volunteer") ||
    normalized.includes("contact management") ||
    normalized.includes("database");
  const hasWebsite =
    normalized.includes("website") ||
    normalized.includes("web site") ||
    normalized.includes("web design") ||
    normalized.includes("redesign") ||
    normalized.includes("landing page");
  const hasNonprofit =
    normalized.includes("nonprofit") ||
    normalized.includes("non-profit") ||
    normalized.includes("ngo") ||
    normalized.includes("501c") ||
    normalized.includes("community org");
  const hasBudget =
    normalized.includes("budget") ||
    normalized.includes("afford") ||
    normalized.includes("expensive") ||
    normalized.includes("cheap") ||
    normalized.includes("small budget") ||
    normalized.includes("no budget") ||
    normalized.includes("limited budget");
  const hasDependency =
    normalized.includes("stuck") ||
    normalized.includes("dependent") ||
    normalized.includes("dependency") ||
    normalized.includes("locked in") ||
    normalized.includes("stop working") ||
    normalized.includes("after you");
  const hasExisting =
    normalized.includes("already have") ||
    normalized.includes("start over") ||
    normalized.includes("current tools") ||
    normalized.includes("existing") ||
    normalized.includes("what we have") ||
    normalized.includes("replace");
  const hasTraining =
    normalized.includes("staff training") ||
    (normalized.includes("training") && !normalized.includes("strength training")) ||
    normalized.includes("workshop") ||
    normalized.includes("onboard") ||
    normalized.includes("teach");
  const hasConsulting =
    normalized.includes("tech consulting") ||
    normalized.includes("technology consulting") ||
    normalized.includes("consulting") ||
    normalized.includes("consultant") ||
    normalized.includes("strategy") ||
    normalized.includes("advise") ||
    normalized.includes("advice");
  const hasSupport =
    normalized.includes("help desk") ||
    normalized.includes("troubleshoot") ||
    normalized.includes("ongoing help") ||
    normalized.includes("it help") ||
    normalized.includes("broken") ||
    normalized.includes("it support") ||
    normalized.includes("hardware") ||
    normalized.includes("on-site");
  const hasQuote =
    normalized.includes("get a quote") ||
    normalized.includes("quote") ||
    normalized.includes("estimate") ||
    normalized.includes("pricing") ||
    normalized.includes("cost") ||
    normalized.includes("how much") ||
    normalized.includes("rate") ||
    normalized.includes("fee");

  if (hasAI) return "ai_automation";
  if (hasM365) return "m365";
  if (hasCRM) return "crm";
  if (hasWebsite) return "website";
  if (hasNonprofit) return "nonprofit";
  if (hasBudget) return "budget";
  if (hasDependency) return "dependency";
  if (hasExisting) return "existing_tools";
  if (hasTraining) return "staff_training";
  if (hasConsulting) return "tech_consulting";
  if (hasSupport) return "support_scope";
  if (hasQuote) return "get_quote";
  return "fallback";
};

export const serviceReply = (intent) => {
  if (intent === "ai_automation") {
    return makeSpacing(
      `AI workflow automation is one of the highest-value things Ella Tech does — and it's more practical than it sounds.\n\n` +
        `It typically means building workflows that save your team time on repetitive tasks: drafting emails, sorting intake forms, summarizing documents, or routing requests automatically.\n\n` +
        `No coding required on your end. We figure out where your staff is losing time and build something that actually fits how you work.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "m365") {
    return makeSpacing(
      `A lot of organizations are paying for Microsoft 365 and barely using it.\n\n` +
        `Ella Tech helps you actually get value out of it — setting up Teams properly, organizing SharePoint so people can find things, getting OneDrive working across your staff, and cleaning up email chaos in Outlook.\n\n` +
        `You don't need to start over. Usually the licenses you already have are more than enough.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "crm") {
    return makeSpacing(
      `CRM setup is especially common for nonprofits managing donors, volunteers, or program clients.\n\n` +
        `Ella Tech helps you pick the right tool for your size and budget, get it set up correctly, and make sure your team actually uses it — not just another system that collects dust.\n\n` +
        `If you already have something in place that isn't working well, we can usually fix that too rather than starting from scratch.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "website") {
    return makeSpacing(
      `Ella Tech builds clean, functional websites for nonprofits and small businesses — built so your team can manage them after handoff without needing a developer for every update.\n\n` +
        `Whether you need a new site, a redesign, or just want your current site to stop being a headache, the free consultation is where we'd figure out what makes sense.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "nonprofit") {
    return makeSpacing(
      `Nonprofits are Ella Tech's primary focus — especially organizations with 5 to 50 staff who are growing fast or trying to clean up messy systems.\n\n` +
        `The work usually involves getting your tech stack under control: Microsoft 365, CRM, AI-powered workflows, staff training, or a website that actually represents you well.\n\n` +
        `You don't need a big budget or a dedicated IT person to get started. That's exactly what the free consultation is for.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "budget") {
    return makeSpacing(
      `Budget is a real conversation, not a disqualifier.\n\n` +
        `Ella Tech works with nonprofits and small organizations specifically — the free 30-minute consultation exists so we can figure out what's realistic for your situation before anyone commits to anything.\n\n` +
        `You don't need to have your budget figured out before we talk.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "dependency") {
    return makeSpacing(
      `That's a fair concern and worth asking upfront.\n\n` +
        `Ella Tech builds things you can actually own and manage. The goal is for your team to feel more capable after the engagement, not more dependent on outside help.\n\n` +
        `Everything is documented and handed off properly. If you stop working with Ella Tech, you won't be left stuck.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "existing_tools") {
    return makeSpacing(
      `Starting over is rarely the answer.\n\n` +
        `Ella Tech typically starts by understanding what you already have in place before recommending anything new. Most of the time, the tools you're already paying for just need to be set up and used correctly.\n\n` +
        `If something genuinely isn't working, we'll say so — but we won't push you to replace things unless there's a real reason.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "tech_consulting") {
    return makeSpacing(
      `Tech consulting at Ella Tech is less about buzzwords and more about figuring out what actually makes sense for your situation.\n\n` +
        `It usually starts with understanding your current setup, your goals, and where things are breaking down — then building a clear plan and helping you execute it.\n\n` +
        `Most clients come in with a specific problem and leave with a clearer picture of their whole tech stack.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "staff_training") {
    return makeSpacing(
      `Staff training from Ella Tech isn't a webinar or a manual — it's hands-on sessions tailored to your team and the tools you're actually using.\n\n` +
        `Whether it's getting everyone on the same page with Microsoft 365, onboarding new hires to your systems, or just making sure people stop working around tools they don't understand — we meet people where they are.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "support_scope") {
    return makeSpacing(
      `Just to be upfront: Ella Tech doesn't do ongoing IT helpdesk, break-fix support, hardware procurement, or on-site infrastructure work.\n\n` +
        `What Ella Tech does is help you set up and optimize your systems — Microsoft 365, websites, CRMs, AI workflows — so they're stable and your team can manage them confidently.\n\n` +
        `If you're not sure whether your situation fits, the free consultation is a good place to find out.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  if (intent === "get_quote") {
    return makeSpacing(
      `Pricing is scoped per project — there's no standard rate card, and that's intentional.\n\n` +
        `What something costs depends on what you actually need, your timeline, and your situation. The free 30-minute consultation is where that conversation starts, and nobody commits to anything during that call.\n\n` +
        BOOKING_ONLY_CTA
    );
  }

  return makeSpacing(
    `Good question — the free 30-minute consultation is the best place to dig into that.\n\n` +
      `Ella Tech works with nonprofits, small businesses, and community organizations on things like AI workflow automation, Microsoft 365, CRM setup, staff training, and website builds.\n\n` +
      `You don't need to have it all figured out before we talk.\n\n` +
      BOOKING_ONLY_CTA
  );
};

export const contactReply = () => makeSpacing(CONTACT_ONLY_CTA);
export const isContactLine = (line) => line.includes(ETS_PHONE) || line.includes(ETS_EMAIL);

