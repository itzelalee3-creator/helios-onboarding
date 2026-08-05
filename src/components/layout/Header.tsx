"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, CheckCircle2, Circle, Search } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ProgressPill } from "@/components/layout/ProgressPill";
import { SearchModal } from "@/components/layout/SearchModal";
import { Icon } from "@/components/ui/Icon";
import { getModulesByPhase, phaseMeta } from "@/lib/content/modules";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/onboarding", label: "Onboarding" },
  { href: "/manual", label: "Manual" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const isHome = pathname === "/" || pathname?.startsWith("/onboarding");

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-colors",
          isHome
            ? "border-b border-white/10 bg-white/[0.08] backdrop-blur-md"
            : "border-b border-border bg-void/80 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Logo light={isHome} />
            <span className="hero-header-label hidden sm:inline-block">
              AREA DE MANUFACTURA
            </span>
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "focus-ring rounded-full px-4 py-2 text-sm font-light transition-colors",
                    isHome
                      ? active
                        ? "bg-charcoal/8 text-charcoal"
                        : "text-charcoal-muted hover:text-charcoal"
                      : active
                        ? "bg-surface-raised text-ink"
                        : "text-ink-muted hover:text-ink"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ProgressPill light={isHome} />
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={cn(
                "focus-ring hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-light transition-colors sm:flex",
                isHome
                  ? "text-charcoal-muted hover:text-charcoal"
                  : "text-ink-muted hover:text-ink"
              )}
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
            >
              <Search className="h-4 w-4" aria-hidden />
              Search
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                "focus-ring flex items-center gap-2 rounded-full px-4 py-3 text-sm font-light transition-colors sm:py-2.5",
                isHome
                  ? "bg-charcoal/8 text-charcoal hover:bg-charcoal/12"
                  : "bg-surface-raised text-ink hover:bg-surface-hairline"
              )}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-label="Open modules menu"
            >
              Menu
              <Menu className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
      <AnimatePresence>
        {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { isComplete, hydrated } = useProgress();

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Modules menu"
      className="fixed inset-0 z-50 flex flex-col bg-void/98 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          className="focus-ring flex items-center gap-2 rounded-full bg-surface-raised px-4 py-3 text-sm text-ink transition-colors hover:bg-surface-hairline sm:py-2.5"
          aria-label="Close menu"
        >
          Close
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto px-6 pb-16 sm:px-8">
        {(["onboarding", "manual"] as const).map((phase) => (
          <div key={phase} className="mt-8 first:mt-4">
            <Link
              href={phaseMeta[phase].path}
              onClick={onClose}
              className="focus-ring mb-4 inline-block font-display text-2xl font-medium text-ink hover:text-blue-strong"
            >
              {phaseMeta[phase].label} — {phaseMeta[phase].title}
            </Link>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {getModulesByPhase(phase).map((m) => {
                const complete = hydrated && isComplete(m.id);
                return (
                  <Link
                    key={m.id}
                    href={`/${phase}/${m.slug}`}
                    onClick={onClose}
                    className="focus-ring flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm text-ink-muted transition-colors hover:border-border-strong hover:text-ink"
                  >
                    <Icon name={m.icon} className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                    <span className="flex-1">{m.title}</span>
                    {complete ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-strong" aria-hidden />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-ink-faint/30" aria-hidden />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
