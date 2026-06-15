import axios from "axios";

// On écrit l'adresse EN DUR pour être sûr à 100% que ça marche
const API_URL = `${import.meta.env.VITE_API_BASE_URL}products`;
// 💡 NOUVEAU : La fonction qui prépare le badge VIP (le token)
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

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

const createProduct = async (productData) => {
  try {
    // 💡 AJOUT DU TOKEN ICI : On le passe en 3ème paramètre
    const response = await axios.post(API_URL, productData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la création :", error);
    throw error;
  }
};

// 4. Supprimer un produit (DELETE)
const deleteProduct = async (id) => {
  try {
    // 💡 AJOUT DU TOKEN ICI : Pour un DELETE, la config est en 2ème paramètre
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la suppression :", error);
    throw error;
  }
};

// 5. Mettre à jour un produit (PUT)
const updateProduct = async (id, productData) => {
  try {
    // 💡 AJOUT DU TOKEN ICI : On le passe en 3ème paramètre
    const response = await axios.put(
      `${API_URL}/${id}`,
      productData,
      getAuthHeader(),
    );
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la modification :", error);
    throw error;
  }
};

// N'oublie pas de l'ajouter à l'export en bas
const productService = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
