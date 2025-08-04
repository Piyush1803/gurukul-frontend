import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Star, Heart, Clock } from "lucide-react";
import { cubicBezier } from "framer-motion";

const floatingIcons = [
    { icon: Heart, delay: 0, x: "10%", y: "20%" },
    { icon: Star, delay: 0.5, x: "80%", y: "15%" },
    { icon: Sparkles, delay: 1, x: "15%", y: "70%" },
    { icon: Clock, delay: 1.5, x: "85%", y: "75%" },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: cubicBezier(0.6, -0.05, 0.01, 0.99) },
    },
};

const Admin: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        image: "",
        price: "",
        quantity: "",
        layers: "",
        flavor: "",
    });

    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch products and orders from API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Replace these URLs with your actual API endpoints
                const productsRes = await fetch("/api/products");
                const ordersRes = await fetch("/api/orders");
                const productsData = await productsRes.json();
                const ordersData = await ordersRes.json();
                setProducts(productsData);
                setOrders(ordersData);
            } catch (error) {
                // Handle error as needed
                setProducts([]);
                setOrders([]);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Replace with your API call to add a product
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                // Optionally refetch products or update state
                const newProduct = await res.json();
                setProducts((prev) => [...prev, newProduct]);
                setForm({
                    name: "",
                    image: "",
                    price: "",
                    quantity: "",
                    layers: "",
                    flavor: "",
                });
            } else {
                // Handle error
                alert("Failed to add product");
            }
        } catch {
            alert("Failed to add product");
        }
    };

    return (
        <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
            {/* Floating Icons */}
            {floatingIcons.map(({ icon: Icon, delay, x, y }, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                        opacity: 0.6,
                        scale: [1, 1.15, 1],
                        y: [0, -10, 0],
                    }}
                    transition={{
                        delay,
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }}
                    style={{
                        position: "absolute",
                        left: x,
                        top: y,
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                >
                    <Icon className="w-10 h-10 text-primary/30" />
                </motion.div>
            ))}

            {/* Animated Welcome Title */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="flex flex-col justify-center items-center min-h-[40vh] w-full z-10"
            >
                <h2 className="text-5xl md:text-7xl font-serif font-extrabold text-center mb-2 text-primary drop-shadow-lg">
                    Welcome To Admin
                </h2>
            </motion.div>

            {/* Add Product Form */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="w-full max-w-2xl bg-background rounded-2xl shadow-warm border p-8 mb-10 transition-transform hover:scale-[1.02] hover:shadow-2xl z-10"
            >
                <h3 className="text-xl font-bold mb-6 text-center">Add Product</h3>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    autoComplete="off"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Product Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            name="image"
                            type="text"
                            placeholder="Image URL"
                            value={form.image}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            min="0"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            name="quantity"
                            type="number"
                            placeholder="Quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            required
                            min="1"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="layers">Layers</Label>
                        <Input
                            id="layers"
                            name="layers"
                            type="number"
                            placeholder="Layers"
                            value={form.layers}
                            onChange={handleChange}
                            required
                            min="1"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="flavor">Flavor</Label>
                        <Input
                            id="flavor"
                            name="flavor"
                            type="text"
                            placeholder="Flavor"
                            value={form.flavor}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Button
                            type="submit"
                            variant="hero"
                            className="w-full"
                            size="lg"
                        >
                            Add Product
                        </Button>
                    </div>
                </form>
            </motion.div>

            {/* Products Table */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="w-full max-w-4xl mb-10 bg-background rounded-2xl shadow-lg border transition-transform hover:scale-[1.01] hover:shadow-2xl z-10"
            >
                <h3 className="text-xl font-bold mb-4 px-8 pt-8">All Products</h3>
                <div className="overflow-x-auto rounded-2xl">
                    {loading ? (
                        <div className="p-6 text-center text-muted-foreground">
                            Loading...
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-primary/10">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider rounded-tl-2xl">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                                        Layers
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider rounded-tr-2xl">
                                        Flavor
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {products.map((prod: any, idx: number) => (
                                    <tr
                                        key={prod.id}
                                        className={
                                            idx % 2 === 0
                                                ? "bg-gray-50 hover:bg-primary/5"
                                                : "hover:bg-primary/5"
                                        }
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                                            {prod.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            ₹{prod.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {prod.quantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {prod.layers}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {prod.flavor}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </motion.div>

            {/* Orders Table */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="w-full max-w-4xl mb-10 bg-background rounded-2xl shadow-lg border transition-transform hover:scale-[1.01] hover:shadow-2xl z-10"
            >
                <h3 className="text-xl font-bold mb-4 px-8 pt-8">All Orders</h3>
                <div className="overflow-x-auto rounded-2xl">
                    {loading ? (
                        <div className="p-6 text-center text-muted-foreground">
                            Loading...
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-primary/10">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider rounded-tl-2xl">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider rounded-tr-2xl">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {orders.map((order: any, idx: number) => (
                                    <tr
                                        key={order.id}
                                        className={
                                            idx % 2 === 0
                                                ? "bg-gray-50 hover:bg-primary/5"
                                                : "hover:bg-primary/5"
                                        }
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.customer}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.product}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.quantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold ${order.status === "Delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Admin;