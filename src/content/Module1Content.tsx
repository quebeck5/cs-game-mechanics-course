import React from 'react';

export const Module1Content: React.FC = () => {
  return (
    <article className="space-y-8 text-zinc-900 leading-normal text-sm sm:text-base">
      {/* Chapter Overview Box */}
      <div className="border border-zinc-200 bg-zinc-50 p-6 rounded-lg">
        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
          Chapter 1: Foundations of Interactive Systems • Study Duration: 2.5 Hours
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950">
          Formal Game Systems, The Lusory Attitude &amp; The Cybernetic Fun Pipeline
        </h2>
        <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
          In standard university Computer Science curricula, software engineering is taught through the doctrine of <strong>efficiency</strong>: eliminate computational latency, minimize algorithmic time complexity, eradicate friction, and transition the user from State A to State B in the fewest possible steps.
          When applied directly to game development, this engineering instinct produces lifeless, unplayable software.
          This chapter establishes why games require the intentional inversion of software engineering axioms—and formalizes the frameworks used by MIT, Stanford, and USC to design, analyze, and diagnose systemic fun.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          1. The Engineering Inversion: Bernard Suits &amp; The Lusory Attitude
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In business software, a database query that takes 30 seconds is a defect. A form with unnecessary fields is a UX failure.
          The primary objective of software engineering is to eliminate friction.
          However, in 1978, philosopher Bernard Suits published <em>The Grasshopper: Games, Life and Utopia</em>, presenting what remains the foundational definition of gameplay in formal academic literature:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;To play a game is to attempt to achieve a specific state of affairs [pre-lusory goal], using only means permitted by rules [lusory means], where the rules prohibit more efficient in favor of less efficient means [constitutive rules], and where the rules are accepted just because they make possible such activity [lusory attitude]. In short: playing a game is the voluntary attempt to overcome unnecessary obstacles.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Bernard Suits, <em>The Grasshopper: Games, Life and Utopia</em> (University of Toronto Press, 1978, p. 41)
          </footer>
        </blockquote>

        <p className="text-sm leading-relaxed text-zinc-800">
          To understand this definition as a computer scientist, dissect its four constituent variables:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">1. PRE-LUSORY GOAL</div>
            <div className="font-semibold text-zinc-950">The Identifiable State Objective</div>
            <p className="text-zinc-600">
              A state of affairs that can be described without referencing the game’s rules. In Golf, the pre-lusory goal is depositing a 1.68-inch sphere into a 4.25-inch hole in the turf. In Chess, it is trapping the opponent's wooden King piece so it has no legal moves.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">2. CONSTITUTIVE RULES</div>
            <div className="font-semibold text-zinc-950">The Inefficiency Constraints</div>
            <p className="text-zinc-600">
              Rules that explicitly forbid the most efficient physical or logical means of reaching the pre-lusory goal. If an enterprise engineer optimized Golf, the optimal algorithm is trivial: walk to the hole and drop the ball inside. Time complexity: O(d). Error rate: 0%. The constitutive rules mandate that you stand 400 yards away and swat the sphere with an absurdly thin piece of bent metal.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">3. LUSORY MEANS</div>
            <div className="font-semibold text-zinc-950">The Permitted Action Space</div>
            <p className="text-zinc-600">
              The severely restricted subset of actions permitted by the rules. You may hit the golf ball with a club, but you may not throw it, carry it, or kick it. You may move a Chess Knight in an L-shape, but you may not slide it diagonally across the board.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">4. THE LUSORY ATTITUDE</div>
            <div className="font-semibold text-zinc-950">Voluntary Acceptance of Friction</div>
            <p className="text-zinc-600">
              The psychological state where the player willingly embraces these inefficient, arbitrary constraints solely because they make the resulting activity possible. If you are forced at gunpoint to play Golf, you are not playing a game; you are performing labor under duress.
            </p>
          </div>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">The Friction Paradox in Game Engineering</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          Here lies the fundamental paradox for computer scientists: <strong>In enterprise software, friction is a bug. In game design, friction is the medium itself.</strong>
          If you eliminate friction in an accounting application, users applaud. If you eliminate friction in a game—by allowing characters to fly through walls, giving unlimited ammunition, or auto-completing challenges—you destroy the game.
        </p>

        <p className="text-sm leading-relaxed text-zinc-800">
          However, not all friction is good friction. Game developers distinguish between two categories of resistance:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>Constitutive Friction (Good Resistance):</strong> Obstacles engineered to test cognitive processing, spatial anticipation, or motor execution within the player's flow corridor. Overcoming constitutive friction releases dopamine and fosters a sense of competence.
          </li>
          <li>
            <strong>Extraneous Friction (Bad Resistance):</strong> Arbitrary obstacles caused by unresponsive controls, confusing visual affordances, dropped input frames, unskippable cutscenes, or untelegraphed instant deaths. Extraneous friction triggers cognitive fatigue and frustration rather than mastery.
          </li>
        </ul>

        <blockquote className="border-l-4 border-zinc-400 bg-zinc-50 pl-4 py-2.5 my-3 text-xs sm:text-sm italic text-zinc-700">
          &ldquo;Meaningful play emerges from the interaction between players and the system of the game, as well as from the context in which the game is played.&rdquo;
          <footer className="not-italic text-xs text-zinc-500 font-medium mt-1">
            &mdash; Katie Salen &amp; Eric Zimmerman, <em>Rules of Play: Game Design Fundamentals</em> (MIT Press, 2004, p. 34)
          </footer>
        </blockquote>

        <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 text-xs sm:text-sm text-amber-950">
          <span className="font-bold">Architectural Takeaway:</span> Your job as a game systems engineer is not to eliminate difficulty or streamline state transitions. Your job is to construct an elegant, mathematically coherent set of unnecessary obstacles that reward player mastery.
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          2. The MDA Framework: Architectural Decoupling of Games
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In 2004, Robin Hunicke (USC / Funomena), Marc LeBlanc (Sega / EA), and Robert Zubek (Zynga / Northwestern) authored <em>MDA: A Formal Approach to Game Design and Game Research</em>.
          The framework established a formal architectural abstraction that decouples game development into three operational layers:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;From the designer’s perspective, mechanics generate dynamics that generate aesthetics, all of which condition the player’s perspective: aesthetics set the player’s expectations, which are met through dynamics and mechanics.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Robin Hunicke, Marc LeBlanc, &amp; Robert Zubek, <em>MDA: A Formal Approach to Game Design and Game Research</em> (AAAI Press, 2004, p. 2)
          </footer>
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">1. MECHANICS (M)</div>
            <div className="font-bold text-zinc-950">Source Code &amp; Data Structures</div>
            <p className="text-zinc-600">
              The formal rules, algorithms, data representations, state machine tables, and physics update functions written by the software engineer. Mechanics are deterministic, static at rest, and completely controlled by the programmer.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-indigo-700">2. DYNAMICS (D)</div>
            <div className="font-bold text-zinc-950">Runtime System State Space</div>
            <p className="text-zinc-600">
              The execution trace generated when human player input couples with mechanics over time. Dynamics encompass emergent behaviors, economic flows, pacing oscillations, and tactical strategies that arise at runtime.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-purple-700">3. AESTHETICS (A)</div>
            <div className="font-bold text-zinc-950">Cognitive &amp; Emotional Experience</div>
            <p className="text-zinc-600">
              The emotional, psychological, and neurobiological response evoked in the player as they interact with the dynamic system. Crucially, aesthetics in MDA does NOT mean graphics or visual art; it means the taxonomy of "fun".
            </p>
          </div>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">The Directional Perspective Inversion</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          The central insight of the MDA framework is that the game creator and the game consumer view the software execution pipeline in exactly opposite directions:
        </p>

        <div className="border border-zinc-200 bg-zinc-50 p-4 rounded-lg space-y-2 font-mono text-xs">
          <div className="text-blue-700 font-bold">ENGINEER'S PERSPECTIVE (AUTHORING PIPELINE):</div>
          <div className="text-zinc-800">Mechanics (Code Rules) &rarr; Dynamics (Runtime State) &rarr; Aesthetics (Player Emotion)</div>
          <div className="pt-2 text-purple-700 font-bold">PLAYER'S PERSPECTIVE (EXPERIENCE PIPELINE):</div>
          <div className="text-zinc-800">Aesthetics (Emotion Felt) &larr; Dynamics (Observed Behavior) &larr; Mechanics (Inferred Rules)</div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          As a software engineer, you only have direct programmatic access to <strong>Mechanics</strong>.
          You cannot write a function called <code>evokeAdrenaline()</code> or <code>player.setEmotion("thrill")</code>.
          Instead, you write mechanics: you decrease ammo capacity, increase enemy movement speed, and add a 4-frame parry window.
          When executed, those mechanics produce runtime dynamics (the player must dance on the razor edge of death).
          Those dynamics finally evoke the desired aesthetic: tension, triumph, and relief.
        </p>

        <h4 className="text-base font-bold text-zinc-900 mt-4">Marc LeBlanc's 8 Aesthetic Taxonomies of "Fun"</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          When a playtester says "this game isn't fun," that feedback is useless to an engineer. It is like a user reporting "the website is bad."
          To diagnose and fix game systems, LeBlanc categorized "fun" into eight distinct, actionable aesthetic categories:
        </p>

        <blockquote className="border-l-4 border-zinc-400 bg-zinc-50 pl-4 py-2 my-3 text-xs sm:text-sm italic text-zinc-700">
          &ldquo;In discussing the aesthetic goals of a game, we want to walk away from words like &lsquo;fun&rsquo; and &lsquo;gameplay&rsquo;, and towards a more refined vocabulary.&rdquo;
          <footer className="not-italic text-xs text-zinc-500 font-medium mt-1">
            &mdash; Marc LeBlanc, <em>MDA: A Formal Approach to Game Design and Game Research</em> (AAAI Press, 2004, p. 2)
          </footer>
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-2 text-xs">
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-bold text-blue-700">1. Sensation</span>
            <div className="font-semibold text-zinc-900">Visceral Sensory Pleasure</div>
            <p className="text-zinc-600">Tactile motor response, responsive controls, visual feedback, sound design (e.g., <em>Geometry Wars, Rez</em>).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-bold text-blue-700">2. Fantasy</span>
            <div className="font-semibold text-zinc-900">Make-Believe &amp; Immersion</div>
            <p className="text-zinc-600">Inhabiting an alternate reality, role-playing a fictional persona (e.g., <em>Skyrim, Elite Dangerous</em>).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-bold text-blue-700">3. Narrative</span>
            <div className="font-semibold text-zinc-900">Dramatic Progression</div>
            <p className="text-zinc-600">Story, character arcs, emotional catharsis, escalating stakes (e.g., <em>The Last of Us, Disco Elysium</em>).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-bold text-blue-700">4. Challenge</span>
            <div className="font-semibold text-zinc-900">Mastery &amp; Competence</div>
            <p className="text-zinc-600">Overcoming difficult obstacles through skill acquisition, problem-solving (e.g., <em>Dark Souls, Celeste</em>).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-bold text-blue-700">5. Fellowship</span>
            <div className="font-semibold text-zinc-900">Social Interdependence</div>
            <p className="text-zinc-600">Cooperation, communication, team coordination, communal bonds (e.g., <em>Left 4 Dead, World of Warcraft</em>).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-bold text-blue-700">6. Discovery</span>
            <div className="font-semibold text-zinc-900">Uncharted Exploration</div>
            <p className="text-zinc-600">Mapping unfamiliar territory, uncovering hidden mechanics or secrets (e.g., <em>Outer Wilds, Metroid</em>).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-bold text-blue-700">7. Expression</span>
            <div className="font-semibold text-zinc-900">Creative Agency</div>
            <p className="text-zinc-600">Self-expression, building, customizing, choosing unique playstyles (e.g., <em>Minecraft, Armored Core</em>).</p>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1">
            <span className="font-bold text-blue-700">8. Submission</span>
            <div className="font-semibold text-zinc-900">Abiding Routine / Zen</div>
            <p className="text-zinc-600">Rhythmic relaxation, low-cognitive-load ritual, unwinding (e.g., <em>Animal Crossing, Tetris</em>).</p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 text-xs sm:text-sm text-blue-950">
          <span className="font-bold">Engineering Diagnostic Rule:</span> When playtesters complain, <em>"Your platformer feels sluggish"</em> (an aesthetic critique), do not naively increase character walk speed.
          Diagnose the pipeline in reverse: Why does the player perceive sluggishness? Look at the Dynamics: are they spending 80% of their time waiting for moving platforms? Then look at the Mechanics: are platform cycle periods set to 12 seconds instead of 4 seconds? Fix the root Mechanic to resolve the Aesthetic defect.
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          3. Raph Koster's Information Theory of Fun
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In his seminal work <em>A Theory of Fun for Game Design</em> (2004), veteran designer Raph Koster approached the question of why humans play from an evolutionary and information-theoretic perspective.
          Why did human biology evolve to reward sitting in front of abstract simulations with intense neurochemical pleasure?
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Fun is just another word for learning. With games, learning is the drug.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Raph Koster, <em>A Theory of Fun for Game Design</em> (Paraglyph Press, 2004, p. 40)
          </footer>
        </blockquote>

        <p className="text-sm leading-relaxed text-zinc-800">
          The human brain is a <strong>lossy pattern-compression engine</strong>.
          Every second, our senses receive millions of bits of unstructured environmental data.
          To survive, our neural networks continuously compress this entropy into predictive models.
          When the brain discovers a novel pattern in a complex system and successfully derives a mental model that predicts future states, it releases dopamine as an evolutionary reinforcement mechanism.
        </p>

        <h4 className="text-base font-bold text-zinc-900 mt-2">Formalizing Fun as Shannon Entropy Reduction</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          In Claude Shannon's mathematical theory of communication (1948), the entropy $H(X)$ of a discrete random variable $X$ with possible outcomes $x_1, \dots, x_n$ is defined as:
        </p>

        <div className="font-mono bg-zinc-100 p-3 rounded border border-zinc-200 text-xs sm:text-sm text-center text-zinc-900">
          H(X) = -&sum;<sub>i=1</sub><sup>n</sup> P(x<sub>i</sub>) &middot; log<sub>2</sub> P(x<sub>i</sub>)
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          In a game system, $H$ represents the player's uncertainty regarding the system's state space and behavioral outcomes.
          Koster's fundamental theorem posits that <strong>fun is the first derivative of cognitive entropy reduction over time</strong>:
        </p>

        <div className="font-mono bg-zinc-100 p-3 rounded border border-zinc-200 text-xs sm:text-sm text-center text-zinc-900">
          Fun &prop; - dH / dt &nbsp;&nbsp;&nbsp;&nbsp;(where dH/dt &lt; 0)
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          This mathematical relationship explains the three distinct operational regimes of every playable system:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="border border-red-200 bg-red-50/40 p-4 rounded-lg space-y-1">
            <div className="font-mono font-bold text-red-800">REGIME 1: MAXIMAL ENTROPY (dH/dt &asymp; 0, H &asymp; H_max) &rarr; ANXIETY &amp; NOISE</div>
            <p className="text-zinc-700">
              When a system presents observations with zero discernable structure—such as enemy attacks that have zero startup frames, random untelegraphed instant deaths, or completely erratic physics—the player's neural network cannot extract a compression model.
              Entropy remains maximal. The player experiences cognitive overload, helplessness, and acute anxiety.
            </p>
          </div>

          <div className="border border-blue-200 bg-blue-50/40 p-4 rounded-lg space-y-1">
            <div className="font-mono font-bold text-blue-800">REGIME 2: ACTIVE COMPRESSION (dH/dt &lt; 0) &rarr; DOPAMINE &amp; FLOW</div>
            <p className="text-zinc-700">
              The system presents a rich, non-trivial state space that possesses hidden regularities.
              As the player experiments, their brain constructs predictive heuristics (e.g., "enemy knights always swing twice before their shield drops," or "dashing cancels recovery frames").
              The rate of entropy reduction is high. The player experiences the neurobiological state colloquially known as "fun" or "grokking".
            </p>
          </div>

          <div className="border border-zinc-200 bg-zinc-100 p-4 rounded-lg space-y-1">
            <div className="font-mono font-bold text-zinc-700">REGIME 3: ZERO REMAINING ENTROPY (H &rarr; 0) &rarr; IMMEDIATE BOREDOM</div>
            <p className="text-zinc-700">
              Once the mental model is 100% predictive and the state space is completely compressed, no further entropy can be extracted.
              Consider <strong>Tic-Tac-Toe</strong>: for a 5-year-old child, the combinatorial space contains entropy, making it engaging.
              Once a computer science student derives the minimax tree and recognizes that optimal play forces an invariant draw, $H = 0$.
              The game is "solved." The brain immediately halts dopamine release, and the game becomes unbearably dull.
            </p>
          </div>
        </div>

        <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 text-xs sm:text-sm text-amber-950">
          <span className="font-bold">The Curse of Depth:</span> Great games like <em>Chess, Go, StarCraft</em>, and <em>Street Fighter</em> endure across decades because their state spaces are combinatorially vast (branching factor b &gt;&gt; 10), ensuring that human players never reach H = 0. The brain always has more patterns left to compress.
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          4. Csikszentmihalyi's Flow Channel &amp; The Sawtooth Pacing Curve
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In 1990, psychologist Mihaly Csikszentmihalyi formalized the concept of <strong>Flow</strong>: a state of deep absorption and optimal experience that occurs when there is an exact equilibrium between the challenges presented by an activity and the skills possessed by the actor.
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;The optimal state of inner experience is one in which there is order in consciousness; this happens when psychic energy is invested in realistic goals, and when skills match the opportunities for action.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Mihaly Csikszentmihalyi, <em>Flow: The Psychology of Optimal Experience</em> (Harper &amp; Row, 1990, p. 6)
          </footer>
        </blockquote>

        <p className="text-sm leading-relaxed text-zinc-800">
          In classical game design literature, the Flow Channel is depicted as a linear corridor between two boundary zones:
        </p>

        <ul className="list-disc pl-6 space-y-1 text-sm text-zinc-800">
          <li><strong>The Anxiety Zone (Challenge &gt;&gt; Skill):</strong> The task overwhelms the player's computational and motor capacity, causing stress and surrender.</li>
          <li><strong>The Boredom Zone (Skill &gt;&gt; Challenge):</strong> The task demands trivial effort, reducing entropy reduction to zero and inducing apathy.</li>
        </ul>

        <h4 className="text-base font-bold text-zinc-900 mt-2">The Critical Flaw of Flat Linear Pacing</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          A common mistake made by software engineers designing levels is implementing a monotonic linear difficulty curve:
        </p>

        <div className="font-mono bg-zinc-100 p-2.5 rounded border border-zinc-200 text-xs text-zinc-900">
          Challenge(t) = m &middot; t + C<sub>0</sub> &nbsp;&nbsp;&nbsp;&nbsp;(Monotonic Linear Ramp)
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          While this appears mathematically sound on paper, human neurobiology does not tolerate sustained, monotonic tension.
          Operating continuously at the upper edge of the flow channel triggers sympathetic nervous system exhaustion (cortisol buildup and mental fatigue).
          Conversely, dropping too low leads to immediate disengagement.
        </p>

        <h4 className="text-base font-bold text-zinc-900 mt-2">The Sawtooth Wave Architecture</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          World-class games (from <em>Super Mario</em> to <em>Half-Life</em> and <em>Elden Ring</em>) structure challenge progression as an oscillatory <strong>sawtooth wave</strong>:
        </p>

        <div className="font-mono bg-zinc-100 p-2.5 rounded border border-zinc-200 text-xs text-zinc-900">
          Challenge(t) = m &middot; t + A(t) &middot; sin(&omega; t) &nbsp;&nbsp;&nbsp;&nbsp;(Sawtooth Tension Pacing)
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          The sawtooth wave comprises four deliberate physiological phases:
        </p>

        <ol className="list-decimal pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>Introduction (Low Tension Valley):</strong> A new mechanic or enemy type is introduced in a safe, controlled environment where failure has zero consequence. Challenge drops, allowing the player to safely begin pattern compression.
          </li>
          <li>
            <strong>Development (Rising Tension Slope):</strong> The mechanic is layered with previously mastered obstacles, demanding higher cognitive integration and spatial accuracy.
          </li>
          <li>
            <strong>Twist / Climax (Peak Tension Spike):</strong> A boss battle, timed escape sequence, or complex exam room forces the player to execute the mechanic under severe pressure. Tension peaks near the anxiety threshold.
          </li>
          <li>
            <strong>Empowerment Valley (Rest &amp; Catharsis):</strong> Following the climax, difficulty drops sharply. The player is granted a reward, safe narrative dialogue, or the opportunity to use their newly mastered power to effortlessly defeat earlier enemy types. This allows the parasympathetic nervous system to recover before the next cycle begins.
          </li>
        </ol>
      </section>

      {/* Section 5 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          5. The "Toy Principle" and Tactile Prototyping
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          One of the most profound design methodologies at Nintendo, formulated by Shigeru Miyamoto, is the strict separation between a <strong>Toy</strong> and a <strong>Game</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-zinc-900">WHAT IS A TOY?</div>
            <div className="font-semibold text-blue-700">Intrinsic Kinesthetic Pleasure</div>
            <p className="text-zinc-600">
              A toy has no explicit rules, no victory conditions, no points, and no fail states.
              A ball, a yo-yo, or a sandbox are toys. You interact with them simply because the physical manipulation itself is intrinsically satisfying.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-zinc-900">WHAT IS A GAME?</div>
            <div className="font-semibold text-blue-700">Extrinsic Structure &amp; Objectives</div>
            <p className="text-zinc-600">
              A game takes a toy and wraps it with constitutive rules, win/loss conditions, scores, and competitive constraints.
              Basketball takes a rubber ball (toy) and introduces a hoop, a shot clock, and a traveling rule (game).
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          The fatal pitfall for computer scientists is building the extrinsic game layer (menus, scoring, levels, quest logs, multiplayer lobbies) before ensuring the underlying toy is intrinsically pleasurable.
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-2">
          &ldquo;A good idea is something that does not solve just one single problem, but rather can solve multiple problems at once.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Shigeru Miyamoto, <em>Iwata Asks: New Super Mario Bros. Wii</em> (Nintendo, 2009)
          </footer>
        </blockquote>

        <p className="text-sm leading-relaxed text-zinc-800">
          During the development of <em>Super Mario 64</em>, the engineering and design team spent nearly three months with Mario in a flat, featureless grid environment containing nothing but a single wooden box and a bouncing rubber ball.
          They did not design Bob-omb Battlefield or author camera path algorithms until running, jumping, skidding, wall-kicking, and diving felt joyful in total isolation.
        </p>

        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 text-xs sm:text-sm text-emerald-950">
          <span className="font-bold">Summary for Chapter 1:</span>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Games require voluntary acceptance of inefficient means to achieve goals (Suits' Lusory Attitude).</li>
            <li>Engineers author Mechanics; players experience Aesthetics; Dynamics emerge in between (Hunicke et al. MDA).</li>
            <li>Fun is the cognitive sensation of pattern extraction and entropy reduction over time (Koster's Information Theory).</li>
            <li>Difficulty must oscillate in a sawtooth wave to prevent psychological burnout (Csikszentmihalyi's Flow).</li>
            <li>Validate the intrinsic tactile joy of the core toy before constructing rules, goals, or narrative systems.</li>
          </ol>
        </div>
      </section>
    </article>
  );
};
