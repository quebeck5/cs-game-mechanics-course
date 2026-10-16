import React, { useState, useEffect } from 'react';
import { COURSE_MODULES, PageId } from './data/courseData';
import { OverviewPage } from './modules/OverviewPage';
import { Module1MDA } from './modules/Module1MDA';
import { Module2GameFeel } from './modules/Module2GameFeel';
import { Module3DecisionsSpace } from './modules/Module3DecisionsSpace';
import { Module4SystemsEconomy } from './modules/Module4SystemsEconomy';
import { Module5ProbabilityBalance } from './modules/Module5ProbabilityBalance';
import { RosettaLibraryPage } from './modules/RosettaLibraryPage';
import { courseAudio } from './audio/soundEngine';
import {
  Terminal,
  CheckCircle2,
  Sparkles,
  Volume2,
  VolumeX,
  Menu,
  X,
  Clock,
  BookOpen
} from 'lucide-react';

const STORAGE_KEY_MODULES = 'cs404_completed_modules_v1';
const STORAGE_KEY_LABS = 'cs404_completed_labs_v1';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('overview');
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MODULES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [completedLabs, setCompletedLabs] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LABS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MODULES, JSON.stringify(completedModules));
    } catch {}
  }, [completedModules]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LABS, JSON.stringify(completedLabs));
    } catch {}
  }, [completedLabs]);

  const handleNavigate = (page: PageId) => {
    courseAudio.playClick(500);
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markModuleDone = (id: PageId) => {
    setCompletedModules((prev) => ({ ...prev, [id]: true }));
  };

  const markLabDone = (id: PageId) => {
    setCompletedLabs((prev) => ({ ...prev, [id]: true }));
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    courseAudio.enabled = next;
  };

  // Calculate 10-hour progress
  const coreModuleIds: PageId[] = ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'];
  const doneTheoryCount = coreModuleIds.filter((id) => completedModules[id]).length;
  const doneLabCount = coreModuleIds.filter((id) => completedLabs[id]).length;
  const completedHours = (doneTheoryCount * 1.2 + doneLabCount * 0.8).toFixed(1);
  const progressPercent = Math.round(((doneTheoryCount + doneLabCount) / 10) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div
              onClick={() => handleNavigate('overview')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Terminal className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
                  CS-404 • 10-HOUR COURSE
                </div>
                <div className="text-sm font-bold text-white leading-tight">
                  Engineering "Fun": Game Mechanics for CS Grads
                </div>
              </div>
            </div>
          </div>

          {/* Right Progress & Audio Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-1.5">
              <Clock className="h-4 w-4 text-cyan-400" />
              <div className="text-xs font-mono">
                <span className="text-slate-400">Course Progress: </span>
                <strong className="text-white">{completedHours} / 10.0 hrs</strong>
                <span className="ml-2 text-emerald-400">({progressPercent}%)</span>
              </div>
              <div className="w-20 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={toggleSound}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 px-3 py-2 text-xs font-mono text-slate-300 cursor-pointer"
              title="Toggle Synthesized Lab Audio"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="h-4 w-4 text-emerald-400" />
                  <span className="hidden md:inline">Synth Audio: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 text-slate-500" />
                  <span className="hidden md:inline">Muted</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col lg:flex-row">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } lg:block w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800/90 bg-slate-950/60 p-4 space-y-2 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto`}
        >
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2 pb-1">
            Curriculum Modules (10 Hours)
          </div>

          {COURSE_MODULES.map((mod) => {
            const isActive = activePage === mod.id;
            const isModDone = !!completedModules[mod.id];
            const isLabDone = !!completedLabs[mod.id];

            return (
              <button
                key={mod.id}
                onClick={() => handleNavigate(mod.id)}
                className={`w-full text-left rounded-xl p-3 transition cursor-pointer border ${
                  isActive
                    ? 'bg-indigo-950/50 border-indigo-500/60 shadow-md'
                    : 'bg-slate-900/40 border-slate-800/70 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gradient-to-r ${mod.badgeColor} text-white`}
                  >
                    {mod.code}
                  </span>
                  <div className="flex items-center gap-1">
                    {isModDone && (
                      <span title="Theory Completed">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      </span>
                    )}
                    {isLabDone && (
                      <span title="Playable Lab Completed">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      </span>
                    )}
                  </div>
                </div>

                <div className={`text-xs font-bold leading-snug ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {mod.title}
                </div>

                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  {mod.hours}
                </div>
              </button>
            );
          })}

          {/* Key Takeaway Box for Current Module */}
          <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-3.5 space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-indigo-400 font-bold flex items-center gap-1">
              <BookOpen className="h-3 w-3" /> Active Module Axiom
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {COURSE_MODULES.find((m) => m.id === activePage)?.keyTakeaway}
            </p>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 min-w-0">
          {activePage === 'overview' && (
            <OverviewPage
              onNavigate={handleNavigate}
              completedModules={completedModules}
              completedLabs={completedLabs}
            />
          )}

          {activePage === 'module-1' && (
            <Module1MDA
              onNavigate={handleNavigate}
              onCompleteModule={() => markModuleDone('module-1')}
              onCompleteLab={() => markLabDone('module-1')}
              isModuleDone={!!completedModules['module-1']}
              isLabDone={!!completedLabs['module-1']}
            />
          )}

          {activePage === 'module-2' && (
            <Module2GameFeel
              onNavigate={handleNavigate}
              onCompleteModule={() => markModuleDone('module-2')}
              onCompleteLab={() => markLabDone('module-2')}
              isModuleDone={!!completedModules['module-2']}
              isLabDone={!!completedLabs['module-2']}
            />
          )}

          {activePage === 'module-3' && (
            <Module3DecisionsSpace
              onNavigate={handleNavigate}
              onCompleteModule={() => markModuleDone('module-3')}
              onCompleteLab={() => markLabDone('module-3')}
              isModuleDone={!!completedModules['module-3']}
              isLabDone={!!completedLabs['module-3']}
            />
          )}

          {activePage === 'module-4' && (
            <Module4SystemsEconomy
              onNavigate={handleNavigate}
              onCompleteModule={() => markModuleDone('module-4')}
              onCompleteLab={() => markLabDone('module-4')}
              isModuleDone={!!completedModules['module-4']}
              isLabDone={!!completedLabs['module-4']}
            />
          )}

          {activePage === 'module-5' && (
            <Module5ProbabilityBalance
              onNavigate={handleNavigate}
              onCompleteModule={() => markModuleDone('module-5')}
              onCompleteLab={() => markLabDone('module-5')}
              isModuleDone={!!completedModules['module-5']}
              isLabDone={!!completedLabs['module-5']}
            />
          )}

          {activePage === 'rosetta-library' && (
            <RosettaLibraryPage
              onNavigate={handleNavigate}
              completedModules={completedModules}
              completedLabs={completedLabs}
            />
          )}
        </main>
      </div>
    </div>
  );
};
