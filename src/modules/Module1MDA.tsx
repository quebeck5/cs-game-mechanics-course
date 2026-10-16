import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import {
  CheckCircle2,
  ArrowRight,
  Sliders,
  Layers,
  Activity,
  Sparkles
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

  const toggleRule = (ruleId: string) => {
    courseAudio.playBlip();
    setActiveRules((prev) => ({
      ...prev,
      [ruleId]: !prev[ruleId],
    }));
  };

  // Compute aggregated aesthetics profile (0..100)
  const aesthetics = {
    sensation: 30,
    challenge: 30,
    discovery: 20,
    expression: 25,
    submission: 20,
    tension: 25,
  };

  MDA_RULES.forEach((rule) => {
    if (activeRules[rule.id]) {
      aesthetics.sensation = Math.min(100, Math.max(0, aesthetics.sensation + rule.aestheticsDelta.sensation));
      aesthetics.challenge = Math.min(100, Math.max(0, aesthetics.challenge + rule.aestheticsDelta.challenge));
      aesthetics.discovery = Math.min(100, Math.max(0, aesthetics.discovery + rule.aestheticsDelta.discovery));
      aesthetics.expression = Math.min(100, Math.max(0, aesthetics.expression + rule.aestheticsDelta.expression));
      aesthetics.submission = Math.min(100, Math.max(0, aesthetics.submission + rule.aestheticsDelta.submission));
      aesthetics.tension = Math.min(100, Math.max(0, aesthetics.tension + rule.aestheticsDelta.tension));
    }
  });

  const applyToyPreset = (preset: 'cardboard' | 'zen' | 'arcade') => {
    courseAudio.playBlip();
    if (preset === 'cardboard') {
      setGravityY(0.0);
      setBounceSpeedMult(1.0);
      setPaddleTransfer(0.0);
      setHitstopFrames(0);
      setTrailParticles(false);
      setMultiBallSplit(false);
    } else if (preset === 'zen') {
      setGravityY(0.08);
      setBounceSpeedMult(0.98);
      setPaddleTransfer(0.2);
      setHitstopFrames(2);
      setTrailParticles(true);
      setMultiBallSplit(false);
    } else if (preset === 'arcade') {
      setGravityY(0.22);
      setBounceSpeedMult(1.1);
      setPaddleTransfer(0.65);
      setHitstopFrames(5);
      setTrailParticles(true);
      setMultiBallSplit(true);
    }
  };

  // Canvas Sandbox Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let paddleX = canvas.width / 2;
    let paddleVx = 0;
    let lastMouseX = paddleX;
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
        y: 80,
        vx: 3.2,
        vy: 2.5,
        radius: 11,
        hue: 215,
        scaleX: 1,
        scaleY: 1,
      },
    ];

    const particles: Particle[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentMouseX = ((e.clientX - rect.left) / rect.width) * canvas.width;
      paddleVx = (currentMouseX - lastMouseX) * 0.45;
      paddleX = Math.max(56, Math.min(canvas.width - 56, currentMouseX));
      lastMouseX = currentMouseX;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        paddleX = Math.max(56, paddleX - 28);
        paddleVx = -8;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        paddleX = Math.min(canvas.width - 56, paddleX + 28);
        paddleVx = 8;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    const render = () => {
      if (freezeCounter > 0) {
        freezeCounter--;
        animId = requestAnimationFrame(render);
        return;
      }

      paddleVx *= 0.85;
      shakeMag *= 0.85;

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) particles.splice(i, 1);
      }

      // Update balls
      balls.forEach((b) => {
        b.vy += gravityY;
        b.x += b.vx;
        b.y += b.vy;

        b.scaleX += (1 - b.scaleX) * 0.2;
        b.scaleY += (1 - b.scaleY) * 0.2;

        if (trailParticles && Math.random() < 0.65) {
          particles.push({
            x: b.x,
            y: b.y,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            life: 18,
            maxLife: 18,
            color: `hsla(${b.hue}, 80%, 40%, 0.4)`,
            size: b.radius * 0.5,
          });
        }

        // Wall collisions
        if (b.x - b.radius < 12) {
          b.x = 12 + b.radius;
          b.vx = Math.abs(b.vx);
          b.scaleX = 0.7;
          b.scaleY = 1.3;
        } else if (b.x + b.radius > canvas.width - 12) {
          b.x = canvas.width - 12 - b.radius;
          b.vx = -Math.abs(b.vx);
          b.scaleX = 0.7;
          b.scaleY = 1.3;
        }

        // Ceiling collision
        if (b.y - b.radius < 12) {
          b.y = 12 + b.radius;
          b.vy = Math.abs(b.vy);
          b.scaleX = 1.3;
          b.scaleY = 0.7;
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
          const hitOffset = (b.x - paddleX) / paddleHalfW;
          const currentSpeed = Math.hypot(b.vx, b.vy);
          const nextSpeed = Math.min(13.5, Math.max(4.5, currentSpeed * bounceSpeedMult));

          b.vy = -Math.max(4.2, Math.abs(b.vy) * bounceSpeedMult);
          b.vx = b.vx * 0.75 + hitOffset * nextSpeed * 0.55 + paddleVx * paddleTransfer;
          b.hue = (b.hue + 28) % 360;
          b.scaleX = 1.45;
          b.scaleY = 0.65;

          freezeCounter = hitstopFrames;
          shakeMag = hitstopFrames > 0 ? Math.min(6, hitstopFrames * 1.2) : 0;

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

          if (trailParticles) {
            for (let i = 0; i < 10; i++) {
              const angle = -Math.PI * Math.random();
              const spd = 1.5 + Math.random() * 4.0;
              particles.push({
                x: b.x,
                y: paddleY - 6,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                life: 20,
                maxLife: 20,
                color: `hsla(${b.hue}, 80%, 45%, 0.7)`,
                size: 3.0,
              });
            }
          }

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
            hue: 215,
            scaleX: 1,
            scaleY: 1,
          },
        ];
      } else {
        balls = surviving;
      }

      // Drawing - Light documentation canvas
      const sx = (Math.random() - 0.5) * shakeMag * 2;
      const sy = (Math.random() - 0.5) * shakeMag * 2;

      ctx.save();
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.translate(sx, sy);

      // Subtle drafting grid
      ctx.strokeStyle = '#e2e8f0';
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

      // Outer boundary wall
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

      // Particles
      particles.forEach((p) => {
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Paddle
      const paddleY = canvas.height - 34;
      ctx.save();
      ctx.translate(paddleX, paddleY);
      ctx.rotate(Math.max(-0.18, Math.min(0.18, paddleVx * 0.008 * paddleTransfer)));
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.roundRect(-54, -7, 108, 14, 4);
      ctx.fill();
      ctx.restore();

      // Balls
      balls.forEach((b) => {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.scale(b.scaleX, b.scaleY);
        ctx.fillStyle = `hsl(${b.hue}, 85%, 45%)`;
        ctx.beginPath();
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
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
    const t = i / 40;
    const skill = Math.min(1, Math.pow(t, 0.85) * skillLearnRate);
    const wave = Math.sin(t * Math.PI * 6) * difficultyWaveAmp * (0.3 + 0.7 * t);
    const challenge = Math.max(0.05, Math.min(1.15, t * challengeSlope + wave));

    const x = 60 + skill * 440;
    const y = 260 - Math.min(1.05, challenge) * 220;
    flowPoints.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);

    if (Math.abs(challenge - skill) <= 0.22) {
      inFlowCount++;
    }
  }
  const flowPercentage = Math.round((inFlowCount / 41) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Module Header */}
      <header className="border-b border-zinc-200 pb-5 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-mono font-bold text-blue-700">
            MODULE 01 • ESTIMATED STUDY TIME: 2.0 HOURS
          </span>
          <span className="text-xs font-mono text-zinc-500">
            Foundations: Hunicke/LeBlanc/Zubek (MDA), Raph Koster, Bernard Suits
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
          Deconstructing "Fun": The MDA Framework, Shannon Entropy &amp; The Toy Principle
        </h1>
        <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
          To a software engineer trained on algorithmic efficiency, "fun" can appear dangerously subjective—like an unquantifiable magic constant.
          This module replaces informal intuition with three formal frameworks: the <strong>MDA Bidirectional Pipeline</strong>, <strong>Raph Koster’s Information Theory of Fun</strong>, and <strong>Sawtooth Flow Phase Portraits</strong>.
        </p>
      </header>

      {/* Comprehensive Academic Textbook Chapter */}
      <section>
        <Module1Content />
      </section>

      {/* Section 1: The MDA Framework */}
      <section className="space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Layers className="h-4 w-4" />
            <span>1.1 Formal Architecture — Hunicke, LeBlanc &amp; Zubek (2004)</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-950 mt-1">
            The MDA Framework: Decoupling Rules, Runtime Dynamics, and Player Aesthetics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-2">
            <div className="text-xs font-mono text-blue-700 font-bold">STAGE 1: MECHANICS (M)</div>
            <div className="text-sm font-bold text-zinc-950">Source Code &amp; Formal Rules</div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              The exact structs, state variables, transitions, and algorithms you write in code.
              <em> Example:</em> <code>hp -= 15</code> when casting a spell; <code>hp += 20</code> on melee strike.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-2">
            <div className="text-xs font-mono text-indigo-700 font-bold">STAGE 2: DYNAMICS (D)</div>
            <div className="text-sm font-bold text-zinc-950">Emergent Runtime Execution</div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              How the mechanics behave at runtime when coupled with a human optimizer. You do not directly author dynamics; they <strong>emerge</strong> from rule interactions (e.g., aggressive close-range play when low on HP).
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-2">
            <div className="text-xs font-mono text-violet-700 font-bold">STAGE 3: AESTHETICS (A)</div>
            <div className="text-sm font-bold text-zinc-950">Neurobiological Experience ("Fun")</div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              In MDA, aesthetics refers to the <strong>cognitive and emotional taxonomy</strong> evoked in the player: <em>Challenge, Sensation, Discovery, Expression, Submission, Tension</em>.
            </p>
          </div>
        </div>

        {/* Interactive Diagram 1.1: Live MDA Rule Mutator */}
        <div className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-blue-700 font-semibold">Interactive Figure 1.1</span>
              <h3 className="text-base font-bold text-zinc-950">Bidirectional MDA Compiler Simulator</h3>
            </div>
            <span className="text-xs text-zinc-500">
              Toggle low-level code rules (M) to observe emergent dynamic loops (D) and aesthetic profile shifts (A)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Mechanics Toggles */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono uppercase text-zinc-500 font-semibold">
                1. Author Mechanics (Code Rules):
              </div>
              {MDA_RULES.map((rule) => {
                const active = !!activeRules[rule.id];
                return (
                  <div
                    key={rule.id}
                    onClick={() => toggleRule(rule.id)}
                    className={`rounded-lg border p-3.5 transition cursor-pointer ${
                      active
                        ? 'border-blue-600 bg-blue-50/50'
                        : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs sm:text-sm text-zinc-950">{rule.name}</span>
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                          active ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-700'
                        }`}
                      >
                        {active ? 'ENABLED' : 'DISABLED'}
                      </span>
                    </div>
                    <pre className="mt-2 rounded bg-zinc-100 px-3 py-1.5 text-xs font-mono text-zinc-900 overflow-x-auto border border-zinc-200">
                      {rule.codeRule}
                    </pre>
                    {active && (
                      <p className="mt-2 text-xs text-blue-900 leading-relaxed">
                        <strong className="text-blue-700 font-mono">&rarr; Emergent Dynamic (D):</strong> {rule.dynamicEffect}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Resulting Aesthetics Bars */}
            <div className="lg:col-span-5 border border-zinc-200 bg-zinc-50 rounded-lg p-4 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono uppercase font-bold text-zinc-700">
                  2. Resulting Aesthetics Profile (Player Experience)
                </div>
                <p className="text-xs text-zinc-600 mt-1">
                  Enabling conflicting mechanics (e.g., <em>Corpse Recovery</em> + <em>Zen Magnet</em>) creates muddled aesthetics. Cohesive games target 2&ndash;3 pronounced aesthetic peaks.
                </p>
              </div>

              <div className="space-y-3 py-1">
                {[
                  { label: 'Challenge (Mastery & Skill Test)', val: aesthetics.challenge, color: 'bg-rose-600' },
                  { label: 'Tension (High-Stakes Adrenaline)', val: aesthetics.tension, color: 'bg-amber-600' },
                  { label: 'Sensation (Visceral Kinetic Pleasure)', val: aesthetics.sensation, color: 'bg-blue-600' },
                  { label: 'Expression (Creative Playstyle)', val: aesthetics.expression, color: 'bg-indigo-600' },
                  { label: 'Discovery (Systemic Exploration)', val: aesthetics.discovery, color: 'bg-emerald-600' },
                  { label: 'Submission (Relaxed Flow State)', val: aesthetics.submission, color: 'bg-purple-600' },
                ].map((bar) => (
                  <div key={bar.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-700">{bar.label}</span>
                      <span className="text-zinc-950 font-bold">{bar.val}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
                      <div
                        className={`h-full ${bar.color} transition-all duration-300`}
                        style={{ width: `${bar.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-zinc-200 p-3 rounded text-xs text-zinc-700">
                <strong className="text-zinc-950 font-mono">Engineering Diagnostic:</strong> When testers report <em>"Your game feels sluggish"</em> (an aesthetic symptom), do not simply increase character walk speed—inspect the runtime dynamic loops causing players to hold defensive postures.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Flow Channel Phase Portrait */}
      <section className="space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Activity className="h-4 w-4" />
            <span>1.2 Information Theory &amp; Flow Dynamics &mdash; Koster (2004) &amp; Csikszentmihalyi</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-950 mt-1">
            Sawtooth Flow Channel &amp; Entropy Reduction Phase Portraits
          </h2>
        </div>

        {/* Interactive Diagram 1.2 */}
        <div className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-blue-700 font-semibold">Interactive Figure 1.2</span>
              <h3 className="text-base font-bold text-zinc-950">Sawtooth Pacing &amp; Flow Channel Trajectory</h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-800 font-semibold">
              Time in Flow Corridor: {flowPercentage}%
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-7 border border-zinc-200 bg-zinc-50 rounded-lg p-4">
              <svg viewBox="0 0 540 300" className="w-full h-auto">
                {/* Anxiety & Boredom Zones */}
                <polygon points="60,260 60,30 340,30" fill="rgba(239, 68, 68, 0.08)" />
                <polygon points="60,260 500,260 500,130" fill="rgba(148, 163, 184, 0.12)" />

                {/* Diagonal Flow Corridor */}
                <polygon points="60,260 60,210 440,30 500,30 500,85 120,260" fill="rgba(37, 99, 235, 0.08)" stroke="rgba(37, 99, 235, 0.35)" strokeDasharray="4 4" />

                {/* Axes */}
                <line x1="60" y1="260" x2="510" y2="260" stroke="#94a3b8" strokeWidth="2" />
                <line x1="60" y1="260" x2="60" y2="25" stroke="#94a3b8" strokeWidth="2" />

                <text x="285" y="290" fill="#475569" fontSize="11" fontFamily="Segoe UI, system-ui" textAnchor="middle">
                  Player Skill / Pattern Compression Over Time &rarr;
                </text>
                <text x="20" y="145" fill="#475569" fontSize="11" fontFamily="Segoe UI, system-ui" textAnchor="middle" transform="rotate(-90 20 145)">
                  Systemic Challenge &rarr;
                </text>

                <text x="145" y="75" fill="#b91c1c" fontSize="11" fontFamily="Segoe UI, system-ui" fontWeight="bold">
                  ANXIETY ZONE (Entropy Overload)
                </text>
                <text x="365" y="235" fill="#64748b" fontSize="11" fontFamily="Segoe UI, system-ui" fontWeight="bold">
                  BOREDOM ZONE (Solved State)
                </text>
                <text x="275" y="142" fill="#1d4ed8" fontSize="11" fontFamily="Segoe UI, system-ui" fontWeight="bold" transform="rotate(-26 275 142)">
                  FLOW CHANNEL (Sawtooth Corridor)
                </text>

                {/* Dynamic Trajectory Curve */}
                <path d={flowPoints.join(' ')} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs text-zinc-700 leading-relaxed">
                Optimal pacing is rarely a straight line; it is an oscillatory <strong>sawtooth curve</strong>.
                When players encounter a new challenge or boss, difficulty spikes into the high-tension boundary. Upon mastering it or obtaining upgrades, difficulty drops into an empowerment valley before rising again.
              </p>

              <div className="space-y-3 bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-700">Escalation Slope (m)</span>
                    <span className="text-blue-700 font-bold">{challengeSlope.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.8"
                    step="0.05"
                    value={challengeSlope}
                    onChange={(e) => setChallengeSlope(parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-700">Sawtooth Oscillation Amplitude (A)</span>
                    <span className="text-blue-700 font-bold">{difficultyWaveAmp.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="0.45"
                    step="0.02"
                    value={difficultyWaveAmp}
                    onChange={(e) => setDifficultyWaveAmp(parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-700">Learning Rate (k_learn)</span>
                    <span className="text-blue-700 font-bold">{skillLearnRate.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.3"
                    step="0.05"
                    value={skillLearnRate}
                    onChange={(e) => setSkillLearnRate(parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playable Lab 1 */}
      <section className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-blue-700 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Laboratory 1.1 &bull; Hands-On Experiment</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-950 mt-0.5">
              The Kinetic Juggle Sandbox (Validating the Toy Before the Game)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="border border-zinc-200 bg-zinc-50 px-3 py-1.5 rounded text-xs font-mono">
              Current Streak: <strong className="text-blue-700">{juggleStreak}</strong> &bull; Best: <strong className="text-emerald-700">{bestStreak}</strong>
            </div>
            {isLabDone ? (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" /> Lab Goal Complete (8+ Juggles)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-300 px-3 py-1.5 text-xs font-mono text-amber-900">
                Goal: Tune mechanics &amp; achieve 8 juggles
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-zinc-700 leading-relaxed">
          Move your cursor inside the canvas below (or use <kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">A</kbd> / <kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">D</kbd> keys).
          Compare the <strong>"Naive CS Implementation"</strong> (constant reflection, zero gravity, zero hitstop) against the <strong>"High-Kinetic Arcade Toy"</strong>. Notice how tactile satisfaction is achieved before points or objectives are introduced.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Canvas */}
          <div className="lg:col-span-7 space-y-3">
            <canvas
              ref={canvasRef}
              width={560}
              height={360}
              className="w-full rounded border border-zinc-300 bg-zinc-50 cursor-ew-resize shadow-sm"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyToyPreset('cardboard')}
                className="rounded border border-zinc-300 bg-white hover:bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-800 shadow-sm cursor-pointer"
              >
                1. Naive Implementation (Cardboard)
              </button>
              <button
                onClick={() => applyToyPreset('zen')}
                className="rounded border border-zinc-300 bg-white hover:bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-800 shadow-sm cursor-pointer"
              >
                2. Target Aesthetic: Zen / Flow
              </button>
              <button
                onClick={() => applyToyPreset('arcade')}
                className="rounded border border-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-800 shadow-sm cursor-pointer"
              >
                3. Target Aesthetic: High-Kinetic Challenge
              </button>
            </div>
          </div>

          {/* Live Parameter Inspector */}
          <div className="lg:col-span-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-blue-700 font-bold border-b border-zinc-200 pb-2">
              <Sliders className="h-3.5 w-3.5" />
              <span>Real-Time Parameter Inspector</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Gravitational Acceleration (g_y)</span>
                <span className="text-blue-700 font-bold">{gravityY.toFixed(2)} px/frame&sup2;</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.4"
                step="0.02"
                value={gravityY}
                onChange={(e) => setGravityY(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Zero gravity produces linear trajectories; parabolic curves demand spatial anticipation.
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Restitution Multiplier</span>
                <span className="text-blue-700 font-bold">{bounceSpeedMult.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.90"
                max="1.20"
                step="0.02"
                value={bounceSpeedMult}
                onChange={(e) => setBounceSpeedMult(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Paddle Momentum Transfer</span>
                <span className="text-blue-700 font-bold">{Math.round(paddleTransfer * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.9"
                step="0.05"
                value={paddleTransfer}
                onChange={(e) => setPaddleTransfer(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Allows the player to "slice" the projectile by flicking the paddle during contact.
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Hitstop Freeze Window</span>
                <span className="text-blue-700 font-bold">{hitstopFrames} frames ({Math.round(hitstopFrames * 16.6)}ms)</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={hitstopFrames}
                onChange={(e) => setHitstopFrames(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
              <span className="text-xs font-mono text-zinc-700">Multi-Ball Split (Every 4 Hits)</span>
              <input
                type="checkbox"
                checked={multiBallSplit}
                onChange={(e) => setMultiBallSplit(e.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-700">Deformation &amp; Particle Trails</span>
              <input
                type="checkbox"
                checked={trailParticles}
                onChange={(e) => setTrailParticles(e.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Module Footer Navigation */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 pt-6 mt-6">
        <button
          onClick={() => {
            courseAudio.playSuccess();
            onCompleteModule();
          }}
          className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold transition cursor-pointer ${
            isModuleDone
              ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
              : 'bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{isModuleDone ? 'Module 01 Complete' : 'Mark Module 01 Theory Complete'}</span>
        </button>

        <button
          onClick={() => onNavigate('module-2')}
          className="inline-flex items-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition cursor-pointer"
        >
          <span>Next: Module 02 (The Physics of Virtual Sensation &amp; 3Cs)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
