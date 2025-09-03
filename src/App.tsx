import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/hooks/use-cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import Products from "@/pages/Products";
import NotFound from "./pages/NotFound";
import { Courses } from "@/pages/Courses";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import { LandingPage } from "@/pages/LandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* ✅ Layout applied only for main site pages */}
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/" element={<LandingPage />} />
            </Route>

            {/* ✅ Admin page separate (no Layout) */}
            <Route path="/admin" element={<Admin />} />

            {/* ✅ Not found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
