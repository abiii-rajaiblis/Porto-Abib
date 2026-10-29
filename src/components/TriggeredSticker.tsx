import React, { useState } from 'react';

interface TriggeredStickerProps {
  label: string;
  triggeredText: string;
  soundFx?: 'SLASH' | 'BAM' | 'CRITICAL' | 'PERSONA' | 'ALL-OUT';
  variant?: 'crimson' | 'black' | 'yellow' | 'white';
  angle?: number;
  className?: string;
  children?: React.ReactNode;
}

export const TriggeredSticker: React.FC<TriggeredStickerProps> = ({
  label,
  triggeredText,
  soundFx = 'CRITICAL',
  variant = 'crimson',
  angle = -3,
  className = '',
  children,
}) => {
  const [isActive, setIsActive] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'crimson':
        return 'bg-[#e60012] text-[#f7f5f2] border-2 border-[#080808] shadow-[4px_4px_0px_#080808]';
      case 'black':
        return 'bg-[#080808] text-[#ff1b2d] border-2 border-[#ff1b2d] shadow-[4px_4px_0px_#e60012]';
      case 'yellow':
        return 'bg-[#ffcc00] text-[#080808] border-2 border-[#080808] shadow-[4px_4px_0px_#e60012]';
      case 'white':
        return 'bg-[#f7f5f2] text-[#080808] border-2 border-[#e60012] shadow-[4px_4px_0px_#080808]';
      default:
        return 'bg-[#e60012] text-[#f7f5f2]';
    }
  };

  return (
    <div
      className={`relative inline-block group select-none ${className}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onClick={() => setIsActive(prev => !prev)}
      tabIndex={0}
      role="button"
      aria-label={`${label}: ${triggeredText}`}
    >
      {/* Target item / button wrapper */}
      <div
        className={`px-3 py-1.5 font-p5-display text-sm md:text-base font-bold transition-all duration-150 cursor-pointer ${getVariantStyles()} ${
          isActive ? 'scale-105 -translate-y-1' : ''
        }`}
        style={{ transform: `rotate(${angle}deg)` }}
      >
        {children ? (
          children
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#f7f5f2] rotate-45 inline-block" />
            <span>{label}</span>
          </div>
        )}
      </div>

      {/* Triggered Pop-up Label / Comic Punch microcopy */}
      <div
        className={`absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] pointer-events-none transition-all duration-150 ease-out origin-bottom ${
          isActive
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-75 translate-y-2'
        }`}
      >
        <div className="relative bg-[#080808] text-[#f7f5f2] border-2 border-[#ff1b2d] p5-shadow-red px-2.5 py-1.5 transform rotate-2">
          {/* Sound FX Tag */}
          <div className="absolute -top-3 -right-2 bg-[#ff1b2d] text-[#080808] font-p5-impact text-[10px] tracking-widest px-1.5 py-0.5 transform -rotate-6 border border-[#080808]">
            {soundFx}!
          </div>

          <p className="font-p5-mono text-xs font-bold leading-tight text-[#ff1b2d]">
            &gt; {triggeredText}
          </p>
        </div>
      </div>
    </div>
  );
};
