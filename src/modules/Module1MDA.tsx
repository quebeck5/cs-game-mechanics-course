import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import {
  Cpu,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Sliders,
  Play,
  RotateCcw,
  Layers,
  Activity,
  BookOpen
} from 'lucide-react';
import { Module1Content } from '../content/Module1Content';

interface Module1Props {
  onNavigate: (page: PageId) => void;
  onCompleteModule: () => void;
  onCompleteLab: () => void;
  isModuleDone: boolean;
  isLabDone: boolean;
}

interface MechanicRuleToggle {
  id: string;
  name: string;
  codeRule: string;
  dynamicEffect: string;
  aestheticsDelta: {
    sensation: number;
    challenge: number;
    discovery: number;
    expression: number;
    submission: number;
    tension: number;
  };
}

const MDA_RULES: MechanicRuleToggle[] = [
  {
    id: 'shared_ammo_hp',
    name: 'Blood-Ammo Coupling (Spells cost HP, Melee restores HP)',
    codeRule: 'onCast(): hp -= 15; onMeleeHit(): hp = min(maxHp, hp + 20);',
    dynamicEffect: 'Eliminates passive turtling: when low on HP, the player is forced to dash into close-quarters danger rather than hiding behind cover.',
    aestheticsDelta: { sensation: 25, challenge: 35, discovery: 5, expression: 15, submission: -30, tension: 40 }
  },
  {
    id: 'momentum_Combo',
    name: 'Velocity-Scaled Damage Multiplier',
    codeRule: 'damage = baseDmg * (1.0 + norm(velocity) / maxSpeed);',
    dynamicEffect: 'Transforms spatial movement into an offensive resource; players chain wall-bounces and dashes before striking instead of standing still.',
    aestheticsDelta: { sensation: 35, challenge: 20, discovery: 15, expression: 35, submission: -10, tension: 20 }
  },
  {
    id: 'corpse_souls',
    name: 'Single-Chance Corpse Recovery (Dark Souls / Hollow Knight)',
    codeRule: 'onDeath(): dropCurrencyAt(pos); if (dieBeforePickup) clearDroppedCurrency();',
    dynamicEffect: 'Creates an asymmetric risk spike on the journey back to the death location, turning routine traversal into a high-stakes retrieval mission.',
    aestheticsDelta: { sensation: 5, challenge: 30, discovery: 10, expression: 0, submission: -25, tension: 45 }
  },
  {
    id: 'auto_zen_magnet',
    name: 'Harmonic Magnet & Zero-Penalty Misses',
    codeRule: 'onUpdate(): attractOrbs(radius=250); onMiss(): keepComboAlive();',
    dynamicEffect: 'Removes failure anxiety and execution stress; shifts cognitive load from survival to rhythmic audiovisual flow.',
    aestheticsDelta: { sensation: 30, challenge: -35, discovery: 10, expression: 20, submission: 50, tension: -40 }
  }
];

