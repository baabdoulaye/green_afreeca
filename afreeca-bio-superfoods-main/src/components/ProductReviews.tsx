/**
 * Composant ProductReviews - Avis clients sur un produit
 * 
 * Affiche dynamiquement les notes et commentaires clients
 */

import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ProductReviewsProps {
  productName: string;
  reviews?: Review[];
}

// Avis de démonstration
const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Sophie M.",
    rating: 5,
    comment: "Excellent produit ! Je le recommande à 100%. La qualité est au rendez-vous et les bienfaits se font ressentir rapidement. 🌟",
    date: "Il y a 1 semaine",
    verified: true
  },
  {
    id: 2,
    name: "Thomas L.",
    rating: 5,
    comment: "Livraison rapide et produit conforme à la description. Je suis conquis par le goût et l'effet sur mon énergie quotidienne ! 💪",
    date: "Il y a 2 semaines",
    verified: true
  },
  {
    id: 3,
    name: "Aminata D.",
    rating: 4,
    comment: "Très bon produit, authentique comme au Sénégal. J'aurais aimé un format plus grand mais sinon parfait ! 🇸🇳",
    date: "Il y a 3 semaines",
    verified: true
  },
  {
    id: 4,
    name: "Pierre B.",
    rating: 5,
    comment: "Ma famille adore ! Les enfants en redemandent. Un vrai plaisir naturel et bon pour la santé. ❤️",
    date: "Il y a 1 mois",
    verified: true
  }
];

const ProductReviews = ({ productName, reviews = defaultReviews }: ProductReviewsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  // Calcul des statistiques
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / totalReviews) * 100
  }));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
        }`}
      />
    ));
  };

  const renderInteractiveStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
        className="focus:outline-none transition-transform hover:scale-110"
      >
        <Star
          className={`h-8 w-8 ${
            i < (hoverRating || rating) 
              ? "text-yellow-400 fill-yellow-400" 
              : "text-muted-foreground"
          }`}
        />
      </button>
    ));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Note requise ⭐",
        description: "Veuillez sélectionner une note avant de soumettre votre avis.",
        variant: "destructive"
      });
      return;
    }

    if (name.trim().length < 2) {
      toast({
        title: "Nom requis 📝",
        description: "Veuillez entrer votre nom (minimum 2 caractères).",
        variant: "destructive"
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: "Commentaire trop court 💬",
        description: "Votre commentaire doit contenir au moins 10 caractères.",
        variant: "destructive"
      });
      return;
    }

    // Simulation d'envoi (pas de backend)
    toast({
      title: "Merci pour votre avis ! 🎉",
      description: "Votre commentaire sera publié après validation.",
    });

    // Reset form
    setRating(0);
    setName("");
    setComment("");
    setIsDialogOpen(false);
  };

  return (
    <section className="py-12 bg-muted rounded-3xl">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Avis Clients ⭐
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Résumé des notes */}
          <Card className="p-6">
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-primary mb-2">
                {averageRating.toFixed(1)}
              </p>
              <div className="flex justify-center gap-1 mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-sm text-muted-foreground">
                Basé sur {totalReviews} avis
              </p>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm w-8">{star} ★</span>
                  <Progress value={percentage} className="flex-grow h-2" />
                  <span className="text-sm text-muted-foreground w-8">{count}</span>
                </div>
              ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mt-6">
                  Écrire un avis ✍️
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Donnez votre avis ⭐</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitReview} className="space-y-6 mt-4">
                  {/* Note */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Votre note</Label>
                    <div className="flex gap-1 justify-center py-2">
                      {renderInteractiveStars()}
                    </div>
                    {rating > 0 && (
                      <p className="text-center text-sm text-muted-foreground">
                        {rating === 5 && "Excellent ! 🌟"}
                        {rating === 4 && "Très bien ! 😊"}
                        {rating === 3 && "Bien 👍"}
                        {rating === 2 && "Moyen 😐"}
                        {rating === 1 && "Pas satisfait 😕"}
                      </p>
                    )}
                  </div>

                  {/* Nom */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold">Votre prénom</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Marie D."
                      maxLength={50}
                    />
                  </div>

                  {/* Commentaire */}
                  <div className="space-y-2">
                    <Label htmlFor="comment" className="text-base font-semibold">Votre commentaire</Label>
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Partagez votre expérience avec ce produit..."
                      rows={4}
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {comment.length}/500 caractères
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Publier mon avis 🚀
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </Card>

          {/* Liste des avis */}
          <div className="lg:col-span-2 space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Quote className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-bold text-foreground">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {renderStars(review.rating)}
                          </div>
                          {review.verified && (
                            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                              ✓ Achat vérifié
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              </Card>
            ))}

            <div className="text-center pt-4">
              <Button variant="outline">
                Voir tous les avis ({totalReviews})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
