import React from 'react';

export const Module2Content: React.FC = () => {
  return (
    <article className="space-y-8 text-zinc-900 leading-normal text-sm sm:text-base">
      {/* Chapter Overview Box */}
      <div className="border border-zinc-200 bg-zinc-50 p-6 rounded-lg">
        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
          Chapter 2: Kinematics &amp; Sensation • Study Duration: 2.5 Hours
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950">
          The Physics of Virtual Sensation: 3Cs, Piecewise Kinematics &amp; Temporal Forgiveness
        </h2>
        <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
          When software engineers implement a platformer or action character for the first time, they typically write <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs font-mono border border-zinc-200">velocity.y += 9.8 * dt</code> and <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs font-mono border border-zinc-200">if (isGrounded &amp;&amp; keyJump) jump()</code>.
          The resulting character feels floaty, unresponsive, and imprecise.
          This chapter examines why Newtonian physics fails in interactive entertainment, dissects the human 240ms perceptual-motor loop, derives piecewise jump equations from spatial level design constraints, and constructs the temporal hysteresis buffers (Coyote Time and Input Buffering) that make virtual movement feel instantaneous.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          1. The Biology of Human-Computer Interaction: The 240ms Processor Loop
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          To build responsive controls, an engineer must first understand the biological hardware on the other end of the controller.
          In their landmark 1983 work <em>The Psychology of Human-Computer Interaction</em>, researchers Stuart Card, Thomas Moran, and Allen Newell introduced the <strong>Model Human Processor (MHP)</strong>.
          Every physical interaction between a player and a game simulation requires traversing three discrete biological pipeline stages:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;The Model Human Processor can be viewed as an information processing system consisting of three interacting subsystems: a perceptual system, a cognitive system, and a motor system.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Stuart K. Card, Thomas P. Moran, &amp; Allen Newell, <em>The Psychology of Human-Computer Interaction</em> (Lawrence Erlbaum Associates, 1983, p. 24)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 8: Cognitive Processor Allocation)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> Developmental psychology shows that primary school children (ages 6&ndash;9) have a slower perceptual-motor loop (~350&ndash;450ms vs. 240ms in adults) AND their <em>Cognitive Processor</em> (&tau;<sub>c</sub>) is working hard to count blocks, sound out phonics, or compare fractions. If a primary-school game demands fast arcade reflexes while doing math, young brains freeze up in frustration.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Implement <strong>&ldquo;Cozy Thinking Time&rdquo; (Automatic Time-Dilation)</strong>. Whenever a 7-year-old taps a catapult to aim a number-ball or opens their fraction potion belt, automatically pause or slow the world clock (<code className="bg-white px-1 py-0.5 rounded font-mono border border-blue-200">timeScale = 0.05</code>) and draw a dotted rainbow aiming preview arc. This gives the child 5+ seconds of calm thinking time before launching the bouncy physics action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">1. PERCEPTUAL PROCESSOR (&tau;<sub>p</sub> &asymp; 100ms)</div>
            <div className="font-semibold text-zinc-950">Sensory Transduction</div>
            <p className="text-zinc-600">
              Photons emitted by the display hit the retina; acoustic waveforms hit the eardrum.
              Chemical rhodopsin phototransduction occurs, and electrical impulses travel along the optic nerve into the primary visual cortex (V1) buffer.
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Use big friendly cartoon eyes, gentle bouncing idle animations, and high-contrast primary colors on interactive math blocks so a 6-year-old&rsquo;s Perceptual Processor spots what to tap without reading a single word.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-indigo-700">2. COGNITIVE PROCESSOR (&tau;<sub>c</sub> &asymp; 70ms)</div>
            <div className="font-semibold text-zinc-950">State Evaluation &amp; Decision</div>
            <p className="text-zinc-600">
              Working memory compares the visual input against stored mental models (e.g., "that red circle is an incoming fireball").
              The brain formulates an intentional motor response (e.g., "execute jump").
            </p>
            <div className="border-l-2 border-indigo-500 bg-indigo-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Because a child working out <code>8 + 5</code> needs 3&ndash;6 seconds of cognitive time, show visual 10-frame slots right on the game board so they don&rsquo;t have to hold numbers invisibly in their head.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-purple-700">3. MOTOR PROCESSOR (&tau;<sub>m</sub> &asymp; 70ms)</div>
            <div className="font-semibold text-zinc-950">Efferent Muscle Activation</div>
            <p className="text-zinc-600">
              Efferent nerve signals travel down the spinal cord into the hand muscles, contracting the flexor digitorum muscle to depress the physical gamepad button or spacebar.
            </p>
            <div className="border-l-2 border-purple-500 bg-purple-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Children aged 6&ndash;9 have developing fine-motor control on iPads and Chromebook trackpads; use oversized 48px touch targets and support both tap-to-move and drag-and-drop.
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          Summing these biological stages yields the minimum baseline human loop latency:
        </p>

        <div className="font-mono bg-zinc-100 p-2.5 rounded border border-zinc-200 text-xs sm:text-sm text-center text-zinc-900">
          Total Biological Loop Latency = &tau;<sub>p</sub> + &tau;<sub>c</sub> + &tau;<sub>m</sub> &asymp; 100ms + 70ms + 70ms = 240ms (~14.4 frames at 60 FPS)
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">The Complete End-to-End Latency Chain</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          The biological 240ms loop does not operate in isolation. It sits on top of physical hardware and software latencies:
        </p>

        <ol className="list-decimal pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>USB Polling Rate:</strong> 125Hz to 1000Hz (1ms to 8ms polling delay).
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Smooth touch/stylus input on school tablets so when a Grade 1 child traces letters or shapes with their finger, the rainbow ink trail stays silky smooth.
            </div>
          </li>
          <li>
            <strong>Engine Frame Interval:</strong> At 60 FPS, each frame takes 16.66ms. If an input arrives 0.1ms after the input poll, it waits 16.5ms for the next frame tick.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Run a fixed-step physics update so a bouncing math frog lands on the exact same number-line lilypad even on an older 30 FPS classroom Chromebook.
            </div>
          </li>
          <li>
            <strong>Double / Triple Buffering:</strong> Graphics driver swap chain queue introduces 1 to 3 frames of buffering (16.6ms to 50ms).
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Keep dragged counting blocks glued directly to the child&rsquo;s fingertip with zero lag and lift the block 15px upward so their chubby finger doesn&rsquo;t cover up the number label!
            </div>
          </li>
          <li>
            <strong>Display Refresh &amp; Pixel Response:</strong> Monitor GtG response time (1ms to 15ms).
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Use thick 4px outlines and bright, friendly shapes that remain crisp on budget school projectors and shared classroom iPads.
            </div>
          </li>
        </ol>

        <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 text-xs sm:text-sm text-amber-950">
          <span className="font-bold">The Game Feel Axiom:</span> Because end-to-end hardware latency is physically unavoidable, the human brain perceives any software that strictly enforces real-time synchronization as "laggy." A responsive game engine must not simply record inputs—it must <strong>actively anticipate, forgive, and buffer</strong> player intentions.
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          2. Non-Newtonian Kinematics: Deriving Gravity from Spatial Metrics
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          Why does real-world gravity feel terrible in 2D and 3D action games?
          On Earth, gravitational acceleration is g &asymp; 9.81 m/s&sup2;.
          Under this acceleration, a human jumping 1.5 meters into the air spends approximately <strong>1.1 seconds</strong> in flight.
          In a video game, spending 1.1 seconds floating in the air feels like swimming through maple syrup.
          Furthermore, real Newtonian gravity is perfectly symmetric: rising takes the exact same duration as falling.
        </p>

        <blockquote className="border-l-4 border-zinc-400 bg-zinc-50 pl-4 py-2.5 my-3 text-xs sm:text-sm italic text-zinc-700">
          &ldquo;I didn&rsquo;t want the player&rsquo;s controls to be another hurdle toward getting into the game, so Andy spent a lot of time tweaking them to feel smooth.&rdquo;
          <footer className="not-italic text-xs text-zinc-500 font-medium mt-1">
            &mdash; Derek Yu, <em>Spelunky</em> (Boss Fight Books, 2016, p. 58)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 9: Zero-Hurdle Control Parameterization)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> In a primary school classroom, some 7-year-olds play console games daily while others are still learning how to drag a mouse or tap accurately on a tablet. If jumping onto a number-line platform or dragging a fraction slice requires pixel-perfect skill, less-experienced children cry because the controls block them from showing the math they know.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Parameterize all primary-school movement and drag-and-drop manipulatives using <strong>Whole-Number Tile Metrics</strong> (H<sub>max</sub> = exact block heights), snappy settling (g<sub>fall</sub> = 2.4 &middot; g<sub>rise</sub>), and a generous <strong>32px Magnetic Snap Radius</strong>. When a child drags a <code>1/4</code> pie slice anywhere near the pie pan, it should happily magnet-snap into place with a musical pop.
          </p>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-2">The Parameter Inversion: Spatial Metrics First</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          In professional game development, you never pick arbitrary force constants like <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs font-mono">gravity = 980</code> and <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs font-mono">jumpForce = 450</code>.
          Instead, you invert the math. You ask your level designers for two geometric constraints:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>H<sub>max</sub> (Jump Height):</strong> The exact maximum height in pixels or units the character must reach to clear obstacles (e.g., 120 pixels, exactly 3 grid tiles).
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Match <code>H<sub>max</sub></code> directly to visible counting-block heights (e.g., a 5-Block Spring Pad bounces the character exactly 5 unit-blocks high) so children visually see number magnitude as jump height.
            </div>
          </li>
          <li>
            <strong>t<sub>peak</sub> (Time to Apex):</strong> The exact duration in seconds from the moment the jump button is pressed until the character reaches zero vertical velocity at the apex (typically 0.28 to 0.38 seconds).
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Set <code>t<sub>peak</sub> = 0.32s</code> so hopping between math islands feels zippy and playful, keeping 8-year-olds energized throughout the 40-minute lesson.
            </div>
          </li>
        </ul>

        <h4 className="text-base font-bold text-zinc-900 mt-2">Mathematical Derivation of v<sub>0</sub> and g<sub>rise</sub></h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          From basic calculus, vertical position y(t) and vertical velocity v(t) under constant acceleration g are:
        </p>

        <div className="font-mono bg-zinc-100 p-3 rounded border border-zinc-200 text-xs sm:text-sm text-zinc-900 space-y-1">
          <div>(1) &nbsp; v(t) = v<sub>0</sub> - g &middot; t</div>
          <div>(2) &nbsp; y(t) = v<sub>0</sub> &middot; t - 0.5 &middot; g &middot; t&sup2;</div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          At the jump apex (t = t<sub>peak</sub>), vertical velocity is zero (v(t<sub>peak</sub>) = 0):
        </p>

        <div className="font-mono bg-zinc-100 p-2.5 rounded border border-zinc-200 text-xs text-zinc-900">
          0 = v<sub>0</sub> - g &middot; t<sub>peak</sub> &nbsp;&rArr;&nbsp; v<sub>0</sub> = g &middot; t<sub>peak</sub>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          Substituting v<sub>0</sub> into the position equation at y(t<sub>peak</sub>) = H<sub>max</sub>:
        </p>

        <div className="font-mono bg-zinc-100 p-3 rounded border border-zinc-200 text-xs sm:text-sm text-zinc-900 space-y-1">
          <div>H<sub>max</sub> = (g &middot; t<sub>peak</sub>) &middot; t<sub>peak</sub> - 0.5 &middot; g &middot; t<sub>peak</sub>&sup2;</div>
          <div>H<sub>max</sub> = 0.5 &middot; g &middot; t<sub>peak</sub>&sup2;</div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          Solving for rising gravity g<sub>rise</sub> and initial jump velocity v<sub>0</sub>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2 font-mono text-xs sm:text-sm">
          <div className="border border-blue-200 bg-blue-50/50 p-3 rounded text-center">
            <span className="font-bold text-blue-900">g<sub>rise</sub> = (2 &middot; H<sub>max</sub>) / t<sub>peak</sub>&sup2;</span>
          </div>
          <div className="border border-blue-200 bg-blue-50/50 p-3 rounded text-center">
            <span className="font-bold text-blue-900">v<sub>0</sub> = (2 &middot; H<sub>max</sub>) / t<sub>peak</sub></span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          If your level designer resizes platforms so characters must jump 140 pixels instead of 115 pixels, you update a single constant: H<sub>max</sub> = 140.
          The engine automatically recalculates the exact physics parameters with zero floating-point guesswork.
        </p>

        <h4 className="text-base font-bold text-zinc-900 mt-4">The Three Piecewise Modifiers of Game Kinematics</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          To achieve the tactile snappiness of classic games like <em>Super Mario World</em> or <em>Celeste</em>, modern engines split the jump into three piecewise phases:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">1. ASYMMETRIC FALLING GRAVITY (g_fall &asymp; 2.2x to 3.0x g_rise)</div>
            <p className="text-zinc-700">
              Once vertical velocity drops below zero (v<sub>y</sub> &le; 0), immediately scale gravity: <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono">activeG = g_rise * 2.4</code>.
              This snaps the avatar down to the ground briskly, eliminating the floaty sensation and returning grounded movement control to the player.
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Apply crisp 2.4x falling gravity when a child drops base-10 blocks into a place-value column so the blocks clack into place with satisfying Toy-Block weight.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-indigo-700">2. VARIABLE JUMP HEIGHT (EARLY RELEASE HOP)</div>
            <p className="text-zinc-700">
              If the player releases the Jump button while the character is still ascending (v<sub>y</sub> &gt; 0), immediately multiply current gravity by 2.5x or clamp v<sub>y</sub> = v<sub>y</sub> &middot; 0.5.
              This gives the player continuous analog control over jump height (tap for a micro-hop, hold for a maximum leap).
            </p>
            <div className="border-l-2 border-indigo-500 bg-indigo-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Let a quick tap add <code>+1</code> unit cube while holding down a button streams a <code>+10</code> rod, giving young learners intuitive control over small and large numbers.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-amber-700">3. APEX HANG TIME (|v_y| &lt; &epsilon;)</div>
            <p className="text-zinc-700">
              When vertical speed near the peak drops below a threshold (|v<sub>y</sub>| &lt; 1.5 px/frame), scale gravity by 0.4x for 3 to 5 frames.
              This produces an anti-gravity "hang" at the peak, granting a brief window of aerial maneuverability to line up difficult landings.
            </p>
            <div className="border-l-2 border-amber-500 bg-amber-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> In a number-line frog jumper or phonics bubble-catcher, grant extra apex hang time (<code>0.4x</code> gravity at the top of the jump) so a 7-year-old has plenty of time to steer onto the right answer platform.
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          3. Temporal Hysteresis: Coyote Time &amp; Input Buffering
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In a naive Finite State Machine (FSM), jump execution is governed by a strict Boolean conditional:
        </p>

        <div className="font-mono bg-zinc-100 p-2.5 rounded border border-zinc-200 text-xs text-zinc-900">
          // The Naive FSM: Drops Inputs and Enrages Players
          if (state === State.Grounded &amp;&amp; input.jumpJustPressed) &#123;
            state = State.Airborne;
            velocity.y = -v0;
          &#125;
        </div>

        <p className="text-sm leading-relaxed text-zinc-800">
          This naive check fails in two critical, universal gameplay scenarios:
        </p>

        <h4 className="text-base font-bold text-zinc-900 mt-2">Scenario A: The Edge-Falling Disconnect (Coyote Time)</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          When running toward a chasm, players want to jump from the absolute edge to maximize distance.
          Because of the 240ms human processing loop, the player’s visual cortex observes the character approaching the edge, but by the time their finger depresses the spacebar, the avatar has moved 2 to 4 frames past the ledge.
        </p>
        <p className="text-sm leading-relaxed text-zinc-800">
          Under strict FSM rules, <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs font-mono">state === State.Airborne</code>.
          The input is silently dropped. The character plummets into the pit without jumping. The player swears their keyboard is broken or the game ate their input.
        </p>

        <div className="border border-blue-200 bg-blue-50/40 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm">
          <div className="font-mono font-bold text-blue-900">THE COYOTE TIME SOLUTION:</div>
          <p className="text-zinc-800">
            Named after the cartoon character Wile E. Coyote, who pauses in mid-air before falling.
            When the avatar transitions from Grounded to Airborne without jumping, start a countdown timer: <code className="font-mono">coyoteTimer = 6 frames (~100ms)</code>.
            As long as <code className="font-mono">coyoteTimer &gt; 0</code>, treat the character as legally grounded and permit jump execution!
          </p>
          <div className="border-l-2 border-blue-500 bg-white/80 pl-2.5 py-1 text-xs text-zinc-800">
            <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Because 6-to-9-year-olds have slower reaction times (~350&ndash;450ms), expand Coyote Time to <strong>10 frames (~166ms)</strong> in number-line platformers and grant a 200ms grace window on rhythm-clapping phonics games so kids never feel cheated.
          </div>
        </div>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;All are centered around widening timing/positioning windows, so that everything is fudged a tiny bit in the player's favor. I think this is a big reason why Celeste can feel kind even though it's very difficult &mdash; it wants you to succeed.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Maddy Thorson, <em>Celeste and Forgiveness</em> (Matt Makes Games Design Postmortem, 2020)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 10: Pedagogical Intent Forgiveness)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> When an 8-year-old drags a <code>10-block</code> toward the Tens column or rotates a mirror to 45&deg; in a geometry game, their finger often lifts up 15 pixels short or 4 degrees off. Punishing a primary school child for a tiny motor slip when they knew the right math answer causes immediate tears.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Build <strong>Child-Friendly Intent Forgiveness</strong> into every interaction: (1) Use a <strong>32px Magnetic Drop Halo</strong> that pulls near-miss block drops into the valid slot with a gentle elastic tween; (2) Quantize angle mirrors and protractors to <strong>5-degree or 15-degree magnetic detents</strong> so when a child aims near 45&deg; or 90&deg;, the mirror clicks cleanly into the exact geometric angle.
          </p>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">Scenario B: The Pre-Landing Disconnect (Input Buffering)</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          Conversely, when falling toward a platform and intending to bunny-hop immediately upon landing, players routinely press Jump 50ms <em>before</em> their feet touch the surface.
          Under strict FSM rules, the player is still in the air. The input is discarded. When they touch down, the character comes to a dead stop.
        </p>

        <div className="border border-blue-200 bg-blue-50/40 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm">
          <div className="font-mono font-bold text-blue-900">THE INPUT BUFFER SOLUTION:</div>
          <p className="text-zinc-800">
            When the Jump key is pressed while airborne, do not discard it.
            Push it into a FIFO ring buffer or set <code className="font-mono">jumpBufferTimer = 6 frames (~100ms)</code>.
            On every frame tick, if the character becomes grounded and <code className="font-mono">jumpBufferTimer &gt; 0</code>, immediately execute the jump on frame 0 of touchdown and consume the buffer!
          </p>
          <div className="border-l-2 border-blue-500 bg-white/80 pl-2.5 py-1 text-xs text-zinc-800">
            <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Young children frequently tap the next number block or command card while the previous celebration animation is still finishing; queue their tap in a 200ms Input Buffer so the tablet never ignores their eager finger tap.
          </div>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-4">Production-Ready TypeScript Implementation</h4>
        <div className="border border-zinc-200 bg-zinc-50 p-4 rounded-lg font-mono text-xs text-zinc-900 overflow-x-auto">
