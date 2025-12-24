// backend/models/Order.js
const mongoose = require("mongoose");

// Schéma pour les articles individuels dans la commande
// Nous 'copions' ici les infos essentielles du produit au moment de l'achat
const OrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image_url: { type: String, required: true },
  price: { type: Number, required: true },
  // Référence à l'ID du produit dans la collection Product
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product", // Fait référence au modèle Product
  },
});

const OrderSchema = new mongoose.Schema(
  {
    // 1. Client (Lien vers l'utilisateur)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Fait référence au modèle User
    },

    // 2. Détails des Articles
    orderItems: [OrderItemSchema], // Utilise le sous-schéma défini ci-dessus

    // 3. Informations de Livraison
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },

    // 4. Prix et Paiement
    paymentMethod: {
      type: String,
      required: true,
      default: "Stripe", // Nous utilisons Stripe comme demandé
    },
    paymentResult: {
      // Informations retournées par Stripe (ID de transaction, statut)
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: {
      // Total du prix des articles (hors frais de port)
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      // Frais de livraison
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      // Total final facturé au client
      type: Number,
      required: true,
      default: 0.0,
    },

    // 5. Statut de la Commande
    isPaid: {
      // Paiement effectué
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      // Date du paiement
      type: Date,
    },
    isDelivered: {
      // Commande livrée
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      // Date de livraison
      type: Date,
    },
  },
  { timestamps: true }
); // Ajoute createdAt et updatedAt

module.exports = mongoose.model("Order", OrderSchema);
