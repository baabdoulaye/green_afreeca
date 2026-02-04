const Order = require("../models/Order");

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const { items, shippingAddress, totalAmount } = req.body;

  try {
    // Vérification de sécurité de base
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Pas d'articles dans la commande" });
    }

    // Création de l'objet commande selon ton OrderSchema
    const order = new Order({
      // req.user est injecté par le middleware protect
      user: req.user._id,
      orderItems: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        // ON BLINDE ICI : On teste toutes les clés possibles envoyées par le front
        image_url:
          item.image_url ||
          item.image ||
          item.imageUrl ||
          "https://via.placeholder.com/150",
        price: item.price,
        product: item.id || item.product, // On s'assure d'avoir l'ID
      })),
      shippingAddress: {
        street: shippingAddress.street,
        city: shippingAddress.city,
        zip: shippingAddress.zipCode, // Mapping Front (zipCode) -> Back (zip)
        country: shippingAddress.country,
      },
      paymentMethod: "Stripe",
      itemsPrice: totalAmount,
      shippingPrice: 0,
      totalPrice: totalAmount,
      isPaid: true,
      paidAt: Date.now(),
    });

    const createdOrder = await order.save();
    console.log("✅ Commande enregistrée dans MongoDB !");
    res.status(201).json(createdOrder);
  } catch (error) {
    // Si ça foire (ex: erreur de validation Mongoose), on renvoie du JSON !
    console.error("❌ Erreur lors de la sauvegarde :", error.message);
    res.status(500).json({
      message: "Erreur lors de la création de la commande",
      error: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    // On cherche toutes les commandes où l'ID user correspond à celui du token
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des commandes" });
  }
};

module.exports = { addOrderItems, getMyOrders };
