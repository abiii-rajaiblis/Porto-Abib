import React, { useEffect, useRef, useState } from 'react';

interface JaggedProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  delay?: number; // ms
  className?: string;
}

export const JaggedProgressBar: React.FC<JaggedProgressBarProps> = ({
  value,
  label = "MASTERY",
  delay = 0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setAnimatedWidth(value);
      setIsRevealed(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsRevealed(true);
            setAnimatedWidth(value);
          }, delay);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div
      ref={containerRef}
      className={`w-full space-y-1 select-none p5-reveal ${isRevealed ? 'p5-reveal-visible' : ''} ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: ${value}%`}
    >
      {/* Label and Percentage Header */}
      <div className="flex items-center justify-between text-[10px] font-p5-mono">
        <span className="text-[#888] tracking-wider uppercase font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[#e60012] rotate-45 inline-block" />
          <span>{label}</span>
        </span>
        <span className="text-[#ff1b2d] font-bold tabular-nums">
          {value >= 98 ? 'MAX 99%' : `${value}%`}
        </span>
      </div>

      {/* Outer Jagged Skewed Track Container */}
      <div className="relative h-3 w-full bg-[#080808] border border-[#2d2d2d] p-0.5 overflow-hidden transform -skew-x-12 shadow-[2px_2px_0px_#080808]">
        
        {/* Track Grid Ticks (Sawtooth / Segment dividers) */}
        <div className="absolute inset-0 flex justify-between px-2 pointer-events-none z-10 opacity-30">
          {[20, 40, 60, 80].map((tick) => (
            <div key={tick} className="w-px h-full bg-[#f7f5f2]" />
          ))}
        </div>

        {/* Animated Jagged-Edge Progress Bar Fill */}
        <div
          className="h-full bg-gradient-to-r from-[#8c000a] via-[#e60012] to-[#ff1b2d] relative transition-all will-change-transform"
          style={{
            width: `${animatedWidth}%`,
            transitionDuration: '750ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 100%, 0 100%)',
          }}
        >
          {/* Subtle Speed Stripes inside progress fill */}
          <div className="absolute inset-0 bg-p5-stripes opacity-40 pointer-events-none" />

          {/* Jagged leading edge spark */}
          <div className="absolute top-0 right-0 w-1.5 h-full bg-white opacity-80" />
        </div>

      </div>
    </div>
  );
};
