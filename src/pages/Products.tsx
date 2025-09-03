import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";

interface Product {
  id: string;
  name: string | null;
  description: string | null;
  price: number;
  imageUrl: string;
  type: 'cake' | 'pudding' | 'pastry' | 'donut';
  flavor?: string;
  quantity?: number;
  rating?: number;
}

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cakes' | 'puddings' | 'pastries' | 'donuts'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const baseUrl = "http://localhost:3001/product";
        const categoryMap = {
          all: '',
          cakes: 'cake',
          puddings: 'pudding',
          pastries: 'pastry',
          donuts: 'donut',
        };

        const selectedType = categoryMap[activeCategory];
        const url =
          activeCategory === 'all'
            ? `${baseUrl}/all`
            : `${baseUrl}/all/${selectedType}`;

        const response = await fetch(url);
        const result = await response.json();

        if (activeCategory === 'all') {
          const { cakes = [], puddings = [], pastries = [], donuts = [] } = result.data || {};
          const allProducts = [...cakes, ...puddings, ...pastries, ...donuts];
          setProducts(allProducts);
        } else {
          setProducts(Array.isArray(result.data) ? result.data : []);
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const categories = [
    { key: 'all' as const, label: 'All Products' },
    { key: 'cakes' as const, label: 'Cakes' },
    { key: 'puddings' as const, label: 'Puddings' },
    { key: 'pastries' as const, label: 'Pastries' },
    { key: 'donuts' as const, label: 'Donuts' },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as any,
      },
    },
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
              Our Products
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Fresh baked goods made with love!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={activeCategory === category.key ? 'bakery' : 'outline'}
                onClick={() => setActiveCategory(category.key)}
                className="transition-all duration-300"
              >
                {category.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20 text-xl text-muted-foreground">Loading...</div>
          ) : products.length > 0 ? (
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-background rounded-2xl shadow-soft hover:shadow-warm transition-all duration-300 overflow-hidden border"
                >
                  <div className="aspect-video bg-gradient-warm relative overflow-hidden">
                    <img
                      src={product.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={product.name ?? product.flavor ?? "Product"}
                      className="w-full h-full object-cover"
                    />
                    {product.rating && (
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="h-3 w-3 fill-bakery-gold text-bakery-gold" />
                        {product.rating}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold mb-2">
                      {product.name ?? product.flavor}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</span>

                      <Button
                        variant="bakery"
                        size="sm"
                        onClick={() => handleAddToCart(product.id)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">
                No products found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
