import { BOOKING_HASH, CONTACT_EMAIL, CONTACT_PHONE } from "../../data/site.js";

export const TOGGLE_SIZE = 60;
export const DOCK_MARGIN = 16;
export const DOCK_GAP = 12;
export const CHATBOT_EVENT_MOBILE_MENU = "ets:mobileMenu";

export const ETS_BOOKING_URL = BOOKING_HASH;
export const ETS_PHONE = CONTACT_PHONE;
export const ETS_EMAIL = CONTACT_EMAIL;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";
export const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat`;

export const BUSINESS_SYSTEM_PROMPT = `
You are the official Ella Tech Solutions website assistant.

Primary focus
Technology consulting, staff training, and ongoing technology support.

Additional services
Website development and redesign
Website maintenance and troubleshooting
Automation and digital workflows

Tone
Professional, clear, friendly, and confident.
You represent a real business, not a generic AI assistant.

Rules
1. Keep answers short, clear, and action oriented.
2. When the visitor asks about Support, Tech Consulting, or Staff Training, include a few plain language details about what that service includes.
3. After describing the service, route them to book a free 30 minute consultation.
4. Only provide phone and email if the visitor asks for phone, call, email, or contact info.
5. Never promise instant replies. State that Ella Tech Solutions replies within one business day.
6. Never mention ChatGPT, OpenAI, GPT, or any external AI brand. Never include links to any AI site.

Official contact
Phone: ${CONTACT_PHONE}
Email: ${CONTACT_EMAIL}
Scheduling: Use the website contact section to book a free 30 minute consultation.
`;

export const BOOKING_ONLY_CTA = "Next step: [[ETS_BOOK]]";
export const CONTACT_ONLY_CTA =
  "Phone: [[ETS_PHONE]]\nEmail: [[ETS_EMAIL]]\n\nElla Tech Solutions replies within one business day.";

export const INITIAL_MESSAGES = [
  { from: "bot", text: "Hi! I'm the Ella Tech Strategy Expert. How can I help?" },
];

export const QUICK_ACTIONS = [
  "Tech consulting",
  "Staff training",
  "Support",
  "Get a quote",
];
