const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getOrders, // <-- Nouvelle fonction Admin
  updateOrderToDelivered, // <-- Nouvelle fonction Admin
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Route racine : POST pour créer, GET pour que l'admin voit tout
router.route("/").post(protect, addOrderItems).get(protect, getOrders);

// Route pour l'historique perso
router.route("/myorders").get(protect, getMyOrders);

// Route spécifique pour marquer comme livré
router.route("/:id/deliver").put(protect, updateOrderToDelivered);

module.exports = router;
