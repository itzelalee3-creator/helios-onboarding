"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { modules } from "@/lib/content/modules";

const STORAGE_KEY = "helios-progress-v1";

interface ProgressContextValue {
  completed: Set<string>;
  isComplete: (id: string) => boolean;
  toggleComplete: (id: string) => void;
  markComplete: (id: string) => void;
  totalCount: number;
  completedCount: number;
  percent: number;
  hydrated: boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // localStorage is unavailable during SSR, so hydration must happen
    // client-side after mount rather than during render.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCompleted(new Set(JSON.parse(raw)));
      }
    } catch {
      /* ignore malformed storage */
    } finally {
      setHydrated(true);
    }
  }, []);

  const toggleComplete = useCallback(
    (id: string) => {
      setCompleted((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
        } catch {
          /* storage unavailable, non-fatal */
        }
        return next;
      });
    },
    []
  );

  const markComplete = useCallback(
    (id: string) => {
      setCompleted((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
        } catch {
          /* storage unavailable, non-fatal */
        }
        return next;
      });
    },
    []
  );

  const value = useMemo<ProgressContextValue>(() => {
    const totalCount = modules.length;
    const completedCount = [...completed].filter((id) =>
      modules.some((m) => m.id === id)
    ).length;
    return {
      completed,
      isComplete: (id: string) => completed.has(id),
      toggleComplete,
      markComplete,
      totalCount,
      completedCount,
      percent: totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100),
      hydrated,
    };
  }, [completed, toggleComplete, markComplete, hydrated]);

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
