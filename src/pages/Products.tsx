import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Star } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'pastries' | 'bread' | 'courses';
  rating?: number;
  duration?: string;
}

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pastries' | 'bread' | 'courses'>('all');

  const products: Product[] = [
    {
      id: '1',
      name: 'Butter Croissant',
      description: 'Flaky, buttery layers of perfection',
      price: 3.5,
      image: '/placeholder.svg',
      category: 'pastries',
      rating: 4.9,
    },
    {
      id: '2',
      name: 'Sourdough Loaf',
      description: 'Traditional fermented bread with tangy flavor',
      price: 8.0,
      image: '/placeholder.svg',
      category: 'bread',
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Chocolate Danish',
      description: 'Rich chocolate filling in buttery pastry',
      price: 4.25,
      image: '/placeholder.svg',
      category: 'pastries',
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Artisan Baguette',
      description: 'Crispy crust with soft, airy interior',
      price: 5.5,
      image: '/placeholder.svg',
      category: 'bread',
      rating: 4.9,
    },
    {
      id: '5',
      name: 'Beginner Baking Course',
      description: 'Learn the fundamentals of bread and pastry making',
      price: 150.0,
      image: '/placeholder.svg',
      category: 'courses',
      duration: '4 weeks',
    },
    {
      id: '6',
      name: 'Advanced Pastry Techniques',
      description: 'Master complex lamination and decoration skills',
      price: 350.0,
      image: '/placeholder.svg',
      category: 'courses',
      duration: '8 weeks',
    },
  ];

  const categories = [
    { key: 'all' as const, label: 'All Products' },
    { key: 'pastries' as const, label: 'Pastries' },
    { key: 'bread' as const, label: 'Bread' },
    { key: 'courses' as const, label: 'Courses' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const handleAddToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        alert('Please login first.');
        return;
      }

      const response = await fetch('http://localhost:3001/cart/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          productId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add to cart');
      }

      alert('✅ Added to cart!');
    } catch (err: any) {
      console.error('Add to cart error:', err.message);
      alert('❌ Something went wrong: ' + err.message);
    }
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
      {/* Hero Section */}
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
              Fresh baked goods and professional courses to satisfy every craving
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
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

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-background rounded-2xl shadow-soft hover:shadow-warm transition-all duration-300 overflow-hidden border"
              >
                <div className="aspect-video bg-gradient-warm relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.category === 'courses' && (
                    <div className="absolute top-4 left-4 bg-bakery-orange text-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {product.duration}
                    </div>
                  )}
                  {product.rating && (
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 fill-bakery-gold text-bakery-gold" />
                      {product.rating}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>

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

          {filteredProducts.length === 0 && (
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
