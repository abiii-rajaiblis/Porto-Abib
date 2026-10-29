import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolio';
import { ProjectCover } from './ProjectIllustrations';
import { ProjectModal } from './ProjectModal';
import { ScrollReveal } from './ScrollReveal';

export const ProjectsSection: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const handleInspectProject = (project: Project) => {
    setActiveModalProject(project);
  };

  return (
    <section id="projects" className="relative py-20 lg:py-28 bg-[#0a0a0a] text-[#f7f5f2] overflow-hidden select-none">
      {/* Background Halftone & Diagonal Speed Slits */}
      <div className="absolute inset-0 bg-halftone-dynamic opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b-2 border-[#e60012] pb-6">
          <div>
            <div className="inline-block px-3 py-1 bg-[#e60012] text-[#080808] font-p5-impact text-xs tracking-widest uppercase transform -rotate-2 mb-2 p5-shadow-black">
              CHAPTER 03 // TARGET OPERATIONS
            </div>
            <h2 className="font-p5-display text-4xl sm:text-6xl font-bold tracking-wider text-[#f7f5f2]">
              FEATURED <span className="text-[#ff1b2d]">MISSIONS</span>
            </h2>
          </div>
          <p className="font-p5-mono text-xs text-[#b9b9b9] max-w-sm">
            SELECT ANY OPERATION CARD TO INSPECT ARCHITECTURAL LOGS &amp; PRODUCTION BLUEPRINTS.
          </p>
        </div>

        {/* Asymmetrical 2x2 Bento / Editorial Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, idx) => {
            return (
              <ScrollReveal
                key={project.id}
                direction="up"
                delay={idx * 120}
                className="h-full"
              >
                <div
                  onClick={() => handleInspectProject(project)}
                  className="group relative bg-[#141414] border-2 border-[#262626] hover:border-[#ff1b2d] p5-cut-corner-lg transition-all duration-200 hover:-translate-y-1.5 p5-shadow-black hover:shadow-[8px_8px_0px_#e60012] flex flex-col justify-between overflow-hidden h-full cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleInspectProject(project);
                    }
                  }}
                  aria-label={`Inspect ${project.title} details`}
                >
                  {/* Slanted Card Header Badge */}
                  <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-[#242424] bg-[#111111]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#e60012] rotate-45 inline-block" />
                      <span className="font-p5-impact text-xs tracking-widest text-[#ff1b2d] uppercase">
                        {project.badge}
                      </span>
                    </div>
                    <span className="font-p5-mono text-[11px] text-[#b9b9b9] uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Cover Visual Frame */}
                  <div className="relative w-full aspect-[16/9] border-b border-[#242424] overflow-hidden">
                    <ProjectCover slug={project.slug} />

                    {/* Corner Action Tag */}
                    <div className="absolute bottom-2 right-2 bg-[#080808]/90 border border-[#ff1b2d] px-2 py-0.5 font-p5-mono text-[10px] text-[#f7f5f2] transform -rotate-2">
                      CLICK TO INSPECT
                    </div>
                  </div>

                  {/* Card Body & Editorial Typography */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-p5-display text-3xl sm:text-4xl font-bold text-[#f7f5f2] group-hover:text-[#ff1b2d] transition-colors tracking-wide mb-1">
                        {project.title}
                      </h3>
                      
                      <p className="font-p5-impact text-sm text-[#ff1b2d] tracking-wide uppercase mb-3">
                        {project.tagline}
                      </p>

                      <p className="font-p5-body text-xs sm:text-sm text-[#b9b9b9] leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights Bullet List */}
                    <div className="pt-2">
                      <ul className="space-y-1.5 font-p5-body text-xs text-[#d1d1d1]">
                        {project.highlights.slice(0, 2).map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-1.5">
                            <span className="text-[#e60012] font-bold">★</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Unboxed Tech Stack (Zero-Pill Discipline) */}
                    <div className="pt-2 border-t border-[#1f1f1f]">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs font-p5-mono text-[#a0a0a0]">
                        {project.stack.map((tech, tIdx) => (
                          <React.Fragment key={tech}>
                            <span className="text-[#f7f5f2]">{tech}</span>
                            {tIdx < project.stack.length - 1 && <span className="text-[#ff1b2d]">/</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Buttons */}
                    <div className="flex items-center gap-3 pt-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspectProject(project);
                        }}
                        className="flex-1 py-2.5 bg-[#e60012] group-hover:bg-[#ff1b2d] text-[#080808] font-p5-impact text-sm tracking-wider uppercase transition-colors p5-shadow-black cursor-pointer text-center focus-visible:outline-2 focus-visible:outline-white"
                      >
                        INSPECT MISSION DETAILS ▶
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3.5 py-2.5 bg-[#080808] text-[#f7f5f2] hover:text-[#ff1b2d] border border-[#2a2a2a] hover:border-[#ff1b2d] font-p5-mono text-xs transition-colors cursor-pointer"
                        title="View GitHub Repository"
                        aria-label={`View GitHub repository for ${project.title}`}
                      >
                        REPO ↗
                      </a>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>

      {/* Project Detail Modal with Multi-Mission Switching */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onSelectProject={(proj) => setActiveModalProject(proj)}
      />
    </section>
  );
};
