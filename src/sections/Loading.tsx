import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

interface LoadingProps {
  onComplete: () => void;
}

export function Loading({ onComplete }: LoadingProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isExited, setIsExited] = useState(false);

  const messages = [
    "Initializing System Kernels...",
    "Retrieving Experience Logs...",
    "Importing Portfolio Case Studies...",
    "Compiling Technical Core Skills...",
    "Handshaking Security Protocols...",
    "Welcome, Guest."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random progress increments for natural feel
        const increment = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 20) setMessageIndex(0);
    else if (progress < 40) setMessageIndex(1);
    else if (progress < 60) setMessageIndex(2);
    else if (progress < 80) setMessageIndex(3);
    else if (progress < 95) setMessageIndex(4);
    else setMessageIndex(5);

    if (progress === 100) {
      const exitTimeout = setTimeout(() => {
        setIsExited(true);
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 600); // Wait for exit animation
        return () => clearTimeout(completeTimeout);
      }, 700);
      return () => clearTimeout(exitTimeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isExited && (
        <motion.div
          className="fixed inset-0 z-50 bg-bg-primary flex flex-col items-center justify-center select-none px-6"
          exit={{ 
            opacity: 0, 
            y: -100,
            filter: "blur(10px)",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
          }}
        >
          {/* Main loader panel */}
          <div className="w-full max-w-sm flex flex-col gap-6">
            {/* Logo animation */}
            <div className="flex items-center justify-center gap-3">
              <motion.div 
                className="w-12 h-12 rounded-xl bg-gradient-to-tr from-accent-crimson to-accent-orange flex items-center justify-center shadow-lg"
                initial={{ scale: 0.8, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Terminal size={24} className="text-soft-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold tracking-widest text-soft-white">ROHITH</span>
                <span className="text-xs font-mono text-accent-orange tracking-wider">PORTFOLIO V1.0</span>
              </div>
            </div>

            {/* Diagnostic console */}
            <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/2 font-mono text-[11px] text-muted-gray flex flex-col gap-2 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-1">
                <span className="text-accent-orange">BOOT_SEQUENCE</span>
                <span className="text-soft-white font-bold">{progress}%</span>
              </div>
              <div className="h-6 flex items-center">
                <span className="text-accent-crimson font-semibold mr-1.5">&gt;</span>
                <span className="text-soft-white select-all">{messages[messageIndex]}</span>
              </div>
              {/* Progress bar track */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                <motion.div 
                  className="h-full bg-gradient-to-r from-accent-crimson via-accent-orange to-accent-gold"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Subtitle brand mark */}
            <div className="text-center font-mono text-[9px] text-white/20 uppercase tracking-widest mt-2">
              Building Scalable Software That Creates Real-World Impact
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
