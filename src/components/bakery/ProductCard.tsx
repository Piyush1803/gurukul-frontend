import { motion } from "framer-motion";
import { Plus, Star, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/motion/LazyImage";
import { MagneticButton } from "@/components/motion/MagneticButton";
export interface ProductCardData {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl: string;
  rating?: number;
  isPopular?: boolean;
  isFresh?: boolean;
}

interface ProductCardProps {
  product: ProductCardData;
  onAdd: (id: string) => void;
  index?: number;
}

export const ProductCard = ({ product, onAdd, index = 0 }: ProductCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8 }}
    className="group perspective-card"
  >
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card transition-shadow duration-500 group-hover:shadow-warm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <LazyImage
          src={product.imageUrl || "https://via.placeholder.com/400x300?text=Bakery"}
          alt={product.name}
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bakery-chocolate/50 via-transparent to-transparent opacity-60" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.isFresh && (
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-bakery-orange backdrop-blur-md">
              <Flame className="h-3 w-3" /> Fresh Today
            </span>
          )}
          {product.isPopular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-bakery-gold/90 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-bakery-chocolate backdrop-blur-md">
              <Sparkles className="h-3 w-3" /> Popular
            </span>
          )}
        </div>

        {product.rating != null && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold backdrop-blur-md">
            <Star className="h-3 w-3 fill-bakery-gold text-bakery-gold" />
            {product.rating}
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-2 line-clamp-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">From</span>
            <p className="text-2xl font-bold text-primary">₹{product.price.toFixed(0)}</p>
          </div>
          <MagneticButton>
            <Button
              variant="bakery"
              size="sm"
              onClick={() => onAdd(product.id)}
              className="rounded-full px-5 shadow-soft"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden xs:inline sm:inline">Add</span>
            </Button>
          </MagneticButton>
        </div>
      </div>
    </div>
  </motion.article>
);
