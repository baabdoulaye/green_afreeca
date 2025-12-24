/**
 * Page Contact - Formulaire de contact
 * 
 * Permet aux utilisateurs de nous contacter
 * Slogan : Plantes d'Afrique, Energie authentique.
 */

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation - À connecter avec MongoDB et système d'email
    setTimeout(() => {
      toast({
        title: "Message envoyé ! ✅",
        description: "Nous vous répondrons dans les plus brefs délais 😊"
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Contactez-nous 📬
          </h1>
          <p className="text-primary font-medium mb-2 italic">
            🌿 Plantes d'Afrique, Energie authentique.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Une question ? Un conseil ? Notre équipe est là pour vous aider 😊
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Informations de contact */}
          <div className="space-y-6">
            <Card className="p-6 animate-fade-in-up hover:shadow-elegant hover:scale-105 transition-all duration-300 cursor-pointer">
              <a href="mailto:green-afreeca@outlook.fr" className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Email ✉️</h3>
                  <p className="text-sm text-primary hover:underline">green-afreeca@outlook.fr</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Réponse sous 24h ⚡
                  </p>
                </div>
              </a>
            </Card>

            <Card className="p-6 animate-fade-in-up hover:shadow-elegant hover:scale-105 transition-all duration-300 cursor-pointer" style={{ animationDelay: "100ms" }}>
              <a href="tel:+33627857533" className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Téléphone 📞</h3>
                  <p className="text-sm text-primary hover:underline">06 27 85 75 33</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Lun-Ven 9h-18h 🕘
                  </p>
                </div>
              </a>
            </Card>

            <Card className="p-6 animate-fade-in-up hover:shadow-elegant hover:scale-105 transition-all duration-300" style={{ animationDelay: "200ms" }}>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Adresse 📍</h3>
                  <p className="text-sm text-muted-foreground">
                    4 rue Bobby Sands<br />
                    93200 Saint-Denis, France 🇫🇷
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Envoyez-nous un message 💌
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jean@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="De quoi souhaitez-vous parler ?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Votre message..."
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer le message ✨
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
