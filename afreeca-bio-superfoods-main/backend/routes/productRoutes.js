const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// On garde les imports pour la suite, quand on réactivera la sécurité
const { protect, authorize } = require("../middleware/authMiddleware");

// --- ROUTES DES PRODUITS ---

// Route pour l'ensemble des produits
router
  .route("/")
  .get(getProducts) // Voir tous les produits (Gingembre, Moringa, etc.)
  .post(createProduct); // Ajouter un nouveau super-aliment

// Route pour un produit spécifique via son ID
router
  .route("/:id")
  .get(getProductById) // Voir les détails d'un produit
  .put(updateProduct) // Modifier un prix ou une description
  .delete(deleteProduct); // Supprimer un produit du catalogue

module.exports = router;
