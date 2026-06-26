import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Github, Linkedin } from "../components/ui/BrandIcons";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("submitting");
    setTimeout(() => {
      console.log("Contact form submitted:", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }, 1500);
  };

  return (
    <SectionWrapper id="contact" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan">09 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          Let's Build Together
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan mt-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 text-left">
        
        {/* Left Column: Context details (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold font-display text-soft-white">Start a Conversation</h3>
            <p className="text-xs leading-relaxed text-muted-gray font-sans">
              Have an enterprise database index problem, a Spring Boot microservice pipeline, or want to collaborate on AI agent projects? Shoot me a message!
            </p>
          </div>

          {/* Social info blocks */}
          <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
            <a 
              href="mailto:rohithvijay.cse@gmail.com" 
              className="flex items-center gap-3.5 text-xs text-muted-gray hover:text-soft-white transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-white/3 border border-white/5 text-accent-purple">
                <Mail size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">Direct Email</span>
                <span className="font-semibold">rohithvijay.cse@gmail.com</span>
              </div>
            </a>

            <a 
              href="https://linkedin.com/in/rohith-vijay" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3.5 text-xs text-muted-gray hover:text-soft-white transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-white/3 border border-white/5 text-accent-blue">
                <Linkedin size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">LinkedIn Network</span>
                <span className="font-semibold">linkedin.com/in/rohith-vijay</span>
              </div>
            </a>

            <a 
              href="https://github.com/rohithvijay" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3.5 text-xs text-muted-gray hover:text-soft-white transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-white/3 border border-white/5 text-accent-cyan">
                <Github size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">GitHub Repositories</span>
                <span className="font-semibold">github.com/rohithvijay</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Form (7 Cols) */}
        <div className="lg:col-span-7 w-full">
          <form 
            onSubmit={handleSubmit}
            className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 bg-white/1 flex flex-col gap-5 shadow-2xl relative"
          >
            {/* Status alerts */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div 
                  className="flex items-center gap-2 p-3 rounded-lg bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <CheckCircle2 size={16} />
                  <span>Your message has been transmitted successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest pl-1">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. John Doe"
                disabled={status === "submitting"}
                className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/5 hover:border-white/10 focus:border-accent-cyan outline-none text-xs text-soft-white transition-all font-sans"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest pl-1">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="e.g. john@company.com"
                disabled={status === "submitting"}
                className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/5 hover:border-white/10 focus:border-accent-cyan outline-none text-xs text-soft-white transition-all font-sans"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest pl-1">Message Detail</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Briefly detail your proposal..."
                disabled={status === "submitting"}
                className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/5 hover:border-white/10 focus:border-accent-cyan outline-none text-xs text-soft-white transition-all font-sans resize-none"
              />
            </div>

            {/* Submission button */}
            <button
              type="submit"
              disabled={status === "submitting" || !form.name || !form.email || !form.message}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue disabled:from-white/10 disabled:to-white/10 disabled:text-white/20 disabled:cursor-not-allowed text-xs font-bold text-soft-white mt-2 transition-all duration-300 cursor-pointer shadow-lg select-none"
            >
              {status === "submitting" ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={12} />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </SectionWrapper>
  );
}
