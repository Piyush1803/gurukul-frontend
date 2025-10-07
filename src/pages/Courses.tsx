import { motion } from "framer-motion";
import { Users, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { API_BASE_URL } from "@/config/api";

// --- ContactForm with Sheety integration ---
const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);

        const API = API_BASE_URL;
        const form = event.target;
        const formData = new FormData(form);
        const now = new Date();
        const submittedAt = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const data = {
            name: formData.get("name"),
            phoneNo: formData.get("phoneNo"),
            email: formData.get("email"),
            age: formData.get("age"),
            message: formData.get("message"),
            submittedAt,
        };

        try {
            const response = await fetch(`${API}/mail/course-inquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                let msg = 'Failed to send';
                try {
                    const err = await response.json();
                    msg = err?.message || msg;
                } catch { }
                throw new Error(msg);
            }
            setSubmissionStatus('success');
            form.reset();
        } catch (error: any) {
            console.error('An error occurred:', error);
            setSubmissionStatus(error?.message || 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto mt-24 bg-background rounded-2xl shadow-warm p-10"
        >
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">Contact Us Now for Courses</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-left text-muted-foreground mb-1 font-medium">Name</label>
                    <input type="text" name="name" required className="w-full px-4 py-2 rounded-lg border border-accent bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition" placeholder="Your Name" />
                </div>
                <div>
                    <label className="block text-left text-muted-foreground mb-1 font-medium">Phone Number</label>
                    <input type="tel" name="phoneNo" required className="w-full px-4 py-2 rounded-lg border border-accent bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition" placeholder="Your Phone Number" />
                </div>
                <div>
                    <label className="block text-left text-muted-foreground mb-1 font-medium">Email</label>
                    <input type="email" name="email" required className="w-full px-4 py-2 rounded-lg border border-accent bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition" placeholder="you@email.com" />
                </div>
                <div>
                    <label className="block text-left text-muted-foreground mb-1 font-medium">Age</label>
                    <input type="number" name="age" required min="1" className="w-full px-4 py-2 rounded-lg border border-accent bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition" placeholder="Your Age" />
                </div>
                <div>
                    <label className="block text-left text-muted-foreground mb-1 font-medium">Message</label>
                    <textarea name="message" required className="w-full px-4 py-2 rounded-lg border border-accent bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition min-h-28" placeholder="Your message"></textarea>
                </div>
                <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.04 }} whileTap={{ scale: isSubmitting ? 1 : 0.97 }}>
                    <Button type="submit" variant="hero" size="lg" className="w-full text-lg py-3" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    </Button>
                </motion.div>
                {submissionStatus === 'success' && (
                    <p className="text-center text-green-500 mt-4">Thank you! Your inquiry has been sent successfully.</p>
                )}
                {submissionStatus && submissionStatus !== 'success' && (
                    <p className="text-center text-red-500 mt-4">{String(submissionStatus)}</p>
                )}
            </form>
        </motion.div>
    );
};

type Course = {
    icon: any;
    title: string;
    description: string;
    duration: string;
    price: string;
    items: string[];
};

const courses: Course[] = [
    {
        icon: BookOpen,
        title: "Basics of Frosting and Cream Cakes",
        description: "Foundational sponges and layering for cream cakes.",
        duration: "10 Days",
        price: "Rs 10000",
        items: [
            "Vanilla Sponge",
            "Chocolate Sponge",
            "Red Velvet Sponge",
            "Coffee Sponge",
        ],
    },
    {
        icon: Star,
        title: "Muffins – 10 types",
        description: "Bake 10 delicious muffin variants with consistent techniques.",
        duration: "5 Days",
        price: "Rs 5500",
        items: [
            "Double Chocolate Cup Muffin",
            "Banana Oats Muffin",
            "Blueberry Muffin",
            "Honey Oat Raisin Muffin",
            "Vanilla Muffin",
            "Banana Bonanza Muffin",
            "Nutella Peanut Butter Muffin",
            "Fruit and Nut Muffin",
            "Spinach and Corn Muffin",
            "Coffee – Walnut Muffin",
        ],
    },
    {
        icon: Users,
        title: "Dry Cakes – 8 types",
        description: "Moist, flavorful dry tea cakes and loaves.",
        duration: "5 Days",
        price: "Rs 5500",
        items: [
            "Carrot Cake with Orange Frosting",
            "Date Walnut Cake",
            "Almond Semolina Tea Cake",
            "Chocochip Chocolate Cake",
            "Whole Wheat Banana Cake",
            "Lemon Cake",
            "Fig and Dates Cake",
            "Marble Loaf Cake with Chocolate Hazelnut Glaze",
        ],
    },
    {
        icon: BookOpen,
        title: "Brownies – 6 types",
        description: "Rich, fudgy brownies in multiple flavors.",
        duration: "5 Days",
        price: "Rs 5500",
        items: [
            "Walnut Brownie",
            "Oreo Brownie",
            "Biscoff Brownie",
            "Nutella Brownie",
            "Choco Overload Brownie",
            "Monster Brownie",
        ],
    },
    {
        icon: Star,
        title: "Cupcakes – 8 types",
        description: "Decorated cupcakes with balanced sponges and frostings.",
        duration: "5 Days",
        price: "Rs 5500",
        items: [
            "Chocolate Cupcake",
            "Nutella Cupcake",
            "Red Velvet Cupcake",
            "Cherry Filled Vanilla Cupcake",
            "Biscoff Cupcake",
            "Blueberry Lemon Cup",
            "Baklava Cupcake",
            "Cookies and Cream Cupcake",
        ],
    },
    {
        icon: Users,
        title: "Cookies",
        description: "Classic, filled, and savory cookie varieties.",
        duration: "5 Days",
        price: "Rs 5500",
        items: [
            "Double Chocochips Cookies",
            "Chocolatechip Cookies",
            "Oat and Raisin Cookies",
            "Choco Chunk Cookies",
            "Christmas Cookies",
            "Nutella Filled Cookies",
            "Chilli Cheese Cookies",
            "Choco Almond Cookies",
        ],
    },
    {
        icon: BookOpen,
        title: "Chocolate Cakes – 5 types",
        description: "Chocolate celebration cakes and finishes.",
        duration: "5 Days",
        price: "Rs 7000",
        items: [
            "Bakery Style and Home-Made Sponge",
            "Choco Almond Praline Cake",
            "Kitkat Cake",
            "Mississipi Mad Cake",
            "Pinata Cake",
        ],
    },
    {
        icon: Star,
        title: "Travel Cakes – 5 types",
        description: "Durable cakes ideal for gifting and travel.",
        duration: "5 Days",
        price: "Rs 6500",
        items: [
            "Vanilla Blueberry Cake",
            "Choco Hazelnut Cake",
            "Almond Praline Cake",
            "Rose Pistachio",
            "Chocolate Biscoff Cake",
        ],
    },
    {
        icon: Users,
        title: "Decorative Cakes",
        description: "Showpiece cakes with themes and finishes.",
        duration: "8 Days",
        price: "Rs 6500",
        items: [
            "Pineapple Cake",
            "Doll Cake",
            "Red Velvet Cake",
            "Black Forest Cake",
            "Anti-Gravity Cake",
            "Photo Cake",
            "Truffle Cake",
            "Oreo Cake",
        ],
    },
    {
        icon: BookOpen,
        title: "Cheese Cakes",
        description: "Baked and set cheesecakes in popular flavors.",
        duration: "5 Days",
        price: "Rs 6500",
        items: [
            "Strawberry Cheese Cake",
            "Blueberry Cheese Cake",
            "Biscoff Cheese Cake",
            "Cookies and Cream Cheese Cake",
        ],
    },
    {
        icon: Star,
        title: "Bread – 5 types",
        description: "Everyday and artisanal breads and buns.",
        duration: "6 Days",
        price: "Rs 6000",
        items: [
            "Sandwich Loaf",
            "Masala Loaf",
            "Pao",
            "Burger Bun",
            "Focassia",
            "Charcoal Bread",
        ],
    },
    {
        icon: Users,
        title: "Coffee (Barista Course)",
        description: "Brew methods and cafe-style beverages.",
        duration: "5 Days",
        price: "Rs 10000",
        items: [
            "Cappucino",
            "Latte",
            "Dalgona",
            "Americano",
            "French Vanilla",
            "Mocha",
            "Caramel",
            "Frappe / Cold Coffee",
        ],
    },
    {
        icon: BookOpen,
        title: "Pizza",
        description: "Pizza bases, sauces, and baked accompaniments.",
        duration: "5 Days",
        price: "Rs 5500",
        items: [
            "Regular Pizza Base",
            "Thin Crust Pizza Base",
            "Cheesy Burst Pizza Base",
            "Pizza Sauces",
            "Tough Garlic Bread",
            "Kulhad Pizza",
        ],
    },
    {
        icon: Star,
        title: "Pasta",
        description: "Classic sauces and baked pasta dishes.",
        duration: "5 Days",
        price: "Rs 5500",
        items: [
            "Alfredo Red Pasta",
            "Arabita White Pasta",
            "Bake Veg Bolognese Pasta",
            "Mix Sauce Pasta",
            "Alioli Pasta",
        ],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.6, -0.05, 0.01, 0.99] as any,
        },
    },
};

export const Courses = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    return (
        <div className="min-h-screen bg-gradient-warm py-20">
            <div className="container mx-auto px-4 relative">
                {/* Contact Us WhatsApp Button - top right, theme color */}
                <a
                    href="https://wa.me/918918215576"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 right-0 mt-2 mr-8 z-50"
                >
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2 rounded-full shadow-lg transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.98L0 24l6.19-1.62A11.97 11.97 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22c-1.77 0-3.5-.46-5.01-1.33l-.36-.21-3.68.96.98-3.59-.23-.37A9.97 9.97 0 0 1 2 12C2 6.48 6.48 2 12 2c2.65 0 5.15 1.03 7.04 2.92A9.97 9.97 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.2-7.55c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33Z" /></svg>
                        Contact Us
                    </motion.button>
                </a>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6"
                        variants={cardVariants}
                    >
                        Explore Our Courses
                    </motion.h1>
                    <motion.p
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                        variants={cardVariants}
                    >
                        Unlock your baking potential with our expertly crafted courses, designed for all skill levels. Join a community of passionate bakers and learn from the best!
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-3 gap-10"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {courses.map((course, idx) => (
                        <motion.div
                            key={course.title}
                            className="bg-background rounded-2xl shadow-warm p-8 text-center hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
                            variants={cardVariants}
                            whileHover={{ scale: 1.04 }}
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 relative mx-auto">
                                <course.icon className="h-8 w-8 text-primary-foreground" />
                                <div className="absolute inset-0 bg-white/20 rounded-2xl" />
                            </div>
                            <h3 className="text-2xl font-serif font-semibold mb-2">{course.title}</h3>
                            <p className="text-muted-foreground mb-4">{course.description}</p>
                            <div className="flex justify-center gap-4 text-sm text-accent mb-4">
                                <span>{course.duration}</span>
                                <span>•</span>
                                <span>{course.price}</span>
                            </div>

                            <Dialog open={openIndex === idx} onOpenChange={(open) => setOpenIndex(open ? idx : null)}>
                                <DialogTrigger asChild>
                                    <Button variant="hero" size="sm" className="mt-2" onClick={() => setOpenIndex(idx)}>Learn More</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{course.title}</DialogTitle>
                                        <DialogDescription>
                                            {course.description} • {course.duration} • {course.price}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="mt-2 text-sm">
                                        <ul className="list-disc pl-5 space-y-1 text-left">
                                            {course.items.map((it) => (
                                                <li key={it}>{it}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contact Us Form */}
                <ContactForm />
            </div>
        </div>
    );
};