import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark-green" | "purple" | "amber";
type Background = "matrix" | "solid" | "grid";
type FontFamily = "terminal" | "pixel";
type FontSize = "small" | "medium" | "large";

export interface OsSettings {
  theme: Theme;
  background: Background;
  fontFamily: FontFamily;
  fontSize: FontSize;
}

interface OsSettingsContextValue {
  settings: OsSettings;
  updateSettings: (partial: Partial<OsSettings>) => void;
}

const DEFAULT_SETTINGS: OsSettings = {
  theme: "dark-green",
  background: "matrix",
  fontFamily: "terminal",
  fontSize: "medium",
};

const OsSettingsContext = createContext<OsSettingsContextValue | undefined>(undefined);

export const OsSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<OsSettings>(() => {
    try {
      const raw = window.localStorage.getItem("rohit-os-settings");
      if (!raw) return DEFAULT_SETTINGS;
      const parsed = JSON.parse(raw) as Partial<OsSettings>;
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    window.localStorage.setItem("rohit-os-settings", JSON.stringify(settings));

    const body = document.body;

    body.classList.remove("theme-dark-green", "theme-purple", "theme-amber");
    body.classList.add(`theme-${settings.theme}`);

    body.classList.remove("bg-matrix", "bg-solid", "bg-grid");
    body.classList.add(`bg-${settings.background}`);

    body.classList.remove("os-font-terminal", "os-font-pixel");
    body.classList.add(settings.fontFamily === "terminal" ? "os-font-terminal" : "os-font-pixel");

    body.classList.remove("os-font-small", "os-font-medium", "os-font-large");
    body.classList.add(`os-font-${settings.fontSize}`);
  }, [settings]);

  const updateSettings = (partial: Partial<OsSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return (
    <OsSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </OsSettingsContext.Provider>
  );
};

export const useOsSettings = (): OsSettingsContextValue => {
  const ctx = useContext(OsSettingsContext);
  if (!ctx) {
    throw new Error("useOsSettings must be used within OsSettingsProvider");
  }
  return ctx;
};

