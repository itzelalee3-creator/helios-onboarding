"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Package, SquarePlay, Wrench } from "lucide-react";
import { ModuleBody, ModuleSection } from "@/components/ui/ModuleBody";
import { SpecTable } from "@/components/ui/SpecTable";
import { Callout } from "@/components/ui/Callout";
import { EpoxyResinCalculator } from "@/components/ui/EpoxyResinCalculator";
import { FinishReelPlayer } from "@/components/ui/FinishReelPlayer";
import { ToolsMachinerySection } from "@/components/ui/ToolsMachinerySection";
import { VideoReelCard } from "@/components/ui/VideoReelCard";
import { WoodReelPlayer } from "@/components/ui/WoodReelPlayer";
import { ModuleThemeProvider } from "@/lib/module-theme";
import { cn } from "@/lib/cn";

type View = "landing" | "materiales" | "herramientas";

const sectionEyebrowClassName =
  "mb-3 font-mono text-xs font-bold uppercase tracking-wider text-orange-strong";
const sectionTitleClassName =
  "font-apple text-3xl font-black tracking-tight text-white drop-shadow-lg sm:text-4xl";
const bodyTextClassName = "text-left leading-relaxed text-slate-200 drop-shadow-md";
const glassCardClassName =
  "flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg backdrop-blur-md sm:p-8";

// Matches the 4 ModuleSections in the "materiales" view below and the
// flattened tool count in ToolsMachinerySection — used only to turn a
// viewed-count into a percentage for the landing cards' progress bars.
const TOTAL_MATERIAL_SECTIONS = 4;
const TOTAL_TOOLS = 55;

