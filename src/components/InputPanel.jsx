import React, { useState } from 'react';
import { 
  Rocket, 
  Sparkles, 
  RotateCcw, 
  Bot, 
  Coins, 
  Activity, 
  GraduationCap, 
  ShoppingCart, 
  Code, 
  Leaf, 
  ChevronDown, 
  ChevronUp,
  Target,
  DollarSign,
  Lightbulb
} from 'lucide-react';
import { INDUSTRIES, PRESET_STARTUPS } from '../services/validationService';

const ICON_MAP = {
  Bot,
  Coins,
  Activity,
  GraduationCap,
  ShoppingCart,
  Code,
  Leaf
};

export default function InputPanel({ 
  formData, 
  setFormData, 
  onValidate, 
  isValidating,
  onReset 
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyPreset = (preset) => {
    setFormData({
      name: preset.name,
      pitch: preset.pitch,
      industry: preset.industry,
      targetAudience: preset.targetAudience,
      monetization: preset.monetization
    });
  };

  const isFormValid = formData.name.trim().length >= 2 && formData.pitch.trim().length >= 10;

  return (
    <section className="glass-panel rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800/80 transition-all">
      {/* Panel Title & Quick Preset Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/60">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Rocket className="w-4 h-4" />
            </span>
            Startup Concept Evaluation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Enter your concept parameters to simulate comprehensive venture viability analysis.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Try:
          </span>
          {PRESET_STARTUPS.slice(0, 3).map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-emerald-300 border border-slate-700/60 whitespace-nowrap transition-all text-left"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); if (isFormValid) onValidate(); }} className="mt-5 space-y-5">
        {/* Row 1: Startup Name & Industry Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Startup Name <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g. Omnisync, DocuSense AI, CleanVolt"
              className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/80 transition text-sm font-medium"
            />
          </div>

          {/* Industry Selection Grid */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Industry Domain <span className="text-emerald-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {INDUSTRIES.map((ind) => {
                const IconComponent = ICON_MAP[ind.icon] || Bot;
                const isSelected = formData.industry === ind.id;
                return (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => handleInputChange('industry', ind.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-200 group relative ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900/60 border-slate-800/90 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 mb-1 transition-transform group-hover:scale-110 ${
                      isSelected ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`} />
                    <span className="text-xs font-semibold truncate w-full">{ind.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pitch / 1-2 sentence description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              1-2 Sentence Pitch & Problem Statement <span className="text-emerald-400">*</span>
            </label>
            <span className="text-[11px] text-slate-500">
              {formData.pitch.length} characters
            </span>
          </div>
          <textarea
            required
            rows={3}
            value={formData.pitch}
            onChange={(e) => handleInputChange('pitch', e.target.value)}
            placeholder="Explain what the product does, who it is for, and why the current alternative is broken. (e.g. Automated legal contract auditor that flags non-standard liability clauses and regulatory GDPR risks in seconds for mid-market CFOs)."
            className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/80 transition text-sm font-medium resize-none leading-relaxed"
          />
        </div>

        {/* Optional Collapsible Advanced Details */}
        <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/40">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-medium text-slate-400 hover:text-slate-200 transition"
          >
            <span className="flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              Advanced Market Precision Inputs (Optional)
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showAdvanced && (
            <div className="p-4 pt-1 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Target className="w-3 h-3 text-cyan-400" />
                  Target Customer Segment
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  placeholder="e.g. Mid-market CFOs, Global Freelancers"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" />
                  Monetization / Pricing Model
                </label>
                <input
                  type="text"
                  value={formData.monetization}
                  onChange={(e) => handleInputChange('monetization', e.target.value)}
                  placeholder="e.g. $199/month B2B SaaS, 1% transaction fee"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              className="text-xs px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Inputs
            </button>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isValidating}
            className={`w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg ${
              isFormValid && !isValidating
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
            }`}
          >
            {isValidating ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Simulating Intelligence...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-slate-950/20" />
                <span>Instant Validate</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
