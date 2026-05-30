import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => (
  <div className="min-h-[70vh] flex items-center justify-center p-8 text-center pt-24">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg glass-panel rounded-3xl p-10 sm:p-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <CheckCircle className="mx-auto mb-6 h-16 w-16 text-bakery-gold" />
      </motion.div>
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">Order Placed!</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Thank you for your order. We're preparing your delicious items with care.
      </p>
      <Link to="/">
        <Button variant="hero" size="lg">
          Continue Shopping
        </Button>
      </Link>
    </motion.div>
  </div>
);

export default OrderSuccess;
