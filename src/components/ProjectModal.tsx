import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Project, PORTFOLIO_DATA } from '../data/portfolio';
import { ProjectCover } from './ProjectIllustrations';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSelectProject }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { projects } = PORTFOLIO_DATA;

  // Swipe-to-dismiss gesture states
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);
  const isHeaderDrag = useRef(false);

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const prevProject = projects[(safeIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(safeIndex + 1) % projects.length];

  // Reset drag states when project opens or changes
  useEffect(() => {
    setDragY(0);
    setIsDragging(false);
    setIsDismissing(false);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onSelectProject) {
        onSelectProject(prevProject);
      } else if (e.key === 'ArrowRight' && onSelectProject) {
        onSelectProject(nextProject);
      }
    };

    if (project) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Always reset scroll to top on project switch
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }

      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [project, onClose, onSelectProject, prevProject, nextProject]);

  // Touch Gesture Handlers for Mobile Swipe Down to Dismiss
  const handleTouchStart = useCallback((e: React.TouchEvent, fromHeader = false) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartY.current = touch.clientY;
    touchStartX.current = touch.clientX;
    touchStartTime.current = performance.now();
    isHeaderDrag.current = fromHeader;
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1 || isDismissing) return;
    const touch = e.touches[0];
    const deltaY = touch.clientY - touchStartY.current;
    const deltaX = touch.clientX - touchStartX.current;

    // Determine gesture intent: if dragging upwards or primarily horizontal, do not intercept
    if (deltaY <= 0) {
      if (isDragging) {
        setDragY(0);
        setIsDragging(false);
      }
      return;
    }

    // If starting inside content, ensure user is scrolled at top
    const isAtTop = !contentRef.current || contentRef.current.scrollTop <= 0;
    if (!isHeaderDrag.current && !isAtTop) {
      return;
    }

    // Avoid horizontal scroll collision
    if (!isDragging && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      return;
    }

    // Apply Persona 5 dynamic elastic resistance past 120px
    const dampedY = deltaY < 120 ? deltaY : 120 + (deltaY - 120) * 0.45;
    setIsDragging(true);
    setDragY(dampedY);
  }, [isDismissing, isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || isDismissing) {
      setIsDragging(false);
      setDragY(0);
      return;
    }

    const elapsed = Math.max(1, performance.now() - touchStartTime.current);
    const velocity = dragY / elapsed; // px per ms

    // Snappy dismissal threshold: pulled > 80px or swiped with quick velocity > 0.4px/ms
    if (dragY > 80 || (velocity > 0.4 && dragY > 30)) {
      setIsDismissing(true);
      // Snappy exit transition
      setTimeout(() => {
        onClose();
      }, 190);
    } else {
      // Snap back smoothly
      setIsDragging(false);
      setDragY(0);
    }
  }, [dragY, isDragging, isDismissing, onClose]);

  if (!project) return null;

  // Dynamic backdrop opacity during drag
  const backdropAlpha = isDismissing
    ? 0
    : dragY > 0
    ? Math.max(0.2, 0.94 - (dragY / 350) * 0.74)
    : 0.94;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-8 backdrop-blur-md transition-colors duration-150"
      style={{ backgroundColor: `rgba(8, 8, 8, ${backdropAlpha})` }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      {/* Viewport Top-Right Persistent Floating Close Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[210] flex items-center gap-1.5 px-3 py-1.5 bg-[#e60012] text-[#080808] hover:bg-white hover:text-[#080808] border-2 border-[#080808] font-p5-impact text-xs sm:text-sm tracking-widest uppercase cursor-pointer p5-shadow-black transition-transform active:scale-95 touch-manipulation"
        aria-label="Close modal"
      >
        <span>CLOSE</span>
        <span className="font-bold text-sm">✕</span>
      </button>

      {/* Compact Persona 5 Modal Card with Swipe to Dismiss */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm sm:max-w-xl md:max-w-2xl max-h-[84vh] sm:max-h-[86vh] flex flex-col bg-[#141414] border-2 sm:border-3 border-[#ff1b2d] p5-cut-corner-lg p5-shadow-white shadow-2xl overflow-hidden cursor-default will-change-transform"
        style={{
          transform: isDismissing
            ? 'translateY(110vh) rotate(5deg)'
            : dragY > 0
            ? `translateY(${dragY}px) rotate(${dragY * 0.015}deg)`
            : 'translateY(0px)',
          opacity: isDismissing ? 0 : dragY > 0 ? Math.max(0.35, 1 - dragY / 320) : 1,
          transition: isDragging
            ? 'none'
            : isDismissing
            ? 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out'
            : 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Mobile Swipe-to-Dismiss Grab Bar */}
        <div
          className="md:hidden shrink-0 flex flex-col items-center justify-center pt-2 pb-1.5 bg-[#101010] border-b border-[#242424] cursor-grab active:cursor-grabbing select-none"
          onTouchStart={(e) => handleTouchStart(e, true)}
          aria-label="Swipe down to dismiss"
        >
          <div
            className={`h-1.5 rounded-full transition-all duration-150 ${
              dragY > 30 ? 'w-16 bg-[#ff1b2d]' : 'w-12 bg-[#f7f5f2]/40'
            }`}
          />
          <div className="flex items-center gap-1 font-p5-mono text-[9px] text-[#888] tracking-widest mt-1 uppercase">
            <span className="text-[#ff1b2d]">▼</span>
            <span>{dragY > 60 ? 'RELEASE TO CLOSE' : 'SWIPE DOWN TO CLOSE'}</span>
            <span className="text-[#ff1b2d]">▼</span>
          </div>
        </div>

        {/* Fixed Header Bar */}
        <div
          className="shrink-0 bg-[#e60012] text-[#080808] px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between border-b-2 border-[#080808] cursor-grab active:cursor-grabbing"
          onTouchStart={(e) => handleTouchStart(e, true)}
        >
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="px-2 py-0.5 bg-[#080808] text-[#f7f5f2] font-p5-impact text-[10px] sm:text-xs tracking-widest uppercase transform -rotate-3 shrink-0">
              {project.badge || 'MISSION'}
            </span>
            <span className="font-p5-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider truncate text-[#080808]">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Next/Prev switchers in header */}
            {onSelectProject && (
              <div className="hidden sm:flex items-center gap-1 mr-1">
                <button
                  type="button"
                  onClick={() => onSelectProject(prevProject)}
                  className="px-2 py-0.5 bg-[#080808] hover:bg-white text-[#f7f5f2] hover:text-[#080808] font-p5-impact text-[10px] tracking-wider uppercase cursor-pointer"
                  title="Previous Project"
                >
                  ◀ PREV
                </button>
                <button
                  type="button"
                  onClick={() => onSelectProject(nextProject)}
                  className="px-2 py-0.5 bg-[#080808] hover:bg-white text-[#f7f5f2] hover:text-[#080808] font-p5-impact text-[10px] tracking-wider uppercase cursor-pointer"
                  title="Next Project"
                >
                  NEXT ▶
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#080808] hover:bg-white text-[#f7f5f2] hover:text-[#080808] border border-black font-p5-impact text-xs uppercase tracking-wider transition-colors cursor-pointer active:scale-95 touch-manipulation min-h-[30px]"
              aria-label="Close project modal"
            >
              <span>CLOSE</span>
              <span className="font-bold text-sm leading-none">✕</span>
            </button>
          </div>
        </div>

        {/* Quick Mission Selector Ribbon */}
        {onSelectProject && (
          <div className="shrink-0 bg-[#0d0d0d] px-3 py-1.5 border-b border-[#242424] flex items-center justify-between gap-1 overflow-x-auto text-[10px] font-p5-mono scrollbar-none">
            <span className="text-[#888] uppercase shrink-0 mr-1 hidden sm:inline">MISSIONS:</span>
            <div className="flex items-center gap-1.5">
              {projects.map((p) => {
                const isActive = p.id === project.id;
                const shortTitle = p.title ? p.title.split(' ')[0] : 'PROJECT';
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectProject(p)}
                    className={`px-2 py-0.5 uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#ff1b2d] text-[#080808] font-bold'
                        : 'bg-[#1a1a1a] hover:bg-[#282828] text-[#a0a0a0] hover:text-[#f7f5f2]'
                    }`}
                  >
                    {p.badge ? p.badge.replace('MISSION #', 'M0') : 'M'} {shortTitle}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Scrollable Body: Smooth internal scroll inside the compact card */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-5 md:p-6 space-y-4 touch-pan-y"
          onTouchStart={(e) => handleTouchStart(e, false)}
        >
          {/* Title & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-[#e60012] rotate-45 inline-block" />
              <span className="font-p5-mono text-[10px] text-[#ff1b2d] uppercase tracking-wider font-bold">
                OPERATIONAL BLUEPRINT // VERIFIED SPEC
              </span>
            </div>
            <h3 id="modal-project-title" className="font-p5-display text-2xl sm:text-4xl font-bold text-[#f7f5f2] tracking-wider mb-1 leading-tight">
              {project.title}
            </h3>
            <p className="font-p5-impact text-xs sm:text-sm text-[#ff1b2d] tracking-wide">
              {project.tagline}
            </p>
          </div>

          {/* Illuminated Project Cover Visual Frame */}
          <div className="w-full aspect-[16/9] max-h-[145px] sm:max-h-[185px] border border-[#2e2e2e] overflow-hidden bg-[#0a0a0a]">
            <ProjectCover slug={project.slug} />
          </div>

          {/* Full Narrative Overview */}
          <div className="bg-[#1c1c1c] p-3 sm:p-4 border-l-4 border-[#e60012] space-y-1.5">
            <h4 className="font-p5-mono text-[10px] sm:text-xs font-bold text-[#ff1b2d] uppercase tracking-wider">
              &gt; MISSION BRIEF &amp; ARCHITECTURE
            </h4>
            <p className="font-p5-body text-xs sm:text-sm text-[#e0e0e0] leading-relaxed">
              {project.fullOverview}
            </p>
          </div>

          {/* Technical Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="font-p5-impact text-xs sm:text-sm text-[#f7f5f2] tracking-wider uppercase mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#ff1b2d] rotate-45 inline-block" />
                <span>CORE ARCHITECTURAL HIGHLIGHTS</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-p5-body text-xs text-[#b9b9b9]">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 bg-[#171717] p-2.5 border border-[#242424]">
                    <span className="text-[#ff1b2d] font-bold">★</span>
                    <span className="text-[#dcdcdc]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Measurable Performance Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h4 className="font-p5-mono text-[10px] text-[#888] uppercase tracking-wider mb-1.5">
                MEASURED BENCHMARKS:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-[#080808] border border-[#ff1b2d]/60 p-2 text-center">
                    <span className="font-p5-mono text-[11px] font-bold text-[#f7f5f2] block">
                      {metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {project.stack && project.stack.length > 0 && (
            <div className="pt-1">
              <span className="font-p5-mono text-[10px] text-[#b9b9b9] uppercase block mb-1">
                TECHNOLOGIES DEPLOYED:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-p5-mono text-[#f7f5f2]">
                {project.stack.map((tech, idx) => (
                  <React.Fragment key={tech}>
                    <span className="text-[#ff1b2d] font-bold">{tech}</span>
                    {idx < project.stack.length - 1 && <span className="text-[#555]" aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fixed Footer Bar with Direct Actions */}
        <div className="shrink-0 bg-[#0e0e0e] px-3.5 sm:px-5 py-2.5 sm:py-3 border-t border-[#242424] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#e60012] hover:bg-[#ff1b2d] text-[#080808] font-p5-impact text-xs sm:text-sm tracking-wider uppercase transition-colors p5-shadow-black cursor-pointer active:scale-95 touch-manipulation"
            >
              <span>INSPECT REPO</span>
              <span>↗</span>
            </a>

            {onSelectProject && (
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-2 bg-[#1a1a1a] hover:bg-[#252525] text-[#f7f5f2] font-p5-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>NEXT MISSION</span>
                <span>▶</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#080808] hover:bg-[#222] text-[#f7f5f2] border border-[#ff1b2d] font-p5-impact text-xs sm:text-sm tracking-wider uppercase transition-colors cursor-pointer active:scale-95 touch-manipulation"
          >
            <span>CLOSE</span>
            <span>✕</span>
          </button>
        </div>

      </div>
    </div>
  );
};
