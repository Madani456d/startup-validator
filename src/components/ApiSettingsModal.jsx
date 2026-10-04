import React, { useState } from 'react';
import { X, Key, Cpu, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { saveApiConfig } from '../services/validationService';

export default function ApiSettingsModal({ isOpen, onClose, currentConfig, onSaveConfig }) {
  if (!isOpen) return null;

  const [engine, setEngine] = useState(currentConfig.engine || 'mock');
  const [geminiKey, setGeminiKey] = useState(currentConfig.geminiKey || '');
  const [openaiKey, setOpenaiKey] = useState(currentConfig.openaiKey || '');
  const [geminiModel, setGeminiModel] = useState(currentConfig.geminiModel || 'gemini-1.5-flash');
  const [openaiModel, setOpenaiModel] = useState(currentConfig.openaiModel || 'gpt-4o-mini');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const newConfig = {
      engine,
      geminiKey: geminiKey.trim(),
      openaiKey: openaiKey.trim(),
      geminiModel,
      openaiModel
    };
    saveApiConfig(newConfig);
    onSaveConfig(newConfig);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Intelligence Engine Configuration
              </h3>
              <p className="text-xs text-slate-400">
                Choose between instant offline simulation or live LLM synthesis.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Engine Selector Segmented Control */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Select Evaluation Engine
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setEngine('mock')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                  engine === 'mock'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Offline Sim</span>
              </button>

              <button
                type="button"
                onClick={() => setEngine('gemini')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                  engine === 'gemini'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Google Gemini</span>
              </button>

              <button
                type="button"
                onClick={() => setEngine('openai')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                  engine === 'openai'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>OpenAI</span>
              </button>
            </div>
          </div>

          {/* Engine Specific Options */}
          {engine === 'mock' ? (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero-Latency Offline Simulation Ready</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Produces rich, realistic venture intelligence benchmarks using heuristic scoring algorithms and industry databases. No API keys or external calls needed.
              </p>
            </div>
          ) : engine === 'gemini' ? (
            <div className="space-y-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Google Gemini API Key
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    required={engine === 'gemini'}
                    className="w-full pl-3 pr-10 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-200"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Model Variant
                </label>
                <select
                  value={geminiModel}
                  onChange={(e) => setGeminiModel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Ultra fast & efficient)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep complex analysis)</option>
                  <option value="gemini-2.0-flash">Gemini 2.0 Flash (Next-gen)</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  OpenAI API Key
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    placeholder="sk-proj-..."
                    required={engine === 'openai'}
                    className="w-full pl-3 pr-10 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-xs focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-200"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Model Variant
                </label>
                <select
                  value={openaiModel}
                  onChange={(e) => setOpenaiModel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:ring-1 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="gpt-4o-mini">GPT-4o Mini (Optimal balance)</option>
                  <option value="gpt-4o">GPT-4o (Full flagship)</option>
                </select>
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              Privacy Guarantee: Keys are strictly persisted inside your browser's local storage and dispatched directly to the API provider. No proxy backend records your tokens.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
