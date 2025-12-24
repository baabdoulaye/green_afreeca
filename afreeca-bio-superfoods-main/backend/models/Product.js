// backend/models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    // Identifiants
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      // URL lisible (ex: jus-de-bouille-baobab)
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // Description et Marketing
    description: {
      type: String,
      required: true,
    },
    // Par exemple, 'Le jus de Bouille est 6x plus riche en Vitamine C'
    marketing_claim: {
      type: String,
      default: "",
    },

    // Prix et Stock
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    is_bio: {
      // Pour confirmer l'argument Bio
      type: Boolean,
      default: true,
    },

    // Images et Catégorie
    category: {
      // Ex: 'Poudre', 'Jus', 'Infusion'
      type: String,
      required: true,
      trim: true,
    },
    image_url: {
      type: String,
      required: true,
    },

    // Avis (Pour la structure du composant front-end)
    rating: {
      type: Number,
      default: 0, // Note moyenne
    },
    num_reviews: {
      type: Number,
      default: 0, // Nombre total d'avis
    },
  },
  { timestamps: true }
); // Ajoute automatiquement createdAt et updatedAt

module.exports = mongoose.model("Product", ProductSchema);
