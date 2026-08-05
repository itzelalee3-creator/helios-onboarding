export function HeroAmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-paper">
      {/* Kinetic fluid / aurora swirl: two counter-rotating conic gradients */}
      <div className="hero-aurora-1 pointer-events-none absolute inset-[-35%]" />
      <div className="hero-aurora-2 pointer-events-none absolute inset-[-45%]" />

      {/* Slow directional wash, adds a second axis of motion */}
      <div
        className="hero-gradient-animated pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255,149,0,0.16) 0%, transparent 38%, transparent 62%, rgba(47,173,224,0.18) 100%)",
        }}
      />

      {/* Accent blobs at the edges for a touch of warmth/coolness */}
      <div className="mesh-blob animate-drift-a -right-1/4 -top-1/3 h-[50vw] w-[50vw] bg-orange-strong/30" />
      <div className="mesh-blob animate-drift-b -bottom-1/4 -left-1/4 h-[46vw] w-[46vw] bg-teal/28" />

      {/* Keep the center clear so type and the aircraft stay crisp */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,var(--color-paper)_0%,var(--color-paper)_16%,transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/0 via-paper/0 to-paper" />
    </div>
  );
}
