/**
 * Page Compte - Espace personnel utilisateur
 * Sidebar fonctionnelle liée aux onglets
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Package,
  LogOut,
  Edit,
  ChevronRight,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils"; // Utilitaire pour les classes conditionnelles

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

const mockOrders = [
  {
    id: "GA-12345678",
    date: "28 novembre 2024",
    status: "delivered",
    statusLabel: "Livré",
    total: 24.99,
    items: [
      { name: "Jus de Bissap", quantity: 2, price: 5.0 },
      { name: "Moringa Feuilles", quantity: 1, price: 7.0 },
    ],
  },
];

const Account = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // États
  const [user, setUser] = useState({
    firstName: "Utilisateur",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // État pour piloter les onglets

  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    toast({ title: "Déconnexion réussie", description: "À bientôt !" });
    navigate("/");
    window.location.reload();
  };

  const handleSaveProfile = () => {
    localStorage.setItem("userInfo", JSON.stringify(user));
    window.dispatchEvent(new Event("userLogin"));
    toast({
      title: "Profil mis à jour ! ✅",
      description: "Informations enregistrées.",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mon Espace Personnel 👤
          </h1>
          <p className="text-primary italic">
            🌿 Plantes d'Afrique, Energie authentique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar avec Boutons Fonctionnels */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-bold text-foreground">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Separator className="my-4" />
              <nav className="space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("profile")}
                  className={cn(
                    "w-full justify-start gap-2 transition-all",
                    activeTab === "profile"
                      ? "bg-primary/10 text-primary font-bold shadow-sm"
                      : "text-muted-foreground",
                  )}
                >
                  <User className="h-4 w-4" /> Mon profil
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("orders")}
                  className={cn(
                    "w-full justify-start gap-2 transition-all",
                    activeTab === "orders"
                      ? "bg-primary/10 text-primary font-bold shadow-sm"
                      : "text-muted-foreground",
                  )}
                >
                  <Package className="h-4 w-4" /> Mes commandes
                </Button>
              </nav>
              <Separator className="my-4" />
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full justify-start gap-2 text-destructive hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" /> Se déconnecter
              </Button>
            </Card>
          </div>

          {/* Contenu principal piloté par activeTab */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="orders">Commandes</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">
                      Informations personnelles 📝
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        "Annuler"
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" /> Modifier
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Prénom</Label>
                      {isEditing ? (
                        <Input
                          value={user.firstName}
                          onChange={(e) =>
                            setUser({ ...user, firstName: e.target.value })
                          }
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 rounded-md border">
                          {user.firstName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Nom</Label>
                      {isEditing ? (
                        <Input
                          value={user.lastName}
                          onChange={(e) =>
                            setUser({ ...user, lastName: e.target.value })
                          }
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 rounded-md border">
                          {user.lastName || "Non renseigné"}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      {isEditing ? (
                        <Input
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 rounded-md border">
                          {user.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Téléphone</Label>
                      {isEditing ? (
                        <Input
                          value={user.phone}
                          onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                          }
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 rounded-md border">
                          {user.phone || "Non renseigné"}
                        </p>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mt-6 flex justify-end">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-primary hover:bg-primary-dark"
                      >
                        Enregistrer ✅
                      </Button>
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Historique des commandes 📦
                  </h3>
                  {mockOrders.map((order) => {
                    const StatusIcon =
                      statusIcons[order.status as keyof typeof statusIcons];
                    return (
                      <div
                        key={order.id}
                        className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold">Commande {order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.date}
                            </p>
                          </div>
                          <Badge
                            className={
                              statusColors[
                                order.status as keyof typeof statusColors
                              ]
                            }
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {order.statusLabel}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <p className="font-bold text-primary">
                            {order.total.toFixed(2)}€
                          </p>
                          <Button variant="ghost" size="sm">
                            Détails <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
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
