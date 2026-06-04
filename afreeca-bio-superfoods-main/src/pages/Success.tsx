import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";

const Success = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();

  // On vide le panier dès qu'il arrive sur cette page
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center animate-fade-in shadow-lg">
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Paiement Réussi !</h1>
        <p className="text-muted-foreground mb-6">
          Merci pour votre achat. Votre commande a été confirmée et va être
          préparée avec soin.
        </p>

        {orderId && (
          <div className="bg-gray-100 p-3 rounded-md mb-8 text-sm">
            Numéro de commande : <span className="font-bold">{orderId}</span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link to="/compte">
            <Button className="w-full bg-[#22c55e] hover:bg-[#16a34a]">
              Suivre ma commande
            </Button>
          </Link>
          <Link to="/produits">
            <Button variant="outline" className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" /> Continuer mes achats
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Success;
