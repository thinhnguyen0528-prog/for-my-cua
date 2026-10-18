/**
 * FOR MY CUA: OUR LITTLE UNIVERSE & COSMIC PASSWORD GATE 🌌❤️
 * Senior UI/UX & Creative Frontend Architecture:
 * 1. GalaxyNebulaSystem (Deep Navy-Black Space, Violet/Blush Nebula, Slow Curving Milky Way)
 * 2. StarfieldSystem (3-Layer Depth Stars, Unlock Convergence, Subtle Desktop Parallax)
 * 3. ShootingStarSystem (Occasional Fine Meteors with Tapered Trails)
 * 4. ParticleHeartSystem (Viewport-Safe Parametric 3D Pink Particle Heart + Separation Physics)
 * 5. CosmicPasswordGate & LoveLetterSystem (Secret Code 'emyeuanh', Refined Navy Card, Piano)
 */

(function () {
  if (window.__FOR_MY_CUA_INITIALIZED__) return;
  window.__FOR_MY_CUA_INITIALIZED__ = true;

  // ============================================================================
  // 1. MATH & INTERPOLATION UTILITIES (REQUIRED: deltaTime, lerp, easeInOutCubic)
  // ============================================================================
  const TAU = Math.PI * 2;

  function lerp(start, end, amt) {
    return start + (end - start) * amt;
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  // Parametric Heart Equation:
  // x(t) = 16 * sin^3(t)                                  -> [-16, +16]
  // y(t) = -(13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t)) -> [-11.9, +17.0]
  function evaluateHeartPoint(t) {
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);
    const x = 16 * sinT * sinT * sinT;
    const y = -(
      13 * cosT -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );
    return { x, y };
  }

  // ============================================================================
  // 2. CRISP PINPOINT SPRITE CACHE (PREVENTS OVEREXPOSURE / SOLID BLOB)
  // ============================================================================
  const PALETTE = [
    { r: 255, g: 48, b: 132 }, // Deep Rose Pink
    { r: 255, g: 102, b: 176 }, // Luminous Romance Pink
    { r: 255, g: 158, b: 208 }, // Soft Blush Pink
    { r: 255, g: 224, b: 240 }, // Warm Starlight Pink-White
    { r: 196, g: 148, b: 255 }, // Soft Cosmic Lavender
    { r: 176, g: 196, b: 255 }, // Distant Starlight Silver-Blue
  ];

  const spriteCache = PALETTE.map((c) => {
    const size = 64;
    const half = size / 2;
    const offscreen = document.createElement('canvas');
    offscreen.width = size;
    offscreen.height = size;
    const octx = offscreen.getContext('2d');

    // Pinpoint bright core + controlled soft falloff so additive blending stays crisp
    const grad = octx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.96)');
    grad.addColorStop(0.12, `rgba(${c.r}, ${c.g}, ${c.b}, 0.82)`);
    grad.addColorStop(0.32, `rgba(${c.r}, ${c.g}, ${c.b}, 0.24)`);
    grad.addColorStop(0.64, `rgba(${c.r}, ${c.g}, ${c.b}, 0.05)`);
    grad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);

    octx.fillStyle = grad;
    octx.beginPath();
    octx.arc(half, half, half, 0, TAU);
    octx.fill();
    return offscreen;
  });

  // ============================================================================
  // 3. WEB AUDIO API — ROMANTIC PIANO SYNTHESIZER (USER-TRIGGERED ONLY)
  // ============================================================================
  class RomanticPianoEngine {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.stepIndex = 0;
      this.timerId = null;
      this.sequence = [
        { bass: 174.61, notes: [261.63, 329.63, 349.23, 440.0, 523.25] },
        { bass: 164.81, notes: [246.94, 293.66, 329.63, 392.0, 493.88] },
        { bass: 146.83, notes: [220.0, 261.63, 293.66, 349.23, 440.0] },
        { bass: 130.81, notes: [196.0, 261.63, 329.63, 392.0, 493.88] },
      ];
    }

    initContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playNote(freq, duration = 2.6, volume = 0.042, type = 'sine') {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const harm = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      harm.type = 'triangle';
      harm.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.09);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const harmGain = this.ctx.createGain();
      harmGain.gain.setValueAtTime(volume * 0.15, now);
      harmGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.65);

      osc.connect(gain);
      harm.connect(harmGain);
      harmGain.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      harm.start(now);
      osc.stop(now + duration + 0.06);
      harm.stop(now + duration + 0.06);
    }

    playUnlockHarmony() {
      if (!this.isPlaying) return;
      this.initContext();
      if (!this.ctx) return;
      const chord = [523.25, 659.25, 783.99, 987.77, 1046.5];
      chord.forEach((f, idx) => {
        setTimeout(() => {
          if (this.isPlaying) this.playNote(f, 2.2, 0.028, 'sine');
        }, idx * 85);
      });
    }

    playSparkleChime() {
      if (!this.ctx || !this.isPlaying) return;
      const chimeNotes = [523.25, 659.25, 783.99, 987.77, 1046.5];
      chimeNotes.forEach((f, idx) => {
        setTimeout(() => {
          if (this.isPlaying) this.playNote(f, 1.8, 0.024, 'sine');
        }, idx * 75);
      });
    }

    scheduleStep() {
      if (!this.isPlaying || !this.ctx) return;
      const chordIdx = Math.floor(this.stepIndex / 6) % this.sequence.length;
      const subStep = this.stepIndex % 6;
      const currentChord = this.sequence[chordIdx];

      if (subStep === 0) {
        this.playNote(currentChord.bass, 3.8, 0.048, 'sine');
      }
      const noteFreq = currentChord.notes[subStep % currentChord.notes.length];
      this.playNote(noteFreq, 2.5, 0.032, 'sine');

      this.stepIndex++;
      this.timerId = setTimeout(() => this.scheduleStep(), 600);
    }

    toggle() {
      this.initContext();
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.scheduleStep();
      } else if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      return this.isPlaying;
    }
  }

  // ============================================================================
  // 4. SYSTEM 1: GALAXY & NEBULA SYSTEM (SUPPORTIVE DEEP COSMIC BACKDROP)
  // ============================================================================
  class GalaxyNebulaSystem {
    constructor() {
      this.clouds = [
        {
          rx: 0.22,
          ry: 0.26,
          radiusRatio: 0.55,
          color: { r: 76, g: 29, b: 149 }, // Deep Cosmic Violet
          alpha: 0.16,
          speed: 0.11,
          phase: 0.4,
        },
        {
          rx: 0.78,
          ry: 0.25,
          radiusRatio: 0.52,
          color: { r: 23, g: 43, b: 115 }, // Midnight Navy Blue
          alpha: 0.18,
          speed: 0.09,
          phase: 1.9,
        },
        {
          rx: 0.48,
          ry: 0.5,
          radiusRatio: 0.58,
          color: { r: 168, g: 32, b: 96 }, // Soft Blush Magenta
          alpha: 0.11,
          speed: 0.13,
          phase: 3.1,
        },
        {
          rx: 0.72,
          ry: 0.72,
          radiusRatio: 0.5,
          color: { r: 126, g: 58, b: 212 }, // Amethyst Mist
          alpha: 0.11,
          speed: 0.1,
          phase: 5.1,
        },
      ];

      this.milkyWayNodes = [];
      for (let i = 0; i < 8; i++) {
        const t = i / 7;
        this.milkyWayNodes.push({
          t,
          offsetPhase: i * 0.85,
          sizeMult: 0.24 + Math.sin(t * Math.PI) * 0.15,
          tint: i % 2 === 0 ? { r: 180, g: 130, b: 245 } : { r: 240, g: 120, b: 185 },
        });
      }
    }

    render(
      ctx,
      width,
      height,
      elapsed,
      heartCenterX,
      heartCenterY,
      heartRadius,
      pulseValue,
      parallaxX,
      parallaxY
    ) {
      // 1. Deep Navy-Black Space Base
      const bgGrad = ctx.createLinearGradient(0, 0, width * 0.35, height);
      bgGrad.addColorStop(0, '#02030a');
      bgGrad.addColorStop(0.48, '#060a1c');
      bgGrad.addColorStop(0.82, '#0a0518');
      bgGrad.addColorStop(1, '#020208');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const maxDim = Math.max(width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 2. Slow-Drifting Nebula Clouds
      for (let i = 0; i < this.clouds.length; i++) {
        const c = this.clouds[i];
        const driftX = Math.sin(elapsed * c.speed + c.phase) * width * 0.045;
        const driftY = Math.cos(elapsed * c.speed * 0.85 + c.phase) * height * 0.04;
        const cx = width * c.rx + driftX - parallaxX * 10;
        const cy = height * c.ry + driftY - parallaxY * 10;
        const rad = maxDim * c.radiusRatio;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grad.addColorStop(0, `rgba(${c.color.r}, ${c.color.g}, ${c.color.b}, ${c.alpha})`);
        grad.addColorStop(
          0.52,
          `rgba(${c.color.r}, ${c.color.g}, ${c.color.b}, ${c.alpha * 0.38})`
        );
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, TAU);
        ctx.fill();
      }

      // 3. Expansive, Subtle Curving Milky Way Band
      for (let i = 0; i < this.milkyWayNodes.length; i++) {
        const node = this.milkyWayNodes[i];
        const t = node.t;
        const baseX = lerp(-width * 0.08, width * 1.08, t);
        const baseY =
          lerp(height * 0.84, height * 0.16, t) -
          Math.sin(t * Math.PI) * height * 0.12 +
          Math.sin(elapsed * 0.16 + node.offsetPhase) * 10;

        const mx = baseX - parallaxX * 16;
        const my = baseY - parallaxY * 16;
        const mRad = maxDim * node.sizeMult;

        const mwGrad = ctx.createRadialGradient(mx, my, 0, mx, my, mRad);
        mwGrad.addColorStop(0, `rgba(${node.tint.r}, ${node.tint.g}, ${node.tint.b}, 0.068)`);
        mwGrad.addColorStop(0.48, 'rgba(79, 92, 215, 0.028)');
        mwGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = mwGrad;
        ctx.beginPath();
        ctx.arc(mx, my, mRad, 0, TAU);
        ctx.fill();
      }

      // 4. Soft Ambient Halo Supporting the Heart (controlled so it never overexposes)
      const auraRadius = heartRadius * (2.2 + pulseValue * 0.25);
      const reflectionAlpha = 0.095 + pulseValue * 0.04;
      const heartGlow = ctx.createRadialGradient(
        heartCenterX,
        heartCenterY,
        heartRadius * 0.08,
        heartCenterX,
        heartCenterY,
        auraRadius
      );
      heartGlow.addColorStop(0, `rgba(255, 51, 136, ${reflectionAlpha})`);
      heartGlow.addColorStop(0.45, `rgba(219, 39, 119, ${reflectionAlpha * 0.48})`);
      heartGlow.addColorStop(0.78, `rgba(139, 52, 222, ${reflectionAlpha * 0.18})`);
      heartGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = heartGlow;
      ctx.beginPath();
      ctx.arc(heartCenterX, heartCenterY, auraRadius, 0, TAU);
      ctx.fill();

      ctx.restore();
    }
  }

  // ============================================================================
  // 5. SYSTEM 2: MULTI-LAYER STARFIELD (3 DEPTH LAYERS, CLEAN & UNCLUTTERED)
  // ============================================================================
  class StarfieldSystem {
    constructor(isMobile) {
      this.isMobile = isMobile;
      this.stars = [];
      this.cosmicDust = [];
      this.brightenBoost = 0;
      this.unlockPullStrength = 0;
    }

    init(width, height) {
      this.isMobile = width < 768;
      this.stars = [];
      this.cosmicDust = [];

      // Balanced star count so the sky feels vast & deep without visual clutter
      const starCount = this.isMobile ? 165 : 290;
      const colorOptions = [
        { r: 248, g: 250, b: 252 }, // Starlight White
        { r: 255, g: 198, b: 228 }, // Blush Rose
        { r: 216, g: 184, b: 254 }, // Soft Violet
        { r: 186, g: 224, b: 253 }, // Pale Celestial Blue
      ];

      for (let i = 0; i < starCount; i++) {
        const layerRoll = Math.random();
        // Layer 0: Far (tiny, slow), Layer 1: Mid, Layer 2: Near (bright, subtle flare)
        const layer = layerRoll < 0.58 ? 0 : layerRoll < 0.88 ? 1 : 2;

        let x = Math.random() * width;
        let y = Math.random() * height;
        if (Math.random() < 0.38) {
          const t = Math.random();
          const bandX = lerp(0, width, t);
          const bandY =
            lerp(height * 0.84, height * 0.16, t) - Math.sin(t * Math.PI) * height * 0.12;
          const spread = (Math.random() - 0.5) * Math.min(width, height) * 0.32;
          x = clamp(bandX + spread, 0, width);
          y = clamp(bandY + spread, 0, height);
        }

        const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        const radius =
          layer === 0
            ? randomRange(0.4, 0.85)
            : layer === 1
              ? randomRange(0.8, 1.35)
              : randomRange(1.3, 2.0);

        this.stars.push({
          x,
          y,
          layer,
          radius,
          color: c,
          baseAlpha:
            layer === 0
              ? randomRange(0.2, 0.48)
              : layer === 1
                ? randomRange(0.38, 0.72)
                : randomRange(0.62, 0.92),
          twinkleSpeed: randomRange(0.7, 2.4),
          twinklePhase: Math.random() * TAU,
          vx: (Math.random() - 0.5) * (0.45 + layer * 0.95),
          vy: -randomRange(0.35, 1.6) * (0.4 + layer * 0.32),
          hasCrossFlare: layer === 2 && Math.random() < 0.32,
        });
      }

      // Delicate Cosmic Dust Motes
      const dustCount = this.isMobile ? 28 : 48;
      for (let i = 0; i < dustCount; i++) {
        this.cosmicDust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: randomRange(2.8, 6.8),
          spriteIdx: i % 2 === 0 ? 2 : 4,
          alpha: randomRange(0.08, 0.2),
          vx: (Math.random() - 0.5) * 4.2,
          vy: -randomRange(1.5, 5.2),
          phase: Math.random() * TAU,
        });
      }
    }

    triggerBrightenWave(strength = 1) {
      this.brightenBoost = Math.max(this.brightenBoost, strength);
    }

    triggerUnlockConvergence(strength = 1) {
      this.unlockPullStrength = Math.max(this.unlockPullStrength, strength);
      this.triggerBrightenWave(0.95);
    }

    updateAndRender(
      ctx,
      width,
      height,
      dt,
      elapsed,
      parallaxX,
      parallaxY,
      heartCenterX,
      heartCenterY,
      heartRadius,
      motionScale
    ) {
      const scaledDt = dt * motionScale;
      this.brightenBoost = lerp(this.brightenBoost, 0, 1 - Math.exp(-1.6 * dt));
      this.unlockPullStrength = lerp(this.unlockPullStrength, 0, 1 - Math.exp(-2.1 * dt));

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < this.stars.length; i++) {
        const s = this.stars[i];
        s.x += s.vx * scaledDt;
        s.y += s.vy * scaledDt;

        if (this.unlockPullStrength > 0.01) {
          const dxCenter = heartCenterX - s.x;
          const dyCenter = heartCenterY - s.y;
          const pullFactor = (0.34 + s.layer * 0.2) * this.unlockPullStrength * dt;
          s.x += dxCenter * pullFactor;
          s.y += dyCenter * pullFactor;
        }

        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        if (s.y > height + 10) s.y = -10;

        const parallaxFactor = s.layer === 0 ? 5 : s.layer === 1 ? 12 : 20;
        const drawX = s.x - parallaxX * parallaxFactor;
        const drawY = s.y - parallaxY * parallaxFactor;

        const distToHeart = Math.hypot(drawX - heartCenterX, drawY - heartCenterY);
        const heartInfluence = clamp(1 - distToHeart / (heartRadius * 2.3), 0, 1);

        const twinkle = 0.58 + 0.42 * Math.sin(elapsed * s.twinkleSpeed + s.twinklePhase);
        const alpha = clamp(
          s.baseAlpha * twinkle + this.brightenBoost * 0.26 + heartInfluence * 0.12,
          0.06,
          0.95
        );

        const r = Math.round(lerp(s.color.r, 255, heartInfluence * 0.45));
        const g = Math.round(lerp(s.color.g, 145, heartInfluence * 0.3));
        const b = Math.round(lerp(s.color.b, 205, heartInfluence * 0.4));

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius, 0, TAU);
        ctx.fill();

        if (s.hasCrossFlare && alpha > 0.64) {
          const flareLen = s.radius * (3.2 + this.brightenBoost * 1.8);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.32})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(drawX - flareLen, drawY);
          ctx.lineTo(drawX + flareLen, drawY);
          ctx.moveTo(drawX, drawY - flareLen);
          ctx.lineTo(drawX, drawY + flareLen);
          ctx.stroke();
        }
      }

      for (let i = 0; i < this.cosmicDust.length; i++) {
        const d = this.cosmicDust[i];
        d.x += (d.vx + Math.sin(elapsed * 0.55 + d.phase) * 2.5) * scaledDt;
        d.y += d.vy * scaledDt;

        if (d.x < -16) d.x = width + 16;
        if (d.x > width + 16) d.x = -16;
        if (d.y < -16) d.y = height + 16;
        if (d.y > height + 16) d.y = -16;

        const drawX = d.x - parallaxX * 14;
        const drawY = d.y - parallaxY * 14;
        const pulseAlpha = d.alpha * (0.68 + 0.32 * Math.sin(elapsed * 1.0 + d.phase));

        ctx.globalAlpha = clamp(pulseAlpha + this.brightenBoost * 0.1, 0.04, 0.42);
        ctx.drawImage(
          spriteCache[d.spriteIdx],
          drawX - d.size,
          drawY - d.size,
          d.size * 2,
          d.size * 2
        );
      }

      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }

  // ============================================================================
  // 6. SYSTEM 3: SHOOTING STAR SYSTEM (SLENDER DIAGONAL METEORS)
  // ============================================================================
  class ShootingStarSystem {
    constructor() {
      this.meteors = [];
      this.cooldown = randomRange(3.2, 6.4);
    }

    spawnMeteor(width, height) {
      if (this.meteors.length >= 2) return;
      const startX = randomRange(width * 0.2, width * 0.92);
      const startY = randomRange(height * 0.06, height * 0.34);
      const angle = randomRange(Math.PI * 0.7, Math.PI * 0.81);
      const speed = randomRange(500, 740);

      this.meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        tailLength: randomRange(75, 130),
        life: 0,
        maxLife: randomRange(0.6, 0.95),
        tint: Math.random() < 0.5 ? '255, 186, 224' : '224, 231, 255',
      });
    }

    updateAndRender(ctx, width, height, dt, motionScale) {
      if (motionScale < 0.2) return;
      this.cooldown -= dt;
      if (this.cooldown <= 0) {
        this.spawnMeteor(width, height);
        this.cooldown = randomRange(4.8, 9.2);
      }

      if (this.meteors.length === 0) return;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = this.meteors.length - 1; i >= 0; i--) {
        const m = this.meteors[i];
        m.life += dt;
        if (m.life >= m.maxLife) {
          this.meteors.splice(i, 1);
          continue;
        }

        m.x += m.vx * dt;
        m.y += m.vy * dt;

        const progress = m.life / m.maxLife;
        const alpha = Math.sin(progress * Math.PI);
        const speedMag = Math.hypot(m.vx, m.vy) || 1;
        const tailX = m.x - (m.vx / speedMag) * m.tailLength;
        const tailY = m.y - (m.vy / speedMag) * m.tailLength;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
        grad.addColorStop(0.28, `rgba(${m.tint}, ${alpha * 0.58})`);
        grad.addColorStop(1, 'rgba(255, 133, 189, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.35;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.5, 0, TAU);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // ============================================================================
  // 7. SYSTEM 4: PINK PARTICLE HEART SYSTEM & SEPARATION PHYSICS
  // ============================================================================
  const STAGE_LOCKED = 0;
  const STAGE_NIGHT = 1;
  const STAGE_FORMING = 2;
  const STAGE_BEATING = 3;
  const STAGE_OPENED = 4;

  class ParticleHeartSystem {
    constructor(isMobile) {
      this.isMobile = isMobile;
      this.heartParticles = [];
      this.orbitSparks = [];
      this.burstParticles = [];
      this.shockwaves = [];
      this.spiritNodes = [];
    }

    init(width, height) {
      this.isMobile = width < 768;
      // High particle count with fine pinpoint sizes so individual sparks shine without solid blobbing
      const count = this.isMobile ? 1600 : 2600;
      this.heartParticles = new Array(count);

      for (let i = 0; i < count; i++) {
        const t = Math.random() * TAU;
        const pt = evaluateHeartPoint(t);

        // 3D shell distribution: crisp outer contour + airy inner volume + delicate outer halo
        let radialScale = 1;
        let role = 0;
        const rRoll = Math.random();
        if (rRoll < 0.58) {
          radialScale = 1 - Math.pow(Math.random(), 2.8) * 0.13;
          role = 0; // Crisp contour rim
        } else if (rRoll < 0.91) {
          radialScale = 0.24 + Math.sqrt(Math.random()) * 0.74;
          role = 1; // Gossamer inner lattice
        } else {
          radialScale = 1.01 + Math.random() * 0.11;
          role = 2; // Soft outer stardust halo
        }

        const spawnAngle = Math.random() * TAU;
        const spawnDist = Math.max(width, height) * (0.26 + Math.random() * 0.62);
        const startX = width * 0.5 + Math.cos(spawnAngle) * spawnDist;
        const startY = height * 0.5 + Math.sin(spawnAngle) * spawnDist;

        let spriteIdx = 1;
        const cRoll = Math.random();
        if (cRoll < 0.3) spriteIdx = 0;
        else if (cRoll < 0.66) spriteIdx = 1;
        else if (cRoll < 0.88) spriteIdx = 2;
        else if (cRoll < 0.96) spriteIdx = 3;
        else spriteIdx = 4;

        // Finer particle sizes & controlled alpha to eliminate white/pink center blowout
        this.heartParticles[i] = {
          x: startX,
          y: startY,
          originX: startX,
          originY: startY,
          vx: (Math.random() - 0.5) * 18,
          vy: (Math.random() - 0.5) * 18,
          hx: pt.x * radialScale,
          hy: pt.y * radialScale,
          hz: (Math.random() - 0.5) * 4.8,
          role,
          spriteIdx,
          baseSize:
            role === 0
              ? randomRange(2.1, 4.1)
              : role === 1
                ? randomRange(1.6, 3.3)
                : randomRange(2.4, 4.6),
          alpha:
            role === 0
              ? randomRange(0.46, 0.86)
              : role === 1
                ? randomRange(0.22, 0.52)
                : randomRange(0.32, 0.68),
          twinkleSpeed: randomRange(1.5, 4.2),
          twinklePhase: Math.random() * TAU,
          delay: Math.random() * 0.34,
          swirlSign: i % 2 === 0 ? 1 : -1,
          swirlStrength: randomRange(40, 140),
        };
      }

      // Orbiting Sparkle Motes
      const orbitCount = this.isMobile ? 34 : 58;
      this.orbitSparks = [];
      for (let i = 0; i < orbitCount; i++) {
        this.orbitSparks.push({
          angle: Math.random() * TAU,
          angularSpeed: randomRange(0.2, 0.52) * (Math.random() < 0.5 ? 1 : -1),
          radiusFactor: randomRange(0.96, 1.36),
          tilt: randomRange(0.76, 1.12),
          size: randomRange(2.6, 5.2),
          spriteIdx: i % 3 === 0 ? 3 : 2,
          phase: Math.random() * TAU,
        });
      }

      this.initSpiritNodes(width, height);
    }

    snapshotParticleOrigins() {
      for (let i = 0; i < this.heartParticles.length; i++) {
        const p = this.heartParticles[i];
        p.originX = p.x;
        p.originY = p.y;
      }
    }

    initSpiritNodes(width, height) {
      // Positioned primarily at the left/right flanks so they never clip top/bottom on mobile
      const labels = [
        { text: 'Cua ❤️', sub: 'My Little Universe', angle: -0.35, distMult: 1.28 },
        { text: 'Thương Cua', sub: 'Forever & Always', angle: -2.79, distMult: 1.28 },
        { text: 'Dịu dàng', sub: 'Ngàn vì sao sáng', angle: 0.42, distMult: 1.32 },
        { text: 'Bên em', sub: 'Mỗi ngày ấm áp', angle: 2.72, distMult: 1.32 },
      ];

      this.spiritNodes = labels.map((item, idx) => ({
        id: idx,
        text: item.text,
        sub: item.sub,
        baseAngle: item.angle,
        distMult: item.distMult,
        x: width * 0.5 + Math.cos(item.angle) * 140,
        y: height * 0.5 + Math.sin(item.angle) * 110,
        vx: 0,
        vy: 0,
        tagOffsetX: 0,
        tagOffsetY: -22,
        phase: idx * 1.55,
        radius: this.isMobile ? 48 : 62,
      }));
    }

    spawnTouchPulse(x, y, particleCount = 55) {
      this.shockwaves.push({
        x,
        y,
        radius: 8,
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.42,
        alpha: 0.72,
      });

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * TAU;
        const speed = randomRange(40, 240);
        this.burstParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - randomRange(8, 38),
          size: randomRange(3.2, 7.8),
          spriteIdx: Math.floor(Math.random() * 4),
          alpha: 0.9,
          life: 0,
          maxLife: randomRange(0.9, 1.75),
        });
      }
    }

    // Anti-overlap Separation Algorithm for Companion Spirits & Name Tags
    updateSpiritPhysics(
      dt,
      elapsed,
      heartCenterX,
      heartCenterY,
      heartVisualRadius,
      safeTopY,
      safeBottomY
    ) {
      const count = this.spiritNodes.length;
      const orbitRadius = heartVisualRadius * (this.isMobile ? 1.18 : 1.3);

      for (let i = 0; i < count; i++) {
        const node = this.spiritNodes[i];
        const slowWave = Math.sin(elapsed * 0.42 + node.phase) * 0.1;
        const angle = node.baseAngle + slowWave;

        const anchorX = heartCenterX + Math.cos(angle) * orbitRadius;
        const anchorY = heartCenterY + Math.sin(angle) * (orbitRadius * 0.72);

        let fx = (anchorX - node.x) * 4.0;
        let fy = (anchorY - node.y) * 4.0;

        // 1. Mutual Separation between Spirit Nodes & Name Tags
        for (let j = 0; j < count; j++) {
          if (i === j) continue;
          const other = this.spiritNodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const minSep = node.radius + other.radius + (this.isMobile ? 20 : 32);

          if (dist < minSep) {
            const push = ((minSep - dist) / minSep) * 260;
            fx += (dx / dist) * push;
            fy += (dy / dist) * push;
          }
        }

        // 2. Separation from the Heart Core so labels never cover the Pink Particle Heart
        const dxHeart = node.x - heartCenterX;
        const dyHeart = node.y - heartCenterY;
        const distHeart = Math.hypot(dxHeart, dyHeart) || 0.001;
        const minHeartClearance = heartVisualRadius * 1.05;

        if (distHeart < minHeartClearance) {
          const pushOut = ((minHeartClearance - distHeart) / minHeartClearance) * 320;
          fx += (dxHeart / distHeart) * pushOut;
          fy += (dyHeart / distHeart) * pushOut;
        }

        node.vx = (node.vx + fx * dt) * Math.pow(0.84, dt * 60);
        node.vy = (node.vy + fy * dt) * Math.pow(0.84, dt * 60);
        node.x += node.vx * dt;
        node.y += node.vy * dt;

        // Clamp strictly within safe viewport & above the Love Card
        const marginX = this.isMobile ? 56 : 84;
        node.x = clamp(node.x, marginX, window.innerWidth - marginX);
        node.y = clamp(node.y, safeTopY + 28, Math.max(safeTopY + 40, safeBottomY - 28));

        const desiredTagY = node.y < heartCenterY ? -22 : 22;
        node.tagOffsetY = lerp(node.tagOffsetY, desiredTagY, 1 - Math.exp(-6 * dt));
      }
    }

    renderSpiritNodes(ctx, elapsed, stage) {
      if (stage < STAGE_FORMING) return;
      // On mobile when Love Letter is open, keep spirit tags subtle so the heart & letter stay clean
      let visibility = stage === STAGE_FORMING ? 0.42 : 0.85;
      if (stage === STAGE_OPENED && this.isMobile) {
        visibility = 0.28;
      }

      ctx.save();
      for (let i = 0; i < this.spiritNodes.length; i++) {
        // On small mobile screens when card is open, only show the 2 top flank nodes to avoid crowding
        if (stage === STAGE_OPENED && this.isMobile && i >= 2) continue;

        const node = this.spiritNodes[i];
        const pulse = 1 + 0.14 * Math.sin(elapsed * 2.4 + node.phase);

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const orbRadius = 9 * pulse;
        ctx.globalAlpha = visibility;
        ctx.drawImage(
          spriteCache[1],
          node.x - orbRadius,
          node.y - orbRadius,
          orbRadius * 2,
          orbRadius * 2
        );
        ctx.restore();

        const tagX = node.x + node.tagOffsetX;
        const tagY = node.y + node.tagOffsetY;

        ctx.font = '600 10.5px "Plus Jakarta Sans", sans-serif';
        const titleWidth = ctx.measureText(node.text).width;
        ctx.font = '400 8.5px "JetBrains Mono", monospace';
        const subWidth = ctx.measureText(node.sub).width;

        const boxW = Math.max(titleWidth, subWidth) + 18;
        const boxH = 30;
        const boxX = tagX - boxW * 0.5;
        const boxY = tagY - boxH * 0.5;

        ctx.strokeStyle = `rgba(255, 148, 198, ${0.2 * visibility})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(tagX, tagY);
        ctx.stroke();

        ctx.fillStyle = `rgba(11, 16, 34, ${0.72 * visibility})`;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.11 * visibility})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(boxX, boxY, boxW, boxH, 8);
        } else {
          ctx.rect(boxX, boxY, boxW, boxH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '600 10.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = `rgba(255, 240, 248, ${0.94 * visibility})`;
        ctx.fillText(node.text, tagX, boxY + 10.5);

        ctx.font = '400 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = `rgba(255, 174, 214, ${0.75 * visibility})`;
        ctx.fillText(node.sub, tagX, boxY + 22);
      }
      ctx.restore();
    }

    updateAndRender(
      ctx,
      width,
      height,
      dt,
      elapsed,
      stage,
      stageTime,
      heartCenterX,
      heartCenterY,
      heartScale,
      pulseScale,
      beatWave,
      pointer,
      safeTopY,
      safeBottomY,
      motionScale
    ) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      const swayAngle = Math.sin(elapsed * 0.6 * motionScale) * 0.2;
      const cosSway = Math.cos(swayAngle);
      const sinSway = Math.sin(swayAngle);
      const formDuration = 3.4;

      // 1. Update & Draw Main Pink Heart Particles
      for (let i = 0; i < this.heartParticles.length; i++) {
        const p = this.heartParticles[i];

        const rotX = p.hx * cosSway - p.hz * sinSway;
        const rotZ = p.hx * sinSway + p.hz * cosSway;
        const depthFactor = 1 + rotZ * 0.02;

        const destX = heartCenterX + rotX * heartScale * pulseScale * depthFactor;
        const destY = heartCenterY + p.hy * heartScale * pulseScale * depthFactor;

        if (stage === STAGE_LOCKED || stage === STAGE_NIGHT) {
          p.x += p.vx * dt * motionScale;
          p.y += p.vy * dt * motionScale;
          p.originX = p.x;
          p.originY = p.y;

          if (p.x < 0) p.x += width;
          if (p.x > width) p.x -= width;
          if (p.y < 0) p.y += height;
          if (p.y > height) p.y -= height;
        } else if (stage === STAGE_FORMING) {
          const localT = clamp((stageTime - p.delay) / (formDuration - p.delay), 0, 1);
          const eased = easeInOutCubic(localT);
          const swirlEnvelope = Math.sin(localT * Math.PI) * (1 - localT);
          const swirlAngle = (1 - localT) * 2.4 * p.swirlSign + p.twinklePhase * 0.2;

          const swirlOffsetX = Math.cos(swirlAngle) * p.swirlStrength * swirlEnvelope;
          const swirlOffsetY = Math.sin(swirlAngle) * p.swirlStrength * swirlEnvelope;

          p.x = lerp(p.originX, destX, eased) + swirlOffsetX;
          p.y = lerp(p.originY, destY, eased) + swirlOffsetY;
        } else {
          const microOrbit = (1.5 + p.role * 1.1) * motionScale;
          const waveX = Math.cos(elapsed * 1.75 + p.twinklePhase) * microOrbit;
          const waveY = Math.sin(elapsed * 1.45 + p.twinklePhase) * microOrbit;

          let targetX = destX + waveX;
          let targetY = destY + waveY;

          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const distSq = dx * dx + dy * dy;
            const influenceRadius = 84;
            if (distSq < influenceRadius * influenceRadius && distSq > 1) {
              const dist = Math.sqrt(distSq);
              const push = (1 - dist / influenceRadius) * 20;
              targetX += (dx / dist) * push;
              targetY += (dy / dist) * push;
            }
          }

          const followFactor = 1 - Math.exp(-8.8 * dt);
          p.x = lerp(p.x, targetX, followFactor);
          p.y = lerp(p.y, targetY, followFactor);
        }

        const twinkle = 0.65 + 0.35 * Math.sin(elapsed * p.twinkleSpeed + p.twinklePhase);
        const stageVisibility =
          stage === STAGE_LOCKED
            ? i % 5 === 0
              ? 0.38
              : 0.05
            : stage === STAGE_NIGHT
              ? i % 4 === 0
                ? 0.5
                : 0.1
              : 1;

        const finalAlpha = clamp(
          p.alpha * twinkle * stageVisibility * (1 + Math.max(0, beatWave) * 0.18),
          0.04,
          0.92
        );
        const size = p.baseSize * (0.88 + 0.24 * twinkle) * depthFactor;

        ctx.globalAlpha = finalAlpha;
        ctx.drawImage(
          spriteCache[p.spriteIdx],
          p.x - size,
          p.y - size,
          size * 2,
          size * 2
        );
      }

      // 2. Orbiting Sparkles around the Heart
      if (stage >= STAGE_FORMING) {
        const heartVisualRadius = heartScale * 16.0;
        const orbitAlphaScale = stage === STAGE_FORMING ? clamp(stageTime / 3, 0, 1) : 1;

        for (let i = 0; i < this.orbitSparks.length; i++) {
          const sp = this.orbitSparks[i];
          sp.angle += sp.angularSpeed * dt * motionScale;

          const rx = Math.cos(sp.angle) * heartVisualRadius * sp.radiusFactor;
          const ry = Math.sin(sp.angle) * heartVisualRadius * sp.radiusFactor * sp.tilt;

          const sx = heartCenterX + rx;
          const sy = heartCenterY + ry;
          const twinkle = 0.5 + 0.5 * Math.sin(elapsed * 3.0 + sp.phase);

          ctx.globalAlpha = twinkle * 0.68 * orbitAlphaScale;
          ctx.drawImage(
            spriteCache[sp.spriteIdx],
            sx - sp.size,
            sy - sp.size,
            sp.size * 2,
            sp.size * 2
          );
        }
      }

      // 3. Expanding Shockwave Rings
      for (let i = this.shockwaves.length - 1; i >= 0; i--) {
        const sw = this.shockwaves[i];
        sw.radius = lerp(sw.radius, sw.maxRadius, 1 - Math.exp(-3.4 * dt));
        sw.alpha = lerp(sw.alpha, 0, 1 - Math.exp(-3.9 * dt));

        if (sw.alpha <= 0.02) {
          this.shockwaves.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(255, 158, 208, ${sw.alpha * 0.45})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, TAU);
        ctx.stroke();
      }

      // 4. Celebratory Burst Particles
      for (let i = this.burstParticles.length - 1; i >= 0; i--) {
        const bp = this.burstParticles[i];
        bp.life += dt;
        if (bp.life >= bp.maxLife) {
          this.burstParticles.splice(i, 1);
          continue;
        }

        bp.vx *= Math.pow(0.95, dt * 60);
        bp.vy *= Math.pow(0.95, dt * 60);
        bp.vy += 14 * dt;
        bp.x += bp.vx * dt;
        bp.y += bp.vy * dt;

        const lifeRatio = 1 - bp.life / bp.maxLife;
        ctx.globalAlpha = lifeRatio * 0.86;
        const s = bp.size * (0.5 + 0.5 * lifeRatio);
        ctx.drawImage(
          spriteCache[bp.spriteIdx],
          bp.x - s,
          bp.y - s,
          s * 2,
          s * 2
        );
      }

      ctx.globalAlpha = 1;
      ctx.restore();

      // 5. Companion Spirits with Anti-Overlap & Safe Viewport Clamping
      const heartVisualRadius = heartScale * 16.0;
      this.updateSpiritPhysics(
        dt,
        elapsed,
        heartCenterX,
        heartCenterY,
        heartVisualRadius,
        safeTopY,
        safeBottomY
      );
      this.renderSpiritNodes(ctx, elapsed, stage);
    }
  }

  // ============================================================================
  // 8. MAIN SCENE CONTROLLER, VIEWPORT-SAFE HEART MATH & PASSWORD GATE
  // ============================================================================
  const canvas = document.getElementById('heart-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });

  const passwordGateOverlay = document.getElementById('password-gate-overlay');
  const passwordGateCard = document.getElementById('password-gate-card');
  const passwordGateForm = document.getElementById('password-gate-form');
  const secretPasswordInput = document.getElementById('secret-password-input');
  const gateErrorText = document.getElementById('gate-error-text');

  const stagePromptEl = document.getElementById('stage-prompt');
  const openHeartBtn = document.getElementById('open-heart-btn');
  const loveCardModal = document.getElementById('love-card-modal');
  const closeCardBtn = document.getElementById('close-card-btn');
  const burstLoveBtn = document.getElementById('burst-love-btn');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioLabel = document.getElementById('audio-label');

  const SECRET_CODE = 'emyeuanh';
  let isGateUnlocked = false;

  const reducedMotionQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let isMobile = width < 768;

  let currentStage = STAGE_LOCKED;
  let stageElapsed = 0;
  let totalElapsed = 0;
  let lastTimestamp = performance.now();

  let heartCenterX = width * 0.5;
  let heartCenterY = height * 0.46;
  let targetHeartCenterX = width * 0.5;
  let targetHeartCenterY = height * 0.46;
  let baseHeartScale = 9;
  let targetHeartScale = 9;
  let currentSafeTopY = 68;
  let currentSafeBottomY = height - 80;

  const pointer = {
    x: width * 0.5,
    y: height * 0.5,
    normX: 0,
    normY: 0,
    smoothX: 0,
    smoothY: 0,
    active: false,
  };

  const pianoEngine = new RomanticPianoEngine();
  const galaxySystem = new GalaxyNebulaSystem();
  const starfieldSystem = new StarfieldSystem(isMobile);
  const shootingStarSystem = new ShootingStarSystem();
  const particleHeartSystem = new ParticleHeartSystem(isMobile);

  /**
   * VIEWPORT-AWARE HEART POSITIONING & SCALING:
   * Parametric heart vertical bounds in heart-coordinate units:
   * - Top lobes + outer halo + pulse reach ~14.5 * scale above heartCenterY
   * - Bottom tip + outer halo + pulse reach ~20.2 * scale below heartCenterY
   * Total vertical span = 34.7 * scale.
   * Geometric vertical center offset = (20.2 - 14.5) / 2 = +2.85 * scale below heartCenterY.
   * By subtracting 2.85 * scale from the safe zone midpoint, the heart's top lobes and bottom tip
   * have identical top and bottom margins and can NEVER clip at the top of the screen!
   */
  function updateHeartLayoutTargets(instant = false) {
    isMobile = width < 768;
    const hudBottom = 64;

    if (currentStage === STAGE_OPENED) {
      if (isMobile) {
        // Measure actual Love Card top or compute from 52dvh bottom sheet
        let cardTop = height * 0.47;
        if (loveCardModal && loveCardModal.classList.contains('is-open')) {
          const rect = loveCardModal.getBoundingClientRect();
          if (rect.height > 40 && rect.top > hudBottom + 80) {
            cardTop = rect.top;
          }
        }

        const safeTop = hudBottom + 14;
        const safeBottom = Math.max(safeTop + 110, cardTop - 18);
        const availH = safeBottom - safeTop;
        const availW = width - 36;

        targetHeartScale = clamp(
          Math.min(availH / 35.5, availW / 37.0),
          4.2,
          8.6
        );
        targetHeartCenterX = width * 0.5;
        targetHeartCenterY =
          (safeTop + safeBottom) * 0.5 - 2.85 * targetHeartScale;

        currentSafeTopY = safeTop;
        currentSafeBottomY = safeBottom;
      } else {
        // Desktop (>= 768px): Two-column layout (Heart on left-center, Love Card on right)
        const safeTop = hudBottom + 28;
        const safeBottom = height - 48;
        const availH = Math.max(240, safeBottom - safeTop);
        const leftZoneWidth = width * 0.48;

        targetHeartScale = clamp(
          Math.min(availH / 36.5, leftZoneWidth / 37.5),
          8.8,
          14.6
        );
        targetHeartCenterX = width * 0.285;
        targetHeartCenterY =
          (safeTop + safeBottom) * 0.5 - 2.85 * targetHeartScale;

        currentSafeTopY = safeTop;
        currentSafeBottomY = safeBottom;
      }
    } else {
      // STAGE_LOCKED, STAGE_NIGHT, STAGE_FORMING, STAGE_BEATING
      const safeTop = hudBottom + 22;
      const safeBottom = isMobile ? height - 118 : height - 110;
      const availH = Math.max(180, safeBottom - safeTop);
      const availW = width - (isMobile ? 40 : 120);

      targetHeartScale = clamp(
        Math.min(availH / 36.5, availW / 38.0),
        isMobile ? 6.0 : 9.6,
        isMobile ? 10.4 : 15.6
      );
      targetHeartCenterX = width * 0.5;
      targetHeartCenterY =
        (safeTop + safeBottom) * 0.5 - 2.85 * targetHeartScale;

      currentSafeTopY = safeTop;
      currentSafeBottomY = safeBottom;
    }

    if (instant) {
      heartCenterX = targetHeartCenterX;
      heartCenterY = targetHeartCenterY;
      baseHeartScale = targetHeartScale;
    }
  }

  function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (starfieldSystem.stars.length === 0) {
      starfieldSystem.init(width, height);
    }
    updateHeartLayoutTargets(true);
  }

  // ============================================================================
  // COSMIC PASSWORD GATE VALIDATION & UNLOCK TRANSITION
  // ============================================================================
  function triggerPasswordError() {
    if (gateErrorText) {
      gateErrorText.textContent =
        'Mật mã chưa đúng rồi Cua ơi... thử nói điều ngược lại xem nhé 💗';
      gateErrorText.classList.add('is-visible');
    }
    if (secretPasswordInput) {
      secretPasswordInput.classList.add('is-invalid');
    }
    if (passwordGateCard) {
      passwordGateCard.classList.remove('is-error-shake');
      void passwordGateCard.offsetWidth;
      passwordGateCard.classList.add('is-error-shake');
    }
  }

  function unlockCosmicGate() {
    if (isGateUnlocked) return;
    isGateUnlocked = true;

    if (gateErrorText) {
      gateErrorText.textContent = '';
      gateErrorText.classList.remove('is-visible');
    }
    if (secretPasswordInput) {
      secretPasswordInput.classList.remove('is-invalid');
      secretPasswordInput.blur();
    }

    if (passwordGateCard) {
      passwordGateCard.classList.remove('is-error-shake');
      passwordGateCard.classList.add('is-glow-success');
    }

    pianoEngine.playUnlockHarmony();
    starfieldSystem.triggerUnlockConvergence(1.2);
    shootingStarSystem.spawnMeteor(width, height);
    particleHeartSystem.spawnTouchPulse(width * 0.5, height * 0.45, 75);

    setTimeout(() => {
      if (passwordGateOverlay) {
        passwordGateOverlay.classList.add('is-unlocking');
      }
      particleHeartSystem.snapshotParticleOrigins();
      currentStage = STAGE_FORMING;
      stageElapsed = 0;
      updateHeartLayoutTargets(false);
    }, 240);

    setTimeout(() => {
      if (passwordGateOverlay) {
        passwordGateOverlay.classList.add('is-hidden');
        passwordGateOverlay.setAttribute('aria-hidden', 'true');
      }
    }, 1350);
  }

  if (passwordGateForm) {
    passwordGateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isGateUnlocked) return;

      const rawValue = secretPasswordInput ? secretPasswordInput.value : '';
      const normalized = rawValue.trim().toLowerCase();

      if (normalized === SECRET_CODE) {
        unlockCosmicGate();
      } else {
        triggerPasswordError();
      }
    });
  }

  if (secretPasswordInput) {
    secretPasswordInput.addEventListener('input', () => {
      if (secretPasswordInput.classList.contains('is-invalid')) {
        secretPasswordInput.classList.remove('is-invalid');
      }
    });
  }

  // ============================================================================
  // STAGE 4 LOVE LETTER INTERACTIONS
  // ============================================================================
  function openLoveCard() {
    if (!isGateUnlocked || currentStage < STAGE_FORMING) return;
    if (currentStage !== STAGE_OPENED) {
      currentStage = STAGE_OPENED;
      stageElapsed = 0;
    }

    if (stagePromptEl) {
      stagePromptEl.classList.remove('is-visible');
      stagePromptEl.classList.add('is-hidden');
    }

    if (loveCardModal) {
      loveCardModal.classList.add('is-open');
      loveCardModal.setAttribute('aria-hidden', 'false');
    }

    // Recalculate after modal is visible so mobile safe zone matches actual card top
    requestAnimationFrame(() => {
      updateHeartLayoutTargets(false);
    });

    particleHeartSystem.spawnTouchPulse(heartCenterX, heartCenterY, 70);
    starfieldSystem.triggerBrightenWave(0.9);
    shootingStarSystem.spawnMeteor(width, height);
    pianoEngine.playSparkleChime();
  }

  function closeLoveCard() {
    if (currentStage === STAGE_OPENED) {
      currentStage = STAGE_BEATING;
      stageElapsed = 0;
      updateHeartLayoutTargets(false);
    }

    if (loveCardModal) {
      loveCardModal.classList.remove('is-open');
      loveCardModal.setAttribute('aria-hidden', 'true');
    }

    if (stagePromptEl) {
      stagePromptEl.classList.remove('is-hidden');
      stagePromptEl.classList.add('is-visible');
    }

    particleHeartSystem.spawnTouchPulse(targetHeartCenterX, targetHeartCenterY, 40);
  }

  // ============================================================================
  // MAIN ANIMATION LOOP (REQUIRED: deltaTime, lerp, easeInOutCubic)
  // ============================================================================
  function renderUniverse(now) {
    const dt = clamp((now - lastTimestamp) / 1000, 0.001, 0.05);
    lastTimestamp = now;

    const motionScale = reducedMotionQuery.matches ? 0.35 : 1.0;
    totalElapsed += dt;
    stageElapsed += dt;

    if (currentStage === STAGE_NIGHT && stageElapsed >= 1.0) {
      particleHeartSystem.snapshotParticleOrigins();
      currentStage = STAGE_FORMING;
      stageElapsed = 0;
    } else if (currentStage === STAGE_FORMING && stageElapsed >= 3.5) {
      currentStage = STAGE_BEATING;
      stageElapsed = 0;
      if (stagePromptEl) {
        stagePromptEl.classList.add('is-visible');
      }
    }

    const layoutLerp = 1 - Math.exp(-4.6 * dt);
    heartCenterX = lerp(heartCenterX, targetHeartCenterX, layoutLerp);
    heartCenterY = lerp(heartCenterY, targetHeartCenterY, layoutLerp);
    baseHeartScale = lerp(baseHeartScale, targetHeartScale, layoutLerp);

    const parallaxLerp = 1 - Math.exp(-3.5 * dt);
    pointer.smoothX = lerp(
      pointer.smoothX,
      isMobile ? 0 : pointer.normX * motionScale,
      parallaxLerp
    );
    pointer.smoothY = lerp(
      pointer.smoothY,
      isMobile ? 0 : pointer.normY * motionScale,
      parallaxLerp
    );

    const beatWave =
      (Math.pow(Math.sin(totalElapsed * 2.4), 6) * 0.058 +
        Math.sin(totalElapsed * 4.8 - 0.45) * 0.018) *
      motionScale;
    const pulseScale =
      currentStage >= STAGE_BEATING
        ? 1 + beatWave
        : 1 + Math.sin(totalElapsed * 1.5) * 0.012 * motionScale;

    const heartVisualRadius = baseHeartScale * 16.0;

    // 1. Living Galaxy & Nebula Clouds
    galaxySystem.render(
      ctx,
      width,
      height,
      totalElapsed * motionScale,
      heartCenterX,
      heartCenterY,
      heartVisualRadius,
      Math.max(0, beatWave * 10),
      pointer.smoothX,
      pointer.smoothY
    );

    // 2. Multi-Layer Starfield & Cosmic Dust
    starfieldSystem.updateAndRender(
      ctx,
      width,
      height,
      dt,
      totalElapsed,
      pointer.smoothX,
      pointer.smoothY,
      heartCenterX,
      heartCenterY,
      heartVisualRadius,
      motionScale
    );

    // 3. Occasional Slender Shooting Stars
    shootingStarSystem.updateAndRender(ctx, width, height, dt, motionScale);

    // 4. Pink Particle Heart & Companion Spirit Nodes
    particleHeartSystem.updateAndRender(
      ctx,
      width,
      height,
      dt,
      totalElapsed,
      currentStage,
      stageElapsed,
      heartCenterX,
      heartCenterY,
      baseHeartScale,
      pulseScale,
      beatWave,
      pointer,
      currentSafeTopY,
      currentSafeBottomY,
      motionScale
    );

    requestAnimationFrame(renderUniverse);
  }

  // ============================================================================
  // 9. POINTER, TOUCH & BUTTON LISTENERS
  // ============================================================================
  canvas.addEventListener('pointerdown', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;

    if (!isGateUnlocked) return;

    particleHeartSystem.spawnTouchPulse(e.clientX, e.clientY, 42);
    starfieldSystem.triggerBrightenWave(0.55);
    pianoEngine.playSparkleChime();

    const distToHeart = Math.hypot(
      e.clientX - heartCenterX,
      e.clientY - heartCenterY
    );
    const hitRadius = baseHeartScale * 18.5;

    if (currentStage === STAGE_BEATING && distToHeart <= hitRadius) {
      openLoveCard();
    } else if (
      currentStage === STAGE_FORMING &&
      stageElapsed > 1.6 &&
      distToHeart <= hitRadius
    ) {
      openLoveCard();
    }
  });

  window.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.normX = (e.clientX / Math.max(1, width) - 0.5) * 2;
    pointer.normY = (e.clientY / Math.max(1, height) - 0.5) * 2;
    pointer.active = true;
  });

  window.addEventListener('pointerup', () => {
    pointer.active = false;
  });

  if (openHeartBtn) {
    openHeartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLoveCard();
    });
  }

  if (closeCardBtn) {
    closeCardBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLoveCard();
    });
  }

  if (burstLoveBtn) {
    burstLoveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      particleHeartSystem.spawnTouchPulse(heartCenterX, heartCenterY, 80);
      starfieldSystem.triggerBrightenWave(1.0);
      shootingStarSystem.spawnMeteor(width, height);
      pianoEngine.playSparkleChime();
    });
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const playing = pianoEngine.toggle();
      audioToggleBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      if (audioLabel) {
        audioLabel.textContent = playing
          ? 'Nhạc Piano: Bật'
          : 'Nhạc Piano: Tắt';
      }
    });
  }

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('orientationchange', () => {
    setTimeout(handleResize, 120);
  });

  handleResize();
  updateHeartLayoutTargets(true);
  particleHeartSystem.init(width, height);
  requestAnimationFrame(renderUniverse);
})();
