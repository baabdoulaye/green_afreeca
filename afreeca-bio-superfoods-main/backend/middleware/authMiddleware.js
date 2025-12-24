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
    // NOTE: Le mot de passe n'est pas sélectionné par défaut, c'est sécurisé.
    req.user = await User.findById(decoded.id);

    next(); // Passe au contrôleur suivant
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      success: false,
      error: "Jeton non valide ou expiré.",
    });
  }
};
// backend/middleware/authMiddleware.js (Ajoute ceci)

// Fonction pour vérifier le rôle de l'utilisateur (ex: doit être 'admin')
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Vérifie si le rôle de l'utilisateur (req.user.role) est inclus dans les rôles autorisés (roles)
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Accès refusé. Le rôle ${req.user.role} n'est pas autorisé.`,
      });
    }
    next();
  };
};
