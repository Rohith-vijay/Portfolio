import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ChevronDown, Sparkles } from "lucide-react";
import { Github, Linkedin } from "../components/ui/BrandIcons";
import { FloatingScene } from "../components/three/FloatingScene";
import { usePrefersReduced } from "../hooks/usePrefersReduced";

export function Hero() {
  const prefersReduced = usePrefersReduced();
  
  // Custom Typewriter Hook logic
  const roles = [
    "Full-Stack Developer",
    "Computer Science Engineering Student specializing in Generative AI",
    "Vice President of K V G Shanmukh Sai Trust",
    "Someone building technology that creates meaningful real-world impact."
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    const fullText = roles[roleIndex];

    const handleType = () => {
      if (isDeleting) {
        setDisplayText((prev) => prev.slice(0, -1));
      } else {
        setDisplayText((prev) => fullText.slice(0, prev.length + 1));
      }

      if (!isDeleting && displayText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before erase
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const speed = isDeleting ? 40 : 80;
    if (displayText !== fullText || isDeleting) {
      timer = setTimeout(handleType, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

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

  return (
    <section 
      id="welcome" 
      className="min-h-screen w-full flex items-center justify-center relative pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          {/* Top greeting badge */}
          <motion.div 
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/8 backdrop-blur-md text-[11px] font-mono text-accent-orange tracking-wider shadow-inner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={12} className="text-accent-crimson animate-pulse" />
            <span>AVAILABLE FOR SPRING 2026 ENGAGEMENTS</span>
          </motion.div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <motion.h1 
              className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-soft-white leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Hi, I'm <span className="text-gradient-crimson-orange">Rohith Vijay</span>
            </motion.h1>
            
            {/* Typewriter role line */}
            <motion.div 
              className="h-10 flex items-center text-xl md:text-3xl font-display font-semibold text-muted-gray"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>A&nbsp;</span>
              <span className="text-gradient-orange-gold border-r-2 border-accent-orange/80 pr-1 animate-pulse">
                {displayText}
              </span>
            </motion.div>
          </div>

          {/* Subtitle Tagline */}
          <motion.p 
            className="text-base md:text-lg text-muted-gray max-w-xl leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Building Scalable Software That Creates Real-World Impact. Specializing in enterprise full-stack design, Spring architectures, and AI agent optimization.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent-crimson via-accent-orange to-accent-gold text-sm font-bold text-soft-white shadow-lg shadow-accent-orange/10 hover:scale-102 hover:shadow-accent-orange/20 transition-all duration-300 interactive-hover cursor-pointer"
            >
              Explore Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-lg bg-white/5 border border-white/8 hover:bg-white/10 text-sm font-semibold text-soft-white transition-all duration-300 interactive-hover cursor-pointer"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social connections panel */}
          <motion.div 
            className="flex items-center gap-4 mt-6 border-t border-white/5 pt-6 w-full max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a 
              href="https://github.com/rohithvijay" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/3 border border-white/5 text-muted-gray hover:text-soft-white hover:bg-white/5 transition-all duration-300 interactive-hover"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/rohith-vijay" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/3 border border-white/5 text-muted-gray hover:text-soft-white hover:bg-white/5 transition-all duration-300 interactive-hover"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="mailto:rohithvijay.cse@gmail.com" 
              className="p-2.5 rounded-lg bg-white/3 border border-white/5 text-muted-gray hover:text-soft-white hover:bg-white/5 transition-all duration-300 interactive-hover"
              aria-label="Email Contact"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right 3D Visualizer column */}
        <motion.div 
          className="lg:col-span-5 flex justify-center items-center relative"
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full relative aspect-square lg:aspect-auto">
            <FloatingScene />
          </div>
        </motion.div>
      </div>

      {/* Animated scroll down indicator */}
      {!prefersReduced && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 z-20 cursor-pointer"
          onClick={() => scrollToSection("about")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-gray">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={14} className="text-soft-white" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
