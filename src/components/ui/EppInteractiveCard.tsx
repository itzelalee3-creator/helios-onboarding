"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface EppItem {
  label: string;
  text: string;
  hotspot: { top: string; left: string; width: string; height: string };
}

const EPP_ITEMS: EppItem[] = [
  {
    label: "Protección Ocular",
    text: "Uso obligatorio de lentes de seguridad transparentes al realizar cortes, lijado, perforación o manipulación de químicos.",
    hotspot: { top: "18%", left: "25%", width: "50%", height: "19%" },
  },
  {
    label: "Protección Respiratoria",
    text: "Mascarilla para polvos (N95/KN95) obligatoria durante el lijado de madera balsa, fibra o resina. Respirador con filtros para vapores orgánicos obligatorio al usar resinas epóxicas, cianoacrilatos o solventes.",
    hotspot: { top: "33%", left: "30%", width: "44%", height: "22%" },
  },
  {
    label: "Vestimenta Adecuada",
    text: "Calzado cerrado obligatorio (prohibido ingresar en sandalias o calzado abierto). Cabello largo completamente recogido y uso de ropa pegada al cuerpo.",
    hotspot: { top: "53%", left: "8%", width: "84%", height: "42%" },
  },
  {
    label: "Cero Accesorios",
    text: "Prohibido usar anillos, pulseras, cadenas, relojes o prendas con cordones sueltos al operar cualquier máquina rotativa.",
    hotspot: { top: "60%", left: "0%", width: "100%", height: "18%" },
  },
];

export function EppInteractiveCard() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const active = hovered ?? locked;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-teal-strong/40 sm:p-6">
      <p className="font-apple text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl">
        Protección Personal y Normativa EPP
      </p>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* Left: EPP list */}
        <ul className="flex flex-col gap-2">
          {EPP_ITEMS.map((item, i) => {
            const isActive = active === i;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setLocked((cur) => (cur === i ? null : i))}
                  aria-pressed={locked === i}
                  className={cn(
                    "focus-ring flex w-full gap-3 rounded-xl border p-3 text-left transition-colors duration-300",
                    isActive
                      ? "border-teal-strong/50 bg-teal-strong/10"
                      : "border-transparent hover:border-white/15 hover:bg-white/5"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-semibold transition-colors duration-300",
                      isActive
                        ? "border-teal-strong bg-teal-strong/25 text-teal-strong"
                        : "border-teal-strong/50 bg-teal-strong/15 text-teal-strong"
                    )}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white drop-shadow-md">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-zinc-100 drop-shadow-md">
                      {item.text}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right: Juan illustration with hover/click hotspots */}
        <div className="mx-auto w-full max-w-[220px] lg:max-w-none">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/10 p-4 transition-all duration-300 hover:scale-[1.03] hover:border-teal-strong/50 hover:shadow-[0_0_30px_-6px_var(--color-teal-strong)]">
            <div className="relative aspect-[340/735] w-full">
              <Image
                src="/images/juan-proteccion.png"
                alt="Juan, la mascota de Helios Aerodesign, usando el equipo de protección personal completo: lentes de seguridad, mascarilla KN95, guantes, bata de laboratorio y botas cerradas"
                fill
                sizes="(min-width: 1024px) 280px, 220px"
                className="object-contain"
              />
              {EPP_ITEMS.map((item, i) => (
                <span
                  key={item.label}
                  aria-hidden
                  className="pointer-events-none absolute rounded-full blur-xl transition-opacity duration-300"
                  style={{
                    top: item.hotspot.top,
                    left: item.hotspot.left,
                    width: item.hotspot.width,
                    height: item.hotspot.height,
                    background:
                      "radial-gradient(circle, var(--color-teal-strong) 0%, transparent 70%)",
                    opacity: active === i ? 0.85 : 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
