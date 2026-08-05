"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface FinishMaterial {
  id: string;
  label: string;
  src: string;
}

const MATERIALS: FinishMaterial[] = [
  { id: "monokote", label: "Monokote", src: "/videos/monokote.mp4" },
  { id: "espuma", label: "Espuma", src: "/videos/espuma.mp4" },
];

export function FinishReelPlayer() {
  const [index, setIndex] = useState(0);
  const material = MATERIALS[index];

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-teal-strong/40 sm:p-5">
      {/* Material tabs */}
      <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
        {MATERIALS.map((m, i) => {
          const isActive = i === index;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-300",
                isActive
                  ? "bg-teal-strong/20 text-white"
                  : "text-white/60 hover:text-white/80"
              )}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Vertical 9:16 reel player */}
      <div className="relative aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_24px_-8px_var(--color-teal-strong)]">
        <video
          key={material.src}
          src={material.src}
          controls
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
