import React from 'react';

export const Module4Content: React.FC = () => {
  return (
    <article className="prose prose-invert max-w-none space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
          <span>CHAPTER 4 TEXTBOOK &amp; LECTURE TRANSCRIPT • ESTIMATED READING &amp; EXERCISE TIME: 2.0 HOURS</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Systems, Internal Economies &amp; Cybernetic Feedback Loops
        </h3>
        <p className="text-sm text-slate-300">
          How do strategy games, RPGs, and survival games maintain dramatic tension across dozens of hours?
          This chapter formalizes internal game economies using Adams &amp; Dormans’ Machinations framework (Petri-net resource graphs), analyzes the differential equations of positive (snowballing) and negative (rubber-banding) feedback loops, and replaces brittle scripted code with $O(N^2)$ emergent chemistry engines.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          1. Games as Cybernetic Control Systems (Norbert Wiener &amp; Katie Salen)
        </h3>
        <p>
          Cybernetics is the study of regulatory feedback systems. Every dynamic game loop can be modeled as a closed feedback controller comprising three components:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Sensor (Evaluation):</strong> The system measures the current state (e.g., player score, distance between cars, HP difference).</li>
          <li><strong>Comparator (Objective):</strong> The system calculates the error or delta between the current state and the design goal.</li>
          <li><strong>Effector (Actuator):</strong> The system modifies game parameters (e.g., spawn rates, item drop qualities, engine acceleration).</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          2. The Mathematics of Feedback: Positive Snowballing vs. Negative Equilibrium
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4">
          <div className="rounded-xl border border-rose-500/30 bg-slate-900 p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-rose-400">POSITIVE FEEDBACK</span>
              <span className="bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded">dx/dt = +k · x</span>
            </div>
            <div className="text-sm font-bold text-white">Exponential Amplification</div>
            <p className="text-xs text-slate-300">
              Advantages compound exponentially. In MOBAs, gaining early kills yields gold and experience, enabling higher DPS and making subsequent kills even easier.
            </p>
            <p className="text-xs text-rose-300">
              <strong>Risk (Dead Time):</strong> If positive feedback is unchecked, the match winner is mathematically determined in minute 8, but the losing team must endure 25 more minutes of hopeless gameplay.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/30 bg-slate-900 p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-cyan-400">NEGATIVE FEEDBACK</span>
              <span className="bg-cyan-500/20 text-cyan-200 px-2 py-0.5 rounded">dx/dt = -k · (x - x_setpoint)</span>
            </div>
            <div className="text-sm font-bold text-white">Equilibrium Stabilization</div>
            <p className="text-xs text-slate-300">
              Deviations from the target state are resisted. In <em>Mario Kart</em>, trailing racers draw bullet bills and stars, while the leader receives defensive bananas.
            </p>
            <p className="text-xs text-cyan-300">
              <strong>Risk (Rubber-Band Resentment):</strong> Over-aggressive negative feedback invalidates player skill, leading to "Blue Shell syndrome" where players intentionally avoid taking first place until the final lap.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          3. Adams &amp; Dormans’ Machinations Framework: Petri Nets for Internal Economies
        </h3>
        <p>
          In <em>Game Mechanics: Advanced Game Design</em>, Ernest Adams and Joris Dormans formalized game economies as directed graphs where tangible (gold, ammo, HP) and intangible (threat, reputation, mana) resources flow through five primitive nodes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Sources ($\triangle$):</strong> Nodes that generate resources ex nihilo at specified production intervals (e.g., gold mines, regenerating shields, respawning enemies).</li>
          <li><strong>Pools ($\bigcirc$):</strong> Storage accumulators that hold discrete quantities of resources (e.g., character inventory, wallet, health bar).</li>
          <li><strong>Converters ($\triangleright$):</strong> Functional transformers that consume one resource type to synthesize another (e.g., crafting tables turning wood and iron into arrows).</li>
          <li><strong>Drains ($\triangledown$):</strong> Resource sinks that permanently destroy tokens from the economy (e.g., repair costs, stamina decay, consumable potions).</li>
          <li><strong>Gates ($\lozenge$):</strong> Routers that distribute flowing tokens deterministically or probabilistically according to specified branching conditions.</li>
        </ul>
        <p>
          Balancing an RPG or strategy game economy consists of calculating steady-state flow conservation: ensuring that total Source generation rates match Drain consumption rates to prevent either catastrophic resource starvation or infinite hyperinflation.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          4. Emergent Chemistry Engines: Orthogonal Tag Composition
        </h3>
        <p>
          In traditional scripted games, interactive object behaviors are implemented via brittle pairwise logic:
        </p>
        <pre className="rounded-xl bg-slate-900 p-4 font-mono text-xs text-rose-300 border border-slate-800">
          // The Brittle Scripted Approach: O(N²) Pairwise Hardcoded Functions
          function onSwordHitWoodenDoor(sword, door) &#123; ... &#125;
          function onFireArrowHitWoodenDoor(arrow, door) &#123; ... &#125;
          function onBombHitWoodenDoor(bomb, door) &#123; ... &#125;
        </pre>
        <p>
          In systems-driven games like <em>The Legend of Zelda: Breath of the Wild</em> and <em>Spelunky</em>, developers implement an <strong>emergent chemistry engine</strong>.
          Instead of scripting interactions between specific objects, objects are assigned orthogonal physical properties:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><code>Door</code> has tags: <code>[Flammable, Heavy, Rigid]</code></li>
          <li><code>FireArrow</code> has tags: <code>[Igniter, Kinetic]</code></li>
          <li><code>MetalShield</code> has tags: <code>[Conductive, Magnetic, Fireproof]</code></li>
        </ul>
        <p>
          When an <code>Igniter</code> entity makes spatial contact with a <code>Flammable</code> entity, the general Combustion System sets it on fire, regardless of whether it is a door, a wooden sword, grass, or an enemy's wooden club.
          With $N$ elemental tags, the designer writes $O(N)$ system rules, but players discover $O(N^2)$ emergent combinations without a single extra line of code.
        </p>
      </section>
    </article>
  );
};
