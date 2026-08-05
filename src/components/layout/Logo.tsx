import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "focus-ring group flex items-center gap-2.5 rounded",
        className
      )}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={348}
        height={232}
        className="h-9 w-auto shrink-0"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-sm font-semibold tracking-wide",
            light ? "text-charcoal" : "text-orange-strong"
          )}
        >
          HELIOS
        </span>
        <span
          className={cn(
            "mt-0.5 font-mono text-[10px] tracking-[0.25em]",
            light ? "text-charcoal-muted" : "text-ink-faint"
          )}
        >
          AERODESIGN
        </span>
      </span>
    </Link>
  );
}
