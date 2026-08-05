import Image from "next/image";

const ITEMS = [
  {
    label: "Inspección Previa",
    text: "Revisa el estado de cables, brocas, discos de corte y guardas de seguridad antes de encender cualquier máquina. Reporta inmediatamente cualquier falla o cable dañado.",
  },
  {
    label: "Zona de Operación Abierta",
    text: "Mantén tu área de corte limpia y libre de estorbos. Nadie debe estar en la trayectoria de corte ni distraer al operador mientras la herramienta esté encendida.",
  },
  {
    label: "Uso Correcto de Herramienta Manual",
    text: "Utiliza los cúters y bisturís realizando los cortes siempre en dirección opuesta a tu cuerpo y a tu mano de apoyo. Asegúrate de que las navajas tengan filo para evitar aplicar fuerza excesiva.",
  },
  {
    label: "Cuidado de Baterías (LiPo)",
    text: "Las baterías de pruebas deben inspeccionarse visualmente (sin deformaciones ni perforaciones) y cargarse únicamente sobre bolsas ignífugas (LiPo Safe Bags) bajo supervisión constante.",
  },
];

export function ToolsSafetyCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-teal-strong/40 sm:p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        {/* Left: title + numbered list */}
        <div>
          <p className="font-apple text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl">
            Uso Seguro de Herramientas y Máquinas
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

        {/* Right: two stacked photos, sharing the column's height on desktop */}
        <div className="mx-auto flex w-full max-w-sm flex-col gap-4 lg:max-w-none">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_24px_-8px_var(--color-teal-strong)] lg:aspect-auto lg:flex-1">
            <Image
              src="/images/dremel-herramientas.jpg"
              alt="Integrante de Helios Aerodesign usando una herramienta Dremel montada en prensa de taladro sobre el taller"
              fill
              sizes="(min-width: 1024px) 380px, 400px"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_24px_-8px_var(--color-teal-strong)] lg:aspect-auto lg:flex-1">
            <Image
              src="/images/cortadora-herramientas.jpg"
              alt="Cortadora Dremel Moto-Saw en uso sobre madera balsa en el taller de Helios Aerodesign"
              fill
              sizes="(min-width: 1024px) 380px, 400px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
