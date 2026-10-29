import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

export type FlashVariant = 'camera' | 'critical' | 'ambush' | 'subtle';

export interface FlashOptions {
  variant?: FlashVariant;
  text?: string;
  subtext?: string;
  duration?: number;
  sound?: boolean;
  onComplete?: () => void;
}

interface ActionFlashContextType {
  isFlashing: boolean;
  currentFlash: FlashOptions | null;
  triggerFlash: (options?: FlashOptions) => void;
  prefersReducedMotion: boolean;
}

const ActionFlashContext = createContext<ActionFlashContextType | undefined>(undefined);

// Web Audio API Shutter Sound Synthesizer
function playShutterSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // 1. Mirror flap mechanical noise burst (sharp click ~20ms)
    const bufferSize = ctx.sampleRate * 0.04;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2200, now);
    noiseFilter.Q.setValueAtTime(3.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.04);

    // 2. Heavy Shutter curtain snap + punch (40ms later)
    const curtainOsc = ctx.createOscillator();
    const curtainGain = ctx.createGain();

    curtainOsc.type = 'triangle';
    curtainOsc.frequency.setValueAtTime(380, now + 0.03);
    curtainOsc.frequency.exponentialRampToValueAtTime(60, now + 0.09);

    curtainGain.gain.setValueAtTime(0, now);
    curtainGain.gain.setValueAtTime(0.4, now + 0.03);
    curtainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    curtainOsc.connect(curtainGain);
    curtainGain.connect(ctx.destination);

    curtainOsc.start(now + 0.03);
    curtainOsc.stop(now + 0.1);

    // Auto-close audio context after sound completes
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 350);
  } catch {
    // Graceful fallback if audio is blocked or unsupported
  }
}

export const ActionFlashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [currentFlash, setCurrentFlash] = useState<FlashOptions | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  const triggerFlash = useCallback((options?: FlashOptions) => {
    const opts: FlashOptions = {
      variant: options?.variant || 'camera',
      text: options?.text,
      subtext: options?.subtext,
      duration: options?.duration || (options?.variant === 'subtle' ? 220 : 480),
      sound: options?.sound !== false,
      onComplete: options?.onComplete,
    };

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setCurrentFlash(opts);
    setIsFlashing(true);

    // Trigger synthetic shutter sound unless explicitly disabled or user prefers reduced motion
    if (opts.sound && !prefersReducedMotion) {
      playShutterSound();
    }

    const duration = prefersReducedMotion ? Math.min(opts.duration || 300, 200) : (opts.duration || 480);

    timerRef.current = window.setTimeout(() => {
      setIsFlashing(false);
      setCurrentFlash(null);
      if (opts.onComplete) {
        opts.onComplete();
      }
    }, duration);
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ActionFlashContext.Provider
      value={{
        isFlashing,
        currentFlash,
        triggerFlash,
        prefersReducedMotion,
      }}
    >
      {children}
    </ActionFlashContext.Provider>
  );
};

export const useActionFlash = (): ActionFlashContextType => {
  const context = useContext(ActionFlashContext);
  if (!context) {
    throw new Error('useActionFlash must be used within an ActionFlashProvider');
  }
  return context;
};
