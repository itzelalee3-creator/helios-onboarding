"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/cn";

interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: "q1",
    prompt:
      "Terminaste de lijar una pieza de balsa y hay polvo fino acumulado sobre la mesa de trabajo. ¿Qué debes hacer para limpiarlo?",
    options: [
      "Soplarlo con la boca para quitarlo rápido",
      "Usar la línea de aire comprimido para dispersarlo",
      "Limpiarlo con aspiradora o paños húmedos",
      "Dejarlo ahí, se limpia al final de la semana",
    ],
    correctIndex: 2,
    explanation:
      "Al lijar balsa, MDF o fibra de carbono se debe limpiar con aspiradora o paños húmedos — está prohibido soplar el polvo con la boca o con aire comprimido, porque suspende las partículas en el aire del taller.",
  },
  {
    id: "q2",
    prompt:
      "Notas que faltan insumos de resina epóxica en el taller justo antes de laminar una pieza importante. ¿A qué área del equipo debes reportarlo?",
    options: ["Logística y Recursos", "Marketing", "Mesa Directiva", "Aerodinámica"],
    correctIndex: 0,
    explanation:
      "Logística y Recursos administra inventario, herramientas, insumos y compras — es el área correcta para reportar faltantes de material antes de que detengan la fabricación.",
  },
  {
    id: "q3",
    prompt:
      "El equipo necesita verificar el peso final de un ala terminada para el control de peso del diseño. ¿Qué instrumento debes usar y qué debes revisar antes de la medición?",
    options: [
      "Dinamómetro, revisando que no exceda su capacidad máxima de carga",
      "Báscula digital, verificando que esté en cero antes de pesar",
      "Flexómetro, extendiéndolo al máximo antes de pesar",
      "Calibrador Vernier, limpiando las quijadas antes de pesar",
    ],
    correctIndex: 1,
    explanation:
      "La báscula digital se usa para el pesaje de la aeronave y sus componentes; siempre debe verificarse que esté en cero antes de cada medición.",
  },
  {
    id: "q4",
    prompt:
      "Vas a laminar una sección del fuselaje ubicada justo junto a la antena del receptor de radio. ¿Qué material compuesto debes priorizar?",
    options: [
      "Fibra de carbono, por su rigidez",
      "Fibra de vidrio, porque no es conductora y no interfiere con la señal",
      "Pino, por tradición del taller",
      "Cualquiera, el material no afecta la señal de radio",
    ],
    correctIndex: 1,
    explanation:
      "La fibra de carbono es conductora y puede interferir con antenas y electrónica de radio; la fibra de vidrio se usa específicamente en esas zonas por no ser conductora.",
  },
  {
    id: "q5",
    prompt:
      "Un compañero recibe una proyección de resina en los ojos mientras laminaba una pieza. ¿Cuál es el protocolo correcto?",
    options: [
      "Frotarse los ojos para sacar el químico y seguir trabajando",
      "Enjuagar de inmediato en la estación lavaojos con agua abundante durante al menos 15 minutos y avisar a su capitán",
      "Esperar a que el capitán llegue antes de hacer cualquier cosa",
      "Aplicar hielo directamente sobre los ojos",
    ],
    correctIndex: 1,
    explanation:
      "Ante contacto de polvo o químico con los ojos, se debe enjuagar de inmediato en la estación lavaojos con agua abundante durante al menos 15 minutos y avisar al capitán — todo accidente o casi-accidente debe reportarse.",
  },
  {
    id: "q6",
    prompt:
      "Necesitas cortar con precisión una costilla de balsa curva para el ala. ¿Qué herramienta te da mejor control para ese corte?",
    options: [
      "Segueta manual con marco",
      "Dremel Lite rotativa inalámbrica",
      "Dremel Moto-Saw (sierra de calar de banco)",
      "Esmeriladora angular con disco de corte",
    ],
    correctIndex: 2,
    explanation:
      "La Dremel Moto-Saw está hecha justo para corte de alta precisión en costillas de balsa, cuadernas de pino y contrachapado. La segueta manual es más lenta e imprecisa para curvas, la Dremel Lite es para retoques y grabado fino, no corte estructural, y la esmeriladora angular con disco de corte es para metal, no para madera delicada.",
  },
  {
    id: "q7",
    prompt:
      "Vas a lijar un borde de fibra de carbono ya curado para ajustarlo. ¿Qué EPP es indispensable antes de empezar?",
    options: [
      "Solo lentes de protección",
      "Mascarilla antipolvo, gafas y guantes",
      "Ninguno, la fibra curada no genera partículas",
      "Solo guantes de nitrilo",
    ],
    correctIndex: 1,
    explanation:
      "Cortar y lijar fibra de carbono o vidrio genera partículas que irritan piel, ojos y vías respiratorias — se requiere mascarilla, gafas y guantes, sin importar que la resina ya haya curado.",
  },
  {
    id: "q8",
    prompt:
      "Estás tensando Monokote sobre una superficie de balsa con la pistola de calor y el film empieza a quemarse en un punto. ¿Qué error de técnica cometiste?",
    options: [
      "Mantener la pistola en movimiento constante",
      "Dejar la pistola fija sobre un solo punto del film",
      "Usar guantes resistentes al calor",
      "Trabajar en una zona ventilada",
    ],
    correctIndex: 1,
    explanation:
      "La pistola de calor debe mantenerse siempre en movimiento; dejarla fija sobre un punto quema el film en vez de tensarlo uniformemente.",
  },
  {
    id: "q9",
    prompt:
      "Necesitas lijar de forma uniforme y plana un borde de ataque de balsa sin deformar la madera. ¿Qué herramienta es la más adecuada?",
    options: [
      "Lima triangular Bellota",
      "Portalijas manual, con movimientos a favor de la beta de la madera",
      "Disco flap en la esmeriladora angular",
      "Dremel Moto-Saw",
    ],
    correctIndex: 1,
    explanation:
      "El portalijas está hecho para lijado uniforme y plano de bloques de balsa y bordes de ataque; se usa con movimientos continuos a favor de la beta para evitar astillamiento.",
  },
  {
    id: "q10",
    prompt:
      "Vas a ajustar tornillería pequeña de un servomotor y tienes disponibles el destornillador de impacto Bauer 20V y el destornillador eléctrico inalámbrico Corebilt. ¿Cuál debes usar y por qué?",
    options: [
      "El destornillador de impacto Bauer, porque es más rápido",
      "El destornillador eléctrico Corebilt, porque permite ajuste fino sin trasroscar",
      "Cualquiera, ambos aplican el mismo torque",
      "Ninguno, la tornillería de servos siempre se ajusta a mano",
    ],
    correctIndex: 1,
    explanation:
      "El Corebilt está pensado para ajuste fino de tornillería pequeña y servomotores sin trasroscar; el Bauer tiene torque alto, pensado para herramentales y bancadas, no para piezas delicadas.",
  },
  {
    id: "q11",
    prompt:
      "Necesitas verificar el espesor exacto de una pieza laminada antes de continuar el ensamble. ¿Qué debes hacer con el calibrador Vernier antes de tomar la medida?",
    options: [
      "Nada, se puede medir directamente sin preparación",
      "Limpiar las quijadas para evitar lecturas erróneas",
      "Forzar el cierre sobre la pieza para una lectura más precisa",
      "Guardarlo en su estuche mientras mides",
    ],
    correctIndex: 1,
    explanation:
      "Limpia las quijadas antes de medir para evitar lecturas erróneas; forzar el cierre sobre la pieza distorsiona la medida en vez de mejorarla.",
  },
  {
    id: "q12",
    prompt:
      "Estás uniendo dos piezas estructurales de mayor carga durante el laminado y necesitas que la presión se mantenga firme mientras cura la resina. ¿Qué herramienta de sujeción es la más adecuada, y qué precaución debes tomar?",
    options: [
      "Pinza de resorte, sin ninguna precaución adicional",
      "Sargento de tipo C, protegiendo la superficie con un retazo de madera o goma",
      "Clips de sujeción, aplicando la máxima presión posible",
      "Ninguna herramienta, basta con sostenerlas con la mano hasta que cure",
    ],
    correctIndex: 1,
    explanation:
      "El sargento de tipo C da la presión firme que requieren las uniones de carga; se protege la superficie con un retazo de madera o goma para no marcar o deformar la pieza.",
  },
  {
    id: "q13",
    prompt:
      "Vas a desbastar un borde de balsa recién cortado con la Dremel rotativa. ¿Qué velocidad debes usar?",
    options: [
      "La máxima disponible, para terminar más rápido",
      "Una velocidad baja, porque la balsa es un material delicado",
      "No importa la velocidad si el accesorio es el correcto",
      "Debes usar el Eje Flexible en vez de la Dremel, sin importar la velocidad",
    ],
    correctIndex: 1,
    explanation:
      "Se recomienda usar velocidad baja en materiales delicados como balsa o resina fresca — una velocidad alta puede quemar o astillar el material.",
  },
  {
    id: "q14",
    prompt:
      "Un compañero mezcla la resina epóxica con el catalizador 'a ojo', sin respetar la proporción exacta del fabricante, para ahorrar tiempo. ¿Cuál es el riesgo principal de esta práctica?",
    options: [
      "Ninguno, la resina siempre cura igual",
      "Compromete la resistencia de toda la pieza laminada",
      "Solo afecta el color final del acabado",
      "Hace que la resina cure más rápido, sin otro efecto",
    ],
    correctIndex: 1,
    explanation:
      "La resina epóxica se mezcla con su catalizador en la proporción exacta indicada por el fabricante — una mezcla incorrecta compromete la resistencia de toda la pieza.",
  },
  {
    id: "q15",
    prompt:
      "Antes de encender la esmeriladora angular, notas que el disco de desbaste está agrietado. ¿Qué debes hacer?",
    options: [
      "Usarlo con más cuidado, a baja velocidad",
      "No usarlo — retirarlo y reportarlo, un disco dañado nunca debe usarse",
      "Usarlo solo para cortes cortos y ligeros",
      "Pedirle a otro integrante que lo use en tu lugar",
    ],
    correctIndex: 1,
    explanation:
      "Nunca debe usarse un disco agrietado o desgastado de forma irregular — inspecciona el disco antes de cada uso y repórtalo de inmediato si está dañado.",
  },
];

