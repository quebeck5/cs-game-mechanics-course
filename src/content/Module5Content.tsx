import React from 'react';

export const Module5Content: React.FC = () => {
  return (
    <article className="prose prose-invert max-w-none space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-violet-400 font-bold">
          <span>CHAPTER 5 TEXTBOOK &amp; LECTURE TRANSCRIPT • ESTIMATED READING &amp; EXERCISE TIME: 2.0 HOURS</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Probability, Game Theory, Telemetry &amp; Automated Balancing
        </h3>
        <p className="text-sm text-slate-300">
          Why do humans misperceive mathematical randomness?
          This final chapter bridges the gap between probability theory and cognitive perception, examines the difference between Input and Output Randomness, implements Markov Pseudo-Random Distributions (PRD) and Shuffle Bags, solves asymmetric game balance using Nash Equilibrium payoff matrices, and builds automated headless Monte Carlo telemetry pipelines.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          1. The Psychology of Randomness vs. Mathematical Stochastics
        </h3>
        <p>
          In pure probability theory, an independent Bernoulli trial (such as a 20% critical hit roll via <code>Math.random() &lt; 0.20</code>) is completely memoryless.
          However, human psychology does not evaluate randomness through the lens of independent trials; humans suffer from the <strong>Clustering Illusion</strong> and the <strong>Gambler's Fallacy</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Streak Clumping:</strong> In a truly random sequence of 100 trials with $p = 0.20$, the probability of encountering a run of 12 consecutive misses is over $70\%$. When this happens during gameplay, the player concludes that the game is bugged or cheating.
          </li>
          <li>
            <strong>First-Hit Luck:</strong> Conversely, landing 3 critical hits in the first 3 seconds of a multiplayer match creates an immediate, insurmountable damage spike that feels completely unearned.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          2. Input Randomness vs. Output Randomness (Geoff Engelstein)
        </h3>
        <p>
          Game theorist Geoff Engelstein established a crucial taxonomic distinction regarding when stochastic variance is introduced relative to player agency:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4">
          <div className="rounded-xl border border-emerald-500/30 bg-slate-900 p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400">INPUT RANDOMNESS (BEFORE DECISION)</span>
            <div className="text-sm font-bold text-white">Encourages Planning &amp; Adaptation</div>
            <p className="text-xs text-slate-300">
              Randomness occurs <em>before</em> the player commits to an action (e.g., drawing cards in <em>Slay the Spire</em>, procedural floor layouts in <em>Spelunky</em>, dice rolls in <em>Backgammon</em>).
            </p>
            <p className="text-xs text-emerald-300">
              <strong>Psychological Impact:</strong> High player agency. The player assesses the randomized board state, calculates trade-offs, and formulates a plan.
            </p>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-slate-900 p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-400">OUTPUT RANDOMNESS (AFTER DECISION)</span>
            <div className="text-sm font-bold text-white">Risks Invalidating Player Effort</div>
            <p className="text-xs text-slate-300">
              Randomness occurs <em>after</em> the player has formulated and executed their plan (e.g., a 95% hit chance missing at point-blank range in <em>XCOM</em>, a random critical strike deciding a 1v1 duel).
            </p>
            <p className="text-xs text-rose-300">
              <strong>Psychological Impact:</strong> High frustration risk. If the consequence of a bad roll is fatal, the player feels punished despite having made the objectively correct tactical choice.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          3. Variance Bounding: Markov PRD and Shuffle Bags
        </h3>
        <p>
          To preserve long-run expected value $E[X] = p$ while eliminating extreme tail droughts, professional game engines employ two algorithms:
        </p>
        <h4 className="text-base font-bold text-slate-100">A. The Markov Pseudo-Random Distribution (PRD)</h4>
        <p>
          Popularized by Blizzard (<em>Warcraft III</em>) and Valve (<em>Dota 2</em>), the PRD algorithm modifies the probability on every consecutive miss $N$:
        </p>
        <div className="text-center py-2 font-mono text-xs sm:text-sm text-cyan-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
          $$P(N) = \min(1.0, C \cdot N)$$
        </div>
        <p>
          For a target expected crit chance $p = 0.25$, the constant is $C \approx 0.08475$. On the first attack, the crit chance is only $8.5\%$. If it misses, $N=2$ and the chance increases to $17.0\%$. By miss $N=6$, the chance is over $50\%$, and by $N=12$ it is mathematically guaranteed.
          The long-run average remains exactly $25\%$, but 15-miss droughts and first-hit lucky bursts become virtually impossible.
        </p>

        <h4 className="text-base font-bold text-slate-100">B. Shuffle Bags (Sampling Without Replacement)</h4>
        <p>
          Used in <em>Tetris</em> (the 7-bag randomizer) and board games. If a game needs an exact ratio of items or events, place them in an array, perform a Fisher-Yates shuffle, and pop items until the array is empty before replenishing. This creates a hard mathematical upper bound on streak variance.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          4. Automated Balancing via Headless Monte Carlo Simulation &amp; Telemetry
        </h3>
        <p>
          Modern game studios do not rely solely on manual playtesting to balance multiplayer titles.
          They write headless (non-rendering) game loops that simulate thousands of matches per second with automated heuristic bot agents:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Win-Rate vs. Pick-Rate Scatter Plots:</strong> Identifying whether high-win-rate characters are being played exclusively by elite specialists or by everyone.</li>
          <li><strong>Time-to-Kill (TTK) Histograms:</strong> Ensuring that encounters match the intended pacing curve without sudden lethality spikes.</li>
          <li><strong>Spatial Death Heatmaps:</strong> Overlaying kill and death coordinates on the level collision mesh to detect design flaws such as unpunishable sniper perches or unintentional dead ends.</li>
        </ul>
      </section>
    </article>
  );
};
