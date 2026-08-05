"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/lib/progress";
import type { ModuleDef, Phase } from "@/lib/content/modules";
import { cn } from "@/lib/cn";

export function ModuleFooterNav({
  moduleId,
  phase,
  prev,
  next,
  fallbackNext,
}: {
  moduleId: string;
  phase: Phase;
  prev?: ModuleDef;
  next?: ModuleDef;
  fallbackNext?: { href: string; label: string };
}) {
  const { isComplete, toggleComplete, hydrated } = useProgress();
  const complete = hydrated && isComplete(moduleId);

  return (
    <div className="mx-auto max-w-4xl px-6 pb-20 pt-4 sm:px-8">
      <button
        type="button"
        onClick={() => toggleComplete(moduleId)}
        className={cn(
          "focus-ring mb-10 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold backdrop-blur-md transition-colors",
          complete
            ? "border-teal-strong bg-teal-strong/15 text-teal-strong"
            : "border-white/10 bg-white/5 text-zinc-100 shadow-lg hover:border-teal-strong/40 hover:text-white"
        )}
      >
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        {complete ? "Módulo completado" : "Marcar como completado"}
      </button>

      <div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/${phase}/${prev.slug}`}
            className="focus-ring group flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md transition-colors hover:border-teal-strong/40"
          >
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs text-white/50">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Anterior
            </span>
            <span className="font-apple text-base text-white drop-shadow-md">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/${phase}/${next.slug}`}
            className="focus-ring group flex flex-col items-end rounded-xl border border-white/10 bg-white/5 p-5 text-right shadow-lg backdrop-blur-md transition-colors hover:border-teal-strong/40"
          >
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs text-white/50">
              Siguiente
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="font-apple text-base text-white drop-shadow-md">
              {next.title}
            </span>
          </Link>
        ) : fallbackNext ? (
          <Link
            href={fallbackNext.href}
            className="focus-ring group flex flex-col items-end rounded-xl border border-orange-strong/40 bg-orange-strong/10 p-5 text-right shadow-lg backdrop-blur-md transition-colors hover:border-orange-strong/70"
          >
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs text-orange-strong">
              Siguiente fase
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="font-apple text-base text-white drop-shadow-md">
              {fallbackNext.label}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
