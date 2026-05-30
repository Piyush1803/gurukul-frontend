import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Instagram, Facebook, Mail, ArrowRight, Wheat } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const footerLinks = [
  { label: "Home", to: "home" },
  { label: "About", to: "about" },
  { label: "Products", to: "products" },
  { label: "Gallery", to: "gallery" },
  { label: "Contact", to: "contact" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const ScrollOrNav = ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
  }) =>
    isLanding ? (
      <ScrollLink to={to} smooth duration={600} offset={-80} className={className}>
        {children}
      </ScrollLink>
    ) : (
      <Link to="/" state={{ scrollTo: to }} className={className}>
        {children}
      </Link>
    );

  return (
    <footer className="relative bg-bakery-chocolate text-bakery-cream overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bakery-chocolate via-bakery-brown/90 to-bakery-chocolate opacity-95" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bakery-gold/40 to-transparent" />

      <div className="container-bakery relative py-14 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Wheat className="h-7 w-7 text-bakery-gold" />
              <span className="font-display text-2xl font-semibold">Gurukul Bakery</span>
            </div>
            <p className="text-sm text-bakery-cream/70 leading-relaxed max-w-xs">
              Artisan baked goods and world-class courses — crafted with tradition, served with warmth.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.08 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-bakery-cream/20 bg-bakery-cream/5 text-bakery-cream hover:bg-bakery-gold hover:text-bakery-chocolate transition-colors"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-bakery-gold mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <ScrollOrNav
                    to={link.to}
                    className="text-sm text-bakery-cream/75 hover:text-bakery-gold transition-colors"
                  >
                    {link.label}
                  </ScrollOrNav>
                </li>
              ))}
              <li>
                <Link
                  to="/courses"
                  className="text-sm text-bakery-cream/75 hover:text-bakery-gold transition-colors"
                >
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-bakery-gold mb-4">Visit</h4>
            <p className="text-sm text-bakery-cream/75 leading-relaxed">
              Punjab, India
              <br />
              Daily 8 AM – 9 PM
              <br />
              <a href="tel:+918918215576" className="hover:text-bakery-gold transition-colors">
                +91 89182 15576
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-bakery-gold mb-4">Newsletter</h4>
            <p className="text-sm text-bakery-cream/70 mb-4">Fresh drops, course dates & seasonal specials.</p>
            {subscribed ? (
              <p className="text-sm text-bakery-gold font-medium">You're on the list. Thank you!</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
                className="flex gap-2"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-bakery-cream/10 border-bakery-cream/20 text-bakery-cream placeholder:text-bakery-cream/40 rounded-full"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="shrink-0 rounded-full bg-bakery-gold text-bakery-chocolate hover:bg-bakery-gold/90"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-bakery-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-bakery-cream/50">
          <p>© {new Date().getFullYear()} Gurukul Bakery. All rights reserved.</p>
          <p>Crafted with care — baked fresh daily.</p>
        </div>
      </div>
    </footer>
  );
};
