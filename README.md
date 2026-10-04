# ValidaAI — AI-Powered Startup Validation & Market Intelligence Platform

A high-performance, single-page React (Vite + Tailwind CSS) application designed to evaluate startup ideas, simulate market dynamics, calculate multi-variable viability scores, and synthesize investor-grade market dossiers in seconds.

---

## ⚡ 2-Step Quickstart

Run these two commands from the project directory:

```bash
# 1. Install dependencies
npm install

# 2. Launch development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌟 Key Features

1. **Modern Tech-Startup Design System**
   - Sleek dark aesthetic with glassmorphism cards and emerald/cyan gradient accents.
   - Fully responsive layout with sticky header, input console, and dynamic results viewport.
   - Built with Tailwind CSS and Lucide icons.

2. **Smart Startup Evaluation Engine**
   - **Offline Neural Simulator (Default):** Zero configuration, instant response times, contextual evaluation across AI SaaS, FinTech, HealthTech, EdTech, E-Commerce, DevTools, and CleanTech.
   - **Live LLM Ready:** Seamlessly connect to Google Gemini (`gemini-1.5-flash`, `gemini-1.5-pro`) or OpenAI (`gpt-4o-mini`, `gpt-4o`) with your API key stored strictly in your browser's `localStorage`.

3. **Multi-Step Progress Visualizer**
   - Interactive 5-stage progress animation simulating market TAM analysis, competitive scanning, SWOT synthesis, viability scoring, and roadmap generation.

4. **Comprehensive Venture Intelligence Output**
   - **Viability Score Radial Gauge:** 0-100 score with dynamic tier badges (*High Potential*, *Promising Niche*, *Needs Strategic Pivot*).
   - **4 Diagnostic Pillar Bars:** Market Demand & TAM, Competitive Defensibility, Execution Feasibility, and Monetization Potential.
   - **4-Quadrant Strategic SWOT Matrix:** Strengths, Weaknesses, Opportunities, and Threats with severity/impact badges.
   - **Ideal Customer Profile (ICP) Card:** Persona title, archetype, burning pain point quote, willingness to pay, and acquisition channels.
   - **Competitor Landscape & White Space:** Top incumbents, competitor vulnerabilities, and our startup's unfair advantage.
   - **Interactive 90-Day Founder Roadmap:** Checkable 3-phase milestone execution plan with real-time completion tracking.

5. **Export & Sharing Tools**
   - One-click copy formatted Markdown memo (ready for Notion, Pitch Decks, or GitHub).
   - Download raw machine-readable JSON report.
   - Print-ready PDF report view.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **Effects:** Canvas Confetti

---

## 📂 Project Structure

```
startup-validator/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── services/
    │   └── validationService.js       # Offline simulation engine & Gemini/OpenAI caller
    └── components/
        ├── Header.jsx                # Sticky navigation, engine switcher, presets
        ├── InputPanel.jsx            # Pitch inputs, industry pills, sample presets
        ├── ValidationProgress.jsx    # Multi-step animated progress loader
        ├── ViabilityScoreCard.jsx    # SVG radial score gauge, pillar bars & TAM
        ├── SwotMatrix.jsx            # 4-Quadrant responsive SWOT grid
        ├── PersonaAndCompetitors.jsx # ICP card & Competitor vulnerability matrix
        ├── RoadmapCard.jsx           # Checkable 90-day founder milestone checklist
        ├── ApiSettingsModal.jsx      # API key configuration & engine toggle modal
        └── ExportModal.jsx           # Markdown, JSON, and PDF export tools
```
