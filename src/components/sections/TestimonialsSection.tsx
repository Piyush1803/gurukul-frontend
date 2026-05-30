import { Star, Quote } from "lucide-react";
import { Marquee } from "@/components/bakery/Marquee";
import { SectionHeader } from "@/components/bakery/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

const reviews = [
  {
    name: "Ananya Sharma",
    text: "The sourdough and butter croissants are unreal — crisp outside, soft inside. Our family's weekend ritual now.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    text: "Ordered a custom birthday cake. Stunning design and balanced sweetness. Delivery was perfectly on time.",
    rating: 5,
  },
  {
    name: "Priya Kapoor",
    text: "Completed the 1-month course — professional techniques, warm instructors, and recipes I still use daily.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    text: "Best brownies in the city. Rich, fudgy, and always fresh. The café ambience feels premium and welcoming.",
    rating: 5,
  },
  {
    name: "Meera Joshi",
    text: "Cupcakes for our office event were a hit. Beautiful presentation and consistent quality across every flavor.",
    rating: 5,
  },
];

const ReviewCard = ({
  name,
  text,
  rating,
}: {
  name: string;
  text: string;
  rating: number;
}) => (
  <div className="mx-3 w-[min(85vw,340px)] shrink-0 rounded-3xl border border-border/50 bg-card/80 p-6 shadow-soft backdrop-blur-sm">
    <Quote className="h-8 w-8 text-bakery-gold/60 mb-4" />
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">{text}</p>
    <div className="flex items-center justify-between">
      <span className="font-semibold text-foreground">{name}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-bakery-gold text-bakery-gold" />
        ))}
      </div>
    </div>
  </div>
);

export const TestimonialsSection = () => (
  <section className="section-padding bg-gradient-warm relative overflow-hidden" id="testimonials">
    <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
    <div className="container-bakery relative">
      <SectionHeader
        eyebrow="Love Notes"
        title="What Our Guests Say"
        description="Stories from customers who made Gurukul part of their celebrations, mornings, and milestones."
      />

      <Reveal>
        <Marquee speed="slow" className="py-4 -mx-4">
          {reviews.map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </Marquee>
      </Reveal>

      <Reveal delay={0.2} className="mt-6">
        <Marquee reverse speed="slow" className="py-4 -mx-4">
          {[...reviews].reverse().map((r) => (
            <ReviewCard key={`${r.name}-rev`} {...r} />
          ))}
        </Marquee>
      </Reveal>
    </div>
  </section>
);
