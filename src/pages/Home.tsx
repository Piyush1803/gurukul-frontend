import { motion, useScroll, useTransform } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Clock, Award, Users, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import pastriesImage from "@/assets/pastries.jpg";
import bakingClassImage from "@/assets/baking-class.jpg";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/bakery/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { LazyImage } from "@/components/motion/LazyImage";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Spotlight } from "@/components/effects/Spotlight";
import { Marquee } from "@/components/bakery/Marquee";

const features = [
  {
    icon: Clock,
    title: "Fresh Daily",
    description: "Baked every morning with traditional techniques and premium ingredients.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Finest local ingredients, artisan methods, uncompromising standards.",
  },
  {
    icon: Users,
    title: "Expert Courses",
    description: "Learn from master bakers with decades of professional experience.",
  },
];

const marqueeItems = [
  "Artisan Sourdough",
  "Butter Croissants",
  "Celebration Cakes",
  "French Pastries",
  "Eggless Specialties",
  "Baking Courses",
];

export const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={ref}>
      <Hero />

      <div className="border-y border-border/50 bg-bakery-chocolate py-3 overflow-hidden">
        <Marquee speed="fast">
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="mx-6 text-sm font-medium uppercase tracking-[0.2em] text-bakery-cream/90 whitespace-nowrap flex items-center gap-6"
            >
              <Sparkles className="h-3 w-3 text-bakery-gold inline" />
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <section className="section-padding bg-gradient-warm relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary" />
          <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-bakery-gold" />
        </motion.div>

        <div className="container-bakery relative">
          <SectionHeader
            eyebrow="Our Promise"
            title="Why Choose Gurukul"
            description="The perfect blend of Punjab tradition and modern artisan craft in every bite."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.1}>
                <Spotlight className="h-full rounded-3xl">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="h-full text-center p-8 sm:p-10 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-warm transition-shadow duration-500"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-primary rounded-2xl mb-6 shadow-soft">
                      <feature.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </motion.div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-bakery">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal direction="left">
              <span className="text-xs uppercase tracking-[0.2em] text-bakery-orange font-semibold">Our Collection</span>
              <h2 className="font-display text-display-sm text-foreground mt-3 mb-6">
                Gurukul Baked Goods
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                From flaky croissants to hearty sourdough — classic favorites and seasonal specialties, crafted with passion.
              </p>
              <MagneticButton>
                <Link to="/products">
                  <Button variant="bakery" size="lg" className="rounded-full px-8 gap-2">
                    Browse Products <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </MagneticButton>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-primary opacity-20 rounded-3xl blur-2xl" />
                <LazyImage
                  src={pastriesImage}
                  alt="Assorted pastries"
                  wrapperClassName="rounded-3xl aspect-[4/3] shadow-warm"
                  className="group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-warm relative overflow-hidden">
        <div className="container-bakery">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal direction="left" className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-bakery-gold/20 rounded-3xl blur-2xl" />
                <LazyImage
                  src={bakingClassImage}
                  alt="Baking class"
                  wrapperClassName="rounded-3xl aspect-[4/3] shadow-warm"
                  className="group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1} className="order-1 lg:order-2">
              <span className="text-xs uppercase tracking-[0.2em] text-bakery-orange font-semibold">Learn & Create</span>
              <h2 className="font-display text-display-sm text-foreground mt-3 mb-6">Master the Art</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Comprehensive baking courses from experienced instructors — for beginners and advanced bakers alike.
              </p>
              <MagneticButton>
                <Link to="/courses">
                  <Button variant="hero" size="lg" className="rounded-full px-8 gap-2">
                    View Courses <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};
