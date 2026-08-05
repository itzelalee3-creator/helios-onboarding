"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { RotateCcw, RotateCw } from "lucide-react";
import { cn } from "@/lib/cn";

interface AreaFlipCardProps {
  name: string;
  desc: string;
  icon: ReactNode;
  image?: string;
}

export function AreaFlipCard({ name, desc, icon, image }: AreaFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="h-60 [perspective:1400px]">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={`${name}: ${flipped ? "ver de nuevo el frente" : "ver descripción completa"}`}
        className="focus-ring group relative h-full w-full rounded-2xl text-left transition-transform duration-500 ease-in-out [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : undefined }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-lg backdrop-blur-md transition-all duration-300 [backface-visibility:hidden] hover:border-teal-strong/50 hover:shadow-2xl",
            !image && "hover:bg-white/10"
          )}
        >
          {image && (
            <>
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 320px, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                aria-hidden
              />
            </>
          )}

          <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-strong/15 text-teal-strong">
            {icon}
          </span>
          <p className="font-apple relative z-10 mt-1 font-semibold text-white drop-shadow-md">
            {name}
          </p>
          <span className="relative z-10 mt-2 flex items-center gap-1.5 text-xs text-white/70">
            <RotateCw className="h-3.5 w-3.5" aria-hidden />
            Haz clic para ver más
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-teal-strong/40 bg-white/5 p-5 text-center shadow-2xl backdrop-blur-md [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-sm leading-relaxed text-zinc-100 drop-shadow-md">
            {desc}
          </p>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-teal-strong">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Volver
          </span>
        </div>
      </button>
    </div>
  );
}
