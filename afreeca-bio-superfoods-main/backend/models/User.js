// backend/models/User.js
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Nécessaire pour l'authentification (Tokens)

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Un email unique pour chaque utilisateur
      lowercase: true,
      validate: [validator.isEmail, "Veuillez fournir un email valide"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      // select: true,
    },
    // Rôle pour la gestion des accès (Admin vs Client)
    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
    },
    // Adresses de livraison/facturation (peut être un tableau d'objets ou un modèle séparé)
    addresses: [
      {
        street: String,
        city: String,
        zip: String,
        country: String,
        is_default: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

// ------------------------------------------------------------------
// 🛡️ Middleware de Sécurité (Hashing du mot de passe)
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// 🛡️ Middleware de Sécurité (Hashing du mot de passe)
// ------------------------------------------------------------------
UserSchema.pre("save", async function () {
  // Si le mot de passe n'est pas modifié, on quitte.
  if (!this.isModified("password")) {
    return;
  }

  // Hachage du mot de passe
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// ------------------------------------------------------------------
// 🔑 Méthode pour générer le Token JWT
// ------------------------------------------------------------------
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// ------------------------------------------------------------------
// 🔑 Méthode pour comparer le mot de passe entré avec le hachage
// ------------------------------------------------------------------
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // Attention: 'select: false' est ignoré ici car on a besoin du mot de passe
  // pour la comparaison dans la route de login
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
