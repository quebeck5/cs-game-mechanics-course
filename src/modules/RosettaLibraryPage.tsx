import React, { useState } from 'react';
import { ROSETTA_ENTRIES, PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Award,
  CheckCircle2,
  ArrowLeft,
  Terminal,
  GraduationCap,
  HelpCircle,
  Sparkles
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
      'In Hunicke, LeBlanc, and Zubek’s MDA Framework, why is debugging "un-fun gameplay" akin to debugging a compiler pipeline in reverse?',
    options: [
      'Because players read your C++/TypeScript source code before experiencing the visual graphics.',
      'Because engineers only author Mechanics (rules/code), which interact at runtime to produce Dynamics, which finally evoke Aesthetics (player emotion).',
      'Because Aesthetics must be hardcoded using pairwise if-else statements before writing any physics equations.',
      'Because Dynamics are deterministic and never depend on human input.'
    ],
    correctIndex: 1,
    explanation:
      'Designers control Mechanics directly, but players experience Aesthetics first. Tuning a game requires tracing an Aesthetic symptom back through emergent Dynamics to the root Mechanic.'
  },
  {
    id: 'q2',
    question:
      'A playtester complains that jumping in your platformer feels "floaty and unresponsive," and that pressing Jump right as they leave a ledge drops their input. Which engineering fix addresses both issues?',
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
      'In a fighting or action game, your Heavy Hammer has 22 Startup frames, 5 Active frames, and 26 Recovery frames. If an opponent blocks it and suffers 12 frames of Blockstun, what is your Frame Advantage (ΔF)?',
    options: [
      '+14 frames (you can attack again before the opponent recovers).',
      '-14 frames (you remain vulnerable in Recovery for 14 frames after the opponent can act, making the move punishable on block).',
      '0 frames (both characters recover simultaneously).',
      '+27 frames.'
    ],
    correctIndex: 1,
    explanation:
      'Frame Advantage ΔF = F_blockstun - F_recovery = 12 - 26 = -14 frames. Any opponent with a move whose Startup is ≤ 14 frames can land a guaranteed punish.'
  },
  {
    id: 'q4',
    question:
      'In Adams & Dormans’ Machinations framework, what happens when an internal economy has a strong Positive Feedback loop (Kills → Gold → Weapon Power → Faster Kills) with zero Negative Feedback Drains?',
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
      'Why do games like Dota 2 and Warcraft III use a Markov Pseudo-Random Distribution P(N) = C · N for a 25% critical hit passive instead of `Math.random() < 0.25`?',
    options: [
      'Because standard pseudo-random number generators cannot generate floats between 0 and 1.',
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
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      courseAudio.playClick(340);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1 text-xs font-mono font-bold text-white">
            ENGINEERING REFERENCE & CERTIFICATION
          </span>
          <span className="text-xs font-mono text-slate-400">
            CS-to-Game-Design Rosetta Stone • Annotated Bibliography • Final Exam
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The CS-to-Game-Design Rosetta Stone & Mastery Certification
        </h1>
        <p className="text-slate-300 max-w-4xl leading-relaxed">
          Bookmark this page as your permanent lookup table whenever architecting a new game prototype, diagnosing why a mechanic feels flat, or balancing an internal economy.
        </p>
      </header>

      {/* Complete Rosetta Stone Matrix */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
          <Terminal className="h-4 w-4" />
          <span>Part 1: The Complete CS ↔ Game Mechanics Translation Matrix</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3.5 px-4">Domain</th>
                <th className="py-3.5 px-4">CS Mental Model & Math</th>
                <th className="py-3.5 px-4">Game Design Equivalent</th>
                <th className="py-3.5 px-4">The Engineering Paradigm Shift</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {ROSETTA_ENTRIES.map((row) => (
                <tr key={row.domain} className="hover:bg-slate-900/90 transition">
                  <td className="py-4 px-4 font-mono font-bold text-indigo-300 whitespace-nowrap">
                    {row.domain}
                  </td>
                  <td className="py-4 px-4 space-y-1">
                    <div className="font-semibold text-white">{row.csConcept}</div>
                    <code className="inline-block rounded bg-slate-950 px-2 py-0.5 text-[11px] text-cyan-300 border border-slate-800">
                      {row.csFormalism}
                    </code>
                  </td>
                  <td className="py-4 px-4 space-y-1">
                    <div className="font-bold text-emerald-300">{row.gameConcept}</div>
                    <div className="text-[11px] font-mono text-slate-400">{row.bookReference}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-300 leading-relaxed max-w-md">
                    {row.paradigmShift}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Annotated Bibliography & University Courses */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400">
          <BookOpen className="h-4 w-4" />
          <span>Part 2: Annotated Bibliography & University Syllabi Used in This Course</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Game Feel: A Game Designer’s Guide to Virtual Sensation (2008)',
              author: 'Steve Swink',
              why: 'The definitive engineering treatise on the 240ms human perceptual-motor loop, ADSR movement envelopes, Simulated Space, and Polish/Juice.'
            },
            {
              title: 'Game Mechanics: Advanced Game Design (2012)',
              author: 'Ernest Adams & Joris Dormans',
              why: 'Introduces Machinations (Turing-complete Petri-net resource graphs) for formalizing internal economies, converters, drains, and feedback loops.'
            },
            {
              title: 'A Theory of Fun for Game Design (2004)',
              author: 'Raph Koster',
              why: 'Frames "Fun" via neuroscience and Shannon information theory: the dopaminergic reward of compressing non-trivial state-space patterns.'
            },
            {
              title: 'The Gamer’s Brain: How Neuroscience and UX Can Impact Video Game Design (2017)',
              author: 'Celia Hodent',
              why: 'Separates cognitive ergonomics (working memory 4±1 chunks, signposting, affordances) from Self-Determination Theory and Flow.'
            },
            {
              title: 'Rules of Play: Game Design Fundamentals (2003)',
              author: 'Katie Salen & Eric Zimmerman',
              why: 'The foundational MIT Press textbook on games as cybernetic systems, emergent complexity, and information theory.'
            },
            {
              title: 'Game Programming Patterns (2014)',
              author: 'Robert Nystrom',
              why: 'Bridges software engineering design patterns (Command, State/PDA, Observer, Update Method, Spatial Partition) directly to gameplay.'
            }
          ].map((book) => (
            <div key={book.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-1.5">
              <div className="text-sm font-bold text-white">{book.title}</div>
              <div className="text-xs font-mono text-indigo-400">{book.author}</div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">{book.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Certification Exam */}
      <section className="rounded-2xl border-2 border-indigo-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-indigo-400 font-bold">
              <GraduationCap className="h-4 w-4" />
              <span>CS-404 Capstone Mastery Assessment</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              5-Question Engineering Diagnostics Exam
            </h2>
          </div>

          {examSubmitted && (
            <div className={`rounded-xl px-4 py-2 text-xs font-mono font-bold border ${
              score >= 4
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
            }`}>
              Score: {score} / {EXAM_QUESTIONS.length} ({score >= 4 ? 'CERTIFIED SYSTEMS DESIGNER' : 'REVIEW RECOMMENDED'})
            </div>
          )}
        </div>

        <div className="space-y-6">
          {EXAM_QUESTIONS.map((q, qIdx) => {
            const picked = selectedAnswers[q.id];
            return (
              <div key={q.id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
                <div className="text-sm font-bold text-white">
                  <span className="text-indigo-400 font-mono mr-2">0{qIdx + 1}.</span>
                  {q.question}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = picked === oIdx;
                    const isCorrect = q.correctIndex === oIdx;

                    let btnStyle = 'border-slate-800 bg-slate-900/70 text-slate-300 hover:bg-slate-900';
                    if (examSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-500/60 bg-rose-950/30 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-indigo-500 bg-indigo-950/40 text-white';
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
                        className={`w-full text-left rounded-lg border p-3 text-xs transition cursor-pointer ${btnStyle}`}
                      >
                        <span className="font-mono font-bold mr-2">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {examSubmitted && (
                  <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 text-xs text-slate-300">
                    <strong className="text-cyan-400 font-mono">Engineering Rationale:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            onClick={handleSubmitExam}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition cursor-pointer"
          >
            <Award className="h-4 w-4" />
            <span>{examSubmitted ? 'Re-Grade Assessment' : 'Submit Capstone Assessment'}</span>
          </button>

          {examSubmitted && (
            <button
              onClick={() => {
                setExamSubmitted(false);
                setSelectedAnswers({});
              }}
              className="text-xs font-mono text-slate-400 hover:text-white underline cursor-pointer"
            >
              Reset Answers
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
