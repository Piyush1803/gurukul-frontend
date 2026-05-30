import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CartModal } from "@/components/CartModal";
import { LoginModal } from "@/components/LoginModal";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { useLocation, Outlet } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";

export const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const { totalQuantity } = useCart();

  useEffect(() => {
    if ((location.state as { openLogin?: boolean })?.openLogin) {
      setIsLoginOpen(true);
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

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
      const id = setTimeout(clearAuth, Math.max(expiry - now, 0));
      return () => clearTimeout(id);
    }
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <ScrollProgress />
        <GrainOverlay />
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <Footer />

        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

        {/* Floating WhatsApp Action Button */}
        <a
          href="https://wa.me/918918215576"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 group"
          aria-label="Contact us on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="transition-transform duration-300 group-hover:rotate-12"
          >
            <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.98L0 24l6.19-1.62A11.97 11.97 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22c-1.77 0-3.5-.46-5.01-1.33l-.36-.21-3.68.96.98-3.59-.23-.37A9.97 9.97 0 0 1 2 12C2 6.48 6.48 2 12 2c2.65 0 5.15 1.03 7.04 2.92A9.97 9.97 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.2-7.55c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33Z" />
          </svg>
          {/* Tooltip on Hover */}
          <span className="absolute right-16 scale-0 transition-all rounded bg-bakery-chocolate px-3 py-1.5 text-xs text-bakery-cream group-hover:scale-100 shadow-md whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </SmoothScrollProvider>
  );
};
