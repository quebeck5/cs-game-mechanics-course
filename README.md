# 🎓 CS-404: Engineering "Fun" — Game Mechanics for Computer Scientists (10-Hour Web Course)

A standalone, interactive 10-hour university-level web course located in `course/`, completely separate from the `gamesproto` classroom minigames hub.

Designed specifically for **Computer Science graduates with zero prior game development experience**, this course bridges formal CS mental models (Compilers, Finite State Machines, Control Theory, Petri Nets, Shannon Information Theory, Markov Chains, and Monte Carlo Simulation) with the psychological and mechanical foundations of great game design.

---

## 🚀 Quick Start (Standalone Server on Port 4000)

```bash
cd course
npm run dev
```

Open **[http://localhost:4000](http://localhost:4000)** in your browser.

To build the static production bundle:
```bash
cd course
npm run build
```

---

## 📚 Research Lineage: University Syllabi & Foundational Books

This curriculum synthesizes five leading university game engineering programs and eight foundational textbooks:
- **MIT CMS.608 / 6.073 (*Game Design*)**: Formal rule systems, the MDA Framework, cybernetic feedback loops, and pruning rule bloat.
- **DigiPen GAT 110/210 & Stanford CS146/CS247G**: The 3Cs (Character, Camera, Controls), spatial metrics, piecewise jump calculus, and playtesting.
- **USC CTIN 488 (*Game Design Workshop*) & CMU ETC**: Formal vs. dramatic elements, playcentric iteration, and design lenses.
- **Core Books**:
  1. *The MDA Framework* — Robin Hunicke, Marc LeBlanc, Robert Zubek (2004)
  2. *Game Feel: A Game Designer's Guide to Virtual Sensation* — Steve Swink (2008)
  3. *Game Mechanics: Advanced Game Design* (Machinations) — Ernest Adams & Joris Dormans (2012)
  4. *A Theory of Fun for Game Design* — Raph Koster (2004)
  5. *The Gamer's Brain* — Celia Hodent (2017)
  6. *Rules of Play* — Katie Salen & Eric Zimmerman (2003)
  7. *The Art of Game Design: A Book of Lenses* — Jesse Schell (2008)
  8. *Game Programming Patterns* — Robert Nystrom (2014)

---

## 🧭 10-Hour Course Structure (7 Interactive Pages)

1. **Course Overview & The CS-to-Fun Paradigm Shift (`OverviewPage.tsx`)**:
   - Why software engineers optimize away friction ($O(1)$ clicks) while game designers craft voluntary, meaningful obstacles.
   - Multi-scale frequency architecture: Micro-Loop (16ms–500ms), Core Loop (2s–120s), Macro Loop (5m–10h+).
2. **Module 01 (Hours 0:00 – 2:00): Deconstructing "Fun" — MDA, Information Theory & The Toy (`Module1MDA.tsx`)**:
   - **Interactive Diagram 1.1**: Bidirectional MDA Compiler Simulator (toggle code rules $\rightarrow$ observe emergent Dynamics $\rightarrow$ inspect Aesthetic shifts).
   - **Interactive Diagram 1.2**: Sawtooth Flow Channel Phase Portrait.
   - **Playable Lab 01**: *The Kinetic Juggle Toy Sandbox* — mutate gravity, bounce restitution, paddle momentum transfer, and hitstop frames to transform a sterile 1D bounce test into either a *Zen Toy* or a *High-Octane Challenge*.
3. **Module 02 (Hours 2:00 – 4:00): The Physics of Virtual Sensation — 3Cs, ADSR & Control Theory (`Module2GameFeel.tsx`)**:
   - **Interactive Diagram 2.1**: Piecewise Jump Trajectory Oscilloscope ($H_{\max}, t_{\text{peak}}$, asymmetric falling gravity, apex hang boost) vs. naive Newtonian gravity.
   - **Interactive Diagram 2.2**: 60 FPS Logic Analyzer for **Coyote Time** and **Jump Input Ring Buffers**.
   - **Playable Lab 02**: *The Platformer Feel Surgery* — live A/B hot-swapping (`Tab`) between Naive CS Physics and a tuned *Celeste*-style controller with Engineer X-Ray Telemetry overlays.
4. **Module 03 (Hours 4:00 – 6:00): Decisions, Space & Imperfect Information — Frame Data & Graph Topology (`Module3DecisionsSpace.tsx`)**:
   - **Interactive Diagram 3.1**: 60 FPS Combat Frame-Data Strip (Startup / Active / Recovery) & Frame Advantage ($\Delta F$) calculator.
   - **Interactive Diagram 3.2**: Level Topology Graph Visualizer (Linear Cut-Vertex Corridor vs. Cyclic Lock-and-Key Metroidvania/Souls Graph).
   - **Playable Lab 03**: *Pareto Weapons & Telegraph Arena Duel* — test Twin Dagger, Halberd Spear, and Seismic Hammer against an arena boss with tunable perceptual telegraph windows.
5. **Module 04 (Hours 6:00 – 8:00): Systems, Internal Economies & Cybernetic Feedback Loops (`Module4SystemsEconomy.tsx`)**:
   - **Interactive Diagram 4.1**: Formal Machinations Petri-Net Diagram (Sources, Pools, Converters, Gates, Drains).
   - **Playable Lab 04**: *15-Wave Machinations Economy Simulator* — balance positive snowballing loops against negative upkeep drains and dynamic threat rubber-banding.
   - **Interactive Diagram 4.2**: $O(N^2)$ Systemic Chemistry Matrix (*Breath of the Wild* / *Spelunky* orthogonal tag resolver).
6. **Module 05 (Hours 8:00 – 10:00): Probability, Game Theory, Telemetry & Automated Balancing (`Module5ProbabilityBalance.tsx`)**:
   - **Interactive Diagram 5.1**: 1,000-Trial Streak Histogram comparing True `Math.random()` vs. **Markov Pseudo-Random Distribution ($P(N) = C \cdot N$)** vs. **Shuffle Bags**.
   - **Playable Lab 05**: *Headless Monte Carlo Balance Studio* — tune asymmetric class stats and run 1,000 automated bot matches to converge on a $30\%–37\%$ Nash Equilibrium.
7. **CS-to-Game-Design Rosetta Stone & Certification Exam (`RosettaLibraryPage.tsx`)**:
   - Complete 9-domain translation table, annotated bibliography, and a graded 5-question Capstone Engineering Assessment with confetti certification.
