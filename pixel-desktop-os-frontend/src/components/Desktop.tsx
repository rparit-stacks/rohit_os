import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";
import DesktopIcon from "./DesktopIcon";
import PixelWindow from "./PixelWindow";
import PixelBrowser from "./PixelBrowser";
import SettingsWindow from "./SettingsWindow";
import TerminalWindow from "./TerminalWindow";
import { useOsSettings } from "./OsSettingsContext";
import {
  AboutContent,
  ProjectsContent,
  SkillsContent,
  ExperienceContent,
  ContactContent,
  ResumeContent,
} from "./WindowContents";

interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  width: number;
  height: number;
}

const desktopIcons = [
  { id: "about", icon: "👤", label: "About Me" },
  { id: "projects", icon: "📁", label: "Projects" },
  { id: "skills", icon: "⚙️", label: "Skills" },
  { id: "experience", icon: "💼", label: "Experience" },
  { id: "contact", icon: "📧", label: "Contact" },
  { id: "resume", icon: "📄", label: "Resume" },
  { id: "browser", icon: "🌐", label: "Browser" },
  { id: "github", icon: "🖥️", label: "GitHub" },
  { id: "linkedin", icon: "🔗", label: "LinkedIn" },
];

const sideIcons = [
  { id: "terminal", icon: "⬛", label: "Terminal" },
  { id: "settings", icon: "🔧", label: "Settings" },
];

const windowConfigs: Record<string, { title: string; content: React.ReactNode; width: number; height: number }> = {
  about: { title: "about_me.txt", content: <AboutContent />, width: 480, height: 360 },
  projects: { title: "projects/", content: <ProjectsContent />, width: 520, height: 440 },
  skills: { title: "skills.cfg", content: <SkillsContent />, width: 460, height: 400 },
  experience: { title: "work_history.log", content: <ExperienceContent />, width: 480, height: 360 },
  contact: { title: "contact.sh", content: <ContactContent />, width: 420, height: 320 },
  resume: { title: "resume.pdf", content: <ResumeContent />, width: 400, height: 320 },
  browser: { title: "RohitBrowser v1.0", content: <PixelBrowser />, width: 700, height: 500 },
  settings: { title: "settings.cfg", content: <SettingsWindow />, width: 460, height: 360 },
  terminal: { title: "rohit_terminal.exe", content: <TerminalWindow />, width: 640, height: 380 },
};

interface DesktopProps {
  onShutdown?: () => void;
}

const Desktop = ({ onShutdown }: DesktopProps) => {
  const [openWindows, setOpenWindows] = useState<WindowData[]>([]);
  const [focusOrder, setFocusOrder] = useState<string[]>([]);
  const { settings } = useOsSettings();

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ url?: string }>;
      const targetUrl = custom.detail?.url;
      if (!targetUrl) return;

      const id = `browser-${Date.now()}`;
      const title = "RohitBrowser v1.0";
      const content = <PixelBrowser defaultUrl={targetUrl} />;

      setOpenWindows((prev) => [
        ...prev,
        {
          id,
          title,
          content,
          position: { x: 200, y: 80 },
          width: 700,
          height: 500,
        },
      ]);
      setFocusOrder((prev) => [...prev, id]);
    };

    window.addEventListener("os-open-browser", handler as EventListener);
    return () => {
      window.removeEventListener("os-open-browser", handler as EventListener);
    };
  }, []);

  const openWindow = useCallback((id: string) => {
    if (id === "github") {
      window.open("https://github.com/rparit-stacks", "_blank");
      return;
    }
    if (id === "linkedin") {
      window.open("https://www.linkedin.com/in/rparit1934", "_blank");
      return;
    }

    if (openWindows.find((w) => w.id === id)) {
      setFocusOrder((prev) => [...prev.filter((i) => i !== id), id]);
      return;
    }

    const config = windowConfigs[id];
    if (!config) return;

    const offset = openWindows.length * 30;
    setOpenWindows((prev) => [
      ...prev,
      {
        id,
        title: config.title,
        content: config.content,
        position: { x: 180 + offset, y: 60 + offset },
        width: config.width,
        height: config.height,
      },
    ]);
    setFocusOrder((prev) => [...prev, id]);
  }, [openWindows]);

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusOrder((prev) => prev.filter((i) => i !== id));
  };

  const bringToFront = (id: string) => {
    setFocusOrder((prev) => [...prev.filter((i) => i !== id), id]);
  };

  const backgroundClass =
    settings.background === "grid" ? "desktop-bg-grid" : "";

  return (
    <div className={`fixed inset-0 bg-background overflow-hidden ${backgroundClass}`}>
      {/* Scanline overlay */}
      <div className="scanline fixed inset-0 z-[100] pointer-events-none" />

      {/* CRT flicker */}
      <div className="crt-flicker fixed inset-0 z-[99] pointer-events-none" />

      {/* Binary background pattern */}
      {settings.background === "matrix" && (
        <div className="fixed inset-0 opacity-[0.03] font-terminal text-[10px] text-primary leading-3 overflow-hidden select-none pointer-events-none p-4 z-0 matrix-bg">
          {Array.from({ length: 60 }, (_, i) => (
            <div key={i}>
              {Array.from({ length: 20 }, () =>
                Math.random() > 0.5 ? "1" : "0"
              ).join(" ")}
            </div>
          ))}
        </div>
      )}

      <TopBar />

      {/* Desktop icons - left grid */}
      <div className="fixed left-4 top-12 flex flex-col flex-wrap gap-2 max-h-[calc(100vh-100px)] z-10">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Side icons - right */}
      <div className="fixed right-4 top-12 flex flex-col gap-2 z-10">
        {sideIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {openWindows.map((win) => (
          <PixelWindow
            key={win.id}
            title={win.title}
            onClose={() => closeWindow(win.id)}
            defaultPosition={win.position}
            width={win.width}
            height={win.height}
            zIndex={20 + focusOrder.indexOf(win.id)}
            onFocus={() => bringToFront(win.id)}
          >
            {win.content}
          </PixelWindow>
        ))}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-secondary border-t-2 border-border flex items-center px-2 z-40">
        <button className="pixel-btn !text-[9px] flex items-center gap-1">
          <span className="text-primary">▶</span> START
        </button>
        <div className="mx-2 w-px h-5 bg-border" />
        <div className="flex gap-1 overflow-x-auto flex-1">
          {openWindows.map((win) => (
            <button
              key={win.id}
              className={`pixel-btn !text-[8px] !px-3 ${
                focusOrder[focusOrder.length - 1] === win.id
                  ? "!bg-primary !text-primary-foreground"
                  : ""
              }`}
              onClick={() => bringToFront(win.id)}
            >
              {win.title}
            </button>
          ))}
        </div>
        {onShutdown && (
          <>
            <div className="mx-2 w-px h-5 bg-border" />
            <button
              className="pixel-btn !text-[9px] !px-3 !py-1 hover:!bg-destructive"
              onClick={onShutdown}
            >
              SHUTDOWN
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Desktop;
