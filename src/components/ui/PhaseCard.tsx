"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, BookOpen, Wrench } from "lucide-react";
import { phaseMeta, getModulesByPhase, type Phase } from "@/lib/content/modules";
import { useProgress } from "@/lib/progress";

const BADGE_LABEL: Record<Phase, string> = {
  onboarding: "MÓDULOS DE INICIO",
  manual: "MANUFACTURA TÉCNICA",
};

const BADGE_ICON: Record<Phase, typeof BookOpen> = {
  onboarding: BookOpen,
  manual: Wrench,
};

const CARD_IMAGE: Record<Phase, string> = {
  onboarding: "/images/phase-onboarding.jpg",
  manual: "/images/phase-manual.jpg",
};

const CARD_NUMBER: Record<Phase, string> = {
  onboarding: "1",
  manual: "2",
};

export function PhaseCard({ phase }: { phase: Phase }) {
  const meta = phaseMeta[phase];
  const moduleList = getModulesByPhase(phase);
  const { completed, hydrated } = useProgress();
  const doneCount = hydrated
    ? moduleList.filter((m) => completed.has(m.id)).length
    : 0;
  const isBlue = meta.accent === "blue";
  const accent = isBlue ? "var(--color-teal)" : "var(--color-orange)";
  const percent = hydrated ? Math.round((doneCount / moduleList.length) * 100) : 0;
  const BadgeIcon = BADGE_ICON[phase];

  return (
    <Link
      href={meta.path}
      className="group relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-2xl border border-white/20 p-8 shadow-sm transition-all duration-300 hover:scale-[1.01] sm:p-10"
      style={{ "--phase-accent": accent } as CSSProperties}
    >
      {/* Fotografía de fondo, distinta por fase. */}
      <Image
        src={CARD_IMAGE[phase]}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
        aria-hidden
      />

      {/* Degradado oscuro para máxima legibilidad del texto sobre la foto. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        aria-hidden
      />

      {/* Indicador de acento en el borde superior. */}
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: accent }}
        aria-hidden
      />

      {/* Número gigante decorativo, pegado al lado derecho. */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 scale-y-125 select-none text-[250px] font-black leading-none tracking-tighter text-white/45 transition-all duration-300 group-hover:text-[var(--phase-accent)] group-hover:drop-shadow-[0_0_15px_var(--phase-accent)]"
        aria-hidden
      >
        {CARD_NUMBER[phase]}
      </div>

      <div className="relative z-20">
        <div className="flex items-center justify-start gap-3">
          <span
            className="font-apple inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] backdrop-blur-sm"
            style={{
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
              backgroundColor: "color-mix(in srgb, black 55%, transparent)",
            }}
          >
            <BadgeIcon className="h-3 w-3" aria-hidden />
            {BADGE_LABEL[phase]}
          </span>
        </div>
      </div>

      <div className="relative z-20 flex flex-col gap-6">
        <div>
          <h3 className="font-apple text-3xl font-semibold text-white drop-shadow-md sm:text-4xl">
            {meta.title}
          </h3>
          <p className="font-apple mt-4 max-w-md text-sm leading-relaxed text-slate-200 drop-shadow-md sm:text-base">
            {meta.description}
          </p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <p className="font-apple text-xs uppercase tracking-[0.18em] text-slate-200 drop-shadow-md">
                Progreso
              </p>
              <p
                className="font-mono text-xs tabular-nums text-slate-200 drop-shadow-md"
                aria-hidden
              >
                {hydrated ? `${doneCount}/${moduleList.length} · ${percent}%` : ""}
              </p>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{
                  backgroundColor: accent,
                  width: hydrated ? `${percent}%` : "0%",
                }}
              />
            </div>
          </div>

          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:bg-[var(--phase-accent)] group-hover:text-white">
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
