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
  Sliders
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
      color: '#0284c7',
    },
    spear: {
      name: 'Halberd Spear (Mid Startup / Long Reach)',
      startup: 11,
      active: 5,
      recovery: 14,
      range: 92,
      damage: 17,
      color: '#059669',
    },
    hammer: {
      name: 'Seismic Hammer (High Startup / Heavy Punish)',
      startup: 20,
      active: 6,
      recovery: 22,
      range: 68,
      damage: 34,
      color: '#d97706',
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

    let px = 140;
    let py = 160;
    let pHp = 100;
    let pState: 'idle' | 'startup' | 'active' | 'recovery' | 'dash' = 'idle';
    let pTimer = 0;
    let pDashCooldown = 0;
    let pDirX = 1;
    let pDirY = 0;
    let hasDealtDamageThisSwing = false;

    let bx = 400;
    let by = 160;
    let bHp = 100;
    let bState: 'chase' | 'telegraph' | 'active' | 'recovery' = 'chase';
    let bTimer = 0;
    let shake = 0;

    const spec = weaponSpecs[selectedWeapon];
    const telegraphFrames = Math.max(6, Math.round(bossTelegraphMs / 16.6));

    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      keys[k] = true;

      // Attack trigger: J or Space
      if ((k === 'j' || k === ' ') && pState === 'idle') {
        pState = 'startup';
        pTimer = spec.startup;
        hasDealtDamageThisSwing = false;
        courseAudio.playClick(440);
      }

      // Dash trigger: K or Shift
      if ((k === 'k' || k === 'shift') && pState !== 'dash' && pDashCooldown <= 0) {
        pState = 'dash';
        pTimer = 10;
        pDashCooldown = 35;
        courseAudio.playBlip();
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
        courseAudio.playClick(440);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousedown', handleCanvasClick);

    const loop = () => {
      if (pDashCooldown > 0) pDashCooldown--;

      // Movement vector
      let mx = 0;
      let my = 0;
      if (keys['w'] || keys['arrowup']) my -= 1;
      if (keys['s'] || keys['arrowdown']) my += 1;
      if (keys['a'] || keys['arrowleft']) mx -= 1;
      if (keys['d'] || keys['arrowright']) mx += 1;

      if (mx !== 0 || my !== 0) {
        const len = Math.hypot(mx, my);
        pDirX = mx / len;
        pDirY = my / len;
      }

      // Player Finite State Machine
      if (pState === 'dash') {
        px += pDirX * 8.5;
        py += pDirY * 8.5;
        pTimer--;
        if (pTimer <= 0) pState = 'idle';
      } else if (pState === 'startup') {
        pTimer--;
        if (pTimer <= 0) {
          pState = 'active';
          pTimer = spec.active;
        }
      } else if (pState === 'active') {
        pTimer--;
        const dist = Math.hypot(bx - px, by - py);
        if (!hasDealtDamageThisSwing && dist <= spec.range + 24) {
          hasDealtDamageThisSwing = true;
          const dmgMult = bState === 'recovery' ? 1.5 : 1.0;
          const finalDmg = Math.round(spec.damage * dmgMult);
          bHp = Math.max(0, bHp - finalDmg);
          setBossHp(bHp);
          shake = 5;
          courseAudio.playHit(true);

          if (bHp <= 0) {
            bHp = 100;
            pHp = 100;
            setBossHp(100);
            setPlayerHp(100);
            setDuelWins((prev) => {
              const next = prev + 1;
              if (next >= 1 && !isLabDone) {
                onCompleteLab();
              }
              return next;
            });
            courseAudio.playSuccess();
          }
        }
        if (pTimer <= 0) {
          pState = 'recovery';
          pTimer = spec.recovery;
        }
      } else if (pState === 'recovery') {
        pTimer--;
        if (pTimer <= 0) pState = 'idle';
      } else if (pState === 'idle') {
        px += mx * 3.6;
        py += my * 3.6;
      }

      // Keep player inside arena
      px = Math.max(40, Math.min(canvas.width - 40, px));
      py = Math.max(40, Math.min(canvas.height - 40, py));

      // Boss Finite State Machine
      const dist = Math.hypot(px - bx, py - by);
      if (bState === 'chase') {
        const bSpeed = 1.6;
        bx += ((px - bx) / Math.max(1, dist)) * bSpeed;
        by += ((py - by) / Math.max(1, dist)) * bSpeed;

        if (dist < 110) {
          bState = 'telegraph';
          bTimer = telegraphFrames;
          courseAudio.playClick(320);
        }
      } else if (bState === 'telegraph') {
        bTimer--;
        if (bTimer <= 0) {
          bState = 'active';
          bTimer = 10;
          courseAudio.playHit(true);
          if (dist < 95 && pState !== 'dash') {
            pHp = Math.max(0, pHp - 25);
            setPlayerHp(pHp);
            shake = 8;
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
          bTimer = 42;
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

      // Render: Light documentation canvas
      ctx.save();
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.translate(sx, sy);

      // Arena floor outline
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 125, 0, Math.PI * 2);
      ctx.stroke();

      // Boss Telegraph & AoE Circle
      if (bState === 'telegraph') {
        const progress = 1 - bTimer / telegraphFrames;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(bx, by, 95, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.beginPath();
        ctx.arc(bx, by, 95 * progress, 0, Math.PI * 2);
        ctx.fill();
      } else if (bState === 'active') {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
        ctx.beginPath();
        ctx.arc(bx, by, 95, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Boss
      ctx.save();
      ctx.translate(bx, by);
      ctx.fillStyle =
        bState === 'telegraph'
          ? '#d97706'
          : bState === 'active'
          ? '#dc2626'
          : bState === 'recovery'
          ? '#2563eb'
          : '#7c3aed';
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 10px Segoe UI, monospace';
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
        ctx.strokeStyle = pState === 'active' ? spec.color : '#94a3b8';
        ctx.fillStyle = pState === 'active' ? `${spec.color}33` : '#cbd5e133';
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
          ? '#0284c7'
          : pState === 'recovery'
          ? '#64748b'
          : '#16a34a';
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.font = '10px Segoe UI, monospace';
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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="border-b border-zinc-200 pb-5 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-mono font-bold text-blue-700">
            MODULE 03 • ESTIMATED STUDY TIME: 2.0 HOURS
          </span>
          <span className="text-xs font-mono text-zinc-500">
            Decision Spaces (Sid Meier), Combat Frame Systems, Level Graph Topology
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
          Decisions, Space &amp; Imperfect Information: Frame Data, Telegraphs &amp; Graph Topology
        </h1>
        <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
          Sid Meier famously defined game design as <strong>"a series of interesting decisions."</strong>
          To an engineer, what distinguishes an "interesting" decision from a trivial calculation (A &gt; B) or a coin toss?
          This module formalizes combat risk-reward through <strong>Startup/Active/Recovery Automata</strong>, <strong>Cognitive Affordances</strong>, and <strong>Level Graph Topologies</strong>.
        </p>
      </header>

      {/* Comprehensive Academic Textbook Chapter */}
      <section>
        <Module3Content />
      </section>

      {/* Section 3.1: Combat Frame Data */}
      <section className="space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Swords className="h-4 w-4" />
            <span>3.1 Action Combat Automata &mdash; Startup, Active &amp; Recovery Frames</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-950 mt-1">
            Why Instant Attacks Destroy Depth: The 3-Phase Action Automaton
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="text-amber-700 font-bold">1. STARTUP FRAMES (Telegraph)</div>
            <div className="text-zinc-950 text-sm font-bold">Commitment &amp; Readability</div>
            <p className="text-zinc-600 font-sans">
              Wind-up animation before hitbox emission. Provides &ge; 200ms for defender reaction and locks the attacker into a spatial commitment.
            </p>
            <div className="font-sans border-l-2 border-amber-500 bg-amber-50/50 pl-2 py-1 text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Use a 1.5s animated conveyor wind-up when a child taps &ldquo;Serve Order!&rdquo; so they count their blocks and predict the result before it arrives.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="text-red-700 font-bold">2. ACTIVE FRAMES (Hitbox)</div>
            <div className="text-zinc-950 text-sm font-bold">Spatial Intersection Window</div>
            <p className="text-zinc-600 font-sans">
              The discrete interval where the collision volume is active in world space. High damage attacks typically possess narrower active windows.
            </p>
            <div className="font-sans border-l-2 border-red-500 bg-red-50/50 pl-2 py-1 text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Animate the blocks or coding puppy stepping across each bridge tile one by one with musical chimes so children can count along.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="text-blue-700 font-bold">3. RECOVERY FRAMES (Punish Cost)</div>
            <div className="text-zinc-950 text-sm font-bold">Vulnerability Opportunity Cost</div>
            <p className="text-zinc-600 font-sans">
              Upon whiff or block, attacker cannot act for F<sub>recovery</sub> frames. Frame Advantage is &Delta;F = F<sub>stun</sub> &minus; F<sub>recovery</sub>.
            </p>
            <div className="font-sans border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Use a gentle 1.5s reset animation when a guess doesn&rsquo;t fit so impulsive button-mashing is slower than counting once carefully.
            </div>
          </div>
        </div>

        {/* Interactive Diagram 3.1 */}
        <div className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-blue-700 font-semibold">Interactive Figure 3.1</span>
              <h3 className="text-base font-bold text-zinc-950">Combat Frame-Data Strip &amp; Advantage Calculator (&Delta;F)</h3>
            </div>
            <div className="flex gap-2 text-xs font-mono">
              <span className={`px-2 py-0.5 rounded border font-semibold ${frameAdvantageOnHit >= 0 ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-red-50 border-red-300 text-red-800'}`}>
                On Hit: {frameAdvantageOnHit >= 0 ? `+${frameAdvantageOnHit}` : frameAdvantageOnHit}f
              </span>
              <span className={`px-2 py-0.5 rounded border font-semibold ${frameAdvantageOnBlock >= 0 ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-red-50 border-red-300 text-red-800'}`}>
                On Block: {frameAdvantageOnBlock >= 0 ? `+${frameAdvantageOnBlock}` : frameAdvantageOnBlock}f {frameAdvantageOnBlock <= -10 ? '(PUNISHABLE)' : '(SAFE)'}
              </span>
            </div>
          </div>

          {/* Frame Meter Strip */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1 p-2 rounded-lg bg-zinc-50 border border-zinc-200">
              {Array.from({ length: totalFrames }).map((_, idx) => {
                const frameNum = idx + 1;
                const isStartup = frameNum <= startupFrames;
                const isActive = frameNum > startupFrames && frameNum <= startupFrames + activeFrames;
                const isSelected = frameNum === scrubFrame;

                return (
                  <div
                    key={frameNum}
                    onClick={() => setScrubFrame(frameNum)}
                    className={`h-8 flex-1 min-w-[14px] rounded flex items-center justify-center text-[10px] font-mono font-bold cursor-pointer transition ${
                      isStartup
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : isActive
                        ? 'bg-red-600 text-white'
                        : 'bg-blue-100 text-blue-900 border border-blue-300'
                    } ${isSelected ? 'ring-2 ring-blue-600 scale-105 z-10' : 'opacity-85 hover:opacity-100'}`}
                    title={`Frame ${frameNum}`}
                  >
                    {frameNum}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-700">Startup</span>
                  <span className="text-amber-800 font-bold">{startupFrames}f ({Math.round(startupFrames * 16.6)}ms)</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="25"
                  value={startupFrames}
                  onChange={(e) => setStartupFrames(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-700">Active</span>
                  <span className="text-red-700 font-bold">{activeFrames}f</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={activeFrames}
                  onChange={(e) => setActiveFrames(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-700">Recovery</span>
                  <span className="text-blue-700 font-bold">{recoveryFrames}f</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={recoveryFrames}
                  onChange={(e) => setRecoveryFrames(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-700">Defender Blockstun</span>
                  <span className="text-emerald-700 font-bold">{blockStunFrames}f</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={blockStunFrames}
                  onChange={(e) => setBlockStunFrames(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3.2: Level Graph Topology */}
      <section className="space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <GitBranch className="h-4 w-4" />
            <span>3.2 Spatial Topology &mdash; Level Design as Directed Graphs</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-950 mt-1">
            Chokepoints (Cut Vertices), Flanking Cycles &amp; Lock-and-Key Loops
          </h2>
        </div>

        <div className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-blue-700 font-semibold">Interactive Figure 3.2</span>
              <h3 className="text-base font-bold text-zinc-950">Topological Graph Comparison</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLevelGraphMode('linear')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition ${
                  levelGraphMode === 'linear'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                Topology A: Linear Tree (Zero Agency)
              </button>
              <button
                onClick={() => setLevelGraphMode('looped_metroidvania')}
                className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition ${
                  levelGraphMode === 'looped_metroidvania'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                Topology B: Cyclic Lock-and-Key Graph
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-zinc-200 bg-zinc-50 rounded-lg p-4">
            <svg viewBox="0 0 780 220" className="w-full min-w-[600px] h-auto">
              {levelGraphMode === 'linear' ? (
                <>
                  <text x="30" y="30" fill="#92400e" fontSize="11" fontFamily="Segoe UI, monospace" fontWeight="bold">
                    LINEAR CORRIDOR: Every node is a Cut Vertex &bull; Zero navigational choice
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
                        <line x1={node.x + 36} y1="115" x2={arr[i + 1].x - 36} y2="115" stroke="#94a3b8" strokeWidth="2.5" />
                      )}
                      <circle cx={node.x} cy="115" r="32" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
                      <text x={node.x} y="119" fill="#0f172a" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle">
                        {node.label}
                      </text>
                    </g>
                  ))}
                </>
              ) : (
                <>
                  <text x="30" y="28" fill="#1d4ed8" fontSize="11" fontFamily="Segoe UI, monospace" fontWeight="bold">
                    CYCLIC LOCK-AND-KEY GRAPH: Hub + Flanking Loop + One-Way Shortcut Valve
                  </text>
                  <line x1="110" y1="120" x2="260" y2="120" stroke="#2563eb" strokeWidth="2.5" />
                  <line x1="260" y1="120" x2="430" y2="60" stroke="#2563eb" strokeWidth="2.5" />
                  <line x1="260" y1="120" x2="430" y2="180" stroke="#d97706" strokeWidth="2" strokeDasharray="5 4" />
                  <line x1="430" y1="60" x2="600" y2="120" stroke="#2563eb" strokeWidth="2.5" />
                  <line x1="430" y1="180" x2="600" y2="120" stroke="#059669" strokeWidth="2.5" />
                  <line x1="600" y1="120" x2="715" y2="120" stroke="#dc2626" strokeWidth="2.5" />

                  <circle cx="110" cy="120" r="30" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                  <text x="110" y="124" fill="#0f172a" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle">Spawn</text>

                  <circle cx="260" cy="120" r="34" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" />
                  <text x="260" y="116" fill="#0f172a" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle">Central</text>
                  <text x="260" y="130" fill="#4f46e5" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">Hub (d=3)</text>

                  <circle cx="430" cy="60" r="32" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                  <text x="430" y="57" fill="#0f172a" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">Main Path</text>
                  <text x="430" y="71" fill="#64748b" fontSize="9" fontFamily="Segoe UI, monospace" textAnchor="middle">(Guarded)</text>

                  <circle cx="430" cy="180" r="32" fill="#ffffff" stroke="#059669" strokeWidth="2" />
                  <text x="430" y="177" fill="#0f172a" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">Shortcut</text>
                  <text x="430" y="191" fill="#059669" fontSize="9" fontFamily="Segoe UI, monospace" textAnchor="middle">(1-Way Valve)</text>

                  <circle cx="600" cy="120" r="32" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                  <text x="600" y="124" fill="#0f172a" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">Pre-Boss</text>

                  <circle cx="715" cy="120" r="30" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />
                  <text x="715" y="124" fill="#0f172a" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle">Boss</text>
                </>
              )}
            </svg>
          </div>
        </div>
      </section>

      {/* Playable Lab 3 */}
      <section className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-blue-700 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Laboratory 3.1 &bull; Hands-On Experiment</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-950 mt-0.5">
              Pareto-Balanced Weapons &amp; Boss Telegraph Windows
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="border border-zinc-200 bg-zinc-50 px-3 py-1.5 rounded text-xs font-mono">
              Your HP: <strong className="text-emerald-700">{playerHp}</strong> &bull; Boss HP: <strong className="text-red-700">{bossHp}</strong>
            </div>
            {isLabDone ? (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" /> Lab Boss Defeated! ({duelWins}x)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-300 px-3 py-1.5 text-xs font-mono text-amber-900">
                Goal: Defeat the Arena Boss
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-zinc-700 leading-relaxed">
          Move with <kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">WASD</kbd>, attack with <kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">J</kbd> / <kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">Space</kbd> (or click), and dodge with <kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">K</kbd> / <kbd className="rounded bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-mono text-xs">Shift</kbd>.
          Observe the expanding red <strong>Telegraph Ring</strong>, dash outside the zone before impact, and strike during the boss's blue <strong>VULNERABLE (Recovery)</strong> window for 1.5&times; punish damage.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 space-y-3">
            <canvas
              ref={canvasRef}
              width={560}
              height={320}
              className="w-full rounded border border-zinc-300 bg-zinc-50 cursor-crosshair shadow-sm"
            />
          </div>

          <div className="lg:col-span-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
            <div className="text-xs font-mono uppercase text-blue-700 font-bold border-b border-zinc-200 pb-2">
              1. Weapon Archetypes (Pareto Frontier)
            </div>

            <div className="space-y-2">
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
                    className={`rounded border p-2.5 transition cursor-pointer ${
                      active
                        ? 'border-blue-600 bg-blue-50/60'
                        : 'border-zinc-200 bg-white hover:bg-zinc-100'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-bold text-zinc-950">
                      <span>{w.name}</span>
                      <span className="font-mono text-blue-700 font-bold">DMG: {w.damage}</span>
                    </div>
                    <div className="mt-1 flex gap-3 text-[11px] font-mono text-zinc-600">
                      <span>Startup: {w.startup}f</span>
                      <span>Reach: {w.range}px</span>
                      <span>Recovery: {w.recovery}f</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-zinc-200">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Boss Telegraph Window</span>
                <span className="text-blue-700 font-bold">{bossTelegraphMs} ms</span>
              </div>
              <input
                type="range"
                min="100"
                max="650"
                step="20"
                value={bossTelegraphMs}
                onChange={(e) => setBossTelegraphMs(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Telegraph windows below 180ms breach the human 240ms perception-motor loop, rendering attacks unpredictable and frustrating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 pt-6 mt-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('module-2')}
            className="inline-flex items-center gap-2 rounded border border-zinc-300 bg-white hover:bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-800 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Module 02</span>
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
            <span>{isModuleDone ? 'Module 03 Complete' : 'Mark Module 03 Theory Complete'}</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('module-4')}
          className="inline-flex items-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition cursor-pointer"
        >
          <span>Next: Module 04 (Systems, Internal Economies &amp; Feedback)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
