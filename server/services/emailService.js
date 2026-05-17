import nodemailer from "nodemailer";
import { email1, email2, email3, email4 } from "../emails/templates.js";

const createTransport = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      // Strip spaces in case app password was saved with spaces
      pass: (process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, ""),
    },
  });

const FROM = `Steven <${process.env.GMAIL_USER}>`;

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransport();
  console.log(`Attempting to send email to ${to} — subject: ${subject}`);
  await transporter.sendMail({ from: FROM, to, subject, html });
  console.log(`Email sent successfully to ${to}`);
};

export const scheduleEmailSequence = async ({ name, email }) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("Gmail credentials not set — skipping email sequence.");
    return;
  }

  console.log(`Starting email sequence for ${email}`);
  const template = email1(name);
  await sendEmail({ to: email, subject: template.subject, html: template.html });
};

export { email2, email3, email4 };
