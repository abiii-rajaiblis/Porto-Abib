import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { TriggeredSticker } from './TriggeredSticker';
import { ScrollReveal } from './ScrollReveal';
import { useActionFlash } from '../context/ActionFlashContext';

export const AboutSection: React.FC = () => {
  const { profile, quotes } = PORTFOLIO_DATA;
  const { triggerFlash } = useActionFlash();

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#0e0e0e] text-[#f7f5f2] overflow-hidden select-none">
      {/* Background Halftone & Red Angled Slash */}
      <div className="absolute inset-0 bg-halftone-dynamic opacity-35 pointer-events-none" />

      {/* Diagonal top divider slash */}
      <div
        className="absolute top-0 inset-x-0 h-12 bg-[#080808] pointer-events-none"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Slanted Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b-2 border-[#e60012] pb-6">
          <div>
            <div className="inline-block px-3 py-1 bg-[#e60012] text-[#080808] font-p5-impact text-xs tracking-widest uppercase transform -rotate-2 mb-2 p5-shadow-black">
              CHAPTER 01 // CONFIDANT DOSSIER
            </div>
            <h2 className="font-p5-display text-4xl sm:text-6xl font-bold tracking-wider text-[#f7f5f2]">
              THE OPERATIVE: <span className="text-[#ff1b2d]">HABIB AULIA</span>
            </h2>
          </div>
          <div className="font-p5-mono text-xs text-[#b9b9b9] tracking-wider uppercase">
            CALLSIGN: <span className="text-[#ff1b2d] font-bold">{profile.agentName}</span> // ALIAS: {profile.nickname}
          </div>
        </div>

        {/* 2-Column Split: Portrait + Dossier Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Official Portrait of Abi / Agent Ebi (5 cols) */}
          <ScrollReveal direction="left" className="lg:col-span-5 flex flex-col items-center">
            
            {/* The Stylized Persona 5 Photo Frame */}
            <div
              onClick={() => {
                triggerFlash({
                  variant: 'camera',
                  text: 'CONFIDANT SNAP!',
                  subtext: 'AGENT EBI // DOSSIER FILE #01',
                });
              }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] sm:aspect-[4/5] bg-[#141414] border-4 border-[#ff1b2d] p5-cut-corner-lg p5-shadow-white group overflow-hidden cursor-pointer"
              title="Click to take an Action Snap photo of Agent Ebi"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  triggerFlash({
                    variant: 'camera',
                    text: 'CONFIDANT SNAP!',
                    subtext: 'AGENT EBI // DOSSIER FILE #01',
                  });
                }
              }}
            >
              
              {/* Photo Image */}
              <img
                src={profile.photoUrl}
                alt="Portrait of Habib Aulia Az Zuhri (Abi / Agent Ebi) in dark crimson gothic punk styling"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  // Fallback container if path fails
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Halftone texture overlay */}
              <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />

              {/* Diagonal speed lines */}
              <div className="absolute inset-0 bg-p5-stripes opacity-20 pointer-events-none" />

              {/* Slanted Tape Sticker Top */}
              <div className="absolute top-4 left-4 bg-[#e60012] text-[#080808] px-3.5 py-1 font-p5-impact text-xs tracking-widest uppercase transform -rotate-4 border-2 border-[#080808] shadow-[3px_3px_0px_#080808]">
                AGENT EBI // TAC-OPS
              </div>

              {/* Confidential Arcana Badge Bottom */}
              <div className="absolute bottom-4 inset-x-4 bg-[#080808]/90 border-2 border-[#ff1b2d] p-3 text-center backdrop-blur-sm">
                <span className="font-p5-mono text-[11px] text-[#ff1b2d] tracking-widest block uppercase font-bold">
                  HABIB AULIA AZ ZUHRI
                </span>
                <span className="font-p5-mono text-[10px] text-[#b9b9b9] block">
                  KNOWN AS "ABI" / OPERATIVE "AGENT EBI"
                </span>
              </div>
            </div>

            {/* Micro Quote beneath photo */}
            <div className="w-full max-w-sm sm:max-w-md mt-4 p-3 bg-[#171717] border-l-4 border-[#ff1b2d] text-xs font-p5-mono text-[#b9b9b9]">
              "Behind the mask lies an engineer crafting defiant, game-grade digital realities."
            </div>

          </ScrollReveal>

          {/* Right Column: Deep Explanation & Identity Narrative (7 cols) */}
          <ScrollReveal direction="right" delay={150} className="lg:col-span-7 space-y-6">
            
            {/* The Dual Nature Narrative Card */}
            <div className="bg-[#171717] p5-cut-corner border-2 border-[#e60012] p-6 sm:p-7 p5-shadow-thick">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 bg-[#e60012] rotate-45 inline-block" />
                <h3 className="font-p5-impact text-xl sm:text-2xl text-[#f7f5f2] tracking-wide uppercase">
                  WHO IS HABIB AULIA AZ ZUHRI / ABI / AGENT EBI?
                </h3>
              </div>

              <div className="space-y-4 text-[#d1d1d1] text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-[#f7f5f2]">Habib Aulia Az Zuhri</strong> is a developer, visual designer, and creative technologist who refuses to accept sterile, predictable web software.
                </p>
                <p>
                  Known warmly as <span className="text-[#ff1b2d] font-bold">"Abi"</span> among friends, peers, and collaborators, he represents the dedicated engineer — pragmatic, architecturally disciplined, and obsessed with clean TypeScript and sub-second performance.
                </p>
                <p>
                  In the high-stakes realm of digital creativity, he operates under the persona <span className="text-[#ff1b2d] font-bold">"Agent Ebi"</span>: a defiant phantom operative who infiltrates boring interfaces, slashing through rigid corporate grids with dynamic comic slashes, tactile micro-interactions, and visual swagger inspired by subversive editorial arts.
                </p>
              </div>

              {/* Persona Dualism Breakdown Box */}
              <div className="mt-6 pt-5 border-t border-[#2a2a2a] grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Persona 1: Abi */}
                <div className="bg-[#0e0e0e] p-4 border border-[#333] border-l-3 border-l-[#f7f5f2]">
                  <span className="font-p5-impact text-xs tracking-widest text-[#f7f5f2] uppercase block mb-1">
                    01. ABI — THE ARCHITECT
                  </span>
                  <p className="font-p5-body text-xs text-[#a0a0a0] leading-relaxed">
                    Full-stack precision, concurrent React, strict TypeScript types, server stability, and reliable database architecture.
                  </p>
                </div>

                {/* Persona 2: Agent Ebi */}
                <div className="bg-[#0e0e0e] p-4 border border-[#333] border-l-3 border-l-[#ff1b2d]">
                  <span className="font-p5-impact text-xs tracking-widest text-[#ff1b2d] uppercase block mb-1">
                    02. AGENT EBI — THE OPERATIVE
                  </span>
                  <p className="font-p5-body text-xs text-[#a0a0a0] leading-relaxed">
                    Persona 5 art direction, kinetic sound &amp; motion design, bespoke vector illustration, and Gen Z creative authenticity.
                  </p>
                </div>

              </div>
            </div>

            {/* Interactive Callout Quote & Philosophy */}
            <div className="bg-[#e60012] text-[#080808] p-5 border-2 border-[#080808] transform rotate-1 p5-shadow-black">
              <div className="flex items-center justify-between mb-1">
                <span className="font-p5-impact text-xs tracking-widest uppercase bg-[#080808] text-[#f7f5f2] px-2 py-0.5">
                  OPERATIVE CREED
                </span>
                <span className="font-p5-mono text-xs font-bold">
                  {profile.agentName}
                </span>
              </div>
              <blockquote className="font-p5-display text-2xl sm:text-3xl font-bold tracking-wide">
                "{quotes[0].text}"
              </blockquote>
            </div>

            {/* Interactive Trait Stickers */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs font-p5-mono text-[#b9b9b9] uppercase">INSPECT PROFILE:</span>
              <TriggeredSticker
                label="AGENT EBI"
                triggeredText="Phantom operative striking with high-octane UI"
                soundFx="PERSONA"
                variant="crimson"
              />
              <TriggeredSticker
                label="ABI"
                triggeredText="Reliable fullstack software engineer & teammate"
                soundFx="CRITICAL"
                variant="white"
              />
              <TriggeredSticker
                label="HABIB AULIA"
                triggeredText="Creative technologist based in Indonesia"
                soundFx="ALL-OUT"
                variant="yellow"
              />
            </div>

            {/* Quantitative Stats HUD Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {profile.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#080808] border-2 border-[#e60012] p-3 p5-shadow-black transform hover:-translate-y-1 transition-transform text-center"
                >
                  <span className="font-p5-mono text-xl sm:text-2xl font-bold text-[#ff1b2d] tabular-nums block">
                    {stat.value}
                  </span>
                  <span className="font-p5-impact text-[10px] sm:text-[11px] text-[#b9b9b9] uppercase tracking-wider block mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
