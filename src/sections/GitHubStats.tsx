import { motion } from "framer-motion";
import { SectionWrapper } from "../components/layout/SectionWrapper";
import { BookOpen, Flame, Code } from "lucide-react";
import { Github } from "../components/ui/BrandIcons";

export function GitHubStats() {
  // Pinned repositories data mock
  const pinnedRepos = [
    {
      name: "trust-ngo-platform",
      desc: "Enterprise management panel connecting volunteers and managing secure donation ledgers. Spring Boot microservices backend.",
      lang: "Java",
      langColor: "#b07219"
    },
    {
      name: "crediflow",
      desc: "Real-time personal finance visualizer and credit risk calculation dashboard. Node.js backend streams.",
      lang: "JavaScript",
      langColor: "#f1e05a"
    },
    {
      name: "greenbites",
      desc: "Eco-conscious food ordering and delivery router calculating carbon offsets with Leaflet API.",
      lang: "JavaScript",
      langColor: "#f1e05a"
    },
    {
      name: "smart-clinic",
      desc: "Digital patient scheduling board and real-time STOMP queue synchronization system.",
      lang: "Java",
      langColor: "#b07219"
    },
    {
      name: "railway-reservation",
      desc: "Seat allocation transaction controller with optimistic and pessimistic locking deadlock mitigation.",
      lang: "Java",
      langColor: "#b07219"
    }
  ];

  // Language shares
  const languages = [
    { name: "Java", pct: 50, color: "bg-[#b07219]" },
    { name: "TypeScript", pct: 25, color: "bg-[#3178c6]" },
    { name: "Python", pct: 15, color: "bg-[#3572A5]" },
    { name: "SQL & Other", pct: 10, color: "bg-[#f1e05a]" }
  ];

  return (
    <SectionWrapper id="experience" className="flex flex-col gap-12">
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-accent-orange">05 / CHAPTER</span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-soft-white tracking-tight">
          GitHub Developer Dashboard
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-accent-crimson to-accent-orange mt-1" />
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 text-left">
        
        {/* Left Column: Contributions & Language splits (5 Cols) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Card 1: Streak stats */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 bg-white/2 flex flex-col gap-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <Flame size={18} />
              </div>
              <h4 className="font-display font-bold text-soft-white text-sm">Commit Metrics</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-muted-gray uppercase">Total Contributions</span>
                <span className="text-sm font-display font-bold text-accent-orange uppercase tracking-wider mt-1">Coming Soon</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-muted-gray uppercase">Commit Streak</span>
                <span className="text-sm font-display font-bold text-accent-orange uppercase tracking-wider mt-1">Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Card 2: Language splits */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 bg-white/2 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-orange/10 text-accent-orange">
                <Code size={18} />
              </div>
              <h4 className="font-display font-bold text-soft-white text-sm">Language Distribution</h4>
            </div>

            {/* Simulated bar chart representation */}
            <div className="flex h-3 w-full rounded-full overflow-hidden bg-white/5 mt-1">
              {languages.map((l) => (
                <div 
                  key={l.name} 
                  className={l.color} 
                  style={{ width: `${l.pct}%` }} 
                  title={`${l.name}: ${l.pct}%`}
                />
              ))}
            </div>

            {/* Legends list */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
              {languages.map((l) => (
                <div key={l.name} className="flex items-center gap-2 text-xs">
                  <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                  <span className="text-muted-gray">{l.name}</span>
                  <span className="text-[10px] font-mono text-white/40 ml-auto">{l.pct}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Pinned repositories list (7 Cols) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-gray uppercase">
              <BookOpen size={14} />
              <span>Pinned Repositories</span>
            </div>
            <a
              href="https://github.com/Rohith-vijay"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[10px] font-mono text-accent-orange hover:text-soft-white transition-colors"
            >
              <span>View All</span>
              <Github size={12} />
            </a>
          </div>

          {pinnedRepos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              className="glass-panel p-5 rounded-xl border border-white/5 bg-white/2 hover:border-white/10 transition-colors flex flex-col gap-3 group relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <a
                  href={`https://github.com/Rohith-vijay/${repo.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-soft-white font-display hover:text-accent-orange transition-colors"
                >
                  {repo.name}
                </a>
                
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                  Repository
                </span>
              </div>

              <p className="text-[11px] leading-relaxed text-muted-gray">
                {repo.desc}
              </p>

              {/* Language bullet */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40 mt-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                <span>{repo.lang}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
