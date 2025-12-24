// backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Déjà importé dans User.js mais bon pour la clarté
const jwt = require("jsonwebtoken");

// ----------------------------------------------------
// Fonction utilitaire pour générer le token (déjà dans User.js)
// ----------------------------------------------------
const sendTokenResponse = (user, statusCode, res) => {
  // Crée le jeton JWT
  const token = user.getSignedJwtToken();

  // Configuration des options du cookie (pour la sécurité)
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
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
    data: user, // Renvoie les infos de l'utilisateur (sans le mdp car select: false)
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
