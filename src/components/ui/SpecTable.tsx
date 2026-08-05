"use client";

import { useModuleTheme } from "@/lib/module-theme";
import { cn } from "@/lib/cn";

interface Row {
  label: string;
  value: string;
}

export function SpecTable({
  rows,
  caption,
  variant = "default",
  accent = "orange",
}: {
  rows: Row[];
  caption?: string;
  /** "glass" opts into the bright glassmorphism look used on the
   * cinematic onboarding pages, instead of the muted default styling
   * shared with /manual. */
  variant?: "default" | "glass";
  accent?: "teal" | "orange";
}) {
  const theme = useModuleTheme();
  const light = theme === "light";

  if (variant === "glass") {
    const accentText = accent === "orange" ? "text-orange-strong" : "text-teal-strong";
    const accentBorder = accent === "orange" ? "border-orange-strong/30" : "border-teal-strong/30";

    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        {caption && (
          <div
            className={cn(
              "border-b px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider",
              accentText,
              accentBorder
            )}
          >
            {caption}
          </div>
        )}
        <table className="w-full text-sm">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={cn(
                  "border-b border-white/5 last:border-0",
                  i % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"
                )}
              >
                <th
                  scope="row"
                  className="w-1/3 px-5 py-3.5 text-left align-top text-sm font-semibold text-white/70"
                >
                  {row.label}
                </th>
                <td className="px-5 py-3.5 text-sm leading-relaxed text-slate-200 drop-shadow-md">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border",
        light ? "border-white/40 bg-white/40 backdrop-blur-sm" : "border-border"
      )}
    >
      {caption && (
        <div
          className={cn(
            "border-b px-4 py-2.5 font-mono text-xs tracking-[0.15em]",
            light
              ? "border-white/40 bg-white/40 text-slate-500"
              : "border-border bg-surface-raised text-ink-faint"
          )}
        >
          {caption.toUpperCase()}
        </div>
      )}
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={
                light
                  ? i % 2 === 0
                    ? "bg-white/30"
                    : "bg-white/10"
                  : i % 2 === 0
                    ? "bg-surface"
                    : "bg-surface/40"
              }
            >
              <th
                scope="row"
                className={cn(
                  "w-1/3 border-r px-4 py-3 text-left font-normal",
                  light ? "border-white/40 text-slate-500" : "border-border text-ink-faint"
                )}
              >
                {row.label}
              </th>
              <td className={cn("px-4 py-3", light ? "text-zinc-700" : "text-ink-muted")}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
