import React, { useState, useEffect } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'slashes' | 'calling-card' | 'finished'>('slashes');

  useEffect(() => {
    // Step 1: Initial diagonal slash
    const t1 = setTimeout(() => {
      setPhase('calling-card');
    }, 700);

    // Step 2: Auto exit after 2.2s so user is never blocked
    const t2 = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808] overflow-hidden select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Introduction"
    >
      {/* Background Halftone & Red Gradient */}
      <div className="absolute inset-0 bg-halftone opacity-40 pointer-events-none" />

      {/* Diagonal red slash background blades */}
      <div
        className="absolute inset-0 bg-[#e60012] transition-transform duration-700 ease-out origin-left pointer-events-none"
        style={{
          clipPath: 'polygon(0 0, 100% 30%, 100% 70%, 0 100%)',
          transform: phase === 'slashes' ? 'scaleX(1.1) rotate(-3deg)' : 'scaleX(1.4) rotate(-5deg)',
        }}
      />

      <div
        className="absolute inset-0 bg-[#ff1b2d] opacity-40 transition-transform duration-500 ease-out pointer-events-none"
        style={{
          clipPath: 'polygon(0 40%, 100% 10%, 100% 60%, 0 90%)',
        }}
      />

      {/* Center Calling Card / Phantom Announcement Box */}
      <div className="relative z-10 max-w-xl mx-4 text-center">
        {/* Monogram Badge */}
        <div className="inline-block mb-3 px-4 py-1 bg-[#080808] text-[#f7f5f2] border-2 border-[#f7f5f2] transform -rotate-3 p5-shadow-red">
          <span className="font-p5-impact text-lg tracking-widest text-[#ff1b2d]">CONFIDENTIAL</span>
          <span className="mx-2 text-[#f7f5f2]">/</span>
          <span className="font-p5-mono text-xs">HAZ-2026</span>
        </div>

        {/* Main Title Reveal (Ransom Note Style) */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
          {["HABIB", "AULIA", "AZ", "ZUHRI"].map((word, idx) => {
            const rotations = [-4, 3, -2, 4];
            const bgColors = ['bg-[#f7f5f2] text-[#080808]', 'bg-[#080808] text-[#f7f5f2] border-2 border-[#f7f5f2]', 'bg-[#ff1b2d] text-[#080808]', 'bg-[#080808] text-[#ff1b2d] border-2 border-[#ff1b2d]'];
            return (
              <span
                key={word}
                className={`px-3 py-1.5 font-p5-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-wider transform shadow-[4px_4px_0px_#080808] transition-all duration-300 ${bgColors[idx % bgColors.length]}`}
                style={{
                  transform: `rotate(${rotations[idx % rotations.length]}deg)`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Subtitle */}
        <div className="bg-[#080808] border-2 border-[#e60012] p5-shadow-white px-4 py-2 inline-block transform rotate-1 mb-6">
          <p className="font-p5-impact text-sm sm:text-base tracking-widest text-[#f7f5f2]">
            DEVELOPER • DESIGNER • CREATIVE TECHNOLOGIST
          </p>
        </div>

        {/* Action Stamp */}
        <div className="flex justify-center items-center gap-3">
          <span className="font-p5-mono text-xs text-[#f7f5f2] opacity-80 uppercase tracking-widest animate-pulse">
            INITIALIZING ALL-OUT ATTACK...
          </span>
        </div>
      </div>

      {/* Immediate Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-20 px-4 py-2 bg-[#080808] text-[#f7f5f2] border-2 border-[#ff1b2d] font-p5-impact text-sm tracking-wider uppercase hover:bg-[#ff1b2d] hover:text-[#080808] transition-colors cursor-pointer p5-shadow-red"
      >
        SKIP INTRO [ESC / CLICK] &gt;
      </button>
    </div>
  );
};