export function Quiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const { markComplete } = useProgress();

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const score = correctCount / questions.length;

  const handleSelect = (qId: string, optIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    markComplete("quiz");
  };

  return (
    <div className="flex flex-col gap-6">
      {questions.map((q, qi) => {
        const selected = answers[q.id];
        return (
          <fieldset
            key={q.id}
            className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-teal-strong/40 sm:p-6"
          >
            <legend className="font-apple mb-4 flex items-start gap-3 text-base font-semibold text-white drop-shadow-md">
              <span className="font-mono text-xs text-white/50">
                {String(qi + 1).padStart(2, "0")}
              </span>
              {q.prompt}
            </legend>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrect = q.correctIndex === oi;
                const showState = submitted && (isSelected || isCorrect);

                return (
                  <label
                    key={opt}
                    className={cn(
                      "focus-within:outline-none flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm transition-colors",
                      "border-white/10 bg-white/5 text-zinc-100",
                      isSelected && !submitted && "border-teal-strong text-white",
                      submitted && isCorrect && "border-teal-strong bg-teal-strong/15 text-white",
                      submitted && isSelected && !isCorrect && "border-orange-strong bg-orange-strong/15 text-white",
                      submitted && "cursor-default"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={q.id}
                        checked={isSelected ?? false}
                        onChange={() => handleSelect(q.id, oi)}
                        disabled={submitted}
                        className="focus-ring h-4 w-4 accent-[#2fade0]"
                      />
                      {opt}
                    </span>
                    {showState && isCorrect && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-strong" aria-hidden />
                    )}
                    {showState && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 shrink-0 text-orange-strong" aria-hidden />
                    )}
                  </label>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">{q.explanation}</p>
            )}
          </fieldset>
        );
      })}

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="focus-ring self-start rounded-full border border-orange-strong bg-orange-strong/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-strong/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Enviar evaluación
        </button>
      ) : (
        <div className="flex flex-col gap-4 rounded-xl border border-teal-strong/30 bg-teal-strong/10 p-6 backdrop-blur-md">
          <div>
            <p className="font-apple text-xl font-semibold text-white drop-shadow-md">
              {correctCount} / {questions.length} correctas ({Math.round(score * 100)}%)
            </p>
            <p className="mt-1 text-sm text-zinc-100">
              Evaluación completada. Revisa las explicaciones de cada
              pregunta abajo — ya puedes continuar al Manual de Fabricación.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