export function MaterialsToolsLanding() {
  const [view, setView] = useState<View>("landing");
  const [viewedTools, setViewedTools] = useState<Set<string>>(new Set());
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set());

  const markToolViewed = useCallback((id: string) => {
    setViewedTools((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const markSectionViewed = useCallback((id: string) => {
    setViewedSections((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const materialsProgress = Math.round(
    (viewedSections.size / TOTAL_MATERIAL_SECTIONS) * 100
  );
  const toolsProgress = Math.round((viewedTools.size / TOTAL_TOOLS) * 100);

  return (
    <div id="landing-split">
      {view !== "landing" && <ViewNavBar view={view} onChange={setView} />}

      {view === "landing" && (
        <div key="landing" className="animate-[fadein_0.5s_ease-out]">
          <div className="mx-auto w-full max-w-5xl px-4 pt-12 text-left sm:px-8 lg:px-12">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-orange-strong">
              HERRAMIENTAS Y MATERIALES
            </span>
            <h1 className="text-balance font-apple mt-4 mb-4 text-3xl font-black tracking-tight text-white drop-shadow-lg sm:text-5xl">
              ¡Domina el taller de manufactura!
            </h1>
            <p className="max-w-4xl text-base leading-relaxed text-slate-300 sm:text-lg">
              En Helios Aerodesign, nada es casualidad. Con el tiempo y las
              competencias nos hemos informado y preparado con la mejor
              selección de materiales y herramientas necesarias para la
              creación de cada uno de nuestros aeromodelos. ¡Para trabajar
              en el taller primero debes conocerlos! Saber para qué y por
              qué los utilizamos es fundamental para que te desenvuelvas en
              el taller. Y si tienes preguntas sobre cómo utilizar una
              herramienta o el manejo de un material en específico, ¡no
              dudes en volver aquí las veces necesarias durante el
              proyecto! Pronto se realizarán capacitaciones presenciales
              para que apliques todo lo que leerás aquí.{" "}
              <strong className="text-teal-strong">
                ¿Estás listo para ser un experto en el taller?
              </strong>
            </p>
          </div>

          <LandingCards
            onSelect={setView}
            materialsProgress={materialsProgress}
            toolsProgress={toolsProgress}
          />

          <div className="mx-auto w-full max-w-[1600px] px-4 pb-10 sm:px-8 lg:px-12">
            <div className="rounded-2xl border border-orange-strong/40 bg-white/5 p-6 shadow-[0_0_30px_-8px_var(--color-orange-strong)] backdrop-blur-md sm:p-8">
              <p className="font-apple text-lg font-bold tracking-tight text-white drop-shadow-md sm:text-xl">
                AVISO IMPORTANTE:
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-100 drop-shadow-md sm:text-base">
                Recuerda leer bien TODO en la sección de herramientas y
                materiales antes de pasar a la evaluación de la Fase 1, esa
                calificación sí se tomará en cuenta en tu ficha de evaluación
                individual como nuevo elemento en Helios Aerodesign :)
              </p>
            </div>
          </div>
        </div>
      )}

      {view === "materiales" && (
        <div key="materiales" className="animate-[fadein_0.5s_ease-out]">
          <ModuleBody>
            <div className="flex flex-col gap-4">
              <span className={sectionEyebrowClassName}>MATERIALES E INSUMOS</span>
              <h2 className={sectionTitleClassName}>Reels de materiales</h2>
              <p className={bodyTextClassName}>
                Conocer las propiedades de cada material es el primer paso
                para construir prototipos eficientes. Esta sección es
                fundamental: aquí te presentamos videos hablando sobre las
                características, usos, cuidados de los materiales{" "}
                <strong className="text-teal-strong">Y SUPER PROTIPS</strong>{" "}
                que utilizamos en Helios Aerodesign. :)
              </p>
              <p className={bodyTextClassName}>
                Ponles mucha atención porque contienen información
                importante para tu evaluación final de esta fase. Tómalo con
                calma, te daremos tiempo para que lo proceses; no es
                necesario que te lo aprendas de memoria, pero sí es
                fundamental que entiendas con qué trabajarás para evitar
                errores en la manufactura de nuestra aeronave final.
              </p>
              <p className={bodyTextClassName}>
                <strong className="text-teal-strong">
                  ¡Scrollea y diviértete aprendiendo sobre las técnicas
                  secretas de Helios Aerodesign!
                </strong>
              </p>
            </div>

            <SectionSeenTracker id="balsa-pino" onSeen={markSectionViewed}>
              <ModuleSection
                eyebrow="Maderas"
                eyebrowClassName={sectionEyebrowClassName}
                title="Balsa y pino"
                titleClassName={sectionTitleClassName}
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
                  <div className={glassCardClassName}>
                    <p className={bodyTextClassName}>
                      La <strong className="text-teal-strong">balsa</strong> es
                      nuestra madera principal: extremadamente ligera y fácil de
                      cortar, ideal para costillas, largueros secundarios y
                      estructuras internas del ala y el fuselaje. El{" "}
                      <strong className="text-teal-strong">pino</strong> se
                      reserva para piezas que requieren mayor resistencia
                      mecánica — cuadernas de carga, soportes de motor y zonas
                      de anclaje del tren de aterrizaje.
                    </p>
                    <SpecTable
                      variant="glass"
                      caption="Comparativa balsa vs. pino"
                      rows={[
                        { label: "Densidad", value: "Balsa: muy baja (~0.1–0.2 g/cm³) · Pino: media (~0.4–0.6 g/cm³)" },
                        { label: "Uso principal", value: "Balsa: costillas, largueros, revestimiento · Pino: cuadernas de carga, soportes" },
                        { label: "Corte recomendado", value: "Cutter/bisturí sobre base de corte, hoja siempre afilada" },
                        { label: "Precaución", value: "El polvo de lijado es irritante — usar mascarilla y aspiración" },
                      ]}
                    />
                    <MaterialVideoButtons
                      videos={[
                        { label: "Balsa · técnica 1", url: "https://youtu.be/0pN_gWE-seY?si=fDpiKl2eyke4m5E5" },
                        { label: "Balsa · técnica 2", url: "https://youtu.be/2ClLCzunoAU?si=MBO1UhFbG5rTQnfO" },
                      ]}
                    />
                  </div>
                  <WoodReelPlayer />
                </div>
              </ModuleSection>
            </SectionSeenTracker>

            <SectionSeenTracker id="fibra-carbono" onSeen={markSectionViewed}>
              <ModuleSection
                eyebrow="Materiales compuestos"
                eyebrowClassName={sectionEyebrowClassName}
                title="Fibra de carbono y fibra de vidrio"
                titleClassName={sectionTitleClassName}
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-start">
                  <VideoReelCard src="/videos/fibras.mp4" />
                  <div className={glassCardClassName}>
                    <p className={bodyTextClassName}>
                      Usamos{" "}
                      <strong className="text-teal-strong">
                        fibra de carbono
                      </strong>{" "}
                      en largueros principales y zonas de alta carga
                      estructural donde la rigidez con bajo peso es crítica. La{" "}
                      <strong className="text-teal-strong">
                        fibra de vidrio
                      </strong>{" "}
                      se usa donde se necesita refuerzo y resistencia al
                      impacto sin el costo ni la conductividad eléctrica del
                      carbono — por ejemplo, cerca de antenas y electrónica de
                      radio.
                    </p>
                    <ModuleThemeProvider theme="dark">
                      <Callout type="warning" title="Manejo de fibras">
                        Cortar y lijar fibra de carbono o vidrio genera
                        partículas que irritan piel, ojos y vías respiratorias.
                        Usa siempre mascarilla, gafas y guantes, y trabaja en
                        la zona de extracción del taller.
                      </Callout>
                    </ModuleThemeProvider>
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
                        Fibra de carbono
                      </span>
                      <MaterialVideoButtons
                        videos={[
                          { label: "Técnica general", url: "https://youtube.com/shorts/Hk-S8SqQrsA?si=Aa7xZ7QM-tz9SMQx" },
                          { label: "Hand layering (placa plana)", url: "https://youtube.com/shorts/xaEOXjNT-As?si=ZZczQB12ZtrXax0W" },
                          { label: "Laminado al vacío (con molde)", url: "https://www.youtube.com/watch?v=cj26c3V54SQ" },
                          { label: "Resin infusion", url: "https://www.youtube.com/watch?v=6vR01GfJ5w8&t=147s" },
                        ]}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
                        Fibra de vidrio
                      </span>
                      <MaterialVideoButtons
                        videos={[{ url: "https://youtu.be/8GnxDve8QRU?si=0ten6zM5VeSrYPlK" }]}
                      />
                    </div>
                  </div>
                </div>
              </ModuleSection>
            </SectionSeenTracker>

            <SectionSeenTracker id="resina-epoxica" onSeen={markSectionViewed}>
              <ModuleSection
                eyebrow="Adhesivos"
                eyebrowClassName={sectionEyebrowClassName}
                title="Resina epóxica"
                titleClassName={sectionTitleClassName}
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
                  <div className={glassCardClassName}>
                    <p className={bodyTextClassName}>
                      La resina epóxica es nuestro adhesivo estructural
                      principal para laminar fibra de carbono y fibra de
                      vidrio, y para uniones de alta resistencia. Se mezcla
                      con su catalizador en la proporción exacta indicada por
                      el fabricante — una mezcla incorrecta compromete la
                      resistencia de toda la pieza.
                    </p>
                    <SpecTable
                      variant="glass"
                      caption="Resina epóxica"
                      rows={[
                        { label: "Uso", value: "Laminado de composites, uniones estructurales" },
                        { label: "Tiempo de trabajo", value: "Varía según fórmula — revisar ficha técnica antes de mezclar" },
                        { label: "EPP requerido", value: "Guantes de nitrilo, ventilación, gafas" },
                      ]}
                    />
                    <MaterialVideoButtons
                      videos={[{ url: "https://youtu.be/CRbF5yU1SWs?si=yE3506FhRs1cWh1f" }]}
                    />
                  </div>
                  <VideoReelCard src="/videos/resina-epoxica.mp4" />
                </div>
                <EpoxyResinCalculator />
              </ModuleSection>
            </SectionSeenTracker>

            <SectionSeenTracker id="films-termoadhesivos" onSeen={markSectionViewed}>
              <ModuleSection
                eyebrow="Acabado"
                eyebrowClassName={sectionEyebrowClassName}
                title="Films termoadhesivos (Monokote) y espuma"
                titleClassName={sectionTitleClassName}
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-start">
                  <FinishReelPlayer />
                  <div className={glassCardClassName}>
                    <p className={bodyTextClassName}>
                      El recubrimiento de alas y superficies se hace con films
                      termoadhesivos tipo{" "}
                      <strong className="text-teal-strong">Monokote</strong>,
                      aplicados con plancha y pistola de calor para tensar el
                      material sobre la estructura de balsa. La{" "}
                      <strong className="text-teal-strong">espuma</strong>{" "}
                      (EPP/EPS) se usa en piezas moldeadas o de bajo costo
                      donde la resistencia al impacto importa más que el
                      peso mínimo.
                    </p>
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
                        Monokote
                      </span>
                      <MaterialVideoButtons
                        videos={[{ url: "https://youtu.be/oUCnPoPw4l4?si=VANsAJjiZE9if8lx" }]}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
                        Espuma
                      </span>
                      <MaterialVideoButtons
                        videos={[{ url: "https://youtu.be/B3hlFm1vCRc?si=FOKvDfc-jNz29xLa" }]}
                      />
                    </div>
                  </div>
                </div>
              </ModuleSection>
            </SectionSeenTracker>

            <div className="flex flex-col items-center gap-3 rounded-3xl border border-orange-strong/40 bg-white/5 p-8 text-center shadow-[0_0_40px_-8px_var(--color-orange-strong)] backdrop-blur-md sm:p-10">
              <span className="inline-flex items-center rounded-full bg-orange-strong px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#05070a]">
                Siguiente paso
              </span>
              <p className="font-apple text-xl font-bold text-white drop-shadow-md sm:text-2xl">
                ¿Ya conoces los materiales?
              </p>
              <p className="max-w-md text-sm leading-relaxed text-slate-300">
                Ahora explora las herramientas y maquinaria que usamos para
                trabajarlos en el taller.
              </p>
              <button
                type="button"
                onClick={() => {
                  setView("herramientas");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="focus-ring group mt-2 inline-flex items-center gap-2 rounded-full border border-orange-strong bg-orange-strong/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-strong/25"
              >
                Sigue por aquí a Herramientas
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
            </div>
          </ModuleBody>
        </div>
      )}

      {view === "herramientas" && (
        <div
          key="herramientas"
          className="animate-[fadein_0.5s_ease-out] mx-auto w-full max-w-[1600px] px-4 pb-14 pt-2 sm:px-8 lg:px-12"
        >
          <ModuleSection
            eyebrow="Herramientas"
            eyebrowClassName={sectionEyebrowClassName}
            title="Mapa Interactivo de Herramientas"
            titleClassName={sectionTitleClassName}
          >
            <p className="w-full text-left leading-relaxed text-slate-300 drop-shadow-md">
              Te presentamos la siguiente tabla interactiva en la que podrás
              explorar todas las herramientas que tenemos en el taller,
              dividida en tareas para que sea más fácil de entender.
              Desplázate e interactúa con cada herramienta para que veas
              cómo la usamos en Helios, el EPP indispensable, algunos tips y
              tutoriales de YouTube sobre cómo utilizarla. :) Recuerda
              regresar a esta sección en cualquier momento del proyecto;
              asimismo, utiliza el buscador para búsquedas inmediatas.
            </p>
            <ToolsMachinerySection onToolOpen={markToolViewed} />

            <div className="mt-8 rounded-2xl border border-orange-strong/40 bg-white/5 p-6 shadow-[0_0_30px_-8px_var(--color-orange-strong)] backdrop-blur-md sm:p-8">
              <p className="font-apple text-lg font-bold tracking-tight text-white drop-shadow-md sm:text-xl">
                AVISO IMPORTANTE:
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-100 drop-shadow-md sm:text-base">
                Recuerda leer bien TODO en la sección de herramientas y
                materiales antes de pasar a la evaluación de la Fase 1, esa
                calificación sí se tomará en cuenta en tu ficha de evaluación
                individual como nuevo elemento en Helios Aerodesign :)
              </p>
            </div>
          </ModuleSection>
        </div>
      )}
    </div>
  );
}

function LandingCards({
  onSelect,
  materialsProgress,
  toolsProgress,
}: {
  onSelect: (v: View) => void;
  materialsProgress: number;
  toolsProgress: number;
}) {
  return (
    <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-6 px-4 py-10 sm:px-8 lg:grid-cols-2 lg:px-12">
      <button
        type="button"
        onClick={() => onSelect("materiales")}
        className="focus-ring group flex flex-col items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-left shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-strong/50 hover:shadow-[0_0_40px_-8px_var(--color-teal-strong)] sm:p-10"
      >
        <span className="inline-flex items-center rounded-full bg-teal-strong px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#05070a]">
          Comienza aquí
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-strong/15 text-teal-strong">
          <Package className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </span>
        <p className="font-apple text-2xl font-bold text-white drop-shadow-md sm:text-3xl">
          Materiales e Insumos
        </p>
        <p className="text-sm leading-relaxed text-zinc-100 drop-shadow-md sm:text-base">
          Consulta la base de datos de maderas (balsa, pino), adhesivos,
          entelados, resinas y consumibles de construcción.
        </p>
        <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-teal-strong bg-teal-strong/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-teal-strong/25">
          Explorar Materiales
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </span>
        <ProgressBar percent={materialsProgress} accent="teal" />
      </button>

      <button
        type="button"
        onClick={() => onSelect("herramientas")}
        className="focus-ring group flex flex-col items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-left shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-strong/50 hover:shadow-[0_0_40px_-8px_var(--color-orange-strong)] sm:p-10"
      >
        <span className="inline-flex items-center rounded-full bg-orange-strong px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#05070a]">
          Sigue por aquí
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-strong/15 text-orange-strong">
          <Wrench className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </span>
        <p className="font-apple text-2xl font-bold text-white drop-shadow-md sm:text-3xl">
          Herramientas y Maquinaria
        </p>
        <p className="text-sm leading-relaxed text-zinc-100 drop-shadow-md sm:text-base">
          Explora la maquinaria rotativa, herramientas manuales, accesorios
          de corte y equipos de medición del taller.
        </p>
        <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-orange-strong bg-orange-strong/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-orange-strong/25">
          Explorar Herramientas
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </span>
        <ProgressBar percent={toolsProgress} accent="orange" />
      </button>
    </div>
  );
}

function ProgressBar({
  percent,
  accent,
}: {
  percent: number;
  accent: "teal" | "orange";
}) {
  return (
    <div className="mt-3 w-full">
      <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-white/50">
        <span>Progreso</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            accent === "teal" ? "bg-teal-strong" : "bg-orange-strong"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function MaterialVideoButtons({
  videos,
}: {
  videos: { label?: string; url: string }[];
}) {
  const valid = videos.filter((v) => v.url && v.url.trim() !== "");
  if (valid.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {valid.map((v) => (
        <a
          key={v.url}
          href={v.url}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-orange-strong bg-orange-strong/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-strong/25"
        >
          <SquarePlay className="h-3.5 w-3.5" aria-hidden />
          Ver técnica de manejo en YouTube{v.label ? ` · ${v.label}` : ""}
        </a>
      ))}
    </div>
  );
}

function SectionSeenTracker({
  id,
  onSeen,
  children,
}: {
  id: string;
  onSeen: (id: string) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onSeen(id);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, onSeen]);

  return <div ref={ref}>{children}</div>;
}

function ViewNavBar({
  view,
  onChange,
}: {
  view: Exclude<View, "landing">;
  onChange: (v: View) => void;
}) {
  return (
    <div className="sticky top-[72px] z-30 mx-auto mb-2 flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-8 lg:px-12">
      <button
        type="button"
        onClick={() => onChange("landing")}
        className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d131cf2] px-4 py-2 text-sm font-semibold text-white/70 shadow-lg backdrop-blur-md transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Volver a la selección
      </button>

      <div className="inline-flex rounded-full border border-white/10 bg-[#0d131cf2] p-1 shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => onChange("materiales")}
          aria-pressed={view === "materiales"}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
            view === "materiales"
              ? "bg-teal-strong/25 text-white"
              : "text-white/50 hover:text-white/80"
          )}
        >
          <Package className="h-3.5 w-3.5" aria-hidden />
          Materiales
        </button>
        <button
          type="button"
          onClick={() => onChange("herramientas")}
          aria-pressed={view === "herramientas"}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
            view === "herramientas"
              ? "bg-orange-strong/25 text-white"
              : "text-white/50 hover:text-white/80"
          )}
        >
          <Wrench className="h-3.5 w-3.5" aria-hidden />
          Herramientas
        </button>
      </div>
    </div>
  );
}
