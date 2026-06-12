/**
 * Page Détail Produit - HYBRIDE (Connectée à la BDD + Données Riches + Anti-Crash Absolu)
 */
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
  XCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductReviews from "@/components/ProductReviews";
import productService from "@/services/productService";

// Données "riches" pour tes produits phares
const richContentData: any = {
  baobab: {
    variants: [
      { id: "baobab-50cl", dose: "50 cl", price: 3.0 },
      { id: "baobab-1l", dose: "1 litre", price: 5.0 },
    ],
    detailedDescription:
      "Le Jus de Bouille, issu de la pulpe du fruit du baobab africain, est un super-aliment ancestral aux vertus exceptionnelles. Utilisé depuis des millénaires en Afrique de l'Ouest, ce trésor nutritionnel concentre une richesse incomparable en vitamines, minéraux et fibres.",
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
    ],
    usage:
      "Buvez un verre (25cl) par jour, de préférence le matin à jeun ou en collation.",
    anecdotes: [
      "Le baobab peut vivre plus de 2000 ans et est surnommé 'l'arbre de vie'.",
      "Un seul baobab peut produire jusqu'à 200kg de fruits par an.",
    ],
    faq: [
      {
        question: "Combien de temps se conserve le jus ?",
        answer: "Conservez au réfrigérateur et consommez sous 5 jours.",
      },
      {
        question: "Puis-je le donner aux enfants ?",
        answer: "Oui ! Le jus est excellent pour les enfants dès 3 ans.",
      },
    ],
  },
  bissap: {
    variants: [
      { id: "bissap-50cl", dose: "50 cl", price: 3.0 },
      { id: "bissap-1l", dose: "1 litre", price: 5.0 },
    ],
    detailedDescription:
      "Le Jus de Bissap, boisson emblématique d'Afrique de l'Ouest, est préparé à partir de fleurs d'hibiscus fraîches. Cette boisson au goût acidulé est consommée depuis des siècles pour ses nombreuses vertus.",
    benefits: [
      "Régule la pression artérielle",
      "Détoxifiant naturel",
      "Riche en vitamine C",
      "Rafraîchissant",
      "Favorise la digestion",
    ],
    nutritionalInfo: [
      { label: "Antioxydants", value: "Très riche" },
      { label: "Vitamine C", value: "Riche" },
      { label: "Fer", value: "Bonne source" },
    ],
    nutritionComparisons: [
      {
        nutrient: "Antioxydants",
        product: "Score ORAC élevé",
        comparison: "Thé vert : Score moyen",
      },
    ],
    usage: "Buvez 1 à 2 verres par jour, froid de préférence.",
    anecdotes: [
      "Le bissap est la boisson nationale du Sénégal.",
      "En Égypte ancienne, l'hibiscus était réservé aux pharaons.",
    ],
    faq: [
      {
        question: "Le bissap contient-il de la caféine ?",
        answer: "Non, il est naturellement sans caféine.",
      },
      {
        question: "Est-ce bon pour la tension ?",
        answer:
          "Des études ont démontré qu'il aide à réguler la pression artérielle.",
      },
    ],
  },
  moringa: {
    variants: [
      { id: "moringa-poudre", dose: "Poudre (100g)", price: 7.0 },
      { id: "moringa-feuilles", dose: "Feuilles (100g)", price: 7.0 },
    ],
    detailedDescription:
      "Le Moringa oleifera, surnommé 'l'arbre miracle', est l'une des plantes les plus nutritives au monde. C'est l'UN DES SEULS végétaux à contenir les 9 acides aminés essentiels.",
    benefits: [
      "Contient les 9 acides aminés",
      "Booste l'immunité",
      "Anti-inflammatoire",
      "Détoxifiant",
    ],
    nutritionalInfo: [
      { label: "Calcium", value: "17x plus que le lait" },
      { label: "Fer", value: "25x plus que les épinards" },
    ],
    nutritionComparisons: [
      {
        nutrient: "Protéines",
        product: "27g/100g",
        comparison: "Œuf : 13g/100g",
      },
    ],
    usage:
      "Infusions : 1 cuillère à café dans l'eau chaude. Cosmétique : masque avec de l'eau.",
    anecdotes: [
      "L'arbre de vie où chaque partie est utilisable.",
      "Recommandé par l'OMS contre la malnutrition.",
    ],
    faq: [
      {
        question: "Quelle est la différence poudre/feuilles ?",
        answer: "Poudre = cosmétique. Feuilles = infusions.",
      },
    ],
  },
  ginger: {
    variants: [
      { id: "ginger-50cl", dose: "50 cl", price: 4.0 },
      { id: "ginger-1l", dose: "1 litre", price: 7.0 },
    ],
    detailedDescription:
      "Jus de gingembre frais bio cultivé sans pesticides. Une boisson reconnue pour ses propriétés digestives et immunostimulantes.",
    benefits: [
      "Anti-inflammatoire",
      "Aide à la digestion",
      "Booste l'immunité",
      "Soulage les nausées",
    ],
    nutritionalInfo: [
      { label: "Gingérol", value: "Actif principal" },
      { label: "Manganèse", value: "Riche" },
    ],
    nutritionComparisons: [
      {
        nutrient: "Gingérol",
        product: "Très concentré",
        comparison: "Gingembre sec : Moins concentré",
      },
    ],
    usage: "Un petit verre (10cl) pur ou dilué le matin.",
    anecdotes: [
      "Le gingembre valait le prix d'un mouton au Moyen Âge.",
      "Mâché par les marins chinois contre le mal de mer.",
    ],
    faq: [
      {
        question: "Est-ce très piquant ?",
        answer: "Diluez-le si vous n'êtes pas habitué.",
      },
      {
        question: "Peut-on le chauffer ?",
        answer: "Oui, excellent avec eau chaude, miel et citron.",
      },
    ],
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    const fetchDynamicProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const allProducts = await productService.getProducts();

        // 🔥 L'ANTI-CRASH ABSOLU : on cherche par ID, par slug, ou on fouille dans le nom du produit !
        const dbProduct = allProducts.find((p: any) => {
          const searchId = id.toLowerCase();
          const pId = p._id ? p._id.toString() : "";
          const pSlug = p.slug ? p.slug.toLowerCase() : "";
          const pName = p.name ? p.name.toLowerCase() : "";

          // 1. Est-ce que l'ID correspond ?
          if (pId === searchId) return true;
          // 2. Est-ce que le slug correspond ?
          if (pSlug === searchId) return true;
          // 3. Est-ce que le mot clé est caché dans le nom ? (ex: "bissap" dans "Jus de Bissap Bio")
          if (pName.includes(searchId)) return true;

          // 4. Cas particuliers pour tes vieilles URLs Lovable
          if (
            searchId === "baobab" &&
            (pName.includes("bouille") || pName.includes("baobab"))
          )
            return true;
          if (searchId === "ginger" && pName.includes("gingembre")) return true;

          return false; // Sinon on passe au suivant
        });

        if (!dbProduct) {
          setError(true);
          return;
        }

        const nameLower = dbProduct.name.toLowerCase();
        let extraData = null;

        // On vérifie si c'est un produit phare pour lui donner ses beaux textes
        if (nameLower.includes("baobab") || nameLower.includes("bouille"))
          extraData = richContentData.baobab;
        else if (nameLower.includes("bissap"))
          extraData = richContentData.bissap;
        else if (nameLower.includes("moringa"))
          extraData = richContentData.moringa;
        else if (
          nameLower.includes("gingembre") ||
          nameLower.includes("ginger")
        )
          extraData = richContentData.ginger;

        // Si c'est un NOUVEAU produit (ex: Lait de Coco), on génère des textes génériques
        if (!extraData) {
          extraData = {
            variants: [
              {
                id: "standard",
                dose: "Format Standard",
                price: dbProduct.price,
              },
            ],
            detailedDescription:
              dbProduct.description ||
              `Découvrez notre ${dbProduct.name}, un produit d'exception sélectionné avec soin par l'équipe Green Afreeca pour vous offrir le meilleur de la nature.`,
            benefits: [
              "Produit 100% Naturel",
              "Issu de l'agriculture responsable",
              "Riche en nutriments essentiels",
              "Qualité premium garantie",
            ],
            nutritionalInfo: [
              { label: "Qualité", value: "Premium" },
              { label: "Origine", value: "Sélection rigoureuse" },
              { label: "Catégorie", value: dbProduct.category },
            ],
            nutritionComparisons: [
              {
                nutrient: "Naturalité",
                product: "100% Brut",
                comparison: "Produits industriels : Transformés",
              },
            ],
            usage:
              "À consommer selon vos envies. Conserver dans un endroit propre, sec et à l'abri de la lumière.",
            anecdotes: [
              "Sélectionné de manière éthique par nos équipes.",
              "Un trésor naturel pour votre bien-être quotidien.",
            ],
            faq: [
              {
                question: "Comment conserver ce produit ?",
                answer: "À conserver à l'abri de la chaleur et de l'humidité.",
              },
              {
                question: "Quelle est la provenance ?",
                answer:
                  "Nous travaillons avec des producteurs passionnés pour garantir la meilleure qualité.",
              },
            ],
          };
        }

        // On fusionne la BDD et les textes, et on met dans le state !
        setProduct({
          id: dbProduct._id,
          name: dbProduct.name,
          category: dbProduct.category,
          stock: dbProduct.stock,
          image: dbProduct.image_url,
          price: dbProduct.price,
          description: dbProduct.description,
          ...extraData,
          // 💡 L'ÉCRASEMENT MAGIQUE : Le mode d'emploi de la BDD gagne toujours !
          usage: dbProduct.usage ? dbProduct.usage : extraData.usage,
        });
      } catch (err) {
        console.error("Produit introuvable :", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-pulse text-primary font-bold">
        Chargement du produit...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Produit introuvable
          </h1>
          <p className="text-muted-foreground mb-6">
            Le produit que vous recherchez n'existe pas ou a été retiré.
          </p>
          <Link to="/produits">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentVariant =
    product.variants && product.variants.length > 0
      ? product.variants[selectedVariant]
      : { dose: "Unité", price: product.price, id: "default" };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentVariant.price,
      image_url: product.image,
      dose: currentVariant.dose,
      variant: currentVariant.id,
      quantity,
    });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-elegant bg-gray-50 flex items-center justify-center">
              <img
                // 💡 Pareil ici, mais on utilise "product.image" car c'est comme ça qu'on l'a nommé dans le composant
                src={
                  product.image?.startsWith("http")
                    ? product.image
                    : `${import.meta.env.VITE_API_BASE_URL.replace("/api/", "")}${product.image}`
                }
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x600?text=Image+Produit";
                }}
              />
            </div>
          </div>

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

            {product.variants && product.variants.length > 1 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  Choisissez votre format :
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant: any, index: number) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedVariant === index
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="block font-semibold">
                        {variant.dose}
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {variant.price.toFixed(2)}€
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      Quantité :
                    </span>
                    <span
                      className={cn(
                        "text-[11px] font-medium px-2 py-0.5 rounded-full",
                        product.stock <= 5
                          ? "bg-red-50 text-red-600"
                          : "bg-gray-100 text-gray-600",
                      )}
                    >
                      {product.stock > 0
                        ? `${product.stock} disponibles`
                        : "Stock épuisé"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1 || product.stock <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-12 text-center">
                      {product.stock > 0 ? quantity : 0}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock || product.stock <= 0}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? (
                    <>
                      <ShoppingCart className="h-5 w-5" /> Ajouter au panier -{" "}
                      {(currentVariant.price * quantity).toFixed(2)}€
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" /> Produit épuisé
                    </>
                  )}
                </Button>
              </div>
            </Card>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Bienfaits
            </h3>
            <ul className="space-y-3">
              {product.benefits.map((benefit: string) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Informations
            </h3>
            <div className="space-y-4">
              {product.nutritionalInfo.map((info: any) => (
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

        <Card className="p-8 mt-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Mode d'emploi
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.usage}
          </p>
        </Card>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Découvrez les <span className="text-primary">Détails</span>
          </h2>

          {product.nutritionComparisons &&
            product.nutritionComparisons.length > 0 && (
              <Card className="p-8 mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Comparatifs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.nutritionComparisons.map(
                    (comp: any, index: number) => (
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
                            <span className="text-sm text-muted-foreground">
                              vs
                            </span>
                            <p className="text-sm text-muted-foreground">
                              {comp.comparison}
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </Card>
            )}

          <Card className="p-8 bg-primary/5">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Le Saviez-Vous ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.anecdotes.map((anecdote: string, index: number) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    {anecdote}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Questions <span className="text-primary">Fréquentes</span>
          </h2>
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {product.faq.map((item: any, index: number) => (
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
                Cultivés dans nos propres champs selon des méthodes biologiques.
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
                Récolte à la main au moment optimal pour garantir les
                nutriments.
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
                Chaque lot est testé et certifié pour garantir la pureté.
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
                Expédition rapide depuis notre centre en France.
              </p>
            </Card>
          </div>
        </section>

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

        <ProductReviews productName={product.name} />

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
