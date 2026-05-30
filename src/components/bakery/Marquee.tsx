import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

export const Marquee = ({
  children,
  reverse = false,
  className = "",
  speed = "normal",
}: MarqueeProps) => {
  const duration =
    speed === "slow" ? "55s" : speed === "fast" ? "28s" : "40s";

  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 gap-8 min-w-full",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ animationDuration: duration }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};
