import { Option1Carousel } from "@/components/valores-taller/Option1Carousel";
import { Option2Timeline } from "@/components/valores-taller/Option2Timeline";
import { Option3NodeGrid } from "@/components/valores-taller/Option3NodeGrid";
import { Option4TabSwapper } from "@/components/valores-taller/Option4TabSwapper";

const OPTIONS = [
  {
    label: "Opción 1 — Carousel Horizontal (Bento Glassmorphism)",
    Component: Option1Carousel,
  },
  {
    label: "Opción 2 — Línea de Proceso Vertical (Timeline Interactivo)",
    Component: Option2Timeline,
  },
  {
    label: "Opción 3 — Red de Nodos Técnicos (Interactive Grid / Blueprint)",
    Component: Option3NodeGrid,
  },
  {
    label: "Opción 4 — Radial Wheel / Tab Swapper (Ficha de Aviónica)",
    Component: Option4TabSwapper,
  },
];

export default function ValoresTallerPreviewPage() {
  return (
    <div className="bg-slate-950 py-16">
      <div className="mx-auto mb-12 max-w-3xl px-6 text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-teal-strong">
          VISTA DE COMPARACIÓN — NO ES LA PÁGINA FINAL
        </p>
        <h1 className="font-apple mt-3 text-3xl font-bold text-white">
          4 opciones para &ldquo;¿Cómo trabajamos?&rdquo;
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Cada bloque simula el fondo oscuro del video real con un degradado
          estático (para no cargar el video 4 veces). Elige la que prefieras
          y la integro en /onboarding/bienvenida.
        </p>
      </div>

      <div className="flex flex-col gap-20">
        {OPTIONS.map(({ label, Component }, i) => (
          <section key={label} className="px-6">
            <p className="mx-auto mb-6 max-w-4xl font-mono text-xs uppercase tracking-[0.15em] text-orange-strong">
              {label}
            </p>
            <div
              className="mx-auto max-w-4xl rounded-3xl border border-white/10 p-8 sm:p-12"
              style={{
                background:
                  i % 2 === 0
                    ? "radial-gradient(circle at 30% 20%, rgba(47,173,224,0.18), transparent 60%), linear-gradient(160deg, #0d131c 0%, #05070a 100%)"
                    : "radial-gradient(circle at 70% 20%, rgba(255,106,26,0.16), transparent 60%), linear-gradient(160deg, #0d131c 0%, #05070a 100%)",
              }}
            >
              <Component />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
