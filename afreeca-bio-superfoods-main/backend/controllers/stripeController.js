// backend/controllers/stripeController.js
require("dotenv").config();
const Stripe = require("stripe"); // On importe la librairie, mais on ne l'initialise pas tout de suite

exports.createCheckoutSession = async (req, res) => {
  try {
    // 1. Log de debug pour voir ce que Docker comprend vraiment
    console.log(
      "🔑 Vérification de la clé Stripe :",
      process.env.STRIPE_SECRET_KEY ? "Clé trouvée ✅" : "Clé MANQUANTE ❌",
    );

    if (!process.env.STRIPE_SECRET_KEY) {
      return res
        .status(500)
        .json({
          error: "La clé secrète Stripe n'est pas chargée par le serveur.",
        });
    }

    // 2. Initialisation de Stripe avec la clé
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const { items, email, orderId } = req.body;

    // 3. Création des articles pour Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // 4. Ajout des frais de livraison si nécessaire
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    if (totalAmount <= 30) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Frais de livraison" },
          unit_amount: 499,
        },
        quantity: 1,
      });
    }

    // 5. Création de la session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.FRONTEND_URL}/success?orderId=${orderId}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("❌ Erreur Stripe détaillée :", error);
    res.status(500).json({ error: error.message });
  }
};
