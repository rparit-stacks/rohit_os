import { useOsSettings } from "./OsSettingsContext";

const themes = [
  { id: "dark-green", label: "Neo Green (Default)" },
  { id: "purple", label: "Cyber Purple" },
  { id: "amber", label: "Amber Terminal" },
] as const;

const backgrounds = [
  { id: "matrix", label: "Matrix Glow" },
  { id: "solid", label: "Solid Dark" },
  { id: "grid", label: "Retro Grid" },
] as const;

const fonts = [
  { id: "terminal", label: "Terminal (VT323)" },
  { id: "pixel", label: "Pixel (Press Start 2P)" },
] as const;

const fontSizes = [
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
] as const;

const SettingsWindow = () => {
  const { settings, updateSettings } = useOsSettings();

  return (
    <div className="space-y-4 text-sm">
      <h2 className="text-primary font-pixel text-xs mb-2">{">"} settings.cfg</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-primary font-pixel text-[11px]">COLOR THEME</p>
          <div className="space-y-1">
            {themes.map((t) => (
              <label key={t.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value={t.id}
                  checked={settings.theme === t.id}
                  onChange={() => updateSettings({ theme: t.id })}
                />
                <span>{t.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-primary font-pixel text-[11px]">BACKGROUND STYLE</p>
          <div className="space-y-1">
            {backgrounds.map((b) => (
              <label key={b.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="background"
                  value={b.id}
                  checked={settings.background === b.id}
                  onChange={() => updateSettings({ background: b.id })}
                />
                <span>{b.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-primary font-pixel text-[11px]">FONT FAMILY</p>
          <div className="space-y-1">
            {fonts.map((f) => (
              <label key={f.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="fontFamily"
                  value={f.id}
                  checked={settings.fontFamily === f.id}
                  onChange={() => updateSettings({ fontFamily: f.id })}
                />
                <span>{f.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-primary font-pixel text-[11px]">FONT SIZE</p>
          <div className="space-y-1">
            {fontSizes.map((f) => (
              <label key={f.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="fontSize"
                  value={f.id}
                  checked={settings.fontSize === f.id}
                  onChange={() => updateSettings({ fontSize: f.id })}
                />
                <span>{f.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <p className="text-muted-foreground text-[11px] mt-2">
        Settings are saved locally, so your theme and font preferences stay the same next time you open RohitOS.
      </p>
    </div>
  );
};

export default SettingsWindow;

