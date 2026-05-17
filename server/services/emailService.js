import nodemailer from "nodemailer";
import { email1, email2, email3, email4 } from "../emails/templates.js";

const createTransport = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

const FROM = `Steven at Ella Tech <${process.env.GMAIL_USER}>`;

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransport();
  await transporter.sendMail({ from: FROM, to, subject, html });
};

export const scheduleEmailSequence = async ({ name, email }) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("Gmail credentials not set — skipping email sequence.");
    return;
  }

  const template = email1(name);
  await sendEmail({ to: email, subject: template.subject, html: template.html });
  console.log(`Email 1 sent to ${email}`);
};
