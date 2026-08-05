"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface FloatingHeroImageProps {
  className?: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
  shadowClassName?: string;
}

export function FloatingHeroImage({
  className,
  src,
  width,
  height,
  alt = "Aeromodelo de Helios Aerodesign",
  shadowClassName = "drop-shadow-[0_25px_35px_rgba(16,21,29,0.35)]",
}: FloatingHeroImageProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={cn("relative", className)}
      animate={
        prefersReduced ? undefined : { y: [0, -16, 0], rotate: [0, 0.6, 0] }
      }
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        sizes="(max-width: 640px) 94vw, (max-width: 1024px) 82vw, 74vw"
        className={cn("h-auto w-full object-contain", shadowClassName)}
      />
    </motion.div>
  );
}
