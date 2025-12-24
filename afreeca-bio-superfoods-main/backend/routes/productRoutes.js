// backend/routes/productRoutes.js (Version mise à jour)
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
} = require("../controllers/productController");
// Importe les middlewares de protection
const { protect, authorize } = require("../middleware/authMiddleware");

// Route principale :
router
  .route("/")
  // GET /api/products (Lecture - Public : pas de middleware)
  .get(getProducts)
  // POST /api/products (Création - Privée/Admin : nécessite protect ET authorize('admin'))
  .post(protect, authorize("admin"), createProduct);

// Route pour obtenir UN produit spécifique (GET /api/products/:id)
router.route("/:id").get(getProductById);

module.exports = router;
