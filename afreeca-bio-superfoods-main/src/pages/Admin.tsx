import { useNavigate } from "react-router-dom"; // 💡 À rajouter dans tes imports
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  Users,
  Trash2,
  Edit,
  Plus,
  CheckCircle,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import productService from "../services/productService";
import { cn } from "@/lib/utils";

const Admin = () => {
  const { toast } = useToast();

  const navigate = useNavigate(); // 💡 Initialisation du navigateur pour les redirections

  const [isAuthorized, setIsAuthorized] = useState(false);

  const [products, setProducts] = useState<any[]>([]);

  const [orders, setOrders] = useState<any[]>([]); // Nouvel état pour les commandes

  const [loading, setLoading] = useState(true);

  const [ordersLoading, setOrdersLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",

    price: "",

    category: "Jus",

    slug: "",

    description: "",

    stock: 0,
  });

  const [stats, setStats] = useState({
    totalProducts: 0,

    totalOrders: 0,

    totalUsers: 128,

    revenue: 0,
  });

  useEffect(() => {
    const userInfoStr = localStorage.getItem("userInfo");

    if (!userInfoStr) {
      navigate("/auth");
      return;
    }

    try {
      const userInfo = JSON.parse(userInfoStr);
      if (userInfo.role !== "admin") {
        navigate("/");
        return;
      }

      // 🛑 SUPPRIME LA LIGNE setIsAuthorized(true) ICI !
      // On lance juste les requêtes dans l'ombre.
      fetchData();
      fetchOrders();
    } catch (error) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      navigate("/auth");
    }
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts();
      setProducts(data || []);
      setStats((prev) => ({ ...prev, totalProducts: data?.length || 0 }));
    } catch (error) {
      console.error("Erreur fetchData:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchOrders = async () => {
    setOrdersLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 🚨 SI LE SERVEUR REFUSE (Le hacker est démasqué)
      if (response.status === 401 || response.status === 403) {
        toast({
          title: "Bien tenté ! 🕵️‍♂️",
          description: "La sécurité serveur a bloqué ton accès. Déconnexion.",
          variant: "destructive",
        });

        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");

        // 💥 HARD REDIRECT : On rafraîchit la page violemment pour purger la Navbar
        window.location.href = "/auth";
        return;
      }

      // 👑 SI LE SERVEUR ACCEPTE : C'est le vrai Admin ! On lève enfin le rideau visuel !
      setIsAuthorized(true);

      const data = await response.json();

      if (Array.isArray(data)) {
        setOrders(data);
        const totalRev = data.reduce(
          (acc: number, o: any) => acc + (o.isPaid ? o.totalPrice : 0),
          0,
        );
        setStats((prev) => ({
          ...prev,
          totalOrders: data.length,
          revenue: totalRev,
        }));
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Erreur fetch orders:", error);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const deliverOrder = async (orderId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/orders/${orderId}/deliver`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        toast({
          title: "Succès ✅",
          description: "Commande marquée comme livrée !",
        });
        fetchOrders(); // Rafraîchissement automatique
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la mise à jour",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. On prépare l'objet avec le champ 'stock' (converti en nombre)
    const productData = {
      name: newProduct.name,
      price: parseFloat(newProduct.price.toString().replace(",", ".")),
      stock: parseInt(newProduct.stock.toString() || "0"), // Ajout du stock ici
      category: newProduct.category,
      // Sécurité : si le slug est vide, on en génère un à partir du nom
      slug:
        newProduct.slug ||
        newProduct.name.toLowerCase().trim().replace(/\s+/g, "-"),
      // Sécurité : description par défaut si vide
      description:
        newProduct.description ||
        `Délicieux ${newProduct.name} de Green Afreeca.`,
      image_url: "/placeholder.png", // Valeur par défaut pour éviter l'erreur backend
    };

    try {
      if (editingProduct) {
        // MODE EDITION
        await productService.updateProduct(editingProduct._id, productData);
        toast({
          title: "Produit mis à jour ! 🔄",
          description: `${productData.name} a été modifié avec un stock de ${productData.stock}.`,
        });
      } else {
        // MODE CREATION
        await productService.createProduct(productData);
        toast({
          title: "Produit créé ! 🌿",
          description: `${productData.name} est en ligne avec un stock de ${productData.stock}.`,
        });
      }

      // 2. On ferme et on reset tout proprement
      setIsDialogOpen(false);
      setEditingProduct(null);
      setNewProduct({
        name: "",
        price: "",
        category: "Jus",
        slug: "",
        description: "",
        stock: 0, // On reset aussi le stock en string pour l'input
      });

      // 3. On rafraîchit la liste pour voir les changements
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast({
        variant: "destructive",
        title: "Erreur ❌",
        description: "Vérifie que tous les champs sont bien remplis.",
      });
    }
  };

  const handleDelete = async (id: string, productName: string) => {
    if (window.confirm(`Voulez-vous vraiment supprimer ${productName} ?`)) {
      try {
        await productService.deleteProduct(id);
        fetchData();
        toast({
          variant: "destructive",
          title: "Produit supprimé",
          description: `${productName} a été retiré.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de supprimer ce produit.",
        });
      }
    }
  };

  const openEditDialog = (product: any) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      slug: product.slug,
      description: product.description || "",
      stock: product.stock,
    });
    setIsDialogOpen(true);
  };

  // 🛑 BINGO ! C'EST ICI QU'IL FAUT LE CALER 🛑
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-[#22c55e] font-bold text-xl tracking-widest uppercase">
          Vérification des accès sécurisés...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-left">
      <div className="bg-gradient-to-r from-green-50 to-white py-8 mb-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#22c55e] mb-2">
            Dashboard Admin
          </h1>
          <p className="text-muted-foreground">
            Gestion de Green Afreeca — Version Centralisée du QG
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-none shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-[#22c55e]" />
              </div>
              <span className="text-3xl font-bold text-gray-800">
                {stats.totalProducts}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">
              Produits
            </h3>
          </Card>

          <Card className="p-6 border-none shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-500" />
              </div>
              <span className="text-3xl font-bold text-gray-800">
                {stats.totalOrders}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">
              Commandes
            </h3>
          </Card>

          <Card className="p-6 border-none shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-xl font-bold text-yellow-600">€</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {stats.revenue.toFixed(2)}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">
              Revenu (Payé)
            </h3>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card className="p-6 border-none shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Catalogue</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#22c55e] hover:bg-[#16a34a] gap-2">
                      <Plus className="h-4 w-4" /> Ajouter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-[#22c55e]">
                        Nouveau Produit
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="name">Nom du produit</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                          placeholder="Ex: Jus de Bouille"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-left">
                          <Label htmlFor="price">Prix (€)</Label>
                          <Input
                            id="price"
                            type="text"
                            value={newProduct.price}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                price: e.target.value,
                              })
                            }
                            placeholder="6.50"
                            required
                          />
                        </div>
                        <div className="space-y-2 text-left">
                          <Label htmlFor="stock">Stock initial</Label>
                          <Input
                            id="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                stock: parseFloat(e.target.value),
                              })
                            }
                            placeholder="50"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2 text-left">
                        <Label htmlFor="category">Catégorie</Label>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={newProduct.category}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="Jus">Jus</option>
                          <option value="Poudre">Poudre</option>
                          <option value="Jus/Poudre">Jus/Poudre</option>
                        </select>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#22c55e] hover:bg-[#16a34a] mt-4"
                      >
                        {editingProduct ? "Mettre à jour" : "Créer le produit"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {loading ? (
                <div className="text-center py-20 italic text-gray-400">
                  Mise à jour du stock...
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((p) => (
                    <div
                      key={p._id}
                      className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 flex justify-between items-center shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl bg-gray-100 overflow-hidden border shrink-0">
                          <img
                            src={`http://localhost:3000${p.image_url}`}
                            className="w-full h-full object-cover"
                            alt={p.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/100x100?text=BIO";
                            }}
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-gray-900 leading-tight">
                            {p.name}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                            <p className="text-sm font-medium text-[#22c55e] uppercase tracking-wider">
                              {p.category} — {p.price.toFixed(2)}€
                            </p>

                            {/* BADGE DE STOCK DYNAMIQUE */}
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[10px] px-2 py-0 h-5 border-none font-semibold w-fit",
                                p.stock <= 0
                                  ? "bg-red-100 text-red-700 animate-pulse" // Rouge clignotant si rupture
                                  : p.stock <= 10
                                    ? "bg-orange-100 text-orange-700" // Orange si stock faible
                                    : "bg-green-100 text-green-700", // Vert si tout est OK
                              )}
                            >
                              {p.stock <= 0
                                ? "RUPTURE ⚠️"
                                : `${p.stock} en réserve`}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl border-gray-200 hover:bg-green-50 hover:text-green-600 transition-colors"
                          onClick={() => openEditDialog(p)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl border-gray-200 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                          onClick={() => handleDelete(p._id, p.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="p-6 border-none shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Suivi des Commandes
              </h2>
              {ordersLoading ? (
                <div className="text-center py-20 italic text-gray-400">
                  Chargement du QG...
                </div>
              ) : orders.length === 0 ? (
                <div className="p-20 text-center">
                  <ShoppingCart className="h-12 w-12 text-blue-200 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Aucune commande pour le moment.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  {/* On vérifie si "orders" est bien une liste et s'il y a des commandes dedans */}
                  {Array.isArray(orders) && orders.length > 0 ? (
                    orders.map((order) => (
                      <div
                        key={order._id}
                        className="p-5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm bg-white"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-[#22c55e]" />
                              <span className="font-bold text-gray-900">
                                {/* Sécurité : affiche "Client" si le nom est introuvable */}
                                {order.user?.firstName || "Client"}{" "}
                                {order.user?.lastName || ""}
                              </span>
                              <Badge
                                className={cn(
                                  "ml-2 rounded-lg border-none",
                                  order.isDelivered
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800",
                                )}
                              >
                                {order.isDelivered ? "LIVRÉ" : "EN ATTENTE"}
                              </Badge>
                            </div>

                            {/* Adresse de livraison sécurisée */}
                            <p className="text-sm text-muted-foreground italic">
                              📍{" "}
                              {order.shippingAddress?.street ||
                                "Adresse non renseignée"}
                              , {order.shippingAddress?.city || ""}
                            </p>

                            {/* Liste des articles achetés */}
                            <div className="text-xs text-gray-500 pt-1 bg-gray-50 p-2 rounded-lg">
                              {order.orderItems?.map((item: any, i: number) => (
                                <span key={i}>
                                  {item.quantity}x {item.name}
                                  {i < order.orderItems.length - 1 ? ", " : ""}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-between gap-3">
                            <span className="text-xl font-bold text-[#22c55e]">
                              {/* Sécurité sur le prix */}
                              {order.totalPrice
                                ? Number(order.totalPrice).toFixed(2)
                                : "0.00"}{" "}
                              €
                            </span>

                            {/* Bouton pour livrer - ne s'affiche que si pas encore livré */}
                            {!order.isDelivered && (
                              <Button
                                size="sm"
                                className="bg-[#22c55e] hover:bg-[#16a34a] rounded-xl shadow-sm"
                                onClick={() =>
                                  window.confirm(
                                    `Confirmer la livraison pour ${order.user?.firstName || "ce client"} ? 🚚`,
                                  ) && deliverOrder(order._id)
                                }
                              >
                                <CheckCircle className="h-4 w-4 mr-2" /> Marquer
                                comme Livré
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    /* Ce qui s'affiche si la liste est vide ou si tu n'es pas connecté */
                    <div className="p-20 text-center border-2 border-dashed rounded-3xl bg-gray-50/50">
                      <ShoppingCart className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                      <p className="text-gray-400 font-medium">
                        Aucune commande trouvée ou session expirée. 🔌
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-20 text-center border-none shadow-sm">
              <Users className="h-12 w-12 text-purple-200 mx-auto mb-4" />
              <p className="text-gray-400">
                Accès restreint aux données utilisateurs.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
