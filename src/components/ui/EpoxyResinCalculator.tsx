"use client";

import { useMemo, useState } from "react";
import { Calculator, FlaskConical } from "lucide-react";
import { cn } from "@/lib/cn";

const GRAMAJE_PRESETS = [200, 160];

type Mode = "area" | "directo";

function parseInput(value: string): number {
  const n = parseFloat(value.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function EpoxyResinCalculator() {
  const [mode, setMode] = useState<Mode>("area");
  const [area, setArea] = useState("");
  const [gramaje, setGramaje] = useState("200");
  const [capas, setCapas] = useState("1");
  const [fibraDirecta, setFibraDirecta] = useState("");

  const { pFibra, pResinaTotal, pA, pB } = useMemo(() => {
    const fibra =
      mode === "directo"
        ? parseInput(fibraDirecta)
        : parseInput(area) * parseInput(gramaje) * parseInput(capas);
    const resinaTotal = fibra * 1.2;
    const b = resinaTotal / 3;
    const a = b * 2;
    return { pFibra: fibra, pResinaTotal: resinaTotal, pA: a, pB: b };
  }, [mode, area, gramaje, capas, fibraDirecta]);

  const fmt = (n: number) =>
    n.toLocaleString("es-MX", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const inputClassName =
    "focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 backdrop-blur-md transition-colors focus-visible:border-teal-strong/50";
  const labelClassName = "text-xs font-semibold uppercase tracking-wide text-white/60";

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg backdrop-blur-md sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-strong/15 text-orange-strong">
          <Calculator className="h-5.5 w-5.5" strokeWidth={1.75} aria-hidden />
        </span>
        <div>
          <p className="font-apple text-lg font-bold text-white drop-shadow-md sm:text-xl">
            Calculadora de Resina Epóxica
          </p>
          <p className="text-xs text-white/50">Laminado Quintum Q1 · Proporción 2:1</p>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setMode("area")}
          aria-pressed={mode === "area"}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-300",
            mode === "area" ? "bg-orange-strong/25 text-white" : "text-white/50 hover:text-white/80"
          )}
        >
          Calcular por área
        </button>
        <button
          type="button"
          onClick={() => setMode("directo")}
          aria-pressed={mode === "directo"}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-300",
            mode === "directo" ? "bg-orange-strong/25 text-white" : "text-white/50 hover:text-white/80"
          )}
        >
          Ingresar peso de fibra directo
        </button>
      </div>

      {/* Inputs */}
      {mode === "area" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Área de la pieza (m²)</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="0.00"
              className={inputClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Gramaje de la tela (g/m²)</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              value={gramaje}
              onChange={(e) => setGramaje(e.target.value)}
              placeholder="200"
              className={inputClassName}
            />
            <div className="flex gap-1.5 pt-0.5">
              {GRAMAJE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setGramaje(String(preset))}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors",
                    Number(gramaje) === preset
                      ? "border-orange-strong bg-orange-strong/20 text-white"
                      : "border-white/10 bg-white/5 text-white/50 hover:text-white/80"
                  )}
                >
                  {preset} g/m²
                </button>
              ))}
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Número de capas</span>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              value={capas}
              onChange={(e) => setCapas(e.target.value)}
              placeholder="1"
              className={inputClassName}
            />
          </label>
        </div>
      ) : (
        <label className="flex flex-col gap-1.5 sm:w-1/2">
          <span className={labelClassName}>Peso total de la fibra seca (g)</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={fibraDirecta}
            onChange={(e) => setFibraDirecta(e.target.value)}
            placeholder="0.0"
            className={inputClassName}
          />
        </label>
      )}

      {/* Results */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ResultCard label="Peso de Fibra" value={fmt(pFibra)} unit="g" />
        <ResultCard label="Resina Total (+20%)" value={fmt(pResinaTotal)} unit="g" />
        <ResultCard label="Componente A (Resina)" value={fmt(pA)} unit="g" accent="teal" />
        <ResultCard label="Componente B (Endurecedor)" value={fmt(pB)} unit="g" accent="orange" />
      </div>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-white/50">
        <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        💡 Calculado bajo la regla de oro para laminado manual (50:50 en peso
        fibra:resina) + 20% de merma en taller.
      </p>
    </div>
  );
}

function ResultCard({
  label,
  value,
  unit,
  accent = "white",
}: {
  label: string;
  value: string;
  unit: string;
  accent?: "teal" | "orange" | "white";
}) {
  const accentText =
    accent === "teal"
      ? "text-teal-strong"
      : accent === "orange"
        ? "text-orange-strong"
        : "text-white";
  const accentBorder =
    accent === "teal"
      ? "border-teal-strong/30"
      : accent === "orange"
        ? "border-orange-strong/30"
        : "border-white/10";

  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-xl border bg-white/5 p-4 text-center backdrop-blur-md",
        accentBorder
      )}
    >
      <span className={cn("font-apple text-2xl font-black drop-shadow-md sm:text-3xl", accentText)}>
        {value}
        <span className="ml-1 text-sm font-semibold">{unit}</span>
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
        {label}
      </span>
    </div>
  );
}
