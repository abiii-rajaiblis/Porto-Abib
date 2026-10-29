import React, { useState, useEffect, useRef, useCallback } from 'react';

// Web Audio API Synthesizer for Persona 5 Safe Room Chime
function playSafeRoomChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // 1. Sparkling Haven Chime Bells (Ascending Arpeggio: Eb6, G6, Bb6, Eb7)
    const bellNotes = [1244.51, 1567.98, 1864.66, 2489.02];
    bellNotes.forEach((freq, idx) => {
      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      const bellPan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(freq, now + idx * 0.08);

      const noteTime = now + idx * 0.08;
      bellGain.gain.setValueAtTime(0, noteTime);
      bellGain.gain.linearRampToValueAtTime(0.18, noteTime + 0.015);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.85);

      if (bellPan) {
        bellPan.pan.setValueAtTime((idx - 1.5) * 0.35, noteTime);
        bellOsc.connect(bellGain);
        bellGain.connect(bellPan);
        bellPan.connect(ctx.destination);
      } else {
        bellOsc.connect(bellGain);
        bellGain.connect(ctx.destination);
      }

      bellOsc.start(noteTime);
      bellOsc.stop(noteTime + 0.9);
    });

    // 2. Warm Safe Room Rhodes / Jazz Chord Swell (Ebmaj9: Eb3, Bb3, D4, F4, G4)
    const chordPitches = [155.56, 233.08, 293.66, 349.23, 392.00];
    chordPitches.forEach((freq) => {
      const chordOsc = ctx.createOscillator();
      const chordGain = ctx.createGain();
      const chordFilter = ctx.createBiquadFilter();

      chordOsc.type = 'triangle';
      chordOsc.frequency.setValueAtTime(freq, now + 0.2);

      chordFilter.type = 'lowpass';
      chordFilter.frequency.setValueAtTime(1400, now + 0.2);
      chordFilter.frequency.exponentialRampToValueAtTime(450, now + 2.2);

      chordGain.gain.setValueAtTime(0, now + 0.2);
      chordGain.gain.linearRampToValueAtTime(0.12, now + 0.4);
      chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      chordOsc.connect(chordFilter);
      chordFilter.connect(chordGain);
      chordGain.connect(ctx.destination);

      chordOsc.start(now + 0.2);
      chordOsc.stop(now + 2.6);
    });

    // Clean up context after audio tail
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 3000);
  } catch {
    // Graceful fallback if audio is blocked or unsupported
  }
}

export const SafeRoomToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const timerRef = useRef<number | null>(null);

  const triggerSafeRoom = useCallback(() => {
    setIsVisible(true);
    setHasTriggered(true);
    playSafeRoomChime();
  }, []);

  const dismissToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // 5 minutes = 300,000 milliseconds
    const FIVE_MINUTES_MS = 5 * 60 * 1000;

    // Check if user already saw safe room in this session
    const seen = sessionStorage.getItem('p5_saferoom_seen');
    if (seen === 'true') {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      triggerSafeRoom();
      sessionStorage.setItem('p5_saferoom_seen', 'true');
    }, FIVE_MINUTES_MS);

    // Also support custom event for instant testing / dev preview
    const handleManualTrigger = () => {
      triggerSafeRoom();
    };
    window.addEventListener('p5-trigger-saferoom', handleManualTrigger);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener('p5-trigger-saferoom', handleManualTrigger);
    };
  }, [triggerSafeRoom]);

  const handleContactClick = () => {
    dismissToast();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:abibaulia26@gmail.com?subject=Collaborate%20with%20Habib%20Aulia%20(Agent%20Ebi)';
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[180] max-w-sm sm:max-w-md w-[calc(100vw-2rem)] sm:w-auto animate-fadeIn select-none"
      role="alert"
      aria-live="polite"
      aria-labelledby="saferoom-title"
    >
      {/* Persona 5 Angular Card Frame */}
      <div className="relative bg-[#121212] border-2 sm:border-3 border-[#ff1b2d] p5-cut-corner-lg p5-shadow-white shadow-2xl overflow-hidden">
        
        {/* Halftone & Speed Stripe Accent */}
        <div className="absolute inset-0 bg-halftone-red opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-p5-stripes opacity-15 pointer-events-none" />

        {/* Top Safe Room Banner Bar */}
        <div className="relative z-10 bg-[#e60012] text-[#080808] px-3.5 py-2 flex items-center justify-between border-b-2 border-[#080808]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#080808] rotate-45 inline-block" />
            <span className="font-p5-impact text-xs sm:text-sm tracking-widest uppercase">
              ★ SAFE ROOM SECURED // 0% ALERT
            </span>
          </div>

          <button
            type="button"
            onClick={dismissToast}
            className="flex items-center justify-center w-6 h-6 bg-[#080808] hover:bg-white text-[#f7f5f2] hover:text-[#080808] border border-[#080808] font-bold text-xs transition-colors cursor-pointer active:scale-95 touch-manipulation"
            aria-label="Dismiss Safe Room notification"
          >
            ✕
          </button>
        </div>

        {/* Toast Body */}
        <div className="relative z-10 p-4 space-y-3">
          <div className="flex items-start gap-3">
            {/* Coffee Cup / Leblanc Haven Badge */}
            <div className="shrink-0 w-11 h-11 bg-[#080808] border-2 border-[#ff1b2d] flex items-center justify-center p5-cut-corner text-lg">
              ☕
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-1.5 py-0.5 bg-[#ffb347] text-[#080808] font-p5-mono text-[9px] font-bold uppercase">
                  5 MIN INFILTRATION
                </span>
                <span className="text-[10px] font-p5-mono text-[#b9b9b9] uppercase">
                  CAFÉ LEBLANC HAVEN
                </span>
              </div>
              <h3 id="saferoom-title" className="font-p5-display text-xl sm:text-2xl font-bold text-[#f7f5f2] tracking-wide leading-tight">
                TAKE A BREAK, OPERATIVE!
              </h3>
            </div>
          </div>

          <p className="font-p5-body text-xs sm:text-sm text-[#d1d1d1] leading-relaxed">
            You've been exploring the Metaverse for over <span className="text-[#ff1b2d] font-bold">5 minutes</span>.
            Take your time, grab some warm coffee, or transmit a calling card directly to Habib (Agent Ebi) for your next project!
          </p>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleContactClick}
              className="flex-1 py-2 px-3 bg-[#e60012] hover:bg-[#ff1b2d] text-[#080808] font-p5-impact text-xs sm:text-sm tracking-wider uppercase transition-colors p5-shadow-black cursor-pointer text-center active:scale-95 touch-manipulation"
            >
              CONTACT ME ✉
            </button>

            <button
              type="button"
              onClick={dismissToast}
              className="py-2 px-3 bg-[#080808] hover:bg-[#222] text-[#f7f5f2] border border-[#ff1b2d] font-p5-impact text-xs tracking-wider uppercase transition-colors cursor-pointer active:scale-95 touch-manipulation"
            >
              TAKE A BREAK ☕
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
};
