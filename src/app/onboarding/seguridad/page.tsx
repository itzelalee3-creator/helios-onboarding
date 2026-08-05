import type { Metadata } from "next";
import { BienvenidaHeroVideo } from "@/components/ui/BienvenidaHeroVideo";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ChemicalsHandlingCard } from "@/components/ui/ChemicalsHandlingCard";
import { EppInteractiveCard } from "@/components/ui/EppInteractiveCard";
import { FiveSCard } from "@/components/ui/FiveSCard";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { ToolsSafetyCard } from "@/components/ui/ToolsSafetyCard";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";
import { cn } from "@/lib/cn";

const mod = getModule("onboarding", "seguridad")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const sectionTitleClassName =
  "font-apple text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl";
const bodyTextClassName = "text-zinc-100 leading-relaxed drop-shadow-md";

interface SafetyItem {
  label: string;
  text: string;
}

interface SafetyTopic {
  title: string;
  accent: "teal" | "orange";
  items: SafetyItem[];
}

const SAFETY_TOPICS: SafetyTopic[] = [
  {
    title: "Protocolos de Emergencia y Primeros Auxilios",
    accent: "orange",
    items: [
      {
        label: "Ruta de Evacuación y Extintores",
        text: "Ubica desde tu primer día la localización exacta del extintor, la estación de lavado de ojos, el botiquín de primeros auxilios y las salidas de emergencia.",
      },
      {
        label: "Contacto con Químicos u Ojos",
        text: "En caso de proyección de polvo o químico a los ojos, enjuaga inmediatamente en la estación lavaojos con agua abundante durante al menos 15 minutos y avisa a tu capitán.",
      },
      {
        label: "Cortes o Quemaduras",
        text: "Enfriar quemaduras ligeras con agua limpia (no hielo) e informar de inmediato para aplicar los primeros auxilios del botiquín.",
      },
      {
        label: "Cadena de Reporte de Incidentes",
        text: 'Todo accidente o "casi-accidente" (near-miss) debe reportarse al Capitán de Área o al Capitán General para revisar el protocolo y evitar que se repita.',
      },
    ],
  },
];

function SafetyTopicCard({ title, accent, items }: SafetyTopic) {
  const isOrange = accent === "orange";

  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/5 p-5 shadow-lg backdrop-blur-md transition-colors duration-300 sm:p-6",
        isOrange
          ? "border-orange-strong/40 hover:border-orange-strong/60"
          : "border-white/10 hover:border-teal-strong/40"
      )}
    >
      <p className="font-apple text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-4">
        {items.map((item, i) => (
          <li key={item.label} className="flex gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-semibold",
                isOrange
                  ? "border-orange-strong/50 bg-orange-strong/15 text-orange-strong"
                  : "border-teal-strong/50 bg-teal-strong/15 text-teal-strong"
              )}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-white drop-shadow-md">
                {item.label}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-zinc-100 drop-shadow-md">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  const { prev, next } = getAdjacentModules("onboarding", "seguridad");

  return (
    <>
      <BienvenidaHeroVideo src="/videos/seguridad-hero.mp4" />

      <div className="relative z-10 min-h-screen w-full">
        <BienvenidaIntroSection
          kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
          title={mod.title}
          description={mod.description}
          scrollTargetId="protocolos-seguridad"
          ctaLabel="Conocer el protocolo de seguridad"
        />

        <ModuleBody>
          <ModuleSection
            eyebrow="Regla general"
            title="La seguridad no es opcional"
            titleClassName={sectionTitleClassName}
          >
            <p className={bodyTextClassName}>
              Nadie usa una herramienta del taller sin haber completado este
              módulo. Estas reglas existen porque ya han ocurrido incidentes
              en talleres de aeromodelismo — cortes, quemaduras e inhalación
              de vapores son los más comunes y los más evitables. Si no estás
              seguro de cómo usar una herramienta o manejar un material,
              detente y pregunta:{" "}
              <span className="font-semibold text-teal-strong">
                ningún avión vale una lesión
              </span>
              .
            </p>
          </ModuleSection>

          <ModuleSection
            eyebrow="Protocolos del taller"
            title="Reglas y protocolos de seguridad"
            titleClassName={sectionTitleClassName}
          >
            <div id="protocolos-seguridad" className="flex flex-col gap-5">
              <EppInteractiveCard />
              <ChemicalsHandlingCard />
              <ToolsSafetyCard />
              {SAFETY_TOPICS.map((topic) => (
                <SafetyTopicCard key={topic.title} {...topic} />
              ))}
              <FiveSCard />
            </div>
          </ModuleSection>

          <div className="rounded-2xl border border-orange-strong/40 bg-white/5 p-6 shadow-[0_0_30px_-8px_var(--color-orange-strong)] backdrop-blur-md sm:p-8">
            <p className="font-apple text-lg font-bold tracking-tight text-white drop-shadow-md sm:text-xl">
              COMPLETA EL MÓDULO:
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-100 drop-shadow-md sm:text-base">
              ¡Ahora que ya conoces los protocolos de seguridad en el taller,
              es hora de ponerte a prueba! Completa la siguiente actividad
              para verificar tus conocimientos sobre el uso de EPP, químicos
              y herramientas 😉. Al final, deberás mandar una captura de
              pantalla para marcar tu módulo como completado.
            </p>
            <a
              href="https://view.genially.com/6a6d0ecc660a122c36c589ac"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full border border-orange-strong bg-orange-strong/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-strong/25"
            >
              🎮 Actividad de Seguridad en Genially
            </a>
          </div>
        </ModuleBody>
        <ModuleFooterNav moduleId={mod.id} phase="onboarding" prev={prev} next={next} />
      </div>
    </>
  );
}
