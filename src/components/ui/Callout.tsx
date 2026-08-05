"use client";

import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";
import { useModuleTheme } from "@/lib/module-theme";
import { cn } from "@/lib/cn";

type CalloutType = "warning" | "info" | "tip";

const config: Record<
  CalloutType,
  { icon: typeof Info; label: string; border: string; bg: string; text: string }
> = {
  warning: {
    icon: AlertTriangle,
    label: "Precaución",
    border: "border-orange-strong/40",
    bg: "bg-white/5 backdrop-blur-md shadow-lg",
    text: "text-orange-strong",
  },
  info: {
    icon: Info,
    label: "Nota técnica",
    border: "border-teal-strong/40",
    bg: "bg-white/5 backdrop-blur-md shadow-lg",
    text: "text-teal-strong",
  },
  tip: {
    icon: Lightbulb,
    label: "Consejo",
    border: "border-white/10",
    bg: "bg-white/5 backdrop-blur-md shadow-lg",
    text: "text-white",
  },
};

const lightConfig: Record<
  CalloutType,
  { icon: typeof Info; label: string; border: string; bg: string; text: string }
> = {
  warning: {
    icon: AlertTriangle,
    label: "Precaución",
    border: "border-orange/30",
    bg: "bg-orange/10",
    text: "text-orange",
  },
  info: {
    icon: Info,
    label: "Nota técnica",
    border: "border-teal/30",
    bg: "bg-teal/10",
    text: "text-teal",
  },
  tip: {
    icon: Lightbulb,
    label: "Consejo",
    border: "border-white/40",
    bg: "bg-white/50 backdrop-blur-sm",
    text: "text-charcoal",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const theme = useModuleTheme();
  const light = theme === "light";
  const c = light ? lightConfig[type] : config[type];
  const Icon = c.icon;

  return (
    <div
      className={cn(
        "flex gap-3 border p-4 sm:p-5",
        light ? "rounded-lg" : "rounded-2xl",
        c.border,
        c.bg
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0 drop-shadow-md", c.text)} aria-hidden />
      <div>
        <p className={cn("text-sm font-semibold drop-shadow-md", c.text)}>
          {title ?? c.label}
        </p>
        <div
          className={cn(
            "mt-1 text-sm leading-relaxed",
            light ? "text-zinc-600" : "text-zinc-100 drop-shadow-md"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
