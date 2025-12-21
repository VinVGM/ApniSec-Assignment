"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface NeonGradientCardProps {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The content to be displayed within the card.
   * */
  children?: React.ReactNode;

  /**
   * @default ""
   * @type string
   * @description
   * The class name to be applied to the card.
   * */
  className?: string;

  /**
   * @default 5
   * @type number
   * @description
   * The size of the border in pixels.
   * */
  borderSize?: number;

  /**
   * @default 2
   * @type number
   * @description
   * The radius of the border in pixels.
   * */
  borderRadius?: number;

  /**
   * @default "#00ff00"
   * @type string
   * @description
   * The primary color of the neon gradient.
   * */
  neonColors?: {
    firstColor: string;
    secondColor: string;
  };
}

export const NeonGradientCard = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#22c55e", // Green-500
    secondColor: "#16a34a", // Green-600
  },
  ...props
}: NeonGradientCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": neonColors.firstColor,
          "--neon-second-color": neonColors.secondColor,
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          "--pseudo-element-background-image": `linear-gradient(0deg, var(--neon-first-color), var(--neon-second-color))`,
          "--pseudo-element-width": `${dimensions.width + borderSize * 2}px`,
          "--pseudo-element-height": `${dimensions.height + borderSize * 2}px`,
          "--after-blur": `${dimensions.width / 3}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative z-10 w-fit overflow-hidden rounded-[var(--border-radius)] bg-black border border-white/10",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute -left-[var(--border-size)] -top-[var(--border-size)] -z-10 h-[var(--pseudo-element-height)] w-[var(--pseudo-element-width)] rounded-[var(--border-radius)] bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] content-['']",
          "after:absolute after:-left-[var(--border-size)] after:-top-[var(--border-size)] after:-z-10 after:h-[var(--pseudo-element-height)] after:w-[var(--pseudo-element-width)] after:rounded-[var(--border-radius)] after:blur-[var(--after-blur)] after:content-[''] after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))]",
          "animate-neon-gradient"
        )}
      ></div>
      <div className="relative z-10 h-full w-full rounded-[var(--card-content-radius)] bg-black/90 p-4 text-white">
          {children}
      </div>
    </div>
  );
};
