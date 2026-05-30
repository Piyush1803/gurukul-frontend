import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowDown, Wheat, Cookie, Croissant } from "lucide-react";
import heroImage from "@/assets/bakery-hero.jpg";
import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { Link as ScrollLink } from "react-scroll";

const floatingIngredients = [
  { Icon: Wheat, className: "top-[18%] left-[8%] sm:left-[12%]", delay: 0 },
  { Icon: Croissant, className: "top-[25%] right-[6%] sm:right-[10%]", delay: 0.5 },
  { Icon: Cookie, className: "bottom-[32%] left-[12%]", delay: 1 },
  { Icon: Wheat, className: "bottom-[28%] right-[14%]", delay: 1.5, size: "sm" },
];

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "15%"]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current!.querySelectorAll(".hero-word"), {
        y: 80,
        opacity: 0,
        rotateX: -40,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.7,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ["Gurukul", "Bakery"];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0 scale-105" style={{ y: imageY }}>
        <img
          src={heroImage}
          alt="Gurukul artisan bakery"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-glow" />
      </motion.div>

      <FloatingParticles />

      {floatingIngredients.map(({ Icon, className, delay, size }) => (
        <motion.div
          key={className}
          className={`absolute hidden sm:flex items-center justify-center rounded-2xl glass-panel p-3 text-bakery-gold ${className}`}
          animate={{ y: [0, -14, 0], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 5 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <Icon className={size === "sm" ? "h-6 w-6" : "h-8 w-8"} />
        </motion.div>
      ))}

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20 pb-28"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-bakery-gold border border-bakery-gold/30 bg-bakery-chocolate/30 backdrop-blur-md"
        >
          Artisan · Since 2012
        </motion.span>

        <h1
          ref={titleRef}
          className="font-display text-display-lg text-bakery-cream mb-6 perspective-[800px]"
        >
          {titleWords.map((word) => (
            <span key={word} className="hero-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="text-base sm:text-xl md:text-2xl text-bakery-cream/85 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Fresh baked goods crafted with love. Discover our daily selection and master the art of baking.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          <MagneticButton>
            <Link to="/products">
              <Button variant="hero" size="lg" className="w-full sm:w-auto text-base px-10 py-6 rounded-full shadow-glow">
                Order Now
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to="/courses">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-10 py-6 rounded-full border-bakery-cream/30 bg-bakery-cream/10 text-bakery-cream hover:bg-bakery-cream/20 backdrop-blur-sm"
              >
                View Courses
              </Button>
            </Link>
          </MagneticButton>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 sm:mt-20"
        >
          <ScrollLink
            to="about"
            smooth
            duration={800}
            offset={-80}
            className="inline-flex flex-col items-center text-bakery-cream/60 hover:text-bakery-gold transition-colors cursor-pointer"
          >
            <span className="text-xs uppercase tracking-widest mb-2">Discover</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </ScrollLink>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
