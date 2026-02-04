// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware"); // Ton middleware de protection

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders); // Nouvelle route protégée

module.exports = router;
