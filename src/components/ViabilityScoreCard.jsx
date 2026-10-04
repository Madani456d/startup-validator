import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  HelpCircle, 
  DollarSign, 
  Globe, 
  Scale, 
  Sparkles,
  Award
} from 'lucide-react';

export default function ViabilityScoreCard({ report }) {
  const { overallScore, verdict, metrics, marketContext, startupName, industryLabel } = report;

  // Compute SVG circle stroke offset
  // Radius = 56, Circumference = 2 * Math.PI * 56 ≈ 351.85
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  // Determine badge styling
  const isHigh = overallScore >= 80;
  const isMid = overallScore >= 70 && overallScore < 80;

  const scoreGradient = isHigh
    ? 'from-emerald-500 to-teal-400'
    : isMid
    ? 'from-blue-500 to-cyan-400'
    : 'from-amber-500 to-orange-400';

  const badgeColor = isHigh
    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    : isMid
    ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    : 'bg-amber-500/15 text-amber-400 border-amber-500/30';

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/80 shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-20 ${
        isHigh ? 'bg-emerald-500' : isMid ? 'bg-blue-500' : 'bg-amber-500'
      }`} />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Venture Intelligence Report
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {industryLabel}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {startupName}
          </h2>
        </div>

        {/* Verdict Badge */}
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 shadow-sm ${badgeColor}`}>
            <Award className="w-4 h-4" />
            <span>{verdict.tier}</span>
          </div>
        </div>
      </div>

      {/* Score and Core Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-7">
        {/* Left: Viability Score Circular Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 relative">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Radial Gauge */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 130 130">
              {/* Background ring */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="11"
                fill="transparent"
              />
              {/* Foreground progress ring */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="transition-all duration-1000 ease-out"
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke={`url(#scoreGradient-${overallScore})`}
                fill="transparent"
              />
              <defs>
                <linearGradient id={`scoreGradient-${overallScore}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isHigh ? '#10b981' : isMid ? '#3b82f6' : '#f59e0b'} />
                  <stop offset="100%" stopColor={isHigh ? '#2dd4bf' : isMid ? '#06b6d4' : '#fb923c'} />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner text score */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tighter">
                {overallScore}
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                OUT OF 100
              </span>
            </div>
          </div>

          <div className="mt-4 text-center px-4">
            <h4 className="text-sm font-bold text-slate-200">
              Composite Viability Index
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
              {verdict.summary}
            </p>
          </div>
        </div>

        {/* Right: Sub-Metrics Breakdown Bars */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Diagnostic Pillar Breakdown
            </h4>
            <span className="text-xs text-slate-500 font-medium">Weighted Signals</span>
          </div>

          {metrics.map((metric, idx) => (
            <div key={idx} className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-200 block">
                    {metric.label}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {metric.description}
                  </span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium border border-slate-700/60">
                    {metric.benchmark}
                  </span>
                  <span className="text-sm font-black font-mono text-emerald-400 min-w-[2.5rem] text-right">
                    {metric.score}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${metric.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Context Signals Strip */}
      <div className="mt-2 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/70">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Estimated TAM & CAGR
            </span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">
              {marketContext.tam}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/70">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Regulatory & Barrier Level
            </span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">
              {marketContext.regulatoryRisk}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/70">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Target Pricing / Monetization
            </span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block truncate">
              {marketContext.suggestedPricing}
            </span>
          </div>
        </div>
      </div>

      {/* Founder Verdict Box */}
      <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 flex-shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Venture Analyst Recommendation
          </span>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 leading-relaxed">
            {verdict.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
