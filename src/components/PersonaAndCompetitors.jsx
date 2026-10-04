import React from 'react';
import { 
  UserCheck, 
  Target, 
  DollarSign, 
  Share2, 
  Swords, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  Zap
} from 'lucide-react';

export default function PersonaAndCompetitors({ persona, competitorLandscape }) {
  const { role, archetype, painPoint, willingnessToPay, channels = [] } = persona || {};
  const { competitors = [], ourUnfairAdvantage = "", defensibilityLevel = "Moderate" } = competitorLandscape || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left 5 Cols: Ideal Customer Profile (ICP) Card */}
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Target Customer Persona
                </h3>
                <span className="text-[11px] text-slate-400">
                  Ideal Beachhead Buyer
                </span>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {archetype || 'Primary Buyer'}
            </span>
          </div>

          {/* Persona Title Callout */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Job Title / Archetype
            </span>
            <span className="text-sm font-extrabold text-slate-100 mt-0.5 block">
              {role || 'Enterprise Decision Maker'}
            </span>
          </div>

          {/* Pain Point Quote */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/20 border border-slate-800/90 relative">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1 mb-1">
              <AlertCircle className="w-3 h-3" />
              Acute Burning Pain Point
            </span>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{painPoint || 'Manual bottlenecks and high operational overhead with existing legacy tools.'}"
            </p>
          </div>

          {/* Willingness to Pay */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-300">
                Willingness to Pay
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              {willingnessToPay || '$99 - $499 / mo'}
            </span>
          </div>
        </div>

        {/* Discovery & Acquisition Channels */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            Top High-Intent Acquisition Channels
          </span>
          <div className="flex flex-wrap gap-1.5">
            {channels.map((ch, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right 7 Cols: Competitor Matrix & Unfair Advantage */}
      <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Competitive Landscape & Alternatives
                </h3>
                <span className="text-[11px] text-slate-400">
                  Incumbent gaps and market white space
                </span>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-slate-800 text-slate-300 border border-slate-700">
              {defensibilityLevel}
            </span>
          </div>

          {/* Competitor List */}
          <div className="mt-4 space-y-3">
            {competitors.map((comp, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-200">
                    {comp.name}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800/60 max-w-sm">
                  <span className="text-rose-400 font-semibold text-[10px] uppercase tracking-wider flex-shrink-0">
                    Vulnerability:
                  </span>
                  <span className="truncate">{comp.flaw}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Startup's Unfair Advantage / Moat Banner */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/40 shadow-lg">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Our Startup's Unfair Advantage & Wedge Moat
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
            {ourUnfairAdvantage}
          </p>
        </div>
      </div>
    </div>
  );
}
