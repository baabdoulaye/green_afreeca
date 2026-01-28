/**
 * Page Détail Produit - Affiche les détails complets d'un produit
 *
 * Inclut : image, prix, description, bénéfices, FAQ, processus de fabrication, paiement sécurisé
 */

import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  Shield,
  Truck,
  Leaf,
  MapPin,
  Lock,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductReviews from "@/components/ProductReviews";
import baobabImg from "@/assets/product-baobab.jpg";
import bissapImg from "@/assets/product-bissap.jpg";
import moringaImg from "@/assets/product-moringa.jpg";
import gingerImg from "@/assets/product-ginger.jpg";

// Types
interface ProductVariant {
  id: string;
  dose: string;
  price: number;
}

interface NutritionComparison {
  nutrient: string;
  product: string;
  comparison: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  variants: ProductVariant[];
  image: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
  nutritionalInfo: { label: string; value: string }[];
  nutritionComparisons: NutritionComparison[];
  usage: string;
  anecdotes: string[];
  faq: FAQ[];
}

// Données produits détaillées
const products: Record<string, Product> = {
  baobab: {
    id: "baobab",
    name: "Jus de Bouille (Baobab)",
    category: "Jus",
    variants: [
      { id: "baobab-50cl", dose: "50 cl", price: 3.0 },
      { id: "baobab-1l", dose: "1 litre", price: 5.0 },
    ],
    image: baobabImg,
    description:
      "Jus de pulpe de baobab frais. 6 fois plus de vitamine C que l'orange et 2 fois plus de calcium que le lait.",
    detailedDescription:
      "Le Jus de Bouille, issu de la pulpe du fruit du baobab africain, est un super-aliment ancestral aux vertus exceptionnelles. Utilisé depuis des millénaires en Afrique de l'Ouest, ce trésor nutritionnel concentre une richesse incomparable en vitamines, minéraux et fibres. Notre jus est préparé fraîchement selon la recette traditionnelle sénégalaise.",
    benefits: [
      "Boost d'énergie instantané",
      "Renforce les os et les dents",
      "Riche en fibres prébiotiques",
      "Antioxydant puissant",
      "Améliore le transit intestinal",
      "Renforce le système immunitaire",
    ],
    nutritionalInfo: [
      { label: "Vitamine C", value: "6x plus que l'orange" },
      { label: "Calcium", value: "2x plus que le lait" },
      { label: "Fibres", value: "50g pour 100g" },
      { label: "Potassium", value: "Riche" },
      { label: "Magnésium", value: "Riche" },
    ],
    nutritionComparisons: [
      {
        nutrient: "Vitamine C",
        product: "280mg/100g",
        comparison: "Orange : 53mg/100g",
      },
      {
        nutrient: "Calcium",
        product: "293mg/100g",
        comparison: "Lait : 125mg/100g",
      },
      {
        nutrient: "Fibres",
        product: "44g/100g",
        comparison: "Pomme : 2.4g/100g",
      },
      {
        nutrient: "Fer",
        product: "10mg/100g",
        comparison: "Épinards : 2.7mg/100g",
      },
    ],
    usage:
      "Buvez un verre (25cl) par jour, de préférence le matin à jeun ou en collation. Peut être mélangé avec d'autres jus de fruits.",
    anecdotes: [
      "Le baobab peut vivre plus de 2000 ans et est surnommé 'l'arbre de vie' en Afrique.",
      "Un seul baobab peut produire jusqu'à 200kg de fruits par an.",
      "La pulpe se déshydrate naturellement dans le fruit, préservant tous ses nutriments.",
    ],
    faq: [
      {
        question: "Combien de temps se conserve le jus ?",
        answer:
          "Une fois ouvert, conservez au réfrigérateur et consommez sous 5 jours. Non ouvert, il se conserve 3 semaines au frais.",
      },
      {
        question: "Puis-je le donner aux enfants ?",
        answer:
          "Oui ! Le jus de bouille est excellent pour les enfants dès 3 ans. Réduisez simplement les portions de moitié.",
      },
      {
        question: "Y a-t-il des contre-indications ?",
        answer:
          "Le baobab est très bien toléré. En cas de doute, consultez votre médecin, surtout si vous êtes enceinte.",
      },
      {
        question: "Peut-on le consommer tous les jours ?",
        answer:
          "Absolument ! Une consommation quotidienne est même recommandée pour profiter pleinement de ses bienfaits.",
      },
    ],
  },
  bissap: {
    id: "bissap",
    name: "Jus de Bissap",
    category: "Jus",
    variants: [
      { id: "bissap-50cl", dose: "50 cl", price: 3.0 },
      { id: "bissap-1l", dose: "1 litre", price: 5.0 },
    ],
    image: bissapImg,
    description:
      "Jus d'hibiscus frais préparé selon la recette traditionnelle sénégalaise. Riche en antioxydants.",
    detailedDescription:
      "Le Jus de Bissap, boisson emblématique d'Afrique de l'Ouest, est préparé à partir de fleurs d'hibiscus sabdariffa fraîches. Cette boisson rouge rubis au goût légèrement acidulé et fruité est consommée depuis des siècles pour ses nombreuses vertus. Nous le préparons selon la recette traditionnelle avec une touche de menthe et de fleur d'oranger.",
    benefits: [
      "Régule la pression artérielle",
      "Détoxifiant naturel",
      "Riche en vitamine C",
      "Rafraîchissant et désaltérant",
      "Favorise la digestion",
      "Propriétés diurétiques",
    ],
    nutritionalInfo: [
      { label: "Antioxydants", value: "Très riche" },
      { label: "Vitamine C", value: "Riche" },
      { label: "Fer", value: "Bonne source" },
      { label: "Calcium", value: "Présent" },
      { label: "Flavonoïdes", value: "Riche" },
    ],
    nutritionComparisons: [
      {
        nutrient: "Antioxydants",
        product: "Score ORAC élevé",
        comparison: "Thé vert : Score moyen",
      },
      {
        nutrient: "Vitamine C",
        product: "18mg/100ml",
        comparison: "Jus d'orange : 50mg/100ml",
      },
      {
        nutrient: "Fer",
        product: "8mg/100g de fleurs",
        comparison: "Épinards : 2.7mg/100g",
      },
      {
        nutrient: "Anthocyanes",
        product: "Très élevé",
        comparison: "Myrtilles : Élevé",
      },
    ],
    usage:
      "Buvez 1 à 2 verres par jour, froid de préférence. Excellent en apéritif ou pour accompagner vos repas.",
    anecdotes: [
      "Le bissap est la boisson nationale du Sénégal et est servi lors de toutes les cérémonies.",
      "En Égypte ancienne, l'hibiscus était réservé aux pharaons pour ses propriétés médicinales.",
      "Des études montrent que 3 tasses de bissap par jour peuvent réduire la tension de 7%.",
    ],
    faq: [
      {
        question: "Le bissap contient-il de la caféine ?",
        answer:
          "Non, le bissap est naturellement sans caféine. Vous pouvez le consommer à tout moment de la journée.",
      },
      {
        question: "Peut-on le boire chaud ?",
        answer:
          "Oui ! Le bissap est délicieux chaud en hiver, comme une tisane. Ajoutez une touche de miel.",
      },
      {
        question: "Est-ce bon pour la tension ?",
        answer:
          "Des études scientifiques ont démontré que le bissap aide à réguler la pression artérielle naturellement.",
      },
      {
        question: "Combien de temps se conserve-t-il ?",
        answer:
          "Au réfrigérateur, notre jus se conserve 5 jours après ouverture. Non ouvert : 3 semaines.",
      },
    ],
  },
  moringa: {
    id: "moringa",
    name: "Moringa",
    category: "Feuilles & Poudres",
    variants: [
      {
        id: "moringa-poudre",
        dose: "Poudre (100g) - Usage cosmétique",
        price: 7.0,
      },
      {
        id: "moringa-feuilles",
        dose: "Feuilles (100g) - Infusions",
        price: 7.0,
      },
    ],
    image: moringaImg,
    description:
      "L'arbre miracle africain. Le seul végétal contenant les 9 acides aminés essentiels.",
    detailedDescription:
      "Le Moringa oleifera, surnommé 'l'arbre miracle', est considéré comme l'une des plantes les plus nutritives au monde. Nous proposons deux formats : la poudre pour un usage cosmétique (masques, soins de la peau) et les feuilles séchées pour des infusions revigorantes. Le moringa est l'UN DES SEULS végétaux au monde à contenir les 9 acides aminés essentiels.",
    benefits: [
      "Contient les 9 acides aminés essentiels",
      "Booste l'immunité",
      "Anti-inflammatoire naturel",
      "Purifiant et détoxifiant",
      "Améliore la concentration",
      "Nourrit la peau (usage cosmétique)",
    ],
    nutritionalInfo: [
      { label: "Calcium", value: "17x plus que le lait" },
      { label: "Fer", value: "25x plus que les épinards" },
      { label: "Potassium", value: "15x plus que la banane" },
      { label: "Protéines", value: "27% avec 9 acides aminés" },
      { label: "Vitamine A", value: "10x plus que les carottes" },
    ],
    nutritionComparisons: [
      {
        nutrient: "Calcium",
        product: "2185mg/100g",
        comparison: "Lait : 125mg/100g",
      },
      {
        nutrient: "Fer",
        product: "28mg/100g",
        comparison: "Épinards : 2.7mg/100g",
      },
      {
        nutrient: "Protéines",
        product: "27g/100g",
        comparison: "Œuf : 13g/100g",
      },
      {
        nutrient: "Vitamine A",
        product: "18900 UI/100g",
        comparison: "Carotte : 1890 UI/100g",
      },
    ],
    usage:
      "Infusions : Infusez 1 cuillère à café de feuilles dans de l'eau chaude 5-10 min. Cosmétique : Mélangez la poudre avec de l'eau ou du miel pour un masque.",
    anecdotes: [
      "Le moringa est l'UN DES SEULS végétaux au monde contenant les 9 acides aminés essentiels.",
      "Appelé 'arbre de vie' car chaque partie de l'arbre est utilisable.",
      "L'OMS recommande le moringa pour lutter contre la malnutrition dans les pays en développement.",
    ],
    faq: [
      {
        question: "Quelle est la différence entre poudre et feuilles ?",
        answer:
          "La poudre est idéale pour les soins cosmétiques (masques, gommages). Les feuilles sont parfaites pour les infusions et tisanes.",
      },
      {
        question: "La poudre peut-elle être consommée ?",
        answer:
          "Notre poudre est formulée pour un usage cosmétique. Pour la consommation, préférez les feuilles en infusion.",
      },
      {
        question: "Combien d'infusions par jour ?",
        answer:
          "1 à 2 tasses par jour suffisent pour profiter des bienfaits. Évitez le soir car le moringa peut être stimulant.",
      },
      {
        question: "Y a-t-il des effets secondaires ?",
        answer:
          "Le moringa est très bien toléré. Commencez par de petites doses et augmentez progressivement.",
      },
    ],
  },
  ginger: {
    id: "ginger",
    name: "Jus de Gingembre",
    category: "Jus",
    variants: [
      { id: "ginger-50cl", dose: "50 cl", price: 4.0 },
      { id: "ginger-1l", dose: "1 litre", price: 7.0 },
    ],
    image: gingerImg,
    description:
      "Jus de gingembre frais bio. Excellent pour la digestion et l'immunité.",
    detailedDescription:
      "Notre jus de gingembre est préparé à partir de rhizomes de gingembre frais bio, cultivés au Sénégal sans pesticides. Cette boisson ancestrale, utilisée depuis plus de 5000 ans en médecine traditionnelle, est reconnue pour ses propriétés anti-inflammatoires, digestives et immunostimulantes. Son goût légèrement piquant et citronné vous revigorera instantanément.",
    benefits: [
      "Anti-inflammatoire puissant",
      "Aide à la digestion",
      "Booste le système immunitaire",
      "Antioxydant efficace",
      "Soulage les nausées",
      "Stimule la circulation",
    ],
    nutritionalInfo: [
      { label: "Gingérol", value: "Composé actif principal" },
      { label: "Manganèse", value: "Riche" },
      { label: "Cuivre", value: "Bonne source" },
      { label: "Magnésium", value: "Présent" },
      { label: "Vitamine B6", value: "Présent" },
    ],
    nutritionComparisons: [
      {
        nutrient: "Gingérol",
        product: "Très concentré",
        comparison: "Gingembre sec : Moins concentré",
      },
      {
        nutrient: "Composés anti-inflammatoires",
        product: "Élevé",
        comparison: "Curcuma : Élevé",
      },
      {
        nutrient: "Antioxydants",
        product: "Score ORAC élevé",
        comparison: "Ail : Score moyen",
      },
      {
        nutrient: "Effet thermogénique",
        product: "Fort",
        comparison: "Poivre : Modéré",
      },
    ],
    usage:
      "Buvez un petit verre (10-15cl) par jour, pur ou dilué. Excellent le matin pour réveiller l'organisme ou après un repas copieux.",
    anecdotes: [
      "Le gingembre était si précieux au Moyen Âge qu'une livre valait le prix d'un mouton.",
      "Les marins chinois mâchaient du gingembre pour combattre le mal de mer il y a 2000 ans.",
      "Le gingérol, son composé actif, a des effets comparables à l'ibuprofène sur l'inflammation.",
    ],
    faq: [
      {
        question: "Le jus est-il très piquant ?",
        answer:
          "Notre jus a un goût prononcé mais équilibré. Si vous n'êtes pas habitué, commencez par le diluer avec de l'eau ou du jus de pomme.",
      },
      {
        question: "Puis-je le boire pendant la grossesse ?",
        answer:
          "Le gingembre est reconnu pour soulager les nausées de grossesse. Consultez votre médecin pour les doses adaptées.",
      },
      {
        question: "À quel moment de la journée le boire ?",
        answer:
          "Le matin pour stimuler le métabolisme, ou après les repas pour faciliter la digestion. Évitez le soir si vous êtes sensible.",
      },
      {
        question: "Peut-on le chauffer ?",
        answer:
          "Oui ! Dilué dans de l'eau chaude avec du miel et du citron, c'est un excellent remède contre le rhume.",
      },
    ],
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { addToCart } = useCart();

  const product = id ? products[id] : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Produit introuvable
          </h1>
          <p className="text-muted-foreground mb-6">
            Le produit que vous recherchez n'existe pas.
          </p>
          <Link to="/produits">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariant];

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: currentVariant.price,
      image: product.image,
      dose: currentVariant.dose,
      variant: currentVariant.id,
      quantity,
    });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-background">
      {/* Bouton retour */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image du produit */}
          <div className="animate-fade-in">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-elegant">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Informations produit */}
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Sélection du format */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">
                Choisissez votre format :
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(index)}
                    className={`px-4 py-3 rounded-xl border-2 transition-all ${
                      selectedVariant === index
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="block font-semibold">{variant.dose}</span>
                    <span className="text-lg font-bold text-primary">
                      {variant.price.toFixed(2)}€
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantité et ajout au panier */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-foreground">
                    Quantité :
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-12 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Ajouter au panier -{" "}
                  {(currentVariant.price * quantity).toFixed(2)}€
                </Button>
              </div>
            </Card>

            {/* Description détaillée */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.detailedDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Sections supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Bienfaits */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Bienfaits
            </h3>
            <ul className="space-y-3">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Informations nutritionnelles */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Valeurs Nutritionnelles
            </h3>
            <div className="space-y-4">
              {product.nutritionalInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex justify-between items-center border-b border-border pb-2"
                >
                  <span className="text-muted-foreground">{info.label}</span>
                  <span className="font-semibold text-foreground">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Utilisation */}
        <Card className="p-8 mt-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Mode d'emploi
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.usage}
          </p>
        </Card>

        {/* NOUVELLE SECTION : Bienfaits détaillés avec comparatifs */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Découvrez les{" "}
            <span className="text-primary">Bienfaits en Détail</span>
          </h2>

          {/* Comparatifs nutritionnels */}
          <Card className="p-8 mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Comparatifs Nutritionnels
            </h3>
            <p className="text-muted-foreground mb-6">
              Comparez les valeurs nutritionnelles du {product.name} avec les
              aliments du quotidien :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.nutritionComparisons.map((comp, index) => (
                <div key={index} className="bg-muted p-4 rounded-xl">
                  <h4 className="font-semibold text-primary mb-2">
                    {comp.nutrient}
                  </h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Notre produit :
                      </span>
                      <p className="font-bold text-foreground">
                        {comp.product}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">vs</span>
                      <p className="text-sm text-muted-foreground">
                        {comp.comparison}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Anecdotes */}
          <Card className="p-8 bg-primary/5">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Le Saviez-Vous ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.anecdotes.map((anecdote, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    {anecdote}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* FAQ Accordion */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Questions <span className="text-primary">Fréquentes</span>
          </h2>
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {product.faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>

        {/* Processus de Fabrication */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Notre <span className="text-primary">Processus de Fabrication</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-foreground mb-2">
                1. Origine Sénégal
              </h4>
              <p className="text-sm text-muted-foreground">
                Cultivés dans nos propres champs au Sénégal, selon des méthodes
                traditionnelles et biologiques.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-foreground mb-2">
                2. Récolte Manuelle
              </h4>
              <p className="text-sm text-muted-foreground">
                Récolte à la main au moment optimal pour garantir une
                concentration maximale en nutriments.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-foreground mb-2">
                3. Contrôle Qualité
              </h4>
              <p className="text-sm text-muted-foreground">
                Chaque lot est testé et certifié pour garantir pureté et qualité
                exceptionnelle.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-foreground mb-2">
                4. Livraison France
              </h4>
              <p className="text-sm text-muted-foreground">
                Expédition rapide depuis notre centre en France pour préserver
                la fraîcheur.
              </p>
            </Card>
          </div>
        </section>

        {/* Paiement Sécurisé */}
        <section className="mt-16">
          <Card className="p-8 bg-gradient-primary">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Paiement 100% Sécurisé
                  </h3>
                  <p className="text-muted-foreground">
                    Vos données sont protégées par un cryptage SSL
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard className="h-6 w-6" />
                  <span>Carte Bancaire</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span>Stripe</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Section Avis Clients */}
        <ProductReviews productName={product.name} />

        {/* CTA */}
        <div className="text-center mt-12 p-8 bg-muted rounded-3xl">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Découvrez nos autres super-aliments
          </h3>
          <Link to="/produits">
            <Button variant="outline" size="lg">
              Voir tous les produits
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
