const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Créer un transporteur (Pour l'instant on configure pour un SMTP générique comme Mailtrap ou Gmail)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // 2. Définir les options de l'email
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Envoyer l'email
  const info = await transporter.sendMail(message);
  console.log("Message envoyé : %s", info.messageId);
};

module.exports = sendEmail;
