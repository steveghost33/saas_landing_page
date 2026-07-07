import pool from "../db/pool.js";
import { email2, email3, email4 } from "../emails/templates.js";
import { sendEmail } from "../services/emailService.js";

const daysFromNow = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

export const runDueEmailSequence = async () => {
  const due = await pool.query(
    "SELECT * FROM subscribers WHERE sequence_step < 4 AND next_email_at IS NOT NULL AND next_email_at <= NOW()",
  );

  let sent = 0;

  for (const sub of due.rows) {
    try {
      let template;
      let nextStep;
      let nextAt;

      if (sub.sequence_step === 1) {
        template = email2(sub.name, sub.research_data);
        nextStep = 2;
        nextAt = daysFromNow(3);
      } else if (sub.sequence_step === 2) {
        template = email3(sub.name);
        nextStep = 3;
        nextAt = daysFromNow(3);
      } else if (sub.sequence_step === 3) {
        template = email4(sub.name);
        nextStep = 4;
        nextAt = null;
      }

      if (!template) continue;

      await sendEmail({ to: sub.email, subject: template.subject, html: template.html });
      await pool.query(
        "UPDATE subscribers SET sequence_step = $1, next_email_at = $2 WHERE id = $3",
        [nextStep, nextAt, sub.id],
      );
      sent++;
      console.log(`Sequence email ${nextStep} sent to ${sub.email}`);
    } catch (err) {
      console.error(`Failed to send to ${sub.email}:`, err.message);
    }
  }

  return { sent, checked: due.rows.length };
};
