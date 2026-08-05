"use client";

import { useState } from "react";
import { GraduationCap, MessageSquarePlus, Plus, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

const ITEMS = [
  {
    icon: Sparkles,
    question: "¿Por qué eres importante para el proyecto?",
    answer:
      "En Helios no hay roles secundarios ni de “relleno”. Cada pieza de la aeronave, cada cálculo de peso, cada lijado de balsa y cada línea de código cuenta para el resultado en competencia. Tu compromiso y tus ideas frescas son el motor que mantiene vivo al equipo.",
  },
  {
    icon: GraduationCap,
    question: "¿Si no sé nada, qué puedo aportar?",
    answer:
      "Nadie nace sabiendo construir aviones. Lo único indispensable es la curiosidad, la actitud y las ganas de aprender. Aportas disciplina, una perspectiva nueva, apoyo operativo y energía — el equipo te capacita desde cero en la parte técnica.",
  },
  {
    icon: MessageSquarePlus,
    question: "¿Cómo aportar y proponer ideas correctamente?",
    answer:
      "Toda idea es bienvenida cuando viene acompañada de curiosidad o ganas de resolver un problema. Escucha antes de asumir: conoce el trasfondo técnico actual del equipo. Basa tus propuestas en datos, pruebas o referencias — no solo en suposiciones — y compártelas en las juntas de área o con tu líder directo, sin dudarlo.",
  },
  {
    icon: ShieldCheck,
    question: "¿Cómo no tener miedo a dar tu opinión?",
    answer:
      "El error es parte del proceso de aprendizaje en ingeniería. No existen preguntas “tontas” ni opiniones sin valor. Expresar tus dudas a tiempo es justo lo que evita fallas graves en el taller y en el aire — en Helios, hablar es siempre más seguro que quedarte callado.",
  },
];

export function NewMemberFaqCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [explored, setExplored] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
    setExplored((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }

  return (
    <div id="preguntas-integrante">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-zinc-300">
        Preguntas exploradas: {explored.size}/{ITEMS.length}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const Icon = item.icon;
          return (
            <button
              key={item.question}
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className={cn(
                "rounded-2xl border bg-slate-900/75 p-6 text-left shadow-2xl backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl",
                isOpen
                  ? "border-white/10 ring-2 ring-sky-400/50"
                  : "border-white/10"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-400/15 text-sky-300">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="font-apple text-lg font-semibold leading-snug text-sky-300">
                    {item.question}
                  </h3>
                </div>
                <span
                  className={cn(
                    "flex shrink-0 items-center gap-1 rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-sky-300 transition-transform duration-300",
                    isOpen && "rotate-45"
                  )}
                >
                  <Plus className="h-3 w-3" aria-hidden />
                  {!isOpen && "Descubrir"}
                </span>
              </div>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    {item.answer}
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
