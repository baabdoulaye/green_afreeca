/**
 * Page CGV - Conditions Générales de Vente
 * 
 * Conditions et politiques de vente de Green Afreeca
 * Slogan : Plantes d'Afrique, Energie authentique.
 */

import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
          Conditions Générales de Vente 📜
        </h1>
        <p className="text-primary font-medium mb-8 italic">
          🌿 Plantes d'Afrique, Energie authentique.
        </p>

        <Card className="p-8 space-y-8 animate-fade-in">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Présentation 🏢</h2>
            <p className="text-muted-foreground mb-4">
              Les présentes conditions générales de vente (CGV) régissent les ventes de produits 
              proposés par Green Afreeca, situé à Saint-Denis, France. Toute commande implique l'acceptation 
              sans réserve des présentes CGV.
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>SIRET :</strong> 984 086 520 00017
            </p>
            <p className="text-muted-foreground">
              <strong>Capital social :</strong> 40 000€
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Produits 🥤</h2>
            <p className="text-muted-foreground mb-4">
              Green Afreeca propose des super-aliments africains bio et naturels :
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Jus de Bouille (pulpe de baobab)</li>
              <li>Jus de Bissap (fleurs d'hibiscus)</li>
              <li>Moringa (poudre et feuilles)</li>
              <li>Jus de Gingembre (gingembre bio frais)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Tous nos produits sont certifiés bio, sans additifs artificiels, et proviennent 
              de nos champs au Sénégal dans le respect du commerce équitable. ✨
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Commandes 🛒</h2>
            <p className="text-muted-foreground mb-4">
              Les commandes peuvent être passées directement sur notre site web. Chaque commande 
              fait l'objet d'une confirmation par email. Nous nous réservons le droit d'annuler 
              toute commande en cas de force majeure, de rupture de stock ou de problème de paiement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Prix et Paiement 💳</h2>
            <p className="text-muted-foreground mb-4">
              Les prix sont indiqués en euros (€) TTC. Nous acceptons les paiements par carte 
              bancaire et autres moyens de paiement sécurisés. Les prix peuvent être modifiés 
              sans préavis, mais les commandes sont facturées au prix en vigueur au moment de 
              la validation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Livraison 🚚</h2>
            <p className="text-muted-foreground mb-4">
              Les délais de livraison sont de 3 à 5 jours ouvrés en France métropolitaine. 
              <strong className="text-primary"> La livraison est gratuite pour toute commande supérieure à 30€.</strong> Pour les montants 
              inférieurs, des frais de livraison de 4,99€ s'appliquent.
            </p>
            <p className="text-muted-foreground">
              Nous livrons uniquement en France métropolitaine pour le moment. Les livraisons 
              internationales seront disponibles prochainement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Droit de Rétractation ↩️</h2>
            <p className="text-muted-foreground mb-4">
              Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours 
              à compter de la réception de votre commande pour exercer votre droit de rétractation 
              sans avoir à justifier de motif.
            </p>
            <p className="text-muted-foreground">
              Les produits doivent être retournés dans leur emballage d'origine, non ouverts et 
              en parfait état de revente. Les frais de retour sont à la charge du client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Garanties 🛡️</h2>
            <p className="text-muted-foreground mb-4">
              Tous nos produits bénéficient de la garantie légale de conformité et de la garantie 
              contre les vices cachés. En cas de produit défectueux ou non conforme, nous procéderons 
              à un échange ou un remboursement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Données Personnelles 🔒</h2>
            <p className="text-muted-foreground mb-4">
              Vos données personnelles sont collectées et traitées conformément au RGPD. Elles 
              sont utilisées uniquement pour le traitement de votre commande et ne seront jamais 
              transmises à des tiers sans votre consentement.
            </p>
            <p className="text-muted-foreground">
              Vous disposez d'un droit d'accès, de rectification et de suppression de vos données 
              en nous contactant à : <a href="mailto:green-afreeca@outlook.fr" className="text-primary hover:underline">green-afreeca@outlook.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Propriété Intellectuelle ©</h2>
            <p className="text-muted-foreground mb-4">
              Tous les éléments du site (textes, images, logos, etc.) sont la propriété exclusive 
              de Green Afreeca et sont protégés par les lois sur la propriété intellectuelle. 
              Toute reproduction sans autorisation est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Litiges ⚖️</h2>
            <p className="text-muted-foreground mb-4">
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution 
              amiable sera recherchée en priorité. À défaut, les tribunaux français seront 
              compétents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact 📞</h2>
            <p className="text-muted-foreground">
              Pour toute question concernant nos CGV, vous pouvez nous contacter à :
            </p>
            <ul className="list-none text-muted-foreground space-y-2 ml-4 mt-4">
              <li>
                <strong>Email :</strong>{" "}
                <a href="mailto:green-afreeca@outlook.fr" className="text-primary hover:underline">
                  green-afreeca@outlook.fr
                </a>
              </li>
              <li>
                <strong>Téléphone :</strong>{" "}
                <a href="tel:+33627857533" className="text-primary hover:underline">
                  06 27 85 75 33
                </a>
              </li>
              <li><strong>Adresse :</strong> 4 rue Bobby Sands - 93200 Saint-Denis, France 🇫🇷</li>
              <li><strong>SIRET :</strong> 984 086 520 00017</li>
            </ul>
          </section>

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
