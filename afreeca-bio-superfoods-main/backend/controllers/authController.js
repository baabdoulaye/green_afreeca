// backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Déjà importé dans User.js mais bon pour la clarté
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// ----------------------------------------------------
// Fonction utilitaire pour générer le token (déjà dans User.js)
// ----------------------------------------------------
const sendTokenResponse = (user, statusCode, res) => {
  // Crée le jeton JWT
  const token = user.getSignedJwtToken();

  // Configuration des options du cookie (pour la sécurité)
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ), // Expiration du cookie
    httpOnly: true, // Rendre le cookie inaccessible via JavaScript côté client
  };

  // Si tu es en production (HTTPS), active le cookie sécurisé
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  // Envoie la réponse: le token et le cookie
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user, // 💡 AJOUT : On double l'information pour le frontend qui cherche explicitement data.user
    data: user, // Conserve la structure d'origine pour la compatibilité générale de l'API
  });
};

// @desc    Inscription d'un utilisateur
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Création de l'utilisateur (le hachage du mdp est géré par le middleware dans User.js)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    // Gère l'erreur d'email déjà utilisé (code 11000 de MongoDB)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, error: "Cet email est déjà enregistré." });
    }
    // Gère les autres erreurs de validation
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Connexion de l'utilisateur
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation simple des champs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Veuillez fournir un email ET un mot de passe.",
      });
    }

    // 1. Cherche l'utilisateur dans la BDD (avec le mot de passe grâce à .select('+password'))
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Identifiants invalides." });
    }

    // 2. Vérifie si le mot de passe correspond au hachage stocké
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Identifiants invalides." });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Mot de passe oublié (Envoi du mail)
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Aucun utilisateur trouvé avec cet email",
      });
    }

    // Obtenir le jeton de réinitialisation
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false }); // On sauvegarde le token en BDD

    // Créer l'URL de réinitialisation pointant vers le Frontend (React)
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `Vous recevez cet email car vous avez demandé la réinitialisation de votre mot de passe pour Green Afreeca.\n\nMerci de cliquer sur ce lien pour choisir un nouveau mot de passe : \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Réinitialisation du mot de passe - Green Afreeca",
        message,
      });

      res.status(200).json({ success: true, data: "Email envoyé" });
    } catch (err) {
      console.error(err);
      // Si l'envoi échoue, on efface le token en BDD par sécurité
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res
        .status(500)
        .json({ success: false, error: "L'email n'a pas pu être envoyé" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Réinitialiser le mot de passe
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    // 1. Recréer le hachage du token envoyé dans l'URL pour le comparer avec la BDD
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    // 2. Chercher l'utilisateur avec ce token ET vérifier que le token n'est pas expiré
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Jeton invalide ou expiré" });
    }

    // 3. Définir le nouveau mot de passe
    user.password = req.body.password;

    // 4. Nettoyer les champs de réinitialisation
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // 5. Connecter l'utilisateur automatiquement après le changement
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
