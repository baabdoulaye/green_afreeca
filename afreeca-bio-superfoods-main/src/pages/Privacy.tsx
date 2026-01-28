/**
 * Page Politique de Confidentialité
 *
 * Information sur la collecte et le traitement des données personnelles
 * Slogan : Plantes d'Afrique, Energie authentique.
 */

import { Card } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Politique de Confidentialité{" "}
      </h1>
      <p className="text-primary font-medium mb-8 italic">
        Plantes d'Afrique, Energie authentique.
      </p>

      <Card className="p-8 space-y-6">
        {/* Introduction */}
        <section>
          <p className="text-muted-foreground mb-4">
            Green Afreeca s'engage à protéger la vie privée de ses utilisateurs.
            Cette politique de confidentialité explique comment nous collectons,
            utilisons et protégeons vos données personnelles conformément au
            Règlement Général sur la Protection des Données (RGPD).
          </p>
        </section>

        {/* Données collectées */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            1. Données collectées{" "}
          </h2>
          <p className="text-muted-foreground mb-3">
            Nous collectons les données suivantes :
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Informations d'identification : nom, prénom, adresse email</li>
            <li>
              Informations de livraison : adresse postale, numéro de téléphone
            </li>
            <li>
              Informations de paiement : données de transaction (via Stripe
              sécurisé)
            </li>
            <li>
              Données de navigation : cookies, adresse IP, historique de
              navigation sur le site
            </li>
          </ul>
        </section>

        {/* Utilisation des données */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            2. Utilisation des données{" "}
          </h2>
          <p className="text-muted-foreground mb-3">
            Vos données personnelles sont utilisées pour :
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Traiter et livrer vos commandes</li>
            <li>Gérer votre compte client</li>
            <li>Vous contacter concernant vos commandes</li>
            <li>Améliorer notre service et personnaliser votre expérience</li>
            <li>
              Vous envoyer des offres promotionnelles (avec votre consentement)
            </li>
            <li>Respecter nos obligations légales et réglementaires</li>
          </ul>
        </section>

        {/* Base légale */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            3. Base légale du traitement{" "}
          </h2>
          <p className="text-muted-foreground mb-3">
            Le traitement de vos données personnelles repose sur :
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>L'exécution du contrat de vente (traitement des commandes)</li>
            <li>Votre consentement (newsletters, marketing)</li>
            <li>Nos obligations légales (facturation, comptabilité)</li>
            <li>
              Notre intérêt légitime (amélioration du service, lutte contre la
              fraude)
            </li>
          </ul>
        </section>

        {/* Conservation des données */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            4. Conservation des données{" "}
          </h2>
          <p className="text-muted-foreground">
            Vos données sont conservées pendant la durée nécessaire aux
            finalités pour lesquelles elles sont collectées, conformément aux
            obligations légales en vigueur. Les données de facturation sont
            conservées 10 ans, les données de compte client 3 ans après la
            dernière activité.
          </p>
        </section>

        {/* Partage des données */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            5. Partage des données{" "}
          </h2>
          <p className="text-muted-foreground mb-3">
            Vos données peuvent être partagées avec :
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>
              Nos prestataires de services (hébergement, paiement, livraison)
            </li>
            <li>Les autorités légales si requis par la loi</li>
          </ul>
          <p className="text-muted-foreground mt-3">
            Nous ne vendons jamais vos données personnelles à des tiers.
          </p>
        </section>

        {/* Sécurité */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            6. Sécurité des données{" "}
          </h2>
          <p className="text-muted-foreground">
            Nous mettons en œuvre des mesures techniques et organisationnelles
            appropriées pour protéger vos données contre tout accès non
            autorisé, perte, destruction ou divulgation. Les paiements sont
            sécurisés via Stripe et utilisent le protocole SSL.
          </p>
        </section>

        {/* Vos droits */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            7. Vos droits{" "}
          </h2>
          <p className="text-muted-foreground mb-3">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>
              <strong>Droit d'accès :</strong> obtenir une copie de vos données
            </li>
            <li>
              <strong>Droit de rectification :</strong> corriger vos données
              inexactes
            </li>
            <li>
              <strong>Droit à l'effacement :</strong> demander la suppression de
              vos données
            </li>
            <li>
              <strong>Droit à la limitation :</strong> limiter le traitement de
              vos données
            </li>
            <li>
              <strong>Droit à la portabilité :</strong> recevoir vos données
              dans un format structuré
            </li>
            <li>
              <strong>Droit d'opposition :</strong> vous opposer au traitement
              de vos données
            </li>
            <li>
              <strong>Droit de retrait du consentement :</strong> à tout moment
            </li>
          </ul>
          <p className="text-muted-foreground mt-3">
            Pour exercer vos droits, contactez-nous à :{" "}
            <a
              href="mailto:green-afreeca@outlook.fr"
              className="text-primary hover:underline"
            >
              green-afreeca@outlook.fr
            </a>
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            8. Cookies{" "}
          </h2>
          <p className="text-muted-foreground mb-3">
            Notre site utilise des cookies pour :
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Assurer le bon fonctionnement du site</li>
            <li>Mémoriser votre panier</li>
            <li>Analyser le trafic du site</li>
          </ul>
          <p className="text-muted-foreground mt-3">
            Vous pouvez désactiver les cookies dans les paramètres de votre
            navigateur, mais cela peut affecter le fonctionnement du site.
          </p>
        </section>

        {/* Réclamation */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            9. Réclamation{" "}
          </h2>
          <p className="text-muted-foreground">
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez
            introduire une réclamation auprès de la CNIL (Commission Nationale
            de l'Informatique et des Libertés) : www.cnil.fr
          </p>
        </section>

        {/* Modifications */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            10. Modifications{" "}
          </h2>
          <p className="text-muted-foreground">
            Nous nous réservons le droit de modifier cette politique de
            confidentialité à tout moment. Toute modification sera publiée sur
            cette page avec une nouvelle date de mise à jour.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            11. Contact{" "}
          </h2>
          <p className="text-muted-foreground mb-2">
            Pour toute question concernant cette politique de confidentialité :
          </p>
          <p className="text-muted-foreground mb-1">
            <strong>Email :</strong>{" "}
            <a
              href="mailto:green-afreeca@outlook.fr"
              className="text-primary hover:underline"
            >
              green-afreeca@outlook.fr
            </a>
          </p>
          <p className="text-muted-foreground mb-1">
            <strong>Téléphone :</strong>{" "}
            <a href="tel:+33627857533" className="text-primary hover:underline">
              06 27 85 75 33
            </a>
          </p>
          <p className="text-muted-foreground">
            <strong>Adresse :</strong> 4 rue Bobby Sands - 93200 Saint-Denis,
            France 🇫🇷
          </p>
        </section>

        {/* Date de mise à jour */}
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Privacy;
