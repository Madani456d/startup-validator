import React from 'react';
import { BarChart3, Target, Layers, Cpu, Milestone, CheckCircle2 } from 'lucide-react';
import { STEPS_CONFIG } from '../services/validationService';

const STEP_ICONS = {
  market: BarChart3,
  competition: Target,
  swot: Layers,
  scoring: Cpu,
  roadmap: Milestone
};

export default function ValidationProgress({ currentStepIndex, totalSteps }) {
  const percentage = Math.min(100, Math.round(((currentStepIndex + 1) / totalSteps) * 100));

  return (
    <div className="glass-panel-glow rounded-2xl p-6 my-6 border border-emerald-500/30 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            Neural Evaluation In Progress
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            {STEPS_CONFIG[currentStepIndex]?.text || "Processing startup signals..."}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-emerald-400 font-mono">
            {percentage}%
          </span>
          <span className="text-xs text-slate-400 block font-medium">Completed</span>
        </div>
      </div>

      {/* Main Animated Progress Bar */}
      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500 ease-out shadow-sm shadow-emerald-400"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5">
        {STEPS_CONFIG.map((step, idx) => {
          const Icon = STEP_ICONS[step.id] || Cpu;
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step.id}
              className={`p-2.5 rounded-xl border text-xs transition-all flex items-center gap-2 ${
                isDone 
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : isCurrent
                  ? 'bg-slate-800/90 border-emerald-400 text-white shadow-md shadow-emerald-500/20 animate-pulse-subtle'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-500'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <Icon className={`w-4 h-4 flex-shrink-0 ${isCurrent ? 'text-emerald-400 animate-spin-slow' : 'text-slate-600'}`} />
              )}
              <span className="truncate font-medium text-[11px]">
                {step.id === 'market' && 'Market TAM'}
                {step.id === 'competition' && 'Competitors'}
                {step.id === 'swot' && 'SWOT Matrix'}
                {step.id === 'scoring' && 'Viability Math'}
                {step.id === 'roadmap' && 'Roadmap'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
