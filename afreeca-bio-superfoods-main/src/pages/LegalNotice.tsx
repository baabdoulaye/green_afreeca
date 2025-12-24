/**
 * Page Mentions Légales
 * 
 * Informations légales obligatoires concernant Green Afreeca
 * Slogan : Plantes d'Afrique, Energie authentique.
 */

import { Card } from "@/components/ui/card";

const LegalNotice = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-4">Mentions Légales ⚖️</h1>
      <p className="text-primary font-medium mb-8 italic">
        🌿 Plantes d'Afrique, Energie authentique.
      </p>
      
      <Card className="p-8 space-y-6">
        {/* Éditeur du site */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">1. Éditeur du site 🏢</h2>
          <p className="text-muted-foreground mb-2">
            <strong>Raison sociale :</strong> Green Afreeca
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Forme juridique :</strong> SARL
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Adresse :</strong> 4 rue Bobby Sands - 93200 Saint-Denis, France 🇫🇷
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Email :</strong>{" "}
            <a href="mailto:green-afreeca@outlook.fr" className="text-primary hover:underline">
              green-afreeca@outlook.fr
            </a>
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Téléphone :</strong>{" "}
            <a href="tel:+33627857533" className="text-primary hover:underline">
              06 27 85 75 33
            </a>
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>N° SIRET :</strong> 984 086 520 00017
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Capital social :</strong> 40 000€
          </p>
        </section>

        {/* Directeur de la publication */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">2. Directeur de la publication 👤</h2>
          <p className="text-muted-foreground">
            Le directeur de la publication du site est le représentant légal de Green Afreeca.
          </p>
        </section>

        {/* Hébergement */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">3. Hébergement 🖥️</h2>
          <p className="text-muted-foreground mb-2">
            <strong>Hébergeur :</strong> Lovable
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Site web :</strong> https://lovable.dev
          </p>
        </section>

        {/* Propriété intellectuelle */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">4. Propriété intellectuelle ©</h2>
          <p className="text-muted-foreground mb-3">
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
            et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les 
            documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
          <p className="text-muted-foreground">
            La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est 
            formellement interdite sauf autorisation expresse du directeur de la publication.
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">5. Cookies 🍪</h2>
          <p className="text-muted-foreground">
            Le site peut utiliser des cookies pour améliorer l'expérience utilisateur. L'utilisateur peut 
            désactiver les cookies dans les paramètres de son navigateur. Pour plus d'informations, consultez 
            notre Politique de Confidentialité.
          </p>
        </section>

        {/* Loi applicable */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">6. Loi applicable ⚖️</h2>
          <p className="text-muted-foreground">
            Les présentes mentions légales sont régies par la loi française. En cas de litige et à défaut 
            d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de 
            compétence en vigueur.
          </p>
        </section>

        {/* Date de mise à jour */}
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LegalNotice;
