import type { Metadata } from "next";
import {
  Gauge,
  Megaphone,
  Package,
  Ruler,
  Shield,
  Target,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { AreaFlipCard } from "@/components/ui/AreaFlipCard";
import { WorkflowStageMap } from "@/components/ui/WorkflowStageMap";
import { BienvenidaHeroVideo } from "@/components/ui/BienvenidaHeroVideo";
import { BienvenidaIntroSection } from "@/components/ui/BienvenidaIntroSection";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { ModuleFooterNav } from "@/components/ui/ModuleFooterNav";
import { OrgChartViewer } from "@/components/ui/OrgChartViewer";
import { SpecTable } from "@/components/ui/SpecTable";
import { getModule, getAdjacentModules, phaseMeta } from "@/lib/content/modules";
import { ModuleThemeProvider } from "@/lib/module-theme";

const mod = getModule("onboarding", "equipo")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

const sectionTitleClassName =
  "font-apple text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl";
const bodyTextClassName = "text-zinc-100 leading-relaxed drop-shadow-md";

const areas = [
  {
    name: "Mesa Directiva",
    desc: "Responsables de la gestión general, presupuesto, alianzas institucionales y la visión estratégica de Helios para la competencia.",
    icon: Shield,
    image: "/images/area-mesa-directiva.jpeg",
  },
  {
    name: "Estrategia y Performance",
    desc: "Optimización de carga útil, interpretación del reglamento y análisis de datos para maximizar la puntuación.",
    icon: Target,
    image: "/images/area-estrategia-performance.jpeg",
  },
  {
    name: "Aerodinámica",
    desc: "Diseño de perfiles alares, superficies de control y optimización de sustentación vs. arrastre.",
    icon: Wind,
    image: "/images/area-aerodinamica.jpeg",
  },
  {
    name: "Mecánica de Vuelo",
    desc: "Análisis de estabilidad, actuaciones, comportamiento y respuesta de la aeronave en el aire.",
    icon: Gauge,
    image: "/images/area-mecanica-vuelo.jpeg",
  },
  {
    name: "Estructuras",
    desc: "Selección de materiales y diseño mecánico del chasis y alas para maximizar la resistencia con el menor peso.",
    icon: Ruler,
    image: "/images/area-estructuras.jpeg",
  },
  {
    name: "Logística y Recursos",
    desc: "Administración de inventario, herramientas, insumos, compras y logística de viaje para la competencia.",
    icon: Package,
    image: "/images/area-logistica.jpeg",
  },
  {
    name: "Manufactura",
    desc: "Fabricación física, laminado de fibra, maquinado, moldes y ensamble de precisión en el taller.",
    icon: Wrench,
    image: "/images/area-manufactura.jpeg",
  },
  {
    name: "Aviónica",
    desc: "Integración del sistema eléctrico, motores, baterías, servos, sensores y telemetría.",
    icon: Zap,
    image: "/images/area-avionica.jpeg",
  },
  {
    name: "Marketing",
    desc: "Identidad visual, difusión, gestión de redes sociales y patrocinadores.",
    icon: Megaphone,
    image: "/images/area-marketing.jpeg",
  },
];

export default function Page() {
  const { prev, next } = getAdjacentModules("onboarding", "equipo");

  return (
    <>
      <BienvenidaHeroVideo src="/videos/equipo-hero.mp4" />

      <div className="relative z-10 min-h-screen w-full">
        <BienvenidaIntroSection
          kicker={`${mod.kicker.toUpperCase()} — ${phaseMeta[mod.phase].label.toUpperCase()}`}
          title={mod.title}
          description={mod.description}
          scrollTargetId="areas-equipo"
          ctaLabel="Conocer las áreas"
        />

        <ModuleBody>
          <ModuleSection
            eyebrow="Organización"
            title="Cómo se organiza Helios Aerodesign"
            titleClassName={sectionTitleClassName}
          >
            <p className={bodyTextClassName}>
              El equipo se organiza en una Mesa Directiva y ocho áreas técnicas
              y operativas. Conocer esta estructura te ayudará a saber a quién
              dirigirte, cómo colaborar y dónde aportará más tu trabajo.
            </p>
          </ModuleSection>

          <ModuleSection
            eyebrow="Áreas técnicas y operativas"
            title="Qué hace cada área"
            titleClassName={sectionTitleClassName}
          >
            <div
              id="areas-equipo"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {areas.map((a) => {
                const Icon = a.icon;
                return (
                  <AreaFlipCard
                    key={a.name}
                    name={a.name}
                    desc={a.desc}
                    icon={<Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
                    image={a.image}
                  />
                );
              })}
            </div>
          </ModuleSection>

          <ModuleSection
            eyebrow="Flujo de trabajo"
            title="¿Cómo se conectan?"
            titleClassName={sectionTitleClassName}
          >
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:mb-8">
              Ninguna área trabaja aislada. El desarrollo de nuestra
              aeronave esta compuesta por diferentes etapas donde la
              información, los diseños y las piezas pasan de un equipo a
              otro en un flujo continuo de trabajo. Comprende este flujo y
              las áreas que se relacionan en cada paso :)
            </p>
            <WorkflowStageMap />
          </ModuleSection>

          <ModuleSection
            eyebrow="Organigrama"
            title="Mapa del equipo"
            titleClassName={sectionTitleClassName}
          >
            <OrgChartViewer />
          </ModuleSection>

          <ModuleSection
            eyebrow="Escalamiento"
            title="¿A quién acudir?"
            titleClassName={sectionTitleClassName}
          >
            <p className={bodyTextClassName}>
              Si tienes una duda técnica, comienza siempre con el líder de tu
              área. Si es una duda de seguridad o taller, comunícate con
              algún miembro del área de manufactura o líder de turno — la
              seguridad no tiene jerarquía de espera.
            </p>
            <div className="mt-4">
              <ModuleThemeProvider theme="dark">
                <SpecTable
                  caption="Guía rápida de contacto por tema"
                  rows={[
                    { label: "CFD y aerodinámica", value: "Aerodinámica" },
                    { label: "Estabilidad y vuelo", value: "Mecánica de Vuelo" },
                    { label: "Materiales y resistencia", value: "Estructuras" },
                    {
                      label: "Fabricación, procesos y taller",
                      value: "Manufactura",
                    },
                    {
                      label: "Motores, baterías y electrónica",
                      value: "Aviónica",
                    },
                    {
                      label: "Reglamento y cargas",
                      value: "Estrategia y Performance",
                    },
                    {
                      label: "Insumos, compras, materiales y herramientas",
                      value: "Logística y Recursos",
                    },
                    { label: "Patrocinios y redes", value: "Marketing" },
                    {
                      label: "Temas institucionales y administración",
                      value: "Mesa Directiva",
                    },
                  ]}
                />
              </ModuleThemeProvider>
            </div>
          </ModuleSection>

          <div className="rounded-2xl border border-orange-strong/40 bg-white/5 p-6 shadow-[0_0_30px_-8px_var(--color-orange-strong)] backdrop-blur-md sm:p-8">
            <p className="font-apple text-lg font-bold tracking-tight text-white drop-shadow-md sm:text-xl">
              COMPLETA EL MÓDULO:
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-100 drop-shadow-md sm:text-base">
              ¡Ahora que ya aprendiste sobre la estructura del equipo, es hora
              de ponerte a prueba! Realiza la siguiente actividad de
              memorización con las caras del equipo para irlos ubicando y
              demostrar que finalizaste este módulo 😉. Al final, deberás
              mandar una captura de pantalla para marcar tu módulo como
              completado.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://view.genially.com/6a6ac363e94f7ebe9f483ff3"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-orange-strong bg-orange-strong/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-strong/25"
              >
                🧩 Juego 1: Memorama de Caras
              </a>
              <a
                href="https://view.genially.com/6a6af386bd369538db9960a6"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-orange-strong bg-orange-strong/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-strong/25"
              >
                🧠 Juego 2: Identifica al Equipo
              </a>
            </div>
          </div>
        </ModuleBody>
        <ModuleFooterNav moduleId={mod.id} phase="onboarding" prev={prev} next={next} />
      </div>
    </>
  );
}
