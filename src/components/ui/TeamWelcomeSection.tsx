"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SocialCards, { type CardItem } from "@/components/ui/card-fan-carousel";

const LEFT_GALLERY_CARDS: CardItem[] = [
  { imgUrl: "/images/gallery-uno.jpg", alt: "Equipo Helios Aerodesign fabricando el fuselaje" },
  { imgUrl: "/images/gallery-dos.jpg", alt: "Equipo Helios Aerodesign en el taller" },
  { imgUrl: "/images/gallery-tres.jpg", alt: "Equipo Helios Aerodesign preparando el aeromodelo" },
  { imgUrl: "/images/gallery-cuatro.jpg", alt: "Equipo Helios Aerodesign trabajando en el aeromodelo" },
  { imgUrl: "/images/gallery-cinco.jpg", alt: "Equipo Helios Aerodesign en la competencia" },
  { imgUrl: "/images/gallery-seis.jpg", alt: "Equipo Helios Aerodesign en el campo" },
];

const RIGHT_GALLERY_CARDS: CardItem[] = [
  { imgUrl: "/images/gallery-unob.jpg", alt: "Equipo Helios Aerodesign en competencia" },
  { imgUrl: "/images/gallery-dosb.jpg", alt: "Equipo Helios Aerodesign en competencia" },
  { imgUrl: "/images/gallery-tresb.jpg", alt: "Equipo Helios Aerodesign en competencia" },
  { imgUrl: "/images/gallery-cuatrob.jpg", alt: "Equipo Helios Aerodesign en competencia" },
  { imgUrl: "/images/gallery-cincob.jpg", alt: "Equipo Helios Aerodesign en competencia" },
  { imgUrl: "/images/gallery-seisb.jpg", alt: "Equipo Helios Aerodesign en competencia" },
];

// SocialCards (card-fan-carousel.tsx) is copied verbatim from 21st.dev and
// is built for a full-width hero-style carousel (.fan-card is 22-38rem
// tall depending on breakpoint). To reuse it as a small side-gallery
// accent here, it's rendered at its native size and then visually shrunk
// with a CSS transform: scale() on a wrapper — the component itself is
// untouched, only its on-screen size changes. The outer slot div reserves
// a small, fixed footprint for flex layout purposes; the scaled content is
// absolutely centered inside it and allowed to overflow that box when the
// fan opens, since clipping it would cut the animation off.
function ScaledFanGallery({ cards, label }: { cards: CardItem[]; label: string }) {
  return (
    <div className="pointer-events-auto relative h-24 w-16 sm:h-36 sm:w-24">
      <div className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.18] sm:scale-[0.26]">
        <SocialCards cards={cards} />
      </div>
      {/* Anchored to the slot box (not the overflowing scaled fan content)
          so it stays exactly centered under the gallery and clear of the
          photos regardless of how far the fan's native markup overflows
          this box. Same type treatment as "AERONAVE: PITIC H5 NFC 2025"
          on the home hero (font-mono, text-orange/90, wide tracking). */}
      <span
        className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-orange/90 sm:mt-4"
        style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.6))" }}
      >
        {label}
      </span>
    </div>
  );
}

export function TeamWelcomeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-[50px] h-screen w-screen overflow-hidden bg-[var(--color-paper-soft)]"
    >
      {/* Imagen única, ya compuesta por el usuario (foto + "ESTO ES HELIOS"
          + "EN ALEMANIA NFC 2025"), a pantalla completa. La sección se
          superpone al final del video (margin-top negativo, misma altura
          que el mask-image de abajo), así que el video real sigue visible
          justo debajo de esta imagen en esa franja — el mask-image hace
          que la propia foto se desvanezca de transparente (arriba, deja
          ver el video) a opaca (abajo), fundiendo dos contenidos reales
          en vez de solo desenfocar cada uno por separado, que es lo que
          un backdrop-blur nunca puede lograr entre dos secciones que no
          se superponen. */}
      <div
        className="absolute inset-0 transition-[opacity,transform] duration-[1600ms] ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scale(1)" : "scale(1.05)",
          maskImage: "linear-gradient(to bottom, transparent 0, black 50px)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, black 50px)",
        }}
      >
        <Image
          src="/images/team-welcome-final.jpg"
          alt="Esto es Helios en Alemania NFC 2025 — equipo completo en el campo con la bandera de México"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Galerías interactivas a los lados, sobre el pasto libre — el
          "Card Fan Carousel" de 21st.dev (card-fan-carousel.tsx, animado
          con GSAP), reescalado para caber como acento lateral. En
          escritorio quedan pegadas a los bordes izquierdo/derecho; en
          móvil se reacomodan como un par centrado más abajo. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-40 z-20 flex items-center justify-center gap-16 px-6 sm:inset-x-0 sm:justify-between sm:gap-0 sm:px-[118px] sm:bottom-28"
        style={{
          opacity: revealed ? 1 : 0,
          transition: "opacity 1400ms ease-out 500ms",
        }}
      >
        <ScaledFanGallery cards={LEFT_GALLERY_CARDS} label="Del taller" />
        <ScaledFanGallery cards={RIGHT_GALLERY_CARDS} label="A la competencia" />
      </div>

      {/* Texto inferior, centrado horizontalmente — discreto, sin hover,
          sin animación en bucle: entra una sola vez por scroll-trigger
          (IntersectionObserver de la sección, mismo `revealed`) deslizando
          desde -100px hasta su posición final, y se queda ahí, quieto. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-6 sm:bottom-8">
        <p
          className="text-center text-base font-medium tracking-wide text-white sm:text-lg"
          style={{
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateX(0)" : "translateX(-100px)",
            transition:
              "transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s, " +
              "opacity 0.8s ease-out 0.4s",
          }}
        >
          ¿Estás listo para acompañarnos en la siguiente aventura?
        </p>
      </div>
    </section>
  );
}
