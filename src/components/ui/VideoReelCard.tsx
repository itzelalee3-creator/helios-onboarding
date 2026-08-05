import { cn } from "@/lib/cn";

interface VideoReelCardProps {
  src: string;
  className?: string;
}

export function VideoReelCard({ src, className }: VideoReelCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-teal-strong/40 sm:p-5",
        className
      )}
    >
      <div className="relative aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_24px_-8px_var(--color-teal-strong)]">
        <video
          src={src}
          controls
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
