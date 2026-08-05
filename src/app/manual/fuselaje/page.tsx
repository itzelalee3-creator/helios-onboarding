import type { Metadata } from "next";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { AssetPlaceholder } from "@/components/ui/AssetPlaceholder";
import { Callout } from "@/components/ui/Callout";
import { Checklist } from "@/components/ui/Checklist";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";

const mod = getModule("manual", "fuselaje")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const glassCardClassName =
  "flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg backdrop-blur-md sm:p-8";
const bodyTextClassName = "text-left leading-relaxed text-slate-200 drop-shadow-md";

export default function Page() {
  const { prev, next } = getAdjacentModules("manual", "fuselaje");

  return (
    <>
      <BienvenidaIntroSection
        kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
        title={mod.title}
        description={mod.description}
        scrollTargetId="modulo-contenido"
        ctaLabel="Ver el proceso de fuselaje"
      />
      <ModuleBody id="modulo-contenido">
        <ModuleSection eyebrow="Método" title="Construcción sobre plano">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div className={glassCardClassName}>
              <p className={bodyTextClassName}>
                El fuselaje se construye directamente sobre el plano impreso a
                escala 1:1, fijado a la mesa de trabajo. Las cuadernas de pino
                y balsa se cortan primero y se verifican contra el plano antes
                de pegarlas en posición.
              </p>
            </div>
            <AssetPlaceholder type="photo" label="Plano de fuselaje fijado a mesa de trabajo con cuadernas cortadas" />
          </div>
        </ModuleSection>

        <ModuleSection eyebrow="Secuencia" title="Orden de armado">
          <Checklist
            items={[
              "Cortar y numerar todas las cuadernas según el plano",
              "Fijar los largueros longitudinales a las cuadernas, verificando escuadra",
              "Reforzar la zona de unión ala-fuselaje con pino o fibra según diseño",
              "Instalar puntos de anclaje del tren de aterrizaje",
              "Verificar alineación general antes de retirar del plano",
            ]}
          />
        </ModuleSection>

        <ModuleSection eyebrow="Puntos críticos" title="Zonas que no se improvisan">
          <Callout type="warning" title="Unión ala-fuselaje">
            Esta zona concentra la mayor carga estructural del avión. Sigue el
            refuerzo especificado en el plano exactamente — no reducir
            material aquí para ahorrar peso.
          </Callout>
          <Callout type="info" title="Escuadra">
            Verifica escuadra y alineación en cada cuaderna antes de que el
            adhesivo cure. Un fuselaje torcido no se corrige después.
          </Callout>
        </ModuleSection>

        <ModuleSection eyebrow="Acabado" title="Revestimiento y preparación">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div className={glassCardClassName}>
              <p className={bodyTextClassName}>
                Una vez curada la estructura, se lija, se revisa contra el
                plano una última vez y se prepara la superficie para
                recubrimiento o laminado, según el diseño del modelo.
              </p>
            </div>
            <AssetPlaceholder type="photo" label="Fuselaje terminado antes de recubrimiento, con estructura visible" />
          </div>
        </ModuleSection>
      </ModuleBody>
      <ModuleFooterNav moduleId={mod.id} phase="manual" prev={prev} next={next} />
    </>
  );
}
