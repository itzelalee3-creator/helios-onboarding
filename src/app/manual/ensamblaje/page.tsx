import type { Metadata } from "next";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { AssetPlaceholder } from "@/components/ui/AssetPlaceholder";
import { Checklist } from "@/components/ui/Checklist";
import { Callout } from "@/components/ui/Callout";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";

const mod = getModule("manual", "ensamblaje")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const glassCardClassName =
  "flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg backdrop-blur-md sm:p-8";
const bodyTextClassName = "text-left leading-relaxed text-slate-200 drop-shadow-md";

export default function Page() {
  const { prev, next } = getAdjacentModules("manual", "ensamblaje");

  return (
    <>
      <BienvenidaIntroSection
        kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
        title={mod.title}
        description={mod.description}
        scrollTargetId="modulo-contenido"
        ctaLabel="Ver el proceso de ensamblaje"
      />
      <ModuleBody id="modulo-contenido">
        <ModuleSection eyebrow="Unión de secciones" title="Ensamblaje final">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div className={glassCardClassName}>
              <p className={bodyTextClassName}>
                Con fuselaje, alas y sistema de propulsión terminados por
                separado, el ensamblaje final los une en un solo aeromodelo:
                fijación del ala al fuselaje, instalación de cola y
                verificación de todas las superficies de control.
              </p>
            </div>
            <AssetPlaceholder type="photo" label="Ensamblaje del ala sobre el fuselaje con puntos de anclaje visibles" />
          </div>
        </ModuleSection>

        <ModuleSection eyebrow="Balance" title="Centro de gravedad (CG)">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              El centro de gravedad se verifica físicamente contra el valor
              objetivo del plano. Se ajusta moviendo la batería o añadiendo
              lastre en la posición indicada — nunca se vuela un modelo sin
              verificar el CG.
            </p>
          </div>
          <Callout type="warning" title="CG fuera de rango">
            Un CG demasiado atrasado hace el avión inestable e impredecible en
            vuelo. Un CG demasiado adelantado lo hace pesado de controles y
            reduce el margen de pérdida. Ambos casos se corrigen antes de
            volar, no en el aire.
          </Callout>
        </ModuleSection>

        <ModuleSection eyebrow="Alineación" title="Superficies de control">
          <Checklist
            items={[
              "Alerones alineados y con recorrido simétrico izquierda/derecha",
              "Elevador con recorrido simétrico arriba/abajo",
              "Timón centrado y con recorrido simétrico",
              "Ala alineada respecto al fuselaje (sin diedro no intencional)",
              "Todos los tornillos y anclajes estructurales verificados",
            ]}
          />
        </ModuleSection>

        <ModuleSection eyebrow="Siguiente paso" title="Antes de volar">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              Un modelo ensamblado y balanceado todavía no está listo para
              volar. El siguiente módulo, Lista de Prevuelo, define la
              verificación final obligatoria antes de cada vuelo.
            </p>
          </div>
        </ModuleSection>
      </ModuleBody>
      <ModuleFooterNav moduleId={mod.id} phase="manual" prev={prev} next={next} />
    </>
  );
}
