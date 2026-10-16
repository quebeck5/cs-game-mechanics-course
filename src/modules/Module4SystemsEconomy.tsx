import React, { useState } from 'react';
import { PageId } from '../data/courseData';
import { courseAudio } from '../audio/soundEngine';
import {
  Activity,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Flame
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
  const [snowballInterest, setSnowballInterest] = useState<number>(0.28);
  const [upkeepDrainRate, setUpkeepDrainRate] = useState<number>(0.14);
  const [dynamicThreatScale, setDynamicThreatScale] = useState<number>(0.18);

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

    const killIncome = baseKillGold * (1 + w * 0.15);
    const positiveSnowballBonus = gold * snowballInterest;
    const upkeepSink = Math.pow(power / 100, 1.45) * upkeepDrainRate * 65;

    gold = Math.max(10, gold + killIncome + positiveSnowballBonus - upkeepSink);
    const invested = gold * 0.55;
    gold -= invested;
    power += invested * 0.65;
  }

  const economyHealthPct = Math.round((balancedWavesCount / 15) * 100);
  const isBalanced = economyHealthPct >= 80;

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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="border-b border-zinc-200 pb-5 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-mono font-bold text-blue-700">
            MODULE 04 • ESTIMATED STUDY TIME: 2.0 HOURS
          </span>
          <span className="text-xs font-mono text-zinc-500">
            Internal Economies (Machinations), Cybernetics &amp; Emergent Chemistry
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
          Systems, Internal Economies &amp; Cybernetic Feedback Loops
        </h1>
        <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
          How do strategy games, RPGs, and survival games maintain dramatic pacing across dozens of hours?
          By modeling the game as a <strong>Petri-Net Resource Economy (Machinations)</strong> governed by coupled positive and negative differential feedback loops, and replacing brittle hardcoded scripts with orthogonal <strong>Emergent Chemistry Engines</strong>.
        </p>
      </header>

      {/* Comprehensive Academic Textbook Chapter */}
      <section>
        <Module4Content />
      </section>

      {/* Section 4.1: Cybernetic Feedback Loops & Machinations */}
      <section className="space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Activity className="h-4 w-4" />
            <span>4.1 Cybernetic Control Systems &amp; Machinations Primitives</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-950 mt-1">
            Positive Feedback (Snowballing) vs. Negative Feedback (Rubber-Banding &amp; Upkeep)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="text-red-700 font-bold">POSITIVE FEEDBACK LOOP</span>
              <span className="bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded">dx/dt = +k &middot; x</span>
            </div>
            <div className="text-sm font-bold text-zinc-950">Amplifies Early Advantage ("Snowball")</div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              <em>Example:</em> Securing a kill in a MOBA grants gold and XP, elevating stats and making subsequent kills easier.
              <strong> Danger:</strong> Unchecked positive feedback creates "Dead Time", where the victor is mathematically determined early but the match continues.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="text-blue-700 font-bold">NEGATIVE FEEDBACK LOOP</span>
              <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">dx/dt = -k &middot; (x - x_set)</span>
            </div>
            <div className="text-sm font-bold text-zinc-950">Stabilizes Equilibrium ("Rubber-Banding")</div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              <em>Example:</em> Trailing players in <em>Mario Kart</em> draw potent items; expanding empires in RTS games incur steep upkeep costs.
              <strong> Danger:</strong> Aggressive negative feedback punishes skillful play.
            </p>
          </div>
        </div>

        {/* Machinations Petri-Net Architecture SVG */}
        <div className="overflow-x-auto border border-zinc-200 bg-zinc-50 rounded-lg p-5">
          <div className="text-xs font-mono text-zinc-600 mb-3 font-semibold">
            FORMAL MACHINATIONS DIAGRAM: Token flow through the 5 canonical primitives
          </div>
          <svg viewBox="0 0 820 185" className="w-full min-w-[640px] h-auto">
            <defs>
              <marker id="arrowFlow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
              <marker id="arrowFeedback" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
            </defs>

            {/* 1. Source */}
            <polygon points="65,60 95,115 35,115" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
            <text x="65" y="138" fill="#047857" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle" fontWeight="bold">
              SOURCE (&Delta;)
            </text>
            <text x="65" y="153" fill="#64748b" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
              Enemy Spawns
            </text>

            <line x1="98" y1="95" x2="188" y2="95" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowFlow)" />
            <text x="143" y="85" fill="#2563eb" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
              +{baseKillGold}g/wave
            </text>

            {/* 2. Pool */}
            <circle cx="230" cy="95" r="34" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
            <text x="230" y="92" fill="#1e40af" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle" fontWeight="bold">
              GOLD POOL
            </text>
            <text x="230" y="107" fill="#64748b" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
              State Queue
            </text>

            <line x1="268" y1="95" x2="365" y2="95" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowFlow)" />
            <text x="316" y="85" fill="#2563eb" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
              55% Invest
            </text>

            {/* 3. Converter */}
            <polygon points="375,65 435,95 375,125" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
            <text x="400" y="145" fill="#6d28d9" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle" fontWeight="bold">
              CONVERTER (&gt;)
            </text>
            <text x="400" y="160" fill="#64748b" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
              Shop Upgrade
            </text>

            <line x1="440" y1="95" x2="530" y2="95" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowFlow)" />

            {/* 4. Power Pool */}
            <circle cx="575" cy="95" r="34" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2" />
            <text x="575" y="92" fill="#0f766e" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle" fontWeight="bold">
              POWER POOL
            </text>
            <text x="575" y="107" fill="#64748b" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
              Combat DPS
            </text>

            {/* Positive Loop */}
            <path d="M 575,58 Q 320,5 85,58" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrowFeedback)" />
            <text x="335" y="25" fill="#b91c1c" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
              + Positive Feedback Loop (Yields +{Math.round(snowballInterest * 100)}% snowball)
            </text>

            <line x1="612" y1="95" x2="705" y2="95" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowFeedback)" />
            <text x="658" y="85" fill="#dc2626" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
              -{Math.round(upkeepDrainRate * 100)}% Tax
            </text>

            {/* 5. Drain */}
            <polygon points="715,70 775,70 745,125" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
            <text x="745" y="145" fill="#b91c1c" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle" fontWeight="bold">
              DRAIN (&nabla;)
            </text>
            <text x="745" y="160" fill="#64748b" fontSize="10" fontFamily="Segoe UI, monospace" textAnchor="middle">
              Upkeep Sink
            </text>
          </svg>
        </div>
      </section>

      {/* Playable Lab 4: Stabilize the Runaway Economy */}
      <section className="border border-zinc-200 bg-white rounded-lg p-5 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-blue-700 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Laboratory 4.1 &bull; Hands-On Experiment</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-950 mt-0.5">
              15-Wave Machinations Simulator: Balance Snowballing vs. Upkeep
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="border border-zinc-200 bg-zinc-50 px-3 py-1.5 rounded text-xs font-mono">
              Equilibrium: <strong className={isBalanced ? 'text-emerald-700' : 'text-amber-700'}>{economyHealthPct}%</strong>
            </div>
            {isLabDone || isBalanced ? (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" /> Economy Stabilized (&ge;80%)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-300 px-3 py-1.5 text-xs font-mono text-amber-900">
                Goal: Tune parameters for &ge;80% Equilibrium
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-zinc-700 leading-relaxed">
          Adjust the 4 parameters below so that <strong>Player Power (Solid Blue)</strong> tracks closely with <strong>Enemy Threat (Dashed Red)</strong> across all 15 waves without runaway snowballing or economic collapse.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-7 border border-zinc-200 bg-zinc-50 rounded-lg p-4 space-y-3">
            <svg viewBox="0 0 530 245" className="w-full h-auto">
              <line x1="55" y1="215" x2="500" y2="215" stroke="#94a3b8" strokeWidth="2" />
              <line x1="55" y1="215" x2="55" y2="25" stroke="#94a3b8" strokeWidth="2" />

              {/* Player Power Curve */}
              <path d={powerPoints} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

              {/* Enemy Threat Curve */}
              <path d={threatPoints} fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6 4" />

              <text x="70" y="42" fill="#2563eb" fontSize="11" fontFamily="Segoe UI, monospace" fontWeight="bold">
                &mdash; Player Combat Power (Pool Output)
              </text>
              <text x="70" y="60" fill="#dc2626" fontSize="11" fontFamily="Segoe UI, monospace" fontWeight="bold">
                -- Enemy Wave Threat Curve
              </text>
              <text x="280" y="238" fill="#64748b" fontSize="11" fontFamily="Segoe UI, monospace" textAnchor="middle">
                Progression Waves (Wave 1 &rarr; Wave 15)
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
                  className="rounded border border-zinc-300 bg-white hover:bg-zinc-50 px-3 py-1.5 text-xs font-medium text-red-700 cursor-pointer shadow-sm"
                >
                  Preset: Runaway Snowball
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
                  className="rounded border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800 cursor-pointer shadow-sm"
                >
                  Preset: Steady Equilibrium
                </button>
              </div>

              {isBalanced && !isLabDone && (
                <button
                  onClick={() => {
                    courseAudio.playSuccess();
                    onCompleteLab();
                  }}
                  className="rounded bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 text-xs font-semibold text-white cursor-pointer shadow-sm"
                >
                  ✓ Commit Balanced Economy
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Source: Base Gold per Wave</span>
                <span className="text-emerald-800 font-bold">{baseKillGold}g</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="2"
                value={baseKillGold}
                onChange={(e) => setBaseKillGold(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Positive Feedback: Compounding Snowball</span>
                <span className="text-red-700 font-bold">{Math.round(snowballInterest * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.50"
                step="0.02"
                value={snowballInterest}
                onChange={(e) => setSnowballInterest(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Negative Drain: Upkeep Tax Sink</span>
                <span className="text-blue-700 font-bold">{Math.round(upkeepDrainRate * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.35"
                step="0.02"
                value={upkeepDrainRate}
                onChange={(e) => setUpkeepDrainRate(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-700">Negative Loop: Threat Rubber-Banding</span>
                <span className="text-amber-700 font-bold">{Math.round(dynamicThreatScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.50"
                step="0.02"
                value={dynamicThreatScale}
                onChange={(e) => setDynamicThreatScale(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4.2: Emergent Systems & Chemistry Matrix */}
      <section className="space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Flame className="h-4 w-4" />
            <span>4.2 Emergent Systems Architecture &mdash; Orthogonal Tag Composition</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-950 mt-1">
            How O(N) Tag Rules Yield O(N&sup2;) Emergent Combinations
          </h2>
        </div>

        <div className="border border-zinc-200 bg-white rounded-lg p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center shadow-sm">
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-mono uppercase text-zinc-600 font-semibold">Select Primary Tag:</div>
            <div className="grid grid-cols-5 gap-1.5">
              {ELEMENTS.map((el) => (
                <button
                  key={`A-${el}`}
                  onClick={() => {
                    courseAudio.playClick(500);
                    setElemA(el);
                  }}
                  className={`py-2 px-1 rounded text-xs font-mono font-medium transition cursor-pointer ${
                    elemA === el
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  {el}
                </button>
              ))}
            </div>

            <div className="text-center text-xs font-mono text-zinc-400 py-0.5">+ INTERACTS WITH +</div>

            <div className="grid grid-cols-5 gap-1.5">
              {ELEMENTS.map((el) => (
                <button
                  key={`B-${el}`}
                  onClick={() => {
                    courseAudio.playClick(620);
                    setElemB(el);
                  }}
                  className={`py-2 px-1 rounded text-xs font-mono font-medium transition cursor-pointer ${
                    elemB === el
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-700 font-bold">
                [{elemA.toUpperCase()}] &times; [{elemB.toUpperCase()}]
              </span>
              <span className="text-[11px] font-mono bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-semibold">
                Decoupled Tag Rule
              </span>
            </div>
            <h3 className="text-base font-bold text-zinc-950">
              {CHEMISTRY_MATRIX[elemA][elemB].title}
            </h3>
            <pre className="rounded bg-zinc-100 border border-zinc-200 p-2.5 text-xs font-mono text-zinc-900 overflow-x-auto">
              {CHEMISTRY_MATRIX[elemA][elemB].rule}
            </pre>
            <p className="text-xs text-zinc-700 leading-relaxed">
              <strong className="text-zinc-950 font-mono">Emergent Behavior:</strong>{' '}
              {CHEMISTRY_MATRIX[elemA][elemB].emergentDynamic}
            </p>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 pt-6 mt-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('module-3')}
            className="inline-flex items-center gap-2 rounded border border-zinc-300 bg-white hover:bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-800 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Module 03</span>
          </button>

          <button
            onClick={() => {
              courseAudio.playSuccess();
              onCompleteModule();
            }}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold transition cursor-pointer ${
              isModuleDone
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                : 'bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isModuleDone ? 'Module 04 Complete' : 'Mark Module 04 Theory Complete'}</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('module-5')}
          className="inline-flex items-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition cursor-pointer"
        >
          <span>Next: Module 05 (Probability, PRD &amp; Automated Telemetry)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
