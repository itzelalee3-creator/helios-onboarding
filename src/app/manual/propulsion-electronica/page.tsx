import type { Metadata } from "next";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { AssetPlaceholder } from "@/components/ui/AssetPlaceholder";
import { Callout } from "@/components/ui/Callout";
import { SpecTable } from "@/components/ui/SpecTable";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";

const mod = getModule("manual", "propulsion-electronica")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const glassCardClassName =
  "flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg backdrop-blur-md sm:p-8";
const bodyTextClassName = "text-left leading-relaxed text-slate-200 drop-shadow-md";

export default function Page() {
  const { prev, next } = getAdjacentModules("manual", "propulsion-electronica");

  return (
    <>
      <BienvenidaIntroSection
        kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
        title={mod.title}
        description={mod.description}
        scrollTargetId="modulo-contenido"
        ctaLabel="Ver propulsión y electrónica"
      />
      <ModuleBody id="modulo-contenido">
        <ModuleSection eyebrow="Cadena de propulsión" title="Motor, ESC y batería">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              La cadena de propulsión se dimensiona a partir del peso
              estimado del avión y la misión de vuelo: motor brushless,
              variador electrónico (ESC) y batería LiPo, seleccionados como
              conjunto compatible — nunca por separado sin verificar
              corrientes máximas.
            </p>
            <SpecTable
              variant="glass"
              caption="Compatibilidad del sistema"
              rows={[
                { label: "Motor", value: "Empuje y RPM/V según peso y misión del avión" },
                { label: "ESC", value: "Corriente máxima ≥ corriente pico del motor con margen de seguridad" },
                { label: "Batería LiPo", value: "Capacidad y tasa de descarga (C) según consumo del motor" },
                { label: "Hélice", value: "Diámetro y paso calculados para el par motor-ESC" },
              ]}
            />
          </div>
        </ModuleSection>

        <ModuleSection eyebrow="Radio control" title="Receptor, servos y cableado">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div className={glassCardClassName}>
              <p className={bodyTextClassName}>
                El receptor de radio se instala alejado de fuentes de
                interferencia electromagnética (motor, ESC) y se fija de
                forma que no reciba vibración directa. Los servos se ubican
                según el plano, con recorrido de varillaje libre y sin puntos
                de fricción.
              </p>
            </div>
            <AssetPlaceholder type="diagram" label="Diagrama de cableado: batería, ESC, motor, receptor y servos" />
          </div>
        </ModuleSection>

        <ModuleSection eyebrow="Verificación" title="Pruebas en banco antes de instalar">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              Todo sistema de propulsión se prueba en banco de pruebas antes
              de instalarse en el avión: verificación de sentido de giro del
              motor, respuesta del ESC y consumo real bajo carga.
            </p>
          </div>
          <Callout type="warning" title="Baterías LiPo">
            Nunca se conecta una batería LiPo al sistema sin haber revisado
            cableado y polaridad. Un cortocircuito en banco de pruebas puede
            iniciar un incendio — ten siempre una bolsa ignífuga a mano.
          </Callout>
        </ModuleSection>
      </ModuleBody>
      <ModuleFooterNav moduleId={mod.id} phase="manual" prev={prev} next={next} />
    </>
  );
}
