import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import {
  Activity,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Sliders,
  Eye,
  Clock,
  Zap
} from 'lucide-react';

interface Module2Props {
  onNavigate: (page: PageId) => void;
  onCompleteModule: () => void;
  onCompleteLab: () => void;
  isModuleDone: boolean;
  isLabDone: boolean;
}

export const Module2GameFeel: React.FC<Module2Props> = ({
  onNavigate,
  onCompleteModule,
  onCompleteLab,
  isModuleDone,
  isLabDone,
}) => {
  // Interactive Diagram 2.1: Jump Trajectory & ADSR Math State
  const [jumpHeightPx, setJumpHeightPx] = useState<number>(115);
  const [timeToPeakSec, setTimeToPeakSec] = useState<number>(0.36);
  const [fallGravityMult, setFallGravityMult] = useState<number>(2.4);
  const [apexHangBoost, setApexHangBoost] = useState<boolean>(true);
  const [attackMs, setAttackMs] = useState<number>(75);
  const [releaseMs, setReleaseMs] = useState<number>(60);

  // Interactive Diagram 2.2: Coyote & Input Buffer Scrubber
  const [coyoteFrames, setCoyoteFrames] = useState<number>(6); // 100ms at 60fps
  const [bufferFrames, setBufferFrames] = useState<number>(6); // 100ms at 60fps
  const [playerPressFrame, setPlayerPressFrame] = useState<number>(15); // Ledge leaves at frame 12, lands at frame 32

  // Playable Lab 2: Platformer Feel Surgery
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [feelMode, setFeelMode] = useState<'naive' | 'celeste'>('celeste');
  const [xrayDebug, setXrayDebug] = useState<boolean>(true);
  const [gemsCollected, setGemsCollected] = useState<number>(0);

  // Derived kinematic values
  const gRise = (2 * jumpHeightPx) / Math.pow(timeToPeakSec, 2);
  const v0 = (2 * jumpHeightPx) / timeToPeakSec;
  const gFall = gRise * fallGravityMult;

  // Compute SVG Jump Trajectory Points (Piecewise vs Naive Newtonian)
  const naiveJumpPoints: string[] = [];
  const tunedJumpPoints: string[] = [];

  for (let step = 0; step <= 60; step++) {
    const t = (step / 60) * (timeToPeakSec * 2.1);
    // Naive symmetric parabola
    const yNaive = Math.max(0, v0 * t - 0.5 * gRise * t * t);
    const sx = 50 + (step / 60) * 440;
    const syNaive = 210 - (yNaive / 150) * 165;
    naiveJumpPoints.push(`${step === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${syNaive.toFixed(1)}`);
  }

  // Numerical integration for piecewise tuned jump
  let simY = 0;
  let simVy = v0;
  const dt = (timeToPeakSec * 2.1) / 60;
  for (let step = 0; step <= 60; step++) {
    const sx = 50 + (step / 60) * 440;
    const syTuned = 210 - (Math.max(0, simY) / 150) * 165;
    tunedJumpPoints.push(`${step === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${syTuned.toFixed(1)}`);

    let currentG = simVy >= 0 ? gRise : gFall;
    if (apexHangBoost && Math.abs(simVy) < v0 * 0.22) {
      currentG *= 0.45; // Apex anti-gravity hang
    }
    simVy -= currentG * dt;
    simY = Math.max(0, simY + simVy * dt);
  }

  // Evaluate Coyote/Buffer timeline outcome
  // Frame 0..12: Grounded on Ledge A
  // Frame 13..31: Airborne across gap
  // Frame 32..45: Grounded on Ledge B
  const isStrictJumpSuccess = playerPressFrame <= 12 || playerPressFrame >= 32;
  const isCoyoteJumpSuccess = playerPressFrame > 12 && playerPressFrame <= 12 + coyoteFrames;
  const isBufferJumpSuccess = playerPressFrame < 32 && playerPressFrame >= 32 - bufferFrames;

  // Lab 2 Platformer Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const keys: Record<string, boolean> = {};

    // Player state
    let px = 65;
    let py = 240;
    let vx = 0;
    let vy = 0;
    let isGrounded = false;
    let coyoteTimer = 0;
    let jumpBufferTimer = 0;
    let scaleX = 1;
    let scaleY = 1;
    let camX = 65;
    let camY = 180;
    let shake = 0;
    let hitstop = 0;
    let score = 0;

    interface Platform {
      x: number;
      y: number;
      w: number;
      h: number;
    }

    const platforms: Platform[] = [
      { x: 20, y: 280, w: 130, h: 22 },
      { x: 195, y: 245, w: 95, h: 20 },
      { x: 335, y: 200, w: 95, h: 20 },
      { x: 185, y: 140, w: 105, h: 20 },
      { x: 360, y: 105, w: 150, h: 20 },
    ];

    interface Gem {
      x: number;
      y: number;
      collected: boolean;
      respawnTimer: number;
    }

    const gems: Gem[] = [
      { x: 242, y: 215, collected: false, respawnTimer: 0 },
      { x: 382, y: 170, collected: false, respawnTimer: 0 },
      { x: 237, y: 110, collected: false, respawnTimer: 0 },
      { x: 435, y: 75, collected: false, respawnTimer: 0 },
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        // Only prevent default if canvas is hovered or active
      }
      keys[e.key.toLowerCase()] = true;
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        jumpBufferTimer = feelMode === 'celeste' ? bufferFrames : 1;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        setFeelMode((prev) => (prev === 'celeste' ? 'naive' : 'celeste'));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const loop = () => {
      if (hitstop > 0) {
        hitstop--;
      } else {
        const left = keys['arrowleft'] || keys['a'];
        const right = keys['arrowright'] || keys['d'];
        const jumpHeld = keys[' '] || keys['arrowup'] || keys['w'];

        const maxSpeed = 4.4;
        const targetVx = (right ? 1 : 0) * maxSpeed - (left ? 1 : 0) * maxSpeed;

        if (feelMode === 'naive') {
          // Naive linear sluggish acceleration + slippery friction
          vx += (targetVx - vx) * 0.08;
        } else {
          // ADSR snappy attack & crisp release
          const rate = targetVx !== 0 ? Math.min(0.45, 16 / Math.max(16, attackMs)) : Math.min(0.5, 16 / Math.max(16, releaseMs));
          vx += (targetVx - vx) * rate;
        }

        // Coyote & Jump Buffer counters
        if (isGrounded) {
          coyoteTimer = feelMode === 'celeste' ? coyoteFrames : 0;
        } else if (coyoteTimer > 0) {
          coyoteTimer--;
        }

        if (jumpBufferTimer > 0) {
          jumpBufferTimer--;
        }

        // Execute Jump
        const canJump = isGrounded || coyoteTimer > 0;
        if (jumpBufferTimer > 0 && canJump) {
          const jumpV = feelMode === 'celeste' ? -8.8 : -7.6;
          vy = jumpV;
          isGrounded = false;
          coyoteTimer = 0;
          jumpBufferTimer = 0;
          if (feelMode === 'celeste') {
            scaleX = 0.68;
            scaleY = 1.38;
          }
          courseAudio.playJump(feelMode === 'celeste');
        }

        // Gravity calculation
        if (feelMode === 'naive') {
          vy += 0.34; // Constant floaty gravity
        } else {
          let g = vy < 0 ? 0.38 : 0.38 * fallGravityMult;
          // Variable jump height on early button release
          if (vy < 0 && !jumpHeld) {
            g *= 2.1;
          }
          // Apex hang time
          if (apexHangBoost && Math.abs(vy) < 1.35) {
            g *= 0.45;
          }
          vy = Math.min(10.5, vy + g);
        }

        px += vx;
        py += vy;

        // Keep within horizontal bounds
        if (px < 24) {
          px = 24;
          vx = 0;
        }
        if (px > canvas.width - 24) {
          px = canvas.width - 24;
          vx = 0;
        }

        // Fall pit respawn
        if (py > canvas.height + 40) {
          px = 65;
          py = 230;
          vx = 0;
          vy = 0;
        }

        // Platform collisions
        const wasGrounded = isGrounded;
        isGrounded = false;
        const pHalfW = 12;
        const pHalfH = 15;

        platforms.forEach((plat) => {
          // Corner correction on upward head bonk in Celeste mode
          if (
            feelMode === 'celeste' &&
            vy < 0 &&
            py - pHalfH <= plat.y + plat.h &&
            py - pHalfH >= plat.y &&
            px + pHalfW > plat.x &&
            px - pHalfW < plat.x + plat.w
          ) {
            // Check if clipping left or right corner by <= 7px
            if (px + pHalfW - plat.x <= 8) {
              px = plat.x - pHalfW - 1;
            } else if (plat.x + plat.w - (px - pHalfW) <= 8) {
              px = plat.x + plat.w + pHalfW + 1;
            }
          }

          // Landing on top of platform
          if (
            vy >= 0 &&
            py + pHalfH >= plat.y &&
            py + pHalfH - vy <= plat.y + 9 &&
            px + pHalfW > plat.x &&
            px - pHalfW < plat.x + plat.w
          ) {
            py = plat.y - pHalfH;
            vy = 0;
            isGrounded = true;
            if (!wasGrounded && feelMode === 'celeste') {
              scaleX = 1.35;
              scaleY = 0.7;
            }
          }
        });

        // Gem collection
        gems.forEach((g) => {
          if (g.collected) {
            g.respawnTimer--;
            if (g.respawnTimer <= 0) g.collected = false;
          } else {
            const dist = Math.hypot(px - g.x, py - g.y);
            if (dist < 22) {
              g.collected = true;
              g.respawnTimer = 210;
              score++;
              setGemsCollected((prev) => {
                const next = prev + 1;
                if (next >= 4 && !isLabDone) {
                  onCompleteLab();
                }
                return next;
              });
              if (feelMode === 'celeste') {
                hitstop = 4;
                shake = 6;
                scaleX = 1.4;
                scaleY = 1.4;
              }
              courseAudio.playHit(feelMode === 'celeste');
            }
          }
        });

        // Recover squash & stretch
        scaleX += (1 - scaleX) * 0.22;
        scaleY += (1 - scaleY) * 0.22;
      }

      // Camera damping & look-ahead
      if (feelMode === 'naive') {
        camX = px;
        camY = py;
      } else {
        const targetCamX = px + vx * 12;
        const targetCamY = py;
        camX += (targetCamX - camX) * 0.14;
        camY += (targetCamY - camY) * 0.1;
      }

      shake *= 0.82;
      const sx = (Math.random() - 0.5) * shake * 2;
      const sy = (Math.random() - 0.5) * shake * 2;

      // Render
      ctx.save();
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.translate(sx, sy);

      // Draw platforms
      platforms.forEach((plat) => {
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = feelMode === 'celeste' ? '#10b981' : '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(plat.x, plat.y, plat.w, plat.h, 5);
        ctx.fill();
        ctx.stroke();
      });

      // Draw Gems
      gems.forEach((g) => {
        if (!g.collected) {
          ctx.save();
          ctx.translate(g.x, g.y);
          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = feelMode === 'celeste' ? 12 : 0;
          ctx.beginPath();
          ctx.moveTo(0, -9);
          ctx.lineTo(8, 0);
          ctx.lineTo(0, 9);
          ctx.lineTo(-8, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });

      // Draw Player
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(scaleX, scaleY);
      ctx.fillStyle = feelMode === 'celeste' ? '#34d399' : '#94a3b8';
      ctx.beginPath();
      ctx.roundRect(-12, -15, 24, 30, 6);
      ctx.fill();
      // Eyes
      const eyeOffset = vx >= 0 ? 4 : -4;
      ctx.fillStyle = '#090d16';
      ctx.fillRect(eyeOffset - 2, -8, 4, 5);
      ctx.restore();

      // Engineer X-Ray Telemetry Overlay
      if (xrayDebug) {
        // Velocity Vector
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + vx * 7, py + vy * 5);
        ctx.stroke();

        // Camera Focus Crosshair
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(camX - 18, camY - 18, 36, 36);

        // Coyote & Buffer HUD Bars
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(14, 14, 195, 54);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(14, 14, 195, 54);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '11px JetBrains Mono';
        ctx.fillText(`MODE: ${feelMode.toUpperCase()}`, 24, 30);
        ctx.fillStyle = coyoteTimer > 0 ? '#34d399' : '#64748b';
        ctx.fillText(`COYOTE WINDOW: ${coyoteTimer}f`, 24, 46);
        ctx.fillStyle = jumpBufferTimer > 0 ? '#fbbf24' : '#64748b';
        ctx.fillText(`JUMP BUFFER:   ${jumpBufferTimer}f`, 24, 60);
      }

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [feelMode, xrayDebug, fallGravityMult, apexHangBoost, attackMs, releaseMs, coyoteFrames, bufferFrames, isLabDone, onCompleteLab]);

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1 text-xs font-mono font-bold text-white">
            MODULE 02 • HOURS 2:00 – 4:00
          </span>
          <span className="text-xs font-mono text-slate-400">
            Steve Swink (Game Feel) + Maddy Thorson (Celeste) + Control Theory
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Physics of Virtual Sensation: 3Cs, Piecewise Kinematics & Temporal Forgiveness
        </h1>
        <p className="text-slate-300 max-w-4xl leading-relaxed">
          When a CS graduate writes their first platformer or action game, they usually write <code className="text-emerald-300">velocity.y += 9.8 * dt</code> and <code className="text-emerald-300">if (isGrounded && keyPressed) jump()</code>.
          The result feels floaty, unresponsive, and frustrating. Here is the mathematical and biological reason why—and how to engineer sub-second sensation.
        </p>
      </header>

      {/* Section 2.1: The 240ms Human Processor Loop & Piecewise Jump Calculus */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <Clock className="h-4 w-4" />
          <span>2.1 Biological I/O Latency & Non-Newtonian Jump Kinematics</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Deriving Gravity from Spatial Metrics (H<sub>max</sub>, t<sub>peak</sub>) Instead of Arbitrary Forces
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          In Steve Swink’s <em>Game Feel</em>, the human player is modeled as a three-stage signal processor: <strong>Perceptual Processor (~100ms) → Cognitive Processor (~70ms) → Motor Processor (~70ms) = ~240ms total loop latency</strong>.
          Furthermore, real-world constant gravity (g = 9.8 m/s²) produces a symmetric parabola that spends too much time rising slowly and falls too gently.
          Instead of guessing force constants, game programmers parameterize jumps by <strong>desired level design height (H<sub>max</sub>)</strong> and <strong>time to apex (t<sub>peak</sub>)</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-1.5">
            <div className="text-emerald-400 font-bold">1. INITIAL JUMP VELOCITY (v₀)</div>
            <div className="text-base text-white font-bold">v₀ = (2 · H_max) / t_peak</div>
            <p className="text-slate-400 font-sans">
              Derived directly from integrating v(t) = v₀ − g·t where v(t<sub>peak</sub>) = 0. Current: <strong className="text-emerald-300">{Math.round(v0)} px/s</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-1.5">
            <div className="text-cyan-400 font-bold">2. RISING GRAVITY (g_rise)</div>
            <div className="text-base text-white font-bold">g_rise = (2 · H_max) / t_peak²</div>
            <p className="text-slate-400 font-sans">
              Guarantees the character reaches exact pixel height H<sub>max</sub> at exact time t<sub>peak</sub>. Current: <strong className="text-cyan-300">{Math.round(gRise)} px/s²</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-1.5">
            <div className="text-amber-400 font-bold">3. ASYMMETRIC FALL & APEX HANG</div>
            <div className="text-base text-white font-bold">g_fall = k · g_rise (k ≈ 2.4)</div>
            <p className="text-slate-400 font-sans">
              Multiplying gravity by 2.4× when v<sub>y</sub> &lt; 0 snaps the player briskly to the ground, while halving |g| when |v<sub>y</sub>| &lt; ε gives micro-control at the peak.
            </p>
          </div>
        </div>

        {/* Interactive Diagram 2.1: Live Jump Parabola & ADSR Oscilloscope */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400">Interactive Diagram 2.1</span>
              <h3 className="text-lg font-bold text-white">Piecewise Jump Trajectory vs. Naive Newtonian Parabola</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Compare dashed gray (Newtonian constant g) vs. solid emerald (Tuned Piecewise Curve)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <svg viewBox="0 0 530 245" className="w-full h-auto">
                {/* Grid lines */}
                <line x1="50" y1="210" x2="500" y2="210" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="210" x2="50" y2="25" stroke="#475569" strokeWidth="2" />

                {/* Target Height Guide */}
                <line
                  x1="50"
                  y1={210 - (jumpHeightPx / 150) * 165}
                  x2="500"
                  y2={210 - (jumpHeightPx / 150) * 165}
                  stroke="#1e293b"
                  strokeDasharray="4 4"
                />
                <text x="58" y={204 - (jumpHeightPx / 150) * 165} fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">
                  H_max = {jumpHeightPx}px
                </text>

                {/* Naive Curve */}
                <path d={naiveJumpPoints.join(' ')} fill="none" stroke="#64748b" strokeWidth="2.5" strokeDasharray="5 5" />

                {/* Tuned Piecewise Curve */}
                <path d={tunedJumpPoints.join(' ')} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

                {/* Labels */}
                <text x="370" y="50" fill="#10b981" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                  — Tuned Piecewise Jump (Snappy Descent + Apex Hang)
                </text>
                <text x="370" y="68" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono">
                  -- Naive Constant Gravity (Floaty Descent)
                </text>
              </svg>
            </div>

            <div className="lg:col-span-5 space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Desired Jump Height (H_max)</span>
                  <span className="text-emerald-400">{jumpHeightPx} px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  step="5"
                  value={jumpHeightPx}
                  onChange={(e) => setJumpHeightPx(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Time to Apex (t_peak)</span>
                  <span className="text-emerald-400">{timeToPeakSec.toFixed(2)} sec</span>
                </div>
                <input
                  type="range"
                  min="0.22"
                  max="0.60"
                  step="0.02"
                  value={timeToPeakSec}
                  onChange={(e) => setTimeToPeakSec(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Falling Gravity Multiplier (k_fall)</span>
                  <span className="text-emerald-400">{fallGravityMult.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="3.5"
                  step="0.1"
                  value={fallGravityMult}
                  onChange={(e) => setFallGravityMult(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-300">Apex Hang Time (|v_y| &lt; ε → 0.45g)</span>
                <input
                  type="checkbox"
                  checked={apexHangBoost}
                  onChange={(e) => setApexHangBoost(e.target.checked)}
                  className="h-4 w-4 accent-emerald-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2.2: Temporal Hysteresis — Coyote Time & Input Buffering */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
          <Zap className="h-4 w-4" />
          <span>2.2 State Machine Temporal Hysteresis</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Coyote Time & Input Ring Buffers: Forgiving Human Timing Errors
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Suppose a player runs toward a pit to jump at the last millisecond, or presses Jump 50ms <em>before</em> their feet touch the ground on landing.
          A strict FSM (<code className="text-rose-300">if (state === GROUNDED && input === JUMP_PRESSED)</code>) drops the input on the floor, making the player swear the keyboard broke.
          By adding two temporal hysteresis windows—<strong>Coyote Time</strong> (allowing jump for Δt ≈ 100ms after leaving a ledge) and <strong>Input Buffering</strong> (queuing a jump press for Δt ≈ 100ms until landing)—the controller feels responsive.
        </p>

        {/* Interactive Diagram 2.2: 60 FPS Logic Analyzer Timeline */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400">Interactive Diagram 2.2</span>
              <h3 className="text-lg font-bold text-white">60 FPS Frame-by-Frame Input Logic Analyzer</h3>
            </div>
            <div className="text-xs font-mono">
              {isStrictJumpSuccess ? (
                <span className="rounded bg-emerald-500/20 text-emerald-300 px-2.5 py-1 border border-emerald-500/40">
                  ✓ Jump Executes (On Solid Ground)
                </span>
              ) : isCoyoteJumpSuccess ? (
                <span className="rounded bg-cyan-500/20 text-cyan-300 px-2.5 py-1 border border-cyan-500/40">
                  ✓ Saved by COYOTE TIME ({playerPressFrame - 12} frames after ledge!)
                </span>
              ) : isBufferJumpSuccess ? (
                <span className="rounded bg-amber-500/20 text-amber-300 px-2.5 py-1 border border-amber-500/40">
                  ✓ Saved by INPUT BUFFER ({32 - playerPressFrame} frames before landing!)
                </span>
              ) : (
                <span className="rounded bg-rose-500/20 text-rose-300 px-2.5 py-1 border border-rose-500/40">
                  ✗ Input Dropped (Mid-Air Deadzone — Player Dies!)
                </span>
              )}
            </div>
          </div>

          {/* Frame Timeline SVG */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
            <svg viewBox="0 0 760 150" className="w-full min-w-[620px] h-auto">
              {/* Ground Ledge A (Frames 0 to 12) */}
              <rect x="30" y="35" width={12 * 15} height="28" rx="4" fill="#065f46" stroke="#10b981" />
              <text x="120" y="53" fill="#ecfdf5" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
                LEDGE A (Grounded 0..12)
              </text>

              {/* Coyote Window (Frames 12 to 12 + coyoteFrames) */}
              <rect
                x={30 + 12 * 15}
                y="35"
                width={coyoteFrames * 15}
                height="28"
                rx="4"
                fill="rgba(6, 182, 212, 0.28)"
                stroke="#22d3ee"
                strokeDasharray="3 3"
              />
              <text x={30 + (12 + coyoteFrames / 2) * 15} y="26" fill="#22d3ee" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
                Coyote ({coyoteFrames}f)
              </text>

              {/* Input Buffer Window before Ledge B (Frames 32 - bufferFrames to 32) */}
              <rect
                x={30 + (32 - bufferFrames) * 15}
                y="35"
                width={bufferFrames * 15}
                height="28"
                rx="4"
                fill="rgba(245, 158, 11, 0.28)"
                stroke="#fbbf24"
                strokeDasharray="3 3"
              />
              <text x={30 + (32 - bufferFrames / 2) * 15} y="26" fill="#fbbf24" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
                Buffer ({bufferFrames}f)
              </text>

              {/* Ground Ledge B (Frames 32 to 45) */}
              <rect x={30 + 32 * 15} y="35" width={13 * 15} height="28" rx="4" fill="#065f46" stroke="#10b981" />
              <text x={30 + 38.5 * 15} y="53" fill="#ecfdf5" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
                LEDGE B (Land at f=32)
              </text>

              {/* Frame ticks */}
              {Array.from({ length: 46 }).map((_, f) => (
                <line
                  key={f}
                  x1={30 + f * 15}
                  y1="75"
                  x2={30 + f * 15}
                  y2={f % 5 === 0 ? '92' : '83'}
                  stroke="#475569"
                  strokeWidth="1.5"
                />
              ))}

              {/* Player Button Press Marker */}
              <line
                x1={30 + playerPressFrame * 15}
                y1="12"
                x2={30 + playerPressFrame * 15}
                y2="122"
                stroke="#f43f5e"
                strokeWidth="3"
              />
              <circle cx={30 + playerPressFrame * 15} cy="122" r="6" fill="#f43f5e" />
              <text
                x={Math.min(660, Math.max(90, 30 + playerPressFrame * 15))}
                y="142"
                fill="#fda4af"
                fontSize="11"
                fontFamily="JetBrains Mono"
                fontWeight="bold"
                textAnchor="middle"
              >
                Player Presses JUMP at Frame {playerPressFrame}
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-rose-300">Scrub Button Press Frame</span>
                <span className="text-white font-bold">Frame {playerPressFrame}</span>
              </div>
              <input
                type="range"
                min="4"
                max="40"
                step="1"
                value={playerPressFrame}
                onChange={(e) => setPlayerPressFrame(parseInt(e.target.value, 10))}
                className="w-full accent-rose-500"
              />
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-cyan-300">Coyote Grace Window</span>
                <span className="text-white font-bold">{coyoteFrames}f ({Math.round(coyoteFrames * 16.6)}ms)</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={coyoteFrames}
                onChange={(e) => setCoyoteFrames(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-amber-300">Jump Input Buffer</span>
                <span className="text-white font-bold">{bufferFrames}f ({Math.round(bufferFrames * 16.6)}ms)</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={bufferFrames}
                onChange={(e) => setBufferFrames(parseInt(e.target.value, 10))}
                className="w-full accent-amber-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Playable Lab 2: The Platformer Feel Surgery */}
      <section className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Playable Engineering Lab 02 • "The Platformer Feel Surgery"</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              A/B Live Feel Comparator: Naive Rigid Physics vs. Tuned *Celeste* Controller
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2 text-xs font-mono">
              Gems Collected: <strong className="text-amber-400 text-sm">{gemsCollected} / 4</strong>
            </div>
            {isLabDone ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-mono font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" /> Lab Completed!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 text-xs font-mono text-amber-300">
                Goal: Collect 4 Gems
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Use <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">A</kbd>/<kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">D</kbd> (or Arrow Keys) to move and <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">W</kbd>/<kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">Space</kbd> to jump across the platforms to collect 4 golden crystals.
          Toggle between <strong>Naive CS Physics</strong> and <strong>Tuned Celeste Feel</strong> at any moment to feel the difference in muscle memory.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-3">
            <canvas
              ref={canvasRef}
              width={560}
              height={320}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 shadow-inner"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    courseAudio.playClick(420);
                    setFeelMode('naive');
                  }}
                  className={`rounded-lg px-3.5 py-2 text-xs font-mono font-semibold transition cursor-pointer ${
                    feelMode === 'naive'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Mode A: Naive CS Physics (Floaty/Unbuffered)
                </button>
                <button
                  onClick={() => {
                    courseAudio.playClick(680);
                    setFeelMode('celeste');
                  }}
                  className={`rounded-lg px-3.5 py-2 text-xs font-mono font-semibold transition cursor-pointer ${
                    feelMode === 'celeste'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Mode B: Tuned Celeste Controller (3Cs + Juice)
                </button>
              </div>

              <button
                onClick={() => setXrayDebug((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono text-cyan-300 cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>X-Ray Telemetry: {xrayDebug ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 border-b border-slate-800 pb-2.5">
              <Sliders className="h-4 w-4" />
              <span>ADSR & Feel Envelope Controls</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Horizontal Attack Time (τ_attack)</span>
                <span className="text-emerald-400">{attackMs} ms</span>
              </div>
              <input
                type="range"
                min="16"
                max="250"
                step="10"
                value={attackMs}
                onChange={(e) => setAttackMs(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Horizontal Release / Friction (τ_release)</span>
                <span className="text-emerald-400">{releaseMs} ms</span>
              </div>
              <input
                type="range"
                min="16"
                max="250"
                step="10"
                value={releaseMs}
                onChange={(e) => setReleaseMs(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400"
              />
            </div>

            <div className="rounded-lg bg-slate-950 border border-slate-800 p-3.5 space-y-2 text-xs text-slate-300">
              <div className="font-mono font-bold text-emerald-300">6 Active Feel Enhancements in Mode B:</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li><strong className="text-slate-200">ADSR Envelopes:</strong> Sub-80ms acceleration & crisp stopping.</li>
                <li><strong className="text-slate-200">Asymmetric Gravity:</strong> {fallGravityMult.toFixed(1)}x faster descent + early-release hop.</li>
                <li><strong className="text-slate-200">Coyote & Buffer:</strong> {coyoteFrames}f ledge forgiveness & {bufferFrames}f landing queue.</li>
                <li><strong className="text-slate-200">Corner Correction:</strong> 8px horizontal nudge when clipping a platform edge from below.</li>
                <li><strong className="text-slate-200">Look-Ahead PID Camera:</strong> Red crosshair leads velocity vector smoothly.</li>
                <li><strong className="text-slate-200">Squash & Hitstop:</strong> Volume-preserving deformation ($s_x \cdot s_y = 1$) + 4f freeze on gem pickup.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('module-1')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Module 01</span>
          </button>

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
            <span>{isModuleDone ? 'Module 02 Completed' : 'Mark Module 02 Theory Complete'}</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('module-3')}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition cursor-pointer"
        >
          <span>Next: Module 03 (Decisions, Frame Data & Level Graph Topology)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
