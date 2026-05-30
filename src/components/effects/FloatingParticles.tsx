import { motion } from "framer-motion";

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 4 + (i % 4) * 3,
  left: `${8 + (i * 7.5) % 88}%`,
  top: `${10 + (i * 11) % 80}%`,
  delay: i * 0.4,
  duration: 5 + (i % 5),
}));

export const FloatingParticles = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
    {particles.map((p) => (
      <motion.span
        key={p.id}
        className="absolute rounded-full bg-bakery-gold/30 blur-[1px]"
        style={{ width: p.size, height: p.size, left: p.left, top: p.top }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          delay: p.delay,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);
