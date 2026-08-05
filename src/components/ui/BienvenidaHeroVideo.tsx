"use client";

import { useRef, useState } from "react";
import { SoundToggleButton } from "@/components/ui/SoundToggleButton";

export function BienvenidaHeroVideo({
  src = "/videos/bienvenida-hero.mp4",
}: {
  src?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  function toggleMuted() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  return (
    <>
      {/* z-0 (not a negative z-index): the onboarding layout's own
          bg-[#f9f9fb] canvas + HeroAmbientBackground sit at the default
          stacking level too, so a negative z-index here would sink the
          video below that opaque layer and hide it completely. */}
      <video
        ref={videoRef}
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/60" aria-hidden />

      <div className="fixed bottom-6 right-6 z-20">
        <SoundToggleButton muted={isMuted} onToggle={toggleMuted} />
      </div>
    </>
  );
}
