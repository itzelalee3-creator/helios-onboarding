"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Download,
  ExternalLink,
  Maximize2,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/cn";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

interface OrgChart {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

const CHARTS: OrgChart[] = [
  {
    id: "senior",
    label: "Estructura Senior",
    heading: "Estructura por Experiencia",
    subheading: "Integrantes Senior / Liderazgos",
    src: "/images/organigrama-senior.jpeg",
    width: 1280,
    height: 547,
    alt: "Organigrama de la estructura senior de Helios Aerodesign: liderazgos e integrantes con mayor experiencia",
  },
  {
    id: "completo",
    label: "Estructura Completa",
    heading: "Estructura General Integrada",
    subheading: "Equipo completo con nuevos integrantes",
    src: "/images/organigrama-completo.jpeg",
    width: 1280,
    height: 401,
    alt: "Organigrama de la estructura completa de Helios Aerodesign: equipo integrado con nuevos integrantes",
  },
];

export function OrgChartViewer() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const chart = CHARTS[active];

  function openModal() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setModalOpen(true);
  }

  function zoomIn() {
    setZoom((z) => clamp(+(z + ZOOM_STEP).toFixed(2), MIN_ZOOM, MAX_ZOOM));
  }

  function zoomOut() {
    setZoom((z) => {
      const next = clamp(+(z - ZOOM_STEP).toFixed(2), MIN_ZOOM, MAX_ZOOM);
      if (next <= MIN_ZOOM) setPan({ x: 0, y: 0 });
      return next;
    });
  }

  function resetZoom() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.preventDefault();
    const next = clamp(+(zoom - e.deltaY * 0.0015).toFixed(2), MIN_ZOOM, MAX_ZOOM);
    setZoom(next);
    if (next <= MIN_ZOOM) setPan({ x: 0, y: 0 });
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (zoom <= MIN_ZOOM) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  }

  function handlePointerUp() {
    setIsDragging(false);
  }

  useEffect(() => {
    if (!modalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <div>
      {/* View toggle */}
      <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
        {CHARTS.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                isActive
                  ? "bg-teal-strong/20 text-white shadow-[0_0_16px_-4px_var(--color-teal-strong)]"
                  : "text-white/60 hover:text-white/80"
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Framed chart container */}
      <div
        key={active}
        className="animate-[fadein_0.4s_ease-out] mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md sm:p-6"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-teal-strong">
          {chart.heading.toUpperCase()}
        </p>
        <p className="mt-1 text-sm text-zinc-300">{chart.subheading}</p>

        <button
          type="button"
          onClick={openModal}
          aria-label={`Ampliar: ${chart.heading}`}
          className="focus-ring group relative mt-4 block w-full overflow-hidden rounded-xl border border-white/10 bg-black/20"
        >
          <Image
            src={chart.src}
            alt={chart.alt}
            width={chart.width}
            height={chart.height}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 800px, 100vw"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              <Maximize2 className="h-3.5 w-3.5" aria-hidden />
              Ampliar
            </span>
          </span>
        </button>
      </div>

      {/* Fullscreen modal viewer — portaled to <body> so this `fixed`
          overlay anchors to the real viewport instead of the nearest
          transformed ancestor (ModuleSection's scroll-reveal applies a
          CSS transform, which would otherwise turn `fixed` into
          "fixed to that section" per spec). */}
      {modalOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={chart.heading}
            onClick={() => setModalOpen(false)}
            className="animate-[fadein_0.3s_ease-out] fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          >
          {/* Toolbar: zoom controls, open original, download, close */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-3 top-3 z-10 flex flex-wrap items-center justify-end gap-2 sm:right-6 sm:top-6"
          >
            <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/50 p-1 backdrop-blur-sm">
              <button
                type="button"
                onClick={zoomOut}
                disabled={zoom <= MIN_ZOOM}
                aria-label="Reducir zoom"
                className="rounded-full p-2 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ZoomOut className="h-4 w-4" aria-hidden />
              </button>
              <span className="min-w-[3rem] text-center font-mono text-xs text-white/80">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={zoomIn}
                disabled={zoom >= MAX_ZOOM}
                aria-label="Aumentar zoom"
                className="rounded-full p-2 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ZoomIn className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={resetZoom}
                disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
                aria-label="Restablecer zoom"
                className="rounded-full p-2 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <a
              href={chart.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir imagen original en una pestaña nueva"
              className="rounded-full border border-white/20 bg-black/50 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={chart.src}
              download={`organigrama-${chart.id}.jpeg`}
              aria-label="Descargar imagen"
              className="rounded-full border border-white/20 bg-black/50 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <Download className="h-4 w-4" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
              className="rounded-full border border-white/20 bg-black/50 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          {/* Zoom/pan viewport — near-fullscreen, image keeps its aspect
              ratio via object-contain, transform only scales/translates
              the box that already respects it. */}
          <div
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative h-[90vh] w-[95vw] touch-none overflow-hidden rounded-lg"
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: isDragging ? "none" : "transform 0.15s ease-out",
                cursor: zoom > MIN_ZOOM ? (isDragging ? "grabbing" : "grab") : "default",
              }}
            >
              <Image
                src={chart.src}
                alt={chart.alt}
                fill
                sizes="95vw"
                className="pointer-events-none select-none object-contain"
                priority
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
