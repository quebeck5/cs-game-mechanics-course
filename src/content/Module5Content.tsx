import React from 'react';

export const Module5Content: React.FC = () => {
  return (
    <article className="space-y-6 text-zinc-900 leading-normal text-sm sm:text-base">
      {/* Chapter Overview Box */}
      <div className="border border-zinc-200 bg-zinc-50 p-5 rounded">
        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
          Chapter 5: Probability &amp; Telemetry • Recommended Study Time: 2.0 Hours
        </div>
        <h2 className="text-2xl font-bold text-zinc-950">
          Probability Architecture, Game Theory &amp; Automated Telemetry Balancing
        </h2>
        <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
          Why do players consistently accuse games of "cheating" even when random number generators pass strict chi-square statistical tests?
          This final chapter bridges the disconnect between mathematical stochastics and human cognitive psychology. We dissect Geoff Engelstein's Input vs. Output Randomness taxonomy, implement Markov Pseudo-Random Distributions (PRD) and Fisher-Yates shuffle bags to bound variance, analyze asymmetric balance via Game Theory payoff matrices, and construct headless Monte Carlo simulation pipelines that validate balance across millions of simulated matches.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-zinc-950 border-b border-zinc-200 pb-1">
          1. The Psychology of Randomness vs. Mathematical Stochastics
        </h3>
        <p className="text-sm leading-relaxed text-zinc-800">
          In probability theory, an independent Bernoulli trial (such as rolling a 20% critical hit probability via <code>Math.random() &lt; 0.20</code>) possesses the Markov memoryless property:
        </p>
        <div className="font-mono bg-zinc-100 p-2.5 my-1 border border-zinc-200 text-xs text-zinc-900 rounded">
          P(X<sub>n+1</sub> = Success | X<sub>n</sub> = Failure, X<sub>n-1</sub> = Failure, ...) = P(X<sub>n+1</sub> = Success) = p
        </div>
        <p className="text-sm leading-relaxed text-zinc-800">
          However, human neurobiology evolved to detect causal environmental patterns rather than evaluate memoryless stochastic processes. Consequently, players suffer from well-documented cognitive biases:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>The Clustering Illusion:</strong> In any true random uniform sequence, items clump together into apparent streaks. In a sequence of 100 trials with p = 0.20, the mathematical probability of encountering a streak of 12 consecutive misses is over 70%. When an RPG player misses 12 attacks consecutively, they conclude the RNG algorithm is bugged or rigged.
          </li>
          <li>
            <strong>The Gambler's Fallacy:</strong> Humans intuitively assume that after five consecutive failures, a success is "due". When it fails on the sixth attempt, frustration escalates nonlinearly.
          </li>
          <li>
            <strong>First-Round Luck Spike:</strong> Conversely, landing three critical hits in the opening 3 seconds of a match produces an unearned instant win, stripping the opponent of agency and leaving the winner unsatisfied.
          </li>
        </ul>
        <div className="bg-amber-50/60 border-l-4 border-amber-500 p-3 text-xs text-amber-950">
          <span className="font-bold">The Game Designer's Axiom:</span> A mathematically fair RNG feels unfair to human players. An RNG that feels fair to human players is mathematically biased. Your goal as an engineer is to construct "perceived fairness" algorithms.
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-zinc-950 border-b border-zinc-200 pb-1">
          2. Input Randomness vs. Output Randomness (Geoff Engelstein)
        </h3>
        <p className="text-sm leading-relaxed text-zinc-800">
          In <em>Building Blocks of Tabletop Game Design</em>, theorist Geoff Engelstein established a critical architectural distinction based on when stochastic variance occurs relative to player decision-making:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
          <div className="border border-emerald-200 bg-emerald-50/40 p-4 rounded space-y-2">
            <div className="font-mono font-bold text-emerald-800">INPUT RANDOMNESS (BEFORE DECISION)</div>
            <div className="text-sm font-bold text-zinc-900">Encourages Planning &amp; Heuristic Adaptation</div>
            <p className="text-zinc-700">
              Randomness occurs <em>before</em> the player commits to an action.
              Examples include drawing cards in <em>Slay the Spire</em>, rolling dice in <em>Backgammon</em>, or generating procedurally arranged rooms in <em>Spelunky</em>.
            </p>
            <div className="bg-white p-2.5 rounded border border-emerald-200 space-y-1 text-zinc-800">
              <div className="font-semibold text-emerald-900">Cognitive Effect: High Agency</div>
              <p>The player inspects the randomized board state, calculates combinatorial permutations, and selects the optimal path. The randomness provides the puzzle; the player provides the solution.</p>
            </div>
          </div>

          <div className="border border-red-200 bg-red-50/40 p-4 rounded space-y-2">
            <div className="font-mono font-bold text-red-800">OUTPUT RANDOMNESS (AFTER DECISION)</div>
            <div className="text-sm font-bold text-zinc-900">Risks Invalidating Tactical Preparation</div>
            <p className="text-zinc-700">
              Randomness occurs <em>after</em> the player has formulated and executed their plan.
              Examples include a 95% accuracy shot missing at point-blank range in <em>XCOM</em>, or a 1% critical strike randomly deciding an esports duel.
            </p>
            <div className="bg-white p-2.5 rounded border border-red-200 space-y-1 text-zinc-800">
              <div className="font-semibold text-red-900">Cognitive Effect: High Resentment Risk</div>
              <p>If the penalty for a failure roll is catastrophic (e.g., permanent character death), the player feels robbed because their sound tactical reasoning was overruled by an unmanageable dice roll.</p>
            </div>
          </div>
        </div>

        <h4 className="text-sm font-bold text-zinc-900 mt-2">Engineering Safeguards for Output Randomness:</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm text-zinc-800">
          <li><strong>Graceful Degradation (Glancing Blows):</strong> Rather than binary Hit/Miss (100% or 0%), map misses to 50% partial damage or secondary status debuffs.</li>
          <li><strong>Deterministic telegraphs:</strong> Give players warning of enemy critical strikes or heavy moves 1 turn or 60 frames in advance.</li>
          <li><strong>Risk Mitigation Tools:</strong> Provide consumable rerolls, luck tokens, or positioning options that convert 95% probabilities to guaranteed 100% certainty.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-zinc-950 border-b border-zinc-200 pb-1">
          3. Variance Bounding: Markov PRD and Shuffle Bags
        </h3>
        <p className="text-sm leading-relaxed text-zinc-800">
          To preserve the mathematical expected value E[X] = p over long horizons while eliminating frustrating variance tails, commercial game engines rely on two primary algorithms:
        </p>

        <h4 className="text-sm font-bold text-zinc-900">A. The Markov Pseudo-Random Distribution (PRD)</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          Pioneered by Blizzard Entertainment in <em>Warcraft III</em> and adopted by Valve in <em>Dota 2</em>, the PRD algorithm replaces stationary Bernoulli trials with a dynamic state variable:
        </p>
        <div className="font-mono bg-zinc-100 p-2.5 my-1 border border-zinc-200 text-xs text-zinc-900 rounded">
          P(N) = min(1.0, C &middot; N)
        </div>
        <p className="text-sm leading-relaxed text-zinc-800">
          Here, N is the count of consecutive attacks since the last successful event (starting at N = 1), and C is a precomputed constant lower than the target probability p.
          Upon a successful roll, N resets to 1. On every consecutive failure, N increments by 1:
        </p>
        <div className="border border-zinc-200 bg-white p-3 rounded space-y-1 text-xs">
          <div className="font-semibold text-zinc-900">Example: Target Probability p = 0.25 (C &asymp; 0.08475)</div>
          <div className="text-zinc-700">Attack 1: P(1) = 8.5% (Extremely low chance of instant burst)</div>
          <div className="text-zinc-700">Attack 2: P(2) = 17.0%</div>
          <div className="text-zinc-700">Attack 3: P(3) = 25.4%</div>
          <div className="text-zinc-700">Attack 6: P(6) = 50.8%</div>
          <div className="text-zinc-700">Attack 12: P(12) = 100.0% (Hard ceiling: drought cannot exceed 11 misses)</div>
        </div>
        <p className="text-sm leading-relaxed text-zinc-800">
          The long-run average crit rate across 100,000 attacks converges to exactly 25.0%, but players are mathematically shielded from 20-miss droughts and 4-in-a-row critical strikes.
        </p>

        <h4 className="text-sm font-bold text-zinc-900 mt-3">B. Fisher-Yates Shuffle Bags (Sampling Without Replacement)</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          The official <em>Tetris Guideline</em> mandates the "7-Bag Randomizer".
          Instead of rolling a random piece from 1 to 7 on every spawn (which could generate six consecutive Z-tetrominoes), the engine places all 7 unique pieces into a bag, performs a Fisher-Yates shuffle, and dispenses them one by one until empty before refilling:
        </p>
        <div className="font-mono bg-zinc-100 p-2.5 my-1 border border-zinc-200 text-xs text-zinc-900 rounded">
          // 7-Bag invariant guarantees max gap between any identical piece is 12:
          [I, J, L, O, S, T, Z] &rarr; Shuffle &rarr; [O, S, T, Z, J, L, I] | [I, Z, ...]
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-zinc-950 border-b border-zinc-200 pb-1">
          4. Automated Headless Monte Carlo Simulation &amp; Telemetry Pipelines
        </h3>
        <p className="text-sm leading-relaxed text-zinc-800">
          Balancing asymmetric multiplayer titles (such as 120 unique characters with varied weapon loads) via human playtesting alone is mathematically impossible due to the factorial size of the parameter space:
        </p>
        <div className="font-mono bg-zinc-100 p-2.5 my-1 border border-zinc-200 text-xs text-zinc-900 rounded">
          Combinations = C(120, 5) &asymp; 1.9 &times; 10<sup>8</sup> team compositions
        </div>
        <p className="text-sm leading-relaxed text-zinc-800">
          Leading studios architect their core game logic to run in a <strong>headless mode</strong> (decoupled from rendering, audio, and OS windows).
          This allows automated test runners to simulate millions of match ticks per second across cloud worker clusters using three primary telemetry heuristics:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs">
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-mono font-bold text-blue-700">Win Rate vs. Pick Rate</span>
            <div className="font-semibold text-zinc-900">Outlier Detection</div>
            <p className="text-zinc-600">
              Plotting hero pick frequency vs. match win percentage. High pick rate + high win rate indicates an overpowered dominant strategy requiring immediate nerf. Low pick rate + high win rate indicates an effective niche specialist.
            </p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-mono font-bold text-indigo-700">Time-to-Kill (TTK) Curves</span>
            <div className="font-semibold text-zinc-900">Pacing Distribution</div>
            <p className="text-zinc-600">
              Measuring the exact millisecond duration of combat encounters across weapon classes. Bimodal distributions reveal unbalanced weapons that bypass counter-play windows.
            </p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-mono font-bold text-emerald-700">Spatial Heatmaps</span>
            <div className="font-semibold text-zinc-900">Map Geometry Validation</div>
            <p className="text-zinc-600">
              Aggregating coordinate death and objective capture events onto level geometry to detect choke points, spawn camping zones, and underutilized map regions.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};
