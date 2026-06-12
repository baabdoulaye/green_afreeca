// backend/controllers/contactController.js
// 💡 On importe ton utilitaire qui contient DÉJÀ la bonne configuration !
const sendEmail = require("../utils/sendEmail");

// @desc    Envoyer un email depuis le formulaire de contact
// @route   POST /api/contact
// @access  Public
const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // On formatte le contenu du mail
    const mailOptions = {
      email: "green-afreeca@outlook.fr", // 👈 L'adresse qui reçoit le message (la tienne)
      subject: `Nouveau message de ${name} : ${subject}`,
      message: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // On utilise ta fonction qui marche déjà
    await sendEmail(mailOptions);

    res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur d'envoi d'email via utils:", error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
  }
};

module.exports = {
  sendContactEmail,
};
