import React from 'react';

export const Module4Content: React.FC = () => {
  return (
    <article className="space-y-8 text-zinc-900 leading-normal text-sm sm:text-base">
      {/* Chapter Overview Box */}
      <div className="border border-zinc-200 bg-zinc-50 p-6 rounded-lg">
        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
          Chapter 4: Cybernetics &amp; Emergent Systems • Study Duration: 2.5 Hours
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950">
          Cybernetic Feedback Loops, Internal Economies &amp; Emergent Chemistry
        </h2>
        <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
          How do strategy titles, RPGs, roguelikes, and open-world survival simulations sustain dramatic tension across dozens or hundreds of hours without scripted narrative interventions?
          This chapter formalizes games as dynamic cybernetic control systems, analyzes the differential equations governing positive (snowballing) and negative (rubber-banding) feedback, models resource flows using Adams &amp; Dormans' Machinations Petri-Net primitives, and contrasts brittle hardcoded scripting with orthogonal, emergent chemistry engines.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          1. Games as Cybernetic Control Systems (Norbert Wiener &amp; Katie Salen)
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In 1948, mathematician Norbert Wiener published <em>Cybernetics: Or Control and Communication in the Animal and the Machine</em>, establishing the scientific study of regulatory feedback systems.
          In <em>Rules of Play</em> (MIT Press), Katie Salen and Eric Zimmerman applied cybernetic theory directly to game design:
          any interactive game simulation can be modeled as a closed-loop feedback regulator comprising four fundamental subsystems:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Feedback is the property of being able to adjust future conduct by past performance.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Norbert Wiener, <em>The Human Use of Human Beings: Cybernetics and Society</em> (Houghton Mifflin, 1950, p. 33)
          </footer>
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">1. SENSOR (STATE EVALUATION)</div>
            <div className="font-semibold text-zinc-950">Continuous Metric Sampling</div>
            <p className="text-zinc-600">
              The subsystem that measures the simulation's state vector S&#8407;(t) &isin; &#8477;<sup>n</sup> at runtime (e.g., current player HP, distance between racing vehicles, aggregate team gold, kill/death differential).
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">2. COMPARATOR (TARGET SETPOINT)</div>
            <div className="font-semibold text-zinc-950">Error Signal Calculation</div>
            <p className="text-zinc-600">
              The subsystem that compares the current state vector against an intended design baseline or setpoint &theta;<sub>target</sub>, calculating the error signal:
              <span className="font-mono ml-1">e(t) = S<sub>actual</sub>(t) - S<sub>target</sub>(t)</span>.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">3. EFFECTOR (ACTUATOR)</div>
            <div className="font-semibold text-zinc-950">Parameter Modulation</div>
            <p className="text-zinc-600">
              The subsystem that alters game parameters to steer the system based on the computed error (e.g., modulating enemy spawn rates, adjusting rubber-band slipstream acceleration, scaling loot drop qualities).
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">4. THE PLANT (GAME SIMULATION)</div>
            <div className="font-semibold text-zinc-950">Physical &amp; Logical State Evolution</div>
            <p className="text-zinc-600">
              The underlying physics engine and game world whose state evolves over time as a coupled function of human player inputs and actuator interventions.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 text-xs sm:text-sm text-blue-950">
          <span className="font-bold">Engineering Analogy:</span> A home thermostat samples ambient room temperature (Sensor), compares it to 21°C (Comparator), and turns on the furnace (Effector).
          A modern Dynamic Difficulty Adjustment (DDA) engine (such as Valve's AI Director in <em>Left 4 Dead</em> or the dynamic spawning in <em>Resident Evil 4</em>) operates identically: it continuously monitors player heart-rate/accuracy telemetry (Sensor), computes stress deficit (Comparator), and modulates zombie horde sizes (Effector) to keep the user inside the flow channel.
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          2. The Mathematics of Feedback: Positive Snowballing vs. Negative Equilibrium
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          Feedback loops dictate whether a system converges to a stable equilibrium point or diverges toward an extreme state.
          Understanding when to apply positive vs. negative feedback is the single most critical mathematical skill in systems design.
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Negative feedback stabilizes a game, dampening differences between players, while positive feedback systems destabilize the game by amplifying advantages for players who are ahead.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Katie Salen &amp; Eric Zimmerman, <em>Rules of Play: Game Design Fundamentals</em> (MIT Press, 2004, Chapter 18, p. 216)
          </footer>
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs sm:text-sm">
          {/* Positive Feedback */}
          <div className="border border-red-200 bg-red-50/40 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center font-mono">
              <span className="font-bold text-red-700">POSITIVE FEEDBACK (REINFORCING)</span>
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded border border-red-200">dx/dt = +k &middot; x</span>
            </div>
            <div className="text-sm font-bold text-zinc-900">Exponential Amplification ("Rich Get Richer")</div>
            <p className="text-zinc-700 leading-relaxed">
              Analytical solution: x(t) = x<sub>0</sub> e<sup>kt</sup>. Early advantages compound exponentially.
              In competitive MOBAs (<em>League of Legends, Dota 2</em>) or RTS games (<em>StarCraft</em>), scoring an early kill grants gold and experience, which increases DPS, making subsequent kills mathematically easier.
            </p>
            <div className="bg-white p-3 rounded border border-red-200 space-y-1.5 text-zinc-800">
              <div className="font-semibold text-red-900">Why Games Need Positive Feedback: Decisive Conclusion</div>
              <p className="text-xs text-zinc-600">
                Without positive feedback, competitive matches would result in endless 4-hour stalemates. Positive feedback forces the system toward a decisive terminal state.
              </p>
              <div className="font-semibold text-red-900 pt-1">The Critical Failure Mode: "Dead Time"</div>
              <p className="text-xs text-zinc-600">
                If positive feedback is unchecked, the match winner is mathematically decided at minute 8, but the losing team must endure 25 more minutes of hopeless gameplay.
              </p>
            </div>
          </div>

          {/* Negative Feedback */}
          <div className="border border-blue-200 bg-blue-50/40 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center font-mono">
              <span className="font-bold text-blue-700">NEGATIVE FEEDBACK (BALANCING)</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">dx/dt = -k &middot; (x - x<sub>set</sub>)</span>
            </div>
            <div className="text-sm font-bold text-zinc-900">Equilibrium Stabilization ("Rubber-Banding")</div>
            <p className="text-zinc-700 leading-relaxed">
              Analytical solution: x(t) = x<sub>set</sub> + (x<sub>0</sub> - x<sub>set</sub>) e<sup>-kt</sup>. Deviations from equilibrium are resisted.
              In <em>Mario Kart</em>, trailing racers draw bullet bills and lightning bolts, while the first-place leader receives defensive banana peels.
            </p>
            <div className="bg-white p-3 rounded border border-blue-200 space-y-1.5 text-zinc-800">
              <div className="font-semibold text-blue-900">Why Games Need Negative Feedback: Sustained Tension</div>
              <p className="text-xs text-zinc-600">
                Negative feedback resists runaway leads, keeping races and sports matches close until the final lap to maximize emotional tension.
              </p>
              <div className="font-semibold text-blue-900 pt-1">The Critical Failure Mode: Skill Invalidation</div>
              <p className="text-xs text-zinc-600">
                Over-aggressive negative feedback causes "Blue Shell syndrome", where players intentionally sandbag and avoid taking first place until the final straightaway because leading carries a statistical penalty.
              </p>
            </div>
          </div>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">Four Architectural Techniques to Tame Positive Feedback Runaways:</h4>
        <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>1. Diminishing Marginal Returns (Concave Scaling):</strong> Rather than linear power scaling (P = k &middot; G), apply concave functions (P = &radic;G or P = log<sub>2</sub>(G)). The first 1,000 gold buys 50 DPS; the next 1,000 gold buys only 25 DPS.
          </li>
          <li>
            <strong>2. Progressive Upkeep Tax Sinks:</strong> High-tier armies consume continuous maintenance (e.g., *Warcraft III* Upkeep system, where exceeding 50 food taxes gold mine income by 30%, and exceeding 80 food taxes it by 60%).
          </li>
          <li>
            <strong>3. Asymmetric High-Leverage Bounties:</strong> Eliminating a player on a massive killstreak awards bonus gold to the trailing team, creating a high-stakes comeback mechanism.
          </li>
          <li>
            <strong>4. Geometric Perimeter Vulnerability:</strong> Expanding territory forces an empire to defend a wider geographic boundary, diluting defensive density and creating natural vulnerabilities.
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          3. Adams &amp; Dormans' Machinations Framework: Petri Nets for Internal Economies
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In <em>Game Mechanics: Advanced Game Design</em> (New Riders, 2012), Ernest Adams and Joris Dormans established <strong>Machinations</strong>, a formal diagrammatic language based on Petri nets and system dynamics to model tangible (gold, ammunition, health points) and intangible (threat, reputation, mana) resource economies.
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Machinations is a visual language for diagramming game economies, and a tool for drawing, and above all, simulating them without writing code.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Ernest Adams &amp; Joris Dormans, <em>Game Mechanics: Advanced Game Design</em> (New Riders / Pearson, 2012, p. 57)
          </footer>
        </blockquote>

        <p className="text-sm leading-relaxed text-zinc-800">
          The framework models every economic system through five canonical node primitives connected by resource and state connection arcs:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-3 text-xs">
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <div className="font-mono font-bold text-emerald-700">Source (&Delta;)</div>
            <div className="font-semibold text-zinc-900">Token Generator</div>
            <p className="text-zinc-600">Generates resources ex nihilo at specified intervals or triggers (e.g., gold mines, regenerating shields, respawning enemies).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <div className="font-mono font-bold text-blue-700">Pool (O)</div>
            <div className="font-semibold text-zinc-900">State Accumulator</div>
            <p className="text-zinc-600">Stores discrete quantities of tokens (e.g., character wallet, ammunition reserve, experience points, player inventory).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <div className="font-mono font-bold text-purple-700">Converter (&gt;)</div>
            <div className="font-semibold text-zinc-900">Token Transformer</div>
            <p className="text-zinc-600">Consumes N tokens of resource A to synthesize M tokens of resource B (e.g., crafting tables, blacksmith forging, merchant exchanges).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <div className="font-mono font-bold text-red-700">Drain (&nabla;)</div>
            <div className="font-semibold text-zinc-900">Permanent Sink</div>
            <p className="text-zinc-600">Permanently destroys tokens from the economic graph (e.g., ammunition spent, armor durability decay, repair fees, taxes).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <div className="font-mono font-bold text-amber-700">Gate (&loz;)</div>
            <div className="font-semibold text-zinc-900">Flow Router</div>
            <p className="text-zinc-600">Routes flowing tokens conditionally or probabilistically along branching edges (e.g., critical hit checks, branching skill trees).</p>
          </div>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">The Conservation Law of Steady-State Balance</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          In any internal game economy, the rate of change of total circulating currency in pool P over time is:
        </p>

        <div className="font-mono bg-zinc-100 p-3 rounded border border-zinc-200 text-xs sm:text-sm text-center text-zinc-900">
          dPool / dt = &sum; Inflow Rates(Sources) - &sum; Outflow Rates(Drains)
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          Enforcing steady-state equilibrium requires ensuring that inflow and outflow rates stay balanced across progression tiers:
        </p>

        <div className="space-y-2 text-xs sm:text-sm">
          <div className="border border-red-200 bg-red-50/40 p-3 rounded-lg">
            <strong>Economic Hyperinflation (Inflows &gt;&gt; Outflows):</strong> If sources persistently outpace drains, currency pool P &rarr; &infin;. Scarcity collapses, prices become trivial, and economic decisions lose all meaningful tension (e.g., late-game RPGs where players hoard millions of gold with nothing to buy).
          </div>
          <div className="border border-amber-200 bg-amber-50/40 p-3 rounded-lg">
            <strong>Economic Starvation (Outflows &gt;&gt; Inflows):</strong> If drains outpace sources without adequate player agency, progression stalls entirely, forcing tedious, repetitive grinding.
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          4. Emergent Systems Architecture: The Orthogonal Chemistry Matrix
        </h3>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Emergent behavior occurs when a system acts in an organized fashion beyond the sum capabilities of its individual parts.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Harvey Smith, <em>The Future of Game Design: Moving Beyond Deus Ex and Other Old Ideas</em> (GDC, 2001)
          </footer>
        </blockquote>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In traditional object-oriented game programming, interactions between objects are implemented via bespoke, pairwise inheritance callbacks:
        </p>

        <div className="border border-zinc-200 bg-zinc-50 p-4 rounded-lg space-y-2 text-xs font-mono text-zinc-900">
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
          Entities do not possess hardcoded interactions; instead, entities are simple compositions of physical tags and properties:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;A powerful tool we have for making change easier is decoupling; when we say two pieces of code are &lsquo;decoupled&rsquo;, we mean a change in one usually doesn&rsquo;t require a change in the other.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Robert Nystrom, <em>Game Programming Patterns</em> (Genever Benning, 2014, p. 195)
          </footer>
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs font-mono">
          <div className="border border-zinc-200 bg-white p-3 rounded">
            <span className="font-bold text-zinc-950">Entity: WoodenDoor</span>
            <div className="text-zinc-600 mt-1">[Flammable, Rigid, Heavy]</div>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded">
            <span className="font-bold text-zinc-950">Entity: FireArrow</span>
            <div className="text-zinc-600 mt-1">[Igniter, Kinetic, Piercing]</div>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded">
            <span className="font-bold text-zinc-950">Entity: MetalShield</span>
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

        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 text-xs sm:text-sm text-emerald-950">
          <span className="font-bold">Algorithmic Payoff:</span> With M elemental tags, authoring M system rules enables players to discover O(M&sup2;) emergent systemic behaviors without authoring a single additional line of object-specific code.
          When a player drops a metal sword between two circuit nodes during a thunderstorm to power a puzzle door in <em>Breath of the Wild</em>, no designer hardcoded "metal sword opens door." It emerged naturally from the decoupled chemistry matrix.
        </div>
      </section>
    </article>
  );
};
