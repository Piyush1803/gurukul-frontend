import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { LazyImage } from "@/components/motion/LazyImage";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const navigate = useNavigate();
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bakery-chocolate/50 backdrop-blur-md z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border/50 shadow-warm z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border/50">
                <h2 className="font-display text-2xl font-semibold flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  Your Cart
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
                    <p className="text-lg text-muted-foreground">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mt-2">Add something delicious!</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-border/40"
                      >
                        <LazyImage
                          src={item.image}
                          alt={item.name}
                          wrapperClassName="w-16 h-16 rounded-xl shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">₹{item.price.toFixed(0)} each</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                              else removeItem(item.id);
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="border-t border-border/50 p-5 sm:p-6 space-y-4 bg-background/80 backdrop-blur-sm"
                >
                  <div className="flex justify-between text-lg font-display font-semibold">
                    <span>Total</span>
                    <span className="text-primary">₹{subtotal.toFixed(0)}</span>
                  </div>
                  <Button
                    variant="hero"
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      onClose();
                      if (!token) {
                        navigate("/products", { state: { openLogin: true } });
                        return;
                      }
                      navigate("/checkout");
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
