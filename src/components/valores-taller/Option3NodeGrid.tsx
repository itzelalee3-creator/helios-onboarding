"use client";

import { useState } from "react";
import {
  BadgeCheck,
  ClipboardList,
  Sparkles,
  Clock,
  Radar,
  Users,
} from "lucide-react";
import { WORKSHOP_VALUES } from "./data";

const ICONS = [BadgeCheck, ClipboardList, Sparkles, Clock, Radar, Users];

export function Option3NodeGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? 0;
  const value = WORKSHOP_VALUES[active];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
      {/* Node grid */}
      <div className="relative grid w-full max-w-lg grid-cols-3 gap-4 rounded-2xl border border-teal-strong/20 bg-white/5 p-6 sm:p-8">
        {/* faux blueprint grid lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-teal-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--color-teal-strong) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {WORKSHOP_VALUES.map((v, i) => {
          const Icon = ICONS[i];
          const isActive = hovered === i;
          return (
            <button
              key={v.title}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onClick={() => setHovered(i)}
              className={`group relative z-10 flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition-all duration-300 ${
                isActive
                  ? "scale-110 border-teal-strong bg-teal-strong/15 shadow-[0_0_24px_rgba(92,196,234,0.5)]"
                  : "border-white/15 bg-white/5 hover:border-white/30"
              }`}
            >
              <Icon
                className={`h-6 w-6 transition-colors ${isActive ? "text-teal-strong" : "text-white/60"}`}
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="font-mono text-[10px] tracking-[0.1em] text-white/50">
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="w-full rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <p className="font-mono text-xs tracking-[0.2em] text-teal-strong">
          NODO {String(active + 1).padStart(2, "0")} — {value.title.toUpperCase()}
        </p>
        <p className="font-apple mt-3 text-xl font-bold leading-snug text-white drop-shadow-md">
          &ldquo;{value.quote}&rdquo;
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-200">
          {value.description}
        </p>
      </div>
    </div>
  );
}
