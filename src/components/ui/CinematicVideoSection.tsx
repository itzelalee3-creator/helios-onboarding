"use client";

import { useEffect, useRef, useState } from "react";
import { SoundToggleButton } from "@/components/ui/SoundToggleButton";

export function CinematicVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Only play while the section is actually on screen, and pause when
    // scrolled away, so it doesn't keep decoding video off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay can be rejected before user interaction; harmless */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/videos/render-avion.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Video de renderizado del aeromodelo Helios Aerodesign"
      />

      {/* Feathered fade from the Hero's light background into the video —
          no hard seam at the top edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[18vh]"
        style={{
          background: "linear-gradient(to bottom, var(--color-paper) 0%, rgba(251,252,253,0) 100%)",
        }}
      />
      <div className="absolute bottom-10 right-10 z-20">
        <SoundToggleButton muted={muted} onToggle={toggleMute} />
      </div>
    </section>
  );
}
