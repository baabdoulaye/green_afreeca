/**
 * Page Admin - Dashboard administrateur
 * 
 * Gestion des produits, commandes et utilisateurs
 * NOTE: Version frontend uniquement pour l'instant, nécessite un backend pour être fonctionnel
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  // États pour les statistiques (données statiques pour l'instant)
  const [stats] = useState({
    totalProducts: 4,
    totalOrders: 42,
    totalUsers: 128,
    revenue: 3456.50
  });

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <div className="bg-gradient-primary py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-2">Dashboard Admin</h1>
          <p className="text-muted-foreground">Gestion de Green Afreeca</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-elegant transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-bold text-primary">{stats.totalProducts}</span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">Produits</h3>
          </Card>

          <Card className="p-6 hover:shadow-elegant transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-3xl font-bold text-accent-foreground">{stats.totalOrders}</span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">Commandes</h3>
          </Card>

          <Card className="p-6 hover:shadow-elegant transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <span className="text-3xl font-bold text-secondary">{stats.totalUsers}</span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">Utilisateurs</h3>
          </Card>

          <Card className="p-6 hover:shadow-elegant transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-bold text-primary">{stats.revenue.toFixed(2)}€</span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">Revenu</h3>
          </Card>
        </div>

        {/* Tabs de gestion */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>

          {/* Onglet Produits */}
          <TabsContent value="products">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Gestion des Produits</h2>
                <Button>Ajouter un produit</Button>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-foreground">Jus de Bouille (Baobab)</h3>
                      <p className="text-sm text-muted-foreground">1 litre - 8,00€</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="outline" size="sm">Supprimer</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-foreground">Bissap</h3>
                      <p className="text-sm text-muted-foreground">1 litre - 6,00€</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="outline" size="sm">Supprimer</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-foreground">Moringa</h3>
                      <p className="text-sm text-muted-foreground">100 grammes - 9,00€</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="outline" size="sm">Supprimer</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-foreground">Gingembre Bio</h3>
                      <p className="text-sm text-muted-foreground">1 litre - 7,00€</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="outline" size="sm">Supprimer</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Onglet Commandes */}
          <TabsContent value="orders">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Gestion des Commandes</h2>
              <div className="bg-muted/50 p-8 rounded-lg text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  La gestion des commandes nécessite une connexion au backend
                </p>
                <p className="text-sm text-muted-foreground">
                  Activez Lovable Cloud pour activer cette fonctionnalité
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Onglet Utilisateurs */}
          <TabsContent value="users">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Gestion des Utilisateurs</h2>
              <div className="bg-muted/50 p-8 rounded-lg text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  La gestion des utilisateurs nécessite une connexion au backend
                </p>
                <p className="text-sm text-muted-foreground">
                  Activez Lovable Cloud pour activer cette fonctionnalité
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Avertissement Backend */}
        <Card className="p-6 mt-8 bg-accent/10 border-accent">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⚠️</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Fonctionnalité Backend Requise</h3>
              <p className="text-muted-foreground mb-4">
                Pour activer pleinement ce dashboard (gestion des commandes, utilisateurs, authentification, base de données), 
                vous devez connecter un backend. Lovable propose Lovable Cloud qui vous donne accès à :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Base de données PostgreSQL</li>
                <li>Authentification utilisateur</li>
                <li>Stockage de fichiers</li>
                <li>API serverless</li>
                <li>Intégration Stripe pour les paiements</li>
              </ul>
              <Link to="/">
                <Button>Retour à l'accueil</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
