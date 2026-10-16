import React from 'react';
import { COURSE_MODULES, PageId } from '../data/courseData';
import {
  Terminal,
  BookOpen,
  Cpu,
  Gamepad2,
  GitBranch,
  Activity,
  Award,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface OverviewPageProps {
  onNavigate: (page: PageId) => void;
  completedModules: Record<string, boolean>;
  completedLabs: Record<string, boolean>;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onNavigate,
  completedModules,
  completedLabs,
}) => {
  const coreModules = COURSE_MODULES.filter((m) => m.id.startsWith('module-'));

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 p-8 shadow-2xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-indigo-300">
            <Terminal className="h-3.5 w-3.5" />
            <span>CS-404 • Post-Graduate Interactive Curriculum • 10 Hours Total</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Engineering <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">"Fun"</span>: Game Mechanics for Computer Scientists
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            You already know <strong className="text-white">Finite State Machines, Differential Equations, Graph Theory, Petri Nets, and Markov Chains</strong>.
            Why, then, do your first game prototypes feel stiff, floaty, or solvable in 30 seconds?
            This 10-hour intensive bridges your formal Computer Science education with the perceptual psychology, control theory, and systemic architectures of world-class game design.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('module-1')}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <Gamepad2 className="h-4 w-4" />
              <span>Start Module 01: Deconstructing "Fun"</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('rosetta-library')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 px-5 py-3 text-sm font-medium text-slate-200 transition cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-cyan-400" />
              <span>View CS ↔ Game Design Rosetta Stone</span>
            </button>
          </div>
        </div>
      </section>

      {/* The Core Paradigm Shift Diagram (SVG) */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">The Fundamental Inversion</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Why Great Software Engineers Write Un-Fun Games (At First)
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
            Bernard Suits (1978): "The voluntary attempt to overcome unnecessary obstacles"
          </span>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          For four years of Computer Science, you were trained to <strong className="text-rose-300">minimize latency, eliminate friction, and reduce state complexity</strong> so a user can move from Point A to Point B in $O(1)$ clicks.
          If you apply that mindset to a game, the optimal implementation of <em>Super Mario Bros.</em> is a single button that immediately renders the "You Win!" screen.
        </p>

        {/* Architectural Comparison SVG Diagram */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
          <svg viewBox="0 0 900 280" className="w-full min-w-[680px] h-auto">
            <defs>
              <linearGradient id="utilGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="gameGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <marker id="arrowGray" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
              <marker id="arrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#22d3ee" />
              </marker>
            </defs>

            {/* Top Track: Enterprise Software Engineering */}
            <rect x="20" y="20" width="860" height="100" rx="12" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
            <text x="40" y="46" fill="#94a3b8" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
              1. ENTERPRISE SOFTWARE / COMPILER MINDSET (MINIMIZE FRICTION & ENTROPY)
            </text>

            <rect x="40" y="62" width="160" height="42" rx="8" fill="#1e293b" stroke="#475569" />
            <text x="120" y="87" fill="#f8fafc" fontSize="13" textAnchor="middle" fontWeight="600">User Intent (State A)</text>

            <line x1="205" y1="83" x2="665" y2="83" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#arrowGray)" />
            <rect x="330" y="66" width="220" height="32" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="440" y="86" fill="#cbd5e1" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
              Shortest Path • O(1) • Zero Obstacles
            </text>

            <rect x="675" y="62" width="180" height="42" rx="8" fill="#1e293b" stroke="#475569" />
            <text x="765" y="87" fill="#f8fafc" fontSize="13" textAnchor="middle" fontWeight="600">Task Complete (State B)</text>

            {/* Bottom Track: Game Systems Engineering */}
            <rect x="20" y="140" width="860" height="125" rx="12" fill="#0f172a" stroke="#312e81" strokeWidth="1.5" />
            <text x="40" y="166" fill="#818cf8" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
              2. GAME MECHANICS / CYBERNETIC MINDSET (CRAFT MEANINGFUL FRICTION & PATTERN COMPRESSION)
            </text>

            {/* Spawn */}
            <rect x="40" y="185" width="135" height="58" rx="8" fill="#1e1b4b" stroke="#6366f1" />
            <text x="107" y="210" fill="#e0e7ff" fontSize="12" textAnchor="middle" fontWeight="bold">1. Mechanics (Code)</text>
            <text x="107" y="228" fill="#a5b4fc" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Rules, Physics, FSMs</text>

            <line x1="178" y1="214" x2="232" y2="214" stroke="#22d3ee" strokeWidth="2.5" markerEnd="url(#arrowCyan)" />

            {/* Sub-second loop */}
            <rect x="240" y="185" width="175" height="58" rx="8" fill="#083344" stroke="#06b6d4" />
            <text x="327" y="210" fill="#cffafe" fontSize="12" textAnchor="middle" fontWeight="bold">2. 3Cs & Game Feel</text>
            <text x="327" y="228" fill="#67e8f9" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">240ms Loop • ADSR • Juice</text>

            <line x1="418" y1="214" x2="468" y2="214" stroke="#22d3ee" strokeWidth="2.5" markerEnd="url(#arrowCyan)" />

            {/* Dynamics */}
            <rect x="475" y="185" width="180" height="58" rx="8" fill="#064e3b" stroke="#10b981" />
            <text x="565" y="210" fill="#d1fae5" fontSize="12" textAnchor="middle" fontWeight="bold">3. Dynamics (Runtime)</text>
            <text x="565" y="228" fill="#6ee7b7" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Emergence • Economies</text>

            <line x1="658" y1="214" x2="708" y2="214" stroke="#22d3ee" strokeWidth="2.5" markerEnd="url(#arrowCyan)" />

            {/* Aesthetics */}
            <rect x="715" y="185" width="145" height="58" rx="8" fill="#3b0764" stroke="#c084fc" />
            <text x="787" y="210" fill="#f3e8ff" fontSize="12" textAnchor="middle" fontWeight="bold">4. Aesthetics (Fun)</text>
            <text x="787" y="228" fill="#d8b4fe" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Flow • Dopamine ΔH</text>
          </svg>
        </div>
      </section>

      {/* Academic Pedigree & Research Foundations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Research & Curriculum Lineage</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Synthesized from 5 University Programs & 8 Foundational Texts</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-semibold">MIT CMS.608 / 6.073</div>
            <div className="font-bold text-white text-sm">Formal Rule Systems & Cybernetics</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Treats games as state machines governed by the <strong className="text-slate-200">MDA Framework</strong>, positive/negative cybernetic loops, and the simulation gap.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <div className="text-xs font-mono text-emerald-400 font-semibold">DigiPen GAT & Stanford CS146</div>
            <div className="font-bold text-white text-sm">The 3Cs, Metrics & Feel Engineering</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Focuses on <strong className="text-slate-200">Character, Camera, Controls</strong>, frame-accurate state machines, piecewise jump calculus, and Steve Swink's <em>Game Feel</em>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <div className="text-xs font-mono text-amber-400 font-semibold">USC CTIN 488 & CMU ETC</div>
            <div className="font-bold text-white text-sm">Playcentric Iteration & Lenses</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Combines Tracy Fullerton's <em>Game Design Workshop</em> formal elements with Jesse Schell's <em>Elemental Tetrad</em> and Celia Hodent's cognitive UX.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
            <div className="text-xs font-mono text-rose-400 font-semibold">Adams, Dormans & Koster</div>
            <div className="font-bold text-white text-sm">Machinations & Information Theory</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Models internal economies as Petri-net token graphs (<em>Game Mechanics: Advanced Game Design</em>) and fun as Shannon entropy compression (<em>A Theory of Fun</em>).
            </p>
          </div>
        </div>
      </section>

      {/* 10-Hour Course Syllabus Breakdown */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">10-Hour Interactive Syllabus</span>
            <h2 className="text-2xl font-bold text-white">5 Two-Hour Modules + Live Playable Engineering Labs</h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Every module includes formal theory, interactive mathematical visualizers, and a playable 60 FPS sandbox lab.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {coreModules.map((mod, index) => {
            const isModDone = !!completedModules[mod.id];
            const isLabDone = !!completedLabs[mod.id];

            return (
              <div
                key={mod.id}
                onClick={() => onNavigate(mod.id)}
                className="group relative rounded-2xl border border-slate-800 hover:border-indigo-500/50 bg-slate-900/80 hover:bg-slate-900 p-6 transition-all cursor-pointer shadow-lg"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`inline-flex items-center rounded-md bg-gradient-to-r ${mod.badgeColor} px-2.5 py-0.5 text-xs font-mono font-bold text-white`}>
                        {mod.code}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md">
                        <Clock className="h-3 w-3 text-indigo-400" />
                        {mod.hours}
                      </span>
                      {isModDone && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
                          <CheckCircle2 className="h-3 w-3" /> Theory Completed
                        </span>
                      )}
                      {isLabDone && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-md">
                          <Sparkles className="h-3 w-3" /> Lab Passed
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition">
                      {mod.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {mod.subtitle}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-3">
                        <div className="text-[11px] font-mono uppercase text-cyan-400 mb-1.5 flex items-center gap-1.5">
                          <Cpu className="h-3.5 w-3.5" /> CS Mental Models Used
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {mod.csConcepts.map((c) => (
                            <span key={c} className="text-xs bg-slate-900 text-slate-300 border border-slate-700/70 px-2 py-0.5 rounded">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-3">
                        <div className="text-[11px] font-mono uppercase text-purple-400 mb-1.5 flex items-center gap-1.5">
                          <Gamepad2 className="h-3.5 w-3.5" /> Game Mechanics Mastered
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {mod.gameDesignConcepts.map((g) => (
                            <span key={g} className="text-xs bg-slate-900 text-slate-300 border border-slate-700/70 px-2 py-0.5 rounded">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">
                    <div className="text-left lg:text-right">
                      <div className="text-xs font-mono text-slate-400">Interactive Lab #{index + 1}</div>
                      <div className="text-xs text-indigo-300 font-medium mt-0.5">60 FPS Live Sandbox + Diagrams</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-600 border border-indigo-500/30 px-4 py-2.5 text-xs font-semibold text-indigo-300 group-hover:text-white transition">
                      <span>Launch Module</span>
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Time Horizon Architecture Card */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
          <Activity className="h-4 w-4" />
          <span>Multi-Scale Systems Architecture</span>
        </div>
        <h3 className="text-xl font-bold text-white">
          How the 10 Hours Map to the Three Time Horizons of Play
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          A common mistake among novice developers is conflating <strong>Game Feel</strong> (milliseconds) with <strong>Tactical Gameplay</strong> (seconds/minutes) and <strong>Meta-Progression</strong> (hours). In this course, we engineer each frequency band independently before coupling them in Module 5:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-emerald-400">16ms – 500ms (60Hz Loop)</span>
              <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Modules 1 & 2</span>
            </div>
            <div className="text-base font-bold text-white">The Micro-Loop: Sensation & Toy</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Input polling, coyote time, jump buffering, ADSR velocity curves, piecewise gravity, hitstop frames, and camera damping. Even with zero enemies or goals, moving the character feels joyful.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-amber-400">2s – 120s (Tactical Loop)</span>
              <span className="text-[11px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">Module 3</span>
            </div>
            <div className="text-base font-bold text-white">The Core Loop: Decisions & Space</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Combat startup/active/recovery frames, enemy attack telegraphs, spacing, risk-reward expected value, Pareto-balanced weapon trade-offs, and spatial chokepoint topology.
            </p>
          </div>

          <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-purple-400">5m – 10h+ (Macro Loop)</span>
              <span className="text-[11px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">Modules 4 & 5</span>
            </div>
            <div className="text-base font-bold text-white">The Macro Loop: Economy & Meta</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Machinations resource flows (Sources, Pools, Converters, Drains), positive snowballing vs. negative rubber-banding, Markov PRD crit curves, and Monte Carlo balance telemetry.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
