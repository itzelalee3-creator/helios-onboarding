"use client";

import { useState } from "react";
import { WORKSHOP_VALUES } from "./data";

export function Option4TabSwapper() {
  const [active, setActive] = useState(0);
  const value = WORKSHOP_VALUES[active];

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Tab selector */}
      <div className="flex flex-wrap gap-1.5 rounded-full border border-white/15 bg-white/5 p-1.5">
        {WORKSHOP_VALUES.map((v, i) => {
          const isActive = i === active;
          return (
            <button
              key={v.title}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`flex-1 rounded-full px-3 py-2 font-mono text-xs font-semibold tracking-[0.1em] transition-all duration-200 ${
                isActive
                  ? "bg-teal-strong text-slate-950 shadow-[0_0_16px_rgba(92,196,234,0.6)]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          );
        })}
      </div>

      {/* Avionics-style display panel */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-teal-strong/30 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        {/* HUD corner brackets */}
        <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-teal-strong/60" />
        <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-teal-strong/60" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-teal-strong/60" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-teal-strong/60" />

        <div key={active} className="animate-[slidein_0.35s_ease-out]">
          <p className="font-mono text-[11px] tracking-[0.25em] text-teal-strong">
            FICHA TÉCNICA · VALOR {String(active + 1).padStart(2, "0")}/{String(WORKSHOP_VALUES.length).padStart(2, "0")}
          </p>
          <p className="font-apple mt-3 text-lg font-bold uppercase tracking-tight text-white">
            {value.title}
          </p>
          <p className="font-apple mt-4 text-2xl font-bold leading-snug text-white drop-shadow-md">
            &ldquo;{value.quote}&rdquo;
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            {value.description}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slidein {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
