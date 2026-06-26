import { useState, useEffect } from "react";
import { Menu, X, Terminal, Search } from "lucide-react";
import { navigationItems } from "../../data/navigation";
import { cn } from "../../utils/cn";

interface NavbarProps {
  onSearchClick: () => void;
}

export function Navbar({ onSearchClick }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("welcome");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky shadow states
      setIsScrolled(window.scrollY > 30);

      // Document scroll progress calculator
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Active Section Viewport Observer
      const scrollPosition = window.scrollY + 180;
      const items = navigationItems.map((nav) => nav.href.replace("#", ""));

      for (const id of items) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 90;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled ? "bg-bg-primary/70 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
      )}
    >
      {/* Top scroll progress track */}
      <div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-accent-crimson via-accent-orange to-accent-gold transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand sign */}
        <a 
          href="#welcome" 
          onClick={(e) => handleNavClick(e, "#welcome")}
          className="flex items-center gap-2 text-soft-white font-display font-bold text-xl tracking-wider select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-crimson to-accent-orange flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Terminal size={16} className="text-soft-white" />
          </div>
          <span>ROHITH<span className="text-accent-orange font-light group-hover:text-accent-crimson transition-colors duration-300">.VIJAY</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/8 rounded-full p-1.5 backdrop-blur-lg">
          {navigationItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative select-none",
                  isActive ? "text-soft-white" : "text-muted-gray hover:text-soft-white"
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-white/10 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.05)] border border-white/10" />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Search Palette Toggle Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/10 text-muted-gray hover:text-soft-white text-xs transition-all duration-300 interactive-hover"
          >
            <Search size={14} />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-soft-white font-mono select-none">⌘K</kbd>
          </button>
          
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-accent-crimson to-accent-orange hover:from-accent-orange hover:to-accent-gold text-sm font-semibold shadow-lg hover:shadow-accent-orange/20 transition-all duration-300 interactive-hover"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onSearchClick}
            className="p-2 rounded-lg bg-white/5 border border-white/8 text-muted-gray"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/8 text-soft-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Foldout */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[62px] left-0 w-full bg-bg-secondary/95 border-b border-white/10 backdrop-blur-xl z-30 animate-fade-in">
          <nav className="flex flex-col p-6 gap-4">
            {navigationItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-semibold",
                    isActive ? "bg-white/10 text-soft-white" : "text-muted-gray"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-white/30">{item.shortcut}</span>
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="mt-2 w-full py-3 rounded-lg bg-gradient-to-r from-accent-crimson to-accent-orange text-center font-bold text-soft-white"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
