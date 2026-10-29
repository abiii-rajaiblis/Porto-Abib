import React from 'react';

export const HomeCareAIVector: React.FC = () => (
  <div className="relative w-full h-full bg-[#120406] flex items-center justify-center overflow-hidden border border-[#ff1b2d]/50">
    <div className="absolute inset-0 bg-halftone-red opacity-30" />

    {/* Bulletproof SVG Medical HUD Graphic */}
    <svg viewBox="0 0 400 240" className="w-full h-full p-3 relative z-10" aria-label="Home Care AI Medical HUD illustration">
      {/* Background Grid Lines (Clean standard lines, no pattern dependency) */}
      <line x1="20" y1="60" x2="380" y2="60" stroke="#ff1b2d" strokeWidth="0.5" strokeOpacity="0.3" />
      <line x1="20" y1="120" x2="380" y2="120" stroke="#ff1b2d" strokeWidth="0.5" strokeOpacity="0.3" />
      <line x1="20" y1="180" x2="380" y2="180" stroke="#ff1b2d" strokeWidth="0.5" strokeOpacity="0.3" />
      <line x1="100" y1="20" x2="100" y2="220" stroke="#ff1b2d" strokeWidth="0.5" strokeOpacity="0.2" />
      <line x1="200" y1="20" x2="200" y2="220" stroke="#ff1b2d" strokeWidth="0.5" strokeOpacity="0.2" />
      <line x1="300" y1="20" x2="300" y2="220" stroke="#ff1b2d" strokeWidth="0.5" strokeOpacity="0.2" />

      {/* Outer Targeting Brackets */}
      <path d="M45 25 L20 25 L20 50" stroke="#ff1b2d" strokeWidth="3" fill="none" />
      <path d="M355 25 L380 25 L380 50" stroke="#ff1b2d" strokeWidth="3" fill="none" />
      <path d="M45 215 L20 215 L20 190" stroke="#ff1b2d" strokeWidth="3" fill="none" />
      <path d="M355 215 L380 215 L380 190" stroke="#ff1b2d" strokeWidth="3" fill="none" />

      {/* Top Banner Status Bar */}
      <rect x="25" y="30" width="160" height="22" fill="#080808" stroke="#ff1b2d" strokeWidth="1.5" />
      <circle cx="36" cy="41" r="4" fill="#00e6b4" />
      <text x="46" y="45" fill="#f7f5f2" fontFamily="Space Mono, monospace" fontSize="9" fontWeight="bold">
        TRIAGE // AI-ACTIVE
      </text>

      {/* Emergency Telemetry Badge */}
      <rect x="255" y="30" width="125" height="22" fill="#e60012" />
      <text x="264" y="45" fill="#080808" fontFamily="Anton, sans-serif" fontSize="11" letterSpacing="1">
        LIVE VITALS STREAM
      </text>

      {/* Cardiac Telemetry Wave */}
      <path
        d="M25 120 L115 120 L130 90 L145 155 L165 55 L185 180 L205 100 L220 135 L235 120 L375 120"
        stroke="#ff1b2d"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wave Cyan Pulse Accent */}
      <path
        d="M165 55 L185 180 L205 100"
        stroke="#ffffff"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Medical Cross Icon */}
      <rect x="195" y="80" width="10" height="26" fill="#ffffff" />
      <rect x="187" y="88" width="26" height="10" fill="#ffffff" />

      {/* Live Telemetry Data Cards */}
      <rect x="25" y="155" width="105" height="48" fill="#080808" stroke="#ff1b2d" strokeWidth="1" />
      <text x="33" y="172" fill="#b9b9b9" fontFamily="Space Mono, monospace" fontSize="8">HEART RATE</text>
      <text x="33" y="193" fill="#ff1b2d" fontFamily="Anton, sans-serif" fontSize="20">78 BPM</text>

      <rect x="145" y="155" width="105" height="48" fill="#080808" stroke="#00e6b4" strokeWidth="1" />
      <text x="153" y="172" fill="#b9b9b9" fontFamily="Space Mono, monospace" fontSize="8">SP02 OXYGEN</text>
      <text x="153" y="193" fill="#00e6b4" fontFamily="Anton, sans-serif" fontSize="20">99 %</text>

      <rect x="265" y="155" width="110" height="48" fill="#080808" stroke="#ffb347" strokeWidth="1" />
      <text x="273" y="172" fill="#b9b9b9" fontFamily="Space Mono, monospace" fontSize="8">ALERT STATUS</text>
      <text x="273" y="191" fill="#ffb347" fontFamily="Space Mono, monospace" fontSize="11" fontWeight="bold">OPTIMAL</text>
    </svg>
  </div>
);

