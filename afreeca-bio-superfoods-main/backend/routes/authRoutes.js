// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();

// 💡 C'est ici qu'il manquait les imports !
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// Route d'inscription
router.post("/register", register);

// Route de connexion
router.post("/login", login);

// Route de mot de passe oublié
router.post("/forgotpassword", forgotPassword);

// Route de réinitialisation du mot de passe
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
