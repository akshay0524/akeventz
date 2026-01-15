import nodemailer from 'nodemailer';

const transporter =
  process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS
    ? nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
    : null;

export const sendEmail = async ({ to, subject, text }) => {
  if (!transporter) return false;
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'no-reply@pec.edu',
    to,
    subject,
    text,
  });
  return info.messageId;
};
