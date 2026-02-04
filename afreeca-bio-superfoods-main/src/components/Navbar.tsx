/**
 * Composant Navbar - Barre de navigation principale
 * Affiche le logo, les liens de navigation et les icônes du panier/compte utilisateur
 * Dynamique : affiche le prénom et un menu de déconnexion si connecté
 */

import { ShoppingCart, User, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ firstName: string } | null>(null);
  const { totalItems } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Vérifier si un utilisateur est connecté au chargement
  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("userInfo");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    window.addEventListener("userLogin", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("userLogin", checkUser);
    };
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    toast({
      title: "Vous etes deconnecté",
      description: "",
    });
    navigate("/");
  };

  // Classe pour les liens de navigation NavLink (Accepte une fonction)
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors font-medium ${
      isActive
        ? "text-primary font-bold border-b-2 border-primary pb-1"
        : "text-foreground hover:text-primary"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors"
          >
            Green Afreeca
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass} end>
              Accueil
            </NavLink>
            <NavLink to="/a-propos" className={linkClass}>
              À Propos
            </NavLink>
            <NavLink to="/produits" className={linkClass}>
              Produits
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </div>

          {/* Icônes Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              /* Menu Utilisateur Connecté */
              <div className="relative group">
                {/* On utilise une string fixe pour className ici pour éviter l'erreur TS */}
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-light transition-all text-primary font-bold focus:outline-none">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline-block text-sm">
                    {user.firstName}
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu - Apparaît au survol */}
                <div className="absolute right-0 mt-1 w-48 bg-white border border-border rounded-xl shadow-xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:translate-y-0 translate-y-2">
                  <Link
                    to="/compte"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    <User size={16} />
                    Mon Profil
                  </Link>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium text-left"
                  >
                    <LogOut size={16} />
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              /* Bouton Login si non connecté */
              <Link to="/auth">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary-light"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Panier */}
            <Link to="/panier">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary-light relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Bouton Menu Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to="/produits"
                className="text-foreground hover:text-primary py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Produits
              </Link>
              {user ? (
                <div className="pt-2 border-t border-border flex items-center justify-between text-primary font-bold">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.firstName}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-red-600 text-sm flex items-center gap-1"
                  >
                    <LogOut size={14} /> Déconnexion
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="text-foreground hover:text-primary py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
