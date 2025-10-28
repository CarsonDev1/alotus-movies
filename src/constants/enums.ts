export const ThemeMode = {
  Auto: "auto",
  Light: "light",
  Dark: "dark",
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

export const Language = {
  EN: "en",
  VI: "vi",
} as const;

export type Language = (typeof Language)[keyof typeof Language];
