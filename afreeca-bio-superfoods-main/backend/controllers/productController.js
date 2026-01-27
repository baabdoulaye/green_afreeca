// backend/controllers/productController.js
const Product = require("../models/Product"); // Importe le modèle Product

// @desc    Afficher tous les produits
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    // Trouve tous les produits dans la base de données
    const products = await Product.find({});

    // Renvoie les produits avec un statut 200 (OK)
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    // En cas d'erreur serveur
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Afficher un produit spécifique par ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    // Trouve un produit par son ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      // Renvoie une erreur 404 si le produit n'existe pas
      return res
        .status(404)
        .json({ success: false, error: "Produit non trouvé" });
    }

    // Renvoie le produit
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    // En cas d'erreur (ex: format ID invalide)
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Créer un nouveau produit
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    // Crée une nouvelle instance de produit en utilisant les données du corps de la requête (req.body)
    const product = await Product.create(req.body);

    // Renvoie le produit créé avec un statut 201 (Created)
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    // Gère les erreurs de validation Mongoose (par exemple, champ 'name' manquant)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};
// NOTE : Les fonctions pour créer, mettre à jour et supprimer nécessitent
// l'authentification Admin et seront ajoutées plus tard.
// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Produit non trouvé" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
