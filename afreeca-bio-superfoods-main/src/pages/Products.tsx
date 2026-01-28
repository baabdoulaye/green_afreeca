import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Filter } from "lucide-react";
import productService from "../services/productService";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const URL_BACKEND = "http://localhost:3000";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
    productService.getProducts().then((data) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  /**
   * Nettoie le slug pour correspondre à tes URLs (baobab, ginger, bissap, moringa)
   * Si le slug en BDD est "jus-bissap-bio", il devient "bissap"
   */
  const getCleanUrl = (product: any) => {
    const textToSearch = (product.slug || product.name || "").toLowerCase();
    if (textToSearch.includes("bissap")) return "bissap";
    if (textToSearch.includes("moringa")) return "moringa";
    if (textToSearch.includes("ginger") || textToSearch.includes("gingembre"))
      return "ginger";
    if (textToSearch.includes("baobab") || textToSearch.includes("bouille"))
      return "baobab";
    return product.slug || product._id;
  };

  const filteredProducts = products.filter((p) => {
    if (filterCategory === "all") return true;
    return p.category.toLowerCase().includes(filterCategory.toLowerCase());
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#22c55e] font-bold text-xl tracking-widest uppercase">
          CHARGEMENT...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HEADER */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-[#22c55e] mb-2">
          Nos Super-Aliments Africains
        </h1>
        <p className="text-gray-500 text-sm">
          Des produits naturels, bio et puissants pour votre bien-être
        </p>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* FILTRES */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-1">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="border-none shadow-none focus:ring-0 w-[100px] text-gray-600">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="Jus">Jus</SelectItem>
                <SelectItem value="Poudre">Poudres</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* GRILLE DE PRODUITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => {
            const cleanUrl = getCleanUrl(p);

            return (
              <Card
                key={p._id}
                className="group overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] bg-white"
              >
                {/* Image cliquable avec Zoom + Cursor Pointer */}
                <Link
                  to={`/produits/${cleanUrl}`}
                  className="cursor-pointer block overflow-hidden"
                >
                  <div className="relative h-52 bg-gray-50">
                    <img
                      src={`${URL_BACKEND}${p.image_url}`}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/600x400?text=Produit+Green+Afreeca";
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-[#22c55e] text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                      À partir de {p.price.toFixed(2)}€
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <p className="text-[10px] font-extrabold text-[#22c55e] uppercase tracking-widest mb-1">
                    {p.category}
                  </p>

                  <h3 className="text-lg font-extrabold text-gray-900 mb-2 leading-tight">
                    {p.name}
                  </h3>

                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4 line-clamp-2 italic">
                    {p.description ||
                      "Un super-aliment d'exception, riche en nutriments."}
                  </p>

                  {/* Variantes */}
                  <div className="space-y-1 mb-6">
                    <div className="flex justify-between text-[11px] text-gray-500">
                      <span>50 cl / 100g</span>
                      <span className="font-bold text-[#22c55e]">
                        {p.price.toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-500">
                      <span>1 litre / 250g</span>
                      <span className="font-bold text-[#22c55e]">
                        {(p.price * 1.8).toFixed(2)}€
                      </span>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex gap-2">
                    <Link to={`/produits/${cleanUrl}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full border-gray-100 text-gray-500 rounded-xl h-12 text-xs font-bold transition-all duration-300 hover:bg-[#22c55e] hover:border-[#22c55e] hover:text-white"
                      >
                        Voir détails
                      </Button>
                    </Link>
                    <Button
                      className="bg-[#22c55e] hover:bg-[#16a34a] hover:scale-105 active:scale-95 text-white rounded-xl h-12 w-12 p-0 shadow-sm shadow-green-200 transition-all duration-300"
                      onClick={() =>
                        addToCart({
                          id: p._id,
                          name: p.name,
                          price: p.price,
                          image: p.image_url,
                          dose: "Standard",
                          variant: p.slug,
                        })
                      }
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer "Besoin d'aide" */}
      <section className="mt-20 py-12 bg-green-50/30 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Besoin d'aide pour choisir ?
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Contactez-nous pour des conseils personnalisés sur nos produits
        </p>

        <Link to="/contact">
          <Button className="bg-[#22c55e] hover:bg-[#16a34a] hover:shadow-lg hover:-translate-y-1 text-white px-8 rounded-xl h-12 font-bold transition-all duration-300">
            Nous contacter
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Products;
