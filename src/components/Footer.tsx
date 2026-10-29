import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Footer: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-[#b9b9b9] border-t-2 border-[#e60012] py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1c1c1c]">
          
          {/* Brand & Monogram Lockup */}
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-[#e60012] text-[#080808] flex items-center justify-center font-p5-display text-2xl font-bold border-2 border-white transform -rotate-3">
              {profile.monogram}
            </span>
            <div>
              <p className="font-p5-display text-xl text-[#f7f5f2] tracking-wider">
                {profile.name}
              </p>
              <p className="font-p5-mono text-xs text-[#b9b9b9]">
                DEVELOPER · DESIGNER · CREATIVE TECHNOLOGIST
              </p>
            </div>
          </div>

          {/* Persona 5 Quote */}
          <div className="text-center md:text-right">
            <p className="font-p5-impact text-sm text-[#ff1b2d] tracking-wider uppercase">
              "STEAL HEARTS WITH BESPOKE CODE &amp; VISCERAL CRAFT."
            </p>
            <p className="font-p5-mono text-[11px] text-[#666]">
              ORIGINAL ART DIRECTION · GEN Z · 2026
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-[#141414] hover:bg-[#e60012] text-[#f7f5f2] hover:text-[#080808] border border-[#2e2e2e] hover:border-[#080808] font-p5-impact text-xs tracking-widest uppercase transition-colors p5-shadow-black cursor-pointer focus-visible:outline-2 focus-visible:outline-[#ff1b2d]"
            aria-label="Scroll back to top of page"
          >
            RETURN TO TOP ▲
          </button>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-p5-mono text-[#666] gap-3">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff1b2d] transition-colors"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff1b2d] transition-colors"
            >
              Instagram
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-[#ff1b2d] transition-colors"
            >
              Email
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
