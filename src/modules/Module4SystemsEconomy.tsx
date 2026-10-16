import React, { useState } from 'react';
import { PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import {
  Activity,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Sliders,
  Flame,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { Module4Content } from '../content/Module4Content';

interface Module4Props {
  onNavigate: (page: PageId) => void;
  onCompleteModule: () => void;
  onCompleteLab: () => void;
  isModuleDone: boolean;
  isLabDone: boolean;
}

const ELEMENTS = ['Fire', 'Water', 'Metal', 'Electricity', 'Wood'] as const;
type ElementType = (typeof ELEMENTS)[number];

const CHEMISTRY_MATRIX: Record<ElementType, Record<ElementType, { title: string; rule: string; emergentDynamic: string }>> = {
  Fire: {
    Fire: { title: 'Thermal Convection Updraft', rule: 'sum(heat) > threshold → spawnVerticalWind(v_y = +8)', emergentDynamic: 'Player can ride dual fire patches with a glider to bypass high walls (Breath of the Wild).' },
    Water: { title: 'Flash Steam Obscuration', rule: 'Fire + Water → vaporize() + spawnFogCloud(radius=120)', emergentDynamic: 'Blocks enemy sightlines for stealth escapes or backstabs without needing a dedicated "Smoke Bomb" item.' },
    Metal: { title: 'Conductive Glow Heating', rule: 'Metal.temp += Fire.heat * dt; if (temp > 200) disarmHolder()', emergentDynamic: 'Heating an enemy’s metal shield forces them to drop it or take continuous burn damage.' },
    Electricity: { title: 'Plasma Arc Overload', rule: 'IonizedAir + Arc → AoE_Blast(radius=90)', emergentDynamic: 'Combines DoT status with burst crowd control.' },
    Wood: { title: 'Propagating Combustion', rule: 'if (Wood.touching(Fire)) Wood.ignite(duration=12s)', emergentDynamic: 'Wooden bridges, crates, and shields become temporary fuel sources or hazards.' },
  },
  Water: {
    Fire: { title: 'Flash Steam Obscuration', rule: 'Water + Fire → extinguish() + spawnFogCloud()', emergentDynamic: 'Puts out burning allies while creating a temporary vision screen.' },
    Water: { title: 'Deep Current Displacement', rule: 'depth > 2 → applyBuoyancy() + slowMovement(0.6)', emergentDynamic: 'Alters combat pacing and enables floating wooden rafts.' },
    Metal: { title: 'Corrosion / Heavy Sinking', rule: 'Metal.density > Water → sinkToBottom(); applyRust()', emergentDynamic: 'Metal chests sink while wooden chests float, creating natural physics puzzles.' },
    Electricity: { title: 'Conductive Puddle Chain-Stun', rule: 'for (entity in puddle.bounds) applyShock(dmg * 1.5)', emergentDynamic: 'Turns a single-target zap into a room-wide AoE stun whenever rain or spilled barrels are present.' },
    Wood: { title: 'Buoyant Raft Flotation', rule: 'Wood.density < Water → floatSurface()', emergentDynamic: 'Any chopped tree trunk automatically becomes a makeshift bridge.' },
  },
  Metal: {
    Fire: { title: 'Thermal Heat Sink', rule: 'Metal.absorbHeat() → contactBurn()', emergentDynamic: 'Superheated iron blocks melt adjacent ice doors passively.' },
    Water: { title: 'Submerged Anchor', rule: 'Metal.sink()', emergentDynamic: 'Used as counterweights on underwater pressure plates.' },
    Metal: { title: 'Magnetic Flux Coupling', rule: 'force = k * (m1 * m2) / r²', emergentDynamic: 'Allows building kinetic railguns or swinging pendulums.' },
    Electricity: { title: 'Zero-Resistance Relay Wire', rule: 'bridgeCircuit(nodeA, nodeB) via MetalWeapon', emergentDynamic: 'Players can drop metal swords on the ground to wire broken electrical doors when missing a puzzle block!' },
    Wood: { title: 'Structural Cleaving', rule: 'if (sharpMetal) Wood.split()', emergentDynamic: 'Harvesting trees or breaking barricades uses physical material tags rather than scripted triggers.' },
  },
  Electricity: {
    Fire: { title: 'Plasma Arc Overload', rule: 'Arc + Flame → Detonate()', emergentDynamic: 'High-synergy combo finisher.' },
    Water: { title: 'Hydro-Conduction AoE', rule: 'propagateShock(waterMesh)', emergentDynamic: 'Multiplies electric radius across wet surfaces.' },
    Metal: { title: 'Faraday Attraction & Disarm', rule: 'attractLightning(metalEquippedEntities)', emergentDynamic: 'During thunderstorms, wearing metal armor becomes a lethal liability unless you throw your sword at the boss.' },
    Electricity: { title: 'Capacitor Overcharge', rule: 'charge > max → EMP_Pulse()', emergentDynamic: 'Disables mechanical turrets temporarily.' },
    Wood: { title: 'Dielectric Insulator', rule: 'conductivity(Wood) === 0 → blockCurrent()', emergentDynamic: 'Wooden shields completely nullify lightning attacks that would pierce metal armor.' },
  },
  Wood: {
    Fire: { title: 'Torch & Wildfire Fuel', rule: 'Wood.ignite() → emitLight() + spreadFire()', emergentDynamic: 'A wooden club can be dipped in a brazier to light dark dungeons and deal fire damage until it burns to ash.' },
    Water: { title: 'Kinetic Flotation', rule: 'Wood.float()', emergentDynamic: 'Creates dynamic stepping stones across rivers.' },
    Metal: { title: 'Impact Reinforcement', rule: 'Wood + MetalStuds → +Durability', emergentDynamic: 'Composite crafting without hardcoded recipes.' },
    Electricity: { title: 'Lightning Grounding Shield', rule: 'absorbShock(0)', emergentDynamic: 'Rewards carrying low-tier wooden gear into high-tier electric boss fights.' },
    Wood: { title: 'Kinetic Stacking & Shelter', rule: 'rigidBodyStack()', emergentDynamic: 'Emergent barricade construction.' },
  },
};

export const Module4SystemsEconomy: React.FC<Module4Props> = ({
  onNavigate,
  onCompleteModule,
  onCompleteLab,
  isModuleDone,
  isLabDone,
}) => {
  // Interactive Diagram 4.1: Chemistry Matrix Selection
  const [elemA, setElemA] = useState<ElementType>('Electricity');
  const [elemB, setElemB] = useState<ElementType>('Metal');

  // Lab 4: Machinations Economy & Feedback Simulator State
  const [baseKillGold, setBaseKillGold] = useState<number>(22);
  const [snowballInterest, setSnowballInterest] = useState<number>(0.28); // Positive feedback loop
  const [upkeepDrainRate, setUpkeepDrainRate] = useState<number>(0.14); // Negative feedback drain
  const [dynamicThreatScale, setDynamicThreatScale] = useState<number>(0.18); // Rubber-banding enemy HP scaling

  // Simulate 15 Waves of Economy & Tension
  const waveData: {
    wave: number;
    playerPower: number;
    enemyThreat: number;
    goldPool: number;
    tensionRatio: number;
  }[] = [];

  let gold = 50;
  let power = 100;
  let balancedWavesCount = 0;

  for (let w = 1; w <= 15; w++) {
    const enemyThreat = Math.round(85 * Math.pow(1.16, w - 1) + power * dynamicThreatScale * (w - 1) * 0.25);
    const ratio = enemyThreat / Math.max(1, power);

    // Check if tension ratio is inside healthy challenge band [0.78, 1.22]
    if (ratio >= 0.78 && ratio <= 1.22) {
      balancedWavesCount++;
    }

    waveData.push({
      wave: w,
      playerPower: Math.round(power),
      enemyThreat,
      goldPool: Math.round(gold),
      tensionRatio: ratio,
    });

    // Machinations step: Source -> Pool -> Converter -> Drain
    const killIncome = baseKillGold * (1 + w * 0.15);
    const positiveSnowballBonus = gold * snowballInterest;
    const upkeepSink = Math.pow(power / 100, 1.45) * upkeepDrainRate * 65;

    gold = Math.max(10, gold + killIncome + positiveSnowballBonus - upkeepSink);
    // Converter: invest 55% of gold into Turret/Weapon Power
    const invested = gold * 0.55;
    gold -= invested;
    power += invested * 0.65;
  }

  const economyHealthPct = Math.round((balancedWavesCount / 15) * 100);
  const isBalanced = economyHealthPct >= 80;

  // Build SVG polylines for Player Power vs Enemy Threat
  const maxVal = Math.max(
    600,
    ...waveData.map((d) => Math.max(d.playerPower, d.enemyThreat))
  );

  const powerPoints = waveData
    .map((d, i) => {
      const x = 55 + (i / 14) * 440;
      const y = 215 - (d.playerPower / maxVal) * 175;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  const threatPoints = waveData
    .map((d, i) => {
      const x = 55 + (i / 14) * 440;
      const y = 215 - (d.enemyThreat / maxVal) * 175;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-gradient-to-r from-rose-500 to-pink-600 px-3 py-1 text-xs font-mono font-bold text-white">
            MODULE 04 • HOURS 6:00 – 8:00
          </span>
          <span className="text-xs font-mono text-slate-400">
            Adams & Dormans (Machinations) + Salen & Zimmerman (Cybernetics) + Emergent Chemistry
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Systems, Internal Economies & Cybernetic Feedback Loops
        </h1>
        <p className="text-slate-300 max-w-4xl leading-relaxed">
          Once your sub-second controls (Module 2) and tactical combat choices (Module 3) work, how do you sustain engagement over 60 minutes or 60 hours?
          By modeling your game as a <strong className="text-rose-300">Petri-Net Resource Economy (Machinations)</strong> governed by coupled positive and negative differential feedback loops, and replacing brittle `if-else` scripts with $O(N^2)$ <strong>Systemic Chemistry Engines</strong>.
        </p>
      </header>

      {/* Comprehensive Academic Textbook Chapter */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <Module4Content />
      </section>

      {/* Section 4.1: Cybernetic Feedback Loops & Machinations */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400">
          <Activity className="h-4 w-4" />
          <span>4.1 Cybernetic Control Systems & Adams/Dormans Machinations</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Positive Feedback (Snowballing) vs. Negative Feedback (Rubber-Banding & Upkeep Drains)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-5 space-y-2">
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="text-rose-400 font-bold">POSITIVE FEEDBACK LOOP</span>
              <span className="bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded">dx/dt = +k · x (Exponential Runaway)</span>
            </div>
            <div className="text-base font-bold text-white">Amplifies Early Advantage ("Rich Get Richer")</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <em>Example:</em> Scoring a kill in <em>League of Legends</em> or <em>Call of Duty</em> grants Gold/Killstreaks, making the next kill easier.
              <strong> Danger:</strong> Unchecked positive feedback creates "Dead Time"—where the winner is mathematically decided at minute 8, but the match drags on until minute 35.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-2">
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="text-cyan-400 font-bold">NEGATIVE FEEDBACK LOOP</span>
              <span className="bg-cyan-500/20 text-cyan-200 px-2 py-0.5 rounded">dx/dt = -k · (x - x_setpoint)</span>
            </div>
            <div className="text-base font-bold text-white">Stabilizes Equilibrium ("Rubber-Banding / Upkeep")</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <em>Example:</em> In <em>Civilization</em> or <em>Warcraft III</em>, larger empires/armies pay exponential maintenance tax (Upkeep Drain), or trailing players in <em>Mario Kart</em> draw stronger items.
              <strong> Danger:</strong> Over-aggressive negative feedback punishes mastery ("Blue Shell Syndrome").
            </p>
          </div>
        </div>

        {/* Machinations Petri-Net Architecture SVG */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="text-xs font-mono text-slate-400 mb-3">
            FORMAL MACHINATIONS DIAGRAM (Joris Dormans): Resources flow as discrete tokens through 5 primitives
          </div>
          <svg viewBox="0 0 820 185" className="w-full min-w-[640px] h-auto">
            <defs>
              <marker id="arrowFlow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <marker id="arrowFeedback" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
              </marker>
            </defs>

            {/* 1. Source (Triangle) */}
            <polygon points="65,60 95,115 35,115" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
            <text x="65" y="138" fill="#6ee7b7" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
              SOURCE (∆)
            </text>
            <text x="65" y="153" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
              Enemy Spawns
            </text>

            <line x1="98" y1="95" x2="188" y2="95" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowFlow)" />
            <text x="143" y="85" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
              +{baseKillGold}g/wave
            </text>

            {/* 2. Pool (Circle) */}
            <circle cx="230" cy="95" r="34" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
            <text x="230" y="92" fill="#e0e7ff" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
              GOLD POOL
            </text>
            <text x="230" y="107" fill="#a5b4fc" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
              State Queue
            </text>

            <line x1="268" y1="95" x2="365" y2="95" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowFlow)" />
            <text x="316" y="85" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
              55% Invest
            </text>

            {/* 3. Converter (Triangle Right) */}
            <polygon points="375,65 435,95 375,125" fill="#3b0764" stroke="#c084fc" strokeWidth="2.5" />
            <text x="400" y="145" fill="#d8b4fe" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
              CONVERTER (▷)
            </text>
            <text x="400" y="160" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
              Shop Upgrade
            </text>

            <line x1="440" y1="95" x2="530" y2="95" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowFlow)" />

            {/* 4. Power Pool */}
            <circle cx="575" cy="95" r="34" fill="#083344" stroke="#22d3ee" strokeWidth="2.5" />
            <text x="575" y="92" fill="#cffafe" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
              POWER POOL
            </text>
            <text x="575" y="107" fill="#67e8f9" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
              Combat DPS
            </text>

            {/* Positive Feedback Loop Arc back to Source */}
            <path d="M 575,58 Q 320,5 85,58" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrowFeedback)" />
            <text x="335" y="25" fill="#fda4af" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
              + Positive Feedback Loop (Faster Kills → +{Math.round(snowballInterest * 100)}% Snowball Yield)
            </text>

            <line x1="612" y1="95" x2="705" y2="95" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrowFeedback)" />
            <text x="658" y="85" fill="#fda4af" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
              -{Math.round(upkeepDrainRate * 100)}% Tax
            </text>

            {/* 5. Drain (Inverted Triangle) */}
            <polygon points="715,70 775,70 745,125" fill="#4c0519" stroke="#f43f5e" strokeWidth="2.5" />
            <text x="745" y="145" fill="#fda4af" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
              DRAIN (▽)
            </text>
            <text x="745" y="160" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
              Upkeep Sink
            </text>
          </svg>
        </div>
      </section>

      {/* Playable Lab 4: Fix the Broken Economy */}
      <section className="rounded-2xl border-2 border-rose-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-rose-400 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Playable Engineering Lab 04 • "Stabilize the Runaway Economy"</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              15-Wave Machinations Simulator: Balance Snowballing vs. Upkeep Sinks
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2 text-xs font-mono">
              Waves in Flow Equilibrium: <strong className={isBalanced ? 'text-emerald-400' : 'text-amber-400'}>{economyHealthPct}%</strong>
            </div>
            {isLabDone || isBalanced ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-mono font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" /> Economy Stabilized (≥80%)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 text-xs font-mono text-amber-300">
                Goal: Tune sliders for ≥80% Flow Equilibrium
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Adjust the 4 Machinations parameters below so that <strong>Player Power (Cyan Curve)</strong> tracks closely with <strong>Enemy Threat (Rose Curve)</strong> across all 15 waves without runaway snowballing (player becomes invincible) or starvation (enemies crush player). When Equilibrium reaches $\ge 80\%$, click <strong>"Commit Balanced Economy"</strong>!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Time Series Plot */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            <svg viewBox="0 0 530 245" className="w-full h-auto">
              <line x1="55" y1="215" x2="500" y2="215" stroke="#475569" strokeWidth="2" />
              <line x1="55" y1="215" x2="55" y2="25" stroke="#475569" strokeWidth="2" />

              {/* Player Power Curve */}
              <path d={powerPoints} fill="none" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" />

              {/* Enemy Threat Curve */}
              <path d={threatPoints} fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="6 4" />

              {/* Legend */}
              <text x="70" y="42" fill="#22d3ee" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                — Player Combat Power (Pool Output)
              </text>
              <text x="70" y="60" fill="#f43f5e" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                -- Enemy Wave Threat Curve
              </text>
              <text x="280" y="238" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
                Progression Waves (Wave 1 → Wave 15)
              </text>
            </svg>

            <div className="flex flex-wrap gap-2 justify-between items-center pt-1">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    courseAudio.playClick(400);
                    setBaseKillGold(32);
                    setSnowballInterest(0.45);
                    setUpkeepDrainRate(0.02);
                    setDynamicThreatScale(0.05);
                  }}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-mono text-rose-300 cursor-pointer"
                >
                  Preset: Broken Runaway Snowball
                </button>
                <button
                  onClick={() => {
                    courseAudio.playSuccess();
                    setBaseKillGold(20);
                    setSnowballInterest(0.18);
                    setUpkeepDrainRate(0.16);
                    setDynamicThreatScale(0.32);
                    if (!isLabDone) onCompleteLab();
                  }}
                  className="rounded-lg bg-emerald-600/30 border border-emerald-500/40 hover:bg-emerald-600/40 px-3 py-1.5 text-xs font-mono text-emerald-200 cursor-pointer"
                >
                  Preset: Golden Cybernetic Equilibrium
                </button>
              </div>

              {isBalanced && !isLabDone && (
                <button
                  onClick={() => {
                    courseAudio.playSuccess();
                    onCompleteLab();
                  }}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-mono font-bold text-white cursor-pointer"
                >
                  ✓ Commit Balanced Economy
                </button>
              )}
            </div>
          </div>

          {/* Sliders */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-emerald-400">Source: Base Gold per Wave</span>
                <span className="text-white font-bold">{baseKillGold}g</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="2"
                value={baseKillGold}
                onChange={(e) => setBaseKillGold(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-rose-400">Positive Loop: Compounding Snowball</span>
                <span className="text-white font-bold">{Math.round(snowballInterest * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.50"
                step="0.02"
                value={snowballInterest}
                onChange={(e) => setSnowballInterest(parseFloat(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-cyan-400">Negative Drain: Upkeep Tax Sink</span>
                <span className="text-white font-bold">{Math.round(upkeepDrainRate * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.35"
                step="0.02"
                value={upkeepDrainRate}
                onChange={(e) => setUpkeepDrainRate(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-amber-400">Negative Loop: Threat Rubber-Banding</span>
                <span className="text-white font-bold">{Math.round(dynamicThreatScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.50"
                step="0.02"
                value={dynamicThreatScale}
                onChange={(e) => setDynamicThreatScale(parseFloat(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4.2: Emergent Complexity & The Chemistry Matrix */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
          <Flame className="h-4 w-4" />
          <span>4.2 Emergent Systems Architecture — Breath of the Wild & Spelunky</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Orthogonal Tag Composition: How $O(N)$ Systemic Properties Yield $O(N^2)$ Gameplay
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Novice engineers build mechanics using brittle, pairwise `if (item === 'KeyA' && door === 'DoorA')` checks.
          Systems architects assign <strong>physical state tags</strong> (`Conductive`, `Flammable`, `Buoyant`, `Metallic`, `Wet`) to every entity in the world and let a unified <strong>Chemistry/Physics Resolver</strong> evaluate interactions every frame. Click any two elemental tags below to inspect their systemic rule:
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase text-slate-400">Select Two Interacting Systemic Tags:</div>
            <div className="grid grid-cols-5 gap-2">
              {ELEMENTS.map((el) => (
                <button
                  key={`A-${el}`}
                  onClick={() => {
                    courseAudio.playClick(500);
                    setElemA(el);
                  }}
                  className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                    elemA === el
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {el}
                </button>
              ))}
            </div>

            <div className="text-center text-xs font-mono text-slate-500">+ COMBINED WITH +</div>

            <div className="grid grid-cols-5 gap-2">
              {ELEMENTS.map((el) => (
                <button
                  key={`B-${el}`}
                  onClick={() => {
                    courseAudio.playClick(620);
                    setElemB(el);
                  }}
                  className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                    elemB === el
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 rounded-xl border border-indigo-500/30 bg-slate-950 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-bold">
                [{elemA.toUpperCase()}] × [{elemB.toUpperCase()}]
              </span>
              <span className="text-[11px] font-mono bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded">
                Zero Hardcoded Edge Cases
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {CHEMISTRY_MATRIX[elemA][elemB].title}
            </h3>
            <pre className="rounded bg-slate-900 border border-slate-800 p-3 text-xs font-mono text-cyan-300 overflow-x-auto">
              {CHEMISTRY_MATRIX[elemA][elemB].rule}
            </pre>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-400 font-mono">Emergent Player Discovery:</strong>{' '}
              {CHEMISTRY_MATRIX[elemA][elemB].emergentDynamic}
            </p>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('module-3')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Module 03</span>
          </button>

          <button
            onClick={() => {
              courseAudio.playSuccess();
              onCompleteModule();
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition cursor-pointer ${
              isModuleDone
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isModuleDone ? 'Module 04 Completed' : 'Mark Module 04 Theory Complete'}</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('module-5')}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition cursor-pointer"
        >
          <span>Next: Module 05 (Probability, PRD, Game Theory & Telemetry)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
