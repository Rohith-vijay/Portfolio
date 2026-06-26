import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Github } from "../components/ui/BrandIcons";
import { projects } from "../data/projects";

interface TrustShowcaseProps {
  onBack: () => void;
}

export function TrustShowcase({ onBack }: TrustShowcaseProps) {
  const project = projects.find((p) => p.id === "trust-platform")!;

  return (
    <motion.main 
      className="min-h-screen w-full bg-bg-primary text-soft-white relative z-20 py-28 px-6 md:px-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Scroll to Top helper on render */}
      <span className="hidden" ref={() => window.scrollTo(0, 0)} />

      <div className="max-w-4xl mx-auto flex flex-col gap-12 text-left">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-cyan hover:text-soft-white transition-colors cursor-pointer select-none"
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </button>

        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-3 py-0.5 rounded-full">
              FLAGSHIP ENGINEERING SPEC
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[10px] font-mono text-muted-gray uppercase">PRODUCTION ACTIVE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-soft-white tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-muted-gray font-display font-medium max-w-2xl">
            {project.tagline}
          </p>
        </div>

        {/* Big Showcase Cover */}
        <div className="w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden relative bg-slate-950 border border-white/10 shadow-2xl">
          <img
            src={project.mockupUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 filter brightness-90 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent" />
        </div>

        {/* Impact Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.metrics.map((met) => (
            <div key={met.label} className="glass-panel p-6 rounded-xl text-center flex flex-col gap-1.5 border border-white/5 bg-white/2 shadow-lg">
              <span className="text-2xl md:text-3xl font-display font-extrabold text-accent-cyan">{met.value}</span>
              <span className="text-[9px] font-mono text-muted-gray uppercase tracking-wider">{met.label}</span>
            </div>
          ))}
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
          {/* Main write-up Left (8 Cols) */}
          <div className="md:col-span-8 flex flex-col gap-8">
            {/* Overview / Context */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-soft-white font-display border-b border-white/5 pb-2">
                1. Project Objectives &amp; Context
              </h3>
              <p className="text-sm leading-relaxed text-muted-gray font-sans">
                Charitable foundations often encounter operational hurdles due to fragmented spreadsheets, manual volunteer assignment coordinates, and unverified donation entries.
              </p>
              <p className="text-sm leading-relaxed text-muted-gray font-sans">
                The **Trust NGO Platform** resolves these overhead costs by delivering an integrated, role-segregated dashboard. Admin managers coordinate community drives, volunteers log execution hours, and donators access public causa portals.
              </p>
            </div>

            {/* Architecture Node Map */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-soft-white font-display border-b border-white/5 pb-2">
                2. System Architecture
              </h3>
              <div className="p-6 rounded-2xl glass-panel bg-white/1 border border-white/5 flex flex-col gap-4 items-center">
                {/* Custom Vector Flowchart */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
                  
                  {/* Client */}
                  <div className="px-4 py-2.5 rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 text-center flex flex-col gap-1 w-32 shadow-md">
                    <span className="text-[10px] font-mono text-accent-cyan">CLIENT LAYER</span>
                    <span className="text-xs font-semibold font-display">React + Vite</span>
                  </div>

                  <div className="h-4 w-[1px] md:h-[1px] md:w-8 bg-white/20" />

                  {/* Gateway */}
                  <div className="px-4 py-2.5 rounded-lg border border-accent-purple/20 bg-accent-purple/5 text-center flex flex-col gap-1 w-32 shadow-md">
                    <span className="text-[10px] font-mono text-accent-purple">GATEWAY / JWT</span>
                    <span className="text-xs font-semibold font-display">Security Filters</span>
                  </div>

                  <div className="h-4 w-[1px] md:h-[1px] md:w-8 bg-white/20" />

                  {/* REST Services */}
                  <div className="px-4 py-2.5 rounded-lg border border-accent-blue/20 bg-accent-blue/5 text-center flex flex-col gap-1 w-32 shadow-md">
                    <span className="text-[10px] font-mono text-accent-blue">API BACKBONE</span>
                    <span className="text-xs font-semibold font-display">Spring Boot</span>
                  </div>

                  <div className="h-4 w-[1px] md:h-[1px] md:w-8 bg-white/20" />

                  {/* Database */}
                  <div className="px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-center flex flex-col gap-1 w-32 shadow-md">
                    <span className="text-[10px] font-mono text-white/30">DATABASE</span>
                    <span className="text-xs font-semibold font-display">PostgreSQL</span>
                  </div>

                </div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">
                  STATELESS REST TRANSACTION PIPELINE
                </span>
              </div>
            </div>

            {/* Performance bottlenecks */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-soft-white font-display border-b border-white/5 pb-2">
                3. Database Concurrency &amp; Index Optimizations
              </h3>
              <p className="text-sm leading-relaxed text-muted-gray font-sans">
                During high-traffic donation events, concurrent database operations caused record lock contentions in PostgreSQL. To mitigate thread blocking, the connection pool configuration was overhauled:
              </p>
              
              {/* Terminal Code Mock */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-white/5 font-mono text-[11px] text-muted-gray flex flex-col gap-1 shadow-inner">
                <div className="text-white/30 pb-1 mb-1 border-b border-white/5"># application.yml (HikariCP config)</div>
                <div>spring:</div>
                <div className="pl-4">datasource:</div>
                <div className="pl-8">hikari:</div>
                <div className="pl-12 text-accent-cyan">maximum-pool-size: 25</div>
                <div className="pl-12 text-accent-cyan">minimum-idle: 8</div>
                <div className="pl-12 text-accent-cyan">connection-timeout: 20000 # 20s max queue wait</div>
                <div className="pl-12 text-accent-cyan">idle-timeout: 300000 # 5 min</div>
              </div>

              <p className="text-sm leading-relaxed text-muted-gray font-sans mt-2">
                Additionally, database indexing patterns were optimized. Composite indexes were mapped to speed up volunteer event searches, reducing queries from linear sweeps to direct scans:
              </p>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-white/5 font-mono text-[11px] text-accent-cyan flex flex-col gap-1 shadow-inner">
                <div>CREATE INDEX idx_volunteer_event ON t_volunteer_registry (event_id, volunteer_id);</div>
                <div>CREATE INDEX idx_donation_date ON t_donation_ledger (donation_date DESC);</div>
              </div>
            </div>
          </div>

          {/* Sidebar right (4 Cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Tech details */}
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 border border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan border-b border-white/5 pb-2">
                System Specs
              </h4>
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-white/40">Backend Engine</span>
                  <span className="font-semibold text-soft-white font-display">Spring Boot v3.2</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/40">Stateless Security</span>
                  <span className="font-semibold text-soft-white font-display">Spring Security + JWT</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/40">ORM Framework</span>
                  <span className="font-semibold text-soft-white font-display">Spring Data JPA / Hibernate</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/40">Database Engine</span>
                  <span className="font-semibold text-soft-white font-display">PostgreSQL v16</span>
                </div>
              </div>
            </div>

            {/* API Endpoints Terminal Mock */}
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 border border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan border-b border-white/5 pb-2">
                REST Gateways
              </h4>
              <div className="flex flex-col gap-3 font-mono text-[10px]">
                <div className="flex flex-col gap-1">
                  <span className="text-green-400 font-bold">POST</span>
                  <span className="text-soft-white">/api/v1/auth/login</span>
                  <span className="text-white/30 text-[9px]">Stateless login payload</span>
                </div>
                <div className="flex flex-col gap-1 border-t border-white/5 pt-2">
                  <span className="text-blue-400 font-bold">GET</span>
                  <span className="text-soft-white">/api/v1/donations</span>
                  <span className="text-white/30 text-[9px]">Authed causes statistics</span>
                </div>
                <div className="flex flex-col gap-1 border-t border-white/5 pt-2">
                  <span className="text-green-400 font-bold">POST</span>
                  <span className="text-soft-white">/api/v1/events/register</span>
                  <span className="text-white/30 text-[9px]">Transaction booking engine</span>
                </div>
              </div>
            </div>

            {/* Launch actions */}
            <div className="flex flex-col gap-3 mt-2">
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-soft-white transition-colors cursor-pointer select-none"
              >
                <Github size={14} />
                <span>Download GitHub Source</span>
              </a>

              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-xs font-semibold text-soft-white transition-colors cursor-pointer select-none shadow-lg"
              >
                <ExternalLink size={14} />
                <span>Launch Live Application</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </motion.main>
  );
}
