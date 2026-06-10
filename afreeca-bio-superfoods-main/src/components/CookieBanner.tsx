import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // On vérifie si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem("greenafreeca_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("greenafreeca_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("greenafreeca_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 animate-fade-in-up">
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground text-center sm:text-left">
          <p className="font-bold text-foreground mb-1">
            🍪 Gestion de vos préférences
          </p>
          Nous utilisons des cookies pour améliorer votre expérience sur Green
          Afreeca et sécuriser vos transactions. En continuant, vous acceptez
          notre{" "}
          <Link
            to="/politique-confidentialite"
            className="text-primary hover:underline font-medium"
          >
            politique de confidentialité
          </Link>
          .
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none"
            onClick={handleDecline}
          >
            Refuser
          </Button>
          <Button
            className="flex-1 sm:flex-none bg-primary hover:bg-primary-dark"
            onClick={handleAccept}
          >
            Accepter tout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
