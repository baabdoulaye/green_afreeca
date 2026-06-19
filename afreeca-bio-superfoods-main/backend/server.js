// backend/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// 💡 1. Import de TOUTES les routes en haut
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stripeRoutes = require("./routes/stripeRoutes"); // <-- L'import Stripe est ici !
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------
// 🛡️ CONFIGURATION CORS
// ----------------------------------------------------
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8080",
    credentials: true,
  }),
);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// ----------------------------------------------------
// ⚙️ MIDDLEWARES DE BASE
// ----------------------------------------------------
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ----------------------------------------------------
// 🔗 CONNEXION MONGODB
// ----------------------------------------------------
const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb://greenafreeca_mongodb:27017/greenafricadb";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté avec succès !"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB:", err));

// ----------------------------------------------------
// 🚀 ROUTES DE L'API
// ----------------------------------------------------
// 💡 2. Déclaration de TOUTES les routes au même endroit
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stripe", stripeRoutes); // <-- La route Stripe est branchée ici !
app.use("/api/contact", contactRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("🚀 API Green Afreeca est opérationnelle !");
});

// ----------------------------------------------------
// 🕵️‍♂️ ROUTE DEBUG
// ----------------------------------------------------
app.get("/api/debug/images", (req, res) => {
  const publicPath = path.join(__dirname, "public");
  try {
    const files = fs.readdirSync(publicPath);
    let imagesFiles = [];
    const imagesPath = path.join(publicPath, "images");
    if (fs.existsSync(imagesPath)) {
      imagesFiles = fs.readdirSync(imagesPath);
    }
    res.json({
      message: "Dossier trouvé !",
      chemin_absolu: publicPath,
      contenu_racine: files,
      contenu_dossier_images: imagesFiles,
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
// 📡 DÉMARRAGE DU SERVEUR (TOUJOURS À LA FIN !)
// ----------------------------------------------------
app.listen(PORT, () => {
  console.log(`📡 Serveur démarré sur : http://localhost:${PORT}`);
});

module.exports = app;
