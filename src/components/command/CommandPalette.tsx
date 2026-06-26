import { useState, useEffect, useRef } from "react";
import { Search, Terminal, CornerDownLeft } from "lucide-react";
import { navigationItems } from "../../data/navigation";
import { cn } from "../../utils/cn";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Ctrl+K shortcut toggle
  useEffect(() => {
    const handleToggle = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
    };
    window.addEventListener("keydown", handleToggle);
    return () => window.removeEventListener("keydown", handleToggle);
  }, [isOpen, onClose]);

  // Handle keyboard navigation and vim hotkey sequential triggers
  useEffect(() => {
    let keysPressed = "";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle commands inside open palette
      if (isOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleAction(filteredItems[selectedIndex]);
          }
        }
        return;
      }

      // Check standard text fields to ignore global hotkeys
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      keysPressed += e.key.toLowerCase();
      if (keysPressed.length > 2) {
        keysPressed = keysPressed.slice(-2);
      }

      const actions: Record<string, string> = {
        gw: "welcome",
        ga: "about",
        gs: "skills",
        gp: "projects",
        ge: "experience",
        gc: "contact"
      };

      if (actions[keysPressed]) {
        scrollToSection(actions[keysPressed]);
        keysPressed = "";
      } else if (keysPressed === "dr") {
        triggerResumeDownload();
        keysPressed = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, query]);

  // Refocus input field on opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Close palette on outer click
  useEffect(() => {
    const handleOuterClick = (e: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOuterClick);
    return () => document.removeEventListener("mousedown", handleOuterClick);
  }, [isOpen, onClose]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 90;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  const triggerResumeDownload = () => {
    alert("Resume is currently a TODO / Coming Soon. Please contact Komma Rohith Vijay directly via email.");
  };

  const handleAction = (item: any) => {
    if (item.type === "navigation") {
      scrollToSection(item.id);
    } else if (item.type === "action") {
      triggerResumeDownload();
    } else if (item.type === "social") {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
    onClose();
  };

  const paletteItems = [
    ...navigationItems.map((nav) => ({
      id: nav.href.replace("#", ""),
      title: `Go to ${nav.label}`,
      category: "Navigation",
      shortcut: nav.shortcut,
      type: "navigation"
    })),
    {
      id: "resume",
      title: "Download Resume PDF (TODO / Coming Soon)",
      category: "Actions",
      shortcut: "D R",
      type: "action"
    },
    {
      id: "github",
      title: "Visit GitHub Profile",
      category: "Socials",
      shortcut: "↗",
      type: "social",
      url: "https://github.com/Rohith-vijay"
    },
    {
      id: "linkedin",
      title: "Connect on LinkedIn",
      category: "Socials",
      shortcut: "↗",
      type: "social",
      url: "https://www.linkedin.com/in/rohithvijayk/"
    }
  ];

  const filteredItems = paletteItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4 select-none">
      <div 
        ref={containerRef}
        className="w-full max-w-xl glass-panel rounded-xl overflow-hidden border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.6)]"
      >
        {/* Search header bar */}
        <div className="flex items-center gap-3 px-4 border-b border-white/5 bg-white/2">
          <Search size={18} className="text-muted-gray" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 bg-transparent outline-none border-none text-soft-white placeholder-muted-gray text-sm font-sans"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-soft-white font-mono">ESC</kbd>
        </div>

        {/* Action list */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-muted-gray flex flex-col items-center justify-center gap-2">
              <Terminal size={20} />
              <span className="text-xs">No command matched your query</span>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = selectedIndex === index;
              return (
                <div
                  key={item.id}
                  onClick={() => handleAction(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150",
                    isSelected ? "bg-white/10 text-soft-white" : "text-muted-gray hover:text-soft-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Terminal size={14} className={cn("transition-colors", isSelected ? "text-accent-orange" : "text-white/20")} />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/40">
                      {item.category}
                    </span>
                    {isSelected ? (
                      <CornerDownLeft size={12} className="text-accent-orange animate-pulse" />
                    ) : (
                      <span className="text-[10px] font-mono text-white/30 w-8 text-right">{item.shortcut}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/2 border-t border-white/5 text-[10px] text-white/30 font-mono">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigation</span>
            <span>•</span>
            <span>↵ Select</span>
          </div>
          <div>
            <span>Vim sequence: g+p, g+c, d+r</span>
          </div>
        </div>
      </div>
    </div>
  );
}
