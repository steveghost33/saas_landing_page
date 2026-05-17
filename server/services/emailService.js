import { Resend } from "resend";
import { email1, email2, email3, email4 } from "../emails/templates.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.FROM_EMAIL || "Steven at Ella Tech <info@ellatechsolutions.com>";

const daysFromNow = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

export const scheduleEmailSequence = async ({ name, email }) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email sequence.");
    return;
  }

  const sequence = [
    { template: email1(name), scheduledAt: null },        // immediate
    { template: email2(name), scheduledAt: daysFromNow(2) },
    { template: email3(name), scheduledAt: daysFromNow(5) },
    { template: email4(name), scheduledAt: daysFromNow(8) },
  ];

  for (const { template, scheduledAt } of sequence) {
    const payload = {
      from: FROM,
      to: email,
      subject: template.subject,
      html: template.html,
    };
    if (scheduledAt) payload.scheduledAt = scheduledAt;

    try {
      await resend.emails.send(payload);
    } catch (err) {
      console.error(`Email sequence error (${template.subject}):`, err.message);
    }
  }

  console.log(`Email sequence scheduled for ${email}`);
};
