import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Sparkles, Star, Heart, Clock, Edit, Trash2 } from "lucide-react";
import { cubicBezier } from "framer-motion";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    type: 'deliciousCake' | 'dryCake' | 'cupCake' | 'pudding' | 'pastry' | 'donut';
    flavor?: string;
    quantity?: number;
    layers?: number;
    weight?: number;
    filling?: string;
}

const productTypes = [
    { value: 'deliciousCake', label: 'Delicious Cake' },
    { value: 'dryCake', label: 'Dry Cake' },
    { value: 'cupCake', label: 'Cup Cake' },
    { value: 'donut', label: 'Donut' },
    { value: 'pastry', label: 'Pastry' },
    { value: 'pudding', label: 'Pudding' },
];

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
        description: "",
        imageUrl: "",
        price: "",
        quantity: "",
        layers: "",
        flavor: "",
        type: "",
        weight: "",
        filling: "",
    });

    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch products and orders from API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch all products from backend
                const productsRes = await fetch("http://localhost:3001/product/all");
                const productsData = await productsRes.json();
                
                if (productsData.data) {
                    const { 
                        deliciousCakes = [], 
                        dryCakes = [], 
                        cupCakes = [], 
                        puddings = [], 
                        pastries = [], 
                        donuts = [] 
                    } = productsData.data;
                    const allProducts = [...deliciousCakes, ...dryCakes, ...cupCakes, ...puddings, ...pastries, ...donuts];
                    setProducts(allProducts);
                } else {
                    setProducts([]);
                }
                
                // TODO: Add orders API when available
                setOrders([]);
            } catch (error) {
                console.error("Error fetching data:", error);
                setProducts([]);
                setOrders([]);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value: string) => {
        setForm({ ...form, type: value });
    };

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            imageUrl: "",
            price: "",
            quantity: "",
            layers: "",
            flavor: "",
            type: "",
            weight: "",
            filling: "",
        });
        setEditingProduct(null);
        setIsEditing(false);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsEditing(true);
        setForm({
            name: product.name || "",
            description: product.description || "",
            imageUrl: product.imageUrl || "",
            price: product.price?.toString() || "",
            quantity: product.quantity?.toString() || "",
            layers: product.layers?.toString() || "",
            flavor: product.flavor || "",
            type: product.type || "",
            weight: product.weight?.toString() || "",
            filling: product.filling || "",
        });
    };

    const handleDelete = async (productId: string, productType: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        
        try {
            const response = await fetch(`http://localhost:3001/product/${productType}/${productId}`, {
                method: "DELETE",
            });
            
            if (response.ok) {
                setProducts(products.filter(p => p.id !== productId));
                alert("Product deleted successfully");
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.type) {
            alert("Please select a product type");
            return;
        }

        try {
            const productData = {
                name: form.name,
                description: form.description,
                imageUrl: form.imageUrl,
                price: parseFloat(form.price),
                quantity: parseInt(form.quantity),
                flavor: form.flavor,
                ...(form.layers && { layers: parseInt(form.layers) }),
                ...(form.weight && { weight: parseFloat(form.weight) }),
                ...(form.filling && { filling: form.filling }),
            };

            const url = isEditing 
                ? `http://localhost:3001/product/${form.type}/${editingProduct?.id}`
                : `http://localhost:3001/product/${form.type}`;
            
            const method = isEditing ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                const result = await res.json();
                if (isEditing) {
                    setProducts(products.map(p => p.id === editingProduct?.id ? result.data : p));
                    alert("Product updated successfully");
                } else {
                    setProducts((prev) => [...prev, result.data]);
                    alert("Product added successfully");
                }
                resetForm();
            } else {
                const error = await res.json();
                alert(`Failed to ${isEditing ? 'update' : 'add'} product: ${error.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Error submitting product:", error);
            alert(`Failed to ${isEditing ? 'update' : 'add'} product`);
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

            {/* Add/Edit Product Form */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="w-full max-w-2xl bg-background rounded-2xl shadow-warm border p-8 mb-10 transition-transform hover:scale-[1.02] hover:shadow-2xl z-10"
            >
                <h3 className="text-xl font-bold mb-6 text-center">
                    {isEditing ? 'Edit Product' : 'Add Product'}
                </h3>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    autoComplete="off"
                >
                    <div className="space-y-2">
                        <Label htmlFor="type">Product Type</Label>
                        <Select value={form.type} onValueChange={handleSelectChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select product type" />
                            </SelectTrigger>
                            <SelectContent>
                                {productTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
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
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Product Description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            type="text"
                            placeholder="Image URL"
                            value={form.imageUrl}
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
                            step="0.01"
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
                    {(form.type === 'deliciousCake' || form.type === 'dryCake' || form.type === 'cupCake') && (
                        <div className="space-y-2">
                            <Label htmlFor="layers">Layers</Label>
                            <Input
                                id="layers"
                                name="layers"
                                type="number"
                                placeholder="Layers"
                                value={form.layers}
                                onChange={handleChange}
                                min="1"
                                autoComplete="off"
                            />
                        </div>
                    )}
                    {(form.type === 'deliciousCake' || form.type === 'dryCake') && (
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                name="weight"
                                type="number"
                                placeholder="Weight"
                                value={form.weight}
                                onChange={handleChange}
                                min="0"
                                step="0.1"
                                autoComplete="off"
                            />
                        </div>
                    )}
                    {form.type === 'donut' && (
                        <div className="space-y-2">
                            <Label htmlFor="filling">Filling</Label>
                            <Input
                                id="filling"
                                name="filling"
                                type="text"
                                placeholder="Filling"
                                value={form.filling}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                    )}
                    <div className="md:col-span-2 flex gap-4">
                        <Button
                            type="submit"
                            variant="hero"
                            className="flex-1"
                            size="lg"
                        >
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </Button>
                        {isEditing && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetForm}
                                className="flex-1"
                                size="lg"
                            >
                                Cancel
                            </Button>
                        )}
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
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                                        Flavor
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider rounded-tr-2xl">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {products.map((prod: Product, idx: number) => (
                                    <tr
                                        key={prod.id}
                                        className={
                                            idx % 2 === 0
                                                ? "bg-gray-50 hover:bg-primary/5"
                                                : "hover:bg-primary/5"
                                        }
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                                                {prod.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                                            {prod.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            ₹{prod.price?.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {prod.quantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {prod.flavor}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(prod)}
                                                    className="flex items-center gap-1"
                                                >
                                                    <Edit className="h-3 w-3" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(prod.id, prod.type)}
                                                    className="flex items-center gap-1 text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    Delete
                                                </Button>
                                            </div>
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