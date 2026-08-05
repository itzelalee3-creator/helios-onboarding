"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Circle } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { useProgress } from "@/lib/progress";
import type { ModuleDef } from "@/lib/content/modules";
import { cn } from "@/lib/cn";

export function ModuleNavCard({
  module,
  index,
}: {
  module: ModuleDef;
  index: number;
}) {
  const { isComplete, hydrated } = useProgress();
  const complete = hydrated && isComplete(module.id);

  return (
    <Link
      href={`/${module.phase}/${module.slug}`}
      className="focus-ring group relative flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-raised"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-ink-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
        {complete ? (
          <CheckCircle2 className="h-5 w-5 text-blue-strong" aria-label="Completado" />
        ) : (
          <Circle className="h-5 w-5 text-ink-faint/40" aria-hidden />
        )}
      </div>

      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-lg border",
          module.phase === "onboarding"
            ? "border-blue-dim bg-blue-dim/40 text-blue-strong"
            : "border-orange-dim bg-orange-dim/40 text-orange-strong"
        )}
      >
        <Icon name={module.icon} className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </div>

      <div className="flex-1">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-ink-faint">
          {module.kicker}
        </p>
        <h3 className="font-display text-lg font-medium text-ink">{module.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {module.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-ink-faint">
        <span>{module.estMinutes} min de lectura</span>
        <ArrowUpRight
          className="h-4 w-4 text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-strong"
          aria-hidden
        />
      </div>
    </Link>
  );
}
