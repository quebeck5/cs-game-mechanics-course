import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import {
  Swords,
  GitBranch,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Sliders,
  ShieldAlert,
  Play,
  RotateCcw
} from 'lucide-react';
import { Module3Content } from '../content/Module3Content';

interface Module3Props {
  onNavigate: (page: PageId) => void;
  onCompleteModule: () => void;
  onCompleteLab: () => void;
  isModuleDone: boolean;
  isLabDone: boolean;
}

export const Module3DecisionsSpace: React.FC<Module3Props> = ({
  onNavigate,
  onCompleteModule,
  onCompleteLab,
  isModuleDone,
  isLabDone,
}) => {
  // Interactive Diagram 3.1: Combat Frame Data Strip
  const [startupFrames, setStartupFrames] = useState<number>(10);
  const [activeFrames, setActiveFrames] = useState<number>(4);
  const [recoveryFrames, setRecoveryFrames] = useState<number>(16);
  const [blockStunFrames, setBlockStunFrames] = useState<number>(12);
  const [hitStunFrames, setHitStunFrames] = useState<number>(22);
  const [scrubFrame, setScrubFrame] = useState<number>(11);

  const totalFrames = startupFrames + activeFrames + recoveryFrames;
  const frameAdvantageOnHit = hitStunFrames - recoveryFrames;
  const frameAdvantageOnBlock = blockStunFrames - recoveryFrames;

  // Interactive Diagram 3.2: Level Graph Topology Mode
  const [levelGraphMode, setLevelGraphMode] = useState<'linear' | 'looped_metroidvania'>('looped_metroidvania');

  // Playable Lab 3: Tactical Combat & Telegraph Duel
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<'dagger' | 'spear' | 'hammer'>('spear');
  const [bossTelegraphMs, setBossTelegraphMs] = useState<number>(380);
  const [bossHp, setBossHp] = useState<number>(100);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [duelWins, setDuelWins] = useState<number>(0);

  const weaponSpecs = {
    dagger: {
      name: 'Twin Dagger (Low Risk / Short Reach)',
      startup: 5,
      active: 4,
      recovery: 8,
      range: 48,
      damage: 9,
      color: '#38bdf8',
    },
    spear: {
      name: 'Halberd Spear (Mid Startup / Long Reach)',
      startup: 11,
      active: 5,
      recovery: 14,
      range: 92,
      damage: 17,
      color: '#10b981',
    },
    hammer: {
      name: 'Seismic Hammer (High Startup / Punish King)',
      startup: 20,
      active: 6,
      recovery: 22,
      range: 68,
      damage: 34,
      color: '#f59e0b',
    },
  };

  // Lab 3 Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const keys: Record<string, boolean> = {};

    // Player state
    let px = 140;
    let py = 170;
    let pHp = 100;
    let pState: 'idle' | 'startup' | 'active' | 'recovery' | 'dash' = 'idle';
    let pTimer = 0;
    let pDashCooldown = 0;
    let pDirX = 1;
    let pDirY = 0;
    let hasDealtDamageThisSwing = false;

    // Boss state
    let bx = 400;
    let by = 170;
    let bHp = 100;
    let bState: 'chase' | 'telegraph' | 'active' | 'recovery' = 'chase';
    let bTimer = 0;
    let shake = 0;

    const spec = weaponSpecs[selectedWeapon];
    const telegraphFrames = Math.max(6, Math.round(bossTelegraphMs / 16.6));

    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      keys[k] = true;

      if ((k === 'j' || k === ' ') && pState === 'idle') {
        pState = 'startup';
        pTimer = spec.startup;
        hasDealtDamageThisSwing = false;
        courseAudio.playClick(460);
      }

      if ((k === 'k' || k === 'shift') && pDashCooldown <= 0 && pState !== 'active') {
        pState = 'dash';
        pTimer = 9;
        pDashCooldown = 36;
        courseAudio.playJump(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };

    const handleCanvasClick = () => {
      if (pState === 'idle') {
        pState = 'startup';
        pTimer = spec.startup;
        hasDealtDamageThisSwing = false;
        courseAudio.playClick(460);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousedown', handleCanvasClick);

    const loop = () => {
      if (pDashCooldown > 0) pDashCooldown--;

      // Aim direction toward boss
      const dx = bx - px;
      const dy = by - py;
      const dist = Math.hypot(dx, dy) || 1;
      pDirX = dx / dist;
      pDirY = dy / dist;

      // Player FSM
      if (pState === 'idle') {
        const moveSpd = 3.2;
        if (keys['a'] || keys['arrowleft']) px -= moveSpd;
        if (keys['d'] || keys['arrowright']) px += moveSpd;
        if (keys['w'] || keys['arrowup']) py -= moveSpd;
        if (keys['s'] || keys['arrowdown']) py += moveSpd;
      } else if (pState === 'dash') {
        const dashSpd = 8.0;
        const moveX = (keys['d'] || keys['arrowright'] ? 1 : 0) - (keys['a'] || keys['arrowleft'] ? 1 : 0);
        const moveY = (keys['s'] || keys['arrowdown'] ? 1 : 0) - (keys['w'] || keys['arrowup'] ? 1 : 0);
        if (moveX !== 0 || moveY !== 0) {
          px += moveX * dashSpd * 0.75;
          py += moveY * dashSpd * 0.75;
        } else {
          px -= pDirX * dashSpd;
          py -= pDirY * dashSpd;
        }
        pTimer--;
        if (pTimer <= 0) pState = 'idle';
      } else if (pState === 'startup') {
        pTimer--;
        if (pTimer <= 0) {
          pState = 'active';
          pTimer = spec.active;
        }
      } else if (pState === 'active') {
        if (!hasDealtDamageThisSwing && dist <= spec.range + 24) {
          hasDealtDamageThisSwing = true;
          // Extra punish bonus if boss is in recovery
          const multiplier = bState === 'recovery' ? 1.5 : 1.0;
          bHp = Math.max(0, bHp - Math.round(spec.damage * multiplier));
          setBossHp(bHp);
          shake = 6;
          courseAudio.playHit(true);

          if (bHp <= 0) {
            setDuelWins((w) => {
              const nw = w + 1;
              if (!isLabDone) onCompleteLab();
              return nw;
            });
            courseAudio.playSuccess();
            bHp = 100;
            pHp = 100;
            setBossHp(100);
            setPlayerHp(100);
          }
        }
        pTimer--;
        if (pTimer <= 0) {
          pState = 'recovery';
          pTimer = spec.recovery;
        }
      } else if (pState === 'recovery') {
        pTimer--;
        if (pTimer <= 0) pState = 'idle';
      }

      // Clamp player arena bounds
      px = Math.max(30, Math.min(canvas.width - 30, px));
      py = Math.max(40, Math.min(canvas.height - 30, py));

      // Boss AI FSM
      if (bState === 'chase') {
        bx += pDirX * 1.65;
        by += pDirY * 1.65;
        if (dist < 88) {
          bState = 'telegraph';
          bTimer = telegraphFrames;
        }
      } else if (bState === 'telegraph') {
        bTimer--;
        if (bTimer <= 0) {
          bState = 'active';
          bTimer = 6;
          courseAudio.playHit(true);
          if (dist < 95 && pState !== 'dash') {
            pHp = Math.max(0, pHp - 25);
            setPlayerHp(pHp);
            shake = 9;
            if (pHp <= 0) {
              pHp = 100;
              bHp = 100;
              setPlayerHp(100);
              setBossHp(100);
            }
          }
        }
      } else if (bState === 'active') {
        bTimer--;
        if (bTimer <= 0) {
          bState = 'recovery';
          bTimer = 42; // Punish window!
        }
      } else if (bState === 'recovery') {
        bTimer--;
        if (bTimer <= 0) {
          bState = 'chase';
        }
      }

      shake *= 0.82;
      const sx = (Math.random() - 0.5) * shake * 2;
      const sy = (Math.random() - 0.5) * shake * 2;

      // Render Arena
      ctx.save();
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.translate(sx, sy);

      // Arena floor rings
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 125, 0, Math.PI * 2);
      ctx.stroke();

      // Boss Telegraph & Active AoE Circle
      if (bState === 'telegraph') {
        const progress = 1 - bTimer / telegraphFrames;
        ctx.fillStyle = 'rgba(244, 63, 94, 0.14)';
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(bx, by, 95, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Expanding inner telegraph ring
        ctx.fillStyle = 'rgba(244, 63, 94, 0.32)';
        ctx.beginPath();
        ctx.arc(bx, by, 95 * progress, 0, Math.PI * 2);
        ctx.fill();
      } else if (bState === 'active') {
        ctx.fillStyle = 'rgba(244, 63, 94, 0.65)';
        ctx.beginPath();
        ctx.arc(bx, by, 95, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Boss
      ctx.save();
      ctx.translate(bx, by);
      ctx.fillStyle =
        bState === 'telegraph'
          ? '#fbbf24'
          : bState === 'active'
          ? '#f43f5e'
          : bState === 'recovery'
          ? '#60a5fa'
          : '#a855f7';
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(
        bState === 'recovery' ? 'VULNERABLE (1.5x)' : `BOSS: ${bState.toUpperCase()}`,
        0,
        -32
      );
      ctx.restore();

      // Draw Player Weapon Hitbox
      if (pState === 'startup' || pState === 'active') {
        ctx.save();
        ctx.strokeStyle = pState === 'active' ? spec.color : 'rgba(148, 163, 184, 0.4)';
        ctx.fillStyle = pState === 'active' ? `${spec.color}44` : 'rgba(148, 163, 184, 0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px + pDirX * (spec.range * 0.5), py + pDirY * (spec.range * 0.5), spec.range * 0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Draw Player
      ctx.save();
      ctx.translate(px, py);
      ctx.fillStyle =
        pState === 'dash'
          ? '#38bdf8'
          : pState === 'recovery'
          ? '#64748b'
          : '#34d399';
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(`YOU (${pState.toUpperCase()})`, 0, -22);
      ctx.restore();

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousedown', handleCanvasClick);
    };
  }, [selectedWeapon, bossTelegraphMs, isLabDone, onCompleteLab]);

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-1 text-xs font-mono font-bold text-white">
            MODULE 03 • HOURS 4:00 – 6:00
          </span>
          <span className="text-xs font-mono text-slate-400">
            Sid Meier + MIT CMS.608 + Celia Hodent (The Gamer's Brain) + Combat Frame Systems
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Decisions, Space & Imperfect Information: Frame Data, Telegraphs & Graph Topology
        </h1>
        <p className="text-slate-300 max-w-4xl leading-relaxed">
          Sid Meier famously defined a good game as <strong className="text-amber-300">"a series of interesting decisions."</strong>
          For a Computer Scientist, what makes a decision mathematically "interesting" rather than trivial ($A \succ B$) or arbitrary (coin flip)?
          In Module 3, we formalize combat risk-reward via <strong>Startup/Active/Recovery Automata</strong>, <strong>Cognitive Affordances</strong>, and <strong>Level Graph Topology</strong>.
        </p>
      </header>

      {/* Comprehensive Academic Textbook Chapter */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <Module3Content />
      </section>

      {/* Section 3.1: Combat Frame Data & Frame Advantage */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
          <Swords className="h-4 w-4" />
          <span>3.1 Action Combat Automata — Startup, Active & Recovery Frames</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Why Instant Attacks Destroy Tactical Depth: The 3-Phase Action State Machine
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          In a naive game prototype, pressing Attack immediately subtracts enemy HP on frame 0. This reduces combat to a CPS (clicks-per-second) macro test.
          In every great action or fighting game (<em>Street Fighter, Dark Souls, Hades, Hollow Knight</em>), every action is a non-interruptible 3-stage state machine:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-1.5">
            <div className="text-amber-400 font-bold">1. STARTUP FRAMES (Telegraph)</div>
            <div className="text-white text-sm">Commitment & Readability Window</div>
            <p className="text-slate-300 font-sans">
              The wind-up animation before any hitbox is emitted. Gives the opponent ≥ 200ms to perceive and react, and commits the attacker to a spatial prediction.
            </p>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-1.5">
            <div className="text-rose-400 font-bold">2. ACTIVE FRAMES (Hitbox Emission)</div>
            <div className="text-white text-sm">Spatial Intersection Check</div>
            <p className="text-slate-300 font-sans">
              The brief window where the offensive AABB/capsule is active in world space. High damage moves often have narrow or brief active windows.
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-4 space-y-1.5">
            <div className="text-blue-400 font-bold">3. RECOVERY FRAMES (Punish Cost)</div>
            <div className="text-white text-sm">Vulnerability Opportunity Cost</div>
            <p className="text-slate-300 font-sans">
              If the attack whiffs or is blocked, the attacker cannot move or block for F<sub>recovery</sub> frames. Frame Advantage is ΔF = F<sub>stun</sub> − F<sub>recovery</sub>.
            </p>
          </div>
        </div>

        {/* Interactive Diagram 3.1: 60 FPS Frame Data Strip */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400">Interactive Diagram 3.1</span>
              <h3 className="text-lg font-bold text-white">Combat Frame-Data Strip & Frame Advantage Calculator ($\Delta F$)</h3>
            </div>
            <div className="flex gap-3 text-xs font-mono">
              <span className={`px-2.5 py-1 rounded border ${frameAdvantageOnHit >= 0 ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-rose-500/15 border-rose-500/40 text-rose-300'}`}>
                On Hit: {frameAdvantageOnHit >= 0 ? `+${frameAdvantageOnHit}` : frameAdvantageOnHit}f
              </span>
              <span className={`px-2.5 py-1 rounded border ${frameAdvantageOnBlock >= 0 ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-rose-500/15 border-rose-500/40 text-rose-300'}`}>
                On Block: {frameAdvantageOnBlock >= 0 ? `+${frameAdvantageOnBlock}` : frameAdvantageOnBlock}f {frameAdvantageOnBlock <= -10 ? '(PUNISHABLE!)' : '(SAFE)'}
              </span>
            </div>
          </div>

          {/* Frame Meter Bar */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1 p-3 rounded-xl bg-slate-950 border border-slate-800">
              {Array.from({ length: totalFrames }).map((_, idx) => {
                const frameNum = idx + 1;
                const isStartup = frameNum <= startupFrames;
                const isActive = frameNum > startupFrames && frameNum <= startupFrames + activeFrames;
                const isSelected = frameNum === scrubFrame;

                return (
                  <div
                    key={frameNum}
                    onClick={() => setScrubFrame(frameNum)}
                    className={`h-9 flex-1 min-w-[14px] rounded flex items-center justify-center text-[10px] font-mono font-bold cursor-pointer transition ${
                      isStartup
                        ? 'bg-amber-500/80 text-slate-950'
                        : isActive
                        ? 'bg-rose-500 text-white'
                        : 'bg-blue-500/70 text-white'
                    } ${isSelected ? 'ring-2 ring-white scale-110 z-10' : 'opacity-85 hover:opacity-100'}`}
                    title={`Frame ${frameNum}`}
                  >
                    {frameNum}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-amber-400">Startup Frames</span>
                  <span className="text-white font-bold">{startupFrames}f ({Math.round(startupFrames * 16.6)}ms)</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="25"
                  value={startupFrames}
                  onChange={(e) => setStartupFrames(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400"
                />
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-rose-400">Active Hitbox Frames</span>
                  <span className="text-white font-bold">{activeFrames}f</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={activeFrames}
                  onChange={(e) => setActiveFrames(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-blue-400">Recovery Frames</span>
                  <span className="text-white font-bold">{recoveryFrames}f</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={recoveryFrames}
                  onChange={(e) => setRecoveryFrames(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-400"
                />
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-emerald-400">Defender Blockstun</span>
                  <span className="text-white font-bold">{blockStunFrames}f</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={blockStunFrames}
                  onChange={(e) => setBlockStunFrames(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3.2: Level Design as Graph Theory */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
          <GitBranch className="h-4 w-4" />
          <span>3.2 Spatial Topology — Level Design as Directed & Undirected Graphs</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Chokepoints (Cut Vertices), Flanking Cycles & Lock-and-Key Graphs
        </h2>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400">Interactive Diagram 3.2</span>
              <h3 className="text-lg font-bold text-white">Topological Comparison: Linear Corridor vs. Interconnected Loop Graph</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLevelGraphMode('linear')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold cursor-pointer ${
                  levelGraphMode === 'linear' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Topology A: Linear Tree (Zero Agency)
              </button>
              <button
                onClick={() => setLevelGraphMode('looped_metroidvania')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold cursor-pointer ${
                  levelGraphMode === 'looped_metroidvania' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Topology B: Cyclic Lock-and-Key Graph (Dark Souls / Metroid)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
            <svg viewBox="0 0 780 220" className="w-full min-w-[600px] h-auto">
              {levelGraphMode === 'linear' ? (
                <>
                  <text x="30" y="30" fill="#fbbf24" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                    LINEAR CORRIDOR: Every node is an Articulation Point (Cut Vertex) — Zero navigational choice
                  </text>
                  {[
                    { x: 90, label: 'Spawn' },
                    { x: 240, label: 'Room 1' },
                    { x: 390, label: 'Key Room' },
                    { x: 540, label: 'Combat' },
                    { x: 690, label: 'Boss' },
                  ].map((node, i, arr) => (
                    <g key={node.label}>
                      {i < arr.length - 1 && (
                        <line x1={node.x + 40} y1="115" x2={arr[i + 1].x - 40} y2="115" stroke="#64748b" strokeWidth="3" />
                      )}
                      <circle cx={node.x} cy="115" r="36" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                      <text x={node.x} y="119" fill="#f8fafc" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
                        {node.label}
                      </text>
                    </g>
                  ))}
                </>
              ) : (
                <>
                  <text x="30" y="28" fill="#22d3ee" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                    CYCLIC LOCK & KEY GRAPH: Central Hub + Risk/Reward Flanking Loop + One-Way Shortcut Valve
                  </text>
                  {/* Edges */}
                  <line x1="110" y1="120" x2="260" y2="120" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="260" y1="120" x2="430" y2="60" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="260" y1="120" x2="430" y2="180" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 4" />
                  <line x1="430" y1="60" x2="600" y2="120" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="430" y1="180" x2="600" y2="120" stroke="#10b981" strokeWidth="3" />
                  <line x1="600" y1="120" x2="715" y2="120" stroke="#f43f5e" strokeWidth="3" />

                  {/* Nodes */}
                  <circle cx="110" cy="120" r="32" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="110" y="124" fill="#f8fafc" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">Spawn</text>

                  <circle cx="260" cy="120" r="36" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
                  <text x="260" y="116" fill="#e0e7ff" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">Central</text>
                  <text x="260" y="130" fill="#a5b4fc" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Hub (d=3)</text>

                  <circle cx="430" cy="60" r="34" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="430" y="57" fill="#f8fafc" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Main Path</text>
                  <text x="430" y="71" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">(Guarded)</text>

                  <circle cx="430" cy="180" r="34" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                  <text x="430" y="177" fill="#d1fae5" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Shortcut</text>
                  <text x="430" y="191" fill="#6ee7b7" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">(1-Way Valve)</text>

                  <circle cx="600" cy="120" r="34" fill="#0f172a" stroke="#22d3ee" strokeWidth="2.5" />
                  <text x="600" y="124" fill="#f8fafc" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Pre-Boss</text>

                  <circle cx="715" cy="120" r="32" fill="#4c0519" stroke="#f43f5e" strokeWidth="2.5" />
                  <text x="715" y="124" fill="#ffe4e6" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">Boss</text>
                </>
              )}
            </svg>
          </div>
        </div>
      </section>

      {/* Playable Lab 3: Tactical Combat & Telegraph Duel */}
      <section className="rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Playable Engineering Lab 03 • "Pareto Weapons & Telegraph Duel"</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Test Startup/Recovery Trade-offs & Boss Telegraph Windows
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2 text-xs font-mono">
              Your HP: <strong className="text-emerald-400">{playerHp}</strong> • Boss HP: <strong className="text-rose-400">{bossHp}</strong>
            </div>
            {isLabDone ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-mono font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" /> Lab Boss Defeated! ({duelWins}x)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 text-xs font-mono text-amber-300">
                Goal: Defeat the Arena Boss
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Move with <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">WASD</kbd>, Attack with <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">J</kbd> / <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">Space</kbd> (or Click), and Dodge-Dash with <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">K</kbd> / <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs">Shift</kbd>.
          Watch the Boss’s expanding red <strong>Telegraph Ring</strong>, dash out before the active blast, and strike during its blue <strong>VULNERABLE (Recovery)</strong> phase for $1.5\times$ punish damage!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-3">
            <canvas
              ref={canvasRef}
              width={560}
              height={320}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 cursor-crosshair shadow-inner"
            />
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
            <div className="text-xs font-mono uppercase text-amber-400 border-b border-slate-800 pb-2">
              1. Choose Pareto-Balanced Weapon Archetype
            </div>

            <div className="space-y-2.5">
              {(['dagger', 'spear', 'hammer'] as const).map((wKey) => {
                const w = weaponSpecs[wKey];
                const active = selectedWeapon === wKey;
                return (
                  <div
                    key={wKey}
                    onClick={() => {
                      courseAudio.playClick(540);
                      setSelectedWeapon(wKey);
                    }}
                    className={`rounded-xl border p-3.5 transition cursor-pointer ${
                      active
                        ? 'border-amber-500/60 bg-amber-950/25'
                        : 'border-slate-800 bg-slate-950/60 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-bold text-white">
                      <span>{w.name}</span>
                      <span className="font-mono text-amber-300">DMG: {w.damage}</span>
                    </div>
                    <div className="mt-1.5 flex gap-3 text-[11px] font-mono text-slate-400">
                      <span>Startup: {w.startup}f</span>
                      <span>Reach: {w.range}px</span>
                      <span>Recovery: {w.recovery}f</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Boss Attack Telegraph Window</span>
                <span className="text-amber-400">{bossTelegraphMs} ms</span>
              </div>
              <input
                type="range"
                min="100"
                max="650"
                step="20"
                value={bossTelegraphMs}
                onChange={(e) => setBossTelegraphMs(parseInt(e.target.value, 10))}
                className="w-full accent-amber-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Notice how setting Telegraph &lt; 180ms violates the human 240ms perceptual-motor loop, making hits feel "unfair" instead of skill-based.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('module-2')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Module 02</span>
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
            <span>{isModuleDone ? 'Module 03 Completed' : 'Mark Module 03 Theory Complete'}</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('module-4')}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition cursor-pointer"
        >
          <span>Next: Module 04 (Systems, Internal Economies & Feedback Loops)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
