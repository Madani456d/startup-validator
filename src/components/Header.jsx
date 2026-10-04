import React from 'react';
import { Sparkles, Sliders, FileDown, Bot, ShieldCheck, Zap } from 'lucide-react';

export default function Header({ 
  engineConfig, 
  onOpenSettings, 
  onOpenExport, 
  hasResults, 
  onSelectPreset,
  presets 
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-[1px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-sans">
                Valida<span className="gradient-text">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wide uppercase">
                v2.0 Neural Engine
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400 font-medium">
              Venture Intelligence & Fast Feasibility Scoring
            </p>
          </div>
        </div>

        {/* Action Controls & Engine Indicator */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Engine Mode Pill */}
          <button
            onClick={onOpenSettings}
            title="Click to configure AI Engine & API Keys"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 
              bg-slate-900/80 hover:bg-slate-800/80 border-slate-700/60 text-slate-300 hover:text-white"
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              engineConfig.engine === 'mock' 
                ? 'bg-emerald-400 shadow-sm shadow-emerald-400' 
                : 'bg-cyan-400 shadow-sm shadow-cyan-400'
            }`} />
            <span className="hidden sm:inline text-slate-400">Engine:</span>
            <span className="font-semibold text-slate-200">
              {engineConfig.engine === 'mock' && 'Simulated AI'}
              {engineConfig.engine === 'gemini' && 'Google Gemini'}
              {engineConfig.engine === 'openai' && 'OpenAI GPT'}
            </span>
            <Sliders className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {/* Export Report Button */}
          {hasResults && (
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-700 transition shadow-sm"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export</span>
            </button>
          )}

          {/* Quick Demo Dropdown/Button for First-time visitors */}
          <div className="relative group">
            <button
              type="button"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quick Examples</span>
            </button>
            <div className="absolute right-0 top-full mt-1.5 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block transition-all z-50">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Load Sample Pitch
              </div>
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPreset(p)}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-emerald-400 transition flex items-center justify-between"
                >
                  <span className="font-medium truncate">{p.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase">{p.industry.replace('_', ' ')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
