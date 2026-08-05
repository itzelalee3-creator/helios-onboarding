"use client";

import { useState } from "react";
import { ChevronRight, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/cn";

interface StagePoint {
  label: string;
  text: string;
}

interface WorkflowStage {
  number: string;
  label: string;
  title: string;
  areas: string;
  intro?: string;
  points?: StagePoint[];
}

const STAGES: WorkflowStage[] = [
  {
    number: "01",
    label: "Arranque de Temporada",
    title: "Definición Estratégica y Alineación",
    areas: "Mesa Directiva (Capitán, Subcapitana, PM, Recursos) y Líderes de Área",
    intro:
      "La temporada inicia en blanco. La Mesa Directiva y los líderes evalúan las competencias disponibles, las presentan al equipo y definen la metodología de trabajo para la temporada.",
  },
  {
    number: "02",
    label: "Planeación & Estrategia",
    title: "Presupuesto, Patrocinio y Estrategia de Puntuación",
    areas: "Logística & Administración ↔ Marketing | Estrategia & Performance",
    points: [
      {
        label: "Frente Operativo",
        text: "Logística y Administración calculan costos de viaje, hospedaje, envíos e inscripción. Con estos números, le entregan a Marketing la meta financiera para activar la búsqueda de patrocinadores y difusión.",
      },
      {
        label: "Frente Técnico",
        text: "Performance analiza minuciosamente el reglamento para fijar las directrices de diseño que garanticen la máxima puntuación posible.",
      },
    ],
  },
  {
    number: "03",
    label: "Diseño & Conceptualización",
    title: "Geometría del Avión y Preparación de Materiales",
    areas: "Aerodinámica ↔ Mecánica de Vuelo | Estructuras & Manufactura",
    intro:
      "Aerodinámica busca perfiles alares y superficies, mientras Mecánica de Vuelo define el empennage, fuselaje y superficies de control según las metas de Performance. Al mismo tiempo, Estructuras y Manufactura investigan materiales, proveedores y procesos en lo que se libera el modelado CAD.",
  },
  {
    number: "04",
    label: "Ingeniería, Integración & Taller",
    title: "Validación Interna, Electrónica y Construcción Física",
    areas: "Estructuras ↔ Aviónica ↔ Manufactura | Integración, PM & Líder de Ingeniería",
    intro:
      "Con el CAD listo, Estructuras diseña el esqueleto interno y define materiales. Se coordina con Aviónica para la ubicación exacta de componentes electrónicos, y con Manufactura para asegurar que las piezas sean realistas y redactar las guías de taller. Todo el flujo es validado por el Líder de Ingeniería y el Encargado de Integración, y supervisado por la PM y la Directiva.",
  },
];

export function WorkflowStageMap() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <div>
      <p className="mb-3 flex items-center gap-1.5 text-xs text-white/60">
        <MousePointerClick className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Selecciona o toca cada número para ver la información de la etapa
      </p>

      {/* Horizontal stage selector */}
      <div className="flex items-stretch gap-2 overflow-x-auto pb-2 sm:overflow-visible sm:pb-0">
        {STAGES.map((s, i) => {
          const isActive = i === active;
          return (
            <div key={s.number} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={cn(
                  "flex min-w-[9rem] flex-1 cursor-pointer flex-col items-center gap-2 rounded-xl border px-4 py-3 text-center backdrop-blur-md transition-all duration-300 sm:min-w-0",
                  isActive
                    ? "border-teal-strong bg-teal-strong/15 shadow-[0_0_20px_-6px_var(--color-teal-strong)]"
                    : "border-white/10 bg-white/5 hover:border-white/25"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-colors duration-300",
                    isActive
                      ? "border-teal-strong text-teal-strong"
                      : "border-white/25 text-white/60"
                  )}
                >
                  {s.number}
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold leading-snug transition-colors duration-300",
                    isActive ? "text-white" : "text-white/55"
                  )}
                >
                  {s.label}
                </span>
              </button>
              {i < STAGES.length - 1 && (
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-white/25"
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic stage detail card */}
      <div
        key={active}
        className="animate-[fadein_0.4s_ease-out] mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-teal-strong">
          ETAPA {stage.number} / {String(STAGES.length).padStart(2, "0")}
        </p>
        <h3 className="font-apple mt-3 text-xl font-bold leading-snug text-white drop-shadow-md sm:text-2xl">
          {stage.title}
        </h3>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-teal-strong/80">
          Áreas involucradas
        </p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-200 drop-shadow-md">
          {stage.areas}
        </p>

        <div className="mt-5 border-t border-white/10 pt-5">
          {stage.points ? (
            <div className="space-y-4">
              {stage.points.map((p) => (
                <div key={p.label}>
                  <p className="text-sm font-semibold text-white drop-shadow-md">
                    {p.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-100 drop-shadow-md">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-zinc-100 drop-shadow-md">
              {stage.intro}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
