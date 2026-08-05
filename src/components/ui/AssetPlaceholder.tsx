import { Camera, Ruler, Video, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type AssetType = "photo" | "diagram" | "video";

const typeMeta: Record<AssetType, { icon: LucideIcon; tag: string }> = {
  photo: { icon: Camera, tag: "FOTO PENDIENTE" },
  diagram: { icon: Ruler, tag: "DIAGRAMA PENDIENTE" },
  video: { icon: Video, tag: "VIDEO PENDIENTE" },
};

interface AssetPlaceholderProps {
  type?: AssetType;
  label: string;
  ratio?: "video" | "square" | "portrait" | "wide";
  className?: string;
  light?: boolean;
}

const ratioClass: Record<NonNullable<AssetPlaceholderProps["ratio"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function AssetPlaceholder({
  type = "photo",
  label,
  ratio = "video",
  className,
  light = false,
}: AssetPlaceholderProps) {
  const { icon: Icon, tag } = typeMeta[type];

  if (light) {
    return (
      <div
        role="img"
        aria-label={`Marcador de posición: ${label}`}
        className={cn(
          "card-glass-light backdrop-blur-[10px] relative flex flex-col items-center justify-center gap-3 px-6 text-center",
          ratioClass[ratio],
          className
        )}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.06] bg-white/70">
          <Icon className="h-5 w-5 text-slate" strokeWidth={1.5} aria-hidden />
        </div>
        <span className="font-apple text-[11px] font-semibold tracking-[0.15em] text-slate">
          {tag}
        </span>
        <p className="font-apple max-w-xs text-sm text-charcoal-muted">{label}</p>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Marcador de posición: ${label}`}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 text-center shadow-[0_0_24px_-8px_var(--color-teal-strong)] backdrop-blur-md",
        ratioClass[ratio],
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10">
        <Icon className="h-5 w-5 text-white/50" strokeWidth={1.5} aria-hidden />
      </div>
      <span className="font-mono text-[11px] tracking-[0.2em] text-white/40">
        {tag}
      </span>
      <p className="max-w-xs text-sm text-zinc-300 drop-shadow-md">{label}</p>
    </div>
  );
}
