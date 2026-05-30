import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Clock, Users, Award, ChefHat } from "lucide-react";
import { useRef } from "react";
import { SectionHeader } from "@/components/bakery/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { LazyImage } from "@/components/motion/LazyImage";
import bakeryHero from "@/assets/bakery-hero.jpg";
import bakingClass from "@/assets/baking-class.jpg";

const timeline = [
  { year: "2012", event: "Founded by Chef Priyanka Kumar", side: "left" as const },
  { year: "2015", event: "Opened our first baking school", side: "right" as const },
  { year: "2018", event: "Expanded certificate programs", side: "left" as const },
  { year: "2022", event: "Celebrating a decade of excellence", side: "right" as const },
  { year: "2025", event: "Launched online ordering platform", side: "left" as const },
];

const stats = [
  { icon: Clock, number: "13+", label: "Years of Experience" },
  { icon: Users, number: "10K+", label: "Students Taught" },
  { icon: Heart, number: "1M+", label: "Happy Customers" },
  { icon: Award, number: "5+", label: "Awards Won" },
];

const founders = [
  {
    name: "Chef Priyanka Kumar",
    role: "Founder & Head Baker",
    image: bakeryHero,
    quote: "Every loaf tells a story of patience, fire, and love for the craft.",
  },
  {
    name: "The Gurukul Team",
    role: "Artisan Bakers & Instructors",
    image: bakingClass,
    quote: "We teach not just recipes — but the rhythm and soul of real baking.",
  },
];

export const About = () => {
  const storyRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <div className="pt-16 sm:pt-20">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
        <div className="container-bakery relative">
          <SectionHeader
            eyebrow="Our Story"
            title="Where Tradition Meets Innovation"
            description="Four decades of passion — from a neighborhood shop to a beloved institution sharing the art of Punjab baking."
          />
        </div>
      </section>

      <section ref={storyRef} className="section-padding pt-0">
        <div className="container-bakery">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Founded in 2012 by Chef Priyanka Kumar, Gurukul Bakery began as a small neighborhood shop with a
                  simple mission: bring authentic Punjab baking to our community.
                </p>
                <p className="text-lg leading-relaxed">
                  What started with traditional recipes now serves thousands daily — with the same commitment to
                  quality that defined our earliest days.
                </p>
                <p className="text-lg leading-relaxed">
                  Today we share our knowledge through comprehensive courses, ensuring traditional baking thrives for
                  future generations.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <motion.div style={{ y: imageY }} className="relative rounded-3xl overflow-hidden shadow-warm">
                <LazyImage src={bakeryHero} alt="Gurukul bakery interior" wrapperClassName="aspect-[4/5] sm:aspect-[3/4]" />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-warm">
        <div className="container-bakery">
          <SectionHeader eyebrow="The People" title="Meet Our Makers" align="center" />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="rounded-3xl overflow-hidden bg-card border border-border/50 shadow-card"
                >
                  <LazyImage src={f.image} alt={f.name} wrapperClassName="aspect-[16/10]" />
                  <div className="p-6 sm:p-8">
                    <ChefHat className="h-6 w-6 text-bakery-gold mb-3" />
                    <h3 className="font-display text-2xl font-semibold">{f.name}</h3>
                    <p className="text-sm text-bakery-orange font-medium mb-4">{f.role}</p>
                    <p className="text-muted-foreground italic leading-relaxed">"{f.quote}"</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bakery">
          <SectionHeader eyebrow="Milestones" title="Our Journey" />

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-px" />

            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.08}>
                <div
                  className={`relative flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12 ${
                    index % 2 === 0 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className="sm:w-1/2 sm:pr-12 sm:text-right flex sm:justify-end pl-12 sm:pl-0">
                    <div className="glass-panel rounded-2xl p-5 sm:p-6 max-w-sm w-full sm:ml-auto text-left sm:text-right">
                      <span className="text-2xl font-display font-bold text-primary">{item.year}</span>
                      <p className="text-muted-foreground mt-2">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-bakery-gold border-4 border-background shadow-glow -translate-x-1/2 top-6" />
                  <div className="sm:w-1/2 hidden sm:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-warm">
        <div className="container-bakery">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="text-center p-6 sm:p-8 rounded-3xl bg-card border border-border/50 shadow-card"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary mb-4">
                    <stat.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-display font-bold text-primary">{stat.number}</p>
                  <p className="text-sm text-muted-foreground font-medium mt-1">{stat.label}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bakery text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-bakery-orange font-semibold">Purpose</span>
            <h2 className="font-display text-display-sm mt-4 mb-8">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To preserve the artisan tradition of baking while inspiring the next generation through exceptional
              education, premium ingredients, and unwavering commitment to quality.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
