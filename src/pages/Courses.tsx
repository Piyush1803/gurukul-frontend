import { motion } from "framer-motion";
import { Users, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import bakingClassImg from "@/assets/baking-class.jpg";
import pastriesImg from "@/assets/pastries.jpg";
import bakeryHeroImg from "@/assets/bakery-hero.jpg";

// --- ContactForm with Sheety integration ---
const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);

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
            const sheetyPayload = {
                sheet1: {
                    name: data.name,
                    phoneNo: data.phoneNo,
                    email: data.email,
                    age: data.age,
                    message: data.message,
                    submittedAt: data.submittedAt
                }
            };

            const response = await fetch('https://api.sheety.co/f87695357a26c709f44cd4ecdaa2e07a/gurukulCoursesInquiry/sheet1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sheetyPayload),
            });
            
            if (!response.ok) {
                let msg = 'Failed to send inquiry';
                try {
                    const err = await response.json();
                    msg = err?.message || msg;
                } catch {}
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

type Program = {
    title: string;
    image: string;
    duration: string;
    timings: string[];
    description: string;
    items: string[];
};

const programs: Program[] = [
    {
        title: "1 Month Basic Cake Making Course (Eggless)",
        image: bakingClassImg,
        duration: "1 Month",
        timings: [
            "Morning (11:00am – 2:00pm)",
            "Evening (2:30pm – 5:30pm)",
        ],
        description:
            "Covers piping to baking, cupcakes, muffins, dry cakes, brownies and more to build a solid bakery menu.",
        items: [
            "Oil based sponges",
            "Butter based sponges",
            "Tea time cakes (Whole wheat & jaggery, Marble, Brownie)",
            "Muffins (Tutti fruitti, Choco chip)",
            "Cupcakes (Chocolate truffle, Vanilla Strawberry)",
            "Pinata cake (with sponge)",
            "Fresh fruit cake icing & strawberry filling",
            "Theme cake – Makeup",
            "Butterscotch + Praline + Caramel",
            "Truffle cake",
            "Premix cake – Pineapple",
            "Chocolate garnishing (balls, 3D hearts, sails, barks)",
            "Small serve dessert – Triple chocolate mousse",
            "Practice: Round, Heart, Square cakes",
            "Piping techniques & nozzles; roses with fresh cream",
            "Trending designs, Whipped cream master class",
            "Theory & costing of every item",
        ],
    },
    {
        title: "2 Months Complete Cake Making Course (Eggless)",
        image: pastriesImg,
        duration: "2 Months",
        timings: [
            "Morning (11:00am – 2:00pm)",
            "Evening (2:30pm – 5:30pm)",
        ],
        description:
            "Master-course from sponges to cheesecakes, theme cakes, cookies, small desserts and pro finishes.",
        items: [
            "Oil, Butter & Milkmaid sponges",
            "Tea time cakes (Whole wheat & jaggery, Marble, Lemon)",
            "Brownies (Nutella Hazelnut or Oreo)",
            "Muffins (Tutti fruitti, Choco chip, Banana crumble)",
            "Cupcakes (Vanilla, Chocolate truffle, Red velvet with American Buttercream)",
            "Pinata – Heart (Surprise theme)",
            "Cheesecakes – Baked & No-bake",
            "Fresh fruit icing; Strawberry Geode effect (Isomalt/Rice paper)",
            "Theme cakes: Unicorn/Farm, Make up, Butterscotch, Truffle",
            "Cookies (Coconut, NY-style Chocolate Chunk, Atta biscuits)",
            "Swiss Roll",
            "Small serve desserts (Coffee Verrine, Triple chocolate mousse)",
            "Fillings & ratios: ganaches, praline, cream cheese, buttercream",
            "Chocolate garnishing (balls, 3D hearts, sails, barks)",
            "Practice: Round/Heart/Square, piping, nozzles, roses, trending designs",
            "Whipped cream master class, Theory, Costing",
        ],
    },
    {
        title: "3 Months Advance Certificate Course in Bakery (Eggless)",
        image: bakeryHeroImg,
        duration: "3 Months",
        timings: [
            "Morning (11:00am – 2:00pm)",
            "Evening (2:30pm – 5:30pm)",
        ],
        description:
            "Advanced sponges, decoration, chocolate, fondant, wedding cakes, breads and desserts.",
        items: [
            "Oil, Butter & Milkmaid sponges",
            "Tea time cakes (Whole wheat & jaggery, Marble, Pineapple upside-down, Lemon)",
            "Brownies (Nutella Hazelnut or Oreo)",
            "Muffins (Tutti fruitti, Choco chip, Banana crumble)",
            "Cupcakes (Vanilla, Chocolate truffle, Red velvet)",
            "Pinata cake",
            "Cheesecakes – Baked & No-bake",
            "Fresh fruit icing; Strawberry Geode (Isomalt/Rice paper)",
            "Theme cakes (Unicorn/Farm, Butterscotch, Make up)",
            "Truffle cake (full fondant mermaid)",
            "Monogram tart cake",
            "Fillings & ratios: ganaches, praline, cream cheese, buttercream, lemon curd, apple pie filling",
            "Chocolate garnishing (balls, 3D hearts, sails, barks)",
            "Wedding cake: 2-tier with stacking",
            "Cookies (Nankhatai, Coconut, NY-style Chocolate Chunk, Jeera, Atta in desi ghee)",
            "Breads (Pav, Burger buns with filling, Garlic bread Dominos style, Pizza dough & sauce, Bread loaf)",
            "Small desserts (Fruit custard pudding, Triple chocolate mousse, Coffee verrine)",
            "Tarts & pies (Apple pie, Lemon tart with coconut mousse & coffee buttercream)",
            "Doughnuts with custard/Nutella/Biscoff",
            "Swiss Roll",
            "Practice: shapes, piping, roses, trending designs; whipped cream master class; Theory & costing",
        ],
    },
    {
        title: "6 Months Program in Bakery & Confectionery (Eggless)",
        image: pastriesImg,
        duration: "6 Months",
        timings: [
            "Morning (11:00am – 2:00pm)",
            "Evening (2:30pm – 5:30pm)",
        ],
        description:
            "Comprehensive diploma: sponges, icings, fondant, wedding cakes, breads, viennoiseries, French desserts, royal icing cookies.",
        items: [
            "Oil, Butter & Milkmaid sponges",
            "Tea time cakes (Whole wheat & jaggery, Marble, Chocolate caramel, Semolina, Mawa, Lemon, Pineapple upside-down, Banana)",
            "Brownies (Nutella Hazelnut, Oreo)",
            "Muffins (Tutti fruitti, Choco chip, Banana crumble)",
            "Cupcakes (Pineapple buttercream, Chocolate truffle, Red velvet, Vanilla Strawberry)",
            "Pinata cake (with sponge & surprise)",
            "Cheesecakes – 2 baked + 2 no-bake",
            "Fresh fruit icing & strawberry filling",
            "Theme cakes: Butterscotch, Unicorn (top forward), Red velvet buttercream, Farm/Jungle, Truffle, Half naked, Choco-vanilla",
            "Full fondant cakes – 2 (trending)",
            "Monogram tart, Neapolitan cake",
            "Fillings: chocolate/caramel ganache, praline, cream cheese, buttercream, lemon curd, apple pie filling, pineapple buttercream",
            "Chocolate garnishing (balls, 3D hearts, sails, barks)",
            "Wedding cakes: 2-tier + stacking, 3-tier semi-fondant",
            "Cookies (Coconut, Cake rusk, Jeera, Nutella, Nankhatai, NY Choco chunk, Chocolate oats)",
            "Breads (Pav, Burger buns, Garlic bread, Bread loaf, Pizza, Korean buns, Subway bread with filling)",
            "Small desserts (Caramel banana, Fruit custard pudding, Triple chocolate mousse, Coffee verrine)",
            "Tarts & pies (Apple, Lemon, Chocolate)",
            "Doughnuts & Berliners",
            "Entremet (Chocolate hazelnut or seasonal)",
            "French desserts – Opera",
            "Chocolates (Centre-filled, Truffle balls, Coffee bonbon, White chocolate fudge)",
            "Puff pastry (Cream roll, Vol-au-vent, Potato puff, other shapes)",
            "Ice creams (Vanilla, Chocolate) & Fillings (Caramel sauce/ganache, Chocolate ganache, Almond praline, Buttercream, Cream cheese, American Buttercream)",
        ],
    },
   /* {
        title: "1 Year Advance International Diploma in Bakery & Confectionery",
        image: bakeryHeroImg,
        duration: "1 Year (9 months classes + 3 months training)",
        timings: [
            "Morning (11:00am – 2:00pm)",
            "Evening (2:30pm – 5:30pm)",
        ],
        description:
            "Internationally-oriented diploma covering advanced cakes, breads, viennoiseries, French desserts, chocolates, puff pastry and more.",
        items: [
            "Oil, Butter & Milkmaid sponges; Tres Leches; Swiss Roll; Iyengar cake",
            "Tea time cakes (Whole wheat & jaggery, Marble, Pineapple & Orange upside-down, Chocolate caramel, Semolina, Mawa, Lemon, Banana)",
            "Brownies (Nutella, Oreo, Red Velvet Brownie)",
            "Muffins (Tutti frutti, Choco chip, Banana crumble, Orange, Rasmalai)",
            "Cupcakes (Pineapple buttercream, Chocolate truffle, Red velvet, Vanilla Strawberry)",
            "Pinata (with sponge & surprise)",
            "Cheesecakes – 3 baked + 3 no-bake",
            "Fresh fruit icing & strawberry filling",
            "Theme cakes: Butterscotch, Top forward (Unicorn), Red velvet buttercream, Farm/Jungle, Truffle, Half naked, Choco-vanilla, Coconut, Full fondant ×3, Monogram tart, Neapolitan",
            "Fillings & ratios: ganaches (choc/white/caramel), praline, cream cheese, buttercream, lemon curd, apple pie filling, pineapple buttercream",
            "Chocolate garnishing (balls, 3D hearts, sails, barks)",
            "Wedding cakes: 2-tier stacking, 3-tier semi-fondant, Chandelier cake",
            "Cookies (Nankhatai, Coconut, Atta, Jeera, Nutella, Deep dish, Cake rusk, NY Choco chunk, Italian Biscotti, Chocolate oats, Karachi fruit, Cheese crackers, Turkish pistachio)",
            "Breads (Pav, Burger buns with filling, Stuffed garlic bread, Bread loaf, Pizza dough with filling, Korean buns, Subway bread with filling, Gluten-free loaf, Pita, Stuffed bread kulcha, Cinnamon rolls, Pide, Pizzeria style, Focaccia, Baguette)",
            "Small desserts (Caramel banana, Fruit custard pudding, Triple chocolate mousse, Coffee verrine, Choco-strawberry verrine, Lotus biscoff, Tiramisu, Mocha cheesecake shots)",
            "Tarts & pies (Apple, Lemon, Chocolate, Banoffee, Vanilla spinach quiche, Chocolate strawberry)",
            "Doughnuts & Berliners",
            "Entremets (Strawberry chocolate, Chocolate hazelnut, Red velvet caramel & cream cheese)",
            "French desserts (Macaron, Opera)",
            "Chocolates (Centre-filled, Truffle balls, Coffee bonbon, Coconut fudge, Rose pistachio fudge, Dark chocolate fudge, Red velvet & cream cheese truffle balls, Nutty bar, Orange bonbon)",
            "Cakesicles & Cake pops",
            "Puff pastry: cream roll, vol-au-vent, potato puff & shapes",
            "Ice creams (Vanilla, Chocolate, Oreo, Butterscotch, Strawberry, Blueberry)",
            "Internationally certified"
        ],
    }, */
];

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
    const [openProgramIndex, setOpenProgramIndex] = useState<number | null>(null);
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

                {/* Diploma & Certificate Programs */}
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h2 className="text-4xl font-serif font-bold text-foreground mb-8" variants={cardVariants}>
                        Certificate Programs
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {programs.map((program, idx) => (
                            <motion.div
                                key={program.title}
                                className="bg-background rounded-2xl shadow-warm overflow-hidden hover:shadow-lg transition-all duration-300"
                                variants={cardVariants}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="h-40 w-full overflow-hidden">
                                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-serif font-semibold mb-2">{program.title}</h3>
                                    <p className="text-muted-foreground mb-4">{program.description}</p>
                                    <div className="text-sm text-accent mb-2">
                                        <span>{program.duration}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-4">
                                        {program.timings.join(" • ")}
                                    </div>
                                    <Dialog open={openProgramIndex === idx} onOpenChange={(open) => setOpenProgramIndex(open ? idx : null)}>
                                        <DialogTrigger asChild>
                                            <Button variant="hero" size="sm" onClick={() => setOpenProgramIndex(idx)}>View Details</Button>
                                        </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                                            <DialogHeader className="flex-shrink-0">
                                                <DialogTitle>{program.title}</DialogTitle>
                                                <DialogDescription>
                                                    {program.duration} • {program.timings.join(" • ")}
                                                </DialogDescription>
                                            </DialogHeader>
                                        <div className={
                                            idx >= 2
                                                ? "mt-3 space-y-3 text-sm max-h-[60vh] md:max-h-[65vh] overflow-y-auto pr-2 flex-1"
                                                : "mt-3 space-y-3 text-sm"
                                        }>
                                            <div>
                                                <p className="font-medium">What you will learn:</p>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {program.items.map((it) => (
                                                        <li key={it}>{it}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.h2
                    className="text-4xl font-serif font-bold text-foreground mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    Minor Programs
                </motion.h2>

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