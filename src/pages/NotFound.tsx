import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <p className="font-display text-8xl sm:text-9xl font-bold text-primary/20">404</p>
        <h1 className="font-display text-3xl font-semibold mt-4 mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          This crumb trail went cold. Let's get you back to something fresh.
        </p>
        <Link to="/">
          <Button variant="hero" size="lg" className="gap-2">
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
