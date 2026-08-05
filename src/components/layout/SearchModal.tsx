"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { modules, phaseMeta } from "@/lib/content/modules";

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return modules.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.kicker.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <motion.div
      role="presentation"
      className="fixed inset-0 z-50 flex flex-col bg-charcoal/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="mx-auto mt-24 w-full max-w-xl px-6"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <SearchIcon className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules..."
              className="focus-ring flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="focus-ring flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors hover:text-ink"
              aria-label="Close search"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {query.trim() === "" && (
              <p className="px-3 py-8 text-center text-sm text-ink-faint">
                Start typing to search onboarding and manual modules.
              </p>
            )}
            {query.trim() !== "" && results.length === 0 && (
              <p className="px-3 py-8 text-center text-sm text-ink-faint">
                No results found for &ldquo;{query}&rdquo;.
              </p>
            )}
            {results.map((m) => (
              <Link
                key={m.id}
                href={`/${m.phase}/${m.slug}`}
                onClick={onClose}
                className="focus-ring group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-surface-raised"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-strong bg-surface-raised text-ink-faint">
                  <Icon name={m.icon} className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm text-ink">{m.title}</span>
                    <span className="shrink-0 text-[10px] uppercase tracking-wide text-ink-faint">
                      {phaseMeta[m.phase].label}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-ink-muted">
                    {m.description}
                  </span>
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
