import React from 'react';

export const Module4Content: React.FC = () => {
  return (
    <article className="space-y-6 text-zinc-900 leading-normal text-sm sm:text-base">
      {/* Chapter Overview Box */}
      <div className="border border-zinc-200 bg-zinc-50 p-5 rounded">
        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
          Chapter 4: Systems &amp; Economies • Recommended Study Time: 2.0 Hours
        </div>
        <h2 className="text-2xl font-bold text-zinc-950">
          Cybernetic Feedback Loops, Internal Economies &amp; Emergent Chemistry
        </h2>
        <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
          How do strategy titles, RPGs, roguelikes, and open-world survival games sustain dramatic tension over dozens or hundreds of hours without scripted narrative interventions?
          This chapter formalizes games as dynamic cybernetic control systems, models internal resource flows using Adams &amp; Dormans' Machinations framework (Petri nets), analyzes the differential equations governing positive (snowballing) and negative (rubber-banding) feedback, and contrasts brittle hardcoded interactions with orthogonal, emergent chemistry architectures.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-zinc-950 border-b border-zinc-200 pb-1">
          1. Games as Cybernetic Control Systems (Norbert Wiener &amp; Katie Salen)
        </h3>
        <p className="text-sm leading-relaxed text-zinc-800">
          In 1948, mathematician Norbert Wiener defined <strong>cybernetics</strong> as the scientific study of control and communication in the animal and the machine.
          In <em>Rules of Play</em>, Katie Salen and Eric Zimmerman applied cybernetics to game architecture: any playable system can be modeled as a closed feedback loop consisting of four fundamental components:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>Sensor (State Evaluation):</strong> The subsystem that continuously samples the state vector of the simulation (e.g., current player HP, distance between racing vehicles, aggregate team gold, kill/death differential).
          </li>
          <li>
            <strong>Comparator (Target / Setpoint):</strong> The subsystem that compares the current state vector against an intended design baseline or setpoint &theta;<sub>target</sub>, calculating the error signal:
            <div className="font-mono bg-zinc-100 p-2 my-1 border border-zinc-200 text-xs text-zinc-900 rounded">
              e(t) = S<sub>actual</sub>(t) - S<sub>target</sub>(t)
            </div>
          </li>
          <li>
            <strong>Effector (Actuator):</strong> The operational subsystem that alters simulation parameters to steer the system based on the computed error (e.g., modulating enemy spawn frequency, adjusting rubber-band slipstream acceleration, scaling loot drop rates).
          </li>
          <li>
            <strong>The Plant (Game State):</strong> The physics and logic simulation whose state evolves over time as a function of player inputs and actuator interventions.
          </li>
        </ol>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-3 text-xs text-blue-950">
          <span className="font-bold">Engineering Analogy:</span> A heating thermostat measures ambient room temperature (sensor), compares it to the target temperature (comparator), and switches the furnace on or off (effector). A game AI director or dynamic difficulty adjustment (DDA) system functions identically, measuring player stress/survival metrics and throttling resource spawns to keep the user within the flow channel.
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-zinc-950 border-b border-zinc-200 pb-1">
          2. The Mathematics of Feedback: Positive Snowballing vs. Negative Equilibrium
        </h3>
        <p className="text-sm leading-relaxed text-zinc-800">
          Feedback loops dictate whether a system converges to a stable equilibrium point or diverges toward an extreme state.
          Understanding when to apply positive vs. negative feedback is the single most critical mathematical skill in system balancing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
          <div className="border border-red-200 bg-red-50/40 p-4 rounded space-y-2">
            <div className="flex justify-between items-center font-mono">
              <span className="font-bold text-red-700">POSITIVE FEEDBACK (REINFORCING)</span>
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded border border-red-200">dx/dt = +k &middot; x</span>
            </div>
            <div className="text-sm font-bold text-zinc-900">Exponential Amplification</div>
            <p className="text-zinc-700">
              Advantages compound exponentially. In competitive MOBAs or RTS titles, securing an early kill grants gold and experience, elevating character stats and making subsequent kills mathematically easier.
            </p>
            <div className="bg-white p-2.5 rounded border border-red-200 space-y-1 text-zinc-800">
              <div className="font-semibold text-red-900">Design Purpose: Decisive Conclusion</div>
              <p>Positive feedback prevents infinite stalemates and forces games to conclude within finite time bounds.</p>
              <div className="font-semibold text-red-900 mt-2">Critical Failure Mode: "Dead Time"</div>
              <p>If unmitigated, the match winner is mathematically decided at minute 8, but the losing team must endure 25 more minutes of hopeless play.</p>
            </div>
          </div>

          <div className="border border-sky-200 bg-sky-50/40 p-4 rounded space-y-2">
            <div className="flex justify-between items-center font-mono">
              <span className="font-bold text-sky-700">NEGATIVE FEEDBACK (BALANCING)</span>
              <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded border border-sky-200">dx/dt = -k &middot; (x - x<sub>set</sub>)</span>
            </div>
            <div className="text-sm font-bold text-zinc-900">Equilibrium Stabilization</div>
            <p className="text-zinc-700">
              Deviations from equilibrium are resisted. In <em>Mario Kart</em>, trailing racers receive bullet bills and lightning bolts, while the first-place leader receives defensive banana peels.
            </p>
            <div className="bg-white p-2.5 rounded border border-sky-200 space-y-1 text-zinc-800">
              <div className="font-semibold text-sky-900">Design Purpose: Dramatic Closeness</div>
              <p>Negative feedback keeps contests close until the final moments, maximizing psychological tension for spectators and players.</p>
              <div className="font-semibold text-sky-900 mt-2">Critical Failure Mode: Skill Invalidation</div>
              <p>Overly aggressive negative feedback causes "Blue Shell syndrome", where players intentionally avoid taking first place until the final lap because leading carries a net statistical penalty.</p>
            </div>
          </div>
        </div>

        <h4 className="text-sm font-bold text-zinc-900 mt-3">Techniques for Taming Positive Feedback Runaways:</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm text-zinc-800">
          <li><strong>Diminishing Marginal Returns:</strong> Scaling costs superlinearly (e.g., each successive town center costs <code>base * 1.5<sup>N</sup></code> resources).</li>
          <li><strong>Progressive Upkeep Penalties:</strong> High-tier units consume continuous food/energy maintenance, bleeding the leader's economic surplus.</li>
          <li><strong>Bounty Systems:</strong> Eliminating a high-kill enemy yields a massive reward bonus, creating high-leverage comeback opportunities.</li>
          <li><strong>Vulnerability Windows:</strong> Expanding territory requires defending wider geographic perimeters, diluting defensive density.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-zinc-950 border-b border-zinc-200 pb-1">
          3. Adams &amp; Dormans' Machinations Framework: Petri Nets for Internal Economies
        </h3>
        <p className="text-sm leading-relaxed text-zinc-800">
          In <em>Game Mechanics: Advanced Game Design</em> (New Riders, 2012), Ernest Adams and Joris Dormans established <strong>Machinations</strong>, a formal diagrammatic language based on Petri nets and system dynamics to model tangible (gold, ammunition, health points) and intangible (threat, reputation, mana) resource economies.
        </p>

        <p className="text-sm leading-relaxed text-zinc-800">
          The framework models every economic system through five canonical node primitives connected by resource and state connection arcs:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-2 text-xs">
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <div className="font-mono font-bold text-emerald-700">Source (&Delta;)</div>
            <div className="font-semibold text-zinc-900">Token Generator</div>
            <p className="text-zinc-600">
              Generates resources ex nihilo at specified intervals or triggers (e.g., gold mines, regenerating shields, enemy respawns).
            </p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <div className="font-mono font-bold text-blue-700">Pool (O)</div>
            <div className="font-semibold text-zinc-900">State Accumulator</div>
            <p className="text-zinc-600">
              Stores discrete quantities of tokens (e.g., character wallet, ammunition reserve, experience points, player inventory).
            </p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <div className="font-mono font-bold text-indigo-700">Converter (&gt;)</div>
            <div className="font-semibold text-zinc-900">Token Transformer</div>
            <p className="text-zinc-600">
              Consumes N tokens of resource A to synthesize M tokens of resource B (e.g., crafting recipes, merchant currency exchanges).
            </p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <div className="font-mono font-bold text-rose-700">Drain (&nabla;)</div>
            <div className="font-semibold text-zinc-900">Permanent Sink</div>
            <p className="text-zinc-600">
              Permanently destroys tokens from the economic graph (e.g., weapon durability wear, ammunition spent, taxes, repair fees).
            </p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <div className="font-mono font-bold text-amber-700">Gate (&loz;)</div>
            <div className="font-semibold text-zinc-900">Flow Router</div>
            <p className="text-zinc-600">
              Routes flowing tokens conditionally or probabilistically along branching edges (e.g., critical hit branches, branching skill trees).
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          Economic balance requires enforcing <strong>steady-state conservation laws</strong>.
          If total source production rates persistently exceed drain consumption rates:
        </p>
        <div className="font-mono bg-zinc-100 p-2.5 my-1 border border-zinc-200 text-xs text-zinc-900 rounded">
          &Sigma; Rate(Sources) &gt; &Sigma; Rate(Drains) &rArr; lim<sub>t &rarr; &infin;</sub> Pool(t) = &infin; (Economic Hyperinflation)
        </div>
        <p className="text-sm leading-relaxed text-zinc-800">
          When hyperinflation occurs, scarcity collapses, choices become trivial, and player engagement plummets.
          Conversely, if drains exceed sources without adequate player agency, resource starvation stalls progress entirely.
        </p>
      </section>

      {/* Section 4 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-zinc-950 border-b border-zinc-200 pb-1">
          4. Emergent Chemistry Engines: Orthogonal Tag Composition
        </h3>
        <p className="text-sm leading-relaxed text-zinc-800">
          In classical game programming, interactions between objects are authored through pairwise, object-oriented inheritance or monolithic event handlers.
          Consider what happens as game scope expands:
        </p>

        <div className="border border-zinc-200 bg-zinc-50 p-4 rounded space-y-2 text-xs font-mono text-zinc-900">
          <div className="text-red-700 font-bold">// The Brittle Monolithic Approach: O(N&sup2;) Pairwise Hardcoded Bindings</div>
          <div>void onSwordHitWoodenDoor(Sword* s, Door* d) &#123; ... &#125;</div>
          <div>void onFireArrowHitWoodenDoor(Arrow* a, Door* d) &#123; ... &#125;</div>
          <div>void onBombHitWoodenDoor(Bomb* b, Door* d) &#123; ... &#125;</div>
          <div>void onLightningHitMetalShield(Lightning* l, Shield* s) &#123; ... &#125;</div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          With N entity classes, supporting all physical interactions requires up to N&sup2; bespoke collision callbacks.
          Adding a single new item requires modifying dozens of existing classes, inevitably resulting in regression bugs or incomplete interactions.
        </p>

        <p className="text-sm leading-relaxed text-zinc-800">
          In systemic games such as <em>The Legend of Zelda: Breath of the Wild</em>, <em>Spelunky</em>, and <em>Noita</em>, developers deploy an <strong>orthogonal chemistry engine</strong>.
          Entities do not have hardcoded interactions; instead, entities are simple compositions of physical tags and properties:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs font-mono">
          <div className="border border-zinc-200 bg-white p-3 rounded">
            <span className="font-bold text-zinc-900">Entity: WoodenDoor</span>
            <div className="text-zinc-600 mt-1">[Flammable, Rigid, Heavy]</div>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded">
            <span className="font-bold text-zinc-900">Entity: FireArrow</span>
            <div className="text-zinc-600 mt-1">[Igniter, Kinetic, Piercing]</div>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded">
            <span className="font-bold text-zinc-900">Entity: MetalShield</span>
            <div className="text-zinc-600 mt-1">[Conductive, Magnetic, Fireproof]</div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          The simulation engine defines general thermodynamic and electromagnetic laws operating strictly on tag pairs:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-zinc-800">
          <li><code>Igniter</code> + <code>Flammable</code> &rarr; Trigger <code>CombustionReaction</code> (spreads heat, spawns smoke, consumes entity durability).</li>
          <li><code>Conductive</code> + <code>Electrified</code> &rarr; Propagate electrical current to all adjacent <code>Conductive</code> entities in radius R.</li>
          <li><code>Cryogenic</code> + <code>Liquid</code> &rarr; Phase transition: convert liquid volume into solid frozen platform.</li>
        </ul>

        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3 text-xs text-emerald-950">
          <span className="font-bold">Algorithmic Payoff:</span> With M elemental tags, authoring M system rules enables players to discover O(M&sup2;) emergent systemic behaviors without authoring a single additional line of object-specific code. When a player sets a wooden club on fire, throws it into dry grass to ignite a updraft, and glides into the sky, no individual designer scripted that sequence—it arose naturally from tag-driven physics.
        </div>
      </section>
    </article>
  );
};
