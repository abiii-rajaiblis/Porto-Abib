import React, { useEffect, useState } from 'react';
import { useActionFlash, FlashVariant, FlashOptions } from '../context/ActionFlashContext';

export interface ActionFlashProps {
  /** If provided, overrides context state for standalone usage */
  active?: boolean;
  variant?: FlashVariant;
  text?: string;
  subtext?: string;
  duration?: number;
  onComplete?: () => void;
}

export const ActionFlash: React.FC<ActionFlashProps> = ({
  active: propActive,
  variant: propVariant,
  text: propText,
  subtext: propSubtext,
  onComplete: propOnComplete,
}) => {
  // Try to read from context if available, otherwise fallback to local props
  let contextActive = false;
  let contextFlash: FlashOptions | null = null;
  let prefersReducedMotion = false;

  try {
    const ctx = useActionFlash();
    contextActive = ctx.isFlashing;
    contextFlash = ctx.currentFlash;
    prefersReducedMotion = ctx.prefersReducedMotion;
  } catch {
    // If used outside provider, context stays inactive
  }

  const isControlled = propActive !== undefined;
  const isActive = isControlled ? propActive : contextActive;
  const variant: FlashVariant = propVariant || contextFlash?.variant || 'camera';
  const text = propText ?? contextFlash?.text;
  const subtext = propSubtext ?? contextFlash?.subtext;

  // Local state to handle animation stages: 'snap' -> 'hold' -> 'exit' -> 'idle'
  const [stage, setStage] = useState<'idle' | 'snap' | 'hold' | 'exit'>('idle');

  useEffect(() => {
    if (isActive) {
      setStage('snap');
      const holdTimer = setTimeout(() => {
        setStage('hold');
      }, 50);

      const exitTimer = setTimeout(() => {
        setStage('exit');
      }, 260);

      const finishTimer = setTimeout(() => {
        setStage('idle');
        if (propOnComplete) propOnComplete();
      }, 450);

      return () => {
        clearTimeout(holdTimer);
        clearTimeout(exitTimer);
        clearTimeout(finishTimer);
      };
    } else {
      setStage('idle');
    }
  }, [isActive, propOnComplete]);

  if (!isActive && stage === 'idle') return null;

  // Reduced motion: graceful soft red bloom without high-frequency flashing or camera HUD shake
  if (prefersReducedMotion) {
    return (
      <aside
        className="fixed inset-0 z-[120] pointer-events-none flex items-center justify-center transition-opacity duration-200"
        style={{
          backgroundColor: 'rgba(230, 0, 18, 0.4)',
          opacity: stage === 'exit' || stage === 'idle' ? 0 : 1,
        }}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-label="Action transition flash"
      >
        <span className="sr-only">Screen flash transition triggered</span>
      </aside>
    );
  }

  // Variant Default Badges & Text
  const defaultTitle = {
    camera: 'ACTION SNAP!',
    critical: 'CRITICAL STRIKE!',
    ambush: 'AMBUSH!',
    subtle: '',
  }[variant];

  const defaultSub = {
    camera: 'METAVERSE SHUTTER // EXPOSURE MAX',
    critical: 'WEAKNESS EXPLOITED // FINISHER READY',
    ambush: 'SURPRISE INFILTRATION // ATTACK CHANCE',
    subtle: '',
  }[variant];

  const displayTitle = text || defaultTitle;
  const displaySub = subtext || defaultSub;

  return (
    <aside
      className={`fixed inset-0 z-[120] pointer-events-none overflow-hidden select-none transition-opacity ${
        stage === 'exit' ? 'opacity-0 duration-200 ease-out' : 'opacity-100 duration-75'
      }`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Persona 5 action flash camera shutter transition"
    >
      {/* 1. Ultra-Brief Blinding White Shutter Strobe (0-60ms) */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-100 ${
          stage === 'snap' ? 'opacity-95' : 'opacity-0'
        }`}
      />

      {/* 2. Deep Crimson Red Exposure Flood */}
      <div
        className="absolute inset-0 bg-[#e60012]/85 mix-blend-multiply"
      />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-[#8c000a] via-[#e60012]/80 to-[#ff1b2d]/70"
      />

      {/* 3. Angular Shutter Aperture Blades & Diagonal Comic Slash Cuts */}
      <div
        className="absolute inset-0 bg-[#080808]/90 transition-transform duration-300"
        style={{
          clipPath:
            stage === 'snap'
              ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              : 'polygon(0 0, 100% 18%, 100% 82%, 0 100%)',
          transform: stage === 'snap' ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      <div
        className="absolute inset-0 bg-[#ff1b2d]/60 pointer-events-none"
        style={{
          clipPath: 'polygon(0 25%, 100% 8%, 100% 50%, 0 70%)',
        }}
      />

      {/* 4. Speed Stripes & Halftone Dot Patterns */}
      <div className="absolute inset-0 bg-p5-stripes opacity-35" />
      <div className="absolute inset-0 bg-halftone opacity-40" />

      {/* 5. Camera Viewfinder HUD Elements (Only on non-subtle modes) */}
      {variant !== 'subtle' && (
        <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between text-[#f7f5f2] font-p5-mono text-xs tracking-wider">
          
          {/* Top HUD Bar */}
          <div className="flex items-center justify-between">
            {/* Top-Left Viewfinder Reticle */}
            <div className="flex items-center gap-2 bg-[#080808] px-3 py-1 border-l-3 border-t-3 border-[#f7f5f2]">
              <span className="font-p5-impact text-[#ff1b2d] text-sm">⌜ CAM.P5</span>
              <span className="text-[10px] text-[#b9b9b9] hidden sm:inline">RAW // ISO 6400</span>
            </div>

            {/* Top-Right Recording Indicator */}
            <div className="flex items-center gap-2 bg-[#080808] px-3 py-1 border-r-3 border-t-3 border-[#f7f5f2]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff1b2d] animate-ping" />
              <span className="font-p5-impact text-xs tracking-widest text-[#ff1b2d]">REC ●</span>
              <span className="text-[10px] hidden sm:inline">00:00:01 ⌝</span>
            </div>
          </div>

          {/* Center Graphic Crosshair & Dramatic P5 Ribbon */}
          <div className="relative self-center text-center my-auto">
            
            {/* Rotating Aperture Reticle Crosshair SVG */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <svg
                viewBox="0 0 200 200"
                className="w-48 h-48 sm:w-72 sm:h-72 stroke-[#ff1b2d] opacity-60 animate-spin"
                style={{ animationDuration: '4s' }}
                aria-hidden="true"
              >
                <circle cx="100" cy="100" r="80" strokeWidth="2" strokeDasharray="6 6" fill="none" />
                <circle cx="100" cy="100" r="45" strokeWidth="1.5" fill="none" />
                {/* Diagonal Crosshairs */}
                <line x1="20" y1="100" x2="60" y2="100" strokeWidth="3" />
                <line x1="140" y1="100" x2="180" y2="100" strokeWidth="3" />
                <line x1="100" y1="20" x2="100" y2="60" strokeWidth="3" />
                <line x1="100" y1="140" x2="100" y2="180" strokeWidth="3" />
              </svg>
            </div>

            {/* Central Slanted Action Title Banner */}
            {displayTitle && (
              <div className="transform -rotate-2">
                {/* Subtag */}
                <div className="inline-block px-3 py-1 bg-[#080808] text-[#ff1b2d] border border-[#ff1b2d] font-p5-impact text-xs sm:text-sm tracking-widest uppercase mb-2 p5-shadow-black">
                  ★ SHUTTER SNAP // FOCUS LOCK ★
                </div>

                {/* Primary Ransom Flash Headline */}
                <div className="my-1">
                  <h2 className="font-p5-display text-4xl sm:text-7xl lg:text-8xl font-bold tracking-wider text-[#f7f5f2] drop-shadow-[0_4px_0_#080808] uppercase transform skew-x-[-6deg]">
                    {displayTitle}
                  </h2>
                </div>

                {/* Subtext description */}
                {displaySub && (
                  <div className="bg-[#ff1b2d] text-[#080808] px-4 py-1.5 inline-block font-p5-mono text-xs sm:text-sm font-bold tracking-wider uppercase transform rotate-1 p5-shadow-black mt-1">
                    {displaySub}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom HUD Bar */}
          <div className="flex items-center justify-between">
            {/* Bottom-Left Shutter Speed & Aperture */}
            <div className="flex items-center gap-2 bg-[#080808] px-3 py-1 border-l-3 border-b-3 border-[#f7f5f2]">
              <span className="font-p5-impact text-[#ff1b2d]">⌞ 1/8000s</span>
              <span className="text-[10px] text-[#b9b9b9]">F/1.4 AUTO</span>
            </div>

            {/* Bottom-Right Exposure Compensation */}
            <div className="flex items-center gap-2 bg-[#080808] px-3 py-1 border-r-3 border-b-3 border-[#f7f5f2]">
              <span className="font-p5-mono text-[10px] text-[#b9b9b9] hidden sm:inline">EXP COMP</span>
              <span className="font-p5-impact text-[#ff1b2d]">+3.0 EV ⌟</span>
            </div>
          </div>

        </div>
      )}

      {/* Subtle Mode: Sleek minimalist red camera flash sweep */}
      {variant === 'subtle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-[#f7f5f2] transform -rotate-6 shadow-[0_0_20px_#ffffff]" />
        </div>
      )}
    </aside>
  );
};
