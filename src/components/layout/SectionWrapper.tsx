import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { usePrefersReduced } from "../../hooks/usePrefersReduced";

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  delay?: number;
}

export function SectionWrapper({ children, id, className, delay = 0 }: SectionWrapperProps) {
  const prefersReduced = usePrefersReduced();

  const variants = {
    hidden: { 
      opacity: 0, 
      y: prefersReduced ? 0 : 30, 
      filter: prefersReduced ? "none" : "blur(6px)" 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // Expressive ease-out curve
      }
    }
  };

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -15% 0px" }}
      variants={variants}
      className={cn("py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12 relative z-20 overflow-hidden", className)}
    >
      {children}
    </motion.section>
  );
}
