"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WORKSHOP_VALUES } from "./data";

export function Option1Carousel() {
  const [index, setIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const total = WORKSHOP_VALUES.length;
  const value = WORKSHOP_VALUES[index];

  function go(delta: number) {
    setIndex((current) => (current + delta + total) % total);
  }

  function handlePointerDown(event: React.PointerEvent) {
    dragStartX.current = event.clientX;
  }

  function handlePointerUp(event: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return;
    go(delta < 0 ? 1 : -1);
  }

  return (
    <div className="mx-auto w-full max-w-2xl select-none">
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative cursor-grab overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl active:cursor-grabbing sm:p-10"
      >
        <span className="font-mono text-xs tracking-[0.2em] text-teal-strong">
          VALOR {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <p className="font-apple mt-4 text-2xl font-bold leading-snug text-white drop-shadow-md sm:text-3xl">
          &ldquo;{value.quote}&rdquo;
        </p>

        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.1em] text-orange-strong">
          {value.title}
        </p>

        <p className="mt-4 text-base leading-relaxed text-zinc-200">
          {value.description}
        </p>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Valor anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex items-center gap-2">
            {WORKSHOP_VALUES.map((v, i) => (
              <button
                key={v.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir al valor ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-teal-strong" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Valor siguiente"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
