import type { Metadata } from "next";
import { OnboardingHeroVideo } from "@/components/ui/OnboardingHeroVideo";
import { OnboardingModuleCard } from "@/components/ui/OnboardingModuleCard";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/ui/SectionReveal";
import { getModulesByPhase, phaseMeta } from "@/lib/content/modules";

export const metadata: Metadata = {
  title: phaseMeta.onboarding.title,
  description: phaseMeta.onboarding.description,
};

export default function OnboardingHub() {
  const list = getModulesByPhase("onboarding");

  return (
    <>
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-transparent">
        <OnboardingHeroVideo />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
          <SectionReveal onScroll={false}>
            <span className="font-mono text-xs tracking-[0.2em] text-teal-strong">
              FASE 1 · INCORPORACIÓN
            </span>
            <h1 className="text-balance font-apple mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Antes de tomar una herramienta, entiende el equipo.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90">
              {phaseMeta.onboarding.description} Completa los cinco módulos en
              orden — terminan con una evaluación corta que valida lo esencial.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="relative bg-transparent">
        <div className="mx-auto max-w-6xl px-6 pt-4 pb-16 sm:px-8">
          <h2 className="font-apple mt-2 mb-6 text-2xl font-extrabold leading-tight tracking-tight text-black md:whitespace-nowrap md:text-3xl lg:text-4xl xl:text-[50.7px]">
            Comencemos tu capacitación!
          </h2>

          <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((m, i) => (
              <StaggerItem key={m.id}>
                <OnboardingModuleCard module={m} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