export const DesaSenjaPixelVector: React.FC = () => (
  <div className="relative w-full h-full bg-[#180a06] flex items-center justify-center overflow-hidden border border-[#ffb347]/40">
    <div className="absolute inset-0 bg-gradient-to-t from-[#2e0e02] via-[#521c03] to-[#120502] opacity-90" />

    <svg viewBox="0 0 400 240" className="w-full h-full p-2 relative z-10" aria-label="Desa Senja Pixel rural twilight illustration">
      {/* Glowing Twilight Sun */}
      <circle cx="200" cy="110" r="54" fill="#ff4500" />
      <circle cx="200" cy="110" r="42" fill="#ffb347" />

      {/* Mountain & Hills Silhouettes */}
      <polygon points="0,240 70,120 180,240" fill="#290708" />
      <polygon points="120,240 230,100 340,240" fill="#1b0406" />
      <polygon points="260,240 330,140 400,240" fill="#2d0a0b" />

      {/* Village Stilt Houses / Joglo silhouette */}
      <rect x="70" y="170" width="60" height="40" fill="#080808" stroke="#ff4500" strokeWidth="1" />
      <polygon points="60,170 100,140 140,170" fill="#e60012" />
      <rect x="85" y="185" width="10" height="15" fill="#ffb347" />

      <rect x="250" y="160" width="70" height="50" fill="#080808" stroke="#ff4500" strokeWidth="1" />
      <polygon points="240,160 285,130 330,160" fill="#e60012" />
      <rect x="270" y="175" width="12" height="18" fill="#ffb347" />

      {/* Coconut / Palm silhouette */}
      <line x1="170" y1="220" x2="165" y2="150" stroke="#080808" strokeWidth="4" />
      <path d="M165 150 Q140 140 135 155" stroke="#ffb347" strokeWidth="2.5" fill="none" />
      <path d="M165 150 Q190 140 195 155" stroke="#ffb347" strokeWidth="2.5" fill="none" />

      {/* Pixel stars */}
      <rect x="60" y="40" width="3" height="3" fill="#ffffff" />
      <rect x="140" y="55" width="4" height="4" fill="#ffb347" />
      <rect x="290" y="45" width="3" height="3" fill="#ffffff" />
      <rect x="340" y="70" width="4" height="4" fill="#ffffff" />

      <rect x="20" y="25" width="190" height="20" fill="#080808" stroke="#ffb347" strokeWidth="1" />
      <text x="28" y="39" fill="#ffb347" fontFamily="Space Mono, monospace" fontSize="9" fontWeight="bold">
        WAKTU SENJA // 17:58 WIB
      </text>
    </svg>
  </div>
);

