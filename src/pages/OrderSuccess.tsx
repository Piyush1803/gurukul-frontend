import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccess: React.FC = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg">
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
                <h1 className="text-3xl font-serif font-bold mb-2">Order Placed!</h1>
                <p className="text-muted-foreground mb-6">
                    Thank you for your order. We'll start preparing your delicious items right away.
                </p>
                <Link to="/" className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded">
                    Continue Shopping
                </Link>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;


