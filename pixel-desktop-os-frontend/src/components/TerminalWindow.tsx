import { useEffect, useRef, useState } from "react";

type Line = {
  from: "user" | "system";
  text: string;
};

const BACKEND_BASE_URL = "http://localhost:8080";

const createSessionId = () => {
  if (window.crypto && "randomUUID" in window.crypto) {
    return window.crypto.randomUUID();
  }
  return `sess-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

const TerminalWindow = () => {
  const [lines, setLines] = useState<Line[]>([
    {
      from: "system",
      text: "Welcome to RohitOS terminal. Type 'rohit help' to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sessionId] = useState<string>(() => createSessionId());
  const [isBusy, setIsBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const appendLine = (from: "user" | "system", text: string) => {
    setLines((prev) => [...prev, { from, text }]);
  };

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || isBusy) return;

    appendLine("user", `rohit> ${trimmed}`);
    setInput("");
    setIsBusy(true);

    try {
      const resp = await fetch(`${BACKEND_BASE_URL}/api/terminal/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, command: trimmed }),
      });

      if (!resp.ok) {
        appendLine("system", `Error: HTTP ${resp.status}`);
      } else {
        const data: { output: string; action?: string } = await resp.json();
        if (data.action === "CLEAR") {
          setLines([]);
        }
        if (data.output && data.output.trim().length > 0) {
          const parts = data.output.split(/\r?\n/);
          parts.forEach((p) => appendLine("system", p));
        }
      }
    } catch (err) {
      appendLine("system", "Error: unable to reach backend.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full text-[13px]">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-2 pr-1 space-y-1 font-terminal"
      >
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={
              line.from === "user"
                ? "text-primary"
                : "text-muted-foreground whitespace-pre-wrap"
            }
          >
            {line.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-auto pt-1 border-t border-border">
        <span className="text-primary font-pixel text-[10px]">rohit&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isBusy}
          className="flex-1 bg-background border-2 border-border px-2 py-[2px] font-terminal text-sm text-foreground outline-none focus:border-primary"
          placeholder="type a command, e.g. rohit help"
        />
      </div>
    </div>
  );
};

export default TerminalWindow;

