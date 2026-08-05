"use client";

import type { ReactNode } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { useModuleTheme } from "@/lib/module-theme";
import { cn } from "@/lib/cn";

export function ModuleBody({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div id={id} className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-14 sm:px-8">
      {children}
    </div>
  );
}

export function ModuleSection({
  eyebrow,
  eyebrowClassName,
  title,
  titleClassName,
  children,
}: {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: string;
  titleClassName?: string;
  children: ReactNode;
}) {
  const theme = useModuleTheme();
  const light = theme === "light";

  return (
    <SectionReveal as="section">
      {eyebrow && (
        <p
          className={
            eyebrowClassName ??
            cn(
              "mb-3 font-mono text-xs tracking-[0.2em]",
              light
                ? "text-slate-500"
                : "font-bold uppercase text-orange-strong"
            )
          }
        >
          {eyebrow.toUpperCase()}
        </p>
      )}
      <h2
        className={
          titleClassName ??
          (light
            ? "font-display text-2xl font-medium text-zinc-900 sm:text-3xl"
            : "font-apple text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl")
        }
      >
        {title}
      </h2>
      <div
        className={cn(
          "prose-body mt-5 flex flex-col gap-4 text-base leading-relaxed",
          light ? "text-zinc-600" : "text-zinc-100 drop-shadow-md"
        )}
      >
        {children}
      </div>
    </SectionReveal>
  );
}
