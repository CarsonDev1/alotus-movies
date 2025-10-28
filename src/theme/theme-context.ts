import { createContext } from "react";
import type { ThemeMode } from "../constants/enums";

export type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);
