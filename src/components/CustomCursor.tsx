import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const requestRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect touch-only devices to avoid showing custom cursor on mobile
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouchDevice(isTouch);
      if (isTouch) return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverable = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [tabindex="0"], .cursor-pointer, .comic-jitter-hover'
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', checkHoverable);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp frame loop
    const updateCursor = () => {
      setPos(prev => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;
        return {
          x: prev.x + dx * 0.45,
          y: prev.y + dy * 0.45,
        };
      });
      requestRef.current = requestAnimationFrame(updateCursor);
    };

    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', checkHoverable);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  // Don't render on touch screens
  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {isHovered ? (
        /* Persona 5 Crosshair / Target Acquired Reticle */
        <div
          className={`relative -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out ${
            isMouseDown ? 'scale-75' : 'scale-110'
          }`}
        >
          {/* Outer Crosshair Ring with 4 Brackets */}
          <svg viewBox="0 0 54 54" className="w-11 h-11 filter drop-shadow-[0_0_8px_#ff1b2d]">
            {/* 4 Corner Targeting Brackets */}
            <path d="M 6 16 L 6 6 L 16 6" stroke="#ff1b2d" strokeWidth="2.5" fill="none" />
            <path d="M 48 16 L 48 6 L 38 6" stroke="#ff1b2d" strokeWidth="2.5" fill="none" />
            <path d="M 6 38 L 6 48 L 16 48" stroke="#ff1b2d" strokeWidth="2.5" fill="none" />
            <path d="M 48 38 L 48 48 L 38 48" stroke="#ff1b2d" strokeWidth="2.5" fill="none" />

            {/* Central Precision Crosshairs */}
            <line x1="27" y1="12" x2="27" y2="18" stroke="#f7f5f2" strokeWidth="2" />
            <line x1="27" y1="36" x2="27" y2="42" stroke="#f7f5f2" strokeWidth="2" />
            <line x1="12" y1="27" x2="18" y2="27" stroke="#f7f5f2" strokeWidth="2" />
            <line x1="36" y1="27" x2="42" y2="27" stroke="#f7f5f2" strokeWidth="2" />

            {/* Center Lock Dot */}
            <circle cx="27" cy="27" r="2.5" fill="#ff1b2d" />
          </svg>

          {/* Micro Target Lock Tag */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1 bg-[#080808] border border-[#ff1b2d] text-[#ff1b2d] font-p5-mono text-[8px] font-bold tracking-widest uppercase whitespace-nowrap shadow-[2px_2px_0px_#080808]">
            LOCK ON
          </div>
        </div>
      ) : (
        /* Default Persona 5 Sharp Diamond Star Cursor */
        <div
          className={`relative -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
            isMouseDown ? 'scale-75' : 'scale-100'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 filter drop-shadow-[0_0_6px_rgba(255,27,45,0.7)]">
            {/* Red diamond star core */}
            <path
              d="M12 0 C12 6, 16 12, 24 12 C16 12, 12 18, 12 24 C12 18, 8 12, 0 12 C8 12, 12 6, 12 0 Z"
              fill="#e60012"
              stroke="#080808"
              strokeWidth="1.5"
            />
            {/* Center white twinkle */}
            <circle cx="12" cy="12" r="2" fill="#f7f5f2" />
          </svg>
        </div>
      )}
    </div>
  );
};
