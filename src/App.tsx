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
import { useState } from "react";

const queryClient = new QueryClient();

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(() => {
    return localStorage.getItem("adminAuthorized") === "true";
  });
  const [password, setPassword] = useState("");
  const expected = (import.meta as any).env?.VITE_ADMIN_PASSWORD || "gurukulAdmin@123";

  if (authorized) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm bg-card border rounded-xl p-6 shadow-soft">
        <h1 className="text-xl font-semibold mb-4">Admin Access</h1>
        <p className="text-sm text-muted-foreground mb-4">Enter the admin password to proceed.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password === expected) {
              localStorage.setItem("adminAuthorized", "true");
              setAuthorized(true);
            } else {
              alert("Incorrect password");
            }
          }}
          className="space-y-3"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter admin password"
            required
          />
          <button type="submit" className="w-full px-3 py-2 rounded bg-primary text-primary-foreground">Unlock</button>
        </form>
      </div>
    </div>
  );
}

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

            {/* ✅ Admin page protected */}
            <Route path="/admin" element={<ProtectedAdmin><Admin /></ProtectedAdmin>} />

            {/* ✅ Not found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
