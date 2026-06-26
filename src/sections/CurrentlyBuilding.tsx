import { motion } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { Terminal, Activity, Brain, Server } from "lucide-react";

export function CurrentlyBuilding() {
  const tasks = [
    {
      title: "Production NGO Management Platform",
      category: "Full-Stack Dev",
      status: "ACTIVE_STREAM",
      desc: "Refining donation transaction filters and scheduling crons to dispatch receipts securely. Tuning DB connection indexing on PostgreSQL.",
      icon: Terminal,
      color: "from-accent-crimson to-accent-orange",
      glow: "rgba(239, 68, 68, 0.15)",
      progress: 90
    },
    {
      title: "Learning AI & Agentic Systems",
      category: "Research",
      status: "STABLE_BUILD",
      desc: "Investigating agent-to-agent communication layers, LLM orchestration frameworks, and memory persistence mechanisms.",
      icon: Brain,
      color: "from-accent-orange to-accent-gold",
      glow: "rgba(249, 115, 22, 0.15)",
      progress: 75
    },
    {
      title: "Building Enterprise Spring Boot Applications",
      category: "Backend Dev",
      status: "ACTIVE_STREAM",
      desc: "Configuring multi-tenant JWT middleware filters and building transaction rollback test beds to prevent seat allocation overlaps.",
      icon: Server,
      color: "from-accent-gold to-accent-crimson",
      glow: "rgba(234, 179, 8, 0.15)",
      progress: 85
    },
    {
      title: "Learning Data Structures & Algorithms",
      category: "Problem Solving",
      status: "DAILY_RUN",
      desc: "Solving graph Sweep traversal challenges and dynamic programming structures. Practicing index-aligned matrix partitions.",
      icon: Activity,
      color: "from-accent-crimson to-accent-gold",
      glow: "rgba(239, 68, 68, 0.15)",
      progress: 80
    }
  ];

  return (
    <SectionWrapper id="now-building" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-orange">02 / CHAPTER</span>
        <div className="flex items-center gap-2">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
            Currently Building
          </h2>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
          />
        </div>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-crimson to-accent-orange mt-1" />
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {tasks.map((task, idx) => {
          const Icon = task.icon;
          return (
            <motion.div
              key={task.title}
              className="glass-panel p-6 rounded-xl flex flex-col gap-4 relative overflow-hidden group border-glow-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              {/* Top border color strip */}
              <div className={`absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r ${task.color}`} />
              
              {/* Header metrics */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-soft-white">
                    <Icon size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-soft-white font-display">{task.category}</span>
                    <span className="text-[9px] font-mono text-muted-gray uppercase">{task.status}</span>
                  </div>
                </div>
                
                {/* Blink indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-[9px] font-mono text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Main text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-soft-white font-display leading-snug group-hover:text-accent-orange transition-colors">
                  {task.title}
                </h3>
                <p className="text-xs text-muted-gray leading-relaxed font-sans">
                  {task.desc}
                </p>
              </div>

              {/* Focus Progress Bar */}
              <div className="flex flex-col gap-1 mt-auto pt-4">
                <div className="flex items-center justify-between text-[9px] font-mono text-white/40">
                  <span>SYSTEM_LOAD_LEVEL</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${task.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${task.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
