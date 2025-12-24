/**
 * Composant Footer - Pied de page
 * 
 * Contient les liens importants, informations de contact et réseaux sociaux
 */

import { Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À Propos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Green Afreeca 🌿</h3>
            <p className="text-muted-foreground text-sm">
              Des super-aliments africains bio, naturels et puissants. 
              Une alternative efficace aux compléments alimentaires. ✨
            </p>
          </div>

          {/* Liens Rapides */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Liens Rapides 🔗</h4>
            <div className="flex flex-col gap-2">
              <Link to="/produits" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Nos Produits
              </Link>
              <Link to="/a-propos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                À Propos
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
              <Link to="/cgv" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                CGV
              </Link>
              <Link to="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Mentions Légales
              </Link>
              <Link to="/politique-confidentialite" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Politique de Confidentialité
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact 📞</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:green-afreeca@outlook.fr" 
                className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>green-afreeca@outlook.fr</span>
              </a>
              <a 
                href="tel:+33627857533" 
                className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>06 27 85 75 33</span>
              </a>
            </div>
          </div>

          {/* Réseaux Sociaux */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Suivez-nous 📱</h4>
            <div className="flex gap-4">
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Green Afreeca. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
