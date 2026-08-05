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
  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={!muted}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
        className={cn("boton-onboarding", className)}
      >
        {muted ? (
          <VolumeX className="h-4 w-4" aria-hidden />
        ) : (
          <Volume2 className="h-4 w-4" aria-hidden />
        )}
        {muted ? "Activar sonido" : "Silenciar"}
      </button>
      {muted && (
        <span className="text-xs text-white/60">Mejora la experiencia</span>
      )}
    </div>
  );
}
