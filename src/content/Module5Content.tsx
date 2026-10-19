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

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;When directly compared or weighted against each other, losses loom larger than gains.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Daniel Kahneman, <em>Thinking, Fast and Slow</em> (Farrar, Straus and Giroux, 2011, p. 282) / Amos Tversky &amp; Daniel Kahneman (<em>Econometrica</em>, 1979)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Educational Mini-Game (Point 26: Loss-Aversion-Safe Grading Framing)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> Because losses hurt 2.25&times; more than equivalent gains (Prospect Theory), starting a student at &ldquo;100% Grade&rdquo; and subtracting points for every failed experiment triggers severe academic anxiety and makes students terrified to experiment during a 30&ndash;60 minute lab.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Frame all progress as <strong>Monotonic Additive Mastery &amp; Ratcheted Checkpoints</strong>: start the student at 0 XP and award positive discovery points even for falsified hypotheses (&ldquo;Edge Case Discovered: +15 Lab Data&rdquo;). Never deduct earned mastery points or revert completed sub-stages upon failure.
          </p>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
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
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> Prevent random clustering of identical problem types or unlucky particle spawns during a 45-minute lab by using stratified sampling so students don&rsquo;t misinterpret random streaks as a causal law.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">2. THE GAMBLER'S FALLACY (NEGATIVE RECENCY)</div>
            <p className="text-zinc-700 leading-relaxed">
              Humans intuitively assume that after five consecutive misses, a hit is "due."
              When the sixth attack misses, psychological frustration escalates non-linearly because the player feels their cognitive expectation was violated.
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> In probability and statistics mini-games, explicitly visualize the memoryless sample tree alongside empirical rolls so students confront and overcome the Gambler&rsquo;s Fallacy firsthand.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">3. FIRST-ROUND LUCK SPIKES (THE OPENING BURST)</div>
            <p className="text-zinc-700 leading-relaxed">
              Conversely, landing three critical hits in the opening 2 seconds of a multiplayer match produces an unearned instant kill, stripping the victim of all counter-play agency and leaving the victor unsatisfied.
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> Never allow an accidental lucky parameter initialization on Trial 1 to auto-pass a level; require the student&rsquo;s solution to hold across 3 distinct seed states before awarding mastery.
            </div>
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

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Input randomness informs the decision before it is made, presenting a problem to be solved; output randomness resolves the decision after it is made, determining the outcome.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Geoff Engelstein &amp; Isaac Shalev, <em>Building Blocks of Tabletop Game Design: An Encyclopedia of Mechanisms</em> (CRC Press, 2019, p. 248)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Educational Mini-Game (Point 27: Input Randomness for Anti-Cheating &amp; Zero Output Randomness)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> In an educational mini-game, <strong>Output Randomness is toxic</strong>: if a student calculates the exact right trajectory or algorithm, and a post-decision dice roll causes it to fail 10% of the time, the student&rsquo;s mental model of the subject is corrupted. Conversely, <strong>Input Randomness is essential</strong> so students cannot simply copy a classmate&rsquo;s hardcoded coordinates.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Use seeded <strong>Procedural Input Randomness</strong> to generate unique initial problem parameters (e.g., randomized resistor values or unsorted input arrays) at the start of each 5-minute puzzle, then evaluate the student&rsquo;s solution using <strong>100% Deterministic Output Resolution</strong>.
          </p>
        </div>

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
            <div className="border-l-2 border-emerald-500 bg-white/90 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> Randomize the starting dataset, graph weights, or target coordinates per student session seed so every student solves a fresh, cheat-proof instance using the same underlying theorem.
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
            <div className="border-l-2 border-red-500 bg-white/90 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> Eliminate output randomness from deterministic subjects (math, physics, CS); only use output randomness when the learning objective itself is stochastic (e.g., noisy communication channels or quantum measurement).
            </div>
          </div>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">Three Engineering Safeguards for Output Randomness:</h4>
        <ul className="list-disc pl-6 space-y-2.5 text-sm text-zinc-800">
          <li>
            <strong>1. Graceful Degradation (Glancing Blows):</strong> Rather than binary Hit/Miss (100% or 0%), map misses to 40% partial damage or secondary status debuffs. The player’s turn is never completely wasted.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> Award partial credit and visual proximity feedback (e.g., &ldquo;85% Signal Integrity — Phase offset by 12&deg;&rdquo;) rather than binary Pass/Fail when a student&rsquo;s solution is close.
            </div>
          </li>
          <li>
            <strong>2. Deterministic Telegraphing:</strong> Give players warning of heavy enemy critical strikes or randomized status procs 1 turn or 60 frames in advance, allowing them to reposition or pop defensive shields.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> Telegraph upcoming stochastic disturbances (e.g., &ldquo;Solar Flare Noise Spike in 5s&rdquo; in a coding/networking mini-game) so students can actively test their error-correcting code (ECC) under load.
            </div>
          </li>
          <li>
            <strong>3. Risk Mitigation Consumables:</strong> Provide players with consumable rerolls, luck tokens, or positioning options that convert 95% probabilities into guaranteed 100% certainty when it matters most.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> Give students engineering redundancy tools (e.g., checksum parity bits, backup capacitors, or retry policies) that turn unreliable 90% components into 99.99% fault-tolerant systems.
            </div>
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

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;In a pseudo-random distribution, the probability increases with every unsuccessful attempt, smoothing out statistical extremes while keeping the long-term average identical to the target probability.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Valve Corporation, <em>Dota 2 Mechanics Specification</em> (Valve Developer Community, 2013)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Educational Mini-Game (Point 28: PRD for Small-Sample Probabilistic Simulations)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> Because a 30&ndash;60 minute mini-game only has time for a small number of trials (N &asymp; 15 to 30 events), a pure Bernoulli RNG will frequently produce unrepresentative sample distributions (e.g., a 25% genetic recessive trait appearing 0 times in 12 offspring in a Mendelian genetics mini-game), misleading the student about the underlying law.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Drive small-sample educational simulations with a <strong>Markov PRD</strong> (P(N) = min(1, C &middot; N)) so that within just 8&ndash;12 student trials, the empirical frequency converges reliably to the theoretical probability p, guaranteeing the student observes the intended statistical phenomenon inside their 40-minute session.
          </p>
        </div>

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
          <div className="font-sans border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-zinc-800">
            <strong>30&ndash;60 Min Educational Mini-Game:</strong> Guarantees that a 25% rare event (e.g., a cache miss, packet collision, or recessive allele) is observed by the student at least once every 12 steps during a short classroom lab.
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          The long-run average crit rate across 100,000 attacks converges to exactly 25.0%, but players are mathematically shielded from 20-miss droughts and 4-in-a-row critical strikes.
        </p>

        <h4 className="text-base font-bold text-zinc-900 mt-4">B. Fisher-Yates Shuffle Bags (Sampling Without Replacement)</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          The official <em>Tetris Guideline</em> mandates the "7-Bag Randomizer".
          Instead of rolling a random piece from 1 to 7 on every spawn (which could mathematically generate six consecutive Z-tetrominoes), the engine places all 7 unique pieces into a bag, performs a Fisher-Yates shuffle, and dispenses them one by one until empty before refilling:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;The Random Generator generates sequences of all seven tetrominoes in a random permutation, ensuring that every piece appears exactly once per cycle and eliminating catastrophic droughts.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; The Tetris Company, <em>Tetris Design Guideline</em> (2002/2009)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Educational Mini-Game (Point 29: Curriculum Topic N-Bag Shuffler)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> If an educational mini-game uses <code className="bg-white px-1 py-0.5 rounded font-mono border border-blue-200">Math.random()</code> to pick which concept variant to test next, a student might get 5 <code className="bg-white px-1 py-0.5 rounded font-mono border border-blue-200">for</code>-loop puzzles in a row and zero <code className="bg-white px-1 py-0.5 rounded font-mono border border-blue-200">while</code>-loop or recursion puzzles during their 40-minute session.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Load all required syllabus competencies [C<sub>1</sub>, C<sub>2</sub>, &hellip;, C<sub>k</sub>] into a <strong>Fisher-Yates Curriculum Shuffle Bag</strong>. Every cycle of k encounters is mathematically guaranteed to test 100% of the learning objectives without repetition droughts, while still feeling unpredictable and fresh on every playthrough.
          </p>
        </div>

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

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Given the opportunity, players will optimize the fun out of a game.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Soren Johnson, <em>Designer Notes</em> (Gamasutra, 2011)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Educational Mini-Game (Point 30: Anti-Gaming-the-System &amp; Session-Duration Telemetry)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> In educational games, Soren Johnson&rsquo;s law manifests as <strong>&ldquo;students will optimize the learning out of an educational game.&rdquo;</strong> If students can pass a 45-minute circuit mini-game by hardcoding <code>return true</code> or spamming 50 cheap batteries instead of calculating series-parallel resistance, they will exploit the degenerate strategy every time.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> (1) Run <strong>Randomized Hidden Property Tests</strong> on submission (testing 5 unseen edge-case inputs simultaneously so hardcoded solutions fail); (2) Run headless Monte Carlo bot simulations with synthetic novice/intermediate/expert student profiles prior to deployment to verify that the 10th-to-90th percentile completion time falls strictly inside the target <strong>30&ndash;60 minute window</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <span className="font-bold text-blue-700">1. WIN RATE VS. PICK RATE</span>
            <div className="font-semibold text-zinc-950">Outlier Detection</div>
            <p className="text-zinc-600">
              Plotting hero pick frequency vs. match win percentage. High pick rate + high win rate indicates an overpowered dominant strategy requiring immediate nerf. Low pick rate + high win rate indicates an effective niche specialist.
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> Plot <strong>Tool Usage Rate vs. First-Try Solve Rate</strong> to spot degenerate &ldquo;cheese&rdquo; tools (95% usage + 100% pass without learning) vs. confusingly designed tools (5% usage + high error rate).
            </div>
          </div>
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <span className="font-bold text-indigo-700">2. TIME-TO-KILL (TTK) HISTOGRAMS</span>
            <div className="font-semibold text-zinc-950">Pacing Distribution</div>
            <p className="text-zinc-600">
              Measuring the exact millisecond duration of combat encounters across weapon classes. Bimodal distributions reveal unbalanced weapons that bypass counter-play windows.
            </p>
            <div className="border-l-2 border-indigo-500 bg-indigo-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> Track <strong>Time-to-Mastery (TTM) Histograms</strong> per level and across the whole game to ensure the 10th&ndash;90th percentile session duration stays tightly bounded between 32 and 55 minutes.
            </div>
          </div>
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <span className="font-bold text-emerald-700">3. SPATIAL DEATH HEATMAPS</span>
            <div className="font-semibold text-zinc-950">Geometry Validation</div>
            <p className="text-zinc-600">
              Aggregating coordinate death and objective capture events onto level collision geometry to detect choke points, spawn camping zones, and underutilized map regions.
            </p>
            <div className="border-l-2 border-emerald-500 bg-emerald-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Educational Mini-Game:</strong> Aggregate <strong>Misconception &amp; Undo Heatmaps</strong> onto the puzzle canvas or AST nodes so instructors see the exact step where students get stuck during the 45-minute lab.
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
