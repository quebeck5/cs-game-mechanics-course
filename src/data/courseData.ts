export type PageId =
  | 'overview'
  | 'module-1'
  | 'module-2'
  | 'module-3'
  | 'module-4'
  | 'module-5'
  | 'rosetta-library';

export interface CourseSectionMeta {
  id: PageId;
  code: string;
  title: string;
  subtitle: string;
  hours: string;
  durationMinutes: number;
  badgeColor: string;
  csConcepts: string[];
  gameDesignConcepts: string[];
  keyTakeaway: string;
}

export const COURSE_MODULES: CourseSectionMeta[] = [
  {
    id: 'overview',
    code: 'SYLLABUS',
    title: 'Course Architecture & The CS-to-Fun Paradigm Shift',
    subtitle: 'Why software engineering optimizes away friction, while game design engineers voluntary, meaningful obstacles.',
    hours: '0.5 Hours (Orientation)',
    durationMinutes: 30,
    badgeColor: 'from-indigo-500 to-purple-500',
    csConcepts: ['Compiler Pipelines', 'State Space Complexity', 'Control Systems', 'Heuristic Optimization'],
    gameDesignConcepts: ['Lusory Attitude', 'MDA Framework', '3Cs & Game Feel', 'Machinations Economies'],
    keyTakeaway: 'Games are real-time cybernetic loops where your code (Mechanics) compiles with human biological I/O into emergent runtime behavior (Dynamics) to evoke neurobiological pattern recognition (Aesthetics/Fun).'
  },
  {
    id: 'module-1',
    code: 'MODULE 01',
    title: 'Deconstructing "Fun": MDA, Information Theory & The Toy',
    subtitle: 'Formalizing Mechanics → Dynamics → Aesthetics, Koster’s Shannon Entropy of Fun, and Csikszentmihalyi’s Flow Phase Space.',
    hours: 'Hours 0:00 – 2:00 (2.0h)',
    durationMinutes: 120,
    badgeColor: 'from-cyan-500 to-blue-600',
    csConcepts: ['Data Compression & Shannon Entropy', 'State Transition Graphs G=(S,E)', 'Phase Portraits', 'Bidirectional Compilers'],
    gameDesignConcepts: ['Hunicke/LeBlanc/Zubek MDA', 'Koster’s Theory of Fun', 'Flow Channel Trajectory', 'The Toy Before The Game'],
    keyTakeaway: 'Fun is the brain’s dopaminergic reward for compressing a non-trivial state space. When entropy hits zero (Tic-Tac-Toe solved), fun terminates; when entropy exceeds working memory, anxiety sets in.'
  },
  {
    id: 'module-2',
    code: 'MODULE 02',
    title: 'The Physics of Virtual Sensation: 3Cs, ADSR & Control Theory',
    subtitle: 'Sub-second human processor loops (~240ms), piecewise jump calculus, temporal hysteresis (Coyote Time & Input Buffers), and Juice.',
    hours: 'Hours 2:00 – 4:00 (2.0h)',
    durationMinutes: 120,
    badgeColor: 'from-emerald-500 to-teal-600',
    csConcepts: ['ADSR Signal Envelopes', 'Piecewise ODEs & Kinematics', 'Ring Buffers & Hysteresis FSMs', 'Critically Damped PID Cameras'],
    gameDesignConcepts: ['Swink’s Game Feel', 'Asymmetric Jump Gravity & Apex Hang', 'Coyote Time & Jump Buffering', 'Hitstop & Trauma Shake'],
    keyTakeaway: 'Real-world physics (constant g = 9.8m/s², step-function velocities, zero input forgiveness) feels sluggish and broken because of human 240ms perceptual-motor lag. Great game feel cheats time and physics in the player’s favor.'
  },
  {
    id: 'module-3',
    code: 'MODULE 03',
    title: 'Decisions, Space & Imperfect Information: Frame Data & Graph Topology',
    subtitle: 'Startup/Active/Recovery combat frames, Expected Value E[V], Pareto-optimal weapon tuning, and level design as graph theory.',
    hours: 'Hours 4:00 – 6:00 (2.0h)',
    durationMinutes: 120,
    badgeColor: 'from-amber-500 to-orange-600',
    csConcepts: ['Pushdown Automata & Frame Windows', 'Pareto Frontiers & Dominance', 'DAGs, Cycles & Cut Vertices', 'Working Memory Limits (4±1)'],
    gameDesignConcepts: ['Startup / Active / Recovery Frames', 'Frame Advantage (ΔF)', 'Meaningful Choices & Telegraphing', 'Lock-and-Key Spatial Topology'],
    keyTakeaway: 'Every meaningful tactical decision requires orthogonal trade-offs (speed vs. reach vs. recovery vulnerability) and clear 200ms+ perceptual telegraphs so failure feels attributable to player choice, not unfairness.'
  },
  {
    id: 'module-4',
    code: 'MODULE 04',
    title: 'Systems, Internal Economies & Cybernetic Feedback Loops',
    subtitle: 'Positive vs. negative feedback differential equations, Adams & Dormans’ Machinations Petri Nets, and O(N²) emergent chemistry engines.',
    hours: 'Hours 6:00 – 8:00 (2.0h)',
    durationMinutes: 120,
    badgeColor: 'from-rose-500 to-pink-600',
    csConcepts: ['Petri Nets & Token Queues', 'Cybernetic Feedback (dx/dt = ±kx)', 'Orthogonal Tag Composition O(N²)', 'Dynamic Equilibrium'],
    gameDesignConcepts: ['Sources, Pools, Converters, Drains', 'Snowballing vs. Rubber-Banding', 'Engine Building vs. Upkeep Sinks', 'Systemic Chemistry (BotW / Spelunky)'],
    keyTakeaway: 'Unchecked positive feedback loops (Kills → Gold → Power → Faster Kills) cause runaway snowballing and dead time. Robust internal economies pair growth engines with dynamic friction drains.'
  },
  {
    id: 'module-5',
    code: 'MODULE 05',
    title: 'Probability, Game Theory, Telemetry & Automated Balancing',
    subtitle: 'Why true RNG feels broken, Markov Pseudo-Random Distributions (PRD), Tetris Shuffle Bags, Nash Equilibria, and Monte Carlo bot playtesting.',
    hours: 'Hours 8:00 – 10:00 (2.0h)',
    durationMinutes: 120,
    badgeColor: 'from-violet-500 to-fuchsia-600',
    csConcepts: ['Markov Chains & PRD (P(N) = C·N)', 'Sampling Without Replacement', 'Payoff Matrices & Replicator Dynamics', 'Monte Carlo Headless Simulation'],
    gameDesignConcepts: ['Input vs. Output Randomness', 'Streak-Bounding Crit & Loot Systems', 'Intransitive Asymmetric Balance', 'Telemetry Heatmaps & Playtesting'],
    keyTakeaway: 'Humans misperceive independent Bernoulli trials (clustering illusion). Game engineers shape variance using Markov PRD or Shuffle Bags, and validate asymmetric balance via headless Monte Carlo simulations.'
  },
  {
    id: 'rosetta-library',
    code: 'REFERENCE',
    title: 'The CS-to-Game-Design Rosetta Stone, University Syllabi & Mastery Exam',
    subtitle: 'Complete translation matrix for software engineers, annotated bibliography (MIT, Stanford, CMU, USC + 8 core books), and interactive certification quiz.',
    hours: 'Reference & Certification',
    durationMinutes: 45,
    badgeColor: 'from-blue-500 to-indigo-600',
    csConcepts: ['Full-Stack Systems Mapping', 'Game Programming Patterns', 'Architectural Decoupling'],
    gameDesignConcepts: ['Academic Syllabi Synthesis', 'Foundational Literature', 'Capstone Mastery Verification'],
    keyTakeaway: 'Use this permanent engineering reference whenever designing a new prototype, debugging why a mechanic feels flat, or balancing a progression curve.'
  }
];

