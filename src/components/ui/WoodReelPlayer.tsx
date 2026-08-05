"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface Reel {
  label: string;
  src: string;
}

interface WoodMaterial {
  id: string;
  label: string;
  reels: Reel[];
}

const MATERIALS: WoodMaterial[] = [
  {
    id: "balsa",
    label: "Madera Balsa",
    reels: [
      { label: "Video 1", src: "/videos/balsa-1.mp4" },
      { label: "Video 2", src: "/videos/balsa-2.mp4" },
    ],
  },
  {
    id: "pino",
    label: "Madera de Pino",
    reels: [
      { label: "Video 1", src: "/videos/pino-1.mp4" },
      { label: "Video 2", src: "/videos/pino-2.mp4" },
    ],
  },
];

export function WoodReelPlayer() {
  const [materialIndex, setMaterialIndex] = useState(0);
  const [reelIndex, setReelIndex] = useState(0);
  const material = MATERIALS[materialIndex];
  const reel = material.reels[reelIndex];

  function selectMaterial(i: number) {
    setMaterialIndex(i);
    setReelIndex(0);
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-teal-strong/40 sm:p-5">
      {/* Material tabs */}
      <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
        {MATERIALS.map((m, i) => {
          const isActive = i === materialIndex;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => selectMaterial(i)}
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
          key={reel.src}
          src={reel.src}
          controls
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      {/* Reel picker (Video 1 / Video 2) */}
      <div className="flex gap-2">
        {material.reels.map((r, i) => {
          const isActive = i === reelIndex;
          return (
            <button
              key={r.label}
              type="button"
              onClick={() => setReelIndex(i)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-300",
                isActive
                  ? "border-teal-strong/50 bg-teal-strong/15 text-teal-strong"
                  : "border-white/10 bg-white/5 text-white/60 hover:text-white/80"
              )}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
