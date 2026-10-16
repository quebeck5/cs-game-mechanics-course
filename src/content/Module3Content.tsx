import React from 'react';

export const Module3Content: React.FC = () => {
  return (
    <article className="prose prose-invert max-w-none space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
          <span>CHAPTER 3 TEXTBOOK &amp; LECTURE TRANSCRIPT • ESTIMATED READING &amp; EXERCISE TIME: 2.0 HOURS</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Decisions, Space &amp; Imperfect Information: Combat Frame Automata &amp; Graph Topology
        </h3>
        <p className="text-sm text-slate-300">
          Sid Meier famously said that <em>"a game is a series of interesting decisions."</em>
          What makes a decision mathematically interesting?
          This chapter explores the anatomy of tactical choices, models action combat moves as 3-phase Pushdown Automata, formalizes Frame Advantage ($\Delta F$), and analyzes level design as Directed Acyclic Graphs (DAGs) and cyclic topological networks.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          1. Anatomy of a Meaningful Choice (Sid Meier &amp; Tracy Fullerton)
        </h3>
        <p>
          In game design theory, not all choices are meaningful. A Computer Science graduate must distinguish between three distinct types of decisions:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-4">
          <div className="rounded-xl border border-rose-500/30 bg-slate-900 p-4 space-y-1">
            <span className="text-xs font-mono font-bold text-rose-400">1. DOMINANT STRATEGIES (TRIVIAL)</span>
            <div className="text-sm font-bold text-white">Strict Superiority: A ≻ B</div>
            <p className="text-xs text-slate-300">
              If Option A deals 50 DPS with zero stamina cost and Option B deals 30 DPS with high stamina cost, an optimizing agent will pick A 100% of the time. The choice is illusory.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 space-y-1">
            <span className="text-xs font-mono font-bold text-slate-400">2. BLIND CHOICES (ARBITRARY)</span>
            <div className="text-sm font-bold text-white">Zero Information Equivalence</div>
            <p className="text-xs text-slate-300">
              Presented with two identical unmarked doors where one leads to treasure and the other to death, the player is essentially guessing a coin flip. There is no cognitive agency.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-slate-900 p-4 space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-400">3. MEANINGFUL DECISIONS</span>
            <div className="text-sm font-bold text-white">Contextual Trade-offs &amp; Risk</div>
            <p className="text-xs text-slate-300">
              Every option has orthogonal strengths, situational costs, readable telegraphs, and distinct recovery vulnerabilities.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          2. Action Combat Frame Data: Startup, Active, and Recovery Automata
        </h3>
        <p>
          In fighting games (<em>Street Fighter, Tekken</em>) and action RPGs (<em>Dark Souls, Elden Ring, Monster Hunter</em>), time is quantified in discrete 60 FPS frames (16.6ms).
          Every combat attack is a non-interruptible 3-phase state machine:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-4">
          <div className="rounded-xl border border-amber-500/30 bg-slate-900 p-4 space-y-1">
            <div className="text-xs font-mono text-amber-400 font-bold">PHASE 1: STARTUP (F_startup)</div>
            <div className="text-sm font-bold text-white">The Telegraph Window</div>
            <p className="text-xs text-slate-300">
              The frames between button press and hitbox generation. The character performs an anticipation wind-up.
              This window must exceed the opponent's ~240ms human reaction time for heavy attacks to allow parrying or dodging.
            </p>
          </div>
          <div className="rounded-xl border border-rose-500/30 bg-slate-900 p-4 space-y-1">
            <div className="text-xs font-mono text-rose-400 font-bold">PHASE 2: ACTIVE (F_active)</div>
            <div className="text-sm font-bold text-white">Hitbox Emission Window</div>
            <p className="text-xs text-slate-300">
              The brief duration (usually 2–6 frames) where collision queries are active.
              If an active hitbox collides with an opponent's hurtbox, damage and hitstun are applied.
            </p>
          </div>
          <div className="rounded-xl border border-blue-500/30 bg-slate-900 p-4 space-y-1">
            <div className="text-xs font-mono text-blue-400 font-bold">PHASE 3: RECOVERY (F_recovery)</div>
            <div className="text-sm font-bold text-white">Vulnerability Window</div>
            <p className="text-xs text-slate-300">
              The follow-through animation where the attacker cannot move, attack, or block.
              This is the <strong>opportunity cost</strong> of missing an attack, enabling the opponent to execute a guaranteed punish.
            </p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-slate-100">Calculating Frame Advantage (ΔF)</h4>
        <p>
          When an attack connects, it places the defender into either <em>Hitstun</em> (F<sub>hitstun</sub>) or <em>Blockstun</em> (F<sub>blockstun</sub>).
          The competitive balance of a move depends on who recovers first:
        </p>
        <div className="text-center py-2 font-mono text-xs sm:text-sm text-cyan-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
          ΔF<sub>block</sub> = F<sub>blockstun</sub> − F<sub>recovery</sub>
        </div>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Plus on Block (ΔF &gt; 0):</strong> The attacker recovers first. They retain offensive initiative ("their turn").</li>
          <li><strong>Safe on Block (ΔF ≈ 0 to −3):</strong> The defender recovers slightly earlier, but cannot execute any attack fast enough to punish.</li>
          <li><strong>Punishable on Block (ΔF ≤ −6):</strong> The attacker is frozen in recovery long enough for the defender to land a guaranteed strike without risk.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
          3. Level Design as Graph Theory: Topology, Chokepoints &amp; Lock-and-Key Loops
        </h3>
        <p>
          Level design is applied spatial topology. In classical Metroidvanias, immersive sims (<em>Deus Ex, Dishonored</em>), and Souls-like games, environments are designed as mathematical graphs G = (V, E) where vertices V represent architectural rooms and edges E represent traversable corridors, doors, or drop-downs:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Cut Vertices (Articulation Points):</strong> A vertex whose removal disconnects the graph into separate components. In level design, this is a strict bottleneck or chokepoint. While useful for boss gates, having every room be a cut vertex creates a sterile linear corridor.
          </li>
          <li>
            <strong>Flanking Cycles:</strong> Introducing cycles in combat arenas provides alternative traversal paths, allowing players to disengage, kite enemies, or attack from an unanticipated vector.
          </li>
          <li>
            <strong>Directed Edges (One-Way Shortcuts):</strong> In <em>Dark Souls</em>, a player fights through a grueling 20-minute gauntlet to unlock an iron door from behind. This adds a directed edge (V<sub>deep</sub>, V<sub>hub</sub>), permanently collapsing the travel time from the safe checkpoint and providing an immense surge of psychological mastery.
          </li>
        </ul>
      </section>
    </article>
  );
};
