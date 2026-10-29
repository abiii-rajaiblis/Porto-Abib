import React from 'react';

interface MovingTickerProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: 'normal' | 'fast' | 'slow';
  theme?: 'crimson' | 'black' | 'white';
  rotation?: number; // degrees
  className?: string;
}

export const MovingTicker: React.FC<MovingTickerProps> = ({
  items,
  direction = 'left',
  speed = 'normal',
  theme = 'crimson',
  rotation = -2,
  className = '',
}) => {
  const repeatedItems = [...items, ...items, ...items, ...items];

  const getThemeClasses = () => {
    switch (theme) {
      case 'crimson':
        return 'bg-[#e60012] text-[#080808] border-y-2 border-[#080808] shadow-[0_4px_16px_rgba(230,0,18,0.4)]';
      case 'black':
        return 'bg-[#080808] text-[#f7f5f2] border-y-2 border-[#e60012] shadow-[0_4px_16px_rgba(0,0,0,0.8)]';
      case 'white':
        return 'bg-[#f7f5f2] text-[#080808] border-y-2 border-[#e60012] shadow-[0_4px_16px_rgba(247,245,242,0.3)]';
      default:
        return 'bg-[#e60012] text-[#080808]';
    }
  };

  const getAnimationClass = () => {
    if (direction === 'right') return 'animate-p5-marquee-rev';
    if (speed === 'fast') return 'animate-p5-marquee-fast';
    return 'animate-p5-marquee';
  };

  return (
    <div
      className={`relative w-full overflow-hidden py-2 select-none z-20 transition-transform ${getThemeClasses()} ${className}`}
      style={{
        transform: `rotate(${rotation}deg) scale(1.02)`,
      }}
      aria-hidden="true"
    >
      <div className={`flex items-center gap-8 whitespace-nowrap will-change-transform ${getAnimationClass()}`}>
        {repeatedItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <span className="font-p5-impact text-sm md:text-base tracking-wider uppercase font-bold">
              {text}
            </span>
            <span className="inline-block w-2.5 h-2.5 bg-current rotate-45 shrink-0 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
};
