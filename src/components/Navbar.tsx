import React, { useState, useEffect } from 'react';
import { useSynthJazz } from '../context/AudioContext';
import { usePalace } from '../context/PalaceContext';
import { useActionFlash } from '../context/ActionFlashContext';

interface NavbarProps {
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isPlaying, isMuted, volume, currentStep, prefersReducedMotion, showListenHint, togglePlay, toggleMute, changeVolume } = useSynthJazz();
  const { activePalace, palaces, setActivePalaceId } = usePalace();
  const { triggerFlash } = useActionFlash();

  // Close drawer on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  const navLinks = [
    { label: "About", href: "#about", code: "01" },
    { label: "Skills", href: "#skills", code: "02" },
    { label: "Projects", href: "#projects", code: "03" },
    { label: "Contact", href: "#contact", code: "04" },
  ];

  const handleSelectPalace = (sectionId: string) => {
    setActivePalaceId(sectionId);
    setDrawerOpen(false);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sleek Top Bar (Single-line, uncrowded, never stacks) */}
      <header className="sticky top-0 z-40 w-full bg-[#080808]/95 backdrop-blur-md border-b-2 border-[#e60012] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="group flex items-center gap-2 text-xl font-p5-display font-bold tracking-wider text-[#f7f5f2] hover:text-[#ff1b2d] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#ff1b2d] comic-jitter-hover"
          >
            <span className="inline-block px-2 py-0.5 bg-[#e60012] text-[#080808] font-p5-impact text-sm -rotate-3 group-hover:rotate-0 transition-transform">
              HAZ
            </span>
            <span className="tracking-widest uppercase">HABIB AULIA</span>
          </a>

          {/* Zone 2: Primary Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-p5-impact tracking-wider text-[#b9b9b9]" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-[#f7f5f2] transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-[#ff1b2d] comic-jitter-hover inline-block"
              >
                <span className="inline-block">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff1b2d] group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Compact Live Status Indicators + Tactical Hamburger Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Subtle Pulsing "Click to Listen" visual hint if audio paused > 10 seconds */}
            {showListenHint && !isPlaying && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#e60012] hover:bg-[#ff1b2d] text-[#f7f5f2] hover:text-[#080808] border border-white font-p5-impact text-[10px] tracking-widest uppercase transform -rotate-2 animate-pulse shadow-[0_0_10px_#ff1b2d] cursor-pointer comic-jitter-hover shrink-0 transition-colors"
                title="Ambient Synth-Jazz soundtrack is available. Click to start listening!"
                aria-label="Click to start listening to background synth-jazz ambiance"
              >
                <span className="w-1.5 h-1.5 bg-white rotate-45 inline-block" />
                <span>CLICK TO LISTEN ♪</span>
              </button>
            )}

            {/* Quick Mini Status Chips (Visible in bar to give instant feedback) */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1 bg-[#121212] border border-[#2a2a2a] hover:border-[#e60012] transition-colors cursor-pointer text-left"
              title="Open Metaverse Tactical Menu (Palace, Radio, Navigation)"
            >
              {/* Palace Mini Indicator */}
              <div className="flex items-center gap-1">
                <span className="text-xs" aria-hidden="true">{activePalace.icon}</span>
                <span
                  className="font-p5-impact text-[10px] tracking-wider uppercase hidden sm:inline"
                  style={{ color: activePalace.color }}
                >
                  {activePalace.code}
                </span>
              </div>

              <span className="text-[#444]" aria-hidden="true">|</span>

              {/* Audio Mini Indicator */}
              <div className="flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-none rotate-45 ${
                    isPlaying ? 'bg-[#ff1b2d] animate-ping' : 'bg-[#555]'
                  }`}
                  aria-hidden="true"
                />
                <span className="font-p5-mono text-[9px] text-[#b9b9b9] uppercase">
                  {isPlaying ? (isMuted ? 'MUTED' : 'JAZZ ON') : 'RADIO'}
                </span>
              </div>
            </button>

            {/* Quick Action Flash / Camera Shutter Button */}
            <button
              onClick={() => triggerFlash({ variant: 'camera', text: 'ACTION SNAP!', subtext: 'METAVERSE SHUTTER // EXPOSURE MAX' })}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-[#1a1a1a] hover:bg-[#ff1b2d] text-[#f7f5f2] hover:text-[#080808] border border-[#ff1b2d] font-p5-impact text-[11px] tracking-wider uppercase transition-colors p5-shadow-black cursor-pointer comic-jitter-hover shrink-0"
              title="Trigger Persona 5 Camera Shutter Action Flash"
              aria-label="Trigger Persona 5 Camera Shutter Action Flash"
            >
              <span className="text-xs">⚡</span>
              <span>SNAP</span>
            </button>

            {/* Quick Calling Card CTA */}
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center justify-center px-3 py-1 bg-[#e60012] hover:bg-[#ff1b2d] text-[#080808] font-p5-impact text-xs tracking-wider uppercase transition-all duration-150 p5-shadow-black hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-white comic-jitter-hover"
            >
              CALLING CARD
            </a>

            {/* Unified Tactical Hamburger Menu Button */}
            <button
              onClick={() => setDrawerOpen(prev => !prev)}
              aria-label={drawerOpen ? "Close tactical menu" : "Open tactical menu"}
              aria-expanded={drawerOpen}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-[#e60012] hover:bg-[#ff1b2d] text-[#080808] font-p5-impact text-xs tracking-wider uppercase transition-all duration-150 p5-shadow-black cursor-pointer focus-visible:outline-2 focus-visible:outline-white comic-jitter-hover"
            >
              <div className="w-4 h-3 flex flex-col justify-between" aria-hidden="true">
                <span className={`h-0.5 w-full bg-current transform transition-all duration-200 ${drawerOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`h-0.5 w-full bg-current transition-opacity duration-200 ${drawerOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`h-0.5 w-full bg-current transform transition-all duration-200 ${drawerOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
              <span className="hidden sm:inline">MENU</span>
            </button>

          </div>

        </div>
      </header>

      {/* Unified Persona 5 Slide-Out Tactical Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#080808]/80 backdrop-blur-sm transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-label="Metaverse Tactical Operations Menu"
        >
          {/* Backdrop click dismiss */}
          <div className="flex-1" onClick={() => setDrawerOpen(false)} aria-hidden="true" />

          {/* Drawer Content Panel */}
          <div className="w-full max-w-md bg-[#0e0e0e] border-l-4 border-[#e60012] h-full overflow-y-auto flex flex-col justify-between p-6 p5-shadow-thick relative select-none animate-slideLeft">
            
            {/* Header: Title & Close Button */}
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#e60012] pb-4 mb-6">
                <div>
                  <span className="font-p5-impact text-xs text-[#e60012] tracking-widest uppercase block">
                    SYSTEM TAC-OPS // HUD
                  </span>
                  <h3 className="font-p5-display text-2xl font-bold text-[#f7f5f2] tracking-wider">
                    METAVERSE RADAR
                  </h3>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="px-3 py-1 bg-[#171717] hover:bg-[#e60012] text-[#f7f5f2] hover:text-[#080808] border border-[#ff1b2d] font-p5-mono text-xs uppercase transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  ESC [X]
                </button>
              </div>

              {/* 1. Tactical Navigation Links */}
              <div className="mb-6">
                <span className="font-p5-mono text-[10px] text-[#777] uppercase tracking-wider block mb-2">
                  &gt; MISSION TARGETS
                </span>
                <div className="space-y-1.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center justify-between px-3 py-2 bg-[#141414] hover:bg-[#e60012] text-[#f7f5f2] hover:text-[#080808] border-l-3 border-l-[#ff1b2d] font-p5-impact text-base tracking-wider uppercase transition-all comic-jitter-hover group"
                    >
                      <span>{link.label}</span>
                      <span className="font-p5-mono text-xs text-[#b9b9b9] group-hover:text-[#080808]">
                        [{link.code}] ▶
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* 2. Unified Sound / Phantom Radio Console */}
              <div className="mb-6 p-4 bg-[#141414] border-2 border-[#262626] p5-cut-corner">
                <div className="flex items-center justify-between mb-3 border-b border-[#222] pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-p5-impact text-xs text-[#ff1b2d] tracking-wider uppercase">
                      📻 PHANTOM RADIO
                    </span>
                    <span className="font-p5-mono text-[9px] text-[#777]">
                      FM 82.4 MHZ
                    </span>
                  </div>

                  {/* On Air Indicator */}
                  <span
                    className={`px-1.5 py-0.5 font-p5-impact text-[9px] tracking-widest uppercase transform -rotate-1 ${
                      isPlaying
                        ? isMuted
                          ? 'bg-[#ffcc00] text-[#080808]'
                          : 'bg-[#ff1b2d] text-[#f7f5f2] shadow-[0_0_8px_#ff1b2d]'
                        : 'bg-[#222] text-[#777]'
                    }`}
                  >
                    {isPlaying ? (isMuted ? 'MUTED' : 'ON AIR') : 'OFF AIR'}
                  </span>
                </div>

                {/* Pulsing Hint Banner inside Drawer when paused > 10s */}
                {showListenHint && !isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="mb-2 p-2 bg-[#ff1b2d]/15 border border-[#ff1b2d] flex items-center justify-between animate-pulse cursor-pointer hover:bg-[#ff1b2d]/25 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#ff1b2d] rotate-45 inline-block" />
                      <span className="font-p5-impact text-[11px] text-[#ff1b2d] tracking-wider uppercase">
                        CLICK TO LISTEN // SYNTH-JAZZ
                      </span>
                    </div>
                    <span className="font-p5-mono text-[9px] text-[#080808] bg-[#ff1b2d] px-1.5 py-0.5 font-bold">
                      PLAY ▶
                    </span>
                  </div>
                )}

                {/* Play/Pause & Equalizer Bar */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <button
                    onClick={togglePlay}
                    className={`flex-1 py-1.5 font-p5-impact text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                      isPlaying
                        ? 'bg-[#e60012] text-[#080808] hover:bg-[#ff1b2d]'
                        : 'bg-[#222] text-[#f7f5f2] hover:bg-[#e60012] hover:text-[#080808] border border-[#333]'
                    }`}
                  >
                    <span>{isPlaying ? '■ PAUSE AMBIANCE' : '▶ PLAY SYNTH-JAZZ'}</span>
                  </button>

                  {/* Equalizer Visualizer */}
                  <div className="flex items-end gap-1 h-5 px-1.5 py-0.5 bg-[#080808] border border-[#222] shrink-0" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((barIdx) => {
                      const active = isPlaying && !isMuted;
                      const barHeights = [
                        (currentStep * 4 + barIdx * 5) % 16 + 4,
                        ((currentStep + 2) * 5 + barIdx * 3) % 18 + 4,
                        ((currentStep + 1) * 6 + barIdx * 4) % 20 + 3,
                        ((currentStep + 3) * 4 + barIdx * 6) % 17 + 4,
                        ((currentStep + 2) * 5 + barIdx * 2) % 15 + 4,
                      ];
                      return (
                        <div
                          key={barIdx}
                          className={`w-1 transition-all duration-150 ${active ? 'bg-[#ff1b2d]' : 'bg-[#333]'}`}
                          style={{
                            height: active ? (prefersReducedMotion ? '10px' : `${barHeights[barIdx]}px`) : '3px',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Volume Slider HUD */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-[10px] font-p5-mono text-[#b9b9b9]">
                    <span>VOLUME: {isMuted ? '0% (MUTED)' : `${Math.round(volume * 100)}%`}</span>
                    <button
                      onClick={toggleMute}
                      className="hover:text-[#ff1b2d] cursor-pointer"
                    >
                      {isMuted ? 'UNMUTE [🔊]' : 'MUTE [🔇]'}
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => changeVolume(parseFloat(e.target.value))}
                    className="w-full accent-[#ff1b2d] bg-[#222] h-1.5 cursor-pointer"
                    aria-label="Adjust background synth-jazz volume"
                  />
                </div>
              </div>

              {/* 3. Unified Palace / Dungeon Metaverse Radar */}
              <div>
                <span className="font-p5-mono text-[10px] text-[#777] uppercase tracking-wider block mb-2">
                  &gt; ACTIVE PALACE DUNGEON RADAR
                </span>

                <div className="space-y-1.5">
                  {palaces.map((p) => {
                    const isCurrent = p.id === activePalace.id;

                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPalace(p.sectionId)}
                        className={`w-full text-left p-2.5 transition-all flex items-center justify-between border cursor-pointer ${
                          isCurrent
                            ? 'bg-[#1c080a] border-l-4 font-bold shadow-[2px_2px_0px_#080808]'
                            : 'bg-[#141414] hover:bg-[#1a1a1a] border-[#222]'
                        }`}
                        style={{ borderLeftColor: p.color }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{p.icon}</span>
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
                          {isCurrent ? '★ ACTIVE' : p.securityLevel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Action Flash // Camera Transition Trigger Hub */}
              <div className="mt-6 p-4 bg-[#141414] border-2 border-[#ff1b2d] p5-cut-corner p5-shadow-red">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#222]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#ff1b2d] text-xs">⚡</span>
                    <span className="font-p5-impact text-xs tracking-wider uppercase text-[#f7f5f2]">
                      ACTION FLASH ENGINE
                    </span>
                  </div>
                  <span className="font-p5-mono text-[9px] text-[#ff1b2d] uppercase">
                    P5 TRANSITION
                  </span>
                </div>
                <p className="font-p5-mono text-[10px] text-[#b9b9b9] mb-3">
                  Simulate red-tinted camera shutter flash with authentic audio click &amp; HUD viewfinder:
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      triggerFlash({
                        variant: 'camera',
                        text: 'ACTION SNAP!',
                        subtext: 'METAVERSE SHUTTER // EXPOSURE MAX',
                      });
                    }}
                    className="p-2 bg-[#080808] hover:bg-[#ff1b2d] text-[#f7f5f2] hover:text-[#080808] border border-[#333] hover:border-[#ff1b2d] font-p5-impact text-xs tracking-wider uppercase transition-colors text-center cursor-pointer"
                  >
                    📷 CAMERA FLASH
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      triggerFlash({
                        variant: 'critical',
                        text: 'CRITICAL STRIKE!',
                        subtext: 'WEAKNESS EXPLOITED // FINISHER READY',
                      });
                    }}
                    className="p-2 bg-[#080808] hover:bg-[#e60012] text-[#f7f5f2] hover:text-[#080808] border border-[#333] hover:border-[#e60012] font-p5-impact text-xs tracking-wider uppercase transition-colors text-center cursor-pointer"
                  >
                    ★ CRITICAL HIT
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      triggerFlash({
                        variant: 'ambush',
                        text: 'AMBUSH!',
                        subtext: 'SURPRISE INFILTRATION CHANCE',
                      });
                    }}
                    className="p-2 bg-[#080808] hover:bg-[#ff1b2d] text-[#f7f5f2] hover:text-[#080808] border border-[#333] hover:border-[#ff1b2d] font-p5-impact text-xs tracking-wider uppercase transition-colors text-center cursor-pointer"
                  >
                    ✦ AMBUSH!
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      triggerFlash({
                        variant: 'subtle',
                      });
                    }}
                    className="p-2 bg-[#080808] hover:bg-[#333] text-[#b9b9b9] hover:text-[#f7f5f2] border border-[#222] font-p5-mono text-xs uppercase tracking-wider transition-colors text-center cursor-pointer"
                  >
                    ◈ SUBTLE GLOW
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      window.dispatchEvent(new CustomEvent('p5-trigger-saferoom'));
                    }}
                    className="col-span-2 p-2 bg-[#1a0f00] hover:bg-[#ffb347] text-[#ffb347] hover:text-[#080808] border border-[#ffb347] font-p5-impact text-xs tracking-wider uppercase transition-colors text-center cursor-pointer"
                  >
                    ☕ PREVIEW SAFE ROOM ALERT
                  </button>
                </div>
              </div>

            </div>

            {/* Footer Actions inside Drawer */}
            <div className="pt-6 border-t border-[#222] space-y-2">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onReplayIntro();
                }}
                className="w-full py-2 bg-[#141414] hover:bg-[#222] text-[#f7f5f2] hover:text-[#ff1b2d] border border-[#333] font-p5-mono text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                ▶ REPLAY INTRO SEQUENCE
              </button>

              <a
                href="#contact"
                onClick={() => setDrawerOpen(false)}
                className="block text-center py-2.5 bg-[#e60012] hover:bg-[#ff1b2d] text-[#080808] font-p5-impact text-sm tracking-wider uppercase transition-colors p5-shadow-black"
              >
                TRANSMIT CALLING CARD ▶
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
