import React from 'react';

export const Module5Content: React.FC = () => {
  return (
    <article className="space-y-8 text-zinc-900 leading-normal text-sm sm:text-base">
      {/* Chapter Overview Box */}
      <div className="border border-zinc-200 bg-zinc-50 p-6 rounded-lg">
        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
          Chapter 5: Probability, Stochastics &amp; Balancing • Study Duration: 2.5 Hours
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950">
          Probability Architecture, Game Theory &amp; Automated Telemetry Balancing
        </h2>
        <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
          Why do players consistently accuse games of "cheating" even when random number generators pass strict chi-square statistical tests?
          This final chapter bridges the disconnect between mathematical probability and human cognitive psychology. We dissect Geoff Engelstein's Input vs. Output Randomness taxonomy, implement Markov Pseudo-Random Distributions (PRD) and Fisher-Yates shuffle bags to bound variance, analyze asymmetric balance via Game Theory payoff matrices, and construct headless Monte Carlo simulation pipelines that validate balance across millions of simulated matches.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          1. The Psychology of Randomness vs. Mathematical Stochastics
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In probability theory, an independent Bernoulli trial (such as rolling a 20% critical hit probability via <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs font-mono border border-zinc-200">Math.random() &lt; 0.20</code>) possesses the Markov memoryless property:
        </p>

        <div className="font-mono bg-zinc-100 p-3 rounded border border-zinc-200 text-xs sm:text-sm text-center text-zinc-900">
          P(X<sub>n+1</sub> = Success | X<sub>n</sub> = Failure, X<sub>n-1</sub> = Failure, ...) = P(X<sub>n+1</sub> = Success) = p
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          However, human neurobiology did not evolve to evaluate memoryless stochastic processes; it evolved to detect causal environmental patterns.
          Consequently, players suffer from well-documented cognitive biases:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1">
            <div className="font-mono font-bold text-blue-700">1. THE CLUSTERING ILLUSION (STREAK BIAS)</div>
            <p className="text-zinc-700 leading-relaxed">
              In any true random uniform sequence, items clump together into apparent streaks.
              In a sequence of N = 100 independent trials with p = 0.20, the mathematical probability of encountering a run of 10 or more consecutive misses is approximately:
            </p>
            <div className="font-mono bg-zinc-100 p-2 rounded text-center text-xs">
              P(Streak &ge; 10) &asymp; 1 - exp(- (100 - 10 + 1) &middot; (0.20) &middot; (0.80)<sup>10</sup>) &asymp; 78%
            </div>
            <p className="text-zinc-700 text-xs mt-1">
              There is an almost 80% chance of a 10-miss drought! When this occurs during a boss fight, the player concludes the RNG algorithm is bugged or rigged.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1">
            <div className="font-mono font-bold text-blue-700">2. THE GAMBLER'S FALLACY (NEGATIVE RECENCY)</div>
            <p className="text-zinc-700 leading-relaxed">
              Humans intuitively assume that after five consecutive misses, a hit is "due."
              When the sixth attack misses, psychological frustration escalates non-linearly because the player feels their cognitive expectation was violated.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1">
            <div className="font-mono font-bold text-blue-700">3. FIRST-ROUND LUCK SPIKES (THE OPENING BURST)</div>
            <p className="text-zinc-700 leading-relaxed">
              Conversely, landing three critical hits in the opening 2 seconds of a multiplayer match produces an unearned instant kill, stripping the victim of all counter-play agency and leaving the victor unsatisfied.
            </p>
          </div>
        </div>

        <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 text-xs sm:text-sm text-amber-950">
          <span className="font-bold">The Game Designer's Axiom:</span> A mathematically fair RNG feels unfair to human players. An RNG that feels fair to human players is mathematically biased. Your goal as an engineer is to construct "perceived fairness" algorithms.
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          2. Input Randomness vs. Output Randomness (Geoff Engelstein)
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In <em>Building Blocks of Tabletop Game Design</em> (CRC Press, 2019), theorist Geoff Engelstein established a critical architectural distinction based on when stochastic variance occurs relative to player decision-making:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs sm:text-sm">
          {/* Input Randomness */}
          <div className="border border-emerald-200 bg-emerald-50/40 p-4 rounded-lg space-y-2">
            <div className="font-mono font-bold text-emerald-800">INPUT RANDOMNESS (BEFORE DECISION)</div>
            <div className="text-sm font-bold text-zinc-900">Encourages Planning &amp; Heuristic Adaptation</div>
            <p className="text-zinc-700 leading-relaxed">
              Randomness occurs <em>before</em> the player commits to an action.
              Examples include drawing cards in <em>Slay the Spire</em>, rolling dice at the start of a turn in <em>Backgammon</em>, or generating procedurally arranged rooms in <em>Spelunky</em>.
            </p>
            <div className="bg-white p-3 rounded border border-emerald-200 space-y-1 text-zinc-800">
              <div className="font-semibold text-emerald-900">Cognitive Effect: High Agency &amp; Mastery</div>
              <p className="text-xs text-zinc-600">
                The player assesses the randomized board state, calculates combinatorial permutations, and selects the optimal path. The randomness provides the puzzle; the player provides the solution.
              </p>
            </div>
          </div>

          {/* Output Randomness */}
          <div className="border border-red-200 bg-red-50/40 p-4 rounded-lg space-y-2">
            <div className="font-mono font-bold text-red-800">OUTPUT RANDOMNESS (AFTER DECISION)</div>
            <div className="text-sm font-bold text-zinc-900">Risks Invalidating Tactical Preparation</div>
            <p className="text-zinc-700 leading-relaxed">
              Randomness occurs <em>after</em> the player has formulated and executed their plan.
              Examples include a 95% accuracy shot missing at point-blank range in <em>XCOM</em>, or a 1% critical strike randomly deciding a 1v1 esports duel.
            </p>
            <div className="bg-white p-3 rounded border border-red-200 space-y-1 text-zinc-800">
              <div className="font-semibold text-red-900">Cognitive Effect: High Resentment Risk</div>
              <p className="text-xs text-zinc-600">
                If the penalty for a failure roll is catastrophic (e.g., permanent character death), the player feels robbed because their sound tactical reasoning was overruled by an unmanageable dice roll.
              </p>
            </div>
          </div>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">Three Engineering Safeguards for Output Randomness:</h4>
        <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>1. Graceful Degradation (Glancing Blows):</strong> Rather than binary Hit/Miss (100% or 0%), map misses to 40% partial damage or secondary status debuffs. The player’s turn is never completely wasted.
          </li>
          <li>
            <strong>2. Deterministic Telegraphing:</strong> Give players warning of heavy enemy critical strikes or randomized status procs 1 turn or 60 frames in advance, allowing them to reposition or pop defensive shields.
          </li>
          <li>
            <strong>3. Risk Mitigation Consumables:</strong> Provide players with consumable rerolls, luck tokens, or positioning options that convert 95% probabilities into guaranteed 100% certainty when it matters most.
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          3. Variance Bounding: Markov PRD and Shuffle Bags
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          To preserve long-run mathematical expected value E[X] = p while eliminating extreme tail droughts, professional game engines employ two core algorithms:
        </p>

        <h4 className="text-base font-bold text-zinc-900 mt-2">A. The Markov Pseudo-Random Distribution (PRD)</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          Popularized by Blizzard Entertainment (<em>Warcraft III</em>) and Valve (<em>Dota 2</em>), the PRD algorithm replaces stationary Bernoulli trials with a dynamic state variable N:
        </p>

        <div className="font-mono bg-zinc-100 p-3 rounded border border-zinc-200 text-xs sm:text-sm text-center text-zinc-900">
          P(N) = min(1.0, C &middot; N)
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          Here, N is the count of consecutive attacks since the last successful event (starting at N = 1), and C is a precomputed constant strictly lower than the target probability p.
          Upon a successful roll, N resets to 1. On every consecutive failure, N increments by 1:
        </p>

        <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5 text-xs font-mono">
          <div className="font-bold text-zinc-950">Example: Target Expected Probability p = 0.25 (C &asymp; 0.08475)</div>
          <div className="text-zinc-700">Attack 1: P(1) = 8.5% (Extremely low chance of instant burst)</div>
          <div className="text-zinc-700">Attack 2: P(2) = 17.0%</div>
          <div className="text-zinc-700">Attack 3: P(3) = 25.4%</div>
          <div className="text-zinc-700">Attack 6: P(6) = 50.8%</div>
          <div className="text-zinc-700">Attack 12: P(12) = 100.0% (Hard ceiling: drought cannot exceed 11 misses)</div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          The long-run average crit rate across 100,000 attacks converges to exactly 25.0%, but players are mathematically shielded from 20-miss droughts and 4-in-a-row critical strikes.
        </p>

        <h4 className="text-base font-bold text-zinc-900 mt-4">B. Fisher-Yates Shuffle Bags (Sampling Without Replacement)</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          The official <em>Tetris Guideline</em> mandates the "7-Bag Randomizer".
          Instead of rolling a random piece from 1 to 7 on every spawn (which could mathematically generate six consecutive Z-tetrominoes), the engine places all 7 unique pieces into a bag, performs a Fisher-Yates shuffle, and dispenses them one by one until empty before refilling:
        </p>

        <div className="font-mono bg-zinc-100 p-2.5 rounded border border-zinc-200 text-xs text-zinc-900">
          // 7-Bag invariant guarantees max gap between any identical piece is 12:
          [I, J, L, O, S, T, Z] &rarr; Shuffle &rarr; [O, S, T, Z, J, L, I] | [I, Z, ...]
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          4. Automated Headless Monte Carlo Simulation &amp; Telemetry Pipelines
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          Balancing asymmetric multiplayer titles (such as 120 unique characters with varied weapon loads) via human playtesting alone is mathematically impossible due to the factorial size of the parameter space:
        </p>

        <div className="font-mono bg-zinc-100 p-3 rounded border border-zinc-200 text-xs sm:text-sm text-center text-zinc-900">
          Combinations = C(120, 5) &asymp; 1.9 &times; 10<sup>8</sup> team compositions
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          Leading studios architect their core game logic to run in a <strong>headless mode</strong> (decoupled from rendering, audio, and OS windowing).
          This allows automated test runners to simulate millions of match ticks per second across cloud worker clusters using three primary telemetry heuristics:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1">
            <span className="font-bold text-blue-700">1. WIN RATE VS. PICK RATE</span>
            <div className="font-semibold text-zinc-950">Outlier Detection</div>
            <p className="text-zinc-600">
              Plotting hero pick frequency vs. match win percentage. High pick rate + high win rate indicates an overpowered dominant strategy requiring immediate nerf. Low pick rate + high win rate indicates an effective niche specialist.
            </p>
          </div>
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1">
            <span className="font-bold text-indigo-700">2. TIME-TO-KILL (TTK) HISTOGRAMS</span>
            <div className="font-semibold text-zinc-950">Pacing Distribution</div>
            <p className="text-zinc-600">
              Measuring the exact millisecond duration of combat encounters across weapon classes. Bimodal distributions reveal unbalanced weapons that bypass counter-play windows.
            </p>
          </div>
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1">
            <span className="font-bold text-emerald-700">3. SPATIAL DEATH HEATMAPS</span>
            <div className="font-semibold text-zinc-950">Geometry Validation</div>
            <p className="text-zinc-600">
              Aggregating coordinate death and objective capture events onto level collision geometry to detect choke points, spawn camping zones, and underutilized map regions.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};
