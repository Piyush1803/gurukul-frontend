import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { CartModal } from "@/components/CartModal";
import { LoginModal } from "@/components/LoginModal";
import { useLocation } from "react-router-dom";
import { updateCartItem, removeCartItem } from "@/api/cart";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/api/cart";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();

  let user = null;
  try {
    const token = localStorage.getItem("token");
    if (token) {
      // If JWT, decode the payload part
      const payload = token.split(".")[1];
      // Add padding if needed
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
      user = JSON.parse(atob(padded));
    }
  } catch (err) {
    user = null;
  }

  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("token") || "";

  const { data: cartItems, refetch } = useQuery({
  queryKey: ["cartItems", userId],
  queryFn: () => getCartItems(userId || "", authToken),
  enabled: !!userId, // Don't run until userId is available
});


  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      await updateCartItem(itemId, quantity, authToken);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeCartItem(itemId, authToken);
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        cartItemsCount={0} // optional: replace with real count via Context later
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        
        token={user}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        items={cartItems || []}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={refetch}
      />
    </div>
  );
};