import React, { useState } from 'react';
import { ROSETTA_ENTRIES, PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import {
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface RosettaLibraryProps {
  onNavigate: (page: PageId) => void;
  completedModules: Record<string, boolean>;
  completedLabs: Record<string, boolean>;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const EXAM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question:
      'In Hunicke, LeBlanc, and Zubek’s MDA Framework, why is debugging an un-fun game akin to debugging a compiler pipeline in reverse?',
    options: [
      'Because players read the C++/TypeScript source code before experiencing any visual outputs.',
      'Because engineers only author Mechanics (rules/code), which interact at runtime to produce Dynamics, which finally evoke Aesthetics (player emotion).',
      'Because Aesthetics must be hardcoded using pairwise if-else statements before writing any physics equations.',
      'Because Dynamics are deterministic and never depend on human input.'
    ],
    correctIndex: 1,
    explanation:
      'Designers control Mechanics directly, but players experience Aesthetics first. Diagnosing a game requires tracing an Aesthetic symptom back through emergent Dynamics to the root Mechanic.'
  },
  {
    id: 'q2',
    question:
      'A playtester complains that jumping in your platformer feels floaty and unresponsive, and that pressing Jump right as they leave a ledge drops their input. Which engineering fix addresses both issues?',
    options: [
      'Locking the camera rigidly to (player.x, player.y) and setting constant gravity g = 9.8 m/s².',
      'Parameterizing jump gravity via (H_max, t_peak) with ~2.4x falling gravity multiplier, plus adding a ~100ms Coyote Time window and ~100ms Input Buffer.',
      'Adding a 500ms startup delay before the character leaves the ground so the animation plays in full.',
      'Replacing all deterministic physics with Math.random() velocity impulses.'
    ],
    correctIndex: 1,
    explanation:
      'Asymmetric falling gravity eliminates floaty descent, while Coyote Time and Input Ring Buffers compensate for the ~240ms human perceptual-motor loop.'
  },
  {
    id: 'q3',
    question:
      'In an action combat system, your Heavy Hammer has 22 Startup frames, 5 Active frames, and 26 Recovery frames. If an opponent blocks it and suffers 12 frames of Blockstun, what is your Frame Advantage (ΔF)?',
    options: [
      '+14 frames (you can attack again before the opponent recovers).',
      '-14 frames (you remain vulnerable in Recovery for 14 frames after the opponent can act, making the move punishable on block).',
      '0 frames (both characters recover simultaneously).',
      '+27 frames.'
    ],
    correctIndex: 1,
    explanation:
      'Frame Advantage ΔF = F_blockstun - F_recovery = 12 - 26 = -14 frames. Any opponent with an attack whose Startup is ≤ 14 frames can land a guaranteed punish.'
  },
  {
    id: 'q4',
    question:
      'In Adams & Dormans’ Machinations framework, what occurs when an internal economy possesses a strong Positive Feedback loop (Kills → Gold → Weapon Power → Faster Kills) with zero Negative Feedback Drains?',
    options: [
      'The game achieves stable rubber-banding where trailing players can always catch up.',
      'Exponential runaway (dx/dt = +kx), causing early advantages to snowball and creating "Dead Time" where the winner is decided long before the match ends.',
      'The player’s resources oscillate in a perpetual harmonic sine wave.',
      'Shannon entropy increases to infinity.'
    ],
    correctIndex: 1,
    explanation:
      'Unchecked positive feedback destabilizes equilibrium. Pairing growth engines with upkeep drains or dynamic threat scaling preserves late-game tension.'
  },
  {
    id: 'q5',
    question:
      'Why do engines like Dota 2 and Warcraft III use a Markov Pseudo-Random Distribution P(N) = C · N for a 25% critical hit passive instead of standard independent random rolls?',
    options: [
      'Because standard pseudo-random number generators cannot generate floating point values between 0 and 1.',
      'To preserve the 25% long-run expected value while bounding the variance of extreme dry spells (15 misses in a row) and lucky first-hit bursts.',
      'To make critical hits happen 100% of the time on the first swing.',
      'To increase CPU cache misses during combat.'
    ],
    correctIndex: 1,
    explanation:
      'PRD starts with a low probability (C ≈ 8.5%) on the first attack and ramps linearly with each consecutive miss, eliminating frustrating geometric tail streaks.'
  }
];

export const RosettaLibraryPage: React.FC<RosettaLibraryProps> = ({
  onNavigate,
  completedModules,
  completedLabs,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);

  const score = EXAM_QUESTIONS.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    if (score >= 4) {
      courseAudio.playSuccess();
    } else {
      courseAudio.playClick(340);
    }
  };

  return (
    <article className="space-y-8 text-zinc-900 leading-normal">
      {/* Header */}
      <div className="border-b border-zinc-200 pb-5">
        <div className="text-xs font-semibold text-blue-700 tracking-wider uppercase mb-1">
          Technical Reference &amp; Certification
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
          The CS-to-Game-Design Rosetta Stone &amp; Technical Assessment
        </h1>
        <p className="text-sm text-zinc-600 mt-2">
          A formal mapping between standard computer science concepts and game systems architecture, paired with an annotated academic bibliography and diagnostic evaluation.
        </p>
      </div>

      {/* Rosetta Stone Table */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-1.5">
          1. The Conceptual Mapping Table
        </h2>
        <p className="text-sm text-zinc-700">
          The table below translates foundational computer science mental models into their exact gameplay architecture equivalents:
        </p>

        <div className="border border-zinc-200 rounded overflow-x-auto bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-zinc-100 text-zinc-700 border-b border-zinc-200 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Domain</th>
                <th className="py-2.5 px-3">Computer Science Formalism</th>
                <th className="py-2.5 px-3">Game Mechanics Equivalent</th>
                <th className="py-2.5 px-3">The Architectural Paradigm Shift</th>
                <th className="py-2.5 px-3">30&ndash;60 Min Primary-School Mini-Game Implementation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-700">
              {ROSETTA_ENTRIES.map((row) => (
                <tr key={row.domain} className="hover:bg-zinc-50">
                  <td className="py-3 px-3 font-semibold text-zinc-900 align-top whitespace-nowrap">
                    {row.domain}
                  </td>
                  <td className="py-3 px-3 align-top space-y-1">
                    <div className="font-semibold text-zinc-900">{row.csConcept}</div>
                    <code className="text-[11px] text-zinc-600 font-mono bg-zinc-100 px-1 py-0.5 rounded">
                      {row.csFormalism}
                    </code>
                  </td>
                  <td className="py-3 px-3 align-top space-y-0.5">
                    <div className="font-semibold text-blue-800">{row.gameConcept}</div>
                    <div className="text-[11px] text-zinc-500 font-mono">{row.bookReference}</div>
                  </td>
                  <td className="py-3 px-3 align-top text-zinc-700 leading-relaxed max-w-xs">
                    {row.paradigmShift}
                  </td>
                  <td className="py-3 px-3 align-top text-blue-950 bg-blue-50/30 leading-relaxed max-w-xs">
                    {row.educationalMiniGameImplementation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Annotated Bibliography */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-1.5">
          2. Annotated Academic Bibliography
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {[
            {
              title: 'Game Feel: A Game Designer’s Guide to Virtual Sensation (2008)',
              author: 'Steve Swink • Morgan Kaufmann',
              desc: 'Presents the 240ms human processor model, ADSR movement envelopes, and quantitative metrics for input response and spatial simulation.',
              eduApp: 'Compensate for young children’s developing fine-motor skills (ages 6–9) using generous 160ms Coyote Time, 32px magnetic snap targets, and tactile squash-and-stretch on number blocks.'
            },
            {
              title: 'Game Mechanics: Advanced Game Design (2012)',
              author: 'Ernest Adams & Joris Dormans • New Riders',
              desc: 'Defines Machinations: a formal visual Petri-net language to model, balance, and simulate internal resource economies.',
              eduApp: 'Expose picture-based Sources, Pools, Converters, and Drains directly on the tablet canvas to teach primary-school food chains (sunlight → plants → rabbits) or piggy-bank budgeting in 40 minutes.'
            },
            {
              title: 'A Theory of Fun for Game Design (2004)',
              author: 'Raph Koster • Paraglyph Press',
              desc: 'Formulates fun as cognitive pattern recognition and Shannon entropy reduction in the human nervous system.',
              eduApp: 'Track consecutive clean solves in primary-school math; as soon as a child compresses single-digit addition (H → 0), unlock a Super 10-Rod combiner tool and introduce two-digit place value.'
            },
            {
              title: 'The Gamer’s Brain: UX and Neuroscience (2017)',
              author: 'Celia Hodent • CRC Press',
              desc: 'Cognitive ergonomics in games: working memory bandwidth limits (4±1 chunks), perception thresholds, and self-determination theory.',
              eduApp: 'Respect children’s smaller working memory (2–3 chunks for ages 6–8) by replacing text walls with voiceover icons, shape-coded affordances, and a maximum of 2 HUD elements.'
            },
            {
              title: 'Rules of Play: Game Design Fundamentals (2003)',
              author: 'Katie Salen & Eric Zimmerman • MIT Press',
              desc: 'Comprehensive textbook on games as cybernetic systems, information theory in play, and emergent state-space complexity.',
              eduApp: 'Replace scary red "WRONG!" screens with sub-200ms physical feedback (a bridge wobbles if a fraction block is too small) and a friendly helper mascot that scaffolds struggling learners.'
            },
            {
              title: 'Game Programming Patterns (2014)',
              author: 'Robert Nystrom • Genever Benning',
              desc: 'Software design patterns applied to games: fixed timesteps, hierarchical state machines, command buffering, and bytecode interpreters.',
              eduApp: 'Build reusable 30–60 min primary-school science sandboxes using decoupled property tags ([Conductive, Magnetic, Floats]) and an Event Bus that logs teacher telemetry without touching physics code.'
            }
          ].map((b) => (
            <div key={b.title} className="p-3 border border-zinc-200 rounded bg-zinc-50 space-y-1.5">
              <div className="font-bold text-zinc-900">{b.title}</div>
              <div className="text-[11px] font-mono text-blue-700">{b.author}</div>
              <p className="text-zinc-600 leading-relaxed">{b.desc}</p>
              <div className="border-l-2 border-blue-500 bg-blue-50/60 pl-2.5 py-1 text-[11px] text-zinc-800">
                <strong className="text-blue-900">30&ndash;60 Min Primary-School Mini-Game:</strong> {b.eduApp}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capstone Assessment */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5">
          <h2 className="text-xl font-bold text-zinc-950">
            3. Diagnostic Technical Assessment
          </h2>
          {examSubmitted && (
            <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${
              score >= 4 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}>
              Score: {score} / {EXAM_QUESTIONS.length} ({score >= 4 ? 'Passed' : 'Needs Review'})
            </span>
          )}
        </div>

        <div className="space-y-4">
          {EXAM_QUESTIONS.map((q, qIdx) => {
            const picked = selectedAnswers[q.id];

            return (
              <div key={q.id} className="p-4 border border-zinc-200 rounded bg-white space-y-2.5">
                <div className="text-sm font-semibold text-zinc-900">
                  <span className="font-mono text-blue-700 mr-1.5">{qIdx + 1}.</span>
                  {q.question}
                </div>

                <div className="space-y-1.5">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = picked === oIdx;
                    const isCorrect = q.correctIndex === oIdx;

                    let rowStyle = 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800';
                    if (examSubmitted) {
                      if (isCorrect) rowStyle = 'border-emerald-500 bg-emerald-50/60 text-emerald-900 font-medium';
                      else if (isSelected && !isCorrect) rowStyle = 'border-rose-400 bg-rose-50/60 text-rose-900';
                    } else if (isSelected) {
                      rowStyle = 'border-blue-700 bg-blue-50 text-blue-900 font-medium';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => {
                          if (!examSubmitted) {
                            courseAudio.playClick(520);
                            setSelectedAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                          }
                        }}
                        className={`w-full text-left p-2.5 rounded border text-xs transition cursor-pointer flex items-start gap-2 ${rowStyle}`}
                      >
                        <span className="font-mono font-bold text-zinc-500">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span className="flex-1 leading-normal">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {examSubmitted && (
                  <div className="text-xs text-zinc-600 bg-zinc-50 p-2.5 rounded border border-zinc-200 mt-2">
                    <strong className="text-zinc-800">Rationale:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSubmitExam}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-semibold cursor-pointer"
          >
            {examSubmitted ? 'Re-Grade Assessment' : 'Submit Assessment'}
          </button>

          {examSubmitted && (
            <button
              onClick={() => {
                setExamSubmitted(false);
                setSelectedAnswers({});
              }}
              className="text-xs text-zinc-600 hover:text-zinc-900 underline cursor-pointer"
            >
              Reset Answers
            </button>
          )}
        </div>
      </section>
    </article>
  );
};
