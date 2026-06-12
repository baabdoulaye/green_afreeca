// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Fonction pour protéger les routes (vérifie si l'utilisateur est connecté)
exports.protect = async (req, res, next) => {
  let token;

  // 1. Cherche le token dans l'en-tête (Authorization: Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // 2. Sinon, cherche le token dans le cookie (méthode privilégiée)
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // 3. Vérifie si le token existe
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Accès non autorisé. Pas de jeton.",
    });
  }

  try {
    // 4. Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Récupère l'utilisateur grâce à l'ID décodé
    req.user = await User.findById(decoded.id);

    // 🛡️ SÉCURITÉ ANTI-CRASH : On vérifie que l'utilisateur existe toujours en BDD
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Le compte utilisateur lié à ce jeton n'existe plus.",
      });
    }

    next(); // Passe au contrôleur suivant
  } catch (err) {
    console.error("❌ [Erreur Middleware Protect] :", err.message);
    return res.status(401).json({
      success: false,
      error: "Jeton non valide ou expiré.",
    });
  }
};

// Fonction pour vérifier le rôle de l'utilisateur (ex: doit être 'admin')
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Le req.user est maintenant garanti d'exister grâce à la sécurité du dessus
    console.log(
      `🛡️ [SÉCURITÉ BACKEND] Tentative d'accès. Rôle détecté en BDD : ${req.user ? req.user.role : "aucun"}`,
    );

    // Vérifie si le rôle de l'utilisateur est inclus dans les rôles autorisés
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Accès refusé. Rôle non autorisé.`,
      });
    }
    next();
  };
};
