"use client";

import { useEffect, useRef, useState } from "react";
import { SoundToggleButton } from "@/components/ui/SoundToggleButton";

export function MissionVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Only play while the section is actually on screen, and pause when
    // scrolled away, so it doesn't keep decoding video off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          video.play().catch(() => {
            /* autoplay can be rejected before user interaction; harmless */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[85vh] w-screen overflow-hidden bg-[var(--color-void)]"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/mision-alemania.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Video del equipo Helios Aerodesign en la competencia en Alemania"
      />

      {/* Oscurecimiento extremadamente tenue — solo un empujón global de
          contraste; la legibilidad real del texto la da su propia
          text-shadow, no una capa oscura fuerte que tape el video. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-black/20"
      />

      {/* Texto flotando directamente sobre el video, alineado a la
          derecha — blanco puro con sombra oscura para contraste directo,
          sin tarjeta ni fondo detrás. */}
      <div className="relative z-20 mx-auto flex h-full max-w-6xl items-center justify-center px-6 pb-28 sm:justify-end sm:px-8 sm:pb-0">
        <div
          className="mx-auto max-w-xl text-center transition-[opacity,transform] duration-[900ms] ease-out sm:ml-auto sm:mr-8 sm:text-right md:mr-16"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <p
            className="section-eyebrow text-orange"
            style={{ textShadow: "0 4px 15px rgba(0,0,0,0.8)" }}
          >
            NUESTRA MISIÓN
          </p>
          <h2
            className="text-balance font-apple mt-4 text-3xl font-semibold text-white sm:text-4xl"
            style={{ textShadow: "0 4px 15px rgba(0,0,0,0.8)" }}
          >
            Diseñamos, construimos y volamos con precisión de ingeniería.
          </h2>
          <p
            className="font-apple mt-5 text-base leading-relaxed text-white/90"
            style={{ textShadow: "0 4px 15px rgba(0,0,0,0.8)" }}
          >
            Helios Aerodesign existe para llevar a cada integrante desde cero
            conocimiento técnico hasta ser capaz de fabricar, ensamblar y
            verificar un aeromodelo listo para volar. Este manual documenta
            exactamente cómo lo hacemos: nuestros materiales, procesos y
            estándares de seguridad.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-30">
        <SoundToggleButton muted={muted} onToggle={toggleMute} />
      </div>
    </section>
  );
}
