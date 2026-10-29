import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

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

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentStep: number;
  prefersReducedMotion: boolean;
  showListenHint: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  changeVolume: (vol: number) => void;
  dismissListenHint: () => void;
}

const SynthJazzContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [currentStep, setCurrentStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showListenHint, setShowListenHint] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const isMutedRef = useRef(false);
  const volumeRef = useRef(0.6);
  const timerIdRef = useRef<number | null>(null);
  const hintTimerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  // 10-Second Paused Listen Hint Timer
  useEffect(() => {
    if (!isPlaying) {
      hintTimerRef.current = window.setTimeout(() => {
        setShowListenHint(true);
      }, 10000);
    } else {
      setShowListenHint(false);
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
        hintTimerRef.current = null;
      }
    }

    return () => {
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
      }
    };
  }, [isPlaying]);

  // Sync refs
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Initialize Web Audio graph
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      const initialVol = isMutedRef.current ? 0 : volumeRef.current * 0.35;
      masterGain.gain.setValueAtTime(initialVol, ctx.currentTime);

      // Warm analog lowpass filter
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

  const playRhodesChord = (ctx: AudioContext, destination: GainNode, notes: number[], duration = 2.4) => {
    const now = ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (idx === 0 ? -0.5 : 0.6), now);

      // Tremolo LFO
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(4.2, now);
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + duration);

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

  const scheduleLoop = useCallback(() => {
    if (!isPlayingRef.current || !audioCtxRef.current || !masterGainRef.current) return;

    const ctx = audioCtxRef.current;
    const dest = masterGainRef.current;
    const step = stepRef.current;
    const chordIndex = Math.floor(step / 2) % CHORDS.length;
    const currentChord = CHORDS[chordIndex];

    if (step % 2 === 0) {
      playRhodesChord(ctx, dest, currentChord.keys, 2.3);
      playJazzBass(ctx, dest, currentChord.bass, 1.1);
    } else {
      playJazzBass(ctx, dest, currentChord.bass * 1.5, 1.0);
    }

    playBrushedHat(ctx, dest);

    setCurrentStep(step);
    stepRef.current = (step + 1) % (CHORDS.length * 2);

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
        const targetVol = isMutedRef.current ? 0 : volumeRef.current * 0.35;
        masterGainRef.current.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(targetVol, audioCtxRef.current.currentTime + 0.3);
      }
      scheduleLoop();
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (masterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      if (nextMuted) {
        masterGainRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.1);
      } else {
        masterGainRef.current.gain.linearRampToValueAtTime(volume * 0.35, now + 0.1);
      }
    }
  };

  const changeVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (!isMuted && masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(clamped * 0.35, audioCtxRef.current.currentTime + 0.05);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <SynthJazzContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentStep,
        prefersReducedMotion,
        showListenHint,
        togglePlay,
        toggleMute,
        changeVolume,
        dismissListenHint: () => setShowListenHint(false),
      }}
    >
      {children}
    </SynthJazzContext.Provider>
  );
};

export const useSynthJazz = () => {
  const context = useContext(SynthJazzContext);
  if (!context) {
    throw new Error('useSynthJazz must be used within an AudioProvider');
  }
  return context;
};
