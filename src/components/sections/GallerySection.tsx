import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { SectionHeader } from "@/components/bakery/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { LazyImage } from "@/components/motion/LazyImage";
import bakeryHero from "@/assets/bakery-hero.jpg";
import pastries from "@/assets/pastries.jpg";
import bakingClass from "@/assets/baking-class.jpg";

const galleryItems = [
  { src: bakeryHero, alt: "Artisan bakery display", span: "md:col-span-2 md:row-span-2" },
  { src: pastries, alt: "Fresh pastries assortment", span: "" },
  { src: bakingClass, alt: "Baking class in session", span: "" },
  { src: pastries, alt: "Golden croissants", span: "md:col-span-2" },
  { src: bakeryHero, alt: "Celebration cakes", span: "" },
  { src: bakingClass, alt: "Hands crafting dough", span: "" },
];

export const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="section-padding relative" id="gallery">
      <div className="container-bakery">
        <SectionHeader
          eyebrow="Visual Feast"
          title="From Our Kitchen"
          description="A glimpse into the craft, warmth, and artistry behind every batch."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <Reveal key={`${item.alt}-${i}`} delay={i * 0.05} className={item.span}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className={`group relative h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl ${item.span}`}
              >
                <LazyImage
                  src={item.src}
                  alt={item.alt}
                  wrapperClassName="h-full w-full"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-bakery-chocolate/0 group-hover:bg-bakery-chocolate/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-bakery-chocolate/90 backdrop-blur-md p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              key={lightbox}
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].alt}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-glow"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
