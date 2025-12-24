/**
 * Composant Navbar - Barre de navigation principale
 * 
 * Affiche le logo, les liens de navigation et les icônes du panier/compte utilisateur
 * Responsive avec menu hamburger sur mobile
 * Mise en évidence du lien actif
 */

import { ShoppingCart, User, Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  // Classe pour les liens actifs
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors font-medium ${
      isActive 
        ? "text-primary font-bold border-b-2 border-primary pb-1" 
        : "text-foreground hover:text-primary"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors font-medium py-2 ${
      isActive 
        ? "text-primary font-bold" 
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
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="icon" className="hover:bg-primary-light">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/panier">
              <Button variant="ghost" size="icon" className="hover:bg-primary-light relative">
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
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <NavLink 
                to="/" 
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
                end
              >
                Accueil
              </NavLink>
              <NavLink 
                to="/a-propos" 
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                À Propos
              </NavLink>
              <NavLink 
                to="/produits" 
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Produits
              </NavLink>
              <NavLink 
                to="/contact" 
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;