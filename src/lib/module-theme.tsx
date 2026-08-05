"use client";

import { createContext, useContext, type ReactNode } from "react";

export type ModuleTheme = "light" | "dark";

const ModuleThemeContext = createContext<ModuleTheme>("dark");

export function ModuleThemeProvider({
  theme,
  children,
}: {
  theme: ModuleTheme;
  children: ReactNode;
}) {
  return (
    <ModuleThemeContext.Provider value={theme}>{children}</ModuleThemeContext.Provider>
  );
}

export function useModuleTheme() {
  return useContext(ModuleThemeContext);
}
