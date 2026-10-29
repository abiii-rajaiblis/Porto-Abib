# ASSET MANIFEST — Persona 5-Inspired Portfolio
**Project:** Habib Aulia Az Zuhri — Creative Portfolio  
**Audit Date:** 29 October 2026  
**Status:** Audited & Mapped  

---

## 1. Inventory of Input Assets

| Asset Path | Type | Status / Dimensions | Intended Usage & Placement | Fallback Strategy |
| :--- | :--- | :--- | :--- | :--- |
| `/public/assets/aistudio/file_00000000d3c081f58ee0c5a97e9ecbcf_ca969c45.png` | Portrait Photography | High-Res Vertical PNG | **About Section / Confidant Dossier**: Official persona portrait of Habib Aulia Az Zuhri ("Abi" / "Agent Ebi") with stylized Persona 5 cutout frame, tape stickers, and confident HUD badges | Styled SVG fallback container with halftone matrix |
| `/public/assets/aistudio/PRD_Persona5_Inspired_Portfolio_ae06e109.md` | Specification Markdown | Text document (PRD) | Core project specification and requirement guidelines | N/A (Internal reference) |

---

## 2. Bespoke System Assets & Visual Components Generated

To avoid copyright issues while strictly adhering to the Persona 5 aesthetic, all visual components are designed as bespoke, scalable SVG vector elements, CSS polygon clip-paths, half-tone raster simulation textures, and animated canvas/SVG particle systems:

| Asset Name | Format | Target Section | Visual Role & Description | Responsive Behavior |
| :--- | :--- | :--- | :--- | :--- |
| `P5PortraitFrame` | React / CSS Polygon Cut | About Section | Features official portrait of Habib Aulia Az Zuhri / Abi / Agent Ebi with diagonal slashes, red tape stickers, and confidant stamps | Responsive aspect ratio [9/16] to [3/4], zero layout shift |
| `SynthJazzEngine` | Web Audio API Engine | Global Audio Ambiance | Real-time procedural Persona 5 synth-jazz ambient loop ("Beneath the Mask" vibes with Rhodes chords, smooth walking bass & subtle tape warmth) | Zero external file dependencies, user-toggled, respects autoplay & reduced-motion |
| `P5PhantomStar` (Multiple variants) | SVG / Dynamic Canvas | Global, Hero, Scene transitions | 4-pointed, 6-pointed, and faceted diamond sparkles with varied scale, opacity, rotational speeds, and pulsation | Reduced particle count on mobile (< 768px); disabled on `prefers-reduced-motion` |
| `P5SlashPanel` | CSS clip-path / SVG | Section Dividers, Cards, Headers | High-contrast diagonal cuts (-3deg to -8deg), jagged border slashes, and comic collage strips | Flexes dynamically to container width without horizontal overflow |
| `HalftonePattern` | Inline SVG Pattern / Data URI | Hero Background, About, Footer | Dot-matrix halftone screen giving comic/manga print authentic texture | Low opacity (0.07 to 0.12) to ensure strict WCAG AA text contrast |
| `StickerTag` & `TriggeredCallout` | React Components | Hero, About, Skills, Projects, Contact | Skewed tape stickers, ransom-note typography cut-outs, comic action stamps (`TAKE YOUR HEART`, `CALL OUT`, `CONFIDENTIAL`, `ALL-OUT`) | Interactive hover/focus/tap with touch-friendly dismiss & safe viewport clamping |
| `ProjectCoverIllustrations` | Pure SVG & Themed Vector Art | Projects Showcase | 1. **Home Care AI**: Cyber-medical triage HUD with heart-rate wave and diagonal targeting brackets.<br>2. **Desa Senja Pixel**: Dusk twilight village silhouette with glowing pixel sun & lantern glow.<br>3. **DGI Academy**: Expressive typography laboratory with angular letterform blocks and rulers.<br>4. **Phantom UI Lab**: Dynamic game-grade interaction lab featuring geometric polygon masks. | Scalable vector graphics; instant rendering, zero 404 risk, crisp on Retina displays |
| `AllOutAttackPortraitSilhouette` | Stylized SVG Cut-Out | Hero Section | High-contrast cutout silhouette portrait with sharp angular edge accents, glasses frame reflection, and dynamic mask lines | Adapts from 420px height on desktop to proportional mobile hero stack |
| `ActionFlash` & `useActionFlash` | React Component / Web Audio API Engine | Global App / Navbar / Projects / About / Hero | Reusable Persona 5 camera shutter action flash transition with authentic mechanical shutter sound, aperture blades, viewfinder HUD reticles, crimson exposure wash, and 4 variants (`camera`, `critical`, `ambush`, `subtle`). | Fully responsive, non-blocking, zero layout shift, respects `prefers-reduced-motion` |
| `DungeonDivider` | React Component / CSS Marquee | Section Separators (Hero-About, About-Skills, Skills-Projects, Projects-Contact) | Dual counter-scrolling Persona 5 diagonal dungeon divider blade with continuous infinite marquee moving in opposite directions without any obstructing floating box: top line displays "TAKE YOUR TIME // NOW LOADING..." with spinning star, loader dots, dungeon name, and infiltration progress, paired with counter-scrolling bottom line ">> INFILTRATING NEXT PALACE FLOOR...". | Smooth GPU acceleration (`will-change: transform`), zero layout shift, perfectly seamless looping, respects `prefers-reduced-motion` |
| `SafeRoomToast` & `SafeRoomChime` | React Component / Web Audio API Engine | Global App / 5-Minute Infiltration Alert | Persona 5 Safe Room toast notification triggered after 5 minutes of site visit, playing authentic ascending bell chime (Eb6-G6-Bb6-Eb7) and warm Rhodes chord swell, encouraging users to take a break or contact Abi (`abibaulia26@gmail.com`). | Non-intrusive floating toast, dismissible, previewable via Tactical Drawer |


---

## 3. Font Manifest & Licensing

| Family | Weights | Role | License / Source |
| :--- | :--- | :--- | :--- |
| **Bebas Neue** | 400 (Condensed Display) | Primary Persona 5-style display titles, ransom cutouts, oversized headlines | SIL Open Font License (Google Fonts) |
| **Anton** | 400 (Heavy Ultra-Black) | Action tags, comic stamps, badge numbers | SIL Open Font License (Google Fonts) |
| **Plus Jakarta Sans** | 400, 600, 700, 800 | Body prose, readable project descriptions, UI controls | SIL Open Font License (Google Fonts) |
| **Space Mono** | 400, 700 | Technical coordinates, tags, dates, metadata numerals | SIL Open Font License (Google Fonts) |

---

## 4. Verification Check

- [x] Provided user photo `/public/assets/aistudio/file_00000000d3c081f58ee0c5a97e9ecbcf_ca969c45.png` integrated with responsive frame and fallback.
- [x] Web Audio synth-jazz engine requires no external CDN and complies with browser audio policies.
- [x] All typography served via Google Fonts with preconnect.
- [x] All vector graphics have built-in SVG fallbacks and `aria-hidden` where decorative.
