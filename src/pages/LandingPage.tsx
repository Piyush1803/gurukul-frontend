import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import Products from "@/pages/Products";

export const LandingPage = () => {
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
