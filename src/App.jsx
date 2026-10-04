import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ValidationProgress from './components/ValidationProgress';
import ViabilityScoreCard from './components/ViabilityScoreCard';
import SwotMatrix from './components/SwotMatrix';
import PersonaAndCompetitors from './components/PersonaAndCompetitors';
import RoadmapCard from './components/RoadmapCard';
import ApiSettingsModal from './components/ApiSettingsModal';
import ExportModal from './components/ExportModal';
import { 
  validateStartup, 
  getApiConfig, 
  PRESET_STARTUPS, 
  generateContextualMockReport 
} from './services/validationService';
import { Sparkles, AlertCircle, RefreshCw, Layers, Compass, CheckCircle } from 'lucide-react';

export default function App() {
  // App State
  const [formData, setFormData] = useState({
    name: 'DocuSense AI',
    pitch: 'Automated legal contract auditor that flags non-standard liability clauses, missing indemnities, and regulatory GDPR/SOC2 compliance risks in seconds for mid-market CFOs.',
    industry: 'ai_saas',
    targetAudience: 'B2B Mid-Market Legal & Finance teams',
    monetization: 'Monthly Tiered Subscription ($199 - $899/mo)'
  });

  const [isValidating, setIsValidating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [totalSteps, setTotalSteps] = useState(5);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'swot' | 'market' | 'roadmap'
  const [apiConfig, setApiConfig] = useState(getApiConfig());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Generate initial report on first load for instant delight!
  useEffect(() => {
    const initialReport = generateContextualMockReport(formData);
    setReport(initialReport);
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleValidate = async () => {
    setIsValidating(true);
    setCurrentStepIndex(0);
    setNotification(null);

    try {
      const response = await validateStartup(formData, (step, index, total) => {
        setCurrentStepIndex(index);
        setTotalSteps(total);
      });

      setReport(response.result);

      if (response.source === 'mock_fallback') {
        setNotification({
          type: 'warning',
          message: 'Live API returned an error; smoothly switched to Intelligent Neural Simulator.'
        });
      }

      if (response.result.overallScore >= 80) {
        triggerConfetti();
      }

      // Smooth scroll to results
      setTimeout(() => {
        const resultsEl = document.getElementById('results-viewport');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      console.error(err);
      setNotification({
        type: 'error',
        message: `Validation failed: ${err.message}`
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSelectPreset = (preset) => {
    setFormData({
      name: preset.name,
      pitch: preset.pitch,
      industry: preset.industry,
      targetAudience: preset.targetAudience,
      monetization: preset.monetization
    });
    setNotification({
      type: 'info',
      message: `Loaded template: "${preset.name}". Click 'Instant Validate' to analyze!`
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      pitch: '',
      industry: 'ai_saas',
      targetAudience: '',
      monetization: ''
    });
    setReport(null);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Sticky Header */}
      <Header
        engineConfig={apiConfig}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        hasResults={!!report}
        onSelectPreset={handleSelectPreset}
        presets={PRESET_STARTUPS}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Toast / Notification Banner */}
        {notification && (
          <div className={`p-3.5 rounded-xl text-xs flex items-center justify-between border transition-all ${
            notification.type === 'error'
              ? 'bg-rose-950/60 border-rose-500/40 text-rose-200'
              : notification.type === 'warning'
              ? 'bg-amber-950/60 border-amber-500/40 text-amber-200'
              : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
          }`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-xs opacity-70 hover:opacity-100 font-bold ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Hero Pitch & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Config AI Venture Intelligence Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Validate Startup Ideas <br />
            <span className="gradient-text">Before Writing A Line Of Code</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Instant viability scoring, 4-quadrant SWOT matrix, customer persona profiling, competitor flaw mapping, and actionable 90-day execution roadmap.
          </p>
        </div>

        {/* Input Panel */}
        <InputPanel
          formData={formData}
          setFormData={setFormData}
          onValidate={handleValidate}
          isValidating={isValidating}
          onReset={handleReset}
        />

        {/* Multi-Step Animated Progress Loader */}
        {isValidating && (
          <ValidationProgress
            currentStepIndex={currentStepIndex}
            totalSteps={totalSteps}
          />
        )}

        {/* Results Viewport */}
        {report && !isValidating && (
          <div id="results-viewport" className="space-y-8 pt-4">
            {/* View Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Viability & Breakdown</span>
                </button>

                <button
                  onClick={() => setActiveTab('swot')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'swot'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>SWOT Analysis</span>
                </button>

                <button
                  onClick={() => setActiveTab('market')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'market'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Persona & Competitors</span>
                </button>

                <button
                  onClick={() => setActiveTab('roadmap')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'roadmap'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Founder Roadmap</span>
                </button>
              </div>

              <div className="hidden sm:block text-xs text-slate-500">
                Score: <span className="font-mono font-bold text-emerald-400">{report.overallScore}/100</span>
              </div>
            </div>

            {/* Tab Views */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <ViabilityScoreCard report={report} />
                <SwotMatrix swot={report.swot} />
                <PersonaAndCompetitors 
                  persona={report.targetPersona} 
                  competitorLandscape={report.competitorLandscape} 
                />
                <RoadmapCard roadmap={report.executionRoadmap} />
              </div>
            )}

            {activeTab === 'swot' && (
              <div className="animate-in fade-in duration-300">
                <SwotMatrix swot={report.swot} />
              </div>
            )}

            {activeTab === 'market' && (
              <div className="animate-in fade-in duration-300">
                <PersonaAndCompetitors 
                  persona={report.targetPersona} 
                  competitorLandscape={report.competitorLandscape} 
                />
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className="animate-in fade-in duration-300">
                <RoadmapCard roadmap={report.executionRoadmap} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060910] py-8 text-center text-xs text-slate-500 space-y-2 mt-12">
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <span className="font-semibold text-slate-300">ValidaAI Platform</span>
          <span>•</span>
          <span>Instant Market Intelligence & Feasibility Simulation</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Built with React 18, Vite, Tailwind CSS, and LLM Service Layer. Powered by heuristic neural modeling.
        </p>
      </footer>

      {/* Modals */}
      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentConfig={apiConfig}
        onSaveConfig={(newConfig) => setApiConfig(newConfig)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        report={report}
      />
    </div>
  );
}
