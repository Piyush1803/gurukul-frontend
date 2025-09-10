import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/bakery-hero.jpg";
import { Link } from "react-router-dom";

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as any,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Gurukul bakery with fresh pastries"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6"
        >
          Gurukul Bakery
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Fresh baked goods crafted with love and traditional techniques.
          Discover our daily selection and learn the art of baking.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/products">
            <Button variant="hero" size="lg" className="text-lg px-8 py-3">
              Order Now
            </Button>
          </Link>

          <Link to="/courses">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-background/10 border-foreground/20 text-foreground hover:bg-background/20">
                View Courses
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-16 h-16 bg-bakery-orange rounded-full opacity-20 blur-xl"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-32 right-16 w-24 h-24 bg-bakery-gold rounded-full opacity-15 blur-xl"
      />
    </section>
  );
};