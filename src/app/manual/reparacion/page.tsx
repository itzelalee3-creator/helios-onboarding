import type { Metadata } from "next";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { AssetPlaceholder } from "@/components/ui/AssetPlaceholder";
import { SpecTable } from "@/components/ui/SpecTable";
import { Callout } from "@/components/ui/Callout";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";

const mod = getModule("manual", "reparacion")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const glassCardClassName =
  "flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg backdrop-blur-md sm:p-8";
const bodyTextClassName = "text-left leading-relaxed text-slate-200 drop-shadow-md";

export default function Page() {
  const { prev, next } = getAdjacentModules("manual", "reparacion");

  return (
    <>
      <BienvenidaIntroSection
        kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
        title={mod.title}
        description={mod.description}
        scrollTargetId="modulo-contenido"
        ctaLabel="Ver reparación y mantenimiento"
      />
      <ModuleBody id="modulo-contenido">
        <ModuleSection eyebrow="Diagnóstico" title="Daños comunes tras un vuelo o aterrizaje duro">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              Todo aeromodelo se revisa después de cada vuelo, no solo tras un
              accidente evidente. Los daños estructurales por fatiga suelen
              empezar como grietas pequeñas invisibles a simple vista.
            </p>
            <SpecTable
              variant="glass"
              caption="Daños frecuentes y causa habitual"
              rows={[
                { label: "Grieta en larguero", value: "Aterrizaje duro o sobrecarga en maniobra" },
                { label: "Desprendimiento de recubrimiento", value: "Exposición prolongada al sol o mala aplicación de Monokote" },
                { label: "Rotura de borde de ataque", value: "Impacto directo en aterrizaje" },
                { label: "Holgura en bisagra de alerón", value: "Desgaste por uso repetido" },
              ]}
            />
          </div>
        </ModuleSection>

        <ModuleSection eyebrow="Procedimiento" title="Reparación estructural en balsa y pino">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div className={glassCardClassName}>
              <p className={bodyTextClassName}>
                Las reparaciones estructurales replican el material y la
                orientación original de las fibras de la madera. Nunca se
                rellena una grieta estructural solo con adhesivo — se refuerza
                con un parche del mismo material o superior.
              </p>
            </div>
            <AssetPlaceholder type="video" label="Procedimiento de reparación de un larguero agrietado con parche de refuerzo" />
          </div>
        </ModuleSection>

        <ModuleSection eyebrow="Composites" title="Reparación de fibra de carbono y vidrio">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              Un daño en una zona laminada se repara con capas de fibra y
              resina epóxica que igualen o superen la resistencia original,
              siguiendo el mismo protocolo de seguridad del módulo de
              Herramientas y Materiales: guantes, mascarilla y ventilación.
            </p>
          </div>
          <Callout type="info">
            Si tienes dudas sobre si un daño compromete la integridad
            estructural de una pieza de carga, consulta al líder de
            Estructuras antes de volver a volar el modelo.
          </Callout>
        </ModuleSection>

        <ModuleSection eyebrow="Mantenimiento preventivo" title="Entre vuelos">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              Revisión de tornillería, limpieza de residuos de combustible o
              polvo en electrónica, e inspección visual completa se hacen
              como rutina, no solo cuando algo falla. Un aeromodelo bien
              mantenido reduce reparaciones mayores y vuelos cancelados.
            </p>
          </div>
        </ModuleSection>
      </ModuleBody>
      <ModuleFooterNav
        moduleId={mod.id}
        phase="manual"
        prev={prev}
        next={next}
        fallbackNext={{ href: "/", label: "Volver al inicio" }}
      />
    </>
  );
}
