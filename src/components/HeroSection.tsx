import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { TriggeredSticker } from './TriggeredSticker';
import { ScrollReveal } from './ScrollReveal';
import { useActionFlash } from '../context/ActionFlashContext';

export const HeroSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const [portraitTriggered, setPortraitTriggered] = useState(false);
  const { triggerFlash } = useActionFlash();

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center overflow-hidden py-12 md:py-20 select-none">
      {/* Background Halftone & Angular Speed Cutouts */}
      <div className="absolute inset-0 bg-halftone-dynamic opacity-40 pointer-events-none" />
      
      {/* Dynamic diagonal crimson slash backdrop */}
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-2/3 bg-gradient-to-l from-[#e60012]/30 via-[#e60012]/10 to-transparent pointer-events-none"
        style={{
          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Oversized Editorial Typography & Ransom Cutouts (7 cols) */}
          <ScrollReveal direction="left" className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Mission Identifier & Status */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-[#e60012] text-[#080808] font-p5-impact text-xs sm:text-sm tracking-widest transform -rotate-2 p5-shadow-black">
                PHANTOM THIEF OF CODE
              </span>
              <span className="font-p5-mono text-xs text-[#b9b9b9] tracking-wider uppercase">
                ID: {profile.monogram} · 2026 EDITION
              </span>
            </div>

            {/* Oversized Persona 5 Ransom Headline */}
            <div className="w-full">
              <h1 className="sr-only">{profile.name}</h1>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-1">
                {/* HABIB */}
                <span className="inline-block px-4 py-1.5 sm:px-6 sm:py-2.5 bg-[#f7f5f2] text-[#080808] font-p5-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wider transform -rotate-2 shadow-[6px_6px_0px_#e60012] hover:rotate-0 hover:scale-105 transition-all duration-150">
                  HABIB
                </span>
                
                {/* AULIA */}
                <span className="inline-block px-4 py-1.5 sm:px-6 sm:py-2.5 bg-[#080808] text-[#f7f5f2] border-3 border-[#f7f5f2] font-p5-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wider transform rotate-2 p5-shadow-red hover:rotate-0 hover:scale-105 transition-all duration-150">
                  AULIA
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-1">
                {/* AZ */}
                <span className="inline-block px-3 py-1 sm:px-5 sm:py-2 bg-[#ff1b2d] text-[#080808] font-p5-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider transform rotate-3 shadow-[5px_5px_0px_#080808] hover:rotate-0 hover:scale-105 transition-all duration-150">
                  AZ
                </span>

                {/* ZUHRI */}
                <span className="inline-block px-4 py-1.5 sm:px-6 sm:py-2.5 bg-[#f7f5f2] text-[#080808] font-p5-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wider transform -rotate-1 shadow-[6px_6px_0px_#080808] hover:rotate-0 hover:scale-105 transition-all duration-150">
                  ZUHRI
                </span>
              </div>
            </div>

            {/* Sub-role Banner with Slanted Geometry */}
            <div className="bg-[#080808] border-2 border-[#ff1b2d] p5-shadow-red px-4 py-2.5 transform -rotate-1 max-w-xl">
              <p className="font-p5-impact text-base sm:text-xl text-[#f7f5f2] tracking-wider leading-snug">
                DEVELOPER <span className="text-[#ff1b2d]">★</span> DESIGNER <span className="text-[#ff1b2d]">★</span> CREATIVE TECHNOLOGIST
              </p>
            </div>

            {/* Editorial Bio Snippet */}
            <p className="text-[#b9b9b9] text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              {profile.bioSnippet}
            </p>

            {/* Interactive Triggered Stickers Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <TriggeredSticker
                label="ALL-OUT STRIKE"
                triggeredText="Full-stack precision with 60 FPS visual flair"
                soundFx="CRITICAL"
                variant="crimson"
                angle={-3}
              />
              <TriggeredSticker
                label="CONFIDANT LVL 10"
                triggeredText="Reliable collaborator for high-stakes digital products"
                soundFx="PERSONA"
                variant="black"
                angle={2}
              />
              <TriggeredSticker
                label="GEN Z"
                triggeredText="Gen Z creative vision, bold aesthetics & fearless digital craft"
                soundFx="SLASH"
                variant="white"
                angle={-2}
              />
            </div>

            {/* Primary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-[#e60012] hover:bg-[#ff1b2d] text-[#080808] font-p5-impact text-xl tracking-wider uppercase transition-all duration-150 transform hover:-translate-y-1 p5-shadow-black cursor-pointer focus-visible:outline-2 focus-visible:outline-[#f7f5f2]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>VIEW PROJECTS</span>
                  <span className="font-p5-mono text-base">▶</span>
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#080808] hover:bg-[#171717] text-[#f7f5f2] border-2 border-[#f7f5f2] font-p5-impact text-xl tracking-wider uppercase transition-all duration-150 transform hover:-translate-y-1 p5-shadow-red cursor-pointer focus-visible:outline-2 focus-visible:outline-[#ff1b2d]"
              >
                CONTACT ME
              </a>
            </div>

          </ScrollReveal>

          {/* Right Column: Stylized Persona 5 Hero Cutout Portrait & Visual Center (5 cols) */}
          <ScrollReveal direction="right" delay={150} className="lg:col-span-5 flex justify-center items-center relative mt-6 lg:mt-0">
            
            {/* Diagonal Frame & Speed Stripes */}
            <div className="relative w-full max-w-md aspect-[4/5] p5-cut-corner-lg bg-[#141414] border-4 border-[#e60012] p5-shadow-white group overflow-hidden">
              
              {/* Comic Halftone Inside Card */}
              <div className="absolute inset-0 bg-halftone-red opacity-30 pointer-events-none" />

              {/* Speed Lines */}
              <div className="absolute inset-0 bg-p5-stripes opacity-40 pointer-events-none" />

              {/* Big Joker/Phantom Mask Motif Graphic (SVG Vector) */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <svg
                  viewBox="0 0 400 500"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(230,0,18,0.5)] transition-transform duration-300 group-hover:scale-105"
                  aria-label="Stylized Persona 5 Character Cutout Portrait"
                >
                  <defs>
                    <linearGradient id="p5RedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff1b2d" />
                      <stop offset="100%" stopColor="#8c000a" />
                    </linearGradient>
                    <linearGradient id="p5WhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#d1d1d1" />
                    </linearGradient>
                  </defs>

                  {/* Dynamic background polygon rays */}
                  <polygon points="200,250 50,0 120,0" fill="#e60012" opacity="0.6" />
                  <polygon points="200,250 380,50 400,140" fill="#ff1b2d" opacity="0.5" />
                  <polygon points="200,250 350,480 260,500" fill="#e60012" opacity="0.4" />
                  <polygon points="200,250 0,380 0,260" fill="#ff1b2d" opacity="0.5" />

                  {/* Character Silhouette & Cutout Layers */}
                  {/* High collar & Coat */}
                  <polygon points="120,420 200,320 280,420 320,500 80,500" fill="#080808" stroke="#ff1b2d" strokeWidth="4" />
                  <polygon points="150,380 200,340 250,380 200,470" fill="#e60012" />

                  {/* Face Silhouette */}
                  <polygon points="160,200 240,200 220,310 200,340 180,310" fill="#f7f5f2" />

                  {/* Jagged stylized hair locks */}
                  <polygon points="130,160 170,110 200,150 250,100 270,170 290,130 270,230 250,220 250,170 200,180 150,170 140,220 120,180" fill="#080808" stroke="#f7f5f2" strokeWidth="2" />
                  
                  {/* Signature Phantom Thief Winged Mask */}
                  <g className="transition-transform duration-300 transform group-hover:scale-105 origin-center">
                    {/* Left Wing Mask */}
                    <polygon points="200,230 140,190 90,200 130,240 180,245" fill="url(#p5WhiteGrad)" stroke="#080808" strokeWidth="3" />
                    {/* Right Wing Mask */}
                    <polygon points="200,230 260,190 310,200 270,240 220,245" fill="url(#p5WhiteGrad)" stroke="#080808" strokeWidth="3" />
                    {/* Eye Cutouts */}
                    <polygon points="150,220 175,225 155,235" fill="#080808" />
                    <polygon points="250,220 225,225 245,235" fill="#080808" />
                    {/* Glowing Eyes */}
                    <circle cx="165" cy="226" r="3" fill="#ff1b2d" />
                    <circle cx="235" cy="226" r="3" fill="#ff1b2d" />
                  </g>

                  {/* Glasses frames reflection slash */}
                  <polygon points="110,180 290,260 270,265 90,185" fill="#ffffff" opacity="0.35" />

                  {/* Red Crimson Rose / Emblem motif */}
                  <circle cx="200" cy="420" r="14" fill="#ff1b2d" stroke="#f7f5f2" strokeWidth="2" />
                  <polygon points="194,414 206,414 200,426" fill="#080808" />
                </svg>
              </div>

              {/* Persona 5 All-Out Card Header Sticker */}
              <div className="absolute top-4 left-4 bg-[#e60012] text-[#080808] px-3 py-1 font-p5-impact text-xs tracking-widest transform -rotate-3 border-2 border-[#080808] shadow-[3px_3px_0px_#080808]">
                TARGET: SYSTEM CORE
              </div>

              {/* Bottom Interactive Prompt */}
              <button
                type="button"
                onClick={() => {
                  if (!portraitTriggered) {
                    triggerFlash({
                      variant: 'critical',
                      text: 'CONFIDANT REVEALED!',
                      subtext: 'HABIB AULIA [AGENT EBI] // RANK MAX',
                    });
                  }
                  setPortraitTriggered(prev => !prev);
                }}
                className="absolute bottom-4 inset-x-4 bg-[#080808]/90 border-2 border-[#ff1b2d] px-3 py-2 text-center text-xs font-p5-mono text-[#f7f5f2] hover:bg-[#ff1b2d] hover:text-[#080808] transition-colors cursor-pointer"
              >
                {portraitTriggered ? "★ CRITICAL HIT! [TAP TO RESET]" : "▶ TAP TO INSPECT CONFIDANT"}
              </button>

              {/* Triggered Overlay Dialogue Box */}
              {portraitTriggered && (
                <div className="absolute inset-0 bg-[#080808]/95 z-30 p-6 flex flex-col justify-center items-center text-center animate-fadeIn">
                  <div className="px-3 py-1 bg-[#ff1b2d] text-[#080808] font-p5-impact text-xs tracking-widest transform -rotate-2 mb-3">
                    ALL-OUT STATUS
                  </div>
                  <h3 className="font-p5-display text-3xl font-bold text-[#f7f5f2] tracking-wider mb-2">
                    HABIB AULIA
                  </h3>
                  <p className="font-p5-mono text-xs text-[#ff1b2d] mb-4">
                    ARCANA: THE FOOL // MAX RANK
                  </p>
                  <p className="font-p5-body text-xs text-[#b9b9b9] leading-relaxed mb-4">
                    Specializes in high-velocity fullstack applications, reactive canvas simulations, and defiant graphic visual design.
                  </p>
                  <button
                    onClick={() => setPortraitTriggered(false)}
                    className="px-4 py-1.5 bg-[#e60012] text-[#080808] font-p5-impact text-xs tracking-widest uppercase hover:bg-white transition-colors"
                  >
                    DISMISS [X]
                  </button>
                </div>
              )}

            </div>

            {/* Floating Graphic Stamps */}
            <div className="absolute -bottom-4 -left-6 hidden sm:block bg-[#f7f5f2] text-[#080808] border-2 border-[#080808] px-3 py-1 font-p5-impact text-sm tracking-wider transform -rotate-6 p5-shadow-red">
              TAKE YOUR TIME!
            </div>
            <div className="absolute -top-4 -right-4 hidden sm:block bg-[#ff1b2d] text-[#080808] border-2 border-[#080808] px-3 py-1 font-p5-impact text-sm tracking-wider transform rotate-6 p5-shadow-black">
              SHOW ME YOUR TRUE FORM
            </div>

          </ScrollReveal>

        </div>

        {/* Scroll hint indicator */}
        <div className="flex justify-center items-center mt-12 md:mt-16">
          <a
            href="#about"
            className="flex flex-col items-center gap-1 group text-[#b9b9b9] hover:text-[#ff1b2d] transition-colors focus-visible:outline-2 focus-visible:outline-[#ff1b2d]"
            aria-label="Scroll to About section"
          >
            <span className="font-p5-impact text-xs tracking-widest uppercase">
              SCROLL DOWN
            </span>
            <div className="w-5 h-8 border-2 border-current rounded-none flex justify-center pt-1">
              <span className="w-1 h-2 bg-[#ff1b2d] animate-bounce" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};
