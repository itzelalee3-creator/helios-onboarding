"use client";

import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/cn";

export function ProgressPill({ light = false }: { light?: boolean }) {
  const { percent, hydrated } = useProgress();

  return (
    <div
      className={cn(
        "hidden items-center gap-2 rounded-full border px-3 py-1.5 sm:flex",
        light ? "border-charcoal/15 bg-charcoal/5" : "border-border-strong bg-surface-raised"
      )}
      aria-label={`Progreso general: ${percent}%`}
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4 -rotate-90">
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke={light ? "var(--color-charcoal)" : "var(--color-surface-hairline)"}
          strokeOpacity={light ? 0.15 : 1}
          strokeWidth="2.5"
        />
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke="var(--color-orange)"
          strokeWidth="2.5"
          strokeDasharray={2 * Math.PI * 8}
          strokeDashoffset={
            hydrated ? 2 * Math.PI * 8 * (1 - percent / 100) : 2 * Math.PI * 8
          }
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className={cn("font-mono text-xs", light ? "text-charcoal-muted" : "text-ink-muted")}>
        {hydrated ? `${percent}%` : "—"}
      </span>
    </div>
  );
}
