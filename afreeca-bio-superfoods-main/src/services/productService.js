import axios from "axios";

// On écrit l'adresse EN DUR pour être sûr à 100% que ça marche
const API_URL = "http://localhost:3000/api/products";

const getProducts = async () => {
  try {
    console.log("📡 Appel de l'API à :", API_URL);
    const response = await axios.get(API_URL);

    // On vérifie ce qu'on reçoit dans la console
    console.log("✅ Réponse reçue :", response.data);

    // On renvoie le tableau de produits
    return response.data.data || [];
  } catch (error) {
    console.error("❌ Erreur de connexion au serveur :", error);
    return []; // Renvoie un tableau vide pour ne pas faire planter l'affichage
  }
};

const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const productService = { getProducts, getProductById };
export default productService;
