/**
 * Page Compte - Espace personnel utilisateur
 * Sidebar fonctionnelle liée aux onglets
 * Intégration réelle avec l'API des commandes et statuts dynamiques
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
  AlertCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

const Account = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // États - On blinde l'objet user avec tous les champs nécessaires
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "Sénégal",
  });

  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // 1. Chargement des infos utilisateur
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // On fusionne avec l'état initial pour éviter les champs undefined
      setUser((prev) => ({ ...prev, ...parsedUser }));
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  // 2. RÉCUPÉRATION RÉELLE DES COMMANDES 🚀
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token || activeTab !== "orders") return;

      setIsLoadingOrders(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok)
          throw new Error("Impossible de charger les commandes");

        const data = await response.json();
        setOrders(data);
      } catch (error: any) {
        console.error("Erreur historique:", error);
        toast({
          title: "Erreur ❌",
          description: "Impossible de récupérer ton historique.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [activeTab, toast]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    toast({
      title: "Vous êtes déconnecté",
      description: "À bientôt chez Green Afreeca !",
    });
    navigate("/");
    window.location.reload();
  };

  const handleSaveProfile = () => {
    localStorage.setItem("userInfo", JSON.stringify(user));
    window.dispatchEvent(new Event("userLogin"));
    toast({
      title: "Profil mis à jour ! ✅",
      description: "Toutes tes informations ont été enregistrées.",
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
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-bold text-lg text-foreground">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Mail className="h-3 w-3" /> {user.email}
                </p>
              </div>
              <Separator className="my-4" />
              <nav className="space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("profile")}
                  className={cn(
                    "w-full justify-start gap-2",
                    activeTab === "profile" &&
                      "bg-primary/10 text-primary font-bold",
                  )}
                >
                  <User className="h-4 w-4" /> Mon profil
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("orders")}
                  className={cn(
                    "w-full justify-start gap-2",
                    activeTab === "orders" &&
                      "bg-primary/10 text-primary font-bold",
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

          {/* Contenu principal */}
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
                          <Edit className="h-4 w-4 mr-2" /> Modifier le profil
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-8">
                    {/* Section Identité */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                        Identité
                      </h4>
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
                            <p className="p-2.5 bg-gray-50 rounded-md border text-foreground">
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
                            <p className="p-2.5 bg-gray-50 rounded-md border text-foreground">
                              {user.lastName || (
                                <span className="text-muted-foreground italic text-sm">
                                  Non renseigné
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <p className="p-2.5 bg-muted rounded-md border text-muted-foreground flex items-center gap-2">
                            <Mail className="h-4 w-4" /> {user.email}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label>Téléphone</Label>
                          {isEditing ? (
                            <Input
                              placeholder="+221 ..."
                              value={user.phone}
                              onChange={(e) =>
                                setUser({ ...user, phone: e.target.value })
                              }
                            />
                          ) : (
                            <p className="p-2.5 bg-gray-50 rounded-md border text-foreground flex items-center gap-2">
                              <Phone className="h-4 w-4 text-primary" />{" "}
                              {user.phone || (
                                <span className="text-muted-foreground italic text-sm">
                                  Non renseigné
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Section Adresse de livraison par défaut */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                        Adresse de livraison par défaut
                      </h4>
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <Label>Adresse (Rue, appartement...)</Label>
                          {isEditing ? (
                            <Input
                              placeholder="123 Rue de la Teranga"
                              value={user.address}
                              onChange={(e) =>
                                setUser({ ...user, address: e.target.value })
                              }
                            />
                          ) : (
                            <p className="p-2.5 bg-gray-50 rounded-md border text-foreground flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary" />{" "}
                              {user.address || (
                                <span className="text-muted-foreground italic text-sm">
                                  Aucune adresse enregistrée
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Ville</Label>
                            {isEditing ? (
                              <Input
                                value={user.city}
                                onChange={(e) =>
                                  setUser({ ...user, city: e.target.value })
                                }
                              />
                            ) : (
                              <p className="p-2.5 bg-gray-50 rounded-md border text-foreground">
                                {user.city || "-"}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label>Code Postal</Label>
                            {isEditing ? (
                              <Input
                                value={user.zipCode}
                                onChange={(e) =>
                                  setUser({ ...user, zipCode: e.target.value })
                                }
                              />
                            ) : (
                              <p className="p-2.5 bg-gray-50 rounded-md border text-foreground">
                                {user.zipCode || "-"}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label>Pays</Label>
                            {isEditing ? (
                              <Input
                                value={user.country}
                                onChange={(e) =>
                                  setUser({ ...user, country: e.target.value })
                                }
                              />
                            ) : (
                              <p className="p-2.5 bg-gray-50 rounded-md border text-foreground">
                                {user.country}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-8 flex justify-end gap-3">
                      <Button
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                      >
                        Annuler
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-primary hover:bg-primary-dark"
                      >
                        Enregistrer les modifications ✅
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

                  {isLoadingOrders ? (
                    <p className="text-center py-8">
                      Chargement des commandes...
                    </p>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Aucune commande trouvée. C'est le moment de craquer !
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => {
                        let statusKey: keyof typeof statusIcons = "pending";
                        let statusLabel = "En attente";

                        if (order.isDelivered) {
                          statusKey = "delivered";
                          statusLabel = "Livré";
                        } else if (order.isPaid) {
                          statusKey = "processing";
                          statusLabel = "En préparation";
                        } else if (order.status === "shipped") {
                          statusKey = "shipped";
                          statusLabel = "En cours de livraison";
                        }

                        const StatusIcon = statusIcons[statusKey] || Clock;

                        return (
                          <div
                            key={order._id}
                            className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="font-bold uppercase text-xs text-muted-foreground">
                                  ID: {order._id.slice(-8)}
                                </p>
                                <p className="text-sm font-medium">
                                  {new Date(order.createdAt).toLocaleDateString(
                                    "fr-FR",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    },
                                  )}
                                </p>
                              </div>
                              <Badge
                                className={cn(
                                  "flex items-center gap-1",
                                  statusColors[statusKey],
                                )}
                              >
                                <StatusIcon className="h-3 w-3" />
                                {statusLabel}
                              </Badge>
                            </div>

                            <div className="space-y-2 mb-4">
                              {order.orderItems.map(
                                (item: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="text-sm flex justify-between"
                                  >
                                    <span>
                                      {item.quantity}x {item.name}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {item.price.toFixed(2)}€
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-border">
                              <p className="font-bold text-primary text-lg">
                                Total : {order.totalPrice.toFixed(2)}€
                              </p>
                              <div className="flex gap-2">
                                <Badge
                                  variant="outline"
                                  className="text-[10px] uppercase font-light"
                                >
                                  {order.paymentMethod || "Stripe"}
                                </Badge>
                                {order.isPaid && (
                                  <Badge className="bg-green-50 text-green-700 border-green-200 text-[10px]">
                                    PAYÉ ✅
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
