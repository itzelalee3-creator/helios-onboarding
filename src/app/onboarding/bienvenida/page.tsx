import type { Metadata } from "next";
import { Lightbulb } from "lucide-react";
import { BienvenidaHeroVideo } from "@/components/ui/BienvenidaHeroVideo";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { NewMemberFaqCards } from "@/components/ui/NewMemberFaqCards";
import { WorkshopValuesTimeline } from "@/components/ui/WorkshopValuesTimeline";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";

const mod = getModule("onboarding", "bienvenida")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const sectionTitleClassName =
  "font-apple text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl";
const bodyTextClassName = "text-zinc-100 leading-relaxed drop-shadow-md";

export default function Page() {
  const { prev, next } = getAdjacentModules("onboarding", "bienvenida");

  return (
    <>
      <BienvenidaHeroVideo />

      <div className="relative z-10 min-h-screen w-full">
        <BienvenidaIntroSection
          kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
          title={mod.title}
          description={mod.description}
          scrollTargetId="preguntas-integrante"
        />

        <ModuleBody>
          <ModuleSection
            eyebrow="Quiénes somos"
            title="Bienvenido a Helios Aerodesign"
            titleClassName={sectionTitleClassName}
          >
            <p className={bodyTextClassName}>
              Helios Aerodesign es el{" "}
              <span className="font-semibold text-teal-strong">
                equipo estudiantil de aeromodelismo dedicado al diseño,
                fabricación y vuelo de aeronaves no tripuladas de construcción
                propia
              </span>
              . Cada temporada partimos de una hoja en blanco
              y terminamos con un avión certificado para volar, construido
              enteramente por el equipo.
            </p>
            <p className={`mt-4 ${bodyTextClassName}`}>
              Este manual es tu punto de partida. Está dividido en dos fases: una
              introducción al equipo y sus reglas, y un manual técnico completo
              de fabricación al que volverás constantemente durante el proyecto.
            </p>
          </ModuleSection>

          <ModuleSection
            eyebrow="Nuestra misión"
            title="Por qué construimos"
            titleClassName={sectionTitleClassName}
          >
            <p className={bodyTextClassName}>
              Buscamos formar ingenieros capaces de llevar un diseño desde el
              concepto hasta el vuelo, con la disciplina técnica y el trabajo en
              equipo que exige la aviación real. Cada pieza que cortamos, cada
              ala que forramos, tiene que cumplir el mismo estándar:{" "}
              <span className="font-semibold text-teal-strong">
                si no confiarías en que vuele contigo dentro, no está
                terminada
              </span>
              .
            </p>
          </ModuleSection>

          <ModuleSection
            eyebrow="Valores del taller"
            title="¿Cómo trabajamos?"
            titleClassName={sectionTitleClassName}
          >
            <WorkshopValuesTimeline />

            <div className="mt-6 flex gap-3">
              <Lightbulb
                className="mt-0.5 h-5 w-5 shrink-0 text-sky-300 drop-shadow-md"
                aria-hidden
              />
              <div>
                <p className="text-sm font-semibold text-white drop-shadow-md">
                  Antes de seguir
                </p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-100 drop-shadow-md">
                  Este manual asume cero experiencia previa. Si algo no queda
                  claro, pregunta al responsable de tu área — está bien no
                  saber, no está bien improvisar en el taller.
                </p>
              </div>
            </div>
          </ModuleSection>

          <ModuleSection
            eyebrow="Para nuevos integrantes"
            title="Lo que todo integrante nuevo se pregunta"
            titleClassName={sectionTitleClassName}
          >
            <NewMemberFaqCards />
          </ModuleSection>

          <div className="rounded-2xl border border-orange-strong/40 bg-white/5 p-6 shadow-[0_0_30px_-8px_var(--color-orange-strong)] backdrop-blur-md sm:p-8">
            <p className="font-apple text-lg font-bold tracking-tight text-white drop-shadow-md sm:text-xl">
              COMPLETA EL MÓDULO:
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-100 drop-shadow-md sm:text-base">
              ¡Ahora que ya aprendiste las bases de Helios Aerodesign, es hora
              de ponerte a prueba! Enfócate en esta aventura de Juan el
              caballo para resolver el misterio y demostrar que comprendiste
              totalmente este módulo 😉. Al final, deberás mandar una captura
              de pantalla para marcar tu módulo como completado.
            </p>
            <a
              href="https://view.genially.com/6a6a6a6436a4258d93a7c188"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full border border-orange-strong bg-orange-strong/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-strong/25"
            >
              🎮 Ir a la aventura de Juan el caballo
            </a>
          </div>
        </ModuleBody>
        <ModuleFooterNav moduleId={mod.id} phase="onboarding" prev={prev} next={next} />
      </div>
    </>
  );
}
