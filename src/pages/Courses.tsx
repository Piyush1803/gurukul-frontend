import { motion } from "framer-motion";
import { Users, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React, { useState } from 'react';

// --- ContactForm with Sheety integration ---
const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);

        const SHEETY_ENDPOINT = 'https://api.sheety.co/7c902e1a3a2e23b195242f624ed6ddc6/coursesQueryList/sheet1';
        const form = event.target;
        const formData = new FormData(form);
        const now = new Date();
        const submittedAt = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const data = {
            name: formData.get("name"),
            phoneNo: formData.get("phoneNo"), // now phoneNo comes second
            email: formData.get("email"),
            age: formData.get("age"),
            address: formData.get("address"),
            submittedAt,
        };

        try {
            const response = await fetch(SHEETY_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sheet1: data }),
            });

            if (response.ok) {
                setSubmissionStatus('success');
                form.reset();
            } else {
                const errorData = await response.json();
                console.error('Submission failed:', errorData);
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setSubmissionStatus('error');
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
                    <label className="block text-left text-muted-foreground mb-1 font-medium">Email (optional)</label>
                    <input type="email" name="email" className="w-full px-4 py-2 rounded-lg border border-accent bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition" placeholder="you@email.com" />
                </div>
                <div>
                    <label className="block text-left text-muted-foreground mb-1 font-medium">Age</label>
                    <input type="number" name="age" required min="1" className="w-full px-4 py-2 rounded-lg border border-accent bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition" placeholder="Your Age" />
                </div>
                <div>
                    <label className="block text-left text-muted-foreground mb-1 font-medium">Address</label>
                    <input type="text" name="address" required className="w-full px-4 py-2 rounded-lg border border-accent bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition" placeholder="Your Address" />
                </div>
                <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.04 }} whileTap={{ scale: isSubmitting ? 1 : 0.97 }}>
                    <Button type="submit" variant="hero" size="lg" className="w-full text-lg py-3" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    </Button>
                </motion.div>
                {submissionStatus === 'success' && (
                    <p className="text-center text-green-500 mt-4">Thank you! Your inquiry has been sent successfully.</p>
                )}
                {submissionStatus === 'error' && (
                    <p className="text-center text-red-500 mt-4">Something went wrong. Please try again later.</p>
                )}
            </form>
        </motion.div>
    );
};

const courses = [
    {
        icon: BookOpen,
        title: "Artisan Bread Baking",
        description: "Master the secrets of sourdough, baguettes, and more with hands-on guidance.",
        level: "Beginner to Advanced",
        duration: "4 weeks",
    },
    {
        icon: Star,
        title: "Pastry Perfection",
        description: "Learn to craft croissants, danishes, and classic French pastries from scratch.",
        level: "Intermediate",
        duration: "3 weeks",
    },
    {
        icon: Users,
        title: "Cake Decorating Essentials",
        description: "From buttercream basics to advanced fondant art, elevate your cake skills.",
        level: "All Levels",
        duration: "2 weeks",
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
    return (
        <div className="min-h-screen bg-gradient-warm py-20">
            <div className="container mx-auto px-4 relative">
                {/* Contact Us WhatsApp Button - top right, theme color */}
                <a
                    href="https://wa.me/918076036432"
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
                                <span>{course.level}</span>
                                <span>•</span>
                                <span>{course.duration}</span>
                            </div>
                            <Button variant="hero" size="sm" className="mt-2">Learn More</Button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contact Us Form */}
                <ContactForm />
            </div>
        </div>
    );
};