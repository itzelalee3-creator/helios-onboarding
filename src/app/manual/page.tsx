import type { Metadata } from "next";
import { ModuleNavCard } from "@/components/ui/ModuleNavCard";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/ui/SectionReveal";
import { getModulesByPhase, phaseMeta } from "@/lib/content/modules";

export const metadata: Metadata = {
  title: phaseMeta.manual.title,
  description: phaseMeta.manual.description,
};

export default function ManualHub() {
  const list = getModulesByPhase("manual");

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
          <SectionReveal onScroll={false}>
            <span className="font-mono text-xs tracking-[0.2em] text-orange-strong">
              FASE 2 · MANUAL DE FABRICACIÓN
            </span>
            <h1 className="text-balance mt-4 max-w-2xl font-display text-4xl font-medium text-ink sm:text-5xl">
              Del diseño al vuelo, paso a paso.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
              {phaseMeta.manual.description} Úsalo como referencia constante
              durante la construcción — no necesitas leerlo en un solo día.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m, i) => (
            <StaggerItem key={m.id}>
              <ModuleNavCard module={m} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </>
  );
}
