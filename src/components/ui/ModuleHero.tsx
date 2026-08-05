import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { phaseMeta, type ModuleDef } from "@/lib/content/modules";
import { cn } from "@/lib/cn";

export function ModuleHero({
  module,
  titleClassName,
}: {
  module: ModuleDef;
  titleClassName?: string;
}) {
  const meta = phaseMeta[module.phase];
  const isBlue = meta.accent === "blue";
  const light = module.phase === "onboarding";

  if (light) {
    const accent = isBlue ? "var(--color-teal)" : "var(--color-orange)";
    const accentStrong = isBlue ? "var(--color-teal-strong)" : "var(--color-orange-strong)";

    return (
      <header className="border-b border-white/40 bg-white/60 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 pb-14 pt-14 sm:px-8 sm:pt-20">
          <nav
            aria-label="Ruta de navegación"
            className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500"
          >
            <Link href="/" className="focus-ring rounded hover:text-zinc-800">
              Helios
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <Link href={meta.path} className="focus-ring rounded hover:text-zinc-800">
              {meta.title}
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <span className="text-zinc-700">{module.title}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: accent }}
            >
              <Icon name={module.icon} className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.2em]" style={{ color: accentStrong }}>
                {module.kicker.toUpperCase()} — {meta.label.toUpperCase()}
              </p>
              <h1
                className={
                  titleClassName ??
                  "mt-2 text-balance font-display text-4xl font-medium text-zinc-900 sm:text-5xl"
                }
              >
                {module.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600">
                {module.description}
              </p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-4xl px-6 pb-14 pt-14 sm:px-8 sm:pt-20">
        <nav
          aria-label="Ruta de navegación"
          className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-ink-faint"
        >
          <Link href="/" className="focus-ring rounded hover:text-ink-muted">
            Helios
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <Link href={meta.path} className="focus-ring rounded hover:text-ink-muted">
            {meta.title}
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-ink-muted">{module.title}</span>
        </nav>

        <div className="flex items-start gap-5">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border",
              isBlue
                ? "border-blue-dim bg-blue-dim/40 text-blue-strong"
                : "border-orange-dim bg-orange-dim/40 text-orange-strong"
            )}
          >
            <Icon name={module.icon} className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </div>
          <div>
            <p
              className={cn(
                "font-mono text-xs tracking-[0.2em]",
                isBlue ? "text-blue-strong" : "text-orange-strong"
              )}
            >
              {module.kicker.toUpperCase()} — {meta.label.toUpperCase()}
            </p>
            <h1 className="mt-2 text-balance font-display text-4xl font-medium text-ink sm:text-5xl">
              {module.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
              {module.description}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
