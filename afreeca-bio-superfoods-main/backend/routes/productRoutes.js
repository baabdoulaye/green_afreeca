// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// 💡 IMPORT de la sécurité complète
const { protect, authorize } = require("../middleware/authMiddleware");

// --- ROUTES DES PRODUITS ---

// Route pour l'ensemble des produits
router
  .route("/")
  .get(getProducts) // Public : Voir tous les produits
  .post(protect, authorize("admin"), createProduct); // 🔒 Sécurisé : Ajouter

// Route pour un produit spécifique via son ID
router
  .route("/:id")
  .get(getProductById) // Public : Voir les détails d'un produit
  .put(protect, authorize("admin"), updateProduct) // 🔒 Sécurisé : Modifier
  .delete(protect, authorize("admin"), deleteProduct); // 🔒 Sécurisé : Supprimer

module.exports = router;
