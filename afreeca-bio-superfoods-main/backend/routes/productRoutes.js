const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

// On garde les imports de middleware mais on ne les utilise pas pour l'instant
const { protect, authorize } = require("../middleware/authMiddleware");

// --- ROUTES DE TEST (SANS PROTECT) ---

router.route("/").get(getProducts).post(createProduct); // Protection retirée temporairement

router.route("/:id").get(getProductById).delete(deleteProduct); // Protection retirée temporairement

module.exports = router;
