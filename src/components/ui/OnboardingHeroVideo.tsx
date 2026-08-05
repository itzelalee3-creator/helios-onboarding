"use client";

import { useRef, useState } from "react";
import { SoundToggleButton } from "@/components/ui/SoundToggleButton";

const SEGMENT_START = 21;

export function OnboardingHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  function restartFromSegment() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = SEGMENT_START;
    video.play().catch(() => {
      /* autoplay can be rejected before user interaction; harmless */
    });
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    // The native `loop` attribute restarts at 0, not at SEGMENT_START, so
    // this proactively re-seeks just before the natural loop point to keep
    // playback confined to the 21s-to-end segment.
    if (video.currentTime >= video.duration - 0.15) {
      restartFromSegment();
    }
  }

  function toggleMuted() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        src="/videos/onboarding-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        onLoadedMetadata={restartFromSegment}
        onEnded={restartFromSegment}
        onTimeUpdate={handleTimeUpdate}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-black/20 backdrop-blur-[2px]"
        aria-hidden
      />

      <div className="absolute bottom-6 right-6 z-20">
        <SoundToggleButton muted={isMuted} onToggle={toggleMuted} />
      </div>
    </>
  );
}
