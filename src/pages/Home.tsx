// app/pages/Home.tsx
import ImageSlider from "../components/ImageSlider";
import ProductCard from "../components/ProductCard";

const bakeryCourses = [
  {
    heading: "🎂 Cream Cakes",
    price: "₹10,000",
    items: [
      { name: "Vanilla", image: "/images/vanilla.jpg" },
      { name: "Chocolate", image: "/images/chocolate.jpg" },
      { name: "Red Velvet", image: "/images/red-velvet.jpg" },
      { name: "Coffee Sponge", image: "/images/coffee-sponge.jpg" },
    ],
  },
  {
    heading: "🧁 Muffins ",
    price: "₹5,500",
    items: [
      { name: "Double Chocolate Cup Muffin", image: "/images/double-chocolate.jpg" },
      { name: "Banana Oats Muffin", image: "/images/banana muffin.png" },
      { name: "Blueberry Muffin", image: "/images/blueberry muffin.png" },
      { name: "Honey Oat Raisin Muffin", image: "/images/Honey Oat Raisin Muffin.png" },
      { name: "Vanilla Muffin", image: "/images/vanilla muffin.png" },
      { name: "Banana Bonanza Muffin", image: "/images/Banana Bonanza Muffin.png" },
      { name: "Nutella Peanut Butter Muffin", image: "/images/nuteralla muffin.png" },
      { name: "Fruit and Nut Muffin", image: "/images/fruit and nut muffin.png" },
      { name: "Spinach & Corn Muffin", image: "/images/Spinach Corn Muffinn.png" },
      { name: "Coffee Walnut Muffin", image: "/images/coffee walnut muffin.png" },
    ],
  },

  {
    heading: "🍰 Dry Cakes ",
    price: "₹5,500",
    items: [
      { name: "Carrot Cake with Orange Frosting", image: "/images/carrot cake ith orange frosting.png" },
      { name: "Date Walnut Cake", image: "/images/date an walnut cake.png" },
      { name: "Almond Semolina Tea Cake", image: "/images/Almond selmolina cake.png" },
      { name: "Chocochip Chocolate Cake", image: "/images/chocochip-chocolate-cake.png" },
      { name: "Whole Wheat Banana Cake", image: "/images/Whole wheat banana cake.png" },
      { name: "Lemon Cake", image: "/images/Lemon cake.png" },
      { name: "Fig & Dates Cake", image: "/images/fig an dates cake.png" },
      { name: "Marble Loaf with Hazelnut Glaze", image: "/images/marble loaf with hazelnut glaze.png" },
    ],
  },
  {
    heading: "🍫 Brownies ",
    price: "₹5,500",
    items: [
      { name: "Walnut Brownie", image: "/images/walnut-brownie.png" },
      { name: "Oreo Brownie", image: "/images/oreo-brownie.png" },
      { name: "Biscoff Brownie", image: "/images/biscoff-brownie.png" },
      { name: "Nutella Brownie", image: "/images/nutella-brownie.png" },
      { name: "Choco Overload Brownie", image: "/images/choco-overload-brownie.png" },
      { name: "Monster Brownie", image: "/images/monster-brownie.png" },
    ],
  },
  {
    heading: "🧁 Cupcakes ",
    price: "₹5,500",
    items: [
      { name: "Chocolate Cupcake", image: "/images/chocolate-cupcake.png" },
      { name: "Nutella Cupcake", image: "/images/nutella-cupcake.png" },
      { name: "Red Velvet Cupcake", image: "/images/red-velvet-cupcake.png" },
      { name: "Cherry Vanilla Cupcake", image: "/images/cherry-vanilla-cupcake.png" },
      { name: "Biscoff Cupcake", image: "/images/biscoff-cupcake.png" },
      { name: "Blueberry Lemon Cupcake", image: "/images/blueberry-lemon-cupcake.png" },
      { name: "Baklava Cupcake", image: "/images/baklava-cupcake.png" },
      { name: "Cookies & Cream Cupcake", image: "/images/cookies-and-cream-cupcake.png" },
    ],
  },
  {
    heading: "🍪 Cookies ",
    price: "₹5,500",
    items: [
      { name: "Double Chocochips", image: "/images/double-chocochips.png" },
      { name: "Oat & Raisin", image: "/images/oat-and-raisin.png" },
      { name: "Choco Chunk", image: "/images/choco-chunk.png" },
      { name: "Nutella Filled", image: "/images/nutella-filled.png" },
      { name: "Chilli Cheese", image: "/images/chilli-cheese.png" },
      { name: "Choco Almond", image: "/images/choco-almond.png" },
      { name: "Butter Cookies", image: "/images/butter-cookies.png" },
      { name: "Cashew Cookies", image: "/images/cashew-cookies.png" },
    ],
  },
  {
    heading: "🍫 Chocolate Cakes ",
    price: "₹7,000",
    items: [
      { name: "Almond Praline Cake", image: "/images/almond-praline-cake.png" },
      { name: "KitKat Cake", image: "/images/kitkat-cake.png" },
      { name: "Mississippi Mad Cake", image: "/images/mississippi-mad-cake.png" },
      { name: "Pinata Cake", image: "/images/pinata-cake.png" },
      { name: "Bakery Style Sponge Cake", image: "/images/bakery-style-sponge-cake.png" },
    ],
  },
  {
    heading: "🍰 Travel Cakes ",
    price: "₹6,500",
    items: [
      { name: "Vanilla Blueberry", image: "/images/vanilla-blueberry.png" },
      { name: "Choco Hazelnut", image: "/images/choco-hazelnut.png" },
      { name: "Almond Praline", image: "/images/almond-praline.png" },
      { name: "Rose Pistachio", image: "/images/rose-pistachio.png" },
      { name: "Chocolate Biscoff", image: "/images/chocolate-biscoff.png" },
    ],
  },
  {
    heading: "🎂 Decorative Cakes ",
    price: "₹6,500",
    items: [
      { name: "Pineapple Cake", image: "/images/pineapple-cake.png" },
      { name: "Doll Cake", image: "/images/doll-cake.png" },
      { name: "Red Velvet Cake", image: "/images/red-velvet-cake.png" },
      { name: "Black Forest Cake", image: "/images/black-forest-cake.png" },
      { name: "Anti-Gravity Cake", image: "/images/anti-gravity-cake.png" },
      { name: "Photo Cake", image: "/images/photo-cake.png" },
      { name: "Truffle Cake", image: "/images/truffle-cake.png" },
      { name: "Oreo Cake", image: "/images/oreo-cake.png" },
    ],
  },
  {
    heading: "🍮 Cheese Cakes ",
    price: "₹6,500",
    items: [
      { name: "Strawberry Cheesecake", image: "/images/strawberry-cheesecake.png" },
      { name: "Blueberry Cheesecake", image: "/images/blueberry-cheesecake.png" },
      { name: "Biscoff Cheesecake", image: "/images/biscoff-cheesecake.png" },
      { name: "Cookies & Cream Cheesecake", image: "/images/cookies-and-cream-cheesecake.png" },
    ],
  },
  {
    heading: "🍞 BREAD ",
    price: "₹6,000",
    items: [
      { name: "Sandwich Loaf", image: "/images/sandwich-loaf.png" },
      { name: "Masala Loaf", image: "/images/masala-loaf.png" },
      { name: "Pao", image: "/images/pao.png" },
      { name: "Burger Bun", image: "/images/burger-bun.png" },
      { name: "Focaccia", image: "/images/focaccia.png" },
      { name: "Charcoal Bread", image: "/images/charcoal-bread.png" },
    ],
  },
  {
    heading: "☕ Coffee ",
    price: "₹10,000",
    items: [
      { name: "Cappuccino", image: "/images/cappuccino.png" },
      { name: "Latte", image: "/images/latte.png" },
      { name: "Dalgona", image: "/images/dalgona.png" },
      { name: "Americano", image: "/images/americano.png" },
      { name: "French Vanilla", image: "/images/french-vanilla.png" },
      { name: "Mocha", image: "/images/mocha.png" },
      { name: "Caramel", image: "/images/caramel.png" },
      { name: "Frappe", image: "/images/frappe.png" },
    ],
  },
  {
    heading: "🍕 Pizza ",
    price: "₹5,500",
    items: [
      { name: "Regular Base", image: "/images/regular-base.png" },
      { name: "Thin Crust", image: "/images/thin-crust.png" },
      { name: "Cheesy Burst Base", image: "/images/cheesy-burst-base.png" },
      { name: "Pizza Sauces", image: "/images/pizza-sauces.png" },
      { name: "Garlic Bread", image: "/images/garlic-bread.png" },
      { name: "Kulhad Pizza", image: "/images/kulhad-pizza.png" },
    ],
  },
  {
    heading: "🍝 Pasta ",
    price: "₹5,500",
    items: [
      { name: "Alfredo Red", image: "/images/alfredo-red.png" },
      { name: "Arabita White", image: "/images/arabita-white.png" },
      { name: "Baked Veg Bolognese", image: "/images/baked-veg-bolognese.png" },
      { name: "Mix Sauce Pasta", image: "/images/mix-sauce-pasta.png" },
      { name: "Aglio Olio", image: "/images/aglio-olio.png" },
    ],
  },

];

const Home = () => {
  return (
    <div className="px-6 py-10">
      <ImageSlider />

      {/* Intro section */}
      <div className="max-w-2xl mx-auto text-center mt-6 mb-10">
        <h1 className="text-2xl font-bold mb-4">Gurukul Bakery</h1>
        <span className="block text-base font-normal">
          offering a wide variety of freshly baked delights! 🎂🍪 From creamy cakes,
          crunchy cookies, and crusty breads 🥖 to buttery snacks 🥐 — we have it all! 🎓📚
          More than just a bakery, Gurukul is also a 🏫 training school for aspiring bakers
          👨‍🍳👩‍🍳, where passion meets skill. 🧁💡 Students learn with hands-on experience 🤲 and
          expert guidance 🎯. ❤️ Trusted by the community for quality and taste 😋, we bake
          with love and care every day. 🎁🎉 Customized treats and gift hampers are
          available for all your special occasions! 🎊🍬
        </span>
      </div>

      {/* Products by category */}
      <div className="flex flex-col gap-10">
        {bakeryCourses.map((course, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mb-4">{course.heading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {course.items.map((item, i) => (
                <ProductCard
                  key={`${course.heading}-${i}`}
                  name={item.name}
                  price={course.price}
                  imageUrl={item.image}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