<pre>{`// Complete Temporal Hysteresis Character Update Loop (60 FPS)
function updateCharacter(dt: number) {
  // 1. Maintain Coyote Timer
  if (isGrounded) {
    coyoteTimer = COYOTE_FRAMES; // e.g. 6 frames (100ms)
  } else if (coyoteTimer > 0) {
    coyoteTimer--;
  }

  // 2. Maintain Jump Buffer Timer
  if (input.jumpJustPressed) {
    jumpBufferTimer = BUFFER_FRAMES; // e.g. 6 frames (100ms)
  } else if (jumpBufferTimer > 0) {
    jumpBufferTimer--;
  }

  // 3. Evaluate Jump Intent (Coupling Coyote + Buffer)
  if (jumpBufferTimer > 0 && coyoteTimer > 0) {
    // Consume both buffers
    jumpBufferTimer = 0;
    coyoteTimer = 0;
    isGrounded = false;

    // Apply upward impulse
    velocity.y = -v0;
    playAudio("jump");
  }

  // 4. Asymmetric Gravity Integration
  let currentGravity = velocity.y < 0 ? gRise : gFall;

  // Variable Jump Height (early release cuts ascent)
  if (velocity.y < 0 && !input.jumpHeld) {
    currentGravity *= 2.2;
  }

  // Apex Hang Time (anti-gravity at arc peak)
  if (Math.abs(velocity.y) < APEX_THRESHOLD) {
    currentGravity *= 0.45;
  }

  velocity.y += currentGravity * dt;
  position.y += velocity.y * dt;
}`}</pre>
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          4. The 3Cs Architecture &amp; Camera Control Theory
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In <em>Game Feel: A Game Designer's Guide to Virtual Sensation</em> (2008), Steve Swink established that real-time game feel is governed by the tight coupling of the <strong>3Cs</strong>:
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;Game feel is real-time control of virtual objects in a simulated space, with interactions emphasized by polish.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Steve Swink, <em>Game Feel: A Game Designer's Guide to Virtual Sensation</em> (CRC Press, 2008, p. 1)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 11: Embodied Abstract Concepts)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> According to Piaget&rsquo;s developmental stages, primary school children (ages 7&ndash;11) are in the <em>Concrete Operational Stage</em>—they struggle with disembodied symbols but grasp concepts rapidly when tied to physical weight, speed, and touch.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> In a 35-minute Grade 3 Science mini-game teaching <strong>Friction &amp; Forces</strong> (or Place Value weight), let the child pilot a delivery sled across Ice, Wood, and Sticky Mud tiles while carrying 1-kg, 10-kg, and 100-kg cargo blocks. Bind the surface friction coefficient <em>&mu;</em> directly to the ADSR Release deceleration time and bind cargo mass to the Attack acceleration ramp. The child physically <em>feels</em> inertia and friction through their fingers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
            <span className="font-bold text-blue-700">1. CONTROLS</span>
            <div className="font-semibold text-zinc-900">Physical Input Mapping</div>
            <p className="text-zinc-600">Analog stick deadzones, transfer curves, acceleration envelopes, temporal buffering, and polling frequencies.</p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Use direct 1-finger touch gestures (pull-back slingshot, drag-to-stack) with zero multi-button keyboard combos.
            </div>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
            <span className="font-bold text-blue-700">2. CHARACTER</span>
            <div className="font-semibold text-zinc-900">Virtual Avatar Simulation</div>
            <p className="text-zinc-600">Collision AABBs, mass, momentum restitution, animation state blending, and squash &amp; stretch deformation.</p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Give number blocks and science characters expressive faces that puff up, stretch, or shiver as their quantity or temperature changes.
            </div>
          </div>
          <div className="border border-zinc-200 bg-white p-3 rounded space-y-1.5">
            <span className="font-bold text-blue-700">3. CAMERA</span>
            <div className="font-semibold text-zinc-900">Virtual Observer Lens</div>
            <p className="text-zinc-600">Framing, look-ahead lead vectors, smoothing filters, vertical deadzones, and framing composition.</p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Automatically zoom and pan the camera so both the child&rsquo;s slingshot/mirror and the target monster/flower stay on screen together.
            </div>
          </div>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-3">Why Rigid Cameras Cause Motion Sickness</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          The naive implementation of a game camera locks its position directly to the player:
          <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs font-mono ml-1">camera.pos = player.pos</code>.
          This produces severe problems:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-800">
          <li>
            <strong>Micro-Jitter:</strong> Every single step, collision resolution jitter, or small bump instantly shifts the entire monitor viewport, triggering nausea and eye strain.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Keep number labels, fraction bars, and sight-word cards anchored on steady, non-jittering banners so early readers (ages 6&ndash;8) never lose their place while reading.
            </div>
          </li>
          <li>
            <strong>Zero Forward Horizon:</strong> With the player centered on screen, 50% of the display shows space the player has already walked through, while only 50% shows incoming obstacles in front of them.
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 mt-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Position the child&rsquo;s character on the left 25% of the screen so 75% of the tablet shows the upcoming number-line bridges and math gates ahead.
            </div>
          </li>
        </ul>

        <blockquote className="border-l-4 border-zinc-400 bg-zinc-50 pl-4 py-2 my-3 text-xs sm:text-sm italic text-zinc-700">
          &ldquo;Instead of keeping the character rigidly locked dead-center, target lead shifts focus in the direction of motion to show more of what is ahead rather than what has already been traversed.&rdquo;
          <footer className="not-italic text-xs text-zinc-500 font-medium mt-1">
            &mdash; Itay Keren, <em>Scroll Back: The Theory and Practice of Cameras in Side-Scrollers</em> (Game Developers Conference, 2015)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 12: Predictive Pedagogical Camera Framing)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> Young children struggle to pan or zoom a camera manually while solving a puzzle; if the target disappears off-screen, a 7-year-old assumes it vanished and gets confused.
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Implement <strong>Automatic Two-Point Bounding-Box Framing</strong>: when a child pulls back a number-catapult or rotates a light mirror, compute the bounding box containing both the launcher and the target chest, and smoothly interpolate the camera position and zoom so both endpoints remain comfortably inside the tablet screen with zero manual camera controls needed.
          </p>
        </div>

        <h4 className="text-base font-bold text-zinc-900 mt-3">The PID / Exponential Lead-Ahead Camera</h4>
        <p className="text-sm leading-relaxed text-zinc-800">
          Modern cameras use an exponential decay filter combined with a velocity lead-ahead vector:
        </p>

        <div className="font-mono bg-zinc-100 p-3 rounded border border-zinc-200 text-xs text-zinc-900 space-y-1">
          <div>// Target camera position leads the player in their direction of movement:</div>
          <div>targetCamX = player.x + (player.velocity.x * lookAheadFactor);</div>
          <div>targetCamY = player.y;</div>
          <div className="pt-1">// Critically damped exponential smoothing (frame-rate independent):</div>
          <div>camera.x += (targetCamX - camera.x) * (1.0 - Math.exp(-smoothDamping * dt));</div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
          5. The Anatomy of "Juice": Hitstop, Screen Shake &amp; Sensory Amplification
        </h3>
        
        <p className="text-sm leading-relaxed text-zinc-800">
          In 2012, Dutch developers Martin Jonasson and Petri Purho delivered their renowned presentation <em>Juice It or Lose It</em>.
          <strong>Juice</strong> refers to the non-functional audiovisual feedback that amplifies the tactile impact of player actions without altering underlying game rules.
        </p>

        <blockquote className="border-l-4 border-blue-600 bg-zinc-50 pl-4 py-2.5 italic text-sm text-zinc-800 my-3">
          &ldquo;A juicy game feels alive and responds to everything you do &mdash; tons of cascading action and response for minimal user input.&rdquo;
          <footer className="not-italic text-xs text-zinc-600 font-medium mt-1">
            &mdash; Martin Jonasson &amp; Petri Purho, <em>Juice It or Lose It</em> (Nordic Game Conference, 2012)
          </footer>
        </blockquote>

        <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-lg space-y-1.5 text-xs sm:text-sm my-3">
          <div className="font-mono font-bold text-blue-800 uppercase tracking-wider text-xs">
            Applied Architecture: 30&ndash;60 Minute Primary-School Educational Mini-Game (Point 13: Semantic Juiciness Without Distraction)
          </div>
          <p className="text-zinc-800 leading-relaxed">
            <strong>How It Relates:</strong> Primary school children adore playful sensory feedback (sparkles, marimba chimes, happy characters), which keeps them engaged for a full 40-minute period. However, if wrong answers also trigger funny explosions, kids will intentionally pick wrong answers just to watch the explosion!
          </p>
          <p className="text-zinc-800 leading-relaxed">
            <strong>Implementation Pattern:</strong> Make <strong>Juice Proportional to Mathematical Structure</strong>: when ten <code>1-cubes</code> snap together to form a <code>10-rod</code>, play a 10-note ascending xylophone glissando and pop a golden star burst; conversely, if a child tries to snap <code>4 + 5</code> into a <code>10-slot</code>, use a gentle, low-key rubber &ldquo;boing&rdquo; bounce back to the tray with zero screen shake so wrong guesses are never more entertaining than solving the puzzle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs sm:text-sm">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">1. HITSTOP (MICRO-FREEZE FRAMES)</div>
            <div className="font-semibold text-zinc-950">Communicating Physical Density</div>
            <p className="text-zinc-600">
              When a weapon strikes an enemy or a gem is collected, the engine freezes the simulation entirely for 3 to 6 frames (50ms to 100ms) before resuming motion.
              This momentary pause tricks the human visual cortex into feeling physical resistance and mass, transforming a hollow collision into a bone-crunching impact (used universally in <em>Super Smash Bros</em> and <em>Hollow Knight</em>).
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Freeze for 120ms with a golden glow at the exact moment two fraction blocks fuse into 1 Whole, or pause on the exact command block where a coding turtle bumps a rock so an 8-year-old sees which block caused the bump.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">2. TRAUMA-SQUARED SCREEN SHAKE</div>
            <div className="font-semibold text-zinc-950">Non-Linear Kinetic Displacement</div>
            <p className="text-zinc-600">
              Naive screen shake adds random noise linearly. Professional camera shakes use a "trauma" float variable between 0.0 and 1.0, and displace the camera by <code className="font-mono">offset = maxAngle * trauma&sup2;</code>.
              Squaring the trauma ensures that minor impacts produce subtle rumbles while major explosions feel exponentially violent, decaying smoothly over 0.2 seconds.
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Shake only the heavy 100-Block crate when it lands with a deep bass thud (teaching relative place-value magnitude: 1-cube = tiny tap, 10-rod = medium clack, 100-flat = big rumble) while keeping UI numbers still.
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">3. SQUASH &amp; STRETCH (VOLUME PRESERVATION)</div>
            <div className="font-semibold text-zinc-950">Animation Principle #1</div>
            <p className="text-zinc-600">
              Originating from Disney’s 12 basic principles of animation, objects under acceleration stretch along their movement vector, and compress upon impact.
              The critical mathematical rule is <strong>volume conservation</strong>: s<sub>x</sub> &middot; s<sub>y</sub> &middot; s<sub>z</sub> = 1.0. If a character squashes to s<sub>y</sub> = 0.65 on landing, s<sub>x</sub> must expand to 1 / 0.65 &asymp; 1.54.
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Use area-preserving Squash &amp; Stretch (<code>width &times; height = Area</code>) when a child reshapes a <code>2 &times; 6</code> garden rectangle into a <code>3 &times; 4</code> rectangle so they visually see that 12 square tiles conserve area!
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-1.5">
            <div className="font-mono font-bold text-blue-700">4. AUDIO ATTACK TRANSIENT SYNCHRONIZATION</div>
            <div className="font-semibold text-zinc-950">Sub-16ms Acoustic Alignment</div>
            <p className="text-zinc-600">
              Human auditory perception detects synchronization discrepancies exceeding 16ms.
              Sound effects must have an immediate attack transient (0ms rise time) aligned with the exact collision frame to ensure the brain binds the acoustic wave to the visual event.
            </p>
            <div className="border-l-2 border-blue-500 bg-blue-50/50 pl-2.5 py-1 text-xs text-zinc-800">
              <strong>30&ndash;60 Min Primary-School Mini-Game:</strong> Map musical scale pitches (Do-Re-Mi-Fa-Sol-La-Ti-Do) directly to counting numbers 1&ndash;10 with sub-16ms WebAudio response so primary learners hear number magnitude as a rising melody.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
          <div className="space-y-2">
            <blockquote className="border-l-4 border-zinc-400 bg-zinc-50 pl-4 py-2 text-xs sm:text-sm italic text-zinc-700">
              &ldquo;Adding screen shake and a few frames of sleep when you hit something makes the player feel like they are doing real damage.&rdquo;
              <footer className="not-italic text-xs text-zinc-500 font-medium mt-1">
                &mdash; Jan Willem Nijman, <em>The Art of Screenshake</em> (Vlambeer / INDIGO, 2013)
              </footer>
            </blockquote>
            <div className="border border-blue-200 bg-blue-50/50 p-3 rounded-lg space-y-1 text-xs">
              <div className="font-mono font-bold text-blue-800 uppercase tracking-wider">
                30&ndash;60 Min Primary-School Mini-Game (Point 14: Diagnostic Hitstop)
              </div>
              <p className="text-zinc-800 leading-relaxed">
                <strong>Relation &amp; Implementation:</strong> When a child&rsquo;s block-built bridge has a gap or their coding puppy steps onto a mud tile, apply a <strong>10-frame Diagnostic Hitstop freeze</strong> (<code>160ms</code>) with a comical wiggle on the exact missing tile before the puppy splashes, helping a 7-year-old spot the exact step to fix.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <blockquote className="border-l-4 border-zinc-400 bg-zinc-50 pl-4 py-2 text-xs sm:text-sm italic text-zinc-700">
              &ldquo;This action gives the illusion of weight and volume to a character as it moves; the most important rule to remember is that the volume must remain constant.&rdquo;
              <footer className="not-italic text-xs text-zinc-500 font-medium mt-1">
                &mdash; Frank Thomas &amp; Ollie Johnston, <em>The Illusion of Life: Disney Animation</em> (Hyperion, 1981, p. 47)
              </footer>
            </blockquote>
            <div className="border border-blue-200 bg-blue-50/50 p-3 rounded-lg space-y-1 text-xs">
              <div className="font-mono font-bold text-blue-800 uppercase tracking-wider">
                30&ndash;60 Min Primary-School Mini-Game (Point 15: Visual Conservation Laws)
              </div>
              <p className="text-zinc-800 leading-relaxed">
                <strong>Relation &amp; Implementation:</strong> Young children (ages 6&ndash;8) famously struggle with <strong>Piagetian Conservation of Quantity</strong> (thinking a tall thin beaker holds more water than a wide short beaker). By animating liquid pours and area rectangles with strict constant-area Squash &amp; Stretch (<code>s<sub>x</sub> &middot; s<sub>y</sub> = 1</code>), children visually see that quantity stays constant when shape changes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
