import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserRoleFromToken } from "@/utils/auth";
import {
  getCartItems,
  updateCartItem,
  removeCartItem,
} from "@/api/cart";

interface FlattenedCartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  // Log role when opening modal
  useEffect(() => {
    if (isOpen) {
      const role = getUserRoleFromToken();
      console.log("User Role:", role);
    }
  }, [isOpen]);

  // Fetch cart items from API
  const {
    data: rawItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    enabled: isOpen,
  });

  // Refetch cart whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  // Flatten data for UI
  const items: FlattenedCartItem[] = useMemo(() => {
    return rawItems.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.imageUrl,
      quantity: item.quantity,
    }));
  }, [rawItems]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-warm z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  Your Cart
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {isLoading ? (
                  <p className="text-center">Loading...</p>
                ) : items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Add some delicious items to get started!
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ₹{item.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={async () => {
                              if (item.quantity > 1) {
                                await updateCartItem(item.id, item.quantity - 1);
                              } else {
                                await removeCartItem(item.id);
                              }
                              refetch();
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={async () => {
                              await updateCartItem(item.id, item.quantity + 1);
                              refetch();
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="border-t p-6 space-y-4"
                >
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <Button variant="hero" className="w-full" size="lg">
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