export const Module1MDA: React.FC<Module1Props> = ({
  onNavigate,
  onCompleteModule,
  onCompleteLab,
  isModuleDone,
  isLabDone,
}) => {
  // Interactive Diagram 1: MDA State
  const [activeRules, setActiveRules] = useState<Record<string, boolean>>({
    shared_ammo_hp: true,
    momentum_Combo: true,
    corpse_souls: false,
    auto_zen_magnet: false,
  });

  // Interactive Diagram 2: Flow Channel Phase Portrait State
  const [challengeSlope, setChallengeSlope] = useState<number>(1.15);
  const [difficultyWaveAmp, setDifficultyWaveAmp] = useState<number>(0.22);
  const [skillLearnRate, setSkillLearnRate] = useState<number>(1.05);

  // Playable Lab 1: The Toy Mutation Sandbox State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bounceSpeedMult, setBounceSpeedMult] = useState<number>(1.08);
  const [gravityY, setGravityY] = useState<number>(0.18);
  const [paddleTransfer, setPaddleTransfer] = useState<number>(0.45);
  const [hitstopFrames, setHitstopFrames] = useState<number>(4);
  const [trailParticles, setTrailParticles] = useState<boolean>(true);
  const [multiBallSplit, setMultiBallSplit] = useState<boolean>(false);
  const [juggleStreak, setJuggleStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

  const toggleRule = (id: string) => {
    courseAudio.playClick(580);
    setActiveRules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Compute aggregate Aesthetics profile
  const aesthetics = {
    sensation: 30,
    challenge: 30,
    discovery: 30,
    expression: 25,
    submission: 35,
    tension: 25,
  };

  MDA_RULES.forEach((r) => {
    if (activeRules[r.id]) {
      aesthetics.sensation = Math.max(5, Math.min(100, aesthetics.sensation + r.aestheticsDelta.sensation));
      aesthetics.challenge = Math.max(5, Math.min(100, aesthetics.challenge + r.aestheticsDelta.challenge));
      aesthetics.discovery = Math.max(5, Math.min(100, aesthetics.discovery + r.aestheticsDelta.discovery));
      aesthetics.expression = Math.max(5, Math.min(100, aesthetics.expression + r.aestheticsDelta.expression));
      aesthetics.submission = Math.max(5, Math.min(100, aesthetics.submission + r.aestheticsDelta.submission));
      aesthetics.tension = Math.max(5, Math.min(100, aesthetics.tension + r.aestheticsDelta.tension));
    }
  });

  // Preset buttons for Lab 1
  const applyToyPreset = (preset: 'cardboard' | 'zen' | 'arcade') => {
    courseAudio.playClick(660);
    if (preset === 'cardboard') {
      setBounceSpeedMult(1.0);
      setGravityY(0.0);
      setPaddleTransfer(0.0);
      setHitstopFrames(0);
      setTrailParticles(false);
      setMultiBallSplit(false);
    } else if (preset === 'zen') {
      setBounceSpeedMult(0.98);
      setGravityY(0.14);
      setPaddleTransfer(0.35);
      setHitstopFrames(2);
      setTrailParticles(true);
      setMultiBallSplit(false);
    } else {
      setBounceSpeedMult(1.12);
      setGravityY(0.26);
      setPaddleTransfer(0.65);
      setHitstopFrames(5);
      setTrailParticles(true);
      setMultiBallSplit(true);
    }
  };

  // Lab 1 Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouseX = canvas.width / 2;
    let prevPaddleX = canvas.width / 2;
    let paddleX = canvas.width / 2;
    let paddleVx = 0;
    let freezeCounter = 0;
    let shakeMag = 0;
    let streak = 0;

    interface Ball {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      hue: number;
      scaleX: number;
      scaleY: number;
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }

    let balls: Ball[] = [
      {
        x: canvas.width / 2,
        y: 90,
        vx: 3.2,
        vy: 2.5,
        radius: 11,
        hue: 190,
        scaleX: 1,
        scaleY: 1,
      },
    ];

    let particles: Particle[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scale = canvas.width / rect.width;
      mouseX = (e.clientX - rect.left) * scale;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') mouseX = Math.max(60, mouseX - 38);
      if (e.key === 'ArrowRight' || e.key === 'd') mouseX = Math.min(canvas.width - 60, mouseX + 38);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    const render = () => {
      // Smooth paddle movement
      prevPaddleX = paddleX;
      paddleX += (mouseX - paddleX) * 0.28;
      paddleX = Math.max(55, Math.min(canvas.width - 55, paddleX));
      paddleVx = paddleX - prevPaddleX;

      if (freezeCounter > 0) {
        freezeCounter--;
      } else {
        // Update balls
        balls.forEach((b) => {
          b.vy += gravityY;
          b.x += b.vx;
          b.y += b.vy;

          // Recover squash and stretch
          b.scaleX += (1 - b.scaleX) * 0.2;
          b.scaleY += (1 - b.scaleY) * 0.2;

          // Trail particles
          if (trailParticles && Math.random() < 0.65) {
            particles.push({
              x: b.x,
              y: b.y,
              vx: (Math.random() - 0.5) * 0.8,
              vy: (Math.random() - 0.5) * 0.8,
              life: 18,
              maxLife: 18,
              color: `hsla(${b.hue}, 90%, 65%, 0.5)`,
              size: b.radius * 0.55,
            });
          }

          // Wall collisions
          if (b.x - b.radius < 12) {
            b.x = 12 + b.radius;
            b.vx = Math.abs(b.vx);
            b.scaleX = 0.65;
            b.scaleY = 1.35;
          } else if (b.x + b.radius > canvas.width - 12) {
            b.x = canvas.width - 12 - b.radius;
            b.vx = -Math.abs(b.vx);
            b.scaleX = 0.65;
            b.scaleY = 1.35;
          }

          // Ceiling collision
          if (b.y - b.radius < 12) {
            b.y = 12 + b.radius;
            b.vy = Math.abs(b.vy);
            b.scaleX = 1.35;
            b.scaleY = 0.65;
          }

          // Paddle collision
          const paddleY = canvas.height - 34;
          const paddleHalfW = 54;
          if (
            b.vy > 0 &&
            b.y + b.radius >= paddleY - 7 &&
            b.y - b.radius <= paddleY + 10 &&
            b.x >= paddleX - paddleHalfW - b.radius &&
            b.x <= paddleX + paddleHalfW + b.radius
          ) {
            b.y = paddleY - 7 - b.radius;
            const hitOffset = (b.x - paddleX) / paddleHalfW; // -1 to 1
            const currentSpeed = Math.hypot(b.vx, b.vy);
            const nextSpeed = Math.min(13.5, Math.max(4.5, currentSpeed * bounceSpeedMult));

            b.vy = -Math.max(4.2, Math.abs(b.vy) * bounceSpeedMult);
            b.vx = b.vx * 0.75 + hitOffset * nextSpeed * 0.55 + paddleVx * paddleTransfer;
            b.hue = (b.hue + 28) % 360;
            b.scaleX = 1.55;
            b.scaleY = 0.55;

            freezeCounter = hitstopFrames;
            shakeMag = hitstopFrames > 0 ? Math.min(8, hitstopFrames * 1.4) : 0;

            streak += 1;
            setJuggleStreak(streak);
            setBestStreak((prev) => {
              const nextBest = Math.max(prev, streak);
              if (nextBest >= 8 && !isLabDone) {
                onCompleteLab();
              }
              return nextBest;
            });

            courseAudio.playHit(hitstopFrames >= 4);

            // Spawn burst particles
            if (trailParticles) {
              for (let i = 0; i < 12; i++) {
                const angle = -Math.PI * Math.random();
                const spd = 1.5 + Math.random() * 4.5;
                particles.push({
                  x: b.x,
                  y: paddleY - 6,
                  vx: Math.cos(angle) * spd,
                  vy: Math.sin(angle) * spd,
                  life: 24,
                  maxLife: 24,
                  color: `hsla(${b.hue}, 95%, 70%, 0.9)`,
                  size: 3.5,
                });
              }
            }

            // Multi-ball split every 4 hits if enabled
            if (multiBallSplit && streak % 4 === 0 && balls.length < 3) {
              balls.push({
                x: b.x,
                y: b.y - 10,
                vx: -b.vx * 0.9 + (Math.random() - 0.5) * 3,
                vy: b.vy * 0.95,
                radius: 10,
                hue: (b.hue + 140) % 360,
                scaleX: 1.3,
                scaleY: 0.7,
              });
            }
          }
        });

        // Remove balls that fell below bottom
        const surviving = balls.filter((b) => b.y - b.radius < canvas.height + 20);
        if (surviving.length === 0) {
          streak = 0;
          setJuggleStreak(0);
          balls = [
            {
              x: canvas.width / 2,
              y: 80,
              vx: (Math.random() > 0.5 ? 1 : -1) * 3.2,
              vy: 2.5,
              radius: 11,
              hue: 190,
              scaleX: 1,
              scaleY: 1,
            },
          ];
        } else {
          balls = surviving;
        }
      }

      // Update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
      });
      particles = particles.filter((p) => p.life > 0);

      // Decay screen shake
      shakeMag *= 0.82;
      const sx = (Math.random() - 0.5) * shakeMag * 2;
      const sy = (Math.random() - 0.5) * shakeMag * 2;

      // Render Canvas
      ctx.save();
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.translate(sx, sy);

      // Subtle grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let gx = 40; gx < canvas.width; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, canvas.height);
        ctx.stroke();
      }
      for (let gy = 40; gy < canvas.height; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(canvas.width, gy);
        ctx.stroke();
      }

      // Draw border walls
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

      // Draw particles
      particles.forEach((p) => {
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw Paddle with velocity tilt
      const paddleY = canvas.height - 34;
      ctx.save();
      ctx.translate(paddleX, paddleY);
      ctx.rotate(Math.max(-0.18, Math.min(0.18, paddleVx * 0.008 * paddleTransfer)));
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(-54, -7, 108, 14, 7);
      ctx.fill();
      ctx.restore();

      // Draw Balls with Squash & Stretch
      balls.forEach((b) => {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.scale(b.scaleX, b.scaleY);
        ctx.fillStyle = `hsl(${b.hue}, 90%, 60%)`;
        ctx.shadowColor = `hsl(${b.hue}, 90%, 60%)`;
        ctx.shadowBlur = trailParticles ? 14 : 0;
        ctx.beginPath();
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [bounceSpeedMult, gravityY, paddleTransfer, hitstopFrames, trailParticles, multiBallSplit, isLabDone, onCompleteLab]);

  // Generate Flow Channel SVG Path
  const flowPoints: string[] = [];
  let inFlowCount = 0;
  for (let i = 0; i <= 40; i++) {
    const t = i / 40; // 0 to 1
    const skill = Math.min(1, Math.pow(t, 0.85) * skillLearnRate);
    const wave = Math.sin(t * Math.PI * 6) * difficultyWaveAmp * (0.3 + 0.7 * t);
    const challenge = Math.max(0.05, Math.min(1.15, t * challengeSlope + wave));

    const x = 60 + skill * 440;
    const y = 260 - Math.min(1.05, challenge) * 220;
    flowPoints.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);

    // Check if inside flow band (|challenge - skill| <= 0.22)
    if (Math.abs(challenge - skill) <= 0.22) {
      inFlowCount++;
    }
  }
  const flowPercentage = Math.round((inFlowCount / 41) * 100);

  return (
    <div className="space-y-12 pb-16">
      {/* Module Header */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1 text-xs font-mono font-bold text-white">
            MODULE 01 • HOURS 0:00 – 2:00
          </span>
          <span className="text-xs font-mono text-slate-400">
             MIT CMS.608 + Hunicke/LeBlanc/Zubek (MDA) + Raph Koster (Information Theory)
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Deconstructing "Fun": The MDA Compiler, Shannon Entropy & The Toy
        </h1>
        <p className="text-slate-300 max-w-4xl leading-relaxed">
          To a Computer Scientist, "Fun" sounds dangerously subjective—like a magic constant you can’t unit-test.
          In this first 2-hour module, we replace vague intuition with three formal models:
          <strong> The MDA Bidirectional Pipeline</strong>, <strong>Raph Koster’s Information Theory of Fun</strong>, and <strong>Sawtooth Flow Phase Portraits</strong>.
        </p>
      </header>

      {/* Comprehensive Academic Textbook Chapter */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <Module1Content />
      </section>

      {/* Section 1: The MDA Framework as a Compiler Pipeline */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
          <Layers className="h-4 w-4" />
          <span>1.1 Formal Architecture — Hunicke, LeBlanc & Zubek (2004)</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          The MDA Framework: Why Engineers Write Mechanics, But Players Experience Aesthetics
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-5 space-y-2">
            <div className="text-xs font-mono text-indigo-400 font-bold">STAGE 1: MECHANICS (M)</div>
            <div className="text-lg font-bold text-white">Source Code & Formal Rules</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The exact structs, state variables, transitions, and algorithms you write in TypeScript/C++.
              <em> Example:</em> <code>hp -= 15</code> when casting a spell; <code>hp += 20</code> on melee strike.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-bold">STAGE 2: DYNAMICS (D)</div>
            <div className="text-lg font-bold text-white">Emergent Runtime Execution</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              How the Mechanics behave at runtime when coupled with a human optimizer. You do not directly code Dynamics; they <strong>emerge</strong> from rule interactions (e.g., aggressive close-range play when low HP).
            </p>
          </div>

          <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-5 space-y-2">
            <div className="text-xs font-mono text-purple-400 font-bold">STAGE 3: AESTHETICS (A)</div>
            <div className="text-lg font-bold text-white">Neurobiological Output ("Fun")</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Not "pixel art vs. 3D"—in MDA, Aesthetics means the <strong>emotional & cognitive state</strong> evoked in the player: <em>Sensation, Challenge, Discovery, Expression, Fellowship, Narrative, Submission</em>.
            </p>
          </div>
        </div>

        {/* Interactive Diagram 1: Live MDA Rule Mutator */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400">Interactive Diagram 1.1</span>
              <h3 className="text-lg font-bold text-white">Bidirectional MDA Compiler Simulator</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Toggle low-level code rules (M) to observe emergent behavior (D) and Aesthetic shifts (A)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Mechanics Toggles */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                1. Author Mechanics (Code Rules):
              </div>
              {MDA_RULES.map((rule) => {
                const active = !!activeRules[rule.id];
                return (
                  <div
                    key={rule.id}
                    onClick={() => toggleRule(rule.id)}
                    className={`rounded-xl border p-4 transition cursor-pointer ${
                      active
                        ? 'border-cyan-500/60 bg-cyan-950/25'
                        : 'border-slate-800 bg-slate-950/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-white">{rule.name}</span>
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                          active ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {active ? 'ENABLED' : 'DISABLED'}
                      </span>
                    </div>
                    <pre className="mt-2 rounded bg-slate-950 px-3 py-1.5 text-xs font-mono text-indigo-300 overflow-x-auto border border-slate-800/80">
                      {rule.codeRule}
                    </pre>
                    {active && (
                      <p className="mt-2 text-xs text-cyan-200/90 leading-relaxed">
                        <strong className="text-cyan-400 font-mono">→ Emergent Dynamic (D):</strong> {rule.dynamicEffect}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Resulting Aesthetics Bars */}
            <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono uppercase text-purple-400">
                  2. Resulting Aesthetics Profile (Player UX)
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Notice how enabling conflicting mechanics (e.g., <em>Corpse Recovery</em> + <em>Zen Magnet</em>) creates muddled aesthetics. Great games target 2–3 sharp aesthetic peaks.
                </p>
              </div>

              <div className="space-y-3.5 py-2">
                {[
                  { label: 'Challenge (Mastery & Skill Test)', val: aesthetics.challenge, color: 'bg-rose-500' },
                  { label: 'Tension (High-Stakes Adrenaline)', val: aesthetics.tension, color: 'bg-amber-500' },
                  { label: 'Sensation (Visceral Kinetic Pleasure)', val: aesthetics.sensation, color: 'bg-cyan-400' },
                  { label: 'Expression (Creative Playstyle)', val: aesthetics.expression, color: 'bg-indigo-400' },
                  { label: 'Discovery (Systemic Exploration)', val: aesthetics.discovery, color: 'bg-emerald-400' },
                  { label: 'Submission (Relaxed Abiding Flow / Zen)', val: aesthetics.submission, color: 'bg-purple-400' },
                ].map((bar) => (
                  <div key={bar.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">{bar.label}</span>
                      <span className="text-white font-bold">{bar.val}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full ${bar.color} transition-all duration-300`}
                        style={{ width: `${bar.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 text-xs text-slate-300">
                <strong className="text-white font-mono">Designer Inversion Rule:</strong> When playtesters say <em>"Your game feels slow"</em> (Aesthetic symptom), don't just increase movement speed—inspect the Dynamic loop forcing them to play defensively.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Information Theory of Fun & Sawtooth Flow */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <Activity className="h-4 w-4" />
          <span>1.2 Information Theory & Cybernetics — Raph Koster (2004) & Csikszentmihalyi</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Fun as Shannon Entropy Reduction ($\Delta H / \Delta t$) and The Sawtooth Flow Trajectory
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          In <em>A Theory of Fun for Game Design</em>, Raph Koster asks why humans play at all. From an evolutionary and information-theoretic perspective, the human brain is a <strong className="text-white">lossy pattern-compression engine</strong>. When you encounter a novel system with hidden regularity, your brain releases dopamine as you compress its high-entropy state observations into a predictive mental model:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-1.5">
            <div className="text-rose-400 font-bold">CASE 1: UNCOMPRESSIBLE NOISE</div>
            <div className="text-white text-sm">dH/dt ≈ 0 (H remains maximal)</div>
            <p className="text-slate-300 font-sans">
              If enemy attacks have zero telegraphs or pure random outcomes, the brain cannot extract a pattern. Result: <strong>Anxiety & Frustration</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-1.5">
            <div className="text-emerald-400 font-bold">CASE 2: OPTIMAL COMPRESSION</div>
            <div className="text-white text-sm">dH/dt &lt; 0 (Steady Pattern Chunking)</div>
            <p className="text-slate-300 font-sans">
              The player discovers how mechanics compose (e.g., dashing cancels recovery frames). Result: <strong>Dopamine & Flow State</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 space-y-1.5">
            <div className="text-slate-400 font-bold">CASE 3: ZERO REMAINING ENTROPY</div>
            <div className="text-white text-sm">H(System | Model) = 0</div>
            <p className="text-slate-300 font-sans">
              Once a CS grad derives the minimax tree of Tic-Tac-Toe, prediction is 100%. The game is "solved." Result: <strong>Immediate Boredom</strong>.
            </p>
          </div>
        </div>

        {/* Interactive Diagram 1.2: Phase Portrait of Flow */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400">Interactive Diagram 1.2</span>
              <h3 className="text-lg font-bold text-white">Sawtooth Pacing & Flow Channel Phase Portrait</h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              Time in Flow Zone: {flowPercentage}%
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <svg viewBox="0 0 540 300" className="w-full h-auto">
                {/* Anxiety & Boredom Zones */}
                <polygon points="60,260 60,30 340,30" fill="rgba(244, 63, 94, 0.12)" />
                <polygon points="60,260 500,260 500,130" fill="rgba(148, 163, 184, 0.10)" />

                {/* Diagonal Flow Corridor */}
                <polygon points="60,260 60,210 440,30 500,30 500,85 120,260" fill="rgba(16, 185, 129, 0.16)" stroke="rgba(16, 185, 129, 0.35)" strokeDasharray="4 4" />

                {/* Axes */}
                <line x1="60" y1="260" x2="510" y2="260" stroke="#64748b" strokeWidth="2" />
                <line x1="60" y1="260" x2="60" y2="25" stroke="#64748b" strokeWidth="2" />

                <text x="285" y="290" fill="#cbd5e1" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">
                  Player Skill / Pattern Compression Over Time →
                </text>
                <text x="20" y="145" fill="#cbd5e1" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle" transform="rotate(-90 20 145)">
                  Systemic Challenge →
                </text>

                <text x="145" y="75" fill="#fda4af" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                  ANXIETY ZONE (Entropy Overload)
                </text>
                <text x="365" y="235" fill="#94a3b8" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                  BOREDOM ZONE (Solved State)
                </text>
                <text x="275" y="142" fill="#6ee7b7" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold" transform="rotate(-26 275 142)">
                  FLOW CHANNEL (Sawtooth Pacing)
                </text>

                {/* Dynamic Trajectory Curve */}
                <path d={flowPoints.join(' ')} fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs text-slate-300 leading-relaxed">
                Great pacing is never a flat diagonal line—it is a <strong className="text-cyan-300">sawtooth wave</strong>. Whenever the player learns a new mechanic, difficulty briefly spikes (Boss test), then drops when they unlock a new ability (Empowerment valley), oscillating inside the Flow corridor.
              </p>

              <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Challenge Escalation Slope (m)</span>
                    <span className="text-cyan-400">{challengeSlope.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.8"
                    step="0.05"
                    value={challengeSlope}
                    onChange={(e) => setChallengeSlope(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Sawtooth Boss/Rest Amplitude (A)</span>
                    <span className="text-cyan-400">{difficultyWaveAmp.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="0.45"
                    step="0.02"
                    value={difficultyWaveAmp}
                    onChange={(e) => setDifficultyWaveAmp(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Player Onboarding Clarity (k_learn)</span>
                    <span className="text-cyan-400">{skillLearnRate.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.3"
                    step="0.05"
                    value={skillLearnRate}
                    onChange={(e) => setSkillLearnRate(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playable Lab 1: Make the Toy Fun Before the Goal Exists */}
      <section className="rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Playable Engineering Lab 01 • "Find the Fun in the Toy First"</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              The Kinetic Juggle Sandbox (Zero Score Needed)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2 text-xs font-mono">
              Current Juggle: <strong className="text-cyan-400 text-sm">{juggleStreak}</strong> • Best: <strong className="text-emerald-400 text-sm">{bestStreak}</strong>
            </div>
            {isLabDone ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-mono font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" /> Lab Goal Met (8+ Juggles)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 text-xs font-mono text-amber-300">
                Goal: Tune rules & reach 8 juggles
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Shigeru Miyamoto spent months tuning Mario jumping and running in an empty white room before designing World 1-1.
          Move your mouse (or use <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">A</kbd> / <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">D</kbd>) inside the canvas below. Compare the <strong>"Naive Engineer Preset"</strong> (constant linear reflection, zero gravity, zero hitstop) with the <strong>"High-Octane Arcade Toy"</strong>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Canvas */}
          <div className="lg:col-span-7 space-y-3">
            <canvas
              ref={canvasRef}
              width={560}
              height={360}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 cursor-ew-resize shadow-inner"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyToyPreset('cardboard')}
                className="rounded-lg border border-slate-700 bg-slate-800/90 hover:bg-slate-700 px-3 py-1.5 text-xs font-mono text-slate-300 cursor-pointer"
              >
                1. Naive CS Implementation (Cardboard)
              </button>
              <button
                onClick={() => applyToyPreset('zen')}
                className="rounded-lg border border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/50 px-3 py-1.5 text-xs font-mono text-purple-200 cursor-pointer"
              >
                2. Target Aesthetic: Zen / Submission
              </button>
              <button
                onClick={() => applyToyPreset('arcade')}
                className="rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/50 px-3 py-1.5 text-xs font-mono text-cyan-200 cursor-pointer"
              >
                3. Target Aesthetic: High-Octane Challenge
              </button>
            </div>
          </div>

          {/* Live Rule Inspector */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 border-b border-slate-800 pb-2.5">
              <Sliders className="h-4 w-4" />
              <span>Real-Time Toy Parameter Inspector</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Gravitational Pull (g_y)</span>
                <span className="text-cyan-400">{gravityY.toFixed(2)} px/frame²</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.4"
                step="0.02"
                value={gravityY}
                onChange={(e) => setGravityY(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <p className="text-[11px] text-slate-400 mt-0.5">
                Zero gravity makes bounces predictable linear lines; parabolic arcs force spatial anticipation.
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Bounce Restitution Multiplier</span>
                <span className="text-cyan-400">{bounceSpeedMult.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.90"
                max="1.20"
                step="0.02"
                value={bounceSpeedMult}
                onChange={(e) => setBounceSpeedMult(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Paddle Momentum Transfer (Spin)</span>
                <span className="text-cyan-400">{Math.round(paddleTransfer * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.9"
                step="0.05"
                value={paddleTransfer}
                onChange={(e) => setPaddleTransfer(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <p className="text-[11px] text-slate-400 mt-0.5">
                Allows the player to "slice" the ball by flicking the paddle at impact (Expression aesthetic).
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Impact Hitstop Freeze Frames</span>
                <span className="text-cyan-400">{hitstopFrames} frames ({Math.round(hitstopFrames * 16.6)}ms)</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={hitstopFrames}
                onChange={(e) => setHitstopFrames(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-300">Multi-Ball Split Every 4 Hits</span>
              <input
                type="checkbox"
                checked={multiBallSplit}
                onChange={(e) => setMultiBallSplit(e.target.checked)}
                className="h-4 w-4 accent-cyan-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300">Squash, Glow & Particle Trails</span>
              <input
                type="checkbox"
                checked={trailParticles}
                onChange={(e) => setTrailParticles(e.target.checked)}
                className="h-4 w-4 accent-cyan-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Module Footer Navigation */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              courseAudio.playSuccess();
              onCompleteModule();
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition cursor-pointer ${
              isModuleDone
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isModuleDone ? 'Module 01 Completed' : 'Mark Module 01 Theory Complete'}</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('module-2')}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition cursor-pointer"
        >
          <span>Next: Module 02 (The Physics of Virtual Sensation & 3Cs)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
