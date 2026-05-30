import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import Products from "@/pages/Products";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";

export const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as { scrollTo?: string })?.scrollTo;
    if (target) {
      setTimeout(() => {
        scroller.scrollTo(target, { smooth: true, duration: 600, offset: -80 });
      }, 100);
    }
  }, [location]);

  return (
    <div>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="products">
        <Products embedded />
      </section>
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
};
