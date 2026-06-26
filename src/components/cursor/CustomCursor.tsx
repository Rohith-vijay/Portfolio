import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReduced } from "../../hooks/usePrefersReduced";

export function CustomCursor() {
  const prefersReduced = usePrefersReduced();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (prefersReduced) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".interactive-hover") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA";
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Hide standard browser cursor
    document.documentElement.classList.add("hide-cursor");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("hide-cursor");
    };
  }, [cursorX, cursorY, isVisible, prefersReduced]);

  if (prefersReduced || !isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-cyan/80 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-screen shadow-[0_0_10px_rgba(56,189,248,0.3)]"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? "rgba(56, 189, 248, 0.15)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-purple pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(124,58,237,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
