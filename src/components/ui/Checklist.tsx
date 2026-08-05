"use client";

import { useId, useState } from "react";
import { useModuleTheme } from "@/lib/module-theme";
import { cn } from "@/lib/cn";

export function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const baseId = useId();
  const theme = useModuleTheme();
  const light = theme === "light";

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => {
        const id = `${baseId}-${i}`;
        const isChecked = checked.has(i);
        return (
          <li key={id}>
            <label
              htmlFor={id}
              className={cn(
                "focus-within:outline-none group flex cursor-pointer items-start gap-3 border p-4 transition-colors duration-200",
                light
                  ? isChecked
                    ? "rounded-lg border-teal/40 bg-teal/10 backdrop-blur-sm"
                    : "rounded-lg border-white/40 bg-white/50 backdrop-blur-sm hover:border-white/70"
                  : isChecked
                    ? "rounded-xl border-teal-strong bg-teal-strong/15 shadow-lg backdrop-blur-md"
                    : "rounded-xl border-white/10 bg-white/5 shadow-lg backdrop-blur-md hover:border-teal-strong/40"
              )}
            >
              <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(i)}
                className={cn(
                  "focus-ring mt-0.5 h-4 w-4 shrink-0 rounded accent-[#2fade0]",
                  light ? "border-black/20 bg-white" : "border-white/20 bg-white/5"
                )}
              />
              <span
                className={cn(
                  "text-sm leading-relaxed transition-colors",
                  light ? "text-zinc-600" : "text-zinc-100 drop-shadow-md",
                  isChecked && (light ? "text-zinc-900 line-through decoration-teal/60" : "text-white line-through decoration-teal-strong/60")
                )}
              >
                {item}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
