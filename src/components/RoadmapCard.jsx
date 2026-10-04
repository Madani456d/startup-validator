import React, { useState } from 'react';
import { Milestone, CheckCircle2, Circle, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function RoadmapCard({ roadmap, onTaskToggle }) {
  // Local state for checking tasks if parent doesn't provide
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (phaseIdx, taskIdx) => {
    const key = `${phaseIdx}-${taskIdx}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalTasks = roadmap.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const totalCompleted = Object.values(completedTasks).filter(Boolean).length;
  const progressPct = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/80 shadow-2xl space-y-6">
      {/* Header with Milestones Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Milestone className="w-4 h-4" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Actionable 90-Day Founder Execution Roadmap
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Step-by-step milestones to de-risk market assumptions and reach sustainable monetization.
          </p>
        </div>

        {/* Milestone tracker */}
        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Roadmap Progress
            </div>
            <div className="text-sm font-black text-emerald-400 font-mono">
              {totalCompleted} of {totalTasks} Completed
            </div>
          </div>
          <div className="w-12 h-12 flex items-center justify-center relative">
            <div className="text-xs font-black font-mono text-slate-200">
              {progressPct}%
            </div>
          </div>
        </div>
      </div>

      {/* 3 Phases Grid / Vertical Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {roadmap.map((phase, pIdx) => {
          const phaseColor = pIdx === 0 ? 'emerald' : pIdx === 1 ? 'teal' : 'cyan';
          
          return (
            <div
              key={pIdx}
              className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-md"
            >
              <div>
                {/* Phase Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                    pIdx === 0
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : pIdx === 1
                      ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                      : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                  }`}>
                    Phase 0{pIdx + 1}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {phase.timeline}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-1">
                  {phase.phase.replace(/^Phase \d+:\s*/, '')}
                </h4>

                <p className="text-xs text-slate-400 mt-1 pb-4 border-b border-slate-800/60 leading-relaxed">
                  {phase.objective}
                </p>

                {/* Tasks Checklist */}
                <div className="mt-4 space-y-3">
                  {phase.tasks.map((task, tIdx) => {
                    const isChecked = !!completedTasks[`${pIdx}-${tIdx}`];
                    return (
                      <div
                        key={tIdx}
                        onClick={() => toggleTask(pIdx, tIdx)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                          isChecked
                            ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-400 line-through'
                            : 'bg-slate-950/40 border-slate-800/60 text-slate-200 hover:border-slate-700 hover:bg-slate-950/70'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 flex-shrink-0 text-slate-500 hover:text-emerald-400 transition"
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                          )}
                        </button>
                        <div className="flex-1">
                          <span className={`font-semibold block ${isChecked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                            {task.title}
                          </span>
                          <span className="text-[11px] text-slate-400 block mt-0.5 leading-relaxed">
                            {task.detail}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Target Outcome */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-400">Exit Criteria:</span>
                <span className="text-slate-200 font-medium">3 Target Deliverables</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
