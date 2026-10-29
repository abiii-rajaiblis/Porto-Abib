import React, { useEffect, useRef } from 'react';

interface FlyingParticle {
  x: number;
  y: number;
  size: number;
  type: 'four-point' | 'six-point' | 'diamond' | 'cross';
  color: string;
  baseVy: number; // Constant upward velocity (positive number, subtracted from y)
  ambientVx: number; // Gentle horizontal sway
  swayFreq: number;
  swayAmp: number;
  swayPhase: number;
  baseTrailLen: number; // Length of the trailing tail
  speedMultiplier: number; // Parallax depth layer
  rotation: number;
  rotationSpeed: number;
  phase: number;
  twinkleSpeed: number;
  baseAlpha: number;
}

interface TargetReticle {
  x: number;
  y: number;
  radius: number;
  life: number; // 0 to 1 progress (0 = just clicked, 1 = ended)
  maxDuration: number; // Duration in ms
  startTime: number;
  angle: number;
}

interface ScopeSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  decay: number;
}

export const SparkleField: React.FC<{ interactive?: boolean; className?: string }> = ({
  interactive = true,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 36 : 68;

    const colors = [
      '#ff1b2d', // Bright Crimson
      '#ffffff', // Pure White
      '#f7f5f2', // Off-White
      '#ffd700', // Gold Accent
      '#ff4d5a', // Radiant Coral
    ];

    const types: FlyingParticle['type'][] = ['four-point', 'six-point', 'diamond', 'cross'];

    // Initialize particles configured strictly for UPWARD flight
    const particles: FlyingParticle[] = Array.from({ length: particleCount }, (_, i) => {
      const type = types[i % types.length];
      const size = type === 'diamond' ? 6 + Math.random() * 8 : 9 + Math.random() * 15;
      const baseVy = 1.3 + Math.random() * 2.2; // Constant upward speed (1.3 - 3.5 px/frame)
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseVy,
        ambientVx: (Math.random() - 0.5) * 0.4,
        swayFreq: 0.02 + Math.random() * 0.03,
        swayAmp: 0.6 + Math.random() * 1.4,
        swayPhase: Math.random() * Math.PI * 2,
        baseTrailLen: size * (2.8 + Math.random() * 3.2), // 25px to 80px luminous flying tail
        speedMultiplier: 0.7 + Math.random() * 0.9,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2.0,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.03 + Math.random() * 0.04,
        baseAlpha: 0.55 + Math.random() * 0.45,
      };
    });

    let reticles: TargetReticle[] = [];
    let sparks: ScopeSpark[] = [];

    // Scroll boost tracking - scrolling intensifies upward flight!
    let lastScrollY = window.scrollY;
    let scrollBoost = 0;
    let targetBoost = 0;
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      targetBoost += delta * 0.25;
      if (targetBoost > 25) targetBoost = 25;

      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        targetBoost *= 0.3;
      }, 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle interactive Persona 5 Red Gun-Scope Lock-On & Gunshot on screen tap/click
    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive) return;

      const clickX = e.clientX;
      const clickY = e.clientY;
      const now = performance.now();

      // Spawn Gun Targeting Scope Reticle
      reticles.push({
        x: clickX,
        y: clickY,
        radius: isMobile ? 32 : 44,
        life: 0,
        maxDuration: 420, // 420ms snappy lock-on & gunshot fade
        startTime: now,
        angle: Math.random() * Math.PI * 0.25,
      });

      // Spawn burst of high-velocity red gun sparks
      const sparkCount = isMobile ? 9 : 14;
      const sparkColors = ['#ff1b2d', '#ffffff', '#ff4d5a', '#ffd700'];

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
        const speed = 3.5 + Math.random() * 5.5;
        sparks.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 4.5,
          color: sparkColors[i % sparkColors.length],
          life: 1.0,
          decay: 0.04 + Math.random() * 0.035,
        });
      }

      if (reticles.length > 10) {
        reticles = reticles.slice(-10);
      }
      if (sparks.length > 50) {
        sparks = sparks.slice(-50);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

    // Resize handling
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Star drawing helpers
    const drawFourPointStar = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();
      c.fill();
    };

    const drawSixPointStar = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const points = 6;
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? size : size * 0.4;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.closePath();
      c.fill();
    };

    const drawDiamond = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.lineTo(size * 0.7, 0);
      c.lineTo(0, size);
      c.lineTo(-size * 0.7, 0);
      c.closePath();
      c.fill();
    };

    const drawCross = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.lineWidth = 2.5;
      c.moveTo(-size, 0);
      c.lineTo(size, 0);
      c.moveTo(0, -size);
      c.lineTo(0, size);
      c.stroke();
    };

    // Main animation loop
    const render = () => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Smooth scroll boost interpolation
      if (!prefersReducedMotion) {
        scrollBoost += (targetBoost - scrollBoost) * 0.15;
        targetBoost *= 0.90;
      } else {
        scrollBoost = 0;
        targetBoost = 0;
      }

      ctx.clearRect(0, 0, width, height);

      // Render flying upward particles with dynamic luminous trails
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. UPWARD MOVEMENT ONLY:
        // baseVy is strictly positive, multiplied by speed multiplier, plus scroll boost
        const currentSpeed = (p.baseVy + scrollBoost * 0.4) * p.speedMultiplier;
        p.y -= currentSpeed; // ALWAYS moves towards the top (-y)

        // Subtle aerodynamic horizontal sway
        p.swayPhase += p.swayFreq;
        const currentVx = p.ambientVx + Math.sin(p.swayPhase) * p.swayAmp * 0.3;
        p.x += currentVx;

        p.rotation += p.rotationSpeed;
        p.phase += p.twinkleSpeed;

        // Dynamic trail length based on flight velocity
        const trailLength = p.baseTrailLen + currentSpeed * 6.5;

        // Seamless wrap: when particle completely flies off the top, respawn at the bottom
        if (p.y < -trailLength - 20) {
          p.y = height + 30 + Math.random() * 40;
          p.x = Math.random() * width;
        }

        // Horizontal screen wrap
        if (p.x > width + 20) p.x = -20;
        else if (p.x < -20) p.x = width + 20;

        // Particle alpha with twinkle
        const alpha = Math.max(
          0.2,
          Math.min(1.0, p.baseAlpha * (0.7 + 0.3 * Math.sin(p.phase)))
        );

        // Tail tip position (streams DOWNWARD behind the particle)
        const tailX = p.x - currentVx * 8;
        const tailY = p.y + trailLength;
        const headWidth = Math.max(1.5, p.size * 0.4);

        // 2. RENDER THE FLYING OBJECT TRAIL:
        ctx.save();

        // A. Outer Radiant Comet Trail (Tapered glowing gradient polygon)
        const trailGrad = ctx.createLinearGradient(p.x, p.y, tailX, tailY);
        trailGrad.addColorStop(0, p.color);
        trailGrad.addColorStop(0.35, 'rgba(255, 27, 45, 0.45)');
        trailGrad.addColorStop(0.75, 'rgba(230, 0, 18, 0.15)');
        trailGrad.addColorStop(1, 'rgba(230, 0, 18, 0)');

        ctx.globalAlpha = alpha * 0.85;
        ctx.fillStyle = trailGrad;
        ctx.shadowColor = '#ff1b2d';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.moveTo(p.x - headWidth, p.y);
        ctx.lineTo(p.x + headWidth, p.y);
        ctx.lineTo(tailX, tailY);
        ctx.closePath();
        ctx.fill();

        // B. Inner Intense Laser Core Line
        const coreGrad = ctx.createLinearGradient(p.x, p.y, tailX, tailY);
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.4, p.color);
        coreGrad.addColorStop(1, 'transparent');

        ctx.strokeStyle = coreGrad;
        ctx.lineWidth = Math.max(1, p.size * 0.15);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.restore();

        // 3. RENDER THE FLYING OBJECT HEAD (Persona 5 Star / Diamond / Cross):
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.type === 'four-point' ? 12 : 6;

        switch (p.type) {
          case 'four-point':
            drawFourPointStar(ctx, p.size);
            break;
          case 'six-point':
            drawSixPointStar(ctx, p.size);
            break;
          case 'diamond':
            drawDiamond(ctx, p.size);
            break;
          case 'cross':
            drawCross(ctx, p.size);
            break;
        }

        ctx.restore();
      }

      // 4. RENDER PERSONA 5 RED GUN-SCOPE RETICLES (Click / Tap Effect)
      const now = performance.now();
      if (reticles.length > 0) {
        for (let i = reticles.length - 1; i >= 0; i--) {
          const reticle = reticles[i];
          const elapsed = now - reticle.startTime;
          const progress = Math.min(1, elapsed / reticle.maxDuration);

          if (progress >= 1) {
            reticles.splice(i, 1);
            continue;
          }

          // Persona 5 Snappy Easing: Snaps in violently (0.0 -> 0.3), pulses/fires (0.3 -> 0.5), fades out (0.5 -> 1.0)
          const snapIn = Math.min(1, progress / 0.3);
          const easeSnap = 1 - Math.pow(1 - snapIn, 3); // Fast ease out
          const bracketDist = reticle.radius * (1.6 - 0.6 * easeSnap); // 1.6x down to 1.0x
          const alpha = progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3;
          const rotation = reticle.angle + easeSnap * 0.2;

          ctx.save();
          ctx.translate(reticle.x, reticle.y);
          ctx.rotate(rotation);
          ctx.globalAlpha = Math.max(0, alpha);

          // A. Outer Concentric Red Reticle Rings & Arcs
          ctx.strokeStyle = '#ff1b2d';
          ctx.fillStyle = '#ff1b2d';
          ctx.shadowColor = '#ff1b2d';
          ctx.shadowBlur = 10;
          ctx.lineWidth = 2;

          // Main segmented circle (4 distinct quadrants)
          const r = reticle.radius;
          const arcGap = 0.22;
          for (let q = 0; q < 4; q++) {
            const startAngle = (q * Math.PI) / 2 + arcGap;
            const endAngle = ((q + 1) * Math.PI) / 2 - arcGap;
            ctx.beginPath();
            ctx.arc(0, 0, r, startAngle, endAngle);
            ctx.stroke();

            // Tactical tick mark at each cardinal direction
            const tickAngle = (q * Math.PI) / 2;
            const tCos = Math.cos(tickAngle);
            const tSin = Math.sin(tickAngle);
            ctx.beginPath();
            ctx.moveTo(tCos * (r - 5), tSin * (r - 5));
            ctx.lineTo(tCos * (r + 7), tSin * (r + 7));
            ctx.stroke();
          }

          // Inner high-precision dotted circle
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]); // Reset dash

          // B. 4 Inward-Snapping Corner Brackets [ + ]
          const bLen = r * 0.35;
          const bD = bracketDist;
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#f7f5f2'; // High-contrast white bracket tips
          ctx.shadowColor = '#ff1b2d';
          ctx.shadowBlur = 8;

          // Top-Left ┌
          ctx.beginPath();
          ctx.moveTo(-bD, -bD + bLen);
          ctx.lineTo(-bD, -bD);
          ctx.lineTo(-bD + bLen, -bD);
          ctx.stroke();

          // Top-Right ┐
          ctx.beginPath();
          ctx.moveTo(bD - bLen, -bD);
          ctx.lineTo(bD, -bD);
          ctx.lineTo(bD, -bD + bLen);
          ctx.stroke();

          // Bottom-Right ┘
          ctx.beginPath();
          ctx.moveTo(bD, bD - bLen);
          ctx.lineTo(bD, bD);
          ctx.lineTo(bD - bLen, bD);
          ctx.stroke();

          // Bottom-Left └
          ctx.beginPath();
          ctx.moveTo(-bD + bLen, bD);
          ctx.lineTo(-bD, bD);
          ctx.lineTo(-bD, bD - bLen);
          ctx.stroke();

          // C. Crosshairs with Center Gap
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#ff1b2d';
          const crossInner = r * 0.18;
          const crossOuter = r * 0.85;

          // Horizontal Crosshairs
          ctx.beginPath();
          ctx.moveTo(-crossOuter, 0);
          ctx.lineTo(-crossInner, 0);
          ctx.moveTo(crossInner, 0);
          ctx.lineTo(crossOuter, 0);
          // Vertical Crosshairs
          ctx.moveTo(0, -crossOuter);
          ctx.lineTo(0, -crossInner);
          ctx.moveTo(0, crossInner);
          ctx.lineTo(0, crossOuter);
          ctx.stroke();

          // D. Center Diamond Lock-On Core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ff1b2d';
          ctx.beginPath();
          ctx.moveTo(0, -5);
          ctx.lineTo(5, 0);
          ctx.lineTo(0, 5);
          ctx.lineTo(-5, 0);
          ctx.closePath();
          ctx.fill();

          // E. Persona 5 HUD Tactical Callout: "LOCK ON"
          ctx.font = 'bold 9px monospace, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillStyle = '#ff1b2d';
          ctx.fillText('TARGET LOCK // 01', bD + 4, -bD + 9);

          // F. Gunshot Muzzle Flash Pulse (Triggered when reticle locks on ~0.25 - 0.6)
          if (progress > 0.2) {
            const flashProgress = (progress - 0.2) / 0.8;
            const flashRadius = r * (0.4 + flashProgress * 1.6);
            const flashAlpha = Math.max(0, 1 - flashProgress * 1.4);

            ctx.beginPath();
            ctx.strokeStyle = '#ff1b2d';
            ctx.lineWidth = 2 * (1 - flashProgress);
            ctx.globalAlpha = flashAlpha * alpha;
            ctx.arc(0, 0, flashRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Intense white-crimson center muzzle flash
            if (flashProgress < 0.3) {
              const coreAlpha = (1 - flashProgress / 0.3) * alpha;
              ctx.globalAlpha = coreAlpha;
              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.arc(0, 0, r * 0.3 * (1 - flashProgress), 0, Math.PI * 2);
              ctx.fill();
            }
          }

          ctx.restore();
        }
      }

      // 5. RENDER HIGH-SPEED GUNSHOT SPARKS
      if (sparks.length > 0) {
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= 0.94; // Decelerate like real sparks
          s.vy *= 0.94;
          s.life -= s.decay;

          if (s.life <= 0) {
            sparks.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = s.life;
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 8;

          // Elongated spark streak oriented along trajectory
          const speed = Math.hypot(s.vx, s.vy);
          const angle = Math.atan2(s.vy, s.vx);

          ctx.translate(s.x, s.y);
          ctx.rotate(angle);

          ctx.beginPath();
          ctx.ellipse(0, 0, Math.max(s.size, speed * 1.8), s.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
  }, [interactive]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-10 select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
