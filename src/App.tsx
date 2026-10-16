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
  BookOpen,
  CheckCircle2,
  Volume2,
  VolumeX,
  Menu,
  X,
  ChevronRight,
  Bookmark
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

  const coreModuleIds: PageId[] = ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'];
  const doneTheoryCount = coreModuleIds.filter((id) => completedModules[id]).length;
  const doneLabCount = coreModuleIds.filter((id) => completedLabs[id]).length;
  const completedHours = (doneTheoryCount * 1.2 + doneLabCount * 0.8).toFixed(1);
  const progressPercent = Math.round(((doneTheoryCount + doneLabCount) / 10) * 100);

  const activeModuleMeta = COURSE_MODULES.find((m) => m.id === activePage);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* MSDN / Docs Top Global Bar */}
      <header className="border-b border-zinc-200 bg-zinc-50/90 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/70 rounded"
              aria-label="Toggle Table of Contents"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div
              onClick={() => handleNavigate('overview')}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-6 h-6 bg-blue-700 text-white rounded flex items-center justify-center font-bold text-xs">
                M
              </div>
              <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-900">
                Game Mechanics &amp; Systems Architecture
              </span>
              <span className="hidden sm:inline-block text-xs text-zinc-500 font-mono pl-1 border-l border-zinc-300">
                Technical Reference &amp; Course
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-600">
              <span>Progress:</span>
              <span className="font-semibold text-zinc-900">{completedHours} / 10.0 hrs</span>
              <div className="w-16 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={toggleSound}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-zinc-300 hover:bg-zinc-100 rounded text-zinc-700 cursor-pointer"
              title="Toggle Interactive Audio"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-zinc-700" />
                  <span className="hidden md:inline">Audio On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="hidden md:inline">Muted</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Breadcrumb row */}
        <div className="border-t border-zinc-200 bg-white px-4 sm:px-6 py-1.5 text-xs text-zinc-500 flex items-center gap-1.5 max-w-7xl mx-auto">
          <button
            onClick={() => handleNavigate('overview')}
            className="hover:text-blue-700 cursor-pointer"
          >
            Course
          </button>
          <ChevronRight className="h-3 w-3 text-zinc-400" />
          <span className="text-zinc-800 font-medium">
            {activeModuleMeta?.code}: {activeModuleMeta?.title}
          </span>
        </div>
      </header>

      {/* Two-Column Documentation Book Layout */}
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col lg:flex-row">
        {/* Table of Contents (Left Sidebar) */}
        <aside
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } lg:block w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-200 bg-zinc-50/50 p-4 space-y-1 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto text-sm`}
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 px-2 py-1.5 flex items-center justify-between">
            <span>Table of Contents</span>
            <Bookmark className="h-3.5 w-3.5 text-zinc-400" />
          </div>

          <nav className="space-y-0.5">
            {COURSE_MODULES.map((mod) => {
              const isActive = activePage === mod.id;
              const isDone = !!completedModules[mod.id];

              return (
                <button
                  key={mod.id}
                  onClick={() => handleNavigate(mod.id)}
                  className={`w-full text-left px-2.5 py-2 rounded text-xs leading-normal transition cursor-pointer flex items-start gap-2 ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 font-semibold border-l-2 border-blue-700'
                      : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <span className="shrink-0 font-mono text-[11px] text-zinc-400 pt-0.5">
                    {mod.id === 'overview' ? '00' : mod.code.replace('MODULE ', '0').replace('REFERENCE', 'REF')}
                  </span>
                  <div className="flex-1">
                    <div>{mod.title}</div>
                    <div className="text-[11px] text-zinc-400 font-mono font-normal">
                      {mod.hours}
                    </div>
                  </div>
                  {isDone && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-zinc-200 mt-4 px-2">
            <div className="text-[11px] font-semibold text-zinc-600 uppercase mb-1">
              Active Chapter Axiom
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed italic bg-white p-2.5 rounded border border-zinc-200">
              "{activeModuleMeta?.keyTakeaway}"
            </p>
          </div>
        </aside>

        {/* Main Document Body */}
        <main className="flex-1 p-6 sm:p-10 lg:p-12 min-w-0 max-w-4xl bg-white">
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

      {/* Clean Technical Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            Game Mechanics &amp; Systems Architecture • Academic Reference for Computer Scientists
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleNavigate('overview')}
              className="hover:text-zinc-800 cursor-pointer"
            >
              Syllabus
            </button>
            <button
              onClick={() => handleNavigate('rosetta-library')}
              className="hover:text-zinc-800 cursor-pointer"
            >
              Rosetta Stone
            </button>
            <span>MIT / Stanford / USC Literature Synthesis</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
