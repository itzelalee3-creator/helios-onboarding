import { PhaseCard } from "@/components/ui/PhaseCard";
import { CinematicVideoSection } from "@/components/ui/CinematicVideoSection";
import { FaqSuggestionsSection } from "@/components/ui/FaqSuggestionsSection";
import { FloatingHeroImage } from "@/components/ui/FloatingHeroImage";
import { HeroAmbientBackground } from "@/components/ui/HeroAmbientBackground";
import { MissionVideoSection } from "@/components/ui/MissionVideoSection";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/ui/SectionReveal";
import { TeamWelcomeSection } from "@/components/ui/TeamWelcomeSection";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate -mt-[73px] flex min-h-[92vh] flex-col overflow-hidden pt-[73px] sm:min-h-[96vh]">
        <HeroAmbientBackground />

        {/* Ambient reflected glow behind the wordmark, echoing the aurora hues */}
        <div className="hero-reflection-glow pointer-events-none absolute inset-x-0 top-[46%] flex -translate-y-1/2 justify-center">
          <div className="h-[26vw] w-[80vw] max-w-4xl rounded-full bg-gradient-to-r from-orange-strong/25 via-teal/10 to-teal/25" />
        </div>

        {/* Stacked wordmark */}
        <div className="pointer-events-none absolute inset-x-0 top-[46%] flex -translate-y-1/2 select-none flex-col items-center gap-4">
          <SectionReveal onScroll={false}>
            <span className="hero-badge pointer-events-auto inline-flex items-center backdrop-blur-md">
              CENTRO DE CAPACITACIÓN
            </span>
          </SectionReveal>
          <div className="flex flex-col items-center">
            <p aria-hidden className="font-heavy text-[22vw] leading-[0.8] tracking-tight text-[#000000] sm:text-[17.5vw]">
              HELIOS
            </p>
            <p aria-hidden className="font-heavy text-[17vw] leading-[0.8] tracking-tight text-[#000000] sm:text-[13.5vw]">
              AERODESIGN
            </p>
          </div>
        </div>

        {/* Ambient reflected glow behind the aircraft */}
        <div className="hero-reflection-glow pointer-events-none absolute inset-x-0 top-[49%] z-[5] flex -translate-y-1/2 justify-center">
          <div className="h-[22vw] w-[68vw] max-w-5xl rounded-full bg-gradient-to-r from-orange-strong/20 via-transparent to-teal/20" />
        </div>

        {/* Aircraft, crossing through both lines of the wordmark */}
        <div className="pointer-events-none absolute inset-x-0 top-[49%] z-10 flex -translate-y-1/2 justify-center px-4">
          <FloatingHeroImage
            src="/images/hero/aircraft-white-bg.png"
            width={1135}
            height={382}
            className="w-[98%] max-w-4xl sm:w-[92%] sm:max-w-7xl"
            shadowClassName="drop-shadow-[0_40px_55px_rgba(20,24,31,0.3)]"
          />
        </div>

        {/* Technical designation, near the aircraft */}
        <div className="pointer-events-none absolute bottom-[25%] right-[7%] z-20 hidden sm:block">
          <SectionReveal delay={0.2} onScroll={false}>
            <span className="font-mono text-[10px] font-normal tracking-[0.18em] text-orange/90">
              AERONAVE: PITIC H5 NFC 2025
            </span>
          </SectionReveal>
        </div>

        {/* Slogan */}
        <div className="relative z-20 mx-auto mb-14 mt-auto flex w-full flex-col items-center gap-3 px-6 sm:mb-20">
          <SectionReveal delay={0.15} onScroll={false}>
            <p className="text-center text-sm font-light tracking-[0.03em] text-charcoal-muted sm:text-base">
              La calidad de tu capacitación garantiza nuestro vuelo
            </p>
          </SectionReveal>
          <span className="font-mono text-[10px] font-normal tracking-[0.18em] text-orange/90 sm:hidden">
            AERONAVE: PITIC H5 NFC 2025
          </span>
        </div>
      </section>

      <CinematicVideoSection />

      <TeamWelcomeSection />

      <MissionVideoSection />

      {/* Everything below the hero: clean, bright, Apple-style canvas.
          Mismo fondo ambiental exacto que el Hero (HeroAmbientBackground),
          reutilizado tal cual para que ambos tramos se sientan como el
          mismo lienzo continuo. */}
      <div className="relative overflow-hidden bg-[#f9f9fb]">
        <HeroAmbientBackground />

        {/* Phases — transparente para dejar pasar el glow ambiental
            del wrapper compartido de arriba, sin fondo ni blobs propios
            que corten la continuidad hacia el FAQ de abajo. */}
        <section className="relative w-full bg-transparent px-6 py-16 md:px-12">
          <div className="relative mx-auto max-w-6xl">
            <SectionReveal>
              <p className="section-eyebrow text-orange">RUTA DE APRENDIZAJE</p>
              <h2 className="font-apple mt-3 mb-4 whitespace-nowrap text-2xl font-extrabold leading-tight tracking-tight text-black md:text-3xl lg:text-4xl xl:text-[50.7px]">
                Bienvenido! aprende sobre nuestra manufactura
              </h2>
              <p className="w-full text-left text-sm font-light tracking-[0.03em] leading-relaxed text-slate-500 mt-2 mb-8 sm:text-base">
                En Helios Aerodesign valoramos el aprendizaje, la documentación y el crecimiento. Justo para eso fue creada esta página web: es un regalo para dejar nuestros conocimientos a las siguientes generaciones, un pequeño legado que les ayudará a no pasar por lo mismo que nosotros. Realmente deseamos que este conocimiento les ayude a lograr ese podio y a llevarse aprendizajes que les servirán en la industria.
              </p>
            </SectionReveal>

            <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <StaggerItem>
                <PhaseCard phase="onboarding" />
              </StaggerItem>
              <StaggerItem>
                <PhaseCard phase="manual" />
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>

        <FaqSuggestionsSection />
      </div>
    </>
  );
}
