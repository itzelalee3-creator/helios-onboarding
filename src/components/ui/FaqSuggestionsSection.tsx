"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { ChevronDown, Send, ShieldCheck } from "lucide-react";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/cn";

const FAQ_ITEMS = [
  {
    question: "¿Necesito experiencia previa para empezar a trabajar en el taller de manufactura?",
    answer:
      "No. El manual de Incorporación está pensado justo para eso: te lleva paso a paso desde cero hasta que estés listo para tocar herramientas y materiales reales en el taller.",
  },
  {
    question: "¿En qué momento paso de leer la teoría/manuales a construir piezas reales?",
    answer:
      "En cuanto termines los módulos de Incorporación y tu mentor confirme que dominas los fundamentos de seguridad y herramientas, pasas directo al Manual de Fabricación para trabajar en piezas del avión.",
  },
  {
    question: "¿A quién le pregunto si me atoro en un paso o no entiendo algo?",
    answer:
      "Cualquier duda la puedes canalizar con tu mentor asignado o con el encargado del área de manufactura en turno. También puedes dejarla en el buzón de sugerencias de aquí abajo.",
  },
  {
    question: "¿Cómo sé qué tareas me tocan o en qué horario voy a estar?",
    answer:
      "La asignación de tareas y horarios de taller se coordina directamente con tu líder de equipo al inicio de cada semana; el manual cubre el \"cómo\", ellos coordinan el \"cuándo\".",
  },
];

export function FaqSuggestionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  }

  return (
    <section className="relative bg-transparent py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionReveal>
          <p className="section-eyebrow text-orange">¿HAY ALGO QUE NO SABES?</p>
          <h2 className="font-apple mt-3 text-3xl font-extrabold tracking-tight text-black md:text-4xl">
            Preguntas frecuentes
          </h2>
        </SectionReveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          {/* FAQ accordion */}
          <StaggerGroup className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <StaggerItem key={item.question}>
                  <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/30 backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="font-apple flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-charcoal transition-colors duration-200 hover:text-orange-strong sm:px-6 sm:py-5 sm:text-base"
                    >
                      {item.question}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-slate transition-transform duration-300",
                          isOpen && "rotate-180 text-orange"
                        )}
                        aria-hidden
                      />
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="font-apple px-5 pb-5 text-sm leading-relaxed text-charcoal-muted sm:px-6 sm:pb-6">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          {/* Buzón de sugerencias anónimo */}
          <SectionReveal delay={0.1}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 p-6 shadow-lg sm:p-8">
              <Image
                src="/images/suggestion-box-bg.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                aria-hidden
              />
              <div
                className="absolute inset-x-0 top-0 z-10 h-1"
                style={{ backgroundColor: "var(--color-orange)" }}
                aria-hidden
              />
              <h3 className="font-apple relative z-10 text-xl font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ¿Tienes alguna duda o quieres sugerir un tema para aprender?
              </h3>
              <p className="font-apple relative z-10 mt-2 text-sm font-medium leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Déjanos tu comentario, pregunta o idea. Nos ayuda a mejorar el manual para las
                siguientes generaciones del equipo.
              </p>

              {sent ? (
                <div className="font-apple relative z-10 mt-6 flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-6 py-10 text-center backdrop-blur-sm">
                  <ShieldCheck className="h-8 w-8 text-orange-strong" aria-hidden />
                  <p className="text-sm font-semibold text-white">
                    ¡Gracias! Tu sugerencia se envió de forma anónima.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="font-apple text-xs font-medium text-orange-strong underline-offset-2 hover:underline"
                  >
                    Enviar otra sugerencia
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 mt-6 flex flex-1 flex-col gap-4">
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Escribe tu duda, comentario o sugerencia aquí…"
                    rows={5}
                    required
                    className="font-apple w-full flex-1 resize-none rounded-xl border border-orange-strong/80 bg-black/10 p-4 text-sm text-white placeholder:text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] outline-none transition-colors duration-200 focus:border-orange focus:ring-2 focus:ring-orange/20"
                  />

                  <p className="font-apple flex items-center gap-1.5 text-xs text-zinc-200">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-orange-strong" aria-hidden />
                    Tu envío es 100% anónimo. No se guarda ningún dato personal.
                  </p>

                  <button
                    type="submit"
                    className="font-apple inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/50 bg-white/20 px-6 py-3 text-sm font-semibold text-white drop-shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white/30"
                  >
                    Enviar sugerencia anónima
                    <Send className="h-4 w-4" aria-hidden />
                  </button>
                </form>
              )}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
