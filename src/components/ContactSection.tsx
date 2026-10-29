import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useActionFlash } from '../context/ActionFlashContext';

export const ContactSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const { triggerFlash } = useActionFlash();
  const [copied, setCopied] = useState(false);
  const [clientSubject, setClientSubject] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [isAllOutAttacking, setIsAllOutAttacking] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
    }
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }
  };

  const handleDirectDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(clientSubject || "Calling Card: Project Collaboration Inquiry");
    const body = encodeURIComponent(
      `Hello Habib,\n\n${clientMessage || "I was impressed by your Persona 5-inspired portfolio and would like to discuss a project collaboration."}\n\nBest regards,`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  // Trigger All-Out Attack Screen Flash and open email client
  const handleAllOutAttack = () => {
    if (prefersReducedMotion) {
      // Direct action without flashing for reduced motion preference
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("ALL-OUT ATTACK: Mission Inquiry")}&body=${encodeURIComponent("Hello Habib,\n\nI am initiating an All-Out Attack project inquiry with you.\n\nBest regards,")}`;
      return;
    }

    setIsAllOutAttacking(true);
    triggerFlash({
      variant: 'critical',
      text: 'ALL-OUT ATTACK!',
      subtext: 'FINISHING BLOW // DIRECT DISPATCH',
    });

    // After 750ms flash climax, open the email client
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("ALL-OUT ATTACK: Mission Inquiry")}&body=${encodeURIComponent("Hello Habib,\n\nI am initiating an All-Out Attack project collaboration with you!\n\nBest regards,")}`;
    }, 750);

    // Reset overlay after 1400ms
    setTimeout(() => {
      setIsAllOutAttacking(false);
    }, 1400);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#080808] text-[#f7f5f2] overflow-hidden select-none">
      {/* Background Halftone & Dynamic Palace Shifting */}
      <div className="absolute inset-0 bg-halftone-dynamic opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b-2 border-[#e60012] pb-6">
          <div>
            <div className="inline-block px-3 py-1 bg-[#e60012] text-[#080808] font-p5-impact text-xs tracking-widest uppercase transform -rotate-2 mb-2 p5-shadow-black">
              FINAL TARGET // CALLING CARD DISPATCH
            </div>
            <h2 className="font-p5-display text-4xl sm:text-6xl font-bold tracking-wider text-[#f7f5f2]">
              GET IN <span className="text-[#ff1b2d]">TOUCH</span>
            </h2>
          </div>
          <div className="font-p5-mono text-xs text-[#b9b9b9] tracking-wider uppercase">
            TARGET: {profile.email}
          </div>
        </div>

        {/* Feature: Prominent ALL-OUT ATTACK High-Voltage CTA Banner */}
        <div className="mb-10 bg-[#141414] border-3 border-[#ff1b2d] p5-cut-corner-lg p-5 sm:p-6 p5-shadow-red relative overflow-hidden">
          <div className="absolute inset-0 bg-p5-stripes opacity-20 pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 bg-[#ff1b2d] rotate-45 inline-block animate-ping" />
                <span className="font-p5-impact text-xs text-[#ff1b2d] tracking-widest uppercase">
                  CRITICAL STRIKE PROTOCOL // INSTANT DISPATCH
                </span>
              </div>
              <h3 className="font-p5-display text-2xl sm:text-4xl font-bold text-[#f7f5f2] tracking-wide">
                INITIATE AN <span className="text-[#ff1b2d]">ALL-OUT ATTACK</span> ON YOUR CHALLENGE
              </h3>
              <p className="font-p5-body text-xs sm:text-sm text-[#b9b9b9]">
                Trigger the ultimate dispatch sequence. Fires a stylized Persona 5 screen-flash and opens your default mail client directly.
              </p>
            </div>

            <button
              onClick={handleAllOutAttack}
              className="px-8 py-4 bg-[#e60012] hover:bg-[#ff1b2d] text-[#080808] font-p5-impact text-lg sm:text-xl tracking-wider uppercase transition-all duration-150 p5-shadow-black hover:-translate-y-1 transform -rotate-1 hover:rotate-0 cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-white comic-jitter-hover flex items-center justify-center gap-3"
              aria-label="Initiate All-Out Attack email dispatch with screen flash"
            >
              <span>★ ALL-OUT ATTACK!</span>
              <span className="font-p5-mono text-sm">[DISPATCH NOW] ▶</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split: The Calling Card Envelope + Direct Dispatch Launcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Official Persona 5 "Calling Card" Dossier (6 cols) */}
          <div className="lg:col-span-6 bg-[#141414] border-3 border-[#f7f5f2] p5-cut-corner-lg p-6 sm:p-8 p5-shadow-red relative flex flex-col justify-between">
            
            {/* Top Red Wax Seal Motif */}
            <div className="flex items-center justify-between border-b-2 border-[#ff1b2d] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#e60012] text-[#080808] flex items-center justify-center font-p5-display text-2xl font-bold rounded-full border-2 border-white transform rotate-6">
                  ★
                </div>
                <div>
                  <span className="font-p5-impact text-sm tracking-widest text-[#ff1b2d] uppercase block">
                    THE PHANTOM CALLING CARD
                  </span>
                  <span className="font-p5-mono text-[10px] text-[#b9b9b9]">
                    OFFICIAL DISPATCH FROM HABIB AULIA
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-[#080808] text-[#ff1b2d] border border-[#ff1b2d] font-p5-mono text-[11px] transform -rotate-3">
                CONFIDENTIAL
              </span>
            </div>

            {/* Calling Card Prose */}
            <div className="space-y-4 my-2">
              <p className="font-p5-display text-3xl sm:text-4xl text-[#f7f5f2] tracking-wide leading-tight">
                SIR / MADAM OF EXTRAORDINARY AMBITION:
              </p>
              <p className="font-p5-body text-sm text-[#d1d1d1] leading-relaxed">
                You have witnessed the craft of an engineer who refuses to produce boring software. If your team or venture demands high-octane web interfaces, bulletproof systems, or kinetic visual identity, the time to strike is now.
              </p>
              <p className="font-p5-impact text-base text-[#ff1b2d] tracking-wider uppercase">
                WE WILL STEAL YOUR USERS' HEARTS WITHOUT COMPROMISE.
              </p>
            </div>

            {/* Verified Direct Contact Links */}
            <div className="pt-6 border-t border-[#242424] space-y-4">
              
              {/* Copy Email Button with Visual Toast */}
              <div className="relative">
                <button
                  onClick={handleCopyEmail}
                  className="w-full py-3 bg-[#e60012] hover:bg-[#ff1b2d] text-[#080808] font-p5-impact text-base tracking-wider uppercase transition-colors p5-shadow-black flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-white comic-jitter-hover"
                  aria-label="Copy Habib Aulia email address to clipboard"
                >
                  <span>{copied ? "★ COPIED TO CLIPBOARD!" : "COPY DISPATCH EMAIL"}</span>
                  <span className="font-p5-mono text-xs">[{profile.email}]</span>
                </button>

                {copied && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#080808] text-[#ff1b2d] border-2 border-[#ff1b2d] px-3 py-1 font-p5-mono text-xs font-bold animate-bounce shadow-[3px_3px_0px_#e60012]">
                    CRITICAL! EMAIL STORED IN CLIPBOARD
                  </div>
                )}
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#080808] hover:bg-[#1a1a1a] text-[#f7f5f2] hover:text-[#ff1b2d] border border-[#2a2a2a] hover:border-[#ff1b2d] font-p5-mono text-xs flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="font-bold">GITHUB</span>
                  <span>@abiii-rajaiblis ↗</span>
                </a>

                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#080808] hover:bg-[#1a1a1a] text-[#f7f5f2] hover:text-[#ff1b2d] border border-[#2a2a2a] hover:border-[#ff1b2d] font-p5-mono text-xs flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="font-bold">INSTAGRAM</span>
                  <span>{profile.instagramHandle} ↗</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Direct Mailto Dispatch Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#111111] border-2 border-[#e60012] p5-cut-corner p-6 sm:p-8 p5-shadow-black flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-p5-impact text-xs tracking-widest text-[#ff1b2d] uppercase">
                  TRANSMISSION TERMINAL
                </span>
                <span className="font-p5-mono text-[10px] text-[#b9b9b9]">
                  SECURE MAILTO DISPATCHER
                </span>
              </div>

              <h3 className="font-p5-display text-2xl sm:text-3xl font-bold text-[#f7f5f2] tracking-wide mb-2">
                SEND DIRECT SIGNAL
              </h3>
              <p className="font-p5-body text-xs text-[#b9b9b9] mb-6">
                Compose your brief below. Submitting will immediately open your primary email client pre-addressed to Habib Aulia.
              </p>

              <form onSubmit={handleDirectDispatch} className="space-y-4">
                <div>
                  <label htmlFor="dispatch-subject" className="block font-p5-mono text-xs text-[#b9b9b9] uppercase mb-1">
                    SUBJECT / MISSION OBJECTIVE:
                  </label>
                  <input
                    id="dispatch-subject"
                    type="text"
                    value={clientSubject}
                    onChange={(e) => setClientSubject(e.target.value)}
                    placeholder="e.g. Design Engineering Collaboration or Frontend Role"
                    className="w-full px-4 py-2.5 bg-[#080808] border border-[#2a2a2a] focus:border-[#ff1b2d] text-[#f7f5f2] font-p5-body text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="dispatch-message" className="block font-p5-mono text-xs text-[#b9b9b9] uppercase mb-1">
                    MESSAGE / SCOPE &amp; TIMELINE:
                  </label>
                  <textarea
                    id="dispatch-message"
                    rows={4}
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    placeholder="Describe your challenge, timeline, tech requirements, or inquiry..."
                    className="w-full px-4 py-2.5 bg-[#080808] border border-[#2a2a2a] focus:border-[#ff1b2d] text-[#f7f5f2] font-p5-body text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#080808] hover:bg-[#ff1b2d] text-[#f7f5f2] hover:text-[#080808] border-2 border-[#ff1b2d] font-p5-impact text-lg tracking-wider uppercase transition-all duration-150 p5-shadow-red cursor-pointer focus-visible:outline-2 focus-visible:outline-white comic-jitter-hover"
                >
                  TRANSMIT CALLING CARD VIA EMAIL ▶
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1f1f1f] flex justify-between items-center text-[11px] font-p5-mono text-[#b9b9b9]">
              <span>RESPONSE TIME: &lt; 24 HOURS</span>
              <span className="text-[#ff1b2d]">★ DIRECT CHANNEL</span>
            </div>
          </div>

        </div>

      </div>

      {/* Full-Screen Persona 5 "ALL-OUT ATTACK FINISH" Flash Overlay */}
      {isAllOutAttacking && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808] overflow-hidden select-none pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-label="All-Out Attack Sequence Initiated"
        >
          {/* Initial White Strobe Lightning Flash (0-150ms) */}
          <div className="absolute inset-0 bg-white animate-ping opacity-90 pointer-events-none" style={{ animationDuration: '300ms' }} />

          {/* Diagonal Crimson Slashes Blade */}
          <div
            className="absolute inset-0 bg-[#e60012] pointer-events-none transition-transform"
            style={{
              clipPath: 'polygon(0 0, 100% 25%, 100% 75%, 0 100%)',
              transform: 'scale(1.2) rotate(-4deg)',
            }}
          />

          <div
            className="absolute inset-0 bg-[#ff1b2d] opacity-50 pointer-events-none"
            style={{
              clipPath: 'polygon(0 35%, 100% 15%, 100% 65%, 0 85%)',
            }}
          />

          {/* Speed Stripes Overlay */}
          <div className="absolute inset-0 bg-p5-stripes opacity-40 pointer-events-none" />

          {/* Central All-Out Attack Graphic Splash */}
          <div className="relative z-10 text-center px-4 max-w-3xl animate-scaleUp">
            
            {/* Top Tag */}
            <div className="inline-block px-4 py-1 bg-[#080808] text-[#f7f5f2] border-3 border-[#f7f5f2] font-p5-impact text-sm sm:text-base tracking-widest uppercase transform -rotate-3 p5-shadow-white mb-4">
              FINISHING BLOW // CRITICAL STRIKE
            </div>

            {/* Giant Finisher Headline */}
            <div className="my-2">
              <h2 className="font-p5-display text-5xl sm:text-8xl md:text-9xl font-bold tracking-wider text-[#080808] drop-shadow-[0_6px_0_#ffffff] uppercase transform -rotate-2">
                ALL-OUT ATTACK!
              </h2>
            </div>

            {/* Joker / Agent Ebi Catchphrase */}
            <div className="bg-[#080808] border-3 border-[#ff1b2d] px-6 py-3 inline-block transform rotate-1 p5-shadow-red my-3">
              <p className="font-p5-display text-2xl sm:text-4xl text-[#ff1b2d] tracking-widest font-bold">
                THE SHOW'S OVER.
              </p>
              <p className="font-p5-mono text-xs sm:text-sm text-[#f7f5f2] tracking-wider uppercase mt-1">
                DISPATCHING DIRECT SIGNAL TO HABIB AULIA [AGENT EBI]
              </p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#f7f5f2] rotate-45 animate-ping" />
              <span className="font-p5-mono text-xs text-[#080808] font-bold uppercase tracking-widest">
                LAUNCHING EMAIL CLIENT...
              </span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
