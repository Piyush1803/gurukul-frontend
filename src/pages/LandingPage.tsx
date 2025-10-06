import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import Products from "@/pages/Products";

export const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as any)?.scrollTo as string | undefined;
    if (target) {
      // delay to ensure sections are mounted
      setTimeout(() => {
        scroller.scrollTo(target, {
          smooth: true,
          duration: 600,
          offset: -70,
        });
      }, 50);
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
        <Products />
      </section>
    </div>
  );
};
