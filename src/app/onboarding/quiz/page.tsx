import type { Metadata } from "next";
import { BienvenidaHeroVideo } from "@/components/ui/BienvenidaHeroVideo";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { Quiz } from "@/components/quiz/Quiz";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";

const mod = getModule("onboarding", "quiz")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const sectionTitleClassName =
  "font-apple text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl";
const bodyTextClassName = "text-zinc-100 leading-relaxed drop-shadow-md";

export default function Page() {
  const { prev, next } = getAdjacentModules("onboarding", "quiz");

  return (
    <>
      <BienvenidaHeroVideo src="/videos/quiz-hero.mp4" />

      <div className="relative z-10 min-h-screen w-full">
        <BienvenidaIntroSection
          kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
          title={mod.title}
          description={mod.description}
          scrollTargetId="quiz-preguntas"
        />

        <ModuleBody>
          <ModuleSection
            eyebrow="Evaluación"
            title="Confirma lo esencial"
            titleClassName={sectionTitleClassName}
          >
            <p className={bodyTextClassName}>
              Quince preguntas con escenarios reales del taller: criterio de
              manufactura, selección de materiales, herramientas y técnicas
              que ya viste en video — más un par sobre la misión y la
              estructura del equipo. No es memorización, es demostrar que
              entendiste con qué vas a trabajar. Tienes un solo intento, así
              que tómate tu tiempo antes de responder.
            </p>
          </ModuleSection>

          <div id="quiz-preguntas">
            <Quiz />
          </div>
        </ModuleBody>
        <ModuleFooterNav
          moduleId={mod.id}
          phase="onboarding"
          prev={prev}
          next={next}
          fallbackNext={{ href: "/manual", label: "Manual de Fabricación" }}
        />
      </div>
    </>
  );
}
