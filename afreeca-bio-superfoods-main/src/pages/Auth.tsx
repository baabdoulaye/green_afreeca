/**
 * Page Authentification - Inscription et Connexion
 * 
 * Formulaires pour créer un compte ou se connecter
 * Fonctionnalité de mot de passe oublié incluse
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
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

const Auth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // Formulaire d'inscription
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  // Formulaire de connexion
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Gérer l'inscription
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulation - À connecter avec le backend
    setTimeout(() => {
      toast({
        title: "Compte créé !",
        description: "Bienvenue chez Green Afreeca"
      });
      setIsLoading(false);
    }, 1500);
  };

  // Gérer la connexion
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation - À connecter avec le backend
    setTimeout(() => {
      toast({
        title: "Connexion réussie !",
        description: "Bon retour parmi nous"
      });
      setIsLoading(false);
    }, 1500);
  };

  // Gérer la réinitialisation du mot de passe
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulation - À connecter avec le backend
    setTimeout(() => {
      setResetSent(true);
      setIsLoading(false);
      toast({
        title: "Email envoyé !",
        description: "Vérifiez votre boîte de réception"
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

          <Card className="p-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
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
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
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
                          onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
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
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
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
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
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
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
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
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        required
                      />
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
                : "Entrez votre adresse email pour recevoir un lien de réinitialisation."
              }
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
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? "Envoi..." : "Envoyer"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Vérifiez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passe.
                </p>
              </div>
              <Button 
                onClick={closeForgotPassword}
                className="w-full"
              >
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