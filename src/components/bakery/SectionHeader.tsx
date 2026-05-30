import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) => (
  <div
    className={cn(
      "mb-12 md:mb-16",
      align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl",
      className
    )}
  >
    {eyebrow && (
      <Reveal delay={0}>
        <span className="inline-block mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-bakery-orange">
          {eyebrow}
        </span>
      </Reveal>
    )}
    <TextReveal
      text={title}
      as="h2"
      className={cn(
        "font-display text-display-sm md:text-display text-foreground justify-center",
        align === "left" && "justify-start"
      )}
    />
    {description && (
      <Reveal delay={0.15} className="mt-5">
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </Reveal>
    )}
  </div>
);
