import type { ReactNode } from "react";
import { ModuleAmbientBackground } from "@/components/ui/ModuleAmbientBackground";
import { ModuleThemeProvider } from "@/lib/module-theme";

export default function ManualLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleThemeProvider theme="dark">
      <ModuleAmbientBackground />
      <div className="relative z-10 min-h-screen w-full">{children}</div>
    </ModuleThemeProvider>
  );
}
