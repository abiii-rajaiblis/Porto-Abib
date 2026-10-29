import React, { useEffect, useRef, useState } from 'react';

interface DungeonDividerProps {
  dungeonName?: string;
  loadingText?: string;
  progress?: string;
  theme?: 'crimson' | 'black' | 'white';
  invert?: boolean;
  delay?: number;
  className?: string;
}

export const DungeonDivider: React.FC<DungeonDividerProps> = ({
  dungeonName = "METAVERSE DUNGEON",
  loadingText = "NOW LOADING...",
  progress = "INFILTRATING...",
  theme = "crimson",
  invert = false,
  delay = 0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showStrikeFlash, setShowStrikeFlash] = useState(false);

  // Synchronize entrance animation with the ScrollReveal system
  useEffect(() => {
    // If reduced motion is preferred, reveal immediately without strike
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const triggerEntrance = () => {
            setIsRevealed(true);
            setShowStrikeFlash(true);
            // Flash auto fades out after 500ms
            setTimeout(() => {
              setShowStrikeFlash(false);
            }, 550);
          };

          if (delay > 0) {
            setTimeout(triggerEntrance, delay);
          } else {
            triggerEntrance();
          }

          // Disconnect once struck
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  // 6 repeated units for upper blade so 50% translation is completely seamless
  const upperUnits = [0, 1, 2, 3, 4, 5];
  // 8 repeated units for lower blade
  const lowerUnits = [0, 1, 2, 3, 4, 5, 6, 7];

  const upperRotation = invert ? '1.8deg' : '-2deg';
  const lowerRotation = invert ? '-1.2deg' : '1.4deg';

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-8 md:py-12 overflow-hidden select-none z-20 ${className}`}
      aria-hidden="true"
    >
      {/* Background Speed Stripes & Halftone */}
      <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none" />

      {/* Persona 5 Dynamic Strike Slash Flash Effect upon Intersection */}
      {showStrikeFlash && (
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
          {/* Intense horizontal razor cut beam */}
          <div
            className="w-[120%] h-[5px] bg-[#f7f5f2] shadow-[0_0_20px_#ff1b2d,0_0_40px_#e60012] animate-p5-strike-slash"
            style={{
              transform: `rotate(${upperRotation})`,
            }}
          />
          {/* Center impact spark */}
          <div className="absolute w-14 h-14 text-[#ff1b2d] animate-p5-strike-spark">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_12px_#ffffff]">
              <path d="M12 0 C12 7, 17 12, 24 12 C17 12, 12 17, 12 24 C12 17, 7 12, 0 12 C7 12, 12 7, 12 0 Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Primary Asymmetrical Diagonal Cutting Blade - Strikes from Left, Moves Left */}
      <div
        className="w-full transition-all will-change-transform"
        style={{
          transform: isRevealed
            ? `translateX(0%) rotate(${upperRotation}) scale(1.03)`
            : `translateX(-105%) rotate(${upperRotation}) scale(1.03)`,
          opacity: isRevealed ? 1 : 0,
          transitionDuration: '520ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className={`w-full py-3.5 overflow-hidden ${
            theme === 'crimson'
              ? 'bg-[#e60012] text-[#080808] border-y-3 border-[#080808] shadow-[0_6px_20px_rgba(230,0,18,0.5)]'
              : theme === 'white'
              ? 'bg-[#f7f5f2] text-[#080808] border-y-3 border-[#e60012] shadow-[0_6px_20px_rgba(247,245,242,0.3)]'
              : 'bg-[#0e0e0e] text-[#f7f5f2] border-y-3 border-[#ff1b2d] shadow-[0_6px_20px_rgba(0,0,0,0.8)]'
          }`}
        >
          <div className="flex w-max items-center whitespace-nowrap will-change-transform animate-p5-marquee">
            {upperUnits.map((idx) => (
              <div key={idx} className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
                {/* Left: Animated Persona 5 "Take Your Time" & Running Star */}
                <div className="flex items-center gap-3">
                  {/* Pulsating 4-point Diamond Star */}
                  <div className="w-5 h-5 flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M12 0 C12 7, 17 12, 24 12 C17 12, 12 17, 12 24 C12 17, 7 12, 0 12 C7 12, 12 7, 12 0 Z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-p5-impact text-sm sm:text-base tracking-widest uppercase font-bold">
                      TAKE YOUR TIME
                    </span>
                    <span className="font-p5-mono text-xs opacity-75">
                      // {loadingText}
                    </span>
                  </div>
                </div>

                {/* Center: Running Dots Loader Indicator */}
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rotate-45 bg-current animate-pulse"
                      style={{
                        animationDelay: `${i * 180}ms`,
                        animationDuration: '900ms',
                      }}
                    />
                  ))}
                </div>

                {/* Right: Dungeon Name & Progress Code */}
                <div className="flex items-center gap-2 text-right">
                  <span className="font-p5-display text-sm sm:text-lg tracking-wider uppercase font-bold">
                    {dungeonName}
                  </span>
                  <span className="px-2 py-0.5 bg-[#080808] text-[#f7f5f2] font-p5-mono text-[10px] tracking-widest uppercase transform rotate-2">
                    {progress}
                  </span>
                </div>

                {/* Persona 5 Diamond Motif Spacer */}
                <span className="inline-block w-2.5 h-2.5 bg-current rotate-45 shrink-0 opacity-70" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Staggered Geometric Under-Blade - Strikes from Right, Moves Right */}
      <div
        className="w-full -mt-2 transition-all will-change-transform"
        style={{
          transform: isRevealed
            ? `translateX(0%) rotate(${lowerRotation}) scale(1.02)`
            : `translateX(105%) rotate(${lowerRotation}) scale(1.02)`,
          opacity: isRevealed ? 1 : 0,
          transitionDuration: '560ms',
          transitionDelay: '60ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="w-full py-1 bg-[#080808] text-[#f7f5f2] border-y border-[#ff1b2d] opacity-90 overflow-hidden">
          <div className="flex w-max items-center whitespace-nowrap will-change-transform animate-p5-marquee-rev">
            {lowerUnits.map((idx) => (
              <div
                key={idx}
                className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10 text-[10px] font-p5-mono text-[#ff1b2d] tracking-widest uppercase"
              >
                <span>&gt;&gt; INFILTRATING NEXT PALACE FLOOR</span>
                <span className="w-1.5 h-1.5 bg-[#ff1b2d] rotate-45 shrink-0" />
                <span>SYSTEM SECURITY SCAN: ACTIVE</span>
                <span className="w-1.5 h-1.5 bg-[#ff1b2d] rotate-45 shrink-0" />
                <span>PERSONA 5 PROTOCOL &lt;&lt;</span>
                <span className="w-2 h-2 bg-[#ff1b2d] rotate-45 shrink-0 opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
