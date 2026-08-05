"use client";

import { ChevronDown } from "lucide-react";

export function BienvenidaIntroSection({
  kicker,
  title,
  description,
  scrollTargetId,
  ctaLabel = "Descubrir la Misión Helios",
}: {
  kicker: string;
  title: string;
  description: string;
  scrollTargetId: string;
  ctaLabel?: string;
}) {
  function scrollToContent() {
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs tracking-[0.2em] text-sky-300 drop-shadow-md">
        {kicker}
      </span>
      <h1 className="text-balance font-apple mt-4 text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-6xl">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-200 drop-shadow-md">
        {description}
      </p>

      <button
        type="button"
        onClick={scrollToContent}
        className="font-apple absolute inset-x-0 bottom-10 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-white transition-opacity hover:opacity-80"
      >
        <span className="text-sm font-medium tracking-wide drop-shadow-md">
          {ctaLabel}
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce drop-shadow-md" aria-hidden />
      </button>
    </section>
  );
}
