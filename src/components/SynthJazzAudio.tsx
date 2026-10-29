import React, { useState, useEffect, useRef, useCallback } from 'react';

// Jazz chord frequencies in Hz (Rhodes EP voice)
interface ChordNote {
  bass: number;
  keys: number[];
}

const CHORDS: ChordNote[] = [
  // 1. Dm9
  { bass: 73.42, keys: [174.61, 220.0, 261.63, 329.63] }, // D2, F3, A3, C4, E4
  // 2. G13
  { bass: 98.0, keys: [164.81, 220.0, 246.94, 329.63] },  // G2, E3, A3, B3, E4
  // 3. Cmaj9
  { bass: 65.41, keys: [164.81, 196.0, 246.94, 293.66] }, // C2, E3, G3, B3, D4
  // 4. A7(b13)
  { bass: 110.0, keys: [174.61, 220.0, 277.18, 329.63] }, // A2, F3, A3, C#4, E4
];

export const SynthJazzAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentStep, setCurrentStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const timerIdRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Initialize Audio Context on demand
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);

      // Warm master analog filter (low pass to emulate vintage tape warmth)
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(2200, ctx.currentTime);
      lowpass.Q.setValueAtTime(0.8, ctx.currentTime);

      masterGain.connect(lowpass);
      lowpass.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Play Rhodes electric piano chord
  const playRhodesChord = (ctx: AudioContext, destination: GainNode, notes: number[], duration = 2.4) => {
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      // Primary chime tone
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      // Slightly detune to give lush chorus feel
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (idx === 0 ? -0.5 : 0.6), now);

      // Tremolo LFO
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(4.2, now); // 4.2Hz gentle vibrato
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + duration);

      // Velvety envelope
      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.exponentialRampToValueAtTime(0.07, now + 0.04);
      oscGain.gain.exponentialRampToValueAtTime(0.035, now + 0.5);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(oscGain);
      oscGain.connect(destination);

      osc.start(now);
      osc.stop(now + duration);
    });
  };

  // Play walking acoustic/synth jazz bass
  const playJazzBass = (ctx: AudioContext, destination: GainNode, freq: number, duration = 1.1) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + duration);
  };

  // Play soft brushed jazz hi-hat/cymbal
  const playBrushedHat = (ctx: AudioContext, destination: GainNode) => {
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    noise.start(now);
  };

  // Step sequencer ticker
  const scheduleLoop = useCallback(() => {
    if (!isPlayingRef.current || !audioCtxRef.current || !masterGainRef.current) return;

    const ctx = audioCtxRef.current;
    const dest = masterGainRef.current;
    const step = stepRef.current;
    const chordIndex = Math.floor(step / 2) % CHORDS.length;
    const currentChord = CHORDS[chordIndex];

    // Trigger chord on primary bar start
    if (step % 2 === 0) {
      playRhodesChord(ctx, dest, currentChord.keys, 2.3);
      playJazzBass(ctx, dest, currentChord.bass, 1.1);
    } else {
      // Secondary walking bass step (5th interval or octave)
      playJazzBass(ctx, dest, currentChord.bass * 1.5, 1.0);
    }

    // Brushed jazz hi-hat rhythm
    playBrushedHat(ctx, dest);

    setCurrentStep(step);
    stepRef.current = (step + 1) % (CHORDS.length * 2);

    // 84 BPM half-beat ~ 714ms
    timerIdRef.current = window.setTimeout(scheduleLoop, 714);
  }, []);

  const togglePlay = () => {
    initAudio();

    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.1);
      }
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      if (masterGainRef.current && audioCtxRef.current) {
        const targetVol = isMuted ? 0 : volume * 0.4;
        masterGainRef.current.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(targetVol, audioCtxRef.current.currentTime + 0.3);
      }
      scheduleLoop();
    }
  };

  const toggleMute = () => {
    if (!masterGainRef.current || !audioCtxRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    const now = audioCtxRef.current.currentTime;
    if (newMuted) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.1);
    } else {
      masterGainRef.current.gain.linearRampToValueAtTime(volume * 0.4, now + 0.1);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      className="fixed bottom-4 right-4 z-40 select-none max-w-[280px] sm:max-w-[320px]"
      aria-label="Persona 5 Synth-Jazz Background Ambiance Player"
    >
      <div className="bg-[#080808]/95 border-2 border-[#ff1b2d] p5-cut-corner p-2.5 sm:p-3 p5-shadow-black shadow-[4px_4px_0px_#e60012] backdrop-blur-md">
        
        {/* Header row: Status & Title */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span
              className={`w-2 h-2 rounded-none rotate-45 shrink-0 ${
                isPlaying ? 'bg-[#ff1b2d]' : 'bg-[#555]'
              }`}
            />
            <span className="font-p5-impact text-[11px] text-[#f7f5f2] tracking-wider truncate uppercase">
              BENEATH THE CODE // SYNTH-JAZZ
            </span>
          </div>

          <span className="font-p5-mono text-[9px] text-[#ff1b2d] shrink-0 uppercase tracking-widest px-1 bg-[#1a0507] border border-[#ff1b2d]/50">
            {isPlaying ? (isMuted ? 'MUTED' : 'PLAYING') : 'PAUSED'}
          </span>
        </div>

        {/* Interactive Bar & Visualizer Controls */}
        <div className="flex items-center justify-between gap-3">
          
          {/* Main Play / Pause Button */}
          <button
            onClick={togglePlay}
            className={`px-3 py-1 font-p5-impact text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-white ${
              isPlaying
                ? 'bg-[#e60012] text-[#080808] hover:bg-[#ff1b2d]'
                : 'bg-[#1a1a1a] text-[#f7f5f2] hover:bg-[#e60012] hover:text-[#080808] border border-[#333]'
            }`}
            aria-label={isPlaying ? 'Pause background synth-jazz ambiance' : 'Play Persona 5-inspired synth-jazz ambiance'}
          >
            <span>{isPlaying ? '❚❚ PAUSE' : '▶ PLAY JAZZ'}</span>
          </button>

          {/* Equalizer Frequency Bars (Respects prefers-reduced-motion) */}
          <div className="flex items-end gap-1 h-5 px-1.5 py-0.5 bg-[#141414] border border-[#2a2a2a] shrink-0" aria-hidden="true">
            {[0, 1, 2, 3, 4].map(barIdx => {
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
                  className={`w-1 transition-all duration-150 ${
                    active ? 'bg-[#ff1b2d]' : 'bg-[#333]'
                  }`}
                  style={{
                    height: active
                      ? prefersReducedMotion
                        ? '10px'
                        : `${barHeights[barIdx]}px`
                      : '3px',
                  }}
                />
              );
            })}
          </div>

          {/* Quick Mute / Unmute Button */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="p-1 text-[#b9b9b9] hover:text-[#ff1b2d] font-p5-mono text-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#ff1b2d]"
              aria-label={isMuted ? 'Unmute ambiance' : 'Mute ambiance'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
