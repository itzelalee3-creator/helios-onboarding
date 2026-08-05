export function ModuleAmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05070a]"
    >
      <div className="mesh-blob animate-drift-a -right-1/4 -top-1/3 h-[50vw] w-[50vw] bg-orange-strong/20" />
      <div className="mesh-blob animate-drift-b -bottom-1/4 -left-1/4 h-[46vw] w-[46vw] bg-teal-strong/15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
    </div>
  );
}
