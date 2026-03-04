import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface PixelWindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  zIndex: number;
  onFocus: () => void;
}

const PixelWindow = ({
  title,
  onClose,
  children,
  defaultPosition = { x: 150, y: 80 },
  width = 500,
  height = 380,
  zIndex,
  onFocus,
}: PixelWindowProps) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) {
      onFocus();
      return;
    }
    setIsDragging(true);
    onFocus();
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.3, opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="pixel-window fixed"
      style={{
        left: isMaximized ? 8 : position.x,
        top: isMaximized ? 32 : position.y,
        width: isMaximized ? "calc(100vw - 16px)" : width,
        minHeight: isMaximized ? "calc(100vh - 72px)" : height,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      <div
        className="pixel-titlebar cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span className="text-primary">📄</span>
          <span className="text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMaximized((prev) => !prev);
            }}
            className="pixel-btn !px-2 !py-0 text-xs"
          >
            {isMaximized ? "🗗" : "🗖"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="pixel-btn !px-2 !py-0 hover:!bg-destructive"
          >
            ✕
          </button>
        </div>
      </div>
      <div
        className={`font-terminal text-lg text-foreground overflow-y-auto ${title.includes("Browser") ? "" : "p-4"}`}
        style={{
          maxHeight: isMaximized ? "calc(100vh - 112px)" : height - 40,
          height: title.includes("Browser")
            ? isMaximized
              ? "calc(100vh - 112px)"
              : height - 40
            : undefined,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default PixelWindow;
