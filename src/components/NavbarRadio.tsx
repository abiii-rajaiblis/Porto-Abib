import React, { useState } from 'react';
import { useSynthJazz } from '../context/AudioContext';

export const NavbarRadio: React.FC = () => {
  const {
    isPlaying,
    isMuted,
    volume,
    currentStep,
    prefersReducedMotion,
    showListenHint,
    togglePlay,
    toggleMute,
    changeVolume,
  } = useSynthJazz();

  const [showVolumePopup, setShowVolumePopup] = useState(false);

  return (
    <div className="relative flex items-center select-none" aria-label="Persona 5 Radio Ambiance Tuner">
      {/* Subtle Pulsing Hint when paused > 10s */}
      {showListenHint && !isPlaying && (
        <div className="absolute -top-7 right-0 px-2 py-0.5 bg-[#e60012] text-[#f7f5f2] border border-white font-p5-impact text-[9px] tracking-wider uppercase transform -rotate-2 animate-pulse shadow-[0_0_8px_#ff1b2d] whitespace-nowrap pointer-events-none z-10 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-white rotate-45 inline-block" />
          <span>CLICK TO LISTEN ♪</span>
        </div>
      )}
      
      {/* Radio Unit Chassis */}
      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#121212] border-2 border-[#e60012] px-2 sm:px-2.5 py-1 p5-shadow-black">
        
        {/* Visual "ON AIR" / "OFF AIR" Status Light Indicator */}
        <div className="flex items-center gap-1">
          <span
            className={`w-2 h-2 rotate-45 transition-colors duration-200 ${
              isPlaying
                ? isMuted
                  ? 'bg-[#ffcc00] animate-pulse'
                  : 'bg-[#ff1b2d] animate-ping'
                : 'bg-[#444]'
            }`}
            aria-hidden="true"
          />
          <span
            className={`px-1.5 py-0.5 font-p5-impact text-[10px] tracking-widest uppercase transition-colors duration-150 transform -rotate-1 ${
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

        {/* Radio Station Identifier (Desktop) */}
        <div className="hidden xl:flex flex-col text-left leading-none">
          <span className="font-p5-mono text-[9px] text-[#ff1b2d] tracking-wider font-bold">
            FM 82.4 MHZ
          </span>
          <span className="font-p5-impact text-[10px] text-[#b9b9b9] tracking-wider uppercase">
            SHIBUYA JAZZ
          </span>
        </div>

        {/* Equalizer Waveform Bars (Respects prefers-reduced-motion) */}
        <div className="hidden sm:flex items-end gap-0.5 h-4 px-1 py-0.5 bg-[#080808] border border-[#262626] shrink-0" aria-hidden="true">
          {[0, 1, 2, 3].map((barIdx) => {
            const active = isPlaying && !isMuted;
            const barHeights = [
              (currentStep * 3 + barIdx * 4) % 12 + 3,
              ((currentStep + 1) * 4 + barIdx * 3) % 14 + 3,
              ((currentStep + 2) * 5 + barIdx * 2) % 13 + 3,
              ((currentStep + 3) * 3 + barIdx * 5) % 11 + 3,
            ];

            return (
              <div
                key={barIdx}
                className={`w-1 transition-all duration-100 ${
                  active ? 'bg-[#ff1b2d]' : 'bg-[#333]'
                }`}
                style={{
                  height: active
                    ? prefersReducedMotion
                      ? '7px'
                      : `${barHeights[barIdx]}px`
                    : '2px',
                }}
              />
            );
          })}
        </div>

        {/* Toggle Play / Pause Main Trigger */}
        <button
          onClick={togglePlay}
          className={`px-2 py-0.5 font-p5-impact text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-white comic-jitter-hover ${
            isPlaying
              ? 'bg-[#e60012] text-[#080808] hover:bg-[#ff1b2d]'
              : 'bg-[#222] text-[#f7f5f2] hover:bg-[#e60012] hover:text-[#080808] border border-[#333]'
          }`}
          aria-label={isPlaying ? 'Turn off synth-jazz radio' : 'Turn on synth-jazz radio'}
          title={isPlaying ? 'Pause Radio Ambiance' : 'Play Radio Ambiance'}
        >
          <span>{isPlaying ? '■ PAUSE' : '▶ RADIO'}</span>
        </button>

        {/* Volume HUD Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowVolumePopup((prev) => !prev)}
            className={`p-1 text-xs font-p5-mono border transition-colors cursor-pointer flex items-center justify-center ${
              showVolumePopup || isMuted
                ? 'bg-[#ff1b2d] text-[#080808] border-[#ff1b2d]'
                : 'bg-[#1a1a1a] text-[#b9b9b9] hover:text-[#f7f5f2] border-[#333]'
            }`}
            aria-label="Toggle radio volume settings"
            title="Volume Control"
          >
            <span>{isMuted ? '🔇' : volume === 0 ? '🔈' : volume < 0.5 ? '🔉' : '🔊'}</span>
          </button>

          {/* Volume Control Floating Panel */}
          {showVolumePopup && (
            <div className="absolute top-full right-0 mt-2 z-50 w-48 p-3 bg-[#0e0e0e] border-2 border-[#ff1b2d] p5-cut-corner p5-shadow-black animate-fadeIn">
              
              <div className="flex items-center justify-between border-b border-[#242424] pb-1.5 mb-2">
                <span className="font-p5-impact text-xs text-[#ff1b2d] tracking-wider uppercase">
                  RADIO VOLUME
                </span>
                <span className="font-p5-mono text-[10px] text-[#f7f5f2] font-bold">
                  {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                </span>
              </div>

              {/* Volume Slider */}
              <div className="space-y-2 mb-3">
                <label htmlFor="navbar-volume-slider" className="sr-only">Radio volume slider</label>
                <input
                  id="navbar-volume-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    changeVolume(val);
                  }}
                  className="w-full accent-[#ff1b2d] bg-[#222] h-1.5 cursor-pointer"
                />
              </div>

              {/* Quick Mute & Preset Buttons */}
              <div className="flex items-center justify-between gap-1">
                <button
                  onClick={toggleMute}
                  className={`flex-1 py-1 font-p5-mono text-[10px] uppercase font-bold transition-colors cursor-pointer ${
                    isMuted
                      ? 'bg-[#ff1b2d] text-[#080808]'
                      : 'bg-[#1e1e1e] text-[#f7f5f2] hover:bg-[#333]'
                  }`}
                >
                  {isMuted ? 'UNMUTE' : 'MUTE'}
                </button>

                <button
                  onClick={() => changeVolume(0.5)}
                  className="px-2 py-1 bg-[#1e1e1e] hover:bg-[#333] text-[#b9b9b9] font-p5-mono text-[10px] transition-colors cursor-pointer"
                  title="Set volume to 50%"
                >
                  50%
                </button>

                <button
                  onClick={() => changeVolume(1.0)}
                  className="px-2 py-1 bg-[#1e1e1e] hover:bg-[#333] text-[#b9b9b9] font-p5-mono text-[10px] transition-colors cursor-pointer"
                  title="Set volume to 100%"
                >
                  MAX
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
