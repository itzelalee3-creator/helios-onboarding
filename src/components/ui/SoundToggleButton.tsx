"use client";

import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/cn";

export function SoundToggleButton({
  muted,
  onToggle,
  className,
}: {
  muted: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const label = muted ? "Activar sonido" : "Silenciar";
  const icon = muted ? (
    <VolumeX className="h-4 w-4" aria-hidden />
  ) : (
    <Volume2 className="h-4 w-4" aria-hidden />
  );

  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Mobile: icon-only circle — the full pill with label was grabbing
          too much attention on small screens. */}
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={!muted}
        aria-label={label}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-orange-strong/55 bg-[rgba(255,138,68,0.22)] text-white transition-colors hover:bg-[rgba(255,138,68,0.35)] sm:hidden",
          className
        )}
      >
        {icon}
      </button>

      {/* sm and up: original pill with label. Visibility lives on this
          wrapper, not the button itself — .boton-onboarding sets its own
          `display` and, since it's a plain CSS class rather than a Tailwind
          utility, it wins the cascade over a conflicting `hidden` class
          applied directly to the same element. */}
      <div className="hidden sm:block">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={!muted}
          aria-label={label}
          className={cn("boton-onboarding", className)}
        >
          {icon}
          {label}
        </button>
      </div>

      {muted && (
        <span className="hidden text-xs text-white/60 sm:inline">
          Mejora la experiencia
        </span>
      )}
    </div>
  );
}
