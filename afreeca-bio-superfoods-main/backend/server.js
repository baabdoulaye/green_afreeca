// backend/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
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

// ----------------------------------------------------
// ⚙️ MIDDLEWARES DE BASE
// ----------------------------------------------------
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public")); // Pour les fichiers statiques du backend si besoin

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
app.use("/api/orders", orderRoutes); // Ajouté et groupé ici pour la clarté

// Route de test
app.get("/", (req, res) => {
  res.send("🚀 API Green Afreeca est opérationnelle !");
});

// ----------------------------------------------------
// 📡 DÉMARRAGE DU SERVEUR
// ----------------------------------------------------
app.listen(PORT, () => {
  console.log(`📡 Serveur démarré sur : http://localhost:${PORT}`);
});
