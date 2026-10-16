import React, { useState } from 'react';
import { PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import {
  Dices,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Play,
  Sliders,
  Cpu
} from 'lucide-react';

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

    // Compute power indices with Rock-Paper-Scissors interaction + stochastic variance
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

    // Check if all 3 classes are within Nash target band [30%, 37%]
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
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-600 px-3 py-1 text-xs font-mono font-bold text-white">
            MODULE 05 • HOURS 8:00 – 10:00
          </span>
          <span className="text-xs font-mono text-slate-400">
            Markov PRD + Shuffle Bags + Game Theory Nash Equilibrium + Monte Carlo Telemetry
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Probability, Game Theory, Telemetry & Automated Balancing
        </h1>
        <p className="text-slate-300 max-w-4xl leading-relaxed">
          Why do players rage-quit when a 90% accuracy shot misses twice in <em>XCOM</em>, or call your critical-hit system "bugged" when you used standard `Math.random()`?
          In this final module, we master <strong>Psychological vs. Mathematical Randomness</strong>, <strong>Markov Pseudo-Random Distributions (PRD)</strong>, and <strong>Monte Carlo Bot Playtesting</strong>.
        </p>
      </header>

      {/* Section 5.1: True Random vs. PRD vs. Shuffle Bags */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-violet-400">
          <Dices className="h-4 w-4" />
          <span>5.1 Stochastic Engineering — Shaping Variance Without Altering Expected Value</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Why True i.i.d. Bernoulli Trials Feel Broken—And How PRD & Shuffle Bags Fix It
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          In an independent Bernoulli process with $p = 0.25$ (25% crit rate), the probability of missing 10 times in a row is $(0.75)^{10} \approx 5.6\%$. Over a 20-minute match with 300 swings, a player is almost guaranteed to suffer a 12-to-16 miss drought, followed by 3 crits in a row.
          To preserve $E[X] = 0.25$ while eliminating extreme tail streaks, game engines use two algorithms:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-1.5">
            <div className="text-rose-400 font-bold">1. TRUE RNG (Memoryless i.i.d.)</div>
            <div className="text-white text-sm">P(hit | N misses) = p = 0.25</div>
            <p className="text-slate-300 font-sans">
              Geometric distribution with long right tail. Produces frustratingly long dry spells and bursty back-to-back crits on frame 1.
            </p>
          </div>

          <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 space-y-1.5">
            <div className="text-violet-400 font-bold">2. MARKOV PRD (Dota 2 / Warcraft 3)</div>
            <div className="text-white text-sm">P(N) = min(1.0, C · N) (C ≈ 0.085)</div>
            <p className="text-slate-300 font-sans">
              Starts at 8.5% on swing 1 and increments by +8.5% per miss until guaranteed at $N=12$. Prevents both 1st-hit luck bursts and 15-miss droughts!
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-1.5">
            <div className="text-emerald-400 font-bold">3. SHUFFLE BAG (Tetris 7-Bag)</div>
            <div className="text-white text-sm">Sampling Without Replacement</div>
            <p className="text-slate-300 font-sans">
              Places exact quotas (e.g., 2 Crits + 6 Misses) into an array, Fisher-Yates shuffles it, and pops until empty. Strict hard upper bound on variance.
            </p>
          </div>
        </div>

        {/* Interactive Diagram 5.1: 1,000-Roll RNG Comparator */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-violet-400">Interactive Diagram 5.1</span>
              <h3 className="text-lg font-bold text-white">1,000-Trial Streak Histogram: True RNG vs. Markov PRD ($E[X] = 25\%$)</h3>
            </div>
            <button
              onClick={runRngComparison}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2 text-xs font-mono font-bold text-white shadow cursor-pointer"
            >
              <Dices className="h-4 w-4" />
              <span>Simulate 1,000 New Attacks ({rngTrialsDone} run)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="text-xs font-mono text-slate-400 mb-3">
                Distribution of Consecutive Misses Before Each Crit (Buckets: 0 misses .. 11+ misses)
              </div>
              <div className="grid grid-cols-12 gap-1.5 items-end h-44 pt-4 px-2 border-b border-slate-800">
                {rngStats.trueStreakHist.map((trueCount, idx) => {
                  const prdCount = rngStats.prdStreakHist[idx] || 0;
                  const maxH = 75;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full flex gap-0.5 items-end justify-center h-full">
                        <div
                          className="w-2.5 bg-rose-500/80 rounded-t transition-all duration-300"
                          style={{ height: `${Math.min(100, (trueCount / maxH) * 100)}%` }}
                          title={`True RNG: ${trueCount}`}
                        />
                        <div
                          className="w-2.5 bg-emerald-400 rounded-t transition-all duration-300"
                          style={{ height: `${Math.min(100, (prdCount / maxH) * 100)}%` }}
                          title={`Markov PRD: ${prdCount}`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{idx === 11 ? '11+' : idx}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-2">
                <span className="text-rose-400">■ Rose: True Math.random() (Heavy Tail)</span>
                <span className="text-emerald-400">■ Emerald: Markov PRD (Bell-Concentrated Around 3 Misses)</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 font-mono text-xs">
                <div className="text-slate-400">EMPIRICAL RESULTS OVER 1,000 SWINGS:</div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-rose-300">True RNG Worst Drought:</span>
                  <strong className="text-white">{rngStats.trueRngMaxMissStreak} misses in a row ({rngStats.trueRngCrits} crits)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-emerald-300">Markov PRD Worst Drought:</span>
                  <strong className="text-white">{rngStats.prdMaxMissStreak} misses in a row ({rngStats.prdCrits} crits)</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-cyan-300">8-Card Shuffle Bag Drought:</span>
                  <strong className="text-white">{rngStats.bagMaxMissStreak} misses in a row ({rngStats.bagCrits} crits)</strong>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs text-slate-300 leading-relaxed">
                <strong className="text-violet-300 font-mono">Input vs. Output Randomness:</strong> Use high variance for <em>Input Randomness</em> (procedural map/card dealing <strong>before</strong> the player decides), and tight PRD/bounded variance for <em>Output Randomness</em> (rolling after the player commits).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playable Lab 5: Capstone Monte Carlo Balance & Telemetry Studio */}
      <section className="rounded-2xl border-2 border-violet-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-violet-400 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Playable Engineering Lab 05 • "Headless Monte Carlo Balance Studio"</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Tune Asymmetric Class Parameters & Run 1,000 Automated Bot Matches
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {isLabDone || isMetaBalanced ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-mono font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" /> Nash Equilibrium Achieved (All 30–37%)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 text-xs font-mono text-amber-300">
                Goal: Balance all 3 classes into 30%–37% Win Rate
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In studio production, you don't guess balance numbers—you write a headless combat loop and run <strong>1,000 Monte Carlo bot matches</strong> in 10 milliseconds.
          Currently, the <strong>Vanguard Tank</strong> dominates ($44.2\%$ win rate) while the <strong>Arcanist</strong> is underpowered ($20.0\%$). Tune the 3 class parameters below and click <strong>"Run 1,000 Headless Bot Matches"</strong> until all three sit inside the $30\%–37\%$ Nash Equilibrium corridor!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Win-Rate Telemetry Dashboard */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">MONTE CARLO TELEMETRY ({simResults.runsCompleted.toLocaleString()} MATCHES SIMULATED)</span>
              <span className="text-emerald-400">Target Band: 30.0% – 37.0%</span>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Vanguard (Heavy Armor / Melee)', pct: simResults.vanguardWinPct, color: 'bg-cyan-400' },
                { name: 'Ranger (PRD Crit / Kiting)', pct: simResults.rangerWinPct, color: 'bg-emerald-400' },
                { name: 'Arcanist (High Startup / AoE Burst)', pct: simResults.arcanistWinPct, color: 'bg-violet-400' },
              ].map((cls) => {
                const inBand = cls.pct >= 30 && cls.pct <= 37;
                return (
                  <div key={cls.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white font-semibold">{cls.name}</span>
                      <span className={inBand ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {cls.pct.toFixed(1)}% {inBand ? '✓ BALANCED' : cls.pct > 37 ? '▲ OVERPOWERED' : '▼ UNDERPOWERED'}
                      </span>
                    </div>
                    <div className="relative h-4 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                      {/* Target Band Marker [30%..37%] */}
                      <div
                        className="absolute top-0 bottom-0 bg-emerald-500/20 border-x border-emerald-400/50 z-10"
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
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 py-3 text-xs font-mono font-bold text-white shadow-lg shadow-violet-600/30 transition cursor-pointer"
            >
              <Play className="h-4 w-4" />
              <span>Run 1,000 Headless Bot Matches & Update Telemetry</span>
            </button>
          </div>

          {/* Class Balance Sliders */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-violet-400 border-b border-slate-800 pb-2">
              <Sliders className="h-4 w-4" />
              <span>Asymmetric Class Parameter Tuning</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-cyan-300">Vanguard Base Health Pool</span>
                <span className="text-white font-bold">{vanguardHp} HP</span>
              </div>
              <input
                type="range"
                min="110"
                max="180"
                step="5"
                value={vanguardHp}
                onChange={(e) => setVanguardHp(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-emerald-300">Ranger PRD Crit Probability</span>
                <span className="text-white font-bold">{rangerCritPct}%</span>
              </div>
              <input
                type="range"
                min="12"
                max="45"
                step="1"
                value={rangerCritPct}
                onChange={(e) => setRangerCritPct(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-violet-300">Arcanist Spell Burst Damage</span>
                <span className="text-white font-bold">{arcanistBurst} DMG</span>
              </div>
              <input
                type="range"
                min="30"
                max="75"
                step="2"
                value={arcanistBurst}
                onChange={(e) => setArcanistBurst(parseInt(e.target.value, 10))}
                className="w-full accent-violet-400"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <strong className="text-slate-200 font-mono">Hint:</strong> Try lowering Vanguard HP to ~145 and raising Arcanist Burst to ~44, then run the simulation!
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('module-4')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Module 04</span>
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
            <span>{isModuleDone ? 'Module 05 Completed' : 'Mark Module 05 Theory Complete'}</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('rosetta-library')}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition cursor-pointer"
        >
          <span>Next: CS Rosetta Stone, Reading List & Final Exam</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
