/**
 * Page Checkout - Tunnel de commande
 *
 * Étapes : Panier > Informations de livraison > Paiement > Confirmation
 * Interface uniquement (sans backend)
 */

import { useState } from "react";
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

// Étapes du checkout
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
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const shipping = totalPrice > 30 ? 0 : 4.99;
  const total = totalPrice + shipping;

  // Rediriger si panier vide
  if (items.length === 0 && currentStep < 4) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Votre panier est vide 🛒
          </h2>
          <p className="text-muted-foreground mb-6">
            Ajoutez des produits à votre panier pour passer commande.
          </p>
          <Link to="/produits">
            <Button>Découvrir nos produits </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleNextStep = () => {
    if (
      currentStep === 2 &&
      (!shippingInfo.firstName || !shippingInfo.email || !shippingInfo.address)
    ) {
      toast({
        title: "Informations incomplètes ⚠️",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 3) {
      // Simulation de paiement
      toast({
        title: "Paiement en cours... 💳",
        description: "Veuillez patienter quelques instants.",
      });
      setTimeout(() => {
        setCurrentStep(4);
        clearCart();
        toast({
          title: "Commande confirmée ! 🎉",
          description: "Vous recevrez un email de confirmation.",
        });
      }, 2000);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/panier"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au panier
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            Finaliser ma commande 🛍️
          </h1>
          <p className="text-primary italic mt-1">
            {" "}
            Plantes d'Afrique, Energie authentique.
          </p>
        </div>

        {/* Indicateur d'étapes */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    currentStep >= step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:block ${
                    currentStep >= step.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-1 mx-2 rounded ${
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Étape 1: Récapitulatif panier */}
            {currentStep === 1 && (
              <Card className="p-6 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Récapitulatif de votre panier 📦
                </h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.variant}`}
                      className="flex gap-4 py-3 border-b border-border last:border-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Format : {item.dose}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Quantité : {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">
                          {(item.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Étape 2: Informations de livraison */}
            {currentStep === 2 && (
              <Card className="p-6 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Informations de livraison 🚚
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          firstName: e.target.value,
                        })
                      }
                      placeholder="Jean"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          lastName: e.target.value,
                        })
                      }
                      placeholder="Dupont"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          email: e.target.value,
                        })
                      }
                      placeholder="jean@exemple.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          phone: e.target.value,
                        })
                      }
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Adresse *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      placeholder="123 rue de la Santé"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Code postal *</Label>
                    <Input
                      id="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          postalCode: e.target.value,
                        })
                      }
                      placeholder="75013"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          city: e.target.value,
                        })
                      }
                      placeholder="Paris"
                      required
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Étape 3: Paiement */}
            {currentStep === 3 && (
              <Card className="p-6 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Paiement sécurisé 💳
                </h2>
                <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>Vos données sont protégées par cryptage SSL</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Numéro de carte</Label>
                    <Input
                      id="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: e.target.value,
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nom sur la carte</Label>
                    <Input
                      id="cardName"
                      value={paymentInfo.cardName}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardName: e.target.value,
                        })
                      }
                      placeholder="JEAN DUPONT"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Date d'expiration</Label>
                      <Input
                        id="expiry"
                        value={paymentInfo.expiry}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiry: e.target.value,
                          })
                        }
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value,
                          })
                        }
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      Paiement sécurisé par Stripe
                    </span>
                  </div>
                </div>
              </Card>
            )}

            {/* Étape 4: Confirmation */}
            {currentStep === 4 && (
              <Card className="p-8 text-center animate-fade-in">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Commande confirmée ! 🎉
                </h2>
                <p className="text-muted-foreground mb-6">
                  Merci pour votre commande ! Vous recevrez un email de
                  confirmation avec les détails de livraison.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  Numéro de commande :{" "}
                  <span className="font-bold text-foreground">
                    #GA-{Date.now().toString().slice(-8)}
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/produits">
                    <Button variant="outline">Continuer mes achats</Button>
                  </Link>
                  <Link to="/compte">
                    <Button>Voir mes commandes 📋</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {/* Récapitulatif */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Récapitulatif 📋
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Sous-total ({items.length} articles)
                    </span>
                    <span className="text-foreground">
                      {totalPrice.toFixed(2)}€
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span
                      className={
                        shipping === 0 ? "text-primary" : "text-foreground"
                      }
                    >
                      {shipping === 0
                        ? "Gratuite 🎉"
                        : `${shipping.toFixed(2)}€`}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">{total.toFixed(2)}€</span>
                </div>

                <div className="flex gap-2">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="flex-1"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                  )}
                  <Button onClick={handleNextStep} className="flex-1">
                    {currentStep === 3 ? "Payer" : "Continuer"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                {totalPrice < 30 && (
                  <p className="text-xs text-primary mt-4 text-center">
                    💡 Plus que {(30 - totalPrice).toFixed(2)}€ pour la
                    livraison gratuite !
                  </p>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
