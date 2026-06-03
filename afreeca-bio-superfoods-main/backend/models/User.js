// backend/models/User.js
const crypto = require("crypto"); // 💡 AJOUT : Requis pour générer le token aléatoire
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Veuillez fournir un email valide"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
    },
    addresses: [
      {
        street: String,
        city: String,
        zip: String,
        country: String,
        is_default: { type: Boolean, default: false },
      },
    ],
    // 💡 AJOUT : Champs pour gérer la réinitialisation du mot de passe
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

// ------------------------------------------------------------------
// 🛡️ Middleware de Sécurité (Hashing du mot de passe)
// ------------------------------------------------------------------
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ------------------------------------------------------------------
// 🔑 Méthode pour générer le Token JWT (Connexion normale)
// ------------------------------------------------------------------
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// ------------------------------------------------------------------
// 🔑 Méthode pour comparer le mot de passe
// ------------------------------------------------------------------
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ------------------------------------------------------------------
// 🔐 NOUVEAU : Méthode pour générer le Token de réinitialisation
// ------------------------------------------------------------------
UserSchema.methods.getResetPasswordToken = function () {
  // 1. On génère un jeton aléatoire sécurisé (20 octets convertis en hexadécimal)
  const resetToken = crypto.randomBytes(20).toString("hex");

  // 2. On hache ce jeton avec l'algorithme sha256 et on le stocke dans le modèle
  // (C'est ce hachage qui sera sauvegardé en base de données)
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 3. On définit une date d'expiration (10 minutes à partir de maintenant)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  // On retourne le jeton en clair (celui qu'on va envoyer dans le lien par email)
  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
