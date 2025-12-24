/**
 * Composant ProductSlider - Carousel d'infos surprenantes
 * 
 * Affiche des faits étonnants sur les produits sous forme de slider
 */

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Sparkles } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

// Données des faits surprenants
const surprisingFacts = [
  {
    title: "Le Choc Vitamine C",
    product: "Jus de Bouille (Baobab)",
    fact: "La pulpe de bouye contient 6 à 10 fois plus de vitamine C que l'orange ! C'est un puissant antioxydant qui te donne un boost d'énergie de fou.",
    gradient: "from-primary/20 to-accent/20"
  },
  {
    title: "Plus Fort que le Lait",
    product: "Jus de Bouille (Baobab)",
    fact: "C'est une excellente source de calcium, avec 2 fois plus de calcium qu'un verre de lait pour la même quantité. Parfait pour les os !",
    gradient: "from-accent/20 to-secondary/20"
  },
  {
    title: "Champion des Fibres",
    product: "Jus de Bouille (Baobab)",
    fact: "Sa pulpe est extrêmement riche en fibres, aidant à améliorer le transit intestinal et à avoir une bonne sensation de satiété.",
    gradient: "from-primary/20 to-primary/10"
  },
  {
    title: "Le King des Minéraux",
    product: "Moringa",
    fact: "Pour 100g, la poudre de feuilles de Moringa a : jusqu'à 17 fois plus de calcium que le lait, 15 fois plus de potassium que la banane, et 25 fois plus de fer que les épinards.",
    gradient: "from-accent/20 to-primary/20"
  },
  {
    title: "Super-Protéines",
    product: "Moringa",
    fact: "Il contient les 8 acides aminés essentiels et plus de 25% de protéines dans sa poudre de feuilles séchées, ce qui est rare pour une plante.",
    gradient: "from-secondary/20 to-accent/20"
  },
  {
    title: "Purification Naturelle",
    product: "Moringa",
    fact: "Les graines de Moringa, une fois réduites en poudre, peuvent être utilisées pour purifier l'eau en agissant comme un floculant biodégradable, capturant les impuretés !",
    gradient: "from-primary/20 to-secondary/20"
  }
];

const ProductSlider = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Le Saviez-vous ?
          </h2>
          <Sparkles className="h-8 w-8 text-accent animate-pulse" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Des faits surprenants sur nos super-aliments qui vont vous étonner
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {surprisingFacts.map((fact, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card 
                className={`p-6 h-full bg-gradient-to-br ${fact.gradient} border-2 hover:shadow-elegant hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up cursor-pointer`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Sparkles className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-xs font-semibold text-primary bg-background px-2 py-1 rounded">
                      {fact.product}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground">
                    {fact.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fact.fact}
                  </p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-12" />
        <CarouselNext className="-right-4 md:-right-12" />
      </Carousel>
    </section>
  );
};

export default ProductSlider;
