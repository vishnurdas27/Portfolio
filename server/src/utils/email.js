import nodemailer from 'nodemailer';

// Sends a contact-form notification email IF SMTP is configured in .env.
// When SMTP_* vars are missing this is a no-op, so contact still works
// (messages are always persisted to the DB regardless).
export async function sendContactEmail({ name, email, subject, message }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${SMTP_USER}>`,
    to: CONTACT_TO || SMTP_USER,
    replyTo: email,
    subject: `[Portfolio] ${subject || 'New message'} — from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}
