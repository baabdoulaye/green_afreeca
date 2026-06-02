// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} = require("../controllers/orderController");

// 💡 IMPORT de la sécurité
const { protect, authorize } = require("../middleware/authMiddleware");

// 🔒 ROUTE SÉCURISÉE : L'admin doit être validé pour faire le "get" !
router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, authorize("admin"), getOrders);

// Route pour l'historique perso (Client)
router.route("/myorders").get(protect, getMyOrders);

// 🔒 ROUTE SÉCURISÉE : Seul l'admin peut livrer
router
  .route("/:id/deliver")
  .put(protect, authorize("admin"), updateOrderToDelivered);

module.exports = router;
