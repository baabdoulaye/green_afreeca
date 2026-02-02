/**
 * Context du Panier - Gestion globale du panier d'achat
 * Support des variantes de produits (formats/tailles)
 */

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  dose: string;
  variant?: string; // Format ou variante du produit
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // 1. On initialise l'état avec ce qu'il y a déjà dans le localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("greenafreeca_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. On sauvegarde automatiquement dans le localStorage dès que 'items' change
  useEffect(() => {
    localStorage.setItem("greenafreeca_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (
    item: Omit<CartItem, "quantity"> & { quantity?: number },
  ) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && i.variant === item.variant,
      );
      if (existingItem) {
        toast.success(`Quantité mise à jour pour ${item.name}`);
        return prev.map((i) =>
          i.id === item.id && i.variant === item.variant
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i,
        );
      }
      toast.success(`${item.name} ajouté au panier !`);
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id: string, variant?: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.id === id && item.variant === variant)),
    );
    toast.info("Produit retiré du panier");
  };

  const updateQuantity = (id: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, variant);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.variant === variant
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Panier vidé");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
