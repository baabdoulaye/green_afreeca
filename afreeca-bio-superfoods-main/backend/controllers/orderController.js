const Order = require("../models/Order");

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Private (Nécessite d'être connecté)
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "Pas d'articles dans la commande" });
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id, // Récupéré via ton middleware d'auth
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

module.exports = { addOrderItems };
