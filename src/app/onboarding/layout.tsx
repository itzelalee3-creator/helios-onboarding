import type { ReactNode } from "react";
import { HeroAmbientBackground } from "@/components/ui/HeroAmbientBackground";
import { ModuleThemeProvider } from "@/lib/module-theme";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleThemeProvider theme="light">
      <div className="relative -mt-[73px] min-h-screen overflow-hidden bg-[#f9f9fb] pt-[73px]">
        <HeroAmbientBackground />
        <div className="relative">{children}</div>
      </div>
    </ModuleThemeProvider>
  );
}
