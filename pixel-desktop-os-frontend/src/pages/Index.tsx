import { useEffect, useState } from "react";
import Desktop from "@/components/Desktop";
import { OsSettingsProvider } from "@/components/OsSettingsContext";

const BOOT_KEY = "rohit-os-booted";

type BootState = "idle" | "booting" | "on";

const BootScreen = ({ state, onSwitchOn }: { state: BootState; onSwitchOn: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black text-green-400 flex items-center justify-center font-terminal">
      <div className="pixel-border bg-black/80 px-6 py-4 max-w-md w-full">
        <p className="text-primary font-pixel text-xs mb-3">{">"} RohitOS v1.0</p>
        <pre className="text-[12px] leading-4 mb-4 whitespace-pre-wrap">
{`BOOT SEQUENCE INITIALIZED...

  [ OK ] Loading kernel modules
  [ OK ] Mounting /rohit/home
  [ OK ] Starting window system
`}
        </pre>
        {state === "idle" && (
          <button
            className="pixel-btn !text-[10px] !px-4 !py-2 w-full mt-2"
            onClick={onSwitchOn}
          >
            SWITCH ON
          </button>
        )}
        {state === "booting" && (
          <p className="text-primary text-[11px] mt-2">
            SWITCHING ON<span className="blink-cursor" />
          </p>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  const [bootState, setBootState] = useState<BootState>("idle");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(BOOT_KEY);
      if (stored === "1") {
        setBootState("on");
      } else {
        setBootState("idle");
      }
    } catch {
      setBootState("idle");
    }
  }, []);

  const handleSwitchOn = () => {
    if (bootState !== "idle") return;
    setBootState("booting");
    window.setTimeout(() => {
      try {
        window.localStorage.setItem(BOOT_KEY, "1");
      } catch {
        // ignore
      }
      setBootState("on");
    }, 1800);
  };

  const handleShutdown = () => {
    try {
      window.localStorage.removeItem(BOOT_KEY);
    } catch {
      // ignore
    }
    setBootState("idle");
  };

  if (bootState === "on") {
    return (
      <OsSettingsProvider>
        <Desktop onShutdown={handleShutdown} />
      </OsSettingsProvider>
    );
  }

  return <BootScreen state={bootState} onSwitchOn={handleSwitchOn} />;
};

export default Index;
