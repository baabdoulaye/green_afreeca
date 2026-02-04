/**
 * Page Checkout - Tunnel de commande réel
 * * Étapes : Panier > Informations de livraison > Paiement > Confirmation
 */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Truck,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, name: "Panier", icon: ShoppingCart },
  { id: 2, name: "Livraison", icon: Truck },
  { id: 3, name: "Paiement", icon: CreditCard },
  { id: 4, name: "Confirmation", icon: CheckCircle },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setShippingInfo((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, []);

  const shipping = totalPrice > 30 ? 0 : 4.99;
  const total = totalPrice + shipping;

  if (items.length === 0 && currentStep < 4) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Votre panier est vide 🛒
          </h2>
          <Link to="/produits">
            <Button className="mt-4">Découvrir nos produits</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // FONCTION CRUCIALE MISE À JOUR
  const submitOrder = async () => {
    setIsSubmitting(true);

    // 1. Récupération propre du token
    const token = localStorage.getItem("token");

    // DEBUG : On vérifie ce qu'on envoie
    console.log("Tentative d'envoi avec le token :", token);

    if (!token) {
      toast({
        title: "Erreur d'authentification 🔑",
        description:
          "Ton badge d'accès est manquant. Reconnecte-toi, enfoiré !",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`, // On nettoie les espaces éventuels
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            product: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            variant: item.variant,
          })),
          totalAmount: total,
          shippingAddress: {
            street: shippingInfo.address,
            city: shippingInfo.city,
            zipCode: shippingInfo.postalCode,
            country: shippingInfo.country,
          },
          status: "processing",
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        throw new Error("Le serveur dit : Session expirée. Reconnecte-toi !");
      }

      if (!response.ok)
        throw new Error(
          data.message || "Erreur lors de la création de la commande",
        );

      setCurrentStep(4);
      clearCart();
      toast({
        title: "Commande validée ! 🎉",
        description: "Elle est enregistrée dans ton historique.",
      });
    } catch (error: any) {
      console.error("ERREUR CHECKOUT :", error.message);
      toast({
        title: "Paiement échoué ❌",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (
      currentStep === 2 &&
      (!shippingInfo.firstName || !shippingInfo.address || !shippingInfo.city)
    ) {
      toast({
        title: "Champs manquants",
        description: "Remplis l'adresse de livraison !",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 3) {
      submitOrder();
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Link
            to="/panier"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Retour au panier
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            Finaliser ma commande 🛍️
          </h1>
        </div>

        <div className="mb-8 flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${currentStep >= step.id ? "bg-primary border-primary text-primary-foreground" : "border-border text-muted-foreground"}`}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <span
                className={`ml-2 text-sm font-medium hidden sm:block ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"}`}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-24 h-1 mx-2 rounded ${currentStep > step.id ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card className="p-6 animate-fade-in">
                <h2 className="text-xl font-bold mb-4">
                  Vérifiez vos articles 📦
                </h2>
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.variant}`}
                    className="flex gap-4 py-3 border-b last:border-0"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Qté: {item.quantity} • {item.variant}
                      </p>
                    </div>
                    <p className="font-bold text-primary">
                      {(item.price * item.quantity).toFixed(2)}€
                    </p>
                  </div>
                ))}
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="p-6 animate-fade-in">
                <h2 className="text-xl font-bold mb-4">
                  Adresse de livraison 🚚
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prénom</Label>
                    <Input
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom</Label>
                    <Input
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Adresse</Label>
                    <Input
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      placeholder="Ex: 10 rue du Bissap"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Code Postal</Label>
                    <Input
                      value={shippingInfo.postalCode}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          postalCode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ville</Label>
                    <Input
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="p-6 animate-fade-in text-center py-12">
                <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Paiement Sécurisé</h2>
                <p className="text-muted-foreground mb-6">
                  Prêt à valider ta commande de {total.toFixed(2)}€ ?
                </p>
                <div className="max-w-xs mx-auto p-4 border rounded-xl bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard /> <span>•••• 4242</span>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    TEST MODE
                  </span>
                </div>
              </Card>
            )}

            {currentStep === 4 && (
              <Card className="p-8 text-center animate-fade-in">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Merci, {shippingInfo.firstName} ! 🎉
                </h2>
                <p className="text-muted-foreground mb-8">
                  Ta commande a été enregistrée avec succès.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link to="/produits">
                    <Button variant="outline">Continuer</Button>
                  </Link>
                  <Link to="/compte">
                    <Button>Voir mon historique 📋</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Récapitulatif</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span>Articles</span>
                    <span>{totalPrice.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span className="text-primary font-bold">
                      {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)}€`}
                    </span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-xl font-bold mb-6 text-primary">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                <div className="flex gap-2">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="flex-1"
                    >
                      Retour
                    </Button>
                  )}
                  <Button
                    onClick={handleNextStep}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Envoi..."
                      : currentStep === 3
                        ? "Payer"
                        : "Continuer"}
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
