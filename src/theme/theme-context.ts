import { createContext } from 'react';

export type ThemeMode = 'auto' | 'light' | 'dark';

export type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);