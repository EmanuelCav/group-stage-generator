import { createContext, useContext } from "react";

type ThemeMode = "light" | "dark" | "system";

export const ThemeContext = createContext<{
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
} | null>(null);

export const useThemeMode = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeMode must be used inside ThemeContext");
  return ctx;
};
