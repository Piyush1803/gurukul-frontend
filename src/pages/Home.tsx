import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Clock, Award, Users, Heart, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import pastriesImage from "@/assets/pastries.jpg";
import bakingClassImage from "@/assets/baking-class.jpg";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  console.log('Home component rendering...');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const features = [
    {
      icon: Clock,
      title: "Fresh Daily",
      description: "All our products are baked fresh every morning using traditional techniques."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "We use only the finest ingredients sourced from local suppliers."
    },
    {
      icon: Users,
      title: "Expert Courses",
      description: "Learn from master bakers with over 20 years of experience."
    }
  ];

  const floatingIcons = [
    { icon: Heart, delay: 0, x: "10%", y: "20%" },
    { icon: Star, delay: 0.5, x: "80%", y: "15%" },
    { icon: Sparkles, delay: 1, x: "15%", y: "70%" },
    { icon: Clock, delay: 1.5, x: "85%", y: "75%" },
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
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

  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as any,
      },
    },
  };

  return (
    <div className="min-h-screen" ref={ref}>
      <Hero />

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: item.x, top: item.y }}
            animate={floatingAnimation}
            transition={{ delay: item.delay }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-8 h-8 text-primary/20"
            >
              <item.icon className="w-full h-full" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-warm relative overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 opacity-5"
        >
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full" />
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent rounded-full" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Why Choose Us: static text, no animation */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              <span className="inline-block">Why</span>
              <span className="inline-block ml-3">Choose Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of tradition and innovation in every bite
            </p>
          </div>

          {/* Feature cards: no rotate/entrance animation */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-background shadow-soft hover:shadow-warm transition-all duration-300 cursor-pointer"
                style={{ transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 relative"
                >
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                  <div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                  />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview: remove side/rotate/entrance animation */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Gurukul Baked Goods
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                From flaky croissants to hearty sourdough, every item is crafted with passion
                and expertise. Our daily selection features both classic favorites and seasonal
                specialties.
              </p>
              <div>
                <Link to="/products">
                  <Button
                    variant="bakery"
                    size="lg"
                    className="text-lg px-8 py-3 hover:scale-105 transition-transform duration-200"
                  >
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-xl" />
              <img
                src={pastriesImage}
                alt="Assorted pastries and baked goods"
                className="rounded-2xl shadow-warm w-full relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl z-20" />
              {/* Floating sparkles */}
              <div className="absolute top-4 right-4 text-accent opacity-60 z-30">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview: remove side/rotate/entrance animation */}
      <section className="py-20 bg-gradient-warm relative overflow-hidden">
        {/* Parallax rotating element (keep as is) */}
        <motion.div
          style={{ rotate }}
          className="absolute top-20 right-20 w-20 h-20 border-2 border-primary/10 rounded-full"
        />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1 group">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-xl" />
              <img
                src={bakingClassImage}
                alt="Baking class in session"
                className="rounded-2xl shadow-warm w-full relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl z-20" />
              {/* Floating heart */}
              <div className="absolute bottom-4 left-4 text-primary opacity-70 z-30">
                <Heart className="w-6 h-6" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Master the Art
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join our comprehensive baking courses and learn professional techniques
                from experienced instructors. Perfect for beginners and advanced bakers alike.
              </p>
              <div>
                <Link to="/courses">
                  <Button
                    variant="hero"
                    size="lg"
                    className="text-lg px-8 py-3 hover:scale-105 transition-transform duration-200"
                  >
                    View Courses
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};