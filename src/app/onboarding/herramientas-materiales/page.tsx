import type { Metadata } from "next";
import { BienvenidaHeroVideo } from "@/components/ui/BienvenidaHeroVideo";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { MaterialsToolsLanding } from "@/components/ui/MaterialsToolsLanding";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";

const mod = getModule("onboarding", "herramientas-materiales")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

export default function Page() {
  const { prev, next } = getAdjacentModules("onboarding", "herramientas-materiales");

  return (
    <>
      <BienvenidaHeroVideo src="/videos/herramientas-hero.mp4" />

      <div className="relative z-10 min-h-screen w-full">
        <BienvenidaIntroSection
          kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
          title={mod.title}
          description={mod.description}
          scrollTargetId="landing-split"
          ctaLabel="¡Conoce nuestros materiales y herramientas!"
        />

        <MaterialsToolsLanding />

        <ModuleFooterNav moduleId={mod.id} phase="onboarding" prev={prev} next={next} />
      </div>
    </>
  );
}
