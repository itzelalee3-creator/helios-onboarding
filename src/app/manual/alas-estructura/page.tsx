import type { Metadata } from "next";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { AssetPlaceholder } from "@/components/ui/AssetPlaceholder";
import { Callout } from "@/components/ui/Callout";
import { SpecTable } from "@/components/ui/SpecTable";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";

const mod = getModule("manual", "alas-estructura")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const glassCardClassName =
  "flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg backdrop-blur-md sm:p-8";
const bodyTextClassName = "text-left leading-relaxed text-slate-200 drop-shadow-md";

export default function Page() {
  const { prev, next } = getAdjacentModules("manual", "alas-estructura");

  return (
    <>
      <BienvenidaIntroSection
        kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
        title={mod.title}
        description={mod.description}
        scrollTargetId="modulo-contenido"
        ctaLabel="Ver la estructura del ala"
      />
      <ModuleBody id="modulo-contenido">
        <ModuleSection eyebrow="Anatomía del ala" title="Costillas y largueros">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div className={glassCardClassName}>
              <p className={bodyTextClassName}>
                El ala se construye alrededor de un esqueleto de{" "}
                <strong className="text-teal-strong">costillas</strong>{" "}
                (cortadas en balsa según el perfil aerodinámico definido en
                Principios de Diseño) atravesadas por{" "}
                <strong className="text-teal-strong">largueros</strong>{" "}
                longitudinales que soportan la flexión en vuelo.
              </p>
            </div>
            <AssetPlaceholder type="diagram" label="Corte transversal del ala mostrando costillas, largueros y bordes" />
          </div>
        </ModuleSection>

        <ModuleSection eyebrow="Componentes" title="Elementos estructurales del ala">
          <SpecTable
            variant="glass"
            caption="Estructura alar"
            rows={[
              { label: "Costillas", value: "Balsa, definen el perfil aerodinámico en cada estación del ala" },
              { label: "Larguero principal", value: "Fibra de carbono o pino — resiste la flexión principal" },
              { label: "Larguero secundario", value: "Balsa o pino — estabiliza torsión" },
              { label: "Borde de ataque", value: "Balsa maciza o laminada, redondeada tras el lijado" },
              { label: "Borde de salida", value: "Balsa laminada, perfil afilado" },
            ]}
          />
        </ModuleSection>

        <ModuleSection eyebrow="Montaje" title="Ensamblado de costillas al larguero">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              Las costillas se enhebran en el larguero principal y se fijan
              sobre el plano, manteniendo la separación exacta indicada. Se
              verifica que cada costilla quede perpendicular al larguero antes
              de curar el adhesivo.
            </p>
          </div>
          <Callout type="warning" title="Alabeo (warp)">
            Un ala con alabeo — torsión no intencional a lo largo de la
            envergadura — afecta directamente el vuelo. Verifica planitud
            contra una superficie de referencia antes y después de pegar cada
            costilla.
          </Callout>
        </ModuleSection>

        <ModuleSection eyebrow="Superficies de control" title="Alerones y bisagras">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div className={glassCardClassName}>
              <p className={bodyTextClassName}>
                Los alerones se construyen como estructuras independientes y
                se unen al ala mediante bisagras, dejando el recorrido de
                control libre de fricción y sin holguras excesivas.
              </p>
            </div>
            <AssetPlaceholder type="video" label="Instalación de bisagras y verificación de recorrido del alerón" />
          </div>
        </ModuleSection>
      </ModuleBody>
      <ModuleFooterNav moduleId={mod.id} phase="manual" prev={prev} next={next} />
    </>
  );
}
