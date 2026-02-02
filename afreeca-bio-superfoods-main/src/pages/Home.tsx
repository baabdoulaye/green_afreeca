/**
 * Page Home - Page d'accueil principale
 *
 * Contient :
 * - Section Hero avec image et CTA principal
 * - Section Avantages / Bénéfices
 * - Section Produits en vedette
 * - Section Pourquoi nous choisir (avec images)
 * - Section Avis clients
 * - Section CTA final
 */

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Leaf,
  Award,
  Heart,
  Sparkles,
  Star,
  Quote,
  Truck,
  Package,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/card";
// import heroImage from "@/assets/hero-superfoods.jpg";
// import baobabImage from "@/assets/product-baobab.jpg";
// import bissapImage from "@/assets/product-bissap.jpg";
// import moringaImage from "@/assets/product-moringa.jpg";
// import gingerImage from "@/assets/product-ginger.jpg";
import ProductSlider from "@/components/ProductSlider";

// Données des avis clients
const reviews = [
  {
    id: 1,
    name: "Marie D.",
    rating: 5,
    comment:
      "Le jus de bissap est tout simplement délicieux ! 😍 Je n'ai plus besoin de mes compléments en fer depuis que je le consomme régulièrement. Service client au top !",
    product: "Jus de Bissap",
    date: "Il y a 2 semaines",
  },
  {
    id: 2,
    name: "Thomas L.",
    rating: 5,
    comment:
      "Le moringa a transformé mes matins. 💪 Plus de fatigue, plus d'énergie tout au long de la journée. Je recommande à 100% !",
    product: "Moringa",
    date: "Il y a 1 mois",
  },
  {
    id: 3,
    name: "Aminata S.",
    rating: 5,
    comment:
      "Enfin des produits authentiques comme ceux de chez nous au Sénégal ! 🇸🇳 Le jus de bouille me rappelle mon enfance. Qualité exceptionnelle.",
    product: "Jus de Bouille",
    date: "Il y a 3 semaines",
  },
  {
    id: 4,
    name: "Pierre M.",
    rating: 4,
    comment:
      "Le jus de gingembre est parfait pour ma digestion. 🔥 Un peu fort au début mais on s'habitue vite. Livraison rapide !",
    product: "Jus de Gingembre",
    date: "Il y a 1 semaine",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Section Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-superfoods.jpg" // On remplace {heroImage} par le chemin direct
            alt="Super-aliments africains bio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent"></div>
        </div>

        {/* Contenu Hero */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="text-lg md:text-xl text-primary font-semibold mb-4 italic">
              "Plantes d'Afrique, Énergie authentique."
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              Des <span className="text-primary">Super-Aliments</span> Africains{" "}
              <span className="text-accent">Naturels</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground font-medium mb-8 drop-shadow-lg">
              Plus puissants et plus rentables que les compléments alimentaires
              traditionnels. Le Jus de Bouille est 6x plus riche en Vitamine C
              que l'orange !
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/produits">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Découvrir nos produits
                </Button>
              </Link>
              <Link to="/a-propos">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold transition-all"
                >
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            Pourquoi choisir <span className="text-primary">Green Afreeca</span>{" "}
            ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Avantage 1 */}
            <div className="bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-fade-in">
              <div className="h-16 w-16 rounded-full bg-primary-light flex items-center justify-center mb-6">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">
                100% Naturel
              </h3>
              <p className="text-muted-foreground">
                Des produits bio sans additifs, cultivés selon des méthodes
                traditionnelles africaines.
              </p>
            </div>

            {/* Avantage 2 */}
            <div
              className="bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="h-16 w-16 rounded-full bg-accent-light flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">
                Qualité Premium
              </h3>
              <p className="text-muted-foreground">
                Sélection rigoureuse et contrôle qualité pour garantir
                l'excellence de nos produits.
              </p>
            </div>

            {/* Avantage 3 */}
            <div
              className="bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="h-16 w-16 rounded-full bg-secondary-light flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">
                Bienfaits Prouvés
              </h3>
              <p className="text-muted-foreground">
                Riches en vitamines, minéraux et antioxydants essentiels pour
                votre santé.
              </p>
            </div>

            {/* Avantage 4 */}
            <div
              className="bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="h-16 w-16 rounded-full bg-primary-light flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">
                Commerce Équitable
              </h3>
              <p className="text-muted-foreground">
                Soutien direct aux producteurs africains pour un impact social
                positif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Produits en Vedette */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Nos <span className="text-primary">Super-Aliments</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            Découvrez notre gamme de super-aliments africains bio, une
            alternative naturelle aux compléments alimentaires 💚
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Produit 1 - Jus de Bouille/Baobab */}
            <div className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 animate-scale-in">
              <Link
                to="/produits/baobab"
                className="aspect-square overflow-hidden block cursor-pointer"
              >
                <img
                  src="/images/baobab-poudre.jpg"
                  alt="Jus de Bouille - Baobab"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  Jus de Bouille (Baobab)
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  6x plus de Vitamine C que l'orange. Boost immunitaire naturel.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    À partir de 3€
                  </span>
                  <Link to="/produits/baobab">
                    <Button size="sm" variant="default">
                      Voir plus
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Produit 2 - Jus de Bissap */}
            <div
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <Link
                to="/produits/bissap"
                className="aspect-square overflow-hidden block cursor-pointer"
              >
                <img
                  src="/images/bissap.jpg"
                  alt="Jus de Bissap - Hibiscus"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  Jus de Bissap
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Riche en antioxydants. Régule la pression artérielle
                  naturellement.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    À partir de 3€
                  </span>
                  <Link to="/produits/bissap">
                    <Button size="sm" variant="default">
                      Voir plus
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Produit 3 - Moringa */}
            <div
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Link
                to="/produits/moringa"
                className="aspect-square overflow-hidden block cursor-pointer"
              >
                <img
                  src="/images/moringa.jpg"
                  alt="Moringa"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  Moringa
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  L'arbre miracle. Contient les 9 acides aminés essentiels.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">7,00€</span>
                  <Link to="/produits/moringa">
                    <Button size="sm" variant="default">
                      Voir plus
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Produit 4 - Jus de Gingembre */}
            <div
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                to="/produits/ginger"
                className="aspect-square overflow-hidden block cursor-pointer"
              >
                <img
                  src="/images/ginger-poudre.jpg"
                  alt="Jus de Gingembre"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  Jus de Gingembre
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Anti-inflammatoire naturel. Améliore la digestion.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    À partir de 4€
                  </span>
                  <Link to="/produits/ginger">
                    <Button size="sm" variant="default">
                      Voir plus
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/produits">
              <Button
                size="lg"
                variant="default"
                className="px-8 py-6 text-lg font-semibold"
              >
                Voir tous les produits
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Slider d'infos surprenantes */}
      <ProductSlider />

      {/* Section Pourquoi les Super-Aliments vs Compléments - AVEC IMAGES */}
      <section className="py-20 bg-gradient-to-b from-muted to-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                La science derrière nos produits
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Pourquoi Choisir des{" "}
                <span className="text-primary">Super-Aliments</span> ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez la différence entre les nutriments naturels et les
                compléments synthétiques
              </p>
            </div>

            {/* Bloc Alerte avec image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch">
              <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 p-8 rounded-3xl border border-destructive/20 flex flex-col justify-center backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-destructive">
                    Une Réalité Alarmante
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-foreground">
                  Saviez-vous que{" "}
                  <strong>plus de 90% de la population mondiale</strong> souffre
                  de carences en minéraux, vitamines ou oligo-éléments
                  essentiels ? Magnésium, fer, vitamine D, zinc, iode... La
                  liste des déficiences nutritionnelles est alarmante.
                </p>
                <p className="text-lg leading-relaxed text-foreground mt-4">
                  Ces carences entraînent fatigue chronique, système immunitaire
                  affaibli, problèmes de concentration et bien d'autres troubles
                  de santé.
                </p>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="/images/moringa.jpg"
                  alt="Moringa - Super-aliment riche en nutriments"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bloc Solution avec image inversée */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch">
              <div className="rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1 group">
                <img
                  src="/images/baobab-poudre.jpg"
                  alt="Jus de Bouille - Source naturelle de vitamines"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="bg-gradient-to-br from-card to-muted p-8 rounded-3xl border border-border shadow-lg flex flex-col justify-center order-1 lg:order-2 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">💊</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    Le Problème des Compléments
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-foreground">
                  Face à cette carence généralisée, des{" "}
                  <strong>millions de personnes</strong> avalent chaque matin
                  des poignées de comprimés : vitamines synthétiques, minéraux
                  isolés, compléments multiples...
                </p>
                <p className="text-lg leading-relaxed text-foreground mt-4">
                  Une routine coûteuse et souvent inefficace. La vérité ?{" "}
                  <strong>
                    Votre corps peine à absorber ces nutriments artificiels
                  </strong>{" "}
                  créés en laboratoire.
                </p>
              </div>
            </div>

            {/* Exemples concrets - Cards individuelles */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    La Puissance Naturelle
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-2xl border border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src="/images/moringa.jpg"
                        alt="Moringa"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-2">
                        Le Moringa
                      </h4>
                      <p className="text-foreground text-sm">
                        L'un des <strong>seuls végétaux au monde</strong> à
                        contenir les 9 acides aminés essentiels.{" "}
                        <span className="text-primary font-semibold">
                          17x plus de calcium que le lait !
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-2xl border border-accent/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src="/images/baobab-poudre.jpg"
                        alt="Baobab"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-accent-foreground mb-2">
                        Le Jus de Bouille
                      </h4>
                      <p className="text-foreground text-sm">
                        <span className="text-primary font-semibold">
                          6x plus de vitamine C que l'orange
                        </span>
                        , 2x plus de calcium que le lait, richesse
                        exceptionnelle en fibres prébiotiques.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-6 rounded-2xl border border-secondary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src="/images/bissap.jpg"
                        alt="Bissap"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-2">
                        Le Jus de Bissap
                      </h4>
                      <p className="text-foreground text-sm">
                        Riche en antioxydants puissants, régule naturellement la
                        pression artérielle et{" "}
                        <span className="text-primary font-semibold">
                          comble les carences en fer.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-accent/5 p-6 rounded-2xl border border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src="/images/ginger-poudre.jpg"
                        alt="Gingembre"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-2">
                        Le Jus de Gingembre
                      </h4>
                      <p className="text-foreground text-sm">
                        Anti-inflammatoire naturel,{" "}
                        <span className="text-primary font-semibold">
                          booste l'immunité
                        </span>{" "}
                        et améliore l'absorption des autres nutriments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Avantages économiques */}
            <Card className="p-8 md:p-12 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-2xl"></span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Pourquoi C'est Plus Rentable
                    </h3>
                  </div>
                  <p className="text-lg leading-relaxed text-foreground mb-6">
                    Un seul super-aliment remplace{" "}
                    <strong>plusieurs compléments coûteux</strong>. Au lieu
                    d'acheter séparément de la vitamine C, du calcium, du fer,
                    des protéines et des fibres, le Moringa vous offre TOUT cela
                    dans un seul produit naturel.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold text-xl">✓</span>
                      <span className="text-foreground">
                        <strong>Absorption supérieure</strong> : Nutriments
                        naturels 3x mieux absorbés
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold text-xl">✓</span>
                      <span className="text-foreground">
                        <strong>Synergie naturelle</strong> : Vitamines et
                        minéraux travaillent ensemble
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold text-xl">✓</span>
                      <span className="text-foreground">
                        <strong>Zéro additifs</strong> : Pas de colorants ou
                        conservateurs
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl group">
                  <img
                    src="/images/ginger-poudre.jpg"
                    alt="Gingembre - Anti-inflammatoire naturel"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Card>

            <p className="text-xl font-bold text-center text-primary pt-8">
              Supplémentez-vous intelligemment. Choisissez la puissance
              naturelle des super-aliments africains.
            </p>
          </div>
        </div>
      </section>

      {/* Section Avis Clients */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Ce Que Disent Nos <span className="text-primary">Clients</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            Découvrez les témoignages de ceux qui ont adopté nos super-aliments
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className="p-6 hover:shadow-elegant transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-accent fill-accent"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20 mb-2" />
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {review.comment}
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-primary">{review.product}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Livraison */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
            Livraison Partout en <span className="text-accent">France</span>
          </h2>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl shadow-md hover:shadow-elegant transition-all text-center">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Livraison Rapide ⚡
              </h3>
              <p className="text-muted-foreground">
                Expédition sous 24-48h ouvrées
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-md hover:shadow-elegant transition-all text-center">
              <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Emballage Soigné 📦
              </h3>
              <p className="text-muted-foreground">
                Produits protégés pour une fraîcheur garantie
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-md hover:shadow-elegant transition-all text-center">
              <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Fraîcheur Garantie ❄️
              </h3>
              <p className="text-muted-foreground">
                Conservation optimale jusqu'à réception
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Prêt à <span className="text-primary">Booster</span> Votre Santé ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Commencez dès aujourd'hui avec nos super-aliments africains bio et
            ressentez la différence !
          </p>
          <Link to="/produits">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Découvrir nos produits
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
