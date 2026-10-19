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
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 26: Loss-Aversion-Safe Additive Star &amp; Sticker Framing)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates (Primary School Grades 1&ndash;6):</strong> Because losses hurt 2.25&times; more than equivalent gains (Prospect Theory) and young children (ages 6&ndash;11) have heightened emotional sensitivity to punishment, starting a primary school student with &ldquo;3 Hearts&rdquo; or &ldquo;100 Gold Stars&rdquo; and taking them away when they miscalculate a fraction triggers tears, math anxiety, and refusal to experiment during a 30&ndash;60 minute classroom session.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Frame all progress as <strong>Monotonic Additive Mastery &amp; Ratcheted Sticker Checkpoints</strong>: start the child at 0 Stars and award positive discovery badges even for testing wrong hypotheses (&ldquo;Curious Scientist! +5 Discovery Gems for testing what happens when the bridge is too heavy!&rdquo;). Never deduct earned stars, pop collected stickers, or revert completed sub-stages upon an incorrect answer.
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
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Prevent random clustering of identical math problems or unlucky weather spawns during a 45-minute primary school activity by using stratified sampling, so 8-year-olds don&rsquo;t get five <code>&times; 9</code> multiplication problems in a row or conclude the game is &ldquo;mean to them.&rdquo;
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">2. THE GAMBLER'S FALLACY (NEGATIVE RECENCY)</div>
            <p className="text-zinc-700 leading-relaxed">
              Humans intuitively assume that after five consecutive misses, a hit is "due."
              When the sixth attack misses, psychological frustration escalates non-linearly because the player feels their cognitive expectation was violated.
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> In a Grade 5&ndash;6 chance &amp; data mini-game (like spinning a color wheel or flipping a frog coin), display the live marble-bag or spinner slices alongside a bar chart of past rolls so children see visually why a fair spinner has no memory.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">3. FIRST-ROUND LUCK SPIKES (THE OPENING BURST)</div>
            <p className="text-zinc-700 leading-relaxed">
              Conversely, landing three critical hits in the opening 2 seconds of a multiplayer match produces an unearned instant kill, stripping the victim of all counter-play agency and leaving the victor unsatisfied.
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Never allow an accidental lucky button mash on Trial 1 to auto-pass a primary school puzzle; require the child to feed 3 different hungry monsters in a row using the rule before awarding the gold mastery star.
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
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 27: Input Randomness for Neighbor-Proof Puzzles &amp; Zero Output Randomness)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates (Primary School Grades 1&ndash;6):</strong> In a primary school classroom where kids sit side-by-side at shared tables, <strong>Output Randomness is toxic</strong>: if an 8-year-old carefully counts out <code>3/4</code> of a pizza and a post-answer dice roll causes the oven to burn the pizza 10% of the time, the child thinks their math was wrong! Conversely, <strong>Input Randomness is essential</strong> so a child cannot simply lean over and copy their table-partner&rsquo;s screen.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Use seeded <strong>Procedural Input Randomness</strong> to generate unique customer orders, coin combinations, or garden grid dimensions at the start of each 5-minute round (e.g., Student A gets <code>2/4 + 1/4</code> while Student B next to them gets <code>1/3 + 1/3</code>), then evaluate the child&rsquo;s answer using <strong>100% Deterministic Output Resolution</strong>.
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
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Deal randomized number tiles, coin purses, or word-root cards at the start of each turn so every child at a classroom table solves a fresh, copy-proof puzzle using the same primary math or phonics rule.
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
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Eliminate output randomness from primary math, spelling, and science rules; if a child builds a valid bridge or spells the word right, it must succeed 100% of the time without random failure rolls.
            </div>
          </div>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">Three Engineering Safeguards for Output Randomness:</h4>
        <ul className="list-disc pl-6 space-y-2.5 text-sm text-zinc-800">
          <li>
            <strong>1. Graceful Degradation (Glancing Blows):</strong> Rather than binary Hit/Miss (100% or 0%), map misses to 40% partial damage or secondary status debuffs. The player’s turn is never completely wasted.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Show warm visual proximity feedback (e.g., the monster eats 3 of the 4 slices and holds up 1 finger showing &ldquo;Just 1 more quarter-slice needed!&rdquo;) rather than a harsh red <code>WRONG</code> buzzer when a child&rsquo;s answer is close.
            </div>
          </li>
          <li>
            <strong>2. Deterministic Telegraphing:</strong> Give players warning of heavy enemy critical strikes or randomized status procs 1 turn or 60 frames in advance, allowing them to reposition or pop defensive shields.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Telegraph upcoming environmental challenges (e.g., a friendly weather forecast cloud showing &ldquo;Rainstorm in 1 Turn!&rdquo; in a Grade 3 plant-growth game) so children can proactively place a greenhouse roof over their seedlings.
            </div>
          </li>
          <li>
            <strong>3. Risk Mitigation Consumables:</strong> Provide players with consumable rerolls, luck tokens, or positioning options that convert 95% probabilities into guaranteed 100% certainty when it matters most.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Give students a free &ldquo;Swap Tile&rdquo; or &ldquo;Friendly Owl Magnifying Glass&rdquo; button so they are never stuck with an awkward letter or number hand during a 40-minute classroom game.
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
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 28: PRD for Small-Sample Classroom Discovery)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates (Primary School Grades 1&ndash;6):</strong> Because a 30&ndash;60 minute primary school mini-game only has time for a small number of trials (N &asymp; 12 to 25 actions), a pure Bernoulli RNG will frequently produce unrepresentative streaks (e.g., a 25% rare golden beetle or rainbow weather event appearing 0 times in 15 tries for one child while appearing 6 times for the child sitting next to them), causing classroom tears and confusion.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Drive small-sample primary science &amp; reward events with a <strong>Markov PRD</strong> (P(N) = min(1, C &middot; N)) so that within just 8&ndash;12 student turns, every child in the classroom is mathematically guaranteed to observe the rare animal, fossil, or weather pattern inside their 40-minute lesson.
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
            <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Guarantees that a 25% discovery event (e.g., unearthing a rare dinosaur fossil or spotting a desert oasis in a Grade 3 habitat game) happens for every child at least once every 12 digs during a short school period.
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
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 29: Primary Curriculum Topic N-Bag Shuffler)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates (Primary School Grades 1&ndash;6):</strong> If a primary math or phonics mini-game uses raw <code className="bg-white px-1 py-0.5 rounded font-mono border border-blue-200">Math.random()</code> to pick which question type to ask next, an 8-year-old might get five <code>+ 10</code> addition puzzles in a row and zero subtraction or missing-addend puzzles during their 40-minute computer lab period.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Load all required primary lesson skills [Skill<sub>1</sub>, Skill<sub>2</sub>, &hellip;, Skill<sub>6</sub>] (e.g., 2 halves, 2 thirds, 2 quarters) into a <strong>Fisher-Yates Curriculum Shuffle Bag</strong>. Every cycle of 6 customer orders is mathematically guaranteed to practice 100% of the teacher&rsquo;s lesson objectives without boring repetition streaks, while still feeling like a surprise game on every turn.
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
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 30: Anti-Guess-Spamming &amp; Classroom Bell-Schedule Telemetry)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates (Primary School Grades 1&ndash;6):</strong> In primary school educational games, Soren Johnson&rsquo;s law manifests as <strong>&ldquo;children will optimize the learning out of a game by rapidly tapping every button or dragging thirty <code>1</code>-blocks instead of regrouping a <code>10</code>-rod.&rdquo;</strong> If a 7-year-old can beat a 45-minute math game by brute-force tapping all 4 multiple-choice buttons in 1.5 seconds, they will never read the math problem.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> (1) Replace tap-spamming multiple choice with <strong>Constructive Manipulative Verification</strong> (plus a gentle 1.5-second thoughtful-pause animation if rapid guessing is detected) and test 3 varied customer orders per stage; (2) Run headless Monte Carlo simulations modelling struggling, average, and fast primary readers prior to classroom deployment to verify that the 10th-to-90th percentile completion time falls strictly inside the teacher&rsquo;s <strong>30&ndash;60 minute school period</strong>.
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
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Plot <strong>Block/Tool Pick Rate vs. First-Try Solve Rate</strong> to spot degenerate &ldquo;unit-block spam&rdquo; (95% usage without regrouping) vs. confusingly illustrated tools (5% usage + high child confusion).
            </div>
          </div>
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <span className="font-bold text-indigo-700">2. TIME-TO-KILL (TTK) HISTOGRAMS</span>
            <div className="font-semibold text-zinc-950">Pacing Distribution</div>
            <p className="text-zinc-600">
              Measuring the exact millisecond duration of combat encounters across weapon classes. Bimodal distributions reveal unbalanced weapons that bypass counter-play windows.
            </p>
            <div className="border-l-2 border-indigo-500 bg-indigo-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Track <strong>Time-to-Mastery (TTM) Histograms</strong> per stage across Grades 1&ndash;6 so 90% of primary school students finish the core learning arc between Minute 32 and Minute 50 before cleanup bell.
            </div>
          </div>
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <span className="font-bold text-emerald-700">3. SPATIAL DEATH HEATMAPS</span>
            <div className="font-semibold text-zinc-950">Geometry Validation</div>
            <p className="text-zinc-600">
              Aggregating coordinate death and objective capture events onto level collision geometry to detect choke points, spawn camping zones, and underutilized map regions.
            </p>
            <div className="border-l-2 border-emerald-500 bg-emerald-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Aggregate <strong>Tap-Miss &amp; Misconception Heatmaps</strong> onto the classroom teacher dashboard so the teacher sees at a glance which fraction or phonics stage puzzled the class during the 45-minute lesson.
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
