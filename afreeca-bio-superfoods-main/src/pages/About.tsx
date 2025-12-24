/**
 * Page À Propos - Présentation de Green Afreeca
 * 
 * Histoire, valeurs et engagement de la marque
 */

import { Leaf, Heart, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import heroImg from "@/assets/hero-superfoods.jpg";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "100% Bio & Naturel 🌱",
      description: "Tous nos produits sont certifiés bio et sans additifs artificiels"
    },
    {
      icon: Heart,
      title: "Santé & Bien-être ❤️",
      description: "Des super-aliments riches en nutriments pour votre vitalité"
    },
    {
      icon: Users,
      title: "Commerce Équitable 🤝",
      description: "Nous soutenons les producteurs africains locaux"
    },
    {
      icon: Award,
      title: "Qualité Premium 🏆",
      description: "Contrôles qualité stricts et traçabilité complète"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={heroImg}
          alt="Super-aliments africains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
              À Propos de Green Afreeca 🌿
            </h1>
            <p className="text-xl text-white/90 max-w-2xl animate-fade-in">
              Votre partenaire pour une santé naturelle et puissante ✨
            </p>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6 animate-fade-in-up">
            GREEN AFREECA : plantes d'Afrique, énergie authentique 🌍
          </h2>
          <div className="space-y-4 text-muted-foreground animate-fade-in">
            <p className="text-lg">
              Bienvenue chez <strong className="text-primary">Green Afreeca</strong>, la marque qui réunit le meilleur de la nature africaine dans vos boissons, tisanes et préparations bien-être.
            </p>
            <p className="text-lg">
              Notre mission est simple : <strong>mettre en lumière les plantes, saveurs et savoir-faire d'Afrique</strong>, en créant des produits sains, modernes et accessibles à tous.
            </p>
          </div>
        </div>

        {/* Notre Histoire */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 animate-fade-in-up">
            Notre Histoire 📖
          </h2>
          <div className="space-y-4 text-muted-foreground animate-fade-in">
            <p>
              Green Afreeca est né d'une passion pour les trésors nutritionnels de l'Afrique 
              et d'une conviction profonde : les super-aliments naturels sont plus efficaces 
              que les compléments alimentaires synthétiques.
            </p>
            <p>
              Nos produits comme le Jus de Bouille (Baobab), le Bissap, le Moringa et le Gingembre 
              sont utilisés depuis des siècles en Afrique pour leurs propriétés exceptionnelles. 
              Nous les rendons accessibles à tous, dans leur forme la plus pure et naturelle.
            </p>
            <p>
              <strong className="text-primary">Le Jus de Bouille contient 6 fois plus de vitamine C que l'orange</strong> 
              {" "}et 2 fois plus de calcium que le lait. Le <strong className="text-primary">Moringa offre 
              17 fois plus de calcium que le lait</strong> et 25 fois plus de fer que les épinards.
            </p>
          </div>
        </div>

        {/* Nos Valeurs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Nos Valeurs 💚
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="p-6 text-center hover:shadow-elegant transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Engagement */}
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-gradient-primary">
            <h2 className="text-3xl font-bold text-foreground text-center mb-6">
              Notre Engagement 🎯
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                ✅ <strong>Qualité certifiée :</strong> Tous nos produits sont bio et testés en laboratoire
              </p>
              <p>
                ✅ <strong>Traçabilité totale :</strong> De la récolte à votre porte, nous suivons chaque étape
              </p>
              <p>
                ✅ <strong>Commerce équitable :</strong> Nous rémunérons justement nos producteurs africains
              </p>
              <p>
                ✅ <strong>Emballage écologique :</strong> Packaging recyclable et respectueux de l'environnement ♻️
              </p>
              <p>
                ✅ <strong>Transparence :</strong> Compositions claires et informations nutritionnelles complètes
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Prêt à découvrir nos super-aliments ? 🚀
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Commandez dès maintenant et profitez des bienfaits naturels de l'Afrique 🌍
          </p>
          <a href="/produits">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8">
              Voir nos produits
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
