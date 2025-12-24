// backend/server.js
const express = require("express");
const cors = require("cors"); // Importé
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------
// 🛡️ CONFIGURATION CORS (A placer AVANT les routes)
// ----------------------------------------------------
app.use(
  cors({
    origin: "http://localhost:8080", // L'adresse de ton Front-end
    credentials: true, // Permet de s'échanger les cookies/tokens
  })
);

app.use(express.json());
app.use(express.static("public"));
// Cela permet d'accéder aux fichiers dans le dossier /backend/public
app.use(cookieParser());

// Connexion MongoDB
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/greenafricadb";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connecté !"))
  .catch((err) => console.error("Erreur MongoDB:", err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Green Afreeca lancée !");
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
