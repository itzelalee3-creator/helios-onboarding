"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

interface FiveSItem {
  label: string;
  text: string;
}

const FIVE_S_ITEMS: FiveSItem[] = [
  {
    label: "Seleccionar (Seiri)",
    text: "Conserva en la mesa de trabajo únicamente las herramientas y materiales necesarios para la tarea actual.",
  },
  {
    label: "Organizar (Seiton)",
    text: '"Un lugar para cada cosa y cada cosa en su lugar". Regresa las herramientas manuales, instrumentos de medición y adaptadores a su panel al terminar.',
  },
  {
    label: "Limpiar (Seiso)",
    text: "Barre las virutas de madera, aspira el área de trabajo y limpia las mesas al finalizar tu turno o jornada de taller.",
  },
  {
    label: "Estandarizar (Seiketsu)",
    text: "Mantén los pasos de limpieza y seguridad como una norma constante en cada sesión del equipo.",
  },
  {
    label: "Disciplina (Shitsuke)",
    text: "Haz del orden un hábito personal. La seguridad y el respeto por el espacio de trabajo son responsabilidad de cada integrante.",
  },
];

// Horizontal band each block occupies in 5s-diagrama.png (Sort / Set in
// order / Shine / Standardize / Sustain, left to right in equal fifths).
const BLOCK_LEFT = ["0%", "20%", "40%", "60%", "80%"];

export function FiveSCard() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const active = hovered ?? locked;

  function enter(i: number) {
    setHovered(i);
  }
  function leave() {
    setHovered(null);
  }
  function toggle(i: number) {
    setLocked((cur) => (cur === i ? null : i));
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-teal-strong/40 sm:p-6">
      <p className="font-apple text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl">
        Cultura de las 5S (Orden y Limpieza)
      </p>

      {/* Header image with per-block hover/click hotspots */}
      <div className="mx-auto mt-5 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white p-3 shadow-[0_0_24px_-8px_var(--color-teal-strong)] sm:p-4">
        <div className="relative aspect-[577/432] w-full">
          <Image
            src="/images/5s-diagrama.png"
            alt="Las 5S representadas como cinco bloques de colores: Sort, Set in order, Shine, Standardize y Sustain"
            fill
            sizes="(min-width: 1024px) 420px, 90vw"
            className="object-contain"
          />
          {FIVE_S_ITEMS.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-label={`Ver detalle de ${item.label}`}
              onMouseEnter={() => enter(i)}
              onMouseLeave={leave}
              onFocus={() => enter(i)}
              onBlur={leave}
              onClick={() => toggle(i)}
              className="absolute rounded-lg transition-colors duration-300"
              style={{
                top: "26%",
                left: BLOCK_LEFT[i],
                width: "20%",
                height: "72%",
                backgroundColor:
                  active === i
                    ? "color-mix(in srgb, var(--color-teal-strong) 20%, transparent)"
                    : "transparent",
                boxShadow:
                  active === i
                    ? "0 0 24px -2px var(--color-teal-strong) inset"
                    : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Interactive, collapsible S tabs */}
      <div className="mt-5 flex flex-col gap-2">
        {FIVE_S_ITEMS.map((item, i) => {
          const isOpen = active === i;
          return (
            <button
              key={item.label}
              type="button"
              onMouseEnter={() => enter(i)}
              onMouseLeave={leave}
              onFocus={() => enter(i)}
              onBlur={leave}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className={cn(
                "rounded-xl border p-3 text-left transition-colors duration-300",
                isOpen
                  ? "border-teal-strong/50 bg-teal-strong/10"
                  : "border-white/10 hover:border-white/20 hover:bg-white/5"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-semibold transition-colors duration-300",
                      isOpen
                        ? "border-teal-strong bg-teal-strong/25 text-teal-strong"
                        : "border-teal-strong/50 bg-teal-strong/15 text-teal-strong"
                    )}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-white drop-shadow-md">
                    {item.label}
                  </p>
                </div>
                <Plus
                  className={cn(
                    "h-4 w-4 shrink-0 text-teal-strong transition-transform duration-300",
                    isOpen && "rotate-45"
                  )}
                  aria-hidden
                />
              </div>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="mt-2 pl-9 text-sm leading-relaxed text-zinc-100 drop-shadow-md">
                    {item.text}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
