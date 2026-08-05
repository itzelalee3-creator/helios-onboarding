import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="bg-[#f9f9fb]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Logo light />
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-800" aria-label="Navegación de pie de página">
          <Link href="/onboarding" className="focus-ring rounded hover:text-slate-950">
            Incorporación
          </Link>
          <Link href="/manual" className="focus-ring rounded hover:text-slate-950">
            Manual de Fabricación
          </Link>
        </nav>
        <p className="font-mono text-xs text-slate-600">
          MANUAL INTERNO · HELIOS AERODESIGN
        </p>
      </div>
    </footer>
  );
}
