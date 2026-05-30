import { lazy, Suspense, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/hooks/use-cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";

const Home = lazy(() => import("@/pages/Home").then((m) => ({ default: m.Home })));
const About = lazy(() => import("@/pages/About").then((m) => ({ default: m.About })));
const Products = lazy(() => import("@/pages/Products"));
const Courses = lazy(() => import("@/pages/Courses").then((m) => ({ default: m.Courses })));
const Checkout = lazy(() => import("@/pages/Checkout"));
const OrderSuccess = lazy(() => import("@/pages/OrderSuccess").then((m) => ({ default: m.OrderSuccess })));
const LandingPage = lazy(() => import("@/pages/LandingPage").then((m) => ({ default: m.LandingPage })));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Admin = lazy(() => import("@/pages/Admin"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(
    () => localStorage.getItem("adminAuthorized") === "true"
  );
  const [password, setPassword] = useState("");
  const expected = (import.meta as { env?: { VITE_ADMIN_PASSWORD?: string } }).env?.VITE_ADMIN_PASSWORD || "gurukulAdmin@123";

  if (authorized) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm px-4">
      <div className="w-full max-w-sm glass-panel rounded-3xl p-8 shadow-warm">
        <h1 className="font-display text-2xl font-semibold mb-2">Admin Access</h1>
        <p className="text-sm text-muted-foreground mb-6">Enter the admin password to proceed.</p>
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
          className="space-y-4"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Enter admin password"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-warm transition-shadow"
          >
            Unlock
          </button>
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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/" element={<LandingPage />} />
              </Route>
              <Route
                path="/admin"
                element={
                  <ProtectedAdmin>
                    <Admin />
                  </ProtectedAdmin>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
