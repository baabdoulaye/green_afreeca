const express = require("express");
const router = express.Router();
const { addOrderItems } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware"); // Ton middleware de protection

router.route("/").post(protect, addOrderItems);

module.exports = router;
