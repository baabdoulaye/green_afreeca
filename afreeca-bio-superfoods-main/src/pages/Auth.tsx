/**
 * Page Authentification - Inscription et Connexion
 * * Formulaires pour créer un compte ou se connecter
 * Fonctionnalité de mot de passe oublié incluse
 * Intégration Backend Réelle & Gestion d'état global
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const API_URL = "http://localhost:3000/api/auth";

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // États pour la visibilité des mots de passe
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Formulaire d'inscription
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Formulaire de connexion
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Gérer l'inscription Réelle
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          email: signupData.email,
          phone: signupData.phone,
          password: signupData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Erreur lors de l'inscription");

      toast({
        title: "Compte créé !",
        description:
          "Bienvenue chez Green Afreeca. Vous pouvez maintenant vous connecter.",
      });

      // Bascule automatique vers l'onglet connexion
      const loginTab = document.querySelector(
        '[data-value="login"]',
      ) as HTMLElement;
      if (loginTab) loginTab.click();
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la connexion Réelle
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Identifiants invalides");

      // MAPPING ROBUSTE : On vérifie toutes les sources possibles du prénom
      const userToSave = {
        firstName: data.user?.firstName || data.firstName || "Utilisateur",
        lastName: data.user?.lastName || data.lastName || "",
        email: data.user?.email || data.email || loginData.email,
      };

      // ÉTAPE 3 : Stockage propre des infos pour la Navbar
      localStorage.setItem("userInfo", JSON.stringify(userToSave));

      // On déclenche l'événement personnalisé pour prévenir la Navbar immédiatement
      window.dispatchEvent(new Event("userLogin"));

      toast({
        title: "Connexion réussie",
        description: `Ravi de vous revoir, ${userToSave.firstName} !`,
      });

      // Redirection vers l'accueil
      navigate("/");

      // Optionnel : reload uniquement si l'event userLogin n'est pas capté par ta Navbar
      // window.location.reload();
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la réinitialisation (Simulation)
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setResetSent(true);
      setIsLoading(false);
      toast({
        title: "Email envoyé !",
        description: "Vérifiez votre boîte de réception",
      });
    }, 1500);
  };

  const closeForgotPassword = () => {
    setForgotPasswordOpen(false);
    setResetEmail("");
    setResetSent(false);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in-up">
              Mon Compte
            </h1>
            <p className="text-muted-foreground animate-fade-in">
              Créez un compte ou connectez-vous pour continuer
            </p>
          </div>

          <Card
            className="p-6 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="signup">Inscription</TabsTrigger>
              </TabsList>

              {/* Formulaire de connexion */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="votre@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showLoginPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Connexion..." : "Se connecter"}
                  </Button>

                  <div className="text-center text-sm">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                      className="text-primary hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                </form>
              </TabsContent>

              {/* Formulaire d'inscription */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Prénom"
                          className="pl-10"
                          value={signupData.firstName}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              firstName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Nom"
                        value={signupData.lastName}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            lastName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="votre@email.com"
                        className="pl-10"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        className="pl-10"
                        value={signupData.phone}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowSignupPassword(!showSignupPassword)
                        }
                        className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showSignupPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirmer le mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Création..." : "Créer mon compte"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    En créant un compte, vous acceptez nos{" "}
                    <Link to="/cgv" className="text-primary hover:underline">
                      conditions générales
                    </Link>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Modal Mot de passe oublié */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mot de passe oublié</DialogTitle>
            <DialogDescription>
              {resetSent
                ? "Un email de réinitialisation a été envoyé à votre adresse."
                : "Entrez votre adresse email pour recevoir un lien de réinitialisation."}
            </DialogDescription>
          </DialogHeader>

          {!resetSent ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-10"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForgotPassword}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Envoi..." : "Envoyer"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Vérifiez votre boîte de réception et suivez les instructions
                  pour réinitialiser votre mot de passe.
                </p>
              </div>
              <Button onClick={closeForgotPassword} className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la connexion
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
