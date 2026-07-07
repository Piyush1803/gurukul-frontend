import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { API_BASE_URL } from "../main";
import { SectionHeader } from "@/components/bakery/SectionHeader";
import { ProductCard, type ProductCardData } from "@/components/bakery/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string | null;
  description: string | null;
  price: number;
  imageUrl: string;
  type: "deliciousCake" | "dryCake" | "cupCake" | "brownie" | "cookie" | "mousse" | "donut";
  flavor?: string;
  quantity?: number;
  rating?: number;
}

type CategoryKey =
  | "all"
  | "deliciousCakes"
  | "dryCakes"
  | "cupCakes"
  | "brownies"
  | "cookies"
  | "mousses"
  | "donuts";

interface ProductsProps {
  embedded?: boolean;
}

const Products = ({ embedded = false }: ProductsProps) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);
      try {
        const baseUrl = `${API_BASE_URL}/product`;
        const categoryMap = {
          all: "",
          deliciousCakes: "deliciousCake",
          dryCakes: "dryCake",
          cupCakes: "cupCake",
          brownies: "brownie",
          cookies: "cookie",
          mousses: "mousse",
          donuts: "donut",
        } as const;

        const selectedType = categoryMap[activeCategory];
        const url =
          activeCategory === "all" ? `${baseUrl}/all` : `${baseUrl}/all/${selectedType}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();

        if (activeCategory === "all") {
          const {
            deliciousCakes = [],
            dryCakes = [],
            cupCakes = [],
            brownies = [],
            cookies = [],
            mousses = [],
            donuts = [],
          } = result.data || {};
          setProducts([
            ...deliciousCakes,
            ...dryCakes,
            ...cupCakes,
            ...brownies,
            ...cookies,
            ...mousses,
            ...donuts,
          ]);
        } else {
          setProducts(Array.isArray(result.data) ? result.data : []);
        }
      } catch (err) {
        // Distinguish a real failure (network/CORS/5xx) from a genuinely empty category.
        console.error("Products: failed to load products", err);
        setError(true);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, reloadKey]);

  const categories: { key: CategoryKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "deliciousCakes", label: "Cakes" },
    { key: "dryCakes", label: "Dry Cakes" },
    { key: "cupCakes", label: "Cupcakes" },
    { key: "donuts", label: "Donuts" },
    { key: "brownies", label: "Brownies" },
    { key: "cookies", label: "Cookies" },
    { key: "mousses", label: "Mousse" },
  ];

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    addItem(
      {
        id: product.id,
        name: product.name ?? product.flavor ?? "Item",
        price: product.price,
        image: product.imageUrl,
      },
      1
    );
  };

  const toCardData = (p: Product, index: number): ProductCardData => ({
    id: p.id,
    name: p.name ?? p.flavor ?? "Item",
    description: p.description,
    price: p.price,
    imageUrl: p.imageUrl,
    rating: p.rating,
    isFresh: index % 3 === 0,
    isPopular: (p.rating ?? 0) >= 4 || index % 4 === 1,
  });

  return (
    <div className={cn(!embedded && "pt-16 sm:pt-20 min-h-screen")}>
      {!embedded && (
        <section className="section-padding pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
          <div className="container-bakery relative">
            <SectionHeader
              eyebrow="The Menu"
              title="Our Products"
              description="Fresh baked goods made with love — order your favorites today."
            />
          </div>
        </section>
      )}

      {embedded && (
        <div className="container-bakery pt-8 sm:pt-12">
          <SectionHeader
            eyebrow="The Menu"
            title="Fresh From the Oven"
            description="Explore our daily selection of cakes, pastries, and sweet delights."
          />
        </div>
      )}

      <section className={cn("pb-8", embedded ? "pt-0" : "")}>
        <div className="container-bakery">
          <Reveal>
            <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActiveCategory(category.key)}
                  className={cn(
                    "shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === category.key
                      ? "bg-gradient-primary text-primary-foreground shadow-warm scale-105"
                      : "bg-card border border-border/60 text-muted-foreground hover:border-primary/30 hover:text-primary"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-bakery">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-3xl bg-muted animate-pulse aspect-[3/4]" />
              ))}
            </div>
          ) : error ? (
            <Reveal>
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground mb-6">
                  We couldn't load the products right now. Please try again in a moment.
                </p>
                <button
                  type="button"
                  onClick={() => setReloadKey((k) => k + 1)}
                  className="px-6 py-2.5 rounded-full text-sm font-medium bg-gradient-primary text-primary-foreground shadow-warm transition-all duration-300 hover:scale-105"
                >
                  Retry
                </button>
              </div>
            </Reveal>
          ) : products.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={toCardData(product, index)}
                    onAdd={handleAddToCart}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <Reveal>
              <p className="text-center py-20 text-lg text-muted-foreground">
                No products found in this category.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
