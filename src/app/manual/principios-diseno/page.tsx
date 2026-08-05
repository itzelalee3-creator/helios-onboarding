import type { Metadata } from "next";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { AssetPlaceholder } from "@/components/ui/AssetPlaceholder";
import { Callout } from "@/components/ui/Callout";
import { SpecTable } from "@/components/ui/SpecTable";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";

const mod = getModule("manual", "principios-diseno")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const glassCardClassName =
  "flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg backdrop-blur-md sm:p-8";
const bodyTextClassName = "text-left leading-relaxed text-slate-200 drop-shadow-md";

export default function Page() {
  const { prev, next } = getAdjacentModules("manual", "principios-diseno");

  return (
    <>
      <BienvenidaIntroSection
        kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
        title={mod.title}
        description={mod.description}
        scrollTargetId="modulo-contenido"
        ctaLabel="Ver los principios de diseño"
      />
      <ModuleBody id="modulo-contenido">
        <ModuleSection eyebrow="Punto de partida" title="De los requisitos al concepto">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div className={glassCardClassName}>
              <p className={bodyTextClassName}>
                Todo diseño de Helios Aerodesign parte de un conjunto de
                requisitos: misión de vuelo, carga útil, restricciones de peso
                y envergadura. Estos requisitos determinan el perfil alar, la
                configuración estructural y el sistema de propulsión antes de
                cortar una sola pieza.
              </p>
            </div>
            <AssetPlaceholder type="diagram" label="Diagrama de flujo: de requisitos de misión a concepto de diseño" />
          </div>
        </ModuleSection>

        <ModuleSection eyebrow="Aerodinámica básica" title="Perfil alar y superficie">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              El perfil alar determina la relación entre sustentación y
              resistencia. Para aeromodelos de entrenamiento e incorporación
              usamos perfiles semi-simétricos de buen comportamiento a baja
              velocidad; para modelos de competencia se seleccionan perfiles
              específicos según la misión.
            </p>
            <SpecTable
              variant="glass"
              caption="Variables clave de diseño"
              rows={[
                { label: "Carga alar", value: "Peso total / superficie alar — define velocidad de pérdida" },
                { label: "Alargamiento (AR)", value: "Envergadura² / superficie — mayor AR, más eficiencia, menos maniobrabilidad" },
                { label: "Centro de gravedad (CG)", value: "Posición objetivo definida en el plano antes de construir" },
              ]}
            />
          </div>
        </ModuleSection>

        <ModuleSection eyebrow="Cargas estructurales" title="Dónde se concentra la carga">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              En vuelo, las alas soportan flexión y torsión; el fuselaje
              concentra cargas en la unión ala-fuselaje y en el tren de
              aterrizaje al aterrizar. El diseño estructural define dónde van
              largueros de carbono, cuadernas de pino y refuerzos de fibra
              antes de pasar a fabricación.
            </p>
          </div>
          <Callout type="info">
            Cada decisión de material de este manual (balsa, pino, carbono,
            fibra de vidrio) responde a estas cargas — revisa el módulo de
            Herramientas y Materiales de la Fase 1 si necesitas repasarlo.
          </Callout>
        </ModuleSection>

        <ModuleSection eyebrow="Documentación" title="Planos y lista de materiales">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div className={glassCardClassName}>
              <p className={bodyTextClassName}>
                Ningún diseño pasa a manufactura sin un plano acotado y una
                lista de materiales (BOM) revisada por el líder de Diseño y
                Aerodinámica. Esto evita improvisar dimensiones durante el
                corte.
              </p>
            </div>
            <AssetPlaceholder type="diagram" label="Plano acotado de referencia con vista en planta, perfil y frontal" />
          </div>
        </ModuleSection>
      </ModuleBody>
      <ModuleFooterNav moduleId={mod.id} phase="manual" prev={prev} next={next} />
    </>
  );
}
