// src/pages/ResetPassword.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // On récupère le token depuis l'URL (ex: /resetpassword/monSuperToken)
  const { resettoken } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sécurité de base côté client
    if (password !== confirmPassword) {
      return toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
    }

    if (password.length < 8) {
      return toast({
        title: "Erreur",
        description: "Le mot de passe doit faire au moins 8 caractères.",
        variant: "destructive",
      });
    }

    setIsLoading(true);

    try {
      // On envoie le PUT au backend avec le token de l'URL
      const response = await fetch(
        `http://localhost:3000/api/auth/resetpassword/${resettoken}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Succès ! 🎉",
          description:
            "Votre mot de passe a été mis à jour. Vous êtes maintenant connecté.",
        });

        // Comme le backend nous renvoie le token JWT dans `data.token`, on le sauvegarde
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user));

        // On redirige vers l'accueil (ou le dashboard selon le rôle)
        navigate("/");
        // Optionnel : un petit rafraîchissement pour que la navbar se mette à jour
        window.location.reload();
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Lien invalide ou expiré.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur réseau",
        description: "Impossible de contacter le serveur.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-2">
            <Lock className="h-6 w-6 text-[#22c55e]" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Nouveau mot de passe
          </CardTitle>
          <CardDescription>
            Choisissez un mot de passe fort (minimum 8 caractères).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="space-y-2">
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Mise à jour..." : "Enregistrer et se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
