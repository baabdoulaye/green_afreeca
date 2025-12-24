/**
 * Page Compte - Espace personnel utilisateur
 * 
 * Dashboard utilisateur pour gérer :
 * - Informations personnelles
 * - Adresses de livraison/facturation
 * - Historique des commandes
 * 
 * Interface uniquement (sans backend)
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  MapPin, 
  Package, 
  Settings, 
  LogOut, 
  Edit, 
  Plus,
  ChevronRight,
  Clock,
  CheckCircle,
  Truck,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Données de démonstration
const mockUser = {
  firstName: "Marie",
  lastName: "Dupont",
  email: "marie.dupont@exemple.com",
  phone: "06 12 34 56 78"
};

const mockAddresses = [
  {
    id: 1,
    type: "Livraison",
    name: "Marie Dupont",
    address: "15 rue des Lilas",
    city: "Paris",
    postalCode: "75011",
    country: "France",
    isDefault: true
  },
  {
    id: 2,
    type: "Facturation",
    name: "Marie Dupont",
    address: "15 rue des Lilas",
    city: "Paris",
    postalCode: "75011",
    country: "France",
    isDefault: false
  }
];

const mockOrders = [
  {
    id: "GA-12345678",
    date: "28 novembre 2024",
    status: "delivered",
    statusLabel: "Livré",
    total: 24.99,
    items: [
      { name: "Jus de Bissap", quantity: 2, price: 5.00 },
      { name: "Moringa Feuilles", quantity: 1, price: 7.00 }
    ]
  },
  {
    id: "GA-12345679",
    date: "15 novembre 2024",
    status: "shipped",
    statusLabel: "En cours de livraison",
    total: 15.00,
    items: [
      { name: "Jus de Gingembre 1L", quantity: 2, price: 7.00 }
    ]
  },
  {
    id: "GA-12345680",
    date: "1 novembre 2024",
    status: "delivered",
    statusLabel: "Livré",
    total: 35.00,
    items: [
      { name: "Jus de Bouille 1L", quantity: 3, price: 5.00 },
      { name: "Jus de Bissap 50cl", quantity: 2, price: 3.00 },
      { name: "Moringa Poudre", quantity: 1, price: 7.00 }
    ]
  }
];

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800"
};

const Account = () => {
  const { toast } = useToast();
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour ! ✅",
      description: "Vos informations ont été enregistrées."
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mon Espace Personnel 👤
          </h1>
          <p className="text-primary italic">🌿 Plantes d'Afrique, Energie authentique.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-bold text-foreground">{user.firstName} {user.lastName}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              
              <Separator className="my-4" />
              
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" />
                  Mon profil
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Package className="h-4 w-4" />
                  Mes commandes
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <MapPin className="h-4 w-4" />
                  Mes adresses
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Paramètres
                </Button>
              </nav>

              <Separator className="my-4" />

              <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                <LogOut className="h-4 w-4" />
                Se déconnecter
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="orders">Commandes</TabsTrigger>
                <TabsTrigger value="addresses">Adresses</TabsTrigger>
              </TabsList>

              {/* Tab Profil */}
              <TabsContent value="profile">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">Informations personnelles 📝</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? "Annuler" : "Modifier"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Prénom</Label>
                      {isEditing ? (
                        <Input 
                          value={user.firstName}
                          onChange={(e) => setUser({...user, firstName: e.target.value})}
                        />
                      ) : (
                        <p className="text-foreground font-medium">{user.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Nom</Label>
                      {isEditing ? (
                        <Input 
                          value={user.lastName}
                          onChange={(e) => setUser({...user, lastName: e.target.value})}
                        />
                      ) : (
                        <p className="text-foreground font-medium">{user.lastName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      {isEditing ? (
                        <Input 
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                      ) : (
                        <p className="text-foreground font-medium">{user.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Téléphone</Label>
                      {isEditing ? (
                        <Input 
                          type="tel"
                          value={user.phone}
                          onChange={(e) => setUser({...user, phone: e.target.value})}
                        />
                      ) : (
                        <p className="text-foreground font-medium">{user.phone}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleSaveProfile}>
                        Enregistrer les modifications ✅
                      </Button>
                    </div>
                  )}
                </Card>

                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Sécurité 🔒</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Mot de passe</p>
                      <p className="text-sm text-muted-foreground">Dernière modification il y a 3 mois</p>
                    </div>
                    <Button variant="outline">Modifier</Button>
                  </div>
                </Card>
              </TabsContent>

              {/* Tab Commandes */}
              <TabsContent value="orders">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">Historique des commandes 📦</h3>
                  
                  <div className="space-y-4">
                    {mockOrders.map((order) => {
                      const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
                      return (
                        <div 
                          key={order.id}
                          className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-bold text-foreground">Commande {order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {order.statusLabel}
                            </Badge>
                          </div>
                          
                          <div className="space-y-1 mb-3">
                            {order.items.map((item, index) => (
                              <p key={index} className="text-sm text-muted-foreground">
                                {item.quantity}x {item.name}
                              </p>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <p className="font-bold text-primary">{order.total.toFixed(2)}€</p>
                            <Button variant="ghost" size="sm" className="gap-1">
                              Voir les détails
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>

              {/* Tab Adresses */}
              <TabsContent value="addresses">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">Mes adresses 📍</h3>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une adresse
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockAddresses.map((address) => (
                      <div 
                        key={address.id}
                        className="border border-border rounded-lg p-4 relative"
                      >
                        {address.isDefault && (
                          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                            Par défaut
                          </Badge>
                        )}
                        <p className="text-sm text-primary font-medium mb-2">{address.type}</p>
                        <p className="font-bold text-foreground">{address.name}</p>
                        <p className="text-muted-foreground">{address.address}</p>
                        <p className="text-muted-foreground">{address.postalCode} {address.city}</p>
                        <p className="text-muted-foreground">{address.country}</p>
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          {!address.isDefault && (
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Supprimer
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
