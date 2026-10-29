import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PalaceTheme {
  id: string;
  name: string;
  sectionId: string;
  code: string;
  color: string;
  dotColor: string;
  securityLevel: string;
  icon: string;
  ruler: string;
}

export const PALACE_THEMES: Record<string, PalaceTheme> = {
  hero: {
    id: 'hero',
    name: 'SHIBUYA METAVERSE',
    sectionId: 'hero',
    code: 'PALACE 01',
    color: '#e60012',
    dotColor: 'rgba(230, 0, 18, 0.28)',
    securityLevel: 'ALERT: 99%',
    icon: '⚡',
    ruler: 'COGNITIVE CROSSING',
  },
  about: {
    id: 'about',
    name: 'MUSEUM OF ART',
    sectionId: 'about',
    code: 'PALACE 02',
    color: '#ff9900',
    dotColor: 'rgba(255, 153, 0, 0.28)',
    securityLevel: 'ALERT: 74%',
    icon: '🎨',
    ruler: "AGENT EBI'S STUDIO",
  },
  skills: {
    id: 'skills',
    name: 'ARSENAL VAULT',
    sectionId: 'skills',
    code: 'PALACE 03',
    color: '#00e6b4',
    dotColor: 'rgba(0, 230, 180, 0.28)',
    securityLevel: 'ALERT: 88%',
    icon: '💎',
    ruler: 'TECH ARSENAL',
  },
  projects: {
    id: 'projects',
    name: 'PYRAMID OF CODE',
    sectionId: 'projects',
    code: 'PALACE 04',
    color: '#b45aff',
    dotColor: 'rgba(180, 90, 255, 0.28)',
    securityLevel: 'ALERT: 92%',
    icon: '🔺',
    ruler: 'SYSTEM CORE',
  },
  contact: {
    id: 'contact',
    name: 'MEMENTOS CLIMAX',
    sectionId: 'contact',
    code: 'PALACE 05',
    color: '#ff1b2d',
    dotColor: 'rgba(255, 27, 45, 0.35)',
    securityLevel: 'STEAL: 100%',
    icon: '🎯',
    ruler: 'CALLING CARD',
  },
};

interface PalaceContextType {
  activePalace: PalaceTheme;
  setActivePalaceId: (id: string) => void;
  palaces: PalaceTheme[];
}

const PalaceContext = createContext<PalaceContextType | undefined>(undefined);

export const PalaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePalaceId, setActivePalaceId] = useState<string>('hero');

  const activePalace = PALACE_THEMES[activePalaceId] || PALACE_THEMES.hero;

  // Sync CSS custom property on documentElement for fluid halftone color transition
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--palace-dot-color', activePalace.dotColor);
    }
  }, [activePalace]);

  // Automatic IntersectionObserver to track which section is currently active
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section with highest intersection ratio
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry && visibleEntry.target.id) {
          setActivePalaceId(visibleEntry.target.id);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '-80px 0px -40% 0px',
      }
    );

    elements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <PalaceContext.Provider
      value={{
        activePalace,
        setActivePalaceId,
        palaces: Object.values(PALACE_THEMES),
      }}
    >
      {children}
    </PalaceContext.Provider>
  );
};

export const usePalace = () => {
  const ctx = useContext(PalaceContext);
  if (!ctx) {
    throw new Error('usePalace must be used within a PalaceProvider');
  }
  return ctx;
};
