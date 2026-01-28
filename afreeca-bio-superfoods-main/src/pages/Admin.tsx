import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingCart, Users, Trash2, Edit, Plus } from "lucide-react";
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

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // État pour le nouveau produit
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Jus",
    slug: "",
    description: "",
  });

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 42,
    totalUsers: 128,
    revenue: 3456.5,
  });

  useEffect(() => {
    fetchData();
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

  // 3. Modifie le handleSubmit pour gérer les deux cas
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      /* ... comme avant ... */
      name: newProduct.name,
      price: parseFloat(newProduct.price.toString().replace(",", ".")),
      slug: newProduct.slug,
      category: newProduct.category,
    };

    try {
      if (editingProduct) {
        // MODE EDITION
        await productService.updateProduct(editingProduct._id, productData);
        toast({
          title: "Produit mis à jour ! 🔄",
          description: `${productData.name} a été modifié.`,
        });
      } else {
        // MODE CREATION
        await productService.createProduct(productData);
        toast({
          title: "Produit créé ! ",
          description: `${productData.name} est en ligne.`,
        });
      }

      setIsDialogOpen(false);
      setEditingProduct(null); // Reset le mode edition
      setNewProduct({
        name: "",
        price: "",
        category: "Jus",
        slug: "",
        description: "",
      });
      fetchData();
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur ❌" });
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
          description: `${productName} a été retiré de la base de données.`,
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

  // 1. Ajoute un état pour savoir quel produit on modifie
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // 2. Fonction pour ouvrir le modal en mode "Edition"
  const openEditDialog = (product: any) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      slug: product.slug,
      description: product.description || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec dégradé subtil */}
      <div className="bg-gradient-to-r from-green-50 to-white py-8 mb-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#22c55e] mb-2 text-left">
            Dashboard Admin
          </h1>
          <p className="text-muted-foreground text-left">
            Gestion de Green Afreeca — Version Connectée 🔌
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-none shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-[#22c55e]" />
              </div>
              <span className="text-3xl font-bold text-gray-800">
                {stats.totalProducts}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground text-left">
              Produits en BDD
            </h3>
          </Card>
          {/* ... autres stats si tu veux les remplir plus tard ... */}
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="products" className="rounded-lg font-semibold">
              Produits
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg font-semibold">
              Commandes
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg font-semibold">
              Utilisateurs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card className="p-6 border-none shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Catalogue Dynamique
                </h2>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#22c55e] hover:bg-[#16a34a] gap-2 shadow-sm shadow-green-200">
                      <Plus className="h-4 w-4" /> Ajouter un produit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-[#22c55e]">
                        Nouveau Produit 🌿
                      </DialogTitle>
                      <DialogDescription>
                        Entrez les détails du nouveau produit pour votre
                        boutique.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                          placeholder="Lait de coco"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Prix (€)</Label>
                          <Input
                            id="price"
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
                        <div className="space-y-2">
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
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input
                          id="slug"
                          value={newProduct.slug}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              slug: e.target.value,
                            })
                          }
                          placeholder="lait-coco-vanille"
                          required
                        />
                      </div>
                      <DialogFooter className="pt-4">
                        <Button
                          type="submit"
                          className="w-full bg-[#22c55e] hover:bg-[#16a34a]"
                        >
                          Créer le produit
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {loading ? (
                <div className="text-center py-20 italic text-gray-400 animate-pulse">
                  Mise à jour du stock...
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((p) => (
                    <div
                      key={p._id}
                      className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl bg-gray-100 overflow-hidden border">
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
                          <p className="text-sm font-medium text-[#22c55e] uppercase tracking-wider">
                            {p.category} — {p.price.toFixed(2)}€
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl border-gray-200"
                          onClick={() => openEditDialog(p)} // On appelle la nouvelle fonction
                        >
                          <Edit className="h-4 w-4 mr-1" /> Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl border-gray-200 text-red-500 hover:bg-red-50 hover:text-red-700"
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
            <Card className="p-20 text-center border-none shadow-sm">
              <ShoppingCart className="h-12 w-12 text-blue-200 mx-auto mb-4" />
              <p className="text-gray-400">Aucune commande pour le moment.</p>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-20 text-center border-none shadow-sm">
              <Users className="h-12 w-12 text-purple-200 mx-auto mb-4" />
              <p className="text-gray-400">
                Accès restreint à la base de données utilisateurs.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
