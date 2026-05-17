import { Resend } from "resend";
import { email1, email2, email3, email4 } from "../emails/templates.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Steven at Ella Tech <info@ellatechsolutions.com>`;

export const sendEmail = async ({ to, subject, html }) => {
  console.log(`Attempting to send email to ${to} — subject: ${subject}`);
  const { error } = await resend.emails.send({ from: FROM, to, subject, html });
  if (error) throw new Error(error.message);
  console.log(`Email sent successfully to ${to}`);
};

export const scheduleEmailSequence = async ({ name, email }) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email sequence.");
    return;
  }
  console.log(`Starting email sequence for ${email}`);
  const template = email1(name);
  await sendEmail({ to: email, subject: template.subject, html: template.html });
};

export { email2, email3, email4 };
