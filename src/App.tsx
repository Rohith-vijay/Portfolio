import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";

// Components
import { CustomCursor } from "./components/cursor/CustomCursor";
import { BackgroundSystem } from "./components/effects/BackgroundSystem";
import { Navbar } from "./components/layout/Navbar";
import { CommandPalette } from "./components/command/CommandPalette";
import { ProjectModal } from "./components/ui/ProjectModal";

// Sections
import { Loading } from "./sections/Loading";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { CurrentlyBuilding } from "./sections/CurrentlyBuilding";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { TrustShowcase } from "./sections/TrustShowcase";
import { Experience } from "./sections/Experience";
import { LeadershipSocialImpact } from "./sections/LeadershipSocialImpact";
import { Certifications } from "./sections/Certifications";
import { Achievements } from "./sections/Achievements";
import { GitHubStats } from "./sections/GitHubStats";
import { FutureRoadmap } from "./sections/FutureRoadmap";
import { VersionHistory } from "./sections/VersionHistory";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

// Types
import type { Project } from "./data/projects";

export default function App() {
  // Mount smooth scrolling
  useLenis();

  // App states
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<"/" | "/projects/trust-platform">("/");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Smooth route redirects
  const navigateTo = (path: "/" | "/projects/trust-platform") => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setCurrentRoute(path);
  };

  return (
    <>
      {/* 1. Global Interactive Cursor & Spotlight */}
      <CustomCursor />

      {/* 2. Welcome Startup Loader */}
      {!isLoaded && <Loading onComplete={() => setIsLoaded(true)} />}

      {/* 3. Layered Background canvas */}
      <BackgroundSystem />

      {/* Main Container */}
      {isLoaded && (
        <div className="relative min-h-screen text-soft-white select-none">
          
          {/* Header Navbar */}
          <Navbar onSearchClick={() => setIsSearchOpen(true)} />

          {/* Search Command Palette Overlay */}
          <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

          {/* Secondary Projects Detail Modal */}
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

          {/* Routed Views */}
          <AnimatePresence mode="wait">
            {currentRoute === "/" ? (
              <div key="portfolio-home">
                {/* Hero vision */}
                <Hero />

                {/* Chapter 1: About */}
                <About />

                {/* Chapter 2: Now building status board */}
                <CurrentlyBuilding />

                {/* Chapter 3: Skills Orbit Board */}
                <Skills />

                {/* Chapter 4: Projects */}
                <Projects 
                  onProjectSelect={(proj) => setActiveProject(proj)} 
                  onFlagshipSelect={() => navigateTo("/projects/trust-platform")}
                />

                {/* Chapter 5: Professional Journey */}
                <Experience />

                {/* Chapter 5.5: Leadership and Social Impact */}
                <LeadershipSocialImpact />

                {/* Chapter 6: Certifications Flip Matrix */}
                <Certifications />

                {/* Chapter 6.5: Milestones & Honors */}
                <Achievements />

                {/* Chapter 7: GitHub Dashboard */}
                <GitHubStats />

                {/* Chapter 8: Research Roadmap */}
                <FutureRoadmap />

                {/* Chapter 8.5: System Changelog */}
                <VersionHistory />

                {/* Chapter 9: Contact */}
                <Contact />

                {/* Footer notes */}
                <Footer />
              </div>
            ) : (
              <div key="flagship-case-study">
                {/* Flagship Case Study deep dive */}
                <TrustShowcase onBack={() => navigateTo("/")} />
                
                {/* Footer notes */}
                <Footer />
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
