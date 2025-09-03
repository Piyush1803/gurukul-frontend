import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { CartModal } from "@/components/CartModal";
import { LoginModal } from "@/components/LoginModal";
import { useLocation } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";

import { Outlet } from "react-router-dom";

// No props needed anymore
export const Layout = () => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const { totalQuantity } = useCart();

  useEffect(() => {
    if ((location.state as any)?.openLogin) {
      setIsLoginOpen(true);
      // Clear the state so it doesn't reopen on navigation
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

  // Auto-logout after 15 minutes: check on load and set a timer
  useEffect(() => {
    const clearAuth = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
    };

    const expiryStr = localStorage.getItem("tokenExpiry");
    if (!expiryStr) return;
    const expiry = Number(expiryStr);
    const now = Date.now();
    if (Number.isFinite(expiry)) {
      if (now >= expiry) {
        clearAuth();
        return;
      }
      const timeoutMs = Math.max(expiry - now, 0);
      const id = setTimeout(() => {
        clearAuth();
      }, timeoutMs);
      return () => clearTimeout(id);
    }
  }, []);

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
        cartItemsCount={totalQuantity}
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
          <Outlet />   {/* 👈 Renders Home, About, Products, etc. */}
        </motion.main>

      </AnimatePresence>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
};