export const DgiAcademyVector: React.FC = () => (
  <div className="relative w-full h-full bg-[#181818] flex items-center justify-center overflow-hidden border border-[#e60012]/40">
    <div className="absolute inset-0 bg-halftone opacity-35" />

    <svg viewBox="0 0 400 240" className="w-full h-full p-3 relative z-10" aria-label="DGI Academy typography laboratory illustration">
      {/* Swiss grid ruler markings */}
      <line x1="20" y1="35" x2="380" y2="35" stroke="#ff1b2d" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="20" y1="205" x2="380" y2="205" stroke="#ff1b2d" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="100" y1="20" x2="100" y2="220" stroke="#333333" strokeWidth="1" />
      <line x1="200" y1="20" x2="200" y2="220" stroke="#e60012" strokeWidth="2" />
      <line x1="300" y1="20" x2="300" y2="220" stroke="#333333" strokeWidth="1" />

      {/* Top Banner Info */}
      <rect x="25" y="15" width="180" height="20" fill="#e60012" />
      <text x="32" y="29" fill="#080808" fontFamily="Space Mono, monospace" fontSize="9" fontWeight="bold">
        SWISS GRID // 12-COL DESIGN LAB
      </text>

      {/* Large Bold Typography Cutout Cards: D - G - I (Clean direct coordinates, zero malformed transforms) */}
      {/* Card D (White Card with Bold Black Letter) */}
      <rect x="45" y="52" width="75" height="105" fill="#f7f5f2" stroke="#080808" strokeWidth="3" />
      <rect x="52" y="60" width="25" height="4" fill="#e60012" />
      <text x="62" y="132" fill="#080808" fontFamily="Anton, sans-serif" fontSize="76" fontWeight="bold">
        D
      </text>

      {/* Card G (Crimson Red Card with Bold White Letter) */}
      <rect x="155" y="48" width="80" height="110" fill="#e60012" stroke="#f7f5f2" strokeWidth="3" />
      <rect x="163" y="58" width="25" height="4" fill="#080808" />
      <text x="175" y="132" fill="#f7f5f2" fontFamily="Anton, sans-serif" fontSize="76" fontWeight="bold">
        G
      </text>

      {/* Card I (Dark Card with High-Contrast Red Stroke & White Letter) */}
      <rect x="268" y="52" width="75" height="105" fill="#080808" stroke="#ff1b2d" strokeWidth="3" />
      <rect x="276" y="60" width="25" height="4" fill="#ff1b2d" />
      <text x="296" y="132" fill="#f7f5f2" fontFamily="Anton, sans-serif" fontSize="76" fontWeight="bold">
        I
      </text>

      {/* Bottom Editorial Banner */}
      <rect x="105" y="175" width="190" height="30" fill="#ff1b2d" stroke="#f7f5f2" strokeWidth="1.5" />
      <text x="116" y="195" fill="#080808" fontFamily="Anton, sans-serif" fontSize="13" letterSpacing="1.5">
        TYPOGRAPHY MASTERCLASS
      </text>
    </svg>
  </div>
);

export const PhantomCanvasLabVector: React.FC = () => (
  <div className="relative w-full h-full bg-[#1c080b] flex items-center justify-center overflow-hidden border border-[#ff1b2d]/50">
    <div className="absolute inset-0 bg-halftone-red opacity-45" />

    <svg viewBox="0 0 400 240" className="w-full h-full p-3 relative z-10" aria-label="Phantom Canvas UI Lab interaction engine illustration">
      {/* Dynamic diagonal slash polygons */}
      <polygon points="0,0 270,0 190,240 0,240" fill="#e60012" opacity="0.95" />
      <polygon points="270,0 400,0 400,240 190,240" fill="#0e0e0e" />
      <polygon points="180,0 215,0 135,240 100,240" fill="#ffffff" />

      {/* Sharp persona stars */}
      <polygon points="300,45 305,65 325,70 305,75 300,95 295,75 275,70 295,65" fill="#ff1b2d" />
      <polygon points="70,140 74,152 86,156 74,160 70,172 66,160 54,156 66,152" fill="#ffffff" />
      <polygon points="340,165 344,175 354,178 344,181 340,191 336,181 326,178 336,175" fill="#00e6b4" />

      {/* Center Action Stamp */}
      <rect x="125" y="70" width="190" height="54" fill="#080808" stroke="#ffffff" strokeWidth="3" />
      <rect x="130" y="75" width="180" height="44" fill="#ff1b2d" />
      <text x="140" y="106" fill="#080808" fontFamily="Anton, sans-serif" fontSize="26" letterSpacing="1.5">
        ALL-OUT ATTACK!
      </text>

      {/* Microcopy Tags */}
      <rect x="25" y="25" width="130" height="20" fill="#080808" stroke="#ffffff" strokeWidth="1" />
      <text x="32" y="38" fill="#f7f5f2" fontFamily="Space Mono, monospace" fontSize="9" fontWeight="bold">
        FPS: 60.0 // GEN Z
      </text>

      <rect x="240" y="195" width="135" height="22" fill="#080808" stroke="#ff1b2d" strokeWidth="1.5" />
      <text x="248" y="210" fill="#ff1b2d" fontFamily="Space Mono, monospace" fontSize="9" fontWeight="bold">
        KINETIC CANVAS LAB
      </text>
    </svg>
  </div>
);

export const ProjectCover: React.FC<{ slug: string }> = ({ slug }) => {
  switch (slug) {
    case 'home-care-ai':
      return <HomeCareAIVector />;
    case 'desa-senja-pixel':
      return <DesaSenjaPixelVector />;
    case 'dgi-academy':
      return <DgiAcademyVector />;
    case 'phantom-canvas-lab':
    default:
      return <PhantomCanvasLabVector />;
  }
};
