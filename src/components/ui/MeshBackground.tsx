import { cn } from "@/lib/cn";

export function MeshBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("bg-mesh pointer-events-none inset-0 overflow-hidden", className)}
    >
      <div
        className="mesh-blob animate-drift-a -left-1/4 -top-1/3 h-[60vw] w-[60vw] bg-blue/25"
      />
      <div
        className="mesh-blob animate-drift-b -right-1/4 top-1/4 h-[50vw] w-[50vw] bg-orange/15"
      />
      <div
        className="mesh-blob animate-drift-c bottom-[-20%] left-1/3 h-[45vw] w-[45vw] bg-blue-strong/10"
      />
    </div>
  );
}
