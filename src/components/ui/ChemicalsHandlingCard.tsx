import Image from "next/image";

const ITEMS = [
  {
    label: "Ventilación Activa",
    text: "Todo proceso de mezclado de resinas, aplicación de pegamentos fuertes, uso de solventes (acetona/alcohol) o pintura debe realizarse en áreas con ventilación adecuada.",
  },
  {
    label: "Almacenamiento y Etiquetado",
    text: "Los contenedores de químicos y adhesivos deben mantenerse cerrados cuando no estén en uso y estar claramente etiquetados con su nombre y advertencias de riesgo.",
  },
  {
    label: "Control de Polvos Finos",
    text: "Al lijar balsa, MDF o fibra de carbono, limpia la superficie con aspiradora o paños húmedos. Prohibido soplar el polvo con la boca o la línea de aire comprimido, ya que suspende las partículas en el aire del taller.",
  },
  {
    label: "Disposición de Residuos",
    text: "Los trapos contaminados con solventes o resina fresca deben colocarse en los contenedores designados para evitar vapores o riesgos de inflamabilidad.",
  },
];

export function ChemicalsHandlingCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-teal-strong/40 sm:p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Left: photo */}
        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_24px_-8px_var(--color-teal-strong)]">
            <Image
              src="/images/manejo-quimicos.jpg"
              alt="Integrante de Helios Aerodesign midiendo un químico con guantes de nitrilo, mascarilla y bata de laboratorio en el taller"
              fill
              sizes="(min-width: 1024px) 380px, 400px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right: title + numbered list */}
        <div>
          <p className="font-apple text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl">
            Manejo de Materiales Químicos y Polvos
          </p>
          <ul className="mt-4 flex flex-col gap-4">
            {ITEMS.map((item, i) => (
              <li key={item.label} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal-strong/50 bg-teal-strong/15 font-mono text-[11px] font-semibold text-teal-strong">
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
      </div>
    </div>
  );
}
