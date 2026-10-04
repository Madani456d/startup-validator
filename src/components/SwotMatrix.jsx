import React from 'react';
import { ShieldCheck, AlertTriangle, TrendingUp, ShieldAlert, Check } from 'lucide-react';

export default function SwotMatrix({ swot }) {
  const { strengths = [], weaknesses = [], opportunities = [], threats = [] } = swot;

  const quadrants = [
    {
      title: 'Strengths (Internal)',
      subtitle: 'Core capabilities & unfair leverage',
      icon: ShieldCheck,
      items: strengths,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      headerBg: 'from-emerald-950/30 to-slate-900/60',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    {
      title: 'Weaknesses (Internal)',
      subtitle: 'Resource deficits & early bottlenecks',
      icon: AlertTriangle,
      items: weaknesses,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      headerBg: 'from-amber-950/30 to-slate-900/60',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    {
      title: 'Opportunities (External)',
      subtitle: 'Market tailwinds & expansion wedges',
      icon: TrendingUp,
      items: opportunities,
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      tagColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      headerBg: 'from-cyan-950/30 to-slate-900/60',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    {
      title: 'Threats (External)',
      subtitle: 'Incumbent reactions & platform risks',
      icon: ShieldAlert,
      items: threats,
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      tagColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      headerBg: 'from-rose-950/30 to-slate-900/60',
      borderColor: 'border-rose-500/30',
      iconColor: 'text-rose-400'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Strategic SWOT Matrix
          </h3>
          <p className="text-xs text-slate-400">
            Internal capabilities versus external market forces synthesized from venture data.
          </p>
        </div>
      </div>

      {/* 4 Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map((quad, qIdx) => {
          const Icon = quad.icon;
          return (
            <div
              key={qIdx}
              className={`rounded-2xl border ${quad.borderColor} bg-slate-900/70 overflow-hidden shadow-lg flex flex-col justify-between transition-all hover:border-slate-600/60`}
            >
              {/* Card Header */}
              <div className={`p-4 bg-gradient-to-r ${quad.headerBg} border-b border-slate-800/80 flex items-center justify-between`}>
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${quad.badgeColor} border`}>
                    <Icon className={`w-4 h-4 ${quad.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {quad.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {quad.subtitle}
                    </p>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${quad.badgeColor}`}>
                  {quad.items.length} Points
                </span>
              </div>

              {/* Items List */}
              <div className="p-4 space-y-3 flex-1">
                {quad.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/50 text-xs text-slate-300 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p>{item.text}</p>
                    </div>
                    {item.impact && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex-shrink-0 border ${quad.tagColor}`}>
                        {item.impact}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
