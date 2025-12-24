/**
 * Composants d'états d'erreur
 * 
 * - Panier vide
 * - Produit en rupture de stock
 * - Paiement refusé
 */

import { ShoppingCart, Package, CreditCard, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

// État : Panier vide
export const EmptyCartState = () => {
  return (
    <Card className="p-12 text-center max-w-lg mx-auto">
      <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">
        Votre panier est vide 🛒
      </h2>
      <p className="text-muted-foreground mb-8">
        Découvrez nos super-aliments africains bio et commencez votre voyage vers une meilleure santé ! 🌿
      </p>
      <Link to="/produits">
        <Button size="lg" className="gap-2">
          Découvrir nos produits ✨
        </Button>
      </Link>
    </Card>
  );
};

// État : Produit en rupture de stock
export const OutOfStockState = ({ productName = "Ce produit" }: { productName?: string }) => {
  return (
    <Card className="p-8 border-yellow-200 bg-yellow-50/50">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
          <Package className="h-6 w-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-2">
            Rupture de stock temporaire ⚠️
          </h3>
          <p className="text-muted-foreground mb-4">
            {productName} est actuellement indisponible. Nos équipes travaillent pour le réapprovisionner au plus vite !
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="gap-2">
              🔔 Me prévenir du retour
            </Button>
            <Link to="/produits">
              <Button variant="ghost" className="gap-2">
                Voir d'autres produits
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

// État : Paiement refusé
export const PaymentDeclinedState = ({ onRetry }: { onRetry?: () => void }) => {
  return (
    <Card className="p-8 border-destructive/30 bg-destructive/5 max-w-lg mx-auto">
      <div className="text-center">
        <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <CreditCard className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Paiement refusé 😔
        </h2>
        <p className="text-muted-foreground mb-6">
          Votre paiement n'a pas pu être traité. Veuillez vérifier vos informations de carte ou essayer un autre moyen de paiement.
        </p>
        
        <div className="bg-muted rounded-lg p-4 mb-6 text-left">
          <p className="text-sm font-medium text-foreground mb-2">Raisons possibles :</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Fonds insuffisants sur le compte</li>
            <li>• Informations de carte incorrectes</li>
            <li>• Carte expirée ou bloquée</li>
            <li>• Plafond de paiement atteint</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onRetry} className="gap-2">
            Réessayer le paiement 💳
          </Button>
          <Link to="/panier">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour au panier
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

// État : Erreur générique
export const GenericErrorState = ({ 
  title = "Une erreur est survenue",
  message = "Veuillez réessayer dans quelques instants.",
  onRetry 
}: { 
  title?: string;
  message?: string;
  onRetry?: () => void;
}) => {
  return (
    <Card className="p-8 text-center max-w-lg mx-auto">
      <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">{title} 😕</h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRetry && (
          <Button onClick={onRetry}>
            Réessayer
          </Button>
        )}
        <Link to="/">
          <Button variant="outline">
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default {
  EmptyCartState,
  OutOfStockState,
  PaymentDeclinedState,
  GenericErrorState
};
