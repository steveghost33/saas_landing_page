import { BOOKING_HASH, CONTACT_EMAIL, CONTACT_PHONE } from "../../data/site.js";

export const TOGGLE_SIZE = 60;
export const DOCK_MARGIN = 16;
export const DOCK_GAP = 12;
export const CHATBOT_EVENT_MOBILE_MENU = "ets:mobileMenu";

export const ETS_BOOKING_URL = BOOKING_HASH;
export const ETS_PHONE = CONTACT_PHONE;
export const ETS_EMAIL = CONTACT_EMAIL;

export const BOOKING_ONLY_CTA = "Next step: [[ETS_BOOK]]";
export const CONTACT_ONLY_CTA =
  "Phone: [[ETS_PHONE]]\nEmail: [[ETS_EMAIL]]\n\nElla Tech Solutions replies within one business day.";

export const INITIAL_MESSAGES = [
  { from: "bot", text: "Hi! I'm the Ella Tech Strategy Expert. Ask me anything about our services, pricing, or how to get started." },
];

export const QUICK_ACTIONS = [
  "What do you do?",
  "Services & pricing",
  "LMS or HRIS help",
  "Get a quote",
];
