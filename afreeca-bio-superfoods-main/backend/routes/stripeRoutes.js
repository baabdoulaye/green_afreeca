const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/stripeController");
const { protect } = require("../middleware/authMiddleware");

// Route sécurisée : il faut être connecté pour générer un lien de paiement
router.post("/create-checkout-session", protect, createCheckoutSession);

module.exports = router;
