import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'fade';
  delay?: number; // ms
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If reduced motion is preferred, reveal immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          // Disconnect once revealed
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  const getDirectionClass = () => {
    switch (direction) {
      case 'left':
        return 'p5-reveal-left';
      case 'right':
        return 'p5-reveal-right';
      case 'fade':
      case 'up':
      default:
        return 'p5-reveal';
    }
  };

  return (
    <div
      ref={ref}
      className={`${getDirectionClass()} ${isVisible ? 'p5-reveal-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
