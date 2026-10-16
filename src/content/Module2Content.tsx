import React from 'react';

export const Module2Content: React.FC = () => {
  return (
    <article className="prose prose-invert max-w-none space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
          <span>CHAPTER 2 TEXTBOOK &amp; LECTURE TRANSCRIPT • ESTIMATED READING &amp; EXERCISE TIME: 2.0 HOURS</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          The Physics of Virtual Sensation: 3Cs, Piecewise Kinematics &amp; Temporal Forgiveness
        </h3>
        <p className="text-sm text-slate-300">
          Why does writing standard Newtonian physics <code>velocity += acceleration * dt</code> produce controls that feel unresponsive, sluggish, or impossible to control?
          This chapter examines the biophysical limits of human sensation (the 240ms loop), derives non-Newtonian jump equations parameterized by spatial level design metrics, and implements temporal hysteresis state machines.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          1. The Human Processor Model &amp; The 240ms Latency Budget (Steve Swink)
        </h3>
        <p>
          In <em>Game Feel: A Game Designer's Guide to Virtual Sensation</em>, Steve Swink adapts Card, Moran, and Newell's classic Human Information Processor model to explain why literal real-world physics fails in interactive media:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-1">
            <div className="text-xs font-mono text-cyan-400 font-bold">1. PERCEPTUAL PROCESSOR (~100ms)</div>
            <div className="text-sm font-bold text-white">Retinal &amp; Visual Cortex Lag</div>
            <p className="text-xs text-slate-300">
              Photons hit the retina, get transduced into electrical impulses, and register in the visual cortex. Minimum cycle time: 50–100ms.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-1">
            <div className="text-xs font-mono text-emerald-400 font-bold">2. COGNITIVE PROCESSOR (~70ms)</div>
            <div className="text-sm font-bold text-white">Associative Recognition &amp; Choice</div>
            <p className="text-xs text-slate-300">
              Working memory compares current state against mental models and selects a motor program (e.g., "press jump now"). Cycle time: ~70ms.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-1">
            <div className="text-xs font-mono text-amber-400 font-bold">3. MOTOR PROCESSOR (~70ms)</div>
            <div className="text-sm font-bold text-white">Efferent Nerve Transmission</div>
            <p className="text-xs text-slate-300">
              Action potentials travel down spinal motor neurons to contract finger muscles onto the mechanical key switch. Cycle time: ~70ms.
            </p>
          </div>
        </div>
        <p>
          Summing these stages yields approximately <strong>240ms of biological input/output latency</strong>.
          If your game engine requires frame-perfect inputs at 60 FPS (16.6ms per frame) without any tolerance, you are testing biological transmission jitter, not cognitive skill.
          Great games build <em>temporal forgiveness</em> directly into their state machines to bridge this biological gap.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          2. The Mathematics of a Great Jump: Spatial Parameterization vs. Arbitrary Forces
        </h3>
        <p>
          Novice developers invariably begin programming a platformer character jump by assigning arbitrary constants:
        </p>
        <pre className="rounded-xl bg-slate-900 p-4 font-mono text-xs text-rose-300 border border-slate-800">
          // The Naive Engineer Approach (Flawed):
          const GRAVITY = 9.8;
          const JUMP_FORCE = 15.0;
          velocity.y += JUMP_FORCE; // Guessing constants until it "looks ok"
        </pre>
        <p>
          This causes two severe problems:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Level Designers Cannot Reason About Geometry:</strong> If a pit is 4 tiles wide and a ledge is 3 tiles high, guessing arbitrary force numbers gives the designer zero guarantee that the player can make the jump.
          </li>
          <li>
            <strong>Real-World Constant Gravity Feels "Floaty":</strong> A standard Newtonian parabola spends equal time ascending and descending. Humans perceive symmetric parabolic descent as weightless and unresponsive because there is no sense of mass or momentum.
          </li>
        </ol>

        <h4 className="text-lg font-bold text-slate-100">Deriving the Kinematic Formulas</h4>
        <p>
          In professional game engines, we invert the dependency. We ask the level designer for two exact spatial metrics:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>H<sub>max</sub> (Jump Height):</strong> The peak height in pixels or grid units.</li>
          <li><strong>t<sub>peak</sub> (Time to Apex):</strong> The exact duration in seconds from button press to peak height.</li>
        </ul>
        <p>
          From basic kinematic calculus under constant acceleration a(t) = −g:
        </p>
        <div className="text-center py-2 font-mono text-xs sm:text-sm text-cyan-300 bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
          <div>v(t) = v₀ − g·t &nbsp;&implies;&nbsp; v(t<sub>peak</sub>) = 0 &nbsp;&implies;&nbsp; v₀ = g · t<sub>peak</sub></div>
          <div>y(t) = v₀·t − ½ g·t² &nbsp;&implies;&nbsp; H<sub>max</sub> = g·t<sub>peak</sub>² − ½ g·t<sub>peak</sub>² = ½ g·t<sub>peak</sub>²</div>
        </div>
        <p>Solving for the required initial launch velocity v₀ and rising gravity g<sub>rise</sub>:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-3">
          <div className="rounded-xl bg-slate-900 p-4 border border-slate-800 font-mono text-center">
            <span className="text-xs text-slate-400">RISING GRAVITY ACCELERATION:</span>
            <div className="text-lg font-bold text-emerald-400 mt-1">g_rise = (2 · H_max) / t_peak²</div>
          </div>
          <div className="rounded-xl bg-slate-900 p-4 border border-slate-800 font-mono text-center">
            <span className="text-xs text-slate-400">INITIAL LAUNCH IMPULSE:</span>
            <div className="text-lg font-bold text-cyan-400 mt-1">v₀ = (2 · H_max) / t_peak</div>
          </div>
        </div>

        <h4 className="text-lg font-bold text-slate-100">The Three Non-Newtonian Corrections for Juice</h4>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Asymmetric Falling Gravity (g<sub>fall</sub> ≈ 2.0–3.0 · g<sub>rise</sub>):</strong> As soon as v<sub>y</sub> ≤ 0 (the character begins falling), multiply gravity by 2.5x. This makes the ascent graceful and readable, while snapping the character down briskly onto ledges.
          </li>
          <li>
            <strong>Variable Jump Height on Early Button Release:</strong> If the player releases the jump button while $v_y &gt; 0$, immediately clamp or multiply gravity by 2.0x. This allows the player to perform a micro-hop by tapping or a full vault by holding.
          </li>
          <li>
            <strong>Apex Hang Time:</strong> When the character's vertical velocity is near zero ($|v_y| &lt; \epsilon$), reduce gravity by $50\%$. This gives the player a brief ~6-frame window of zero-G hover at the peak of their arc, providing micro-control to adjust their landing.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          3. Temporal Forgiveness State Machines: Coyote Time &amp; Input Buffering
        </h3>
        <p>
          In a naive Finite State Machine (FSM), transitions are instantaneous and boolean:
        </p>
        <pre className="rounded-xl bg-slate-900 p-4 font-mono text-xs text-rose-300 border border-slate-800">
          // The Naive Strict State Machine (Punishes Human Biology):
          if (state === State.GROUNDED &amp;&amp; input.jumpPressed) &#123;
            executeJump();
          &#125;
        </pre>
        <p>
          This leads to two common failure modes that ruin player experience:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4">
          <div className="rounded-xl border border-cyan-500/30 bg-slate-900 p-4 space-y-2">
            <div className="text-xs font-mono font-bold text-cyan-400">COYOTE TIME (LEDGE FORGIVENESS)</div>
            <div className="text-sm font-bold text-white">Problem: The Late Jump</div>
            <p className="text-xs text-slate-300">
              When sprinting toward a pit, players attempt to jump at the absolute last pixel. Due to biological processing lag, they often press the key 20–80ms <em>after</em> their collision box leaves the ledge.
              A strict FSM sees <code>isGrounded === false</code> and ignores the jump, causing the player to plunge into the pit.
            </p>
            <p className="text-xs text-emerald-300 font-mono">
              <strong>Solution:</strong> Maintain a timestamp <code>lastTimeGrounded</code>. If <code>(currentTime - lastTimeGrounded) &lt; 100ms</code>, allow the jump to execute as if the character were still on solid ground!
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-slate-900 p-4 space-y-2">
            <div className="text-xs font-mono font-bold text-amber-400">INPUT BUFFERING (LANDING FORGIVENESS)</div>
            <div className="text-sm font-bold text-white">Problem: The Early Jump</div>
            <p className="text-xs text-slate-300">
              When falling toward a platform intending to jump immediately upon landing, the player hits the button 50ms before touching down.
              A strict FSM evaluates the press while still airborne, consumes the event, and when the player lands 3 frames later, nothing happens.
            </p>
            <p className="text-xs text-amber-300 font-mono">
              <strong>Solution:</strong> Store incoming input events in a short ring buffer or timestamp variable <code>lastJumpPressedTime</code>. When touching down, check if a press arrived within the last 100ms and fire it instantly!
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          4. The 3rd C: Camera Control Theory &amp; Deadzones
        </h3>
        <p>
          A game's controls do not exist in a vacuum; they are mediated by the camera.
          Binding the camera rigidly to the player's coordinate (<code>camera.position = player.position</code>) results in visual jitter, motion sickness, and blindness to oncoming obstacles.
          Production 2D and 3D cameras implement three control theory principles:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Spatial Deadzones:</strong> A bounding rectangle in the center of the viewport where player movement does not displace the camera at all. Small micro-adjustments do not cause screen shaking.
          </li>
          <li>
            <strong>Critically Damped Spring Smoothing ($\zeta \approx 1.0$):</strong> Instead of linear interpolation (LERP), smooth camera tracking using a second-order spring-damper differential equation ($x'' + 2\zeta\omega_n x' + \omega_n^2 x = 0$) to eliminate overshoot and oscillation.
          </li>
          <li>
            <strong>Velocity Look-Ahead Target:</strong> Offset the camera center along the player's velocity vector (x<sub>target</sub> = x<sub>player</sub> + v<sub>x</sub> · τ). This allows the player to see into the space they are moving into rather than running blindly off the edge of the screen.
          </li>
        </ul>
      </section>
    </article>
  );
};
