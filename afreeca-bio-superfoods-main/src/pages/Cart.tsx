/**
 * Page Panier - Gestion du panier d'achat
 *
 * Affiche les produits dans le panier avec possibilité de modifier les quantités
 * Utilise le CartContext pour la gestion globale du panier
 */

import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  // Calculer les frais de livraison (gratuite à partir de 30€)
  const shipping = totalPrice > 30 ? 0 : 4.99;
  const total = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-16 px-4">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6 opacity-50" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Votre panier est vide 🛒
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Découvrez nos super-aliments africains bio et commencez votre voyage
            vers une meilleure santé !
          </p>
          <Link to="/produits">
            <Button size="lg">Découvrir nos produits</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-8 animate-fade-in-up">
          Mon Panier 🛒
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Vos articles ({items.length}) 📦
            </h2>
            {items.map((item, index) => (
              <Card
                key={`${item.id}-${item.variant}`}
                className="p-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-4">
                  <Link
                    to={`/produits/${item.id}`}
                    className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </Link>

                  <div className="flex-grow">
                    <Link to={`/produits/${item.id}`}>
                      <h3 className="text-lg font-bold text-foreground mb-1 hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-1">
                      Format : {item.dose}
                    </p>
                    <p className="text-primary font-semibold">
                      {item.price.toFixed(2)}€
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id, item.variant)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1,
                            item.variant,
                          )
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1,
                            item.variant,
                          )
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Récapitulatif 📋
              </h2>

              {/* Détail des articles */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.variant}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground truncate max-w-[60%]">
                      {item.name} ({item.dose}) x{item.quantity}
                    </span>
                    <span className="font-medium text-foreground">
                      {(item.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Sous-total</span>
                  <span>{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Livraison</span>
                  <span>
                    {shipping === 0 ? "Gratuite 🎉" : `${shipping.toFixed(2)}€`}
                  </span>
                </div>
                {totalPrice < 30 && (
                  <p className="text-xs text-primary">
                    💡 Plus que {(30 - totalPrice).toFixed(2)}€ pour la
                    livraison gratuite !
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                <span>Total</span>
                <span className="text-primary">{total.toFixed(2)}€</span>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="w-full mb-3">
                  Passer la commande 🚀
                </Button>
              </Link>

              <Link to="/produits">
                <Button variant="outline" size="lg" className="w-full">
                  Continuer mes achats
                </Button>
              </Link>

              {/* Badges de confiance */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>Paiement 100% sécurisé 🔒</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Livraison rapide en 48-72h 📦</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span>CB, PayPal, Apple Pay acceptés 💳</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
