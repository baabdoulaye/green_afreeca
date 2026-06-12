const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    // 1. Créer un transporteur sécurisé
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465, // true pour le port 465 (SMTPS), false pour les autres
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      // 🛡️ SÉCURITÉ / ROBUSTESSE DOCKER : Évite les blocages de certificats SSL auto-signés en dev
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
    });

    // 2. Définir les options de l'email
    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message, // Version texte brut (fallback pour l'accessibilité)
      html: options.html || null, // 💡 NOUVEAU : Permet d'envoyer du HTML si disponible !
    };

    // 3. Envoyer l'email
    const info = await transporter.sendMail(message);
    console.log(
      "📡 [Nodemailer] Message envoyé avec succès : %s",
      info.messageId,
    );
    return info;
  } catch (error) {
    console.error(
      "❌ [Nodemailer Error] Échec de l'envoi de l'email :",
      error.message,
    );
    throw new Error(
      "Le service d'envoi d'emails a rencontré une erreur technique.",
    );
  }
};

module.exports = sendEmail;
