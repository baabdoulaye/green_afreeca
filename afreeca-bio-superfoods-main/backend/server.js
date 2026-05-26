// backend/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path"); // 💡 Import indispensable pour gérer les chemins absolus
const fs = require("fs"); // 💡 Import pour la route de debug
require("dotenv").config();

// Import des routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------
// 🛡️ CONFIGURATION CORS
// ----------------------------------------------------
app.use(
  cors({
    origin: "http://localhost:8080", // L'adresse de ton Front-end (Vite)
    credentials: true, // Permet l'échange de cookies/tokens entre front et back
  }),
);

// 💡 AJOUT SÉCURITÉ IMAGES : Autorise le navigateur (port 8080) à afficher les ressources du backend (port 3000)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// ----------------------------------------------------
// ⚙️ MIDDLEWARES DE BASE
// ----------------------------------------------------
app.use(express.json());
app.use(cookieParser());

// 💡 CONFIGURATION DES FICHIERS STATIQUES
// Maintenant que le sous-dossier 'images' est dans 'backend/public',
// cette seule ligne suffit pour servir /placeholder.png ET /images/bissap.jpg
app.use(express.static(path.join(__dirname, "public")));

// ----------------------------------------------------
// 🔗 CONNEXION MONGODB
// ----------------------------------------------------
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://greenafreeca_mongodb:27017/greenafricadb";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté avec succès !"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB:", err));

// ----------------------------------------------------
// 🚀 ROUTES DE L'API
// ----------------------------------------------------
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("🚀 API Green Afreeca est opérationnelle !");
});

// ----------------------------------------------------
// 🕵️‍♂️ ROUTE DEBUG : POUR VOIR CE QUE NODE.JS VOIT REELLEMENT
// ----------------------------------------------------
app.get("/api/debug/images", (req, res) => {
  const publicPath = path.join(__dirname, "public");
  try {
    // On vérifie la racine du dossier public
    const files = fs.readdirSync(publicPath);

    // On essaie aussi de lire le sous-dossier images s'il existe
    let imagesFiles = [];
    const imagesPath = path.join(publicPath, "images");
    if (fs.existsSync(imagesPath)) {
      imagesFiles = fs.readdirSync(imagesPath);
    }

    res.json({
      message: "Dossier trouvé !",
      chemin_absolu: publicPath,
      contenu_racine: files,
      contenu_dossier_images: imagesFiles, // Te listera tes images (bissap, moringa...)
    });
  } catch (e) {
    res.status(500).json({
      message: "Dossier public INTROUVABLE ❌",
      erreur: e.message,
      chemin_cherche: publicPath,
    });
  }
});

// ----------------------------------------------------
// 📡 DÉMARRAGE DU SERVEUR
// ----------------------------------------------------
app.listen(PORT, () => {
  console.log(`📡 Serveur démarré sur : http://localhost:${PORT}`);
});
