import type { Metadata } from "next";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { Checklist } from "@/components/ui/Checklist";
import { Callout } from "@/components/ui/Callout";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";

const mod = getModule("manual", "lista-preverificacion")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const glassCardClassName =
  "flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg backdrop-blur-md sm:p-8";
const bodyTextClassName = "text-left leading-relaxed text-slate-200 drop-shadow-md";

export default function Page() {
  const { prev, next } = getAdjacentModules("manual", "lista-preverificacion");

  return (
    <>
      <BienvenidaIntroSection
        kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
        title={mod.title}
        description={mod.description}
        scrollTargetId="modulo-contenido"
        ctaLabel="Ver la lista de prevuelo"
      />
      <ModuleBody id="modulo-contenido">
        <ModuleSection eyebrow="Regla del equipo" title="Sin lista, no hay vuelo">
          <div className={glassCardClassName}>
            <p className={bodyTextClassName}>
              Esta lista se completa en pista, inmediatamente antes de cada
              vuelo, sin excepción — incluso en modelos que ya han volado
              antes. La mayoría de los incidentes en pista ocurren por
              saltarse un paso que &ldquo;ya se sabía&rdquo;.
            </p>
          </div>
        </ModuleSection>

        <ModuleSection eyebrow="Estructural" title="Verificación estructural">
          <Checklist
            items={[
              "Ala firmemente anclada al fuselaje, sin juego",
              "Superficies de control sin holguras ni obstrucciones",
              "Tren de aterrizaje firme y sin daños visibles",
              "Estructura general sin grietas, roturas o reparaciones sin curar",
            ]}
          />
        </ModuleSection>

        <ModuleSection eyebrow="Sistemas" title="Verificación de propulsión y electrónica">
          <Checklist
            items={[
              "Batería LiPo cargada y con voltaje verificado",
              "Conexiones de motor y ESC firmes, sin cables sueltos",
              "Hélice en buen estado, sin grietas ni desbalance",
              "Servos responden correctamente en las tres superficies de control",
            ]}
          />
        </ModuleSection>

        <ModuleSection eyebrow="Radio" title="Verificación de radio control">
          <Checklist
            items={[
              "Alcance de radio verificado antes del vuelo",
              "Modelo correcto seleccionado en la emisora",
              "Fail-safe configurado y probado",
              "Centro de gravedad verificado por última vez",
            ]}
          />
          <Callout type="warning" title="Cualquier fallo detiene el vuelo">
            Si algún punto de esta lista falla, el vuelo se cancela hasta
            resolverlo. No se improvisa una solución en pista bajo presión de
            tiempo.
          </Callout>
        </ModuleSection>
      </ModuleBody>
      <ModuleFooterNav moduleId={mod.id} phase="manual" prev={prev} next={next} />
    </>
  );
}
