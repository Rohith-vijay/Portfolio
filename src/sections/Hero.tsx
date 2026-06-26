import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ChevronDown, Sparkles } from "lucide-react";
import { Github, Linkedin } from "../components/ui/BrandIcons";
import { FloatingScene } from "../components/three/FloatingScene";
import { usePrefersReduced } from "../hooks/usePrefersReduced";

export function Hero() {
  const prefersReduced = usePrefersReduced();
  
  const roles = [
    "Full-Stack Developer",
    "Computer Science Engineering Student",
    "Generative AI Student",
    "Vice President • K V G Shanmukh Sai Trust",
    "Backend Engineer",
    "Software Problem Solver"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Project Sunrise Stages: dark -> sun-reveal -> ray-propagating -> content-reveal
  const [stage, setStage] = useState<"dark" | "sun-reveal" | "ray-propagating" | "content-reveal">("dark");

  useEffect(() => {
    if (prefersReduced) {
      setStage("content-reveal");
      return;
    }
    const t1 = setTimeout(() => setStage("sun-reveal"), 800);
    const t2 = setTimeout(() => setStage("ray-propagating"), 2300);
    const t3 = setTimeout(() => setStage("content-reveal"), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [prefersReduced]);

  useEffect(() => {
    if (stage !== "content-reveal") return;
    let timer: number;
    const fullText = roles[roleIndex];

    const handleType = () => {
      if (isDeleting) {
        setDisplayText((prev) => prev.slice(0, -1));
      } else {
        setDisplayText((prev) => fullText.slice(0, prev.length + 1));
      }

      if (!isDeleting && displayText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
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
  }, [displayText, isDeleting, roleIndex, stage]);

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
      className="min-h-screen w-full flex items-center justify-center relative pt-20 overflow-hidden bg-transparent"
    >
      {/* Cinematic Travelling Light Ray (First Ray) */}
      <AnimatePresence>
        {stage === "ray-propagating" && (
          <motion.div
            className="absolute h-[1.5px] bg-gradient-to-r from-accent-orange via-accent-gold to-white blur-[1px] z-50 pointer-events-none"
            initial={{ left: "80%", top: "45%", width: "0px", opacity: 0 }}
            animate={{ 
              left: ["80%", "40%", "15%"], 
              width: ["0px", "150px", "0px"],
              opacity: [0, 1, 1, 0] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left text column: Revealed by Sunlight */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <AnimatePresence>
            {stage === "content-reveal" && (
              <motion.div
                initial={{ opacity: 0, x: -30, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                animate={{ opacity: 1, x: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="flex flex-col items-start gap-6 w-full"
              >
                {/* Top greeting badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/8 backdrop-blur-md text-[11px] font-mono text-accent-orange tracking-wider shadow-inner">
                  <Sparkles size={12} className="text-accent-crimson animate-pulse" />
                  <span>AVAILABLE FOR SPRING 2026 ENGAGEMENTS</span>
                </div>

                {/* Title & Name */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-soft-white leading-[1.05]">
                    Hi, I'm <span className="text-reveal-ray bg-[position:0%_0%]">Komma Rohith Vijay</span>
                  </h1>
                  
                  {/* Typewriter role line */}
                  <div className="h-10 flex items-center text-xl md:text-3xl font-display font-semibold text-muted-gray">
                    <span>A&nbsp;</span>
                    <span className="text-gradient-orange-gold border-r-2 border-accent-orange/80 pr-1 animate-pulse">
                      {displayText}
                    </span>
                  </div>
                </div>

                {/* Subtitle Tagline */}
                <p className="text-base md:text-lg text-muted-gray max-w-xl leading-relaxed font-sans">
                  Building technology that creates meaningful real-world impact. Specializing in enterprise full-stack design, Spring Boot microservices, and AI agent optimization.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 mt-2">
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
                    Work With Me
                  </button>
                </div>

                {/* Social connections panel */}
                <div className="flex items-center gap-4 mt-6 border-t border-white/5 pt-6 w-full max-w-xs">
                  <a 
                    href="https://github.com/Rohith-vijay" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-white/3 border border-white/5 text-muted-gray hover:text-soft-white hover:bg-white/5 transition-all duration-300 interactive-hover"
                    aria-label="GitHub Profile"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/rohithvijayk/" 
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right 3D Visualizer column (The Sun Mesh) */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <AnimatePresence>
            {stage !== "dark" && (
              <motion.div 
                className="w-full relative aspect-square lg:aspect-auto"
                initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <FloatingScene />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Animated scroll down indicator */}
      {!prefersReduced && stage === "content-reveal" && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 z-20 cursor-pointer"
          onClick={() => scrollToSection("about")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
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
