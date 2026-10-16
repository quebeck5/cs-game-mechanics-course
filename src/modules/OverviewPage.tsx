import React from 'react';
import { COURSE_MODULES, PageId } from '../data/courseData';
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  FileText
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
    <article className="space-y-8 text-zinc-900 leading-normal">
      {/* Article Header */}
      <div className="border-b border-zinc-200 pb-5">
        <div className="text-xs font-semibold text-blue-700 tracking-wider uppercase mb-1">
          Technical Syllabus &amp; Course Architecture
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
          Game Mechanics &amp; Systems Architecture: Engineering Virtual Sensation
        </h1>
        <p className="text-sm text-zinc-600 mt-2 font-mono">
          Course ID: CS-404 • Prerequisites: Data Structures, Algorithms, Discrete Mathematics • Total Duration: 10 Hours
        </p>
      </div>

      {/* Preface / Introduction */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-1.5">
          Preface: The Fundamental Inversion
        </h2>
        <p className="text-sm leading-relaxed text-zinc-800">
          This course is authored specifically for computer science graduates transitioning into interactive simulation and game development.
          In traditional computer science, engineering is governed by <strong>optimization and latency elimination</strong>:
          the goal is to move a user from State A to State B with minimal friction and minimal state-space complexity.
        </p>
        <p className="text-sm leading-relaxed text-zinc-800">
          In interactive game mechanics, this doctrine is inverted.
          As philosopher Bernard Suits formulated in <em>The Grasshopper</em> (1978), playing a game is the voluntary attempt to overcome <em>unnecessary obstacles</em>.
          If an enterprise engineer were tasked with optimizing <em>Super Mario Bros.</em>, the optimal solution would be a single button that triggers the victory screen immediately.
          In game development, <strong>friction is the entire medium</strong>: the engineer's objective is to construct formal mathematical rules whose dynamic interaction evokes targeted psychological and physical sensations.
        </p>
      </section>

      {/* Clear SVG Architecture Diagram (Light Mode Technical Style) */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900">
          Figure 1-1: Architectural Comparison of Enterprise Software vs. Game Mechanics
        </h3>
        <div className="rounded border border-zinc-300 bg-zinc-50 p-3 overflow-x-auto">
          <svg viewBox="0 0 860 220" className="w-full min-w-[640px] h-auto">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
              <marker id="arrowGray" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#71717a" />
              </marker>
            </defs>

            {/* Top track */}
            <rect x="15" y="15" width="830" height="75" rx="4" fill="#ffffff" stroke="#d4d4d8" />
            <text x="30" y="35" fill="#71717a" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
              1. ENTERPRISE SOFTWARE PIPELINE: LATENCY &amp; FRICTION MINIMIZATION
            </text>
            <rect x="30" y="45" width="160" height="32" rx="3" fill="#f4f4f5" stroke="#a1a1aa" />
            <text x="110" y="66" fill="#18181b" fontSize="12" textAnchor="middle">User Intent (State A)</text>

            <line x1="195" y1="61" x2="640" y2="61" stroke="#71717a" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrowGray)" />
            <text x="415" y="55" fill="#71717a" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
              Shortest Path • Zero Friction • O(1) Time Complexity
            </text>

            <rect x="650" y="45" width="180" height="32" rx="3" fill="#f4f4f5" stroke="#a1a1aa" />
            <text x="740" y="66" fill="#18181b" fontSize="12" textAnchor="middle">Objective Reached (State B)</text>

            {/* Bottom track */}
            <rect x="15" y="105" width="830" height="100" rx="4" fill="#ffffff" stroke="#93c5fd" />
            <text x="30" y="125" fill="#1d4ed8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
              2. GAME MECHANICS PIPELINE: THE CYBERNETIC MDA LOOP (HUNICKE ET AL., 2004)
            </text>

            <rect x="30" y="140" width="165" height="50" rx="3" fill="#eff6ff" stroke="#3b82f6" />
            <text x="112" y="160" fill="#1e3a8a" fontSize="11" textAnchor="middle" fontWeight="bold">1. Mechanics (M)</text>
            <text x="112" y="176" fill="#3b82f6" fontSize="10" fontFamily="monospace" textAnchor="middle">Rules, FSMs, Physics</text>

            <line x1="200" y1="165" x2="255" y2="165" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="260" y="140" width="170" height="50" rx="3" fill="#eff6ff" stroke="#3b82f6" />
            <text x="345" y="160" fill="#1e3a8a" fontSize="11" textAnchor="middle" fontWeight="bold">2. Sub-Second Feel (3Cs)</text>
            <text x="345" y="176" fill="#3b82f6" fontSize="10" fontFamily="monospace" textAnchor="middle">240ms Loop, ADSR</text>

            <line x1="435" y1="165" x2="490" y2="165" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="495" y="140" width="165" height="50" rx="3" fill="#eff6ff" stroke="#3b82f6" />
            <text x="577" y="160" fill="#1e3a8a" fontSize="11" textAnchor="middle" fontWeight="bold">3. Dynamics (D)</text>
            <text x="577" y="176" fill="#3b82f6" fontSize="10" fontFamily="monospace" textAnchor="middle">Emergent Runtime State</text>

            <line x1="665" y1="165" x2="715" y2="165" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="720" y="140" width="115" height="50" rx="3" fill="#eff6ff" stroke="#3b82f6" />
            <text x="777" y="160" fill="#1e3a8a" fontSize="11" textAnchor="middle" fontWeight="bold">4. Aesthetics (A)</text>
            <text x="777" y="176" fill="#3b82f6" fontSize="10" fontFamily="monospace" textAnchor="middle">Neurobiology, Fun</text>
          </svg>
        </div>
      </section>

      {/* Curriculum Table of Contents */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-1.5">
          Curriculum Breakdown: The 5 Modules
        </h2>
        <p className="text-sm text-zinc-700">
          The course is divided into five 2-hour instructional modules. Each module pairs rigorous theoretical foundations with an interactive sandbox lab where students inspect and calibrate parameters in real time.
        </p>

        <div className="border border-zinc-200 rounded divide-y divide-zinc-200 bg-white">
          {coreModules.map((mod, idx) => {
            const isDone = !!completedModules[mod.id];

            return (
              <div key={mod.id} className="p-4 sm:p-5 hover:bg-zinc-50 transition">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Module {idx + 1}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">
                      {mod.hours}
                    </span>
                    {isDone && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                        <CheckCircle2 className="h-3 w-3" /> Completed
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onNavigate(mod.id)}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                  >
                    <span>Open Chapter</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-zinc-950 mt-1">
                  {mod.title}
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  {mod.subtitle}
                </p>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="bg-zinc-50 border border-zinc-200 rounded p-2">
                    <span className="font-semibold text-zinc-700">Computer Science Concepts:</span>{' '}
                    <span className="text-zinc-600">{mod.csConcepts.join(', ')}</span>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 rounded p-2">
                    <span className="font-semibold text-zinc-700">Game Design Frameworks:</span>{' '}
                    <span className="text-zinc-600">{mod.gameDesignConcepts.join(', ')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* University Pedigree Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-1.5">
          Academic Sources &amp; Literature Foundations
        </h2>
        <div className="border border-zinc-200 rounded overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-zinc-100 text-zinc-700 border-b border-zinc-200 font-semibold">
              <tr>
                <th className="py-2.5 px-3">University / Text</th>
                <th className="py-2.5 px-3">Primary Authors</th>
                <th className="py-2.5 px-3">Core Contribution Adopted in Course</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-700">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-zinc-900">MIT CMS.608 / 6.073</td>
                <td className="py-2.5 px-3">Philip Tan, Jason Begy</td>
                <td className="py-2.5 px-3">Treating games as formal cybernetic state machines; MDA framework; rule pruning.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-zinc-900">Stanford CS146 / CS247G</td>
                <td className="py-2.5 px-3">Christina Wodtke</td>
                <td className="py-2.5 px-3">Playcentric human-computer interaction, spatial metrics, and mechanical prototyping.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-zinc-900">Game Feel (2008)</td>
                <td className="py-2.5 px-3">Steve Swink</td>
                <td className="py-2.5 px-3">The 240ms Human Processor Loop, ADSR control profiles, virtual tactile feedback.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-zinc-900">Game Mechanics (2012)</td>
                <td className="py-2.5 px-3">Ernest Adams, Joris Dormans</td>
                <td className="py-2.5 px-3">Machinations visual language for internal resource economies (Sources, Pools, Drains).</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-zinc-900">A Theory of Fun (2004)</td>
                <td className="py-2.5 px-3">Raph Koster</td>
                <td className="py-2.5 px-3">Neurobiological pattern recognition and Shannon entropy reduction as the basis of fun.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-zinc-200 flex justify-between items-center">
        <button
          onClick={() => onNavigate('rosetta-library')}
          className="text-xs text-zinc-600 hover:text-zinc-900 flex items-center gap-1 cursor-pointer"
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>View CS ↔ Game Design Rosetta Stone</span>
        </button>

        <button
          onClick={() => onNavigate('module-1')}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span>Begin Chapter 1: Deconstructing "Fun"</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
};
