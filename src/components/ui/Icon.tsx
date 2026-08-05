import {
  Compass,
  Users,
  ShieldAlert,
  Layers,
  ClipboardCheck,
  Box,
  MoveDiagonal,
  Cpu,
  Wrench,
  ListChecks,
  Hammer,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const registry: Record<string, ComponentType<LucideProps>> = {
  Compass,
  Users,
  ShieldAlert,
  Layers,
  ClipboardCheck,
  Box,
  MoveDiagonal,
  Cpu,
  Wrench,
  ListChecks,
  Hammer,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = registry[name] ?? Compass;
  return <Cmp {...props} />;
}
