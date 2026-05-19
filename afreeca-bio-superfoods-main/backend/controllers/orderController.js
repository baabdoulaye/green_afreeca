const Order = require("../models/Order");
const Product = require("../models/Product"); // On importe le modèle Product pour modifier les stocks

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const { items, shippingAddress, totalAmount } = req.body;

  try {
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Pas d'articles dans la commande" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        image_url:
          item.image_url ||
          item.image ||
          item.imageUrl ||
          "https://via.placeholder.com/150",
        price: item.price,
        product: item.id || item.product,
      })),
      shippingAddress: {
        street: shippingAddress.street,
        city: shippingAddress.city,
        zip: shippingAddress.zipCode,
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

    // --- MISE À JOUR DES STOCKS SÉCURISÉE 📉 ---
    for (const item of createdOrder.orderItems) {
      // On vérifie si l'ID est un ObjectId MongoDB valide (24 caractères hexadécimaux)
      // pour éviter l'erreur "Cast to ObjectId failed"
      if (item.product && /^[0-9a-fA-F]{24}$/.test(item.product.toString())) {
        try {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.quantity },
          });
          console.log(`📉 Stock mis à jour pour : ${item.name}`);
        } catch (stockErr) {
          console.error(`⚠️ Erreur stock pour ${item.name}:`, stockErr.message);
        }
      } else {
        // Si l'ID est "bissap" ou "baobab", on affiche juste un avertissement sans planter
        console.warn(
          `⚠️ ID invalide pour "${item.name}" (${item.product}), stock non déduit.`,
        );
      }
    }
    // --------------------------------

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("❌ Erreur lors de la sauvegarde :", error.message);
    res.status(500).json({
      message: "Erreur lors de la création de la commande",
      error: error.message,
    });
  }
};

// @desc    Récupérer les commandes de l'utilisateur connecté
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
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

// --- NOUVELLES FONCTIONS ADMIN 🚀 ---

// @desc    Récupérer TOUTES les commandes (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    // On récupère tout et on populate pour avoir le nom de l'acheteur
    const orders = await Order.find({})
      .populate("user", "id firstName lastName email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération globale" });
  }
};

// @desc    Mettre à jour une commande en "Livré"
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = "delivered"; // On synchronise aussi le champ texte

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Commande non trouvée" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du statut" });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
