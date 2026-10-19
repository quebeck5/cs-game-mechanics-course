import React, { useState } from 'react';
import { PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import {
  Dices,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Play,
  Sliders
} from 'lucide-react';
import { Module5Content } from '../content/Module5Content';

interface Module5Props {
  onNavigate: (page: PageId) => void;
  onCompleteModule: () => void;
  onCompleteLab: () => void;
  isModuleDone: boolean;
  isLabDone: boolean;
}

export const Module5ProbabilityBalance: React.FC<Module5Props> = ({
  onNavigate,
  onCompleteModule,
  onCompleteLab,
  isModuleDone,
  isLabDone,
}) => {
  // Interactive Diagram 5.1: True RNG vs Markov PRD vs Shuffle Bag
  const [rngTrialsDone, setRngTrialsDone] = useState<number>(0);
  const [rngStats, setRngStats] = useState<{
    trueRngMaxMissStreak: number;
    prdMaxMissStreak: number;
    bagMaxMissStreak: number;
    trueRngCrits: number;
    prdCrits: number;
    bagCrits: number;
    trueStreakHist: number[];
    prdStreakHist: number[];
  }>({
    trueRngMaxMissStreak: 17,
    prdMaxMissStreak: 9,
    bagMaxMissStreak: 6,
    trueRngCrits: 251,
    prdCrits: 249,
    bagCrits: 250,
    trueStreakHist: [62, 48, 35, 28, 21, 15, 11, 8, 6, 5, 4, 3],
    prdStreakHist: [12, 28, 49, 64, 52, 29, 11, 3, 1, 0, 0, 0],
  });

  // Lab 5: Monte Carlo Headless Balance Studio (3 Classes: Vanguard, Ranger, Arcanist)
  const [vanguardHp, setVanguardHp] = useState<number>(155);
  const [rangerCritPct, setRangerCritPct] = useState<number>(28);
  const [arcanistBurst, setArcanistBurst] = useState<number>(48);
  const [simResults, setSimResults] = useState<{
    vanguardWinPct: number;
    rangerWinPct: number;
    arcanistWinPct: number;
    runsCompleted: number;
  }>({
    vanguardWinPct: 44.2,
    rangerWinPct: 35.8,
    arcanistWinPct: 20.0,
    runsCompleted: 1000,
  });

  const runRngComparison = () => {
    courseAudio.playClick(640);
    const N = 1000;

    // 1. True Bernoulli RNG (p = 0.25)
    let trueCrits = 0;
    let curMiss = 0;
    let maxTrueMiss = 0;
    const trueHist = Array(12).fill(0);

    for (let i = 0; i < N; i++) {
      if (Math.random() < 0.25) {
        trueCrits++;
        const bucket = Math.min(11, curMiss);
        trueHist[bucket]++;
        curMiss = 0;
      } else {
        curMiss++;
        if (curMiss > maxTrueMiss) maxTrueMiss = curMiss;
      }
    }

    // 2. Markov PRD (P(N) = C * N, C = 0.08475 for 25% expected value)
    let prdCrits = 0;
    let prdN = 1;
    let maxPrdMiss = 0;
    const prdHist = Array(12).fill(0);
    const C = 0.08475;

    for (let i = 0; i < N; i++) {
      if (Math.random() < C * prdN) {
        prdCrits++;
        const missCount = prdN - 1;
        prdHist[Math.min(11, missCount)]++;
        prdN = 1;
      } else {
        if (prdN > maxPrdMiss) maxPrdMiss = prdN;
        prdN++;
      }
    }

    // 3. Shuffle Bag (Deck of 8 cards: 2 crits, 6 misses)
    let bagCrits = 0;
    let bagMiss = 0;
    let maxBagMiss = 0;
    let deck: boolean[] = [];

    for (let i = 0; i < N; i++) {
      if (deck.length === 0) {
        deck = [true, true, false, false, false, false, false, false];
        for (let j = deck.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [deck[j], deck[k]] = [deck[k], deck[j]];
        }
      }
      const draw = deck.pop()!;
      if (draw) {
        bagCrits++;
        bagMiss = 0;
      } else {
        bagMiss++;
        if (bagMiss > maxBagMiss) maxBagMiss = bagMiss;
      }
    }

    setRngTrialsDone((c) => c + N);
    setRngStats({
      trueRngMaxMissStreak: maxTrueMiss,
      prdMaxMissStreak: maxPrdMiss,
      bagMaxMissStreak: maxBagMiss,
      trueRngCrits: trueCrits,
      prdCrits,
      bagCrits,
      trueStreakHist: trueHist,
      prdStreakHist: prdHist,
    });
  };

  // Run 1,000 Headless Monte Carlo Bot Matches
  const runMonteCarloBots = () => {
    courseAudio.playClick(720);

    const vPower = vanguardHp * 0.92;
    const rPower = 95 + rangerCritPct * 1.48;
    const aPower = 72 + arcanistBurst * 1.42;

    let vWins = 0;
    let rWins = 0;
    let aWins = 0;

    const totalMatches = 1000;
    for (let i = 0; i < totalMatches; i++) {
      const vRoll = vPower * (0.82 + Math.random() * 0.36);
      const rRoll = rPower * (0.82 + Math.random() * 0.36);
      const aRoll = aPower * (0.82 + Math.random() * 0.36);

      if (vRoll >= rRoll && vRoll >= aRoll) vWins++;
      else if (rRoll >= vRoll && rRoll >= aRoll) rWins++;
      else aWins++;
    }

    const vPct = Number(((vWins / totalMatches) * 100).toFixed(1));
    const rPct = Number(((rWins / totalMatches) * 100).toFixed(1));
    const aPct = Number((100 - vPct - rPct).toFixed(1));

    setSimResults((prev) => ({
      vanguardWinPct: vPct,
      rangerWinPct: rPct,
      arcanistWinPct: aPct,
      runsCompleted: prev.runsCompleted + totalMatches,
    }));

    if (
      vPct >= 30 &&
      vPct <= 37 &&
      rPct >= 30 &&
      rPct <= 37 &&
      aPct >= 30 &&
      aPct <= 37
    ) {
      courseAudio.playSuccess();
      if (!isLabDone) onCompleteLab();
    }
  };

  const isMetaBalanced =
    simResults.vanguardWinPct >= 30 &&
    simResults.vanguardWinPct <= 37 &&
    simResults.rangerWinPct >= 30 &&
    simResults.rangerWinPct <= 37 &&
    simResults.arcanistWinPct >= 30 &&
    simResults.arcanistWinPct <= 37;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="border-b border-zinc-200 pb-5 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-mono font-bold text-blue-700">
            MODULE 05 • ESTIMATED STUDY TIME: 2.0 HOURS
          </span>
          <span className="text-xs font-mono text-zinc-500">
            Markov PRD, Shuffle Bags, Game Theory &amp; Monte Carlo Telemetry
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
          Probability Architecture, Game Theory &amp; Automated Telemetry Balancing
        </h1>
        <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
          Why do players complain of unfairness when a 90% accuracy attack misses twice consecutively, or accuse an RNG of being "broken" when it passes strict randomness tests?
          This final module bridges the divide between mathematical stochastics and human cognitive psychology using <strong>Input vs. Output Randomness</strong>, <strong>Markov Pseudo-Random Distributions (PRD)</strong>, and <strong>Automated Headless Simulation Pipelines</strong>.
        </p>
      </header>

      {/* Comprehensive Academic Textbook Chapter */}
      <section>
        <Module5Content />
      </section>

      {/* Section 5.1: Stochastic Engineering */}
      <section className="space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Dices className="h-4 w-4" />
            <span>5.1 Stochastic Engineering &mdash; Shaping Variance While Preserving Expected Value</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-950 mt-1">
            Why Independent Bernoulli Trials Feel Unfair &mdash; And How PRD Solves It
          </h2>
        </div>

        <p className="text-sm text-zinc-700 leading-relaxed">
          In an independent Bernoulli process with p = 0.25 (25% crit rate), the probability of missing 10 consecutive attacks is (0.75)<sup>10</sup> &asymp; 5.6%.
          Over a typical 20-minute match involving 300 attacks, a player is almost mathematically guaranteed to suffer an excruciating 12-to-16 miss drought.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="text-red-700 font-bold">1. TRUE RNG (Memoryless i.i.d.)</div>
            <div className="text-sm font-bold text-zinc-950">P(hit | N misses) = p = 0.25</div>
            <p className="text-zinc-600 font-sans">
              Geometric distribution with heavy right tail. Produces frustrating dry spells and bursty first-hit critical streaks.
            </p>
            <div className="font-sans border-l-2 border-red-500 bg-red-50/50 pl-2 py-1 text-zinc-800">
              <strong>30&ndash;60 Min Edu Mini-Game:</strong> Avoid raw <code>Math.random()</code> for small-sample classroom demos (<code>N &lt; 25</code>), as tail streaks skew empirical observations.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="text-blue-700 font-bold">2. MARKOV PRD (Valve / Blizzard)</div>
            <div className="text-sm font-bold text-zinc-950">P(N) = min(1.0, C &middot; N) (C &asymp; 0.085)</div>
            <p className="text-zinc-600 font-sans">
              Starts at 8.5% on hit 1 and increments by +8.5% per miss until reaching 100% at N=12. Eliminates both lucky openers and 15-miss droughts.
            </p>
            <div className="font-sans border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-zinc-800">
              <strong>30&ndash;60 Min Edu Mini-Game:</strong> Use Markov PRD so rare scientific events (e.g., 25% recessive traits) reliably manifest within 10–12 student trials.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="text-emerald-700 font-bold">3. SHUFFLE BAG (Tetris 7-Bag)</div>
            <div className="text-sm font-bold text-zinc-950">Sampling Without Replacement</div>
            <p className="text-zinc-600 font-sans">
              Places exact quotas into an array, Fisher-Yates shuffles it, and dispenses items sequentially. Enforces hard mathematical variance bounds.
            </p>
            <div className="font-sans border-l-2 border-emerald-500 bg-emerald-50/50 pl-2 py-1 text-zinc-800">
              <strong>30&ndash;60 Min Edu Mini-Game:</strong> Put all syllabus topic variants into a Fisher-Yates Shuffle Bag so 100% of learning objectives are covered in 45 minutes.
            </div>
          </div>
        </div>

        {/* Interactive Diagram 5.1 */}
        <div className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-blue-700 font-semibold">Interactive Figure 5.1</span>
              <h3 className="text-base font-bold text-zinc-950">Streak Histogram: True RNG vs. Markov PRD (E[X] = 25%)</h3>
            </div>
            <button
              onClick={runRngComparison}
              className="inline-flex items-center gap-1.5 rounded bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm cursor-pointer"
            >
              <Dices className="h-3.5 w-3.5" />
              <span>Simulate 1,000 New Attacks ({rngTrialsDone} run)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-7 border border-zinc-200 bg-zinc-50 rounded-lg p-4">
              <div className="text-xs font-mono text-zinc-600 mb-2 font-semibold">
                Distribution of Consecutive Misses Before Each Success (Buckets: 0 .. 11+ misses)
              </div>
              <div className="grid grid-cols-12 gap-1.5 items-end h-40 pt-4 px-2 border-b border-zinc-200">
                {rngStats.trueStreakHist.map((trueCount, idx) => {
                  const prdCount = rngStats.prdStreakHist[idx] || 0;
                  const maxH = 75;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full flex gap-0.5 items-end justify-center h-full">
                        <div
                          className="w-2.5 bg-red-400 rounded-t transition-all duration-300"
                          style={{ height: `${Math.min(100, (trueCount / maxH) * 100)}%` }}
                          title={`True RNG: ${trueCount}`}
                        />
                        <div
                          className="w-2.5 bg-blue-600 rounded-t transition-all duration-300"
                          style={{ height: `${Math.min(100, (prdCount / maxH) * 100)}%` }}
                          title={`Markov PRD: ${prdCount}`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">{idx === 11 ? '11+' : idx}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-600 pt-2">
                <span className="text-red-700">&bull; Red: True Math.random() (Heavy Right Tail)</span>
                <span className="text-blue-700">&bull; Blue: Markov PRD (Concentrated Near Mean)</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3.5 space-y-2 font-mono text-xs">
                <div className="text-zinc-600 font-semibold">EMPIRICAL RESULTS OVER 1,000 SWINGS:</div>
                <div className="flex justify-between py-1 border-b border-zinc-200">
                  <span className="text-red-700">True RNG Worst Drought:</span>
                  <strong className="text-zinc-950">{rngStats.trueRngMaxMissStreak} misses ({rngStats.trueRngCrits} crits)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-200">
                  <span className="text-blue-700">Markov PRD Worst Drought:</span>
                  <strong className="text-zinc-950">{rngStats.prdMaxMissStreak} misses ({rngStats.prdCrits} crits)</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-emerald-700">8-Card Shuffle Bag Drought:</span>
                  <strong className="text-zinc-950">{rngStats.bagMaxMissStreak} misses ({rngStats.bagCrits} crits)</strong>
                </div>
              </div>

              <div className="rounded-lg bg-white border border-zinc-200 p-3 text-xs text-zinc-700 leading-relaxed">
                <strong className="text-zinc-950 font-mono">Input vs. Output Randomness:</strong> Accept higher variance for <em>Input Randomness</em> (randomized floor layouts before tactical decisions), but enforce tight PRD or shuffle bags for <em>Output Randomness</em> (stochastic execution after player commitment).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playable Lab 5: Headless Monte Carlo Balance Studio */}
      <section className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-blue-700 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Laboratory 5.1 &bull; Capstone Engineering Lab</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-950 mt-0.5">
              Headless Monte Carlo Balance Studio: 1,000 Automated Match Simulations
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {isLabDone || isMetaBalanced ? (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" /> Nash Equilibrium Achieved (All 30&ndash;37%)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-300 px-3 py-1.5 text-xs font-mono text-amber-900">
                Goal: Balance all 3 classes into 30%&ndash;37% Win Rate
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-zinc-700 leading-relaxed">
          Commercial game studios evaluate multiplayer balance through automated headless simulation loops running thousands of heuristic matches.
          Currently, the Vanguard Tank dominates the metagame (44.2% win rate) while the Arcanist lags (20.0%).
          Tune the class parameters and execute <strong>1,000 Headless Bot Matches</strong> until all three classes sit within the 30%&ndash;37% Nash Equilibrium corridor.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Win-Rate Dashboard */}
          <div className="lg:col-span-7 border border-zinc-200 bg-zinc-50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-600 font-semibold">TELEMETRY ({simResults.runsCompleted.toLocaleString()} MATCHES SIMULATED)</span>
              <span className="text-emerald-700 font-bold">Target Band: 30.0% &ndash; 37.0%</span>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Vanguard (Heavy Armor / Melee)', pct: simResults.vanguardWinPct, color: 'bg-blue-600' },
                { name: 'Ranger (PRD Crit / Kiting)', pct: simResults.rangerWinPct, color: 'bg-emerald-600' },
                { name: 'Arcanist (High Startup / Burst)', pct: simResults.arcanistWinPct, color: 'bg-indigo-600' },
              ].map((cls) => {
                const inBand = cls.pct >= 30 && cls.pct <= 37;
                return (
                  <div key={cls.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-950 font-semibold">{cls.name}</span>
                      <span className={inBand ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
                        {cls.pct.toFixed(1)}% {inBand ? '✓ BALANCED' : cls.pct > 37 ? '▲ OVERPOWERED' : '▼ UNDERPOWERED'}
                      </span>
                    </div>
                    <div className="relative h-3 w-full rounded-full bg-zinc-200 overflow-hidden">
                      {/* Target Band Marker [30%..37%] */}
                      <div
                        className="absolute top-0 bottom-0 bg-emerald-200 border-x border-emerald-600 z-10"
                        style={{ left: '30%', width: '7%' }}
                      />
                      <div
                        className={`h-full ${cls.color} transition-all duration-300`}
                        style={{ width: `${Math.min(100, cls.pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={runMonteCarloBots}
              className="w-full inline-flex items-center justify-center gap-2 rounded bg-blue-600 hover:bg-blue-700 py-2.5 text-xs font-semibold text-white shadow-sm transition cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" />
              <span>Run 1,000 Headless Bot Matches &amp; Update Telemetry</span>
            </button>
          </div>

          {/* Class Tuning Sliders */}
          <div className="lg:col-span-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-blue-700 font-bold border-b border-zinc-200 pb-2">
              <Sliders className="h-3.5 w-3.5" />
              <span>Asymmetric Parameter Tuning</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Vanguard Base Health</span>
                <span className="text-blue-700 font-bold">{vanguardHp} HP</span>
              </div>
              <input
                type="range"
                min="110"
                max="180"
                step="5"
                value={vanguardHp}
                onChange={(e) => setVanguardHp(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Ranger Crit Probability</span>
                <span className="text-emerald-700 font-bold">{rangerCritPct}%</span>
              </div>
              <input
                type="range"
                min="12"
                max="45"
                step="1"
                value={rangerCritPct}
                onChange={(e) => setRangerCritPct(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Arcanist Spell Damage</span>
                <span className="text-indigo-700 font-bold">{arcanistBurst} DMG</span>
              </div>
              <input
                type="range"
                min="30"
                max="75"
                step="2"
                value={arcanistBurst}
                onChange={(e) => setArcanistBurst(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="pt-2 border-t border-zinc-200 text-[11px] text-zinc-500 leading-relaxed">
              <strong className="text-zinc-700 font-mono">Tuning Hint:</strong> Lower Vanguard HP to ~145 and raise Arcanist Damage to ~44, then execute the simulation.
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 pt-6 mt-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('module-4')}
            className="inline-flex items-center gap-2 rounded border border-zinc-300 bg-white hover:bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-800 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Module 04</span>
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
            <span>{isModuleDone ? 'Module 05 Complete' : 'Mark Module 05 Theory Complete'}</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('rosetta-library')}
          className="inline-flex items-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition cursor-pointer"
        >
          <span>Next: CS Rosetta Stone, Reading List &amp; Final Exam</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