export interface RosettaEntry {
  domain: string;
  csConcept: string;
  csFormalism: string;
  gameConcept: string;
  paradigmShift: string;
  bookReference: string;
}

export const ROSETTA_ENTRIES: RosettaEntry[] = [
  {
    domain: 'Architecture & UX',
    csConcept: 'Compiler Pipeline (Source → AST → Runtime → Output)',
    csFormalism: 'f(Code, Input) → StateTrace → Render',
    gameConcept: 'MDA Framework (Mechanics → Dynamics → Aesthetics)',
    paradigmShift: 'In enterprise apps, you minimize user steps to reach the goal. In games, you write formal rules (Mechanics) that compile with human input into emergent runtime challenges (Dynamics) to evoke emotion (Aesthetics).',
    bookReference: 'Hunicke, LeBlanc & Zubek (2004); MIT CMS.608'
  },
  {
    domain: 'Input & Kinematics',
    csConcept: 'Step Functions vs. Audio ADSR Envelopes',
    csFormalism: 'v(t) = v_max · (1 - e^{-t/τ_attack})',
    gameConcept: 'Swink’s Game Feel & Horizontal Movement Profiles',
    paradigmShift: 'Raw boolean keydown (v = 300 instantly) feels robotic; naive linear acceleration feels sluggish. Great controllers shape Attack, Decay, Sustain, and Release curves over 50–150ms.',
    bookReference: 'Steve Swink — Game Feel (2008)'
  },
  {
    domain: 'Physics & Control',
    csConcept: 'Piecewise Differential Equations',
    csFormalism: 'g_rise = 2H/t_p², g_fall = k · g_rise (k ≈ 2.2–3.0)',
    gameConcept: 'Non-Newtonian Jump Curves & Apex Hang Time',
    paradigmShift: 'Never tune a jump by guessing force F and gravity g. Parameterize by exact spatial level metrics: Max Height (H) and Time to Peak (t_p), then increase gravity on descent and halve gravity near the apex (|v_y| < ε).',
    bookReference: 'GDC "Math for Game Programmers: Building a Better Jump"'
  },
  {
    domain: 'State Machines & I/O',
    csConcept: 'Temporal Hysteresis & Ring Buffers',
    csFormalism: 'canJump = isGrounded || (t - t_lastGround < Δt_coyote)',
    gameConcept: 'Coyote Time (~100ms) & Input Buffering (~100ms)',
    paradigmShift: 'The human perceptual-motor loop takes ~240ms. Strict boolean state checks (`if (isGrounded && keyJustPressed)`) punish biological latency. Temporal tolerance windows make controls feel telepathic.',
    bookReference: 'Steve Swink — Game Feel; Maddy Thorson (Celeste)'
  },
  {
    domain: 'Control Theory',
    csConcept: 'PID Controllers & Spring-Damper Systems',
    csFormalism: 'ẍ + 2ζω_n ẋ + ω_n² (x - x_target) = 0',
    gameConcept: '3rd C: Camera Look-Ahead, Deadzones & Trauma Shake',
    paradigmShift: 'Locking camera `(cx, cy) = (px, py)` causes visual jitter and hides upcoming obstacles. Use a velocity look-ahead target with critically damped spring smoothing (ζ ≈ 1.0) and a spatial deadzone.',
    bookReference: 'Squirrel Eiserloh — GDC Camera & Trauma Systems'
  },
  {
    domain: 'Information Theory',
    csConcept: 'Shannon Entropy & Lossless Compression',
    csFormalism: 'H(X) = -∑ P(x) log₂ P(x) → dH/dt < 0',
    gameConcept: 'Raph Koster’s Theory of Fun & Flow Channel',
    paradigmShift: 'Fun is the rate at which the human brain discovers and compresses hidden patterns in a state space. High uncompressible entropy = chaotic noise (anxiety); zero remaining entropy = solved system (boredom).',
    bookReference: 'Raph Koster — A Theory of Fun for Game Design (2004)'
  },
  {
    domain: 'Concurrency & Petri Nets',
    csConcept: 'Petri Nets, Token Queues & Feedback ODEs',
    csFormalism: 'dR/dt = Sources(t) + k_pos·R - k_neg·R² - Drains',
    gameConcept: 'Machinations Internal Economies (Sources, Pools, Converters, Drains)',
    paradigmShift: 'Health, mana, gold, and threat are tokens flowing through a directed graph. Positive feedback loops accelerate termination (snowballing); negative feedback loops stabilize equilibrium (rubber-banding).',
    bookReference: 'Ernest Adams & Joris Dormans — Game Mechanics (2012)'
  },
  {
    domain: 'Probability & Stochastics',
    csConcept: 'Markov Chains vs. i.i.d. Bernoulli Trials',
    csFormalism: 'P(N) = min(1, C · N) where N = streak of misses',
    gameConcept: 'Pseudo-Random Distribution (PRD) & Shuffle Bags',
    paradigmShift: 'True `Math.random() < 0.25` regularly produces 10 misses in a row or 4 crits in a row, which players perceive as rigged. PRD ramps probability linearly with each miss, preserving expected value while bounding variance.',
    bookReference: 'USC CTIN 488; Dota 2 / Warcraft III Engine Docs'
  },
  {
    domain: 'Optimization & Game Theory',
    csConcept: 'Pareto Frontiers & Replicator Dynamics',
    csFormalism: '∄ A such that ∀ metric i, A_i ≥ B_i',
    gameConcept: 'Asymmetric Weapon/Character Balance & Intransitive Meta',
    paradigmShift: 'If one weapon has higher DPS, longer range, and faster recovery, the game collapses into a single dominant strategy. Place options on a multidimensional Pareto surface and weave Rock-Paper-Scissors cycles.',
    bookReference: 'Jesse Schell — The Art of Game Design; MIT CMS.608'
  }
];
