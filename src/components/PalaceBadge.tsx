import React, { useState } from 'react';
import { usePalace } from '../context/PalaceContext';

export const PalaceBadge: React.FC = () => {
  const { activePalace, palaces, setActivePalaceId } = usePalace();
  const [showPalaceMenu, setShowPalaceMenu] = useState(false);

  const handleSelectPalace = (sectionId: string) => {
    setActivePalaceId(sectionId);
    setShowPalaceMenu(false);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative select-none" aria-label="Persona 5 Active Palace Radar">
      
      {/* Thematic Navbar Badge */}
      <button
        onClick={() => setShowPalaceMenu(prev => !prev)}
        className="group flex items-center gap-1.5 px-2 py-1 bg-[#121212] border-2 transition-all duration-150 p5-cut-corner comic-jitter-hover cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
        style={{
          borderColor: activePalace.color,
          boxShadow: `3px 3px 0px ${activePalace.color}`,
        }}
        title={`Active Palace: ${activePalace.name} (${activePalace.securityLevel}). Click to switch palaces.`}
      >
        {/* Dynamic Palace Theme Icon */}
        <span className="text-xs" aria-hidden="true">
          {activePalace.icon}
        </span>

        {/* Palace Code & Name */}
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1">
            <span
              className="font-p5-impact text-[9px] tracking-widest uppercase font-bold"
              style={{ color: activePalace.color }}
            >
              {activePalace.code}
            </span>
            <span className="text-[8px] font-p5-mono text-[#b9b9b9] hidden xl:inline">
              [{activePalace.securityLevel}]
            </span>
          </div>

          <span className="font-p5-display text-xs text-[#f7f5f2] tracking-wider uppercase truncate max-w-[110px] sm:max-w-[130px]">
            {activePalace.name}
          </span>
        </div>

        {/* Dropdown Indicator arrow */}
        <span
          className="text-[9px] font-p5-mono transition-transform duration-200"
          style={{ color: activePalace.color }}
        >
          {showPalaceMenu ? '▲' : '▼'}
        </span>
      </button>

      {/* Quick Palace Navigation / Teleport Menu */}
      {showPalaceMenu && (
        <div
          className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 z-50 w-64 p-3 bg-[#0d0d0d] border-2 border-[#e60012] p5-cut-corner-lg p5-shadow-white animate-fadeIn"
          role="menu"
          aria-label="Palace Teleport Roster"
        >
          <div className="flex items-center justify-between border-b border-[#242424] pb-2 mb-2">
            <div>
              <span className="font-p5-impact text-xs text-[#e60012] tracking-wider uppercase block">
                METAVERSE PALACE RADAR
              </span>
              <span className="font-p5-mono text-[9px] text-[#b9b9b9]">
                SELECT PALACE TO INFILTRATE
              </span>
            </div>
            <button
              onClick={() => setShowPalaceMenu(false)}
              className="text-[#b9b9b9] hover:text-[#ff1b2d] font-p5-mono text-xs cursor-pointer"
            >
              [X]
            </button>
          </div>

          <div className="space-y-1.5">
            {palaces.map((p) => {
              const isCurrent = p.id === activePalace.id;

              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPalace(p.sectionId)}
                  className={`w-full text-left p-2 transition-all flex items-center justify-between border cursor-pointer ${
                    isCurrent
                      ? 'bg-[#1c080a] border-l-4 font-bold'
                      : 'bg-[#141414] hover:bg-[#1f1f1f] border-[#222]'
                  }`}
                  style={{
                    borderLeftColor: p.color,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{p.icon}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-p5-impact text-[10px] tracking-wider uppercase" style={{ color: p.color }}>
                          {p.code}
                        </span>
                        <span className="font-p5-mono text-[8px] text-[#777]">
                          · {p.ruler}
                        </span>
                      </div>
                      <span className="font-p5-display text-xs text-[#f7f5f2] tracking-wide block">
                        {p.name}
                      </span>
                    </div>
                  </div>

                  <span className="font-p5-mono text-[9px] text-[#b9b9b9] shrink-0">
                    {isCurrent ? '★ INFILTRATED' : p.securityLevel}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-[#1f1f1f] text-[9px] font-p5-mono text-[#777] text-center">
            BACKGROUND HALFTONE SYNCS WITH ACTIVE PALACE
          </div>

        </div>
      )}

    </div>
  );
};
