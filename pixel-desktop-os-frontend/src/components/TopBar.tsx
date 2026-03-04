import { useState } from "react";

const menuItems = {
  File: ["New", "Open", "Save", "Exit"],
  Edit: ["Undo", "Copy", "Paste"],
  View: ["Desktop", "Refresh", "Fullscreen"],
  Help: ["About RohitOS", "Documentation"],
};

const TopBar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center h-8 px-2 bg-secondary border-b-2 border-border font-pixel text-[10px]">
      <span className="text-primary mr-6 tracking-wider">RohitOS v1.0</span>
      <div className="flex gap-1">
        {Object.entries(menuItems).map(([label, items]) => (
          <div key={label} className="relative">
            <button
              className="pixel-btn !text-[9px] !py-[2px]"
              onClick={() => setOpenMenu(openMenu === label ? null : label)}
              onBlur={() => setTimeout(() => setOpenMenu(null), 150)}
            >
              {label}
            </button>
            {openMenu === label && (
              <div className="absolute top-full left-0 mt-[2px] pixel-window min-w-[140px] z-50">
                {items.map((item) => (
                  <div
                    key={item}
                    className="px-3 py-1 text-sm font-terminal hover:bg-primary hover:text-primary-foreground cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-3 text-muted-foreground font-terminal text-sm">
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

export default TopBar;
