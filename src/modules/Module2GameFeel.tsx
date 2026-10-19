import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Eye,
  Clock,
  Zap,
  Sparkles
} from 'lucide-react';
import { Module2Content } from '../content/Module2Content';

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
  const [coyoteFrames, setCoyoteFrames] = useState<number>(6);
  const [bufferFrames, setBufferFrames] = useState<number>(6);
  const [playerPressFrame, setPlayerPressFrame] = useState<number>(15);

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
      currentG *= 0.45;
    }
    simVy -= currentG * dt;
    simY = Math.max(0, simY + simVy * dt);
  }

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

    // Simulation State
    let px = 60;
    let py = 250;
    let vx = 0;
    let vy = 0;
    let isGrounded = false;
    let coyoteTimer = 0;
    let jumpBufferTimer = 0;
    let jumpHeld = false;
    let hitstop = 0;
    let shake = 0;
    let scaleX = 1;
    let scaleY = 1;
    let camX = px;
    let camY = py;
    let score = 0;

    const keys: Record<string, boolean> = {};

    interface Platform {
      x: number;
      y: number;
      w: number;
      h: number;
    }

    interface Gem {
      x: number;
      y: number;
      collected: boolean;
      respawnTimer: number;
    }

    const platforms: Platform[] = [
      { x: 30, y: 280, w: 140, h: 20 },
      { x: 210, y: 245, w: 100, h: 20 },
      { x: 350, y: 195, w: 90, h: 20 },
      { x: 470, y: 145, w: 70, h: 20 },
    ];

    const gems: Gem[] = [
      { x: 90, y: 240, collected: false, respawnTimer: 0 },
      { x: 260, y: 205, collected: false, respawnTimer: 0 },
      { x: 395, y: 155, collected: false, respawnTimer: 0 },
      { x: 505, y: 105, collected: false, respawnTimer: 0 },
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
      if (e.key === ' ' || e.key.toLowerCase() === 'w' || e.key === 'ArrowUp') {
        jumpBufferTimer = bufferFrames;
        jumpHeld = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
      if (e.key === ' ' || e.key.toLowerCase() === 'w' || e.key === 'ArrowUp') {
        jumpHeld = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const loop = () => {
      if (hitstop > 0) {
        hitstop--;
        animId = requestAnimationFrame(loop);
        return;
      }

      // Input polling
      const left = keys['arrowleft'] || keys['a'];
      const right = keys['arrowright'] || keys['d'];

      // Horizontal Kinematics (ADSR Filter)
      if (feelMode === 'naive') {
        vx = 0;
        if (left) vx = -3.8;
        if (right) vx = 3.8;
      } else {
        const targetVx = (right ? 1 : 0) - (left ? 1 : 0);
        const maxSpeed = 5.2;
        const attackRate = 1 / (attackMs / 16.6);
        const releaseRate = 1 / (releaseMs / 16.6);

        if (targetVx !== 0) {
          vx += targetVx * maxSpeed * attackRate;
          vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
        } else {
          vx *= Math.max(0, 1 - releaseRate);
          if (Math.abs(vx) < 0.1) vx = 0;
        }
      }

      // Vertical Kinematics
      if (feelMode === 'naive') {
        vy += 0.32;
        if ((keys[' '] || keys['w'] || keys['arrowup']) && isGrounded) {
          vy = -8.2;
          isGrounded = false;
          courseAudio.playClick(500);
        }
      } else {
        let activeG = vy < 0 ? gRise * 0.0003 : gFall * 0.0003;
        if (apexHangBoost && Math.abs(vy) < 1.6) {
          activeG *= 0.45;
        }
        if (vy < 0 && !jumpHeld) {
          activeG *= 2.0;
        }
        vy += activeG;

        if (isGrounded) {
          coyoteTimer = coyoteFrames;
        } else if (coyoteTimer > 0) {
          coyoteTimer--;
        }

        if (jumpBufferTimer > 0) {
          jumpBufferTimer--;
          if (coyoteTimer > 0) {
            vy = -v0 * 0.0165;
            isGrounded = false;
            coyoteTimer = 0;
            jumpBufferTimer = 0;
            scaleX = 0.65;
            scaleY = 1.45;
            courseAudio.playClick(600);
          }
        }
      }

      // Position update
      px += vx;
      py += vy;

      // Platform Collisions (AABB)
      isGrounded = false;
      const playerHalfW = 12;
      const playerH = 28;

      platforms.forEach((plat) => {
        if (
          px + playerHalfW > plat.x &&
          px - playerHalfW < plat.x + plat.w &&
          py + playerH / 2 >= plat.y &&
          py + playerH / 2 <= plat.y + plat.h + 8 &&
          vy >= 0
        ) {
          py = plat.y - playerH / 2;
          vy = 0;
          isGrounded = true;
          if (feelMode === 'celeste' && scaleY > 1.1) {
            scaleX = 1.35;
            scaleY = 0.7;
          }
        }

        // Corner Correction (Celeste algorithm)
        if (
          feelMode === 'celeste' &&
          vy < 0 &&
          py - playerH / 2 <= plat.y + plat.h &&
          py - playerH / 2 >= plat.y &&
          px + playerHalfW > plat.x &&
          px - playerHalfW < plat.x + plat.w
        ) {
          const distToLeft = Math.abs(px + playerHalfW - plat.x);
          const distToRight = Math.abs(plat.x + plat.w - (px - playerHalfW));
          if (distToLeft < 9) {
            px -= distToLeft + 1;
          } else if (distToRight < 9) {
            px += distToRight + 1;
          } else {
            vy = 0;
          }
        }
      });

      // Pit floor reset
      if (py > canvas.height + 40) {
        px = 60;
        py = 250;
        vx = 0;
        vy = 0;
      }

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
              shake = 5;
              scaleX = 1.3;
              scaleY = 1.3;
            }
            courseAudio.playHit(feelMode === 'celeste');
          }
        }
      });

      // Recover squash & stretch
      scaleX += (1 - scaleX) * 0.22;
      scaleY += (1 - scaleY) * 0.22;

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

      // Render: Clean light drafting canvas
      ctx.save();
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.translate(sx, sy);

      // Drafting grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      for (let gx = 30; gx < canvas.width; gx += 30) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, canvas.height);
        ctx.stroke();
      }
      for (let gy = 30; gy < canvas.height; gy += 30) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(canvas.width, gy);
        ctx.stroke();
      }

      // Draw platforms
      platforms.forEach((plat) => {
        ctx.fillStyle = '#e2e8f0';
        ctx.strokeStyle = feelMode === 'celeste' ? '#2563eb' : '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(plat.x, plat.y, plat.w, plat.h, 3);
        ctx.fill();
        ctx.stroke();
      });

      // Draw Gems
      gems.forEach((g) => {
        if (!g.collected) {
          ctx.save();
          ctx.translate(g.x, g.y);
          ctx.fillStyle = '#d97706';
          ctx.beginPath();
          ctx.moveTo(0, -9);
          ctx.lineTo(8, 0);
          ctx.lineTo(0, 9);
          ctx.lineTo(-8, 0);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#92400e';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      });

      // Draw Player
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(scaleX, scaleY);
      ctx.fillStyle = feelMode === 'celeste' ? '#2563eb' : '#64748b';
      ctx.beginPath();
      ctx.roundRect(-12, -15, 24, 30, 4);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Eyes
      const eyeOffset = vx >= 0 ? 4 : -4;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(eyeOffset - 2, -8, 4, 5);
      ctx.restore();

      // Engineer X-Ray Telemetry Overlay
      if (xrayDebug) {
        // Velocity Vector
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + vx * 7, py + vy * 5);
        ctx.stroke();

        // Camera Focus Crosshair
        ctx.strokeStyle = 'rgba(225, 29, 72, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(camX - 16, camY - 16, 32, 32);

        // Coyote & Buffer HUD Box
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(14, 14, 195, 54);
        ctx.strokeStyle = '#cbd5e1';
        ctx.strokeRect(14, 14, 195, 54);

        ctx.fillStyle = '#0f172a';
        ctx.font = '11px Segoe UI, monospace';
        ctx.fillText(`MODE: ${feelMode.toUpperCase()}`, 24, 30);
        ctx.fillStyle = coyoteTimer > 0 ? '#16a34a' : '#64748b';
        ctx.fillText(`COYOTE WINDOW: ${coyoteTimer}f`, 24, 46);
        ctx.fillStyle = jumpBufferTimer > 0 ? '#d97706' : '#64748b';
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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="border-b border-zinc-200 pb-5 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-mono font-bold text-blue-700">
            MODULE 02 • ESTIMATED STUDY TIME: 2.0 HOURS
          </span>
          <span className="text-xs font-mono text-zinc-500">
            Game Feel (Steve Swink), Maddy Thorson (Celeste), Control Theory
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
          The Physics of Virtual Sensation: 3Cs, Piecewise Kinematics &amp; Temporal Forgiveness
        </h1>
        <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
          When software engineers implement a platformer or action character, they frequently write <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-900 border border-zinc-200">velocity.y += 9.8 * dt</code> and <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-900 border border-zinc-200">if (isGrounded &amp;&amp; keyPressed) jump()</code>.
          The result feels floaty, unresponsive, and imprecise.
          This module covers the human motor-sensory loop latency (~240ms) and how game engines use piecewise acceleration, temporal hysteresis, and visual feedback to achieve responsive tactile controls.
        </p>
      </header>

      {/* Comprehensive Academic Textbook Chapter */}
      <section>
        <Module2Content />
      </section>

      {/* Section 2.1: Jump Kinematics */}
      <section className="space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>2.1 Biological I/O Latency &amp; Non-Newtonian Jump Kinematics</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-950 mt-1">
            Deriving Gravity from Spatial Metrics (H<sub>max</sub>, t<sub>peak</sub>)
          </h2>
        </div>

        <p className="text-sm text-zinc-700 leading-relaxed">
          Constant real-world gravity produces a symmetric parabola that spends excessive time rising slowly and descends too sluggishly.
          Game developers parameterize jumps by level geometry requirements: <strong>desired jump height (H<sub>max</sub>)</strong> and <strong>time to peak (t<sub>peak</sub>)</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="text-blue-700 font-bold">1. INITIAL JUMP VELOCITY (v₀)</div>
            <div className="text-base text-zinc-950 font-bold">v₀ = (2 &middot; H_max) / t_peak</div>
            <p className="text-zinc-600 font-sans">
              Current: <strong className="text-blue-800">{Math.round(v0)} px/s</strong>
            </p>
            <div className="font-sans border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-zinc-800">
              <strong>30&ndash;60 Min Edu Mini-Game:</strong> Derive initial impulse from exact grid-tile heights so student trajectories align with integer coordinate lines.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="text-indigo-700 font-bold">2. RISING GRAVITY (g_rise)</div>
            <div className="text-base text-zinc-950 font-bold">g_rise = (2 &middot; H_max) / t_peak&sup2;</div>
            <p className="text-zinc-600 font-sans">
              Current: <strong className="text-indigo-800">{Math.round(gRise)} px/s&sup2;</strong>
            </p>
            <div className="font-sans border-l-2 border-indigo-500 bg-indigo-50/50 pl-2 py-1 text-zinc-800">
              <strong>30&ndash;60 Min Edu Mini-Game:</strong> Keep <code>t_peak &le; 0.35s</code> so moving between lab stations never wastes classroom time.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="text-amber-700 font-bold">3. ASYMMETRIC FALL &amp; APEX HANG</div>
            <div className="text-base text-zinc-950 font-bold">g_fall = k &middot; g_rise (k &asymp; 2.4)</div>
            <p className="text-zinc-600 font-sans">
              Snaps the player briskly to the ground on descent while granting fine control at the peak.
            </p>
            <div className="font-sans border-l-2 border-amber-500 bg-amber-50/50 pl-2 py-1 text-zinc-800">
              <strong>30&ndash;60 Min Edu Mini-Game:</strong> Use fast 2.4x settling on dropped puzzle blocks and brief apex slowdown at <code>dy/dt = 0</code> extrema.
            </div>
          </div>
        </div>

        {/* Interactive Diagram 2.1 */}
        <div className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-blue-700 font-semibold">Interactive Figure 2.1</span>
              <h3 className="text-base font-bold text-zinc-950">Piecewise Jump Trajectory vs. Constant Gravity</h3>
            </div>
            <span className="text-xs text-zinc-500">
              Dashed line: Newtonian constant g &bull; Solid blue: Piecewise tuned jump
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-7 border border-zinc-200 bg-zinc-50 rounded-lg p-4">
              <svg viewBox="0 0 530 245" className="w-full h-auto">
                <line x1="50" y1="210" x2="500" y2="210" stroke="#94a3b8" strokeWidth="2" />
                <line x1="50" y1="210" x2="50" y2="25" stroke="#94a3b8" strokeWidth="2" />

                <line
                  x1="50"
                  y1={210 - (jumpHeightPx / 150) * 165}
                  x2="500"
                  y2={210 - (jumpHeightPx / 150) * 165}
                  stroke="#cbd5e1"
                  strokeDasharray="4 4"
                />
                <text x="58" y={204 - (jumpHeightPx / 150) * 165} fill="#64748b" fontSize="10" fontFamily="Segoe UI, monospace">
                  H_max = {jumpHeightPx}px
                </text>

                {/* Naive Curve */}
                <path d={naiveJumpPoints.join(' ')} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 5" />

                {/* Tuned Piecewise Curve */}
                <path d={tunedJumpPoints.join(' ')} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

                <text x="320" y="50" fill="#2563eb" fontSize="11" fontFamily="Segoe UI, monospace" fontWeight="bold">
                  &mdash; Tuned Piecewise Jump (Crisp Descent + Apex Hang)
                </text>
                <text x="320" y="68" fill="#64748b" fontSize="11" fontFamily="Segoe UI, monospace">
                  -- Naive Constant Gravity (Floaty Descent)
                </text>
              </svg>
            </div>

            <div className="lg:col-span-5 space-y-3 bg-zinc-50 p-4 rounded-lg border border-zinc-200">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-700">Target Jump Height (H_max)</span>
                  <span className="text-blue-700 font-bold">{jumpHeightPx} px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  step="5"
                  value={jumpHeightPx}
                  onChange={(e) => setJumpHeightPx(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-700">Time to Apex (t_peak)</span>
                  <span className="text-blue-700 font-bold">{timeToPeakSec.toFixed(2)} sec</span>
                </div>
                <input
                  type="range"
                  min="0.22"
                  max="0.60"
                  step="0.02"
                  value={timeToPeakSec}
                  onChange={(e) => setTimeToPeakSec(parseFloat(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-700">Falling Gravity Multiplier (k_fall)</span>
                  <span className="text-blue-700 font-bold">{fallGravityMult.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="3.5"
                  step="0.1"
                  value={fallGravityMult}
                  onChange={(e) => setFallGravityMult(parseFloat(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
                <span className="text-xs font-mono text-zinc-700">Apex Hang Time (|v_y| &lt; &epsilon; &rarr; 0.45g)</span>
                <input
                  type="checkbox"
                  checked={apexHangBoost}
                  onChange={(e) => setApexHangBoost(e.target.checked)}
                  className="h-4 w-4 accent-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2.2: Coyote Time & Input Buffering */}
      <section className="space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Zap className="h-4 w-4" />
            <span>2.2 Temporal Hysteresis &mdash; Coyote Time &amp; Input Ring Buffering</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-950 mt-1">
            Mitigating Human Timing Discrepancies at 60 FPS
          </h2>
        </div>

        {/* Interactive Diagram 2.2 */}
        <div className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-blue-700 font-semibold">Interactive Figure 2.2</span>
              <h3 className="text-base font-bold text-zinc-950">Frame-by-Frame Input Logic Timeline</h3>
            </div>
            <div className="text-xs font-mono">
              {isStrictJumpSuccess ? (
                <span className="rounded bg-emerald-50 text-emerald-800 px-2 py-0.5 border border-emerald-300 font-semibold">
                  ✓ Jump Executes (On Ground)
                </span>
              ) : isCoyoteJumpSuccess ? (
                <span className="rounded bg-blue-50 text-blue-800 px-2 py-0.5 border border-blue-300 font-semibold">
                  ✓ Saved by Coyote Window ({playerPressFrame - 12} frames past ledge)
                </span>
              ) : isBufferJumpSuccess ? (
                <span className="rounded bg-amber-50 text-amber-800 px-2 py-0.5 border border-amber-300 font-semibold">
                  ✓ Saved by Input Buffer ({32 - playerPressFrame} frames before landing)
                </span>
              ) : (
                <span className="rounded bg-red-50 text-red-800 px-2 py-0.5 border border-red-300 font-semibold">
                  ✗ Input Dropped (Deadzone &bull; Player Falls)
                </span>
              )}
            </div>
          </div>

          {/* Frame Timeline SVG */}
          <div className="overflow-x-auto border border-zinc-200 bg-zinc-50 rounded-lg p-4">
            <svg viewBox="0 0 760 150" className="w-full min-w-[620px] h-auto">
              {/* Ground Ledge A */}
              <rect x="30" y="35" width={12 * 15} height="28" rx="3" fill="#e2e8f0" stroke="#94a3b8" />
              <text x="120" y="53" fill="#0f172a" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle">
                LEDGE A (Grounded 0..12)
              </text>

              {/* Coyote Window */}
              <rect
                x={30 + 12 * 15}
                y="35"
                width={coyoteFrames * 15}
                height="28"
                rx="3"
                fill="rgba(37, 99, 235, 0.12)"
                stroke="#2563eb"
                strokeDasharray="3 3"
              />
              <text x={30 + (12 + coyoteFrames / 2) * 15} y="26" fill="#1d4ed8" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
                Coyote ({coyoteFrames}f)
              </text>

              {/* Input Buffer Window */}
              <rect
                x={30 + (32 - bufferFrames) * 15}
                y="35"
                width={bufferFrames * 15}
                height="28"
                rx="3"
                fill="rgba(217, 119, 6, 0.15)"
                stroke="#d97706"
                strokeDasharray="3 3"
              />
              <text x={30 + (32 - bufferFrames / 2) * 15} y="26" fill="#b45309" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
                Buffer ({bufferFrames}f)
              </text>

              {/* Ground Ledge B */}
              <rect x={30 + 32 * 15} y="35" width={13 * 15} height="28" rx="3" fill="#e2e8f0" stroke="#94a3b8" />
              <text x={30 + 38.5 * 15} y="53" fill="#0f172a" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle">
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
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
              ))}

              {/* Player Button Press Marker */}
              <line
                x1={30 + playerPressFrame * 15}
                y1="12"
                x2={30 + playerPressFrame * 15}
                y2="122"
                stroke="#dc2626"
                strokeWidth="2.5"
              />
              <circle cx={30 + playerPressFrame * 15} cy="122" r="5" fill="#dc2626" />
              <text
                x={Math.min(660, Math.max(90, 30 + playerPressFrame * 15))}
                y="142"
                fill="#991b1b"
                fontSize="11"
                fontFamily="Segoe UI, monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                Jump Input Press at Frame {playerPressFrame}
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-200">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Scrub Jump Input Frame</span>
                <span className="text-zinc-950 font-bold">Frame {playerPressFrame}</span>
              </div>
              <input
                type="range"
                min="4"
                max="40"
                step="1"
                value={playerPressFrame}
                onChange={(e) => setPlayerPressFrame(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-200">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Coyote Window Length</span>
                <span className="text-blue-700 font-bold">{coyoteFrames} frames ({Math.round(coyoteFrames * 16.6)}ms)</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={coyoteFrames}
                onChange={(e) => setCoyoteFrames(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-200">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Input Buffer Window Length</span>
                <span className="text-amber-700 font-bold">{bufferFrames} frames ({Math.round(bufferFrames * 16.6)}ms)</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={bufferFrames}
                onChange={(e) => setBufferFrames(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Playable Lab 2 */}
      <section className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-blue-700 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Laboratory 2.1 &bull; Hands-On Experiment</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-950 mt-0.5">
              Live Feel Comparator: Naive Rigid Kinematics vs. Tuned Responsive Controller
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="border border-zinc-200 bg-zinc-50 px-3 py-1.5 rounded text-xs font-mono">
              Gems Collected: <strong className="text-amber-700">{gemsCollected} / 4</strong>
            </div>
            {isLabDone ? (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" /> Lab Complete!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-300 px-3 py-1.5 text-xs font-mono text-amber-900">
                Goal: Collect 4 Gems
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-zinc-700 leading-relaxed">
          Use <kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">A</kbd>/<kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">D</kbd> (or Arrow Keys) to move and <kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">W</kbd>/<kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">Space</kbd> to jump across the platforms.
          Toggle between Mode A (Naive Physics) and Mode B (Tuned Controller) to experience the difference.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 space-y-3">
            <canvas
              ref={canvasRef}
              width={560}
              height={320}
              className="w-full rounded border border-zinc-300 bg-zinc-50 shadow-sm"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    courseAudio.playClick(420);
                    setFeelMode('naive');
                  }}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    feelMode === 'naive'
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  Mode A: Naive Kinematics (Floaty/Rigid)
                </button>
                <button
                  onClick={() => {
                    courseAudio.playClick(680);
                    setFeelMode('celeste');
                  }}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    feelMode === 'celeste'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  Mode B: Tuned Controller (3Cs + Juice)
                </button>
              </div>

              <button
                onClick={() => setXrayDebug((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded border border-zinc-300 bg-white hover:bg-zinc-50 px-3 py-1.5 text-xs font-mono text-zinc-700 cursor-pointer shadow-sm"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>X-Ray HUD: {xrayDebug ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-blue-700 font-bold border-b border-zinc-200 pb-2">
              <Sliders className="h-3.5 w-3.5" />
              <span>ADSR Envelope &amp; Responsiveness Controls</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Attack Acceleration Time (&tau;_attack)</span>
                <span className="text-blue-700 font-bold">{attackMs} ms</span>
              </div>
              <input
                type="range"
                min="16"
                max="250"
                step="10"
                value={attackMs}
                onChange={(e) => setAttackMs(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Release / Deceleration (&tau;_release)</span>
                <span className="text-blue-700 font-bold">{releaseMs} ms</span>
              </div>
              <input
                type="range"
                min="16"
                max="250"
                step="10"
                value={releaseMs}
                onChange={(e) => setReleaseMs(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="bg-white border border-zinc-200 p-3 rounded text-xs space-y-1.5 text-zinc-700">
              <div className="font-mono font-bold text-zinc-950">Active Kinematic Enhancements in Mode B:</div>
              <ul className="list-disc pl-4 space-y-1 text-zinc-600">
                <li><strong>ADSR Envelopes:</strong> Sub-80ms acceleration &amp; crisp stopping.</li>
                <li><strong>Asymmetric Gravity:</strong> {fallGravityMult.toFixed(1)}x faster descent + early-release hop.</li>
                <li><strong>Coyote &amp; Buffer:</strong> {coyoteFrames}f ledge forgiveness &amp; {bufferFrames}f landing queue.</li>
                <li><strong>Corner Correction:</strong> Horizontal nudge when clipping platform edges from beneath.</li>
                <li><strong>Look-Ahead Camera:</strong> Crosshair leads velocity vector smoothly.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 pt-6 mt-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('module-1')}
            className="inline-flex items-center gap-2 rounded border border-zinc-300 bg-white hover:bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-800 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Module 01</span>
          </button>

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
            <span>{isModuleDone ? 'Module 02 Complete' : 'Mark Module 02 Theory Complete'}</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('module-3')}
          className="inline-flex items-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition cursor-pointer"
        >
          <span>Next: Module 03 (Decisions, Frame Data &amp; Level Topology)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
