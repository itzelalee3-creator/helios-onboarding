"use client";

import { useState } from "react";
import { WORKSHOP_VALUES } from "./data";

export function Option2Timeline() {
  const [active, setActive] = useState(0);
  const value = WORKSHOP_VALUES[active];

  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr]">
      {/* Left: vertical timeline */}
      <div className="relative flex flex-col">
        {WORKSHOP_VALUES.map((v, i) => {
          const isActive = i === active;
          const accent = i % 2 === 0 ? "var(--color-teal-strong)" : "var(--color-orange-strong)";
          const isLast = i === WORKSHOP_VALUES.length - 1;
          return (
            <button
              key={v.title}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group relative flex items-start gap-4 pb-8 text-left last:pb-0"
            >
              <span className="relative flex flex-col items-center">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-all duration-300"
                  style={{
                    borderColor: isActive ? accent : "rgba(255,255,255,0.25)",
                    backgroundColor: isActive
                      ? `color-mix(in srgb, ${accent} 25%, transparent)`
                      : "transparent",
                    color: isActive ? accent : "rgba(255,255,255,0.6)",
                    boxShadow: isActive ? `0 0 16px color-mix(in srgb, ${accent} 60%, transparent)` : "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {!isLast && (
                  <span
                    className="mt-1 w-px flex-1 transition-colors duration-300"
                    style={{
                      backgroundColor: isActive
                        ? `color-mix(in srgb, ${accent} 60%, transparent)`
                        : "rgba(255,255,255,0.15)",
                      minHeight: "2rem",
                    }}
                  />
                )}
              </span>
              <span
                className="mt-1.5 text-sm font-semibold transition-colors duration-300"
                style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)" }}
              >
                {v.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right: content card */}
      <div
        key={active}
        className="animate-[fadein_0.4s_ease-out] rounded-2xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
      >
        <span className="font-mono text-xs tracking-[0.2em] text-teal-strong">
          {String(active + 1).padStart(2, "0")} / {String(WORKSHOP_VALUES.length).padStart(2, "0")}
        </span>
        <p className="font-apple mt-3 text-xl font-bold leading-snug text-white drop-shadow-md sm:text-2xl">
          &ldquo;{value.quote}&rdquo;
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-200">
          {value.description}
        </p>
      </div>

      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
