"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface WorkshopValue {
  title: string;
  quote: string;
  description: string;
}

const WORKSHOP_VALUES: WorkshopValue[] = [
  {
    title: "Integridad Técnica (Honestidad)",
    quote: "Prefiero una pieza repetida que una falla en el aire.",
    description:
      "Si cometes un error en el proceso, infórmalo de inmediato. Ocultar una falla o imperfección pone en riesgo la integridad de la aeronave. En este taller, reconocer un error es un acto de profesionalismo, no de debilidad.",
  },
  {
    title: "Disciplina de Proceso",
    quote: "Respeto al proceso y la documentación.",
    description:
      "La humildad para seguir un manual es lo que nos hace expertos. Valoramos la capacidad de seguir los procedimientos estandarizados sin saltarse pasos, entendiendo que la consistencia y la disciplina son la base de la experiencia.",
  },
  {
    title: "Cultura de Orden",
    quote: "Un taller limpio es un taller seguro.",
    description:
      "Cuidar nuestras herramientas y materiales es cuidar los recursos de todo el equipo. Dejar el área mejor de como la encontramos es una muestra de respeto hacia los compañeros del siguiente turno.",
  },
  {
    title: "Compromiso y Puntualidad",
    quote: "El tiempo del equipo es tan valioso como el material.",
    description:
      "La manufactura de nuestras aeronaves depende de cronogramas estrictos. Llegar a tiempo a tu turno no solo es respeto hacia tus compañeros, sino la garantía de que los procesos de curado y ensamble se cumplan en los plazos previstos para la competencia.",
  },
  {
    title: "Proactividad con Propósito",
    quote: "Si ves algo fuera de lugar, es tu responsabilidad.",
    description:
      "No esperes a que un líder te dé una instrucción si ves un riesgo de seguridad o una herramienta fuera de su sitio. Un miembro del equipo actúa antes de que el problema ocurra. Valoramos la participación activa de todos.",
  },
  {
    title: "Aprendizaje Compartido",
    quote: "Nadie se queda atrás.",
    description:
      "Fomentamos un ambiente donde los líderes enseñan y los nuevos miembros preguntan sin miedo. El conocimiento no es para guardárselo, sino para fortalecer la capacidad técnica de todo el equipo Helios.",
  },
];

export function WorkshopValuesTimeline() {
  const [active, setActive] = useState(0);
  const value = WORKSHOP_VALUES[active];

  return (
    <div>
      <p className="mb-4 text-xs italic tracking-wide text-white/40 md:mb-6">
        <span className="md:hidden">
          Pasa el cursor o toca cada número para explorar los valores
        </span>
        <span className="hidden md:inline">
          Pasa el cursor sobre cada número para explorar los valores
        </span>
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.5fr] md:gap-10">
        {/* Left: vertical timeline of nodes */}
        <ol className="relative flex flex-row gap-3 overflow-x-auto pb-2 md:flex-col md:gap-0 md:overflow-visible md:pb-0">
        {WORKSHOP_VALUES.map((v, i) => {
          const isActive = i === active;
          const isLast = i === WORKSHOP_VALUES.length - 1;
          const accent = i % 2 === 0 ? "var(--color-teal-strong)" : "var(--color-orange-strong)";

          return (
            <li key={v.title} className="shrink-0 md:shrink md:pb-8 md:last:pb-0">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-current={isActive}
                className="focus-ring group flex cursor-pointer flex-col items-center gap-2 text-center md:w-full md:flex-row md:items-start md:gap-4 md:text-left"
                style={{ "--node-accent": accent } as CSSProperties}
              >
                <span className="relative flex shrink-0 flex-row items-center md:flex-col">
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-all duration-300",
                      isActive
                        ? "border-[var(--node-accent)] text-[var(--node-accent)] shadow-[0_0_16px_var(--node-accent)]"
                        : "border-white/25 text-white/60 group-hover:border-white/50"
                    )}
                    style={{
                      backgroundColor: isActive
                        ? "color-mix(in srgb, var(--node-accent) 25%, transparent)"
                        : "transparent",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {!isLast && (
                    <span
                      className={cn(
                        "hidden transition-colors duration-300 md:mt-1 md:block md:h-8 md:w-px",
                        isActive ? "bg-[var(--node-accent)]/60" : "bg-white/15"
                      )}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "font-apple max-w-[6.5rem] text-xs font-semibold leading-snug transition-colors duration-300 md:mt-2 md:max-w-none md:text-sm",
                    isActive ? "text-white" : "text-white/55"
                  )}
                >
                  {v.title}
                </span>
              </button>
            </li>
          );
        })}
        </ol>

        {/* Right: active value detail card */}
        <div
          key={active}
          className="animate-[fadein_0.4s_ease-out] rounded-2xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl backdrop-blur-md sm:p-8"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-teal-strong">
            VALOR {String(active + 1).padStart(2, "0")} / {String(WORKSHOP_VALUES.length).padStart(2, "0")}
          </p>
          <p className="font-apple mt-3 text-xl font-bold leading-snug text-white drop-shadow-md sm:text-2xl">
            &ldquo;{value.quote}&rdquo;
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-100 drop-shadow-md">
            {value.description}
          </p>
        </div>
      </div>
    </div>
  );
}
