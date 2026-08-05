export type Phase = "onboarding" | "manual";

export interface ModuleDef {
  id: string;
  slug: string;
  phase: Phase;
  order: number;
  title: string;
  kicker: string;
  description: string;
  icon: string;
  estMinutes: number;
}

export const phaseMeta: Record<
  Phase,
  { title: string; label: string; path: string; description: string; accent: "blue" | "orange" }
> = {
  onboarding: {
    title: "Incorporación",
    label: "Fase 1",
    path: "/onboarding",
    description:
      "Todo lo que un nuevo integrante necesita antes de tocar una herramienta: misión del equipo, roles, seguridad y materiales.",
    accent: "blue",
  },
  manual: {
    title: "Manual de Fabricación",
    label: "Fase 2",
    path: "/manual",
    description:
      "Referencia técnica completa del proceso de construcción, desde el diseño hasta el mantenimiento en pista.",
    accent: "orange",
  },
};

export const modules: ModuleDef[] = [
  {
    id: "bienvenida",
    slug: "bienvenida",
    phase: "onboarding",
    order: 1,
    title: "Bienvenida y Misión",
    kicker: "Orientación",
    description: "Quiénes somos, qué construimos y por qué existe Helios Aerodesign.",
    icon: "Compass",
    estMinutes: 5,
  },
  {
    id: "equipo",
    slug: "equipo",
    phase: "onboarding",
    order: 2,
    title: "Estructura del Equipo",
    kicker: "Organización",
    description: "Áreas, roles y a quién acudir según la etapa del proyecto.",
    icon: "Users",
    estMinutes: 6,
  },
  {
    id: "seguridad",
    slug: "seguridad",
    phase: "onboarding",
    order: 3,
    title: "Seguridad en el Taller",
    kicker: "Obligatorio",
    description: "Reglas de taller, manejo de herramientas cortantes, resinas y ventilación.",
    icon: "ShieldAlert",
    estMinutes: 8,
  },
  {
    id: "herramientas-materiales",
    slug: "herramientas-materiales",
    phase: "onboarding",
    order: 4,
    title: "Herramientas y Materiales",
    kicker: "Fundamentos",
    description: "Balsa, pino, fibra de carbono, fibra de vidrio, resina epóxica y films termoadhesivos.",
    icon: "Layers",
    estMinutes: 10,
  },
  {
    id: "quiz",
    slug: "quiz",
    phase: "onboarding",
    order: 5,
    title: "Evaluación de Ingreso",
    kicker: "Interactivo",
    description: "Quiz corto para confirmar los fundamentos antes de pasar al manual técnico.",
    icon: "ClipboardCheck",
    estMinutes: 7,
  },
  {
    id: "principios-diseno",
    slug: "principios-diseno",
    phase: "manual",
    order: 1,
    title: "Principios de Diseño",
    kicker: "Fundamentos",
    description: "Aerodinámica básica, cargas estructurales y criterios de diseño del equipo.",
    icon: "Compass",
    estMinutes: 12,
  },
  {
    id: "fuselaje",
    slug: "fuselaje",
    phase: "manual",
    order: 2,
    title: "Fabricación del Fuselaje",
    kicker: "Construcción",
    description: "Moldes, laminado y ensamblaje del fuselaje principal.",
    icon: "Box",
    estMinutes: 15,
  },
  {
    id: "alas-estructura",
    slug: "alas-estructura",
    phase: "manual",
    order: 3,
    title: "Alas y Estructura",
    kicker: "Construcción",
    description: "Costillas, largueros, bordes de ataque y salida, y recubrimiento del ala.",
    icon: "MoveDiagonal",
    estMinutes: 18,
  },
  {
    id: "propulsion-electronica",
    slug: "propulsion-electronica",
    phase: "manual",
    order: 4,
    title: "Propulsión y Electrónica",
    kicker: "Sistemas",
    description: "Motores, ESC, baterías, servos y cableado del sistema de radio control.",
    icon: "Cpu",
    estMinutes: 14,
  },
  {
    id: "ensamblaje",
    slug: "ensamblaje",
    phase: "manual",
    order: 5,
    title: "Ensamblaje y Alineación",
    kicker: "Construcción",
    description: "Unión de secciones, centrado de gravedad y alineación de superficies de control.",
    icon: "Wrench",
    estMinutes: 16,
  },
  {
    id: "lista-preverificacion",
    slug: "lista-preverificacion",
    phase: "manual",
    order: 6,
    title: "Lista de Prevuelo",
    kicker: "Checklist",
    description: "Verificación estructural, de sistemas y de radio antes de cada vuelo.",
    icon: "ListChecks",
    estMinutes: 6,
  },
  {
    id: "reparacion",
    slug: "reparacion",
    phase: "manual",
    order: 7,
    title: "Reparación y Mantenimiento",
    kicker: "Post-vuelo",
    description: "Diagnóstico de daños comunes y procedimientos de reparación en taller.",
    icon: "Hammer",
    estMinutes: 12,
  },
];

export function getModulesByPhase(phase: Phase): ModuleDef[] {
  return modules
    .filter((m) => m.phase === phase)
    .sort((a, b) => a.order - b.order);
}

export function getModule(phase: Phase, slug: string): ModuleDef | undefined {
  return modules.find((m) => m.phase === phase && m.slug === slug);
}

export function getAdjacentModules(phase: Phase, slug: string) {
  const list = getModulesByPhase(phase);
  const index = list.findIndex((m) => m.slug === slug);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
    index,
    total: list.length,
  };
}
