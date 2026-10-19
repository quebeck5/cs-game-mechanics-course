import React from 'react';

export const Module3Content: React.FC = () => {
  return (
    <article className="space-y-8 text-zinc-900 leading-normal text-sm sm:text-base">
      {/* Chapter Overview Box */}
      <div className="border border-zinc-200 bg-zinc-50 p-6 rounded-lg">
        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
          Chapter 3: Decisions &amp; Spatial Topology • Study Duration: 2.5 Hours
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950">
          Decisions, Space &amp; Imperfect Information: Frame Data, Telegraphs &amp; Graph Topology
        </h2>
        <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
          Sid Meier, creator of <em>Civilization</em>, famously defined a good game as <strong>"a series of interesting decisions."</strong>
          To a software engineer, what mathematically distinguishes an "interesting" decision from a trivial calculation (A &succ; B) or a coin toss?
          This chapter formalizes the anatomy of meaningful choices, models real-time tactical combat as 60 FPS pushdown automata, derives the mathematics of Frame Advantage (&Delta;F), and analyzes level spaces through the lens of Graph Theory (Directed Acyclic Graphs, Cut Vertices, and Cyclic Metroidvania loops).
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          1. The Anatomy of Choice: Sid Meier's Decision Space Taxonomy
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In interactive software, whenever the user is presented with a choice between actions A<sub>1</sub>, A<sub>2</sub>, &hellip;, A<sub>n</sub>, the resulting decision space falls into one of three mathematical categories:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;A good game is a series of interesting decisions.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Sid Meier, <em>Sid Meier's Memoir!: A Life in Computer Games</em> (W. W. Norton &amp; Company, 2020, p. 182)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 16: Pareto Trade-Offs vs. Multiple-Choice Drills)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> Traditional primary-school quiz apps have 1 right answer (a Dominant Strategy once memorized) and 3 wrong answers (Blind Guessing if unknown). Neither teaches flexible number sense! True primary mathematical thinking comes from choosing between valid strategies with different trade-offs.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> In a 40-minute Grade 3 Bridge-Builder &amp; Place-Value mini-game, give the child three Pareto-balanced building blocks to span a 36-meter river: <strong>10-Meter Stone Beams</strong> (fast to place, cheap, but too long for narrow 1-meter gaps), <strong>5-Meter Wood Planks</strong> (medium reach, flexible), and <strong>1-Meter Lego Bricks</strong> (exact precision, but takes too many backpack slots if used for the whole river). The child must weigh speed, slot limits, and precision to pick the right combination!
          </p>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="border border-red-200 bg-red-50/40 p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-red-800">CATEGORY 1: DOMINANT STRATEGIES (A &succ; B UNDER ALL STATES)</div>
            <div className="text-sm font-bold text-zinc-950">The Trivial Calculation Trap</div>
            <p className="text-zinc-700">
              A dominant choice occurs when one action yields strictly superior utility regardless of the game state:
              <span className="font-mono ml-1">U(A_1 | S) &gt; U(A_k | S) &forall; k &ne; 1, &forall; S</span>.
              For example, if Weapon A deals 50 damage at 10 mana, while Weapon B deals 30 damage at 15 mana, Weapon B ceases to exist in the player's mind.
              Dominant choices destroy agency; the player does not make a creative decision, but merely computes the obvious maximum.
            </p>
            <div className="border-l-2 border-red-500 bg-white/80 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Prevent children from solving every problem by tapping the <code>+1</code> block 50 times in a row by capping the bridge crane at 8 total moves per level, encouraging them to use <code>+10</code> rods and <code>&times;2</code> doublers.
            </div>
          </div>

          <div className="border border-amber-200 bg-amber-50/40 p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-amber-800">CATEGORY 2: BLIND CHOICES (ZERO REASONABLE INFERENCE)</div>
            <div className="text-sm font-bold text-zinc-950">The Arbitrary Guess Trap</div>
            <p className="text-zinc-700">
              A blind choice occurs when the player must select between options with zero information or perceptual signifiers (e.g., choosing between two identical closed doors, where one leads to treasure and the other to instant spikes).
              Because the decision space contains no discernable pattern, success feels like unearned luck, and failure feels like unfair punishment.
            </p>
            <div className="border-l-2 border-amber-500 bg-white/80 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Never make a 7-year-old guess blindly between mystery doors or unlabelled fractions; always provide a &ldquo;X-Ray Magnifying Glass&rdquo; or visual grid overlay so they can count the slices and deduce the right answer before tapping.
            </div>
          </div>

          <div className="border border-blue-200 bg-blue-50/40 p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-800">CATEGORY 3: MEANINGFUL DECISIONS (ASYMMETRIC TRADE-OFFS)</div>
            <div className="text-sm font-bold text-zinc-950">The Pareto Frontier of Tactical Design</div>
            <p className="text-zinc-700">
              A choice is meaningful when each option occupies a unique point on a <strong>Pareto Frontier</strong> across multiple orthogonal trade-off axes:
              Speed vs. Safety, Resource Consumption vs. Immediate Output, Short-Term Survival vs. Long-Term Compounding, or High Certainty vs. High-Variance Upside.
            </p>
            <div className="border-l-2 border-blue-500 bg-white/80 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Let children choose between different ways to make the same value (e.g., paying 75&cent; at the animal bakery using three 25&cent; quarters for a &ldquo;Speed Star&rdquo; vs. seven 10&cent; dimes + one 5&cent; nickel when quarters run out).
            </div>
          </div>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">Case Study: Pareto-Optimal Weapon Design</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          Consider an action combat game with three distinct weapon classes. To ensure each weapon offers a meaningful choice, designers construct an orthogonal trade-off matrix:
        </p>

        <div className="overflow-x-auto border border-zinc-200 bg-white rounded-lg p-3 text-xs font-mono">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500">
                <th className="pb-2 pr-2">Weapon Archetype</th>
                <th className="pb-2 pr-2">Startup Window</th>
                <th className="pb-2 pr-2">Spatial Reach</th>
                <th className="pb-2 pr-2">Damage per Hit</th>
                <th className="pb-2 pr-2">Recovery (Punish Risk)</th>
                <th className="pb-2 pr-2">Tactical Purpose</th>
                <th className="pb-2">30&ndash;60 Min Primary-School Mini-Game Analog</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              <tr>
                <td className="py-2 pr-2 font-bold text-blue-700">Twin Daggers</td>
                <td className="pr-2">5 frames (83ms)</td>
                <td className="pr-2">48 px (Melee)</td>
                <td className="pr-2">9 HP (Low)</td>
                <td className="pr-2">8 frames (Extremely Safe)</td>
                <td className="pr-2">Interrupting enemy startup; low risk</td>
                <td className="font-sans text-zinc-700"><strong>1-Unit Cube / Penny Coin:</strong> Instant fine-grained precision for filling tiny 1-unit gaps, but takes too many moves for big numbers.</td>
              </tr>
              <tr>
                <td className="py-2 pr-2 font-bold text-emerald-700">Halberd Spear</td>
                <td className="pr-2">11 frames (183ms)</td>
                <td className="pr-2">92 px (Long)</td>
                <td className="pr-2">17 HP (Medium)</td>
                <td className="pr-2">14 frames (Moderate)</td>
                <td className="pr-2">Out-ranging enemies from safe distance</td>
                <td className="font-sans text-zinc-700"><strong>10-Rod / Dime Coin:</strong> Balanced reach for building medium bridges (20&ndash;50 units) quickly and safely.</td>
              </tr>
              <tr>
                <td className="py-2 pr-2 font-bold text-amber-700">Seismic Hammer</td>
                <td className="pr-2">20 frames (333ms)</td>
                <td className="pr-2">68 px (Medium)</td>
                <td className="pr-2">34 HP (Massive)</td>
                <td className="pr-2">22 frames (Lethally Unsafe)</td>
                <td className="pr-2">Punishing boss recovery windows for burst</td>
                <td className="font-sans text-zinc-700"><strong>100-Flat / Dollar Bill:</strong> Huge power to cross giant 100-unit canyons in 1 move, but overshoots and bounces back if the gap is only 60 units!</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          No weapon dominates the others. The optimal weapon choice is a dynamic function of the immediate combat context: the Dagger shines against rapid swarming enemies; the Spear dominates narrow choke points; the Hammer rewards precision reads on boss recovery windows.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          2. Action Combat Automata: The 3-Phase State Machine
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In a naive game prototype, pressing Attack immediately subtracts enemy health on frame 0:
        </p>

        <div className="font-mono bg-zinc-100 p-2.5 rounded border border-zinc-200 text-xs text-zinc-900">
          // The Naive Attack: Destroys Tactical Depth
          if (input.attackJustPressed) &#123;
            targetEnemy.hp -= 25;
            spawnBloodEffect();
          &#125;
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          Instant attacks eliminate tactical gameplay entirely. Combat reduces to a raw CPS (clicks-per-second) macro race where whoever clicks fastest wins.
          In every critically acclaimed action title (such as <em>Street Fighter, Dark Souls, Monster Hunter, Hades</em>, and <em>Hollow Knight</em>), every attack action is modeled as an <strong>uninterruptible 3-stage pushdown automaton</strong>:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Human perception is only so fast, so you&rsquo;re acting on information that&rsquo;s a few sixtieths of a second old; some of your moves are made on reaction, but many of your moves are essentially made in a double-blind situation.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; David Sirlin, <em>Playing to Win: Becoming the Champion</em> / <em>Designing Yomi</em> (Sirlin Games, 2010)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 17: Commitment Phases to Prevent Impulsive Tapping)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> Primary school children (ages 6&ndash;11) frequently exhibit impulsive &ldquo;guess-and-tap spamming&rdquo;—rapidly tapping every multiple-choice bubble on an iPad in 1 second until the green chime plays, learning zero math.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Replace instant answer buttons with a <strong>3-Stage Playful Delivery Automaton</strong>: (1) <em>Startup (1.5s)</em>: the child loads their chosen fraction pie onto the Conveyor Belt and the delivery robot winds up its wheels; (2) <em>Active (2.0s)</em>: the robot rolls up to the Monster Customer and serves the pie slices one by one; (3) <em>Recovery (1.5s)</em>: if the pie size doesn&rsquo;t match, the robot scratches its head and rolls back to the kitchen counter while showing the gap. Because each delivery takes 5 seconds of charming animation, counting once is much faster than random tapping!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-amber-700">STAGE 1: STARTUP (F_startup)</div>
            <div className="font-semibold text-zinc-950">Commitment &amp; Readability</div>
            <p className="text-zinc-600">
              The wind-up animation phase before the weapon emits a physical hitbox.
              The character is locked into their spatial trajectory and cannot block or dodge.
              <strong> Biological Rule:</strong> Because human visual-motor reaction time is &asymp; 200ms (~12 frames at 60 FPS), any attack with F<sub>startup</sub> &lt; 12 frames cannot be dodged on reaction—it can only be anticipated on tactical prediction.
            </p>
            <div className="border-l-2 border-amber-500 bg-amber-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Use a 1.2s animated wind-up when the child presses &ldquo;Go!&rdquo; where the character counts out loud (&ldquo;One, two, three, launch!&rdquo;), prompting the child to watch and predict where their block will land.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-red-700">STAGE 2: ACTIVE (F_active)</div>
            <div className="font-semibold text-zinc-950">Spatial Intersection Check</div>
            <p className="text-zinc-600">
              The brief temporal window (typically 2 to 6 frames) during which the weapon’s collision volume is active in the world simulation.
              If the active hitbox intersects the enemy's hurtbox, damage and hitstun are applied.
            </p>
            <div className="border-l-2 border-red-500 bg-red-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Animate the child&rsquo;s blocks or coding turtle physically stepping across each tile of the bridge one square at a time with musical notes so they can count along.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">STAGE 3: RECOVERY (F_recovery)</div>
            <div className="font-semibold text-zinc-950">Vulnerability Opportunity Cost</div>
            <p className="text-zinc-600">
              The follow-through animation phase. The hitbox is retracted and harmless, but the attacker is completely immobilized and unable to defend.
              If the attack missed ("whiffed"), the opponent has F<sub>recovery</sub> frames to close the distance and execute a guaranteed counter-strike ("Whiff Punish").
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> If the answer was too big or too small, hold a 1.5-second gentle recovery animation where the helper mascot points to the leftover gap before resetting the blocks, turning mistakes into visual clues.
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          3. The Mathematics of Frame Advantage (&Delta;F)
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          When an active attack connects with an opponent, two concurrent timers are initiated:
        </p>

        <blockquote className="border-l-4 border-zinc-400 bg-zinc-50 pl-4 py-2 my-3 text-xs sm:text-sm italic text-zinc-700">
          &ldquo;Very often in competitive play, a player will forgo the obvious safe option in order to test counters and discover which moves leave them with frame advantage.&rdquo;
          <footer className="not-italic text-xs text-zinc-500 font-medium mt-1">
            &mdash; David Sirlin, <em>Playing to Win: Becoming the Champion</em> (Lulu, 2005, Chapter 3)
          </footer>
        </blockquote>

        <ol className="list-decimal pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>Attacker Recovery:</strong> The attacker must spend F<sub>recovery</sub> frames completing their follow-through animation.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Represents how long the child&rsquo;s helper crane or bakery oven takes to finish its action before it can pick up the next block.
            </div>
          </li>
          <li>
            <strong>Defender Stun:</strong> The defender is locked in an involuntary flinch state (F<sub>hitstun</sub> if the attack hit, or F<sub>blockstun</sub> if the attack was blocked).
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Represents how long the friendly monster customer is happily munching on a snack before asking for the next order.
            </div>
          </li>
        </ol>

        <p className="text-sm leading-relaxed text-zinc-800">
          <strong>Frame Advantage (&Delta;F)</strong> is the difference between defender stun and attacker recovery:
        </p>

        <div className="font-mono bg-zinc-100 p-3 rounded border border-zinc-200 text-xs sm:text-sm text-center text-zinc-900">
          &Delta;F = F<sub>stun</sub> - F<sub>recovery</sub>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          This single integer determines tactical initiative across three distinct mathematical regimes:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="border border-emerald-200 bg-emerald-50/40 p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-emerald-800">CASE 1: POSITIVE FRAME ADVANTAGE (&Delta;F &gt; 0, "PLUS ON BLOCK / PLUS ON HIT")</div>
            <p className="text-zinc-700">
              The attacker recovers &Delta;F frames <em>before</em> the defender can act.
              The attacker retains absolute tactical initiative. If the attacker initiates another attack whose startup is faster than the defender's fastest option plus &Delta;F, the defender cannot interrupt.
            </p>
            <div className="border-l-2 border-emerald-500 bg-white/80 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> When a child uses smart grouping (e.g., dropping a single <code>10-pack</code> instead of ten <code>1-blocks</code>), their crane finishes way ahead of the customer timer (<code>&Delta;F &gt; 0</code>), earning bonus time to decorate their bakery!
            </div>
          </div>

          <div className="border border-zinc-200 bg-zinc-100 p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-zinc-800">CASE 2: NEUTRAL FRAME ADVANTAGE (&Delta;F = 0)</div>
            <p className="text-zinc-700">
              Both entities return to idle on the exact same frame.
              Initiative is tied; the next encounter is decided purely by whose subsequent input has a faster startup window.
            </p>
            <div className="border-l-2 border-zinc-500 bg-white/80 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Occurs when the child&rsquo;s counting method finishes just in time as the next friendly customer walks through the door—steady progress, but a hint that bundling by 5s or 10s could make life even easier.
            </div>
          </div>

          <div className="border border-red-200 bg-red-50/40 p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-red-800">CASE 3: NEGATIVE FRAME ADVANTAGE (&Delta;F &lt; 0, "MINUS ON BLOCK")</div>
            <p className="text-zinc-700">
              The defender recovers |&Delta;F| frames <em>before</em> the attacker finishes recovery.
              Here lies the critical threshold between <strong>Safe</strong> and <strong>Punishable</strong> moves:
            </p>
            <div className="font-mono bg-white p-2.5 rounded border border-red-200 text-xs mt-2 space-y-1 text-zinc-800">
              <div>// Safe on Block: Defender recovers first, but cannot strike in time</div>
              <div>if (abs(&Delta;F) &lt; FastestDefenderStartup) &rarr; SAFE (-4 on block vs 6-frame jab)</div>
              <div className="pt-1 text-red-700 font-bold">// Punishable on Block: Defender has guaranteed unblockable counter-hit</div>
              <div className="text-red-700">if (abs(&Delta;F) &ge; FastestDefenderStartup) &rarr; PUNISHABLE (-12 on block vs 8-frame strike)</div>
            </div>
            <div className="border-l-2 border-red-500 bg-white/80 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> If a child tries to fill a <code>50-berry</code> order by dropping fifty individual <code>1-berries</code> one at a time, the crane gets tired and lags behind the queue (<code>&Delta;F &lt; 0</code>), gently motivating them to try the <code>10-berry</code> crate.
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          4. Cognitive Affordances, Signifiers &amp; Telegraphs (Donald Norman &amp; Celia Hodent)
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In <em>The Design of Everyday Things</em>, cognitive scientist Donald Norman distinguished between two core principles of interaction design:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Affordances define what actions are possible; signifiers specify how people discover those possibilities: signifiers are signs, perceptual signals of what can be done.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Don Norman, <em>The Design of Everyday Things: Revised and Expanded Edition</em> (Basic Books, 2013, p. 19)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 18: Self-Documenting Shape Signifiers)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> Many 6-to-8-year-olds are still learning to read! If your 40-minute primary-school mini-game relies on written tutorial pop-ups, early readers get stuck before the math or science even begins. The interface must be 100% self-explanatory through visual <em>Shape Signifiers</em>.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Encode mathematical and coding rules into physical <strong>Puzzle-Piece Socket Shapes</strong> (just like <em>ScratchJr</em> or wooden shape sorters): make <code>Action Verbs</code> (Move, Jump) blue jigsaw blocks with bottom tabs, <code>Number Inputs</code> round pegs that only fit inside round holes, and <code>Repeat Loops</code> C-shaped alligator mouths that wrap around other blocks. When a child picks up a block with their finger, valid sockets wiggle and glow gold while incompatible sockets stay asleep.
          </p>
        </div>

        <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>Affordance:</strong> The actual physical or logical properties that determine what actions are possible (e.g., a door affords pushing; a boss attack affords dodging).
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Make every primary manipulative directly touch-interactive—a clock&rsquo;s minute hand affords dragging around the dial, and a pizza affords slicing with a finger swipe.
            </div>
          </li>
          <li>
            <strong>Signifier:</strong> The perceptual signal that communicates <em>how</em> and <em>when</em> that affordance can be interacted with (e.g., a flat metal push-plate on a door; an expanding red circle beneath a boss).
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Draw a glowing cartoon glove handle on the clock&rsquo;s minute hand and a dotted scissor line across the pizza so a 6-year-old immediately sees where to touch without reading a single word.
            </div>
          </li>
        </ul>

        <p className="text-sm leading-relaxed text-zinc-800">
          In <em>The Gamer's Brain</em>, neuroscientist Celia Hodent emphasizes that in fast-paced action combat, players do not have time to consciously deliberate.
          To make difficult encounters feel fair rather than cheap, games deploy a <strong>3-Stage Sensory Telegraph Architecture</strong>:
        </p>

        <blockquote className="border-l-4 border-zinc-400 bg-zinc-50 pl-4 py-2 my-3 text-xs sm:text-sm italic text-zinc-700">
          &ldquo;At its core, UX is about understanding the gamer's brain: understanding human capabilities and limitations to anticipate how a game will be perceived, the emotions it will elicit, and how players will interact with it.&rdquo;
          <footer className="not-italic text-xs text-zinc-500 font-medium mt-1">
            &mdash; Celia Hodent, <em>The Gamer's Brain: How Neuroscience and UX Can Impact Video Game Design</em> (CRC Press, 2017, p. 3)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 19: Working-Memory Budget of 2&ndash;3 Chunks for Children)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> While adults hold 4 &plusmn; 1 chunks in working memory, developmental neuroscience shows that children aged 6&ndash;8 hold only <strong>2 to 3 chunks</strong> at once! Cluttered screens with scoreboards, timers, health bars, and text boxes instantly overload a child&rsquo;s working memory.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Enforce a strict <strong>Zero-Clutter Primary HUD Budget</strong>: show at most <strong>2 screen elements</strong> (the interactive toy in the center and the visual goal on the right), and put all memory aids directly on the objects themselves (e.g., a <code>5-block</code> always has 5 countable dots painted on its body so a 7-year-old never has to remember what color means 5).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
            <span className="font-bold text-blue-700">1. ACOUSTIC SIGNIFIER (&Delta;t = -400ms)</span>
            <div className="font-semibold text-zinc-950">Ear-Before-Eye Priming</div>
            <p className="text-zinc-600">Human auditory processing takes ~10ms compared to ~50ms for visual processing. A distinctive audio chime primes attention before visual action begins.</p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Play a cheerful whistle or slide-flute sound 500ms before a new customer order or moving number-cloud appears so the child looks at the right spot on the iPad.
            </div>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
            <span className="font-bold text-blue-700">2. SILHOUETTE EXAGGERATION (&Delta;t = -300ms)</span>
            <div className="font-semibold text-zinc-950">Visual Anticipation Pose</div>
            <p className="text-zinc-600">The enemy character pulls back their weapon, raises both arms, or flares energy particles, clearly breaking their idle silhouette.</p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Have the friendly monster open its mouth wide and hold up 3 fingers when it wants a <code>3-slice</code> snack so its silhouette telegraphs the math goal.
            </div>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
            <span className="font-bold text-blue-700">3. SPATIAL DECAL RING (&Delta;t = -200ms)</span>
            <div className="font-semibold text-zinc-950">Exact Boundary Projection</div>
            <p className="text-zinc-600">An expanding circular or cone decal renders on the collision mesh, displaying the exact geometric boundary that will become lethal.</p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Draw a glowing dotted landing circle on the number line or garden grid showing the exact tiles a block or sprinkler will cover before the child drops it.
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 text-xs sm:text-sm text-blue-950">
          <span className="font-bold">The Golden Rule of Telegraphing:</span> The duration of the telegraph window must be strictly greater than the human perceptual-motor latency: <code className="font-mono">TelegraphWindow &ge; 240ms</code> (and <code className="font-mono">&ge; 450ms</code> for primary school children aged 6&ndash;9).
          If an obstacle or timed event has a 120ms telegraph, a child is physically incapable of reacting in time.
        </div>
      </section>

      {/* Section 5 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          5. Level Design as Graph Theory: Topological Architecture
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          Level design is not merely the artistic placement of meshes and textures; at its core, level design is <strong>Graph Theory</strong>.
          Every level can be abstracted as a directed graph G = (V, E) where:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Machinations is a visual language for diagramming game economies, and a tool for drawing, and above all, simulating them without writing code.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Ernest Adams &amp; Joris Dormans, <em>Game Mechanics: Advanced Game Design</em> (New Riders, 2012, p. 57)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 20: Treehouse Hub-and-Spoke Map Topology)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> In a strictly linear 10-level sequence (V<sub>1</sub> &rarr; V<sub>2</sub> &rarr; &hellip; &rarr; V<sub>10</sub>), if an 8-year-old gets stuck on Puzzle 4 at Minute 15, they are completely blocked for the remaining 25 minutes of class and raise their hand in distress.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Structure the 30&ndash;60 minute primary-school mini-game around a cozy <strong>Treehouse / Town Square Hub</strong> connected to 3 parallel 10-minute Adventure Islands (e.g., Island A: Pizza Fractions, Island B: Potion Beakers, Island C: Garden Array Tiles). If a child finds one puzzle on Island B tricky, they can hop back to the Treehouse Hub, play Island C to earn a helper gadget, and return with fresh confidence before unlocking the final 10-minute Castle Party!
          </p>
        </div>

        <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>Vertices (V):</strong> Discrete spatial zones, rooms, arenas, or resource nodes.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Make each Vertex <code>V<sub>i</sub></code> a bite-sized 3-to-4 minute play station on an illustrated island map (8 to 10 stations total for a 40-minute class period).
            </div>
          </li>
          <li>
            <strong>Edges (E):</strong> Traversal paths, corridors, doorways, or elevators connecting zones.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Connect stations with rainbow bridges that unlock when the child earns 2 out of 3 stars, ensuring one tricky optional star never blocks a child from exploring the map.
            </div>
          </li>
        </ul>

        <h4 className="text-base font-bold text-zinc-900 mt-3">The Curse of the Linear Corridor: Trees and Cut Vertices</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          In a purely linear level (e.g., V<sub>1</sub> &rarr; V<sub>2</sub> &rarr; V<sub>3</sub> &rarr; V<sub>4</sub>), the graph is a tree without cycles.
          In graph theory, every intermediate vertex is an <strong>Articulation Point (Cut Vertex)</strong>: removing that vertex disconnects the graph into separate components.
        </p>
        <p className="text-sm leading-relaxed text-zinc-800">
          Linear corridors suffer from severe architectural drawbacks:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>Zero navigational choice:</strong> The player can only move forward or backward along a single path.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Strips away a child&rsquo;s sense of play choice and causes classroom bottlenecks whenever a single puzzle trips up an early reader.
            </div>
          </li>
          <li>
            <strong>Backtracking fatigue:</strong> If the player finds a key in Room 4 that unlocks a door in Room 1, they must re-traverse Rooms 3 and 2 through already-cleared, empty territory.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Never make young children walk slowly backward through empty rooms; let them tap any island on their sticker map to bounce there instantly on a trampoline!
            </div>
          </li>
        </ul>

        <h4 className="text-base font-bold text-zinc-900 mt-3">The Cyclic Metroidvania Graph &amp; One-Way Valves</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          Masterpieces of spatial design (such as <em>Dark Souls</em>' Lordran or <em>Super Metroid</em>'s Zebes) structure spaces as cyclic graphs featuring three key topological primitives:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
            <span className="font-bold text-blue-700">1. CENTRAL HUB NODES (deg(V) &ge; 3)</span>
            <div className="font-semibold text-zinc-950">Orienting Anchors</div>
            <p className="text-zinc-600">High-degree vertices (such as Firelink Shrine) that connect to multiple branching wings, providing a constant spatial anchor.</p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Use a cozy Central Treehouse or Pet Garden where every rescued critter and unlocked math gadget lives, giving the child a proud visual home base.
            </div>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
            <span className="font-bold text-blue-700">2. FLANKING CYCLES</span>
            <div className="font-semibold text-zinc-950">Alternative Paths</div>
            <p className="text-zinc-600">Loops that provide multiple routes around hazardous choke points, allowing stealth players or high-mobility builds to flank enemies.</p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Offer two parallel paths for every concept—a <em>Visual Block Path</em> (slicing pies) and a <em>Number-Line Path</em> (hopping frogs)—so both visual and numerical learners reach the goal.
            </div>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
            <span className="font-bold text-blue-700">3. ONE-WAY SHORTCUT VALVES</span>
            <div className="font-semibold text-zinc-950">Spatial Eureka Moments</div>
            <p className="text-zinc-600">Directed edges that are locked from side A, requiring a long treacherous loop to reach side B. Once unlocked from side B, the edge becomes bidirectional, permanently connecting deep dungeon zones back to safety.</p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Place a big mysterious &ldquo;100-Block Treasure Chest&rdquo; right in the Minute-1 Treehouse that the child can finally pop open at Minute 30 once they unlock the <code>10 &times; 10</code> Hundred-Maker!
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          The opening of a shortcut valve produces what cognitive psychologists call a <strong>Spatial Eureka Moment</strong>:
          the player’s mental map suddenly collapses two distant cognitive models into a single, cohesive topology.
        </p>
      </section>
    </article>
  );
};
