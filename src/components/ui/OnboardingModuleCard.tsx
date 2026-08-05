"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, CheckCircle2, Circle } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { useProgress } from "@/lib/progress";
import type { ModuleDef } from "@/lib/content/modules";

const MODULE_IMAGE: Record<string, string> = {
  bienvenida: "/images/onboarding-module-01.jpg",
  equipo: "/images/onboarding-module-02.jpg",
  seguridad: "/images/onboarding-module-03.jpg",
  "herramientas-materiales": "/images/onboarding-module-04.jpg",
  quiz: "/images/onboarding-module-05.webp",
};

export function OnboardingModuleCard({
  module,
  index,
}: {
  module: ModuleDef;
  index: number;
}) {
  const { isComplete, hydrated } = useProgress();
  const complete = hydrated && isComplete(module.id);
  const accent = module.phase === "onboarding" ? "var(--color-teal)" : "var(--color-orange)";
  const accentStrong =
    module.phase === "onboarding" ? "var(--color-teal-strong)" : "var(--color-orange-strong)";

  return (
    <Link
      href={`/${module.phase}/${module.slug}`}
      className="focus-ring group relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-6 transition-all duration-300 ease-in-out border-[var(--card-border)] shadow-[var(--card-shadow)] hover:scale-[1.03] hover:border-[var(--card-hover-border)] hover:shadow-[var(--card-hover-shadow)]"
      style={
        {
          "--card-accent": accent,
          "--card-border": `color-mix(in srgb, ${accentStrong} 30%, transparent)`,
          "--card-shadow": `inset 0 1px 20px color-mix(in srgb, ${accent} 15%, transparent), 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`,
          "--card-gradient-top": `color-mix(in srgb, ${accent} 20%, transparent)`,
          "--card-hover-border": accentStrong,
          "--card-hover-shadow": `inset 0 1px 24px color-mix(in srgb, ${accent} 25%, transparent), 0 20px 45px -10px color-mix(in srgb, ${accent} 30%, transparent)`,
        } as CSSProperties
      }
    >
      <Image
        src={MODULE_IMAGE[module.slug]}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-[var(--card-gradient-top)]"
        aria-hidden
      />

      <span className="absolute top-4 right-4 z-10 font-apple text-3xl font-extrabold tracking-tighter text-white/40 transition-colors duration-300 group-hover:text-sky-400 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex items-start">
        {complete ? (
          <CheckCircle2 className="h-5 w-5 text-white" aria-label="Completado" />
        ) : (
          <Circle className="h-5 w-5 text-white/40" aria-hidden />
        )}
      </div>

      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white">
        <Icon name={module.icon} className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </div>

      <div className="relative z-10 flex-1">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-white">
          {module.kicker}
        </p>
        <h3 className="font-apple text-lg font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {module.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {module.description}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between text-xs text-white/80">
        <span>{module.estMinutes} min de lectura</span>
        <ArrowUpRight
          className="h-4 w-4 text-white/80 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
          aria-hidden
        />
      </div>
    </Link>
  );
}
