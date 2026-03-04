import { useEffect, useState } from "react";

interface PixelBrowserProps {
  defaultUrl?: string;
}

const IFRAME_BLOCKED_HOSTS = ["github.com", "www.github.com"];

const shouldOpenExternal = (target: string) => {
  try {
    const url = new URL(target);
    return IFRAME_BLOCKED_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
};

const normalizeUrl = (raw: string) => {
  let target = raw.trim();
  if (!target.startsWith("http://") && !target.startsWith("https://")) {
    target = "https://" + target;
  }
  return target;
};

const PixelBrowser = ({ defaultUrl = "https://www.google.com/webhp?igu=1" }: PixelBrowserProps) => {
  const [url, setUrl] = useState(defaultUrl);
  const [inputUrl, setInputUrl] = useState(defaultUrl);
  const [notice, setNotice] = useState<string | null>(null);

  const handleNavigateTo = (raw: string) => {
    if (!raw) return;
    const target = normalizeUrl(raw);
    if (shouldOpenExternal(target)) {
      window.open(target, "_blank", "noopener,noreferrer");
      setUrl("about:blank");
      setNotice("This site blocks embedding, so it was opened in your external browser.");
      return;
    }
    setNotice(null);
    setUrl(target);
  };

  const navigate = () => {
    handleNavigateTo(inputUrl);
  };

  useEffect(() => {
    if (defaultUrl) {
      handleNavigateTo(defaultUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openExternal = () => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col h-full gap-0 relative">
      {/* Browser toolbar */}
      <div className="flex items-center gap-1 p-1 border-b-2 border-border bg-secondary/80">
        <button
          className="pixel-btn !text-[9px] !px-2"
          onClick={() => {
            setInputUrl(defaultUrl);
            handleNavigateTo(defaultUrl);
          }}
        >
          🏠
        </button>
        <button className="pixel-btn !text-[9px] !px-2" onClick={() => handleNavigateTo(url)}>🔄</button>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate()}
          className="flex-1 bg-background border-2 border-border px-2 py-[2px] font-terminal text-sm text-foreground outline-none focus:border-primary"
          placeholder="Enter URL..."
        />
        <button className="pixel-btn !text-[9px] !px-3" onClick={navigate}>GO</button>
      </div>
      {notice && (
        <div className="px-3 py-1 text-[11px] text-yellow-400 bg-black/70 border-b border-border">
          {notice}
        </div>
      )}
      {/* iframe */}
      <iframe
        src={url}
        className="flex-1 w-full border-none bg-foreground"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title="PixelBrowser"
        style={{ minHeight: 340 }}
      />
      <button
        type="button"
        onClick={openExternal}
        className="pixel-btn !text-[9px] !px-3 !py-1 absolute bottom-2 right-2 z-10"
      >
        ↗ External Browser
      </button>
    </div>
  );
};

export default PixelBrowser;
