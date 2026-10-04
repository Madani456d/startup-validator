/**
 * ValidaAI - Smart Evaluation Engine & LLM Service Layer
 * Supports:
 *  1. Intelligent Offline Simulation (Rule & keyword-aware contextual synthesis)
 *  2. Live Google Gemini API (Direct REST endpoint, zero SDK required)
 *  3. Live OpenAI API (Chat completions endpoint)
 */

export const INDUSTRIES = [
  { id: 'ai_saas', label: 'AI SaaS', icon: 'Bot', description: 'Enterprise & vertical AI software' },
  { id: 'fintech', label: 'FinTech', icon: 'Coins', description: 'Payments, wealth, crypto & banking' },
  { id: 'healthtech', label: 'HealthTech', icon: 'Activity', description: 'Telehealth, biotech & clinical workflows' },
  { id: 'edtech', label: 'EdTech', icon: 'GraduationCap', description: 'E-learning, upskilling & pedagogy' },
  { id: 'ecommerce', label: 'E-Commerce', icon: 'ShoppingCart', description: 'Direct-to-consumer, marketplaces & retail tech' },
  { id: 'devtools', label: 'DevTools', icon: 'Code', description: 'Infrastructure, CLI, observability & APIs' },
  { id: 'cleantech', label: 'CleanTech', icon: 'Leaf', description: 'Carbon accounting, solar & sustainability' },
];

export const PRESET_STARTUPS = [
  {
    name: "DocuSense AI",
    pitch: "Automated legal contract auditor that flags non-standard liability clauses, missing indemnities, and regulatory GDPR/SOC2 compliance risks in seconds for mid-market CFOs.",
    industry: "ai_saas",
    targetAudience: "B2B Mid-Market Legal & Finance teams",
    monetization: "Monthly Tiered Subscription ($199 - $899/mo)"
  },
  {
    name: "NanoLedger",
    pitch: "Instant cross-border micro-invoicing protocol enabling freelance developers in emerging markets to get paid in stablecoins with automatic local tax deduction.",
    industry: "fintech",
    targetAudience: "Global Freelancers & Remote Web3 Agencies",
    monetization: "0.75% transaction fee + $15/mo Pro tier"
  },
  {
    name: "TriagePulse",
    pitch: "Pediatric remote patient intake bot integrating with parent wearables to pre-screen fever spikes and reduce unnecessary ER visits by 40%.",
    industry: "healthtech",
    targetAudience: "Working Parents & Pediatric Clinics",
    monetization: "B2B Clinic Licensing + $9.99/mo per parent"
  },
  {
    name: "SkillGraph",
    pitch: "Adaptive coding interview simulator that grades engineers on real Git pull requests, architectural trade-offs, and communication rather than LeetCode puzzles.",
    industry: "edtech",
    targetAudience: "Software Engineers & Tech Hiring Managers",
    monetization: "$49/month candidate pass + Enterprise seat licenses"
  },
  {
    name: "CartRescue",
    pitch: "AI agent for Shopify stores that identifies intent drop-offs in real-time and opens an interactive, personalized WhatsApp bargaining assistant.",
    industry: "ecommerce",
    targetAudience: "Shopify Store Owners with $20k-$200k GMV",
    monetization: "Performance-based: 2% of recovered cart revenue"
  }
];

export const STEPS_CONFIG = [
  { id: 'market', text: 'Analyzing market trends & TAM dynamics...', icon: 'BarChart3' },
  { id: 'competition', text: 'Scanning competitive landscape & moat risks...', icon: 'Target' },
  { id: 'swot', text: 'Synthesizing 4-quadrant SWOT matrix...', icon: 'Layers' },
  { id: 'scoring', text: 'Calculating weighted viability score & customer persona...', icon: 'Cpu' },
  { id: 'roadmap', text: 'Assembling 90-day actionable founder roadmap...', icon: 'Milestone' }
];

/**
 * Storage helpers for API Keys & engine preferences
 */
export const getApiConfig = () => {
  try {
    const raw = localStorage.getItem('valida_api_config');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse api config', e);
  }
  return {
    engine: 'mock', // 'mock' | 'gemini' | 'openai'
    geminiKey: '',
    openaiKey: '',
    geminiModel: 'gemini-1.5-flash',
    openaiModel: 'gpt-4o-mini'
  };
};

export const saveApiConfig = (config) => {
  localStorage.setItem('valida_api_config', JSON.stringify(config));
};

/**
 * Intelligent Rule-Based Contextual Mock Generator
 */
export const generateContextualMockReport = (startupData) => {
  const { name = "Unnamed Venture", pitch = "", industry = "ai_saas", targetAudience = "", monetization = "" } = startupData;
  const lowerPitch = pitch.toLowerCase();
  const lowerName = name.toLowerCase();

  // Industry specific insights database
  const industryKnowledge = {
    ai_saas: {
      tam: "$85B+ Vertical AI & Agent Market (CAGR 34%)",
      cagr: "34.2%",
      regulatoryRisk: "Moderate (EU AI Act & Data Privacy compliance)",
      competitors: [
        { name: "Dust.tt / Copy.ai", flaw: "Broad non-specialized generalists; lacks domain depth" },
        { name: "Legacy ERP / SAP Plugins", flaw: "Clunky UX, slow onboarding, rigid pricing models" },
        { name: "Internal Custom LLM Wrappers", flaw: "High ongoing prompt-engineering maintenance and hallucinations" }
      ],
      persona: {
        role: "VP of Operations / Head of Product",
        archetype: "Enterprise Efficiency Maximizer",
        pain: "Drowning in repetitive manual workflows and disjointed SaaS point solutions.",
        budget: "$250 - $1,200 / month",
        channels: ["LinkedIn InMail", "Substack / Hacker News", "Product Hunt", "Enterprise Pilot POCs"]
      },
      moatCandidate: "Proprietary fine-tuned workflow orchestration & domain-specific system prompts with tight workflow integration."
    },
    fintech: {
      tam: "$310B Global Digital Payments & Embedded Finance",
      cagr: "21.5%",
      regulatoryRisk: "High (KYC/AML, FinCEN, PCI-DSS compliance)",
      competitors: [
        { name: "Stripe / Plaid APIs", flaw: "Complex developer overhead for non-technical small business owners" },
        { name: "Wise / Revolut Business", flaw: "Generic business accounts without automated micro-reconciliation" },
        { name: "Traditional Merchant Banks", flaw: "Hidden exchange fees, 3-5 day settlement latency" }
      ],
      persona: {
        role: "Cross-border Contractor / Agency Principal",
        archetype: "Frictionless Money Mover",
        pain: "Losing 4-7% in remittance fees, conversion markups, and delayed bank wires.",
        budget: "0.5% - 1.5% fee or $29 - $99 / month",
        channels: ["Upwork / Freelance Subreddits", "FinTech podcasts", "Twitter / X Indie Hackers", "Direct Referral Loops"]
      },
      moatCandidate: "Regulatory compliance shielding + automated zero-click bank ledger syncing."
    },
    healthtech: {
      tam: "$280B Digital Health & Remote Triage (CAGR 18.8%)",
      cagr: "18.8%",
      regulatoryRisk: "Critical (HIPAA, FDA Software-as-a-Medical-Device, SOC2 Type II)",
      competitors: [
        { name: "Teladoc / Amwell", flaw: "Expensive, sluggish scheduling queue, poor user-facing mobile UX" },
        { name: "Epic MyChart Triage", flaw: "Legacy institutional UI with fragmented EHR export capabilities" },
        { name: "Generic symptom-checker apps (WebMD)", flaw: "High anxiety induction with zero clinical follow-through" }
      ],
      persona: {
        role: "Clinical Director / Worried Caregiver",
        archetype: "Safety-First Triage Decider",
        pain: "Long clinic wait times causing patient churn and medical staff burnout.",
        budget: "$150/mo per provider or $12/mo patient subscription",
        channels: ["Medical Association Conferences", "Healthcare LinkedIn Groups", "Pediatrician referrals", "SEO Symptom Intent"]
      },
      moatCandidate: "Clinical protocol accuracy backed by IRB-validated physician advisory boards."
    },
    edtech: {
      tam: "$145B Continuing Education & Upskilling Market",
      cagr: "16.1%",
      regulatoryRisk: "Low to Moderate (Student data privacy COPPA/FERPA)",
      competitors: [
        { name: "Coursera / Udemy", flaw: "Dismal 8-12% course completion rates and static non-interactive videos" },
        { name: "Bootcamps (General Assembly)", flaw: "Prohibitive upfront tuition ($15k+) with outdated curriculum" },
        { name: "YouTube Tutorials", flaw: "Zero accountability, no verified portfolio feedback, high fragmentation" }
      ],
      persona: {
        role: "Mid-level Professional Seeking Promotion",
        archetype: "High-Intent Skill Upskiller",
        pain: "Feeling stuck in career without proof of hands-on production experience.",
        budget: "$39 - $129 / month",
        channels: ["YouTube Creator Partnerships", "Tech Discord Communities", "TikTok/Reels micro-tutorials", "Alumni referral bonuses"]
      },
      moatCandidate: "Interactive peer-reviewed proof of competency and personalized feedback loops."
    },
    ecommerce: {
      tam: "$450B Retail Tech & Social Commerce Infrastructure",
      cagr: "14.4%",
      regulatoryRisk: "Low (Consumer protection & FTC disclosures)",
      competitors: [
        { name: "Klaviyo / Omnisend", flaw: "Email/SMS fatigue leads to unopens; lacks real-time interactive negotiation" },
        { name: "Shopify Inbox Default", flaw: "Basic rule-based bot without predictive margin or inventory incentives" },
        { name: "Gorgias Support Bot", flaw: "Focused on ticketing customer service rather than proactive conversion" }
      ],
      persona: {
        role: "D2C Brand Founder / Head of Growth",
        archetype: "CAC-Optimization Obsessive",
        pain: "Skyrocketing Meta/TikTok ad costs eroding gross margins with 70%+ abandoned carts.",
        budget: "Rev-share (1.5-3%) or $79 - $350 / month",
        channels: ["Shopify App Store SEO", "Twitter/X DTC Influencers", "Agency Partnerships", "E-commerce masterminds"]
      },
      moatCandidate: "Zero-latency checkout cart integration with dynamic personalized pricing elasticity."
    },
    devtools: {
      tam: "$70B Developer Tooling & Cloud Observability",
      cagr: "22.7%",
      regulatoryRisk: "Low (Standard open-source licenses & SOC2)",
      competitors: [
        { name: "Datadog / New Relic", flaw: "Skyrocketing unpredictable invoice shock and cumbersome instrumentation" },
        { name: "GitHub Actions ecosystem", flaw: "Fragmented yaml configuration nightmare with slow pipeline debugging" },
        { name: "In-house bash scripts", flaw: "Fragile, zero documentation, breaks on staff departures" }
      ],
      persona: {
        role: "Staff Infrastructure / Platform Engineer",
        archetype: "Friction-Hating Builder",
        pain: "Spending 20% of weekly sprint hours fixing CI/CD pipeline flake and broken dependencies.",
        budget: "$40/dev seat or usage tier",
        channels: ["GitHub Trending", "Hacker News Show HN", "Reddit r/programming", "Self-hosted CLI open-source adoption"]
      },
      moatCandidate: "Open-source developer mindshare and lightning-fast developer experience (DX)."
    },
    cleantech: {
      tam: "$65B Climate Tech & Carbon Intelligence",
      cagr: "28.5%",
      regulatoryRisk: "High (SEC Climate Disclosure & European CSRD mandates)",
      competitors: [
        { name: "Watershed / Persefoni", flaw: "Enterprise-only $50k+ contracts; inaccessible to SMB supply chains" },
        { name: "Manual Excel Consultants", flaw: "Slow 6-month audits prone to human arithmetic errors" },
        { name: "Greenwashing label badges", flaw: "Lack of verifiable audit trails and telemetry" }
      ],
      persona: {
        role: "Sustainability Director / Supply Chain Officer",
        archetype: "Mandate Compliance Officer",
        pain: "Struggling to collect verified Scope 3 carbon emissions data from hundreds of tier-2 suppliers.",
        budget: "$500 - $3,000 / month",
        channels: ["ESG Conferences", "B-Corp Communities", "Supply Chain Association Webinars", "Mandate deadline press"]
      },
      moatCandidate: "Automated ERP invoice data ingestion with cryptographic audit-ready telemetry."
    }
  };

  const domain = industryKnowledge[industry] || industryKnowledge.ai_saas;

  // Keyword score modulations
  let baseScore = 72;
  const isSpecific = pitch.length > 50;
  if (isSpecific) baseScore += 5;
  if (lowerPitch.includes("ai") || lowerPitch.includes("agent") || lowerPitch.includes("automate")) baseScore += 4;
  if (lowerPitch.includes("api") || lowerPitch.includes("integration") || lowerPitch.includes("workflow")) baseScore += 3;
  if (lowerPitch.includes("cost") || lowerPitch.includes("margin") || lowerPitch.includes("revenue") || lowerPitch.includes("save")) baseScore += 4;
  if (lowerPitch.includes("b2b") || lowerPitch.includes("enterprise") || lowerPitch.includes("teams")) baseScore += 3;
  
  // High risk flags
  if (lowerPitch.includes("blockchain") && industry !== 'fintech') baseScore -= 6;
  if (lowerPitch.includes("social network") || lowerPitch.includes("everyone")) baseScore -= 7;

  // Cap between 60 and 94 for realistic realism
  const score = Math.min(Math.max(baseScore, 62), 94);

  // Submetrics
  const demandScore = Math.min(98, score + Math.floor(Math.random() * 6) - 2);
  const moatScore = Math.min(95, Math.max(55, score - 6 + Math.floor(Math.random() * 8)));
  const feasibilityScore = Math.min(96, score + 4 - Math.floor(Math.random() * 6));
  const monetizationScore = Math.min(95, score + 2 - Math.floor(Math.random() * 5));

  // Determine viability tier
  let verdictTier = "High Potential";
  let verdictColor = "emerald";
  let verdictDescription = "Strong market tailwinds and clear customer ROI. Recommend aggressive customer discovery and rapid prototype testing.";
  
  if (score < 70) {
    verdictTier = "Needs Strategic Pivot";
    verdictColor = "amber";
    verdictDescription = "High competitive density or ambiguous target wedge. Narrow down to an underserved niche before building full MVP.";
  } else if (score < 80) {
    verdictTier = "Promising Niche";
    verdictColor = "blue";
    verdictDescription = "Defensible problem statement. Focus heavily on distribution advantage and lowering initial customer acquisition costs.";
  }

  return {
    startupName: name,
    pitch,
    industry,
    industryLabel: INDUSTRIES.find(i => i.id === industry)?.label || industry,
    generatedAt: new Date().toISOString(),
    overallScore: score,
    verdict: {
      tier: verdictTier,
      color: verdictColor,
      summary: verdictDescription,
      recommendation: score >= 80 ? "Greenlight for rapid smoke testing and prototype build." : "Interview 15 target buyers before committing capital to engineering."
    },
    metrics: [
      { label: "Market Demand & TAM", score: demandScore, benchmark: "High Growth", description: "Interest and expansion rate in this specific category" },
      { label: "Competitive Defensibility", score: moatScore, benchmark: moatScore > 75 ? "Defensible" : "Vulnerable to Copiers", description: "Moat durability against fast followers and incumbents" },
      { label: "Execution Feasibility", score: feasibilityScore, benchmark: "Achievable", description: "Technical and operational complexity for a lean founder team" },
      { label: "Monetization Potential", score: monetizationScore, benchmark: "High LTV/CAC", description: "Customer willingness to pay and clear monetization mechanism" }
    ],
    marketContext: {
      tam: domain.tam,
      cagr: domain.cagr,
      regulatoryRisk: domain.regulatoryRisk,
      suggestedPricing: monetization || domain.persona.budget
    },
    swot: {
      strengths: [
        { text: `High targeted specificity solving an acute friction point for ${targetAudience || domain.persona.role}.`, impact: "High" },
        { text: `Lean delivery model with low marginal cost per additional transaction or user.`, impact: "Critical" },
        { text: `Fast time-to-value compared to legacy, heavy enterprise suites.`, impact: "Medium" }
      ],
      weaknesses: [
        { text: `Initial lack of proprietary distribution channels requiring founders to generate outbound momentum.`, impact: "High" },
        { text: `Risk of feature bloat before establishing single core value proposition.`, impact: "Medium" },
        { text: `Customer switching costs may be low until workflow data locking is established.`, impact: "Medium" }
      ],
      opportunities: [
        { text: `Rapid growth of ${domain.cagr} category driving buyers actively seeking modern alternatives.`, impact: "Critical" },
        { text: `Potential to expand horizontally into adjacent department workflows once initial beachhead is secured.`, impact: "High" },
        { text: `Partnership integration with ecosystem players for organic merchant/user acquisition.`, impact: "High" }
      ],
      threats: [
        { text: `Existing incumbents bundling comparable feature sets into existing enterprise agreements.`, impact: "High" },
        { text: `Rapid shifts in foundational AI API capabilities that could commoditize standalone UI wrappers.`, impact: "Critical" },
        { text: `Platform dependency risk if relying heavily on third-party APIs with changing terms of service.`, impact: "Medium" }
      ]
    },
    targetPersona: {
      role: targetAudience || domain.persona.role,
      archetype: domain.persona.archetype,
      painPoint: domain.persona.pain,
      willingnessToPay: monetization || domain.persona.budget,
      channels: domain.persona.channels
    },
    competitorLandscape: {
      competitors: domain.competitors,
      ourUnfairAdvantage: domain.moatCandidate,
      defensibilityLevel: moatScore > 75 ? "High / Data Moat" : "Moderate / Speed Moat"
    },
    executionRoadmap: [
      {
        phase: "Phase 1: Validation & Problem-Solution Fit",
        timeline: "Days 1 - 30",
        objective: "Confirm buyer intent with pre-commitments before writing production code.",
        tasks: [
          { title: "Conduct 20 Discovery Interviews", detail: `Reach out to 50+ ${domain.persona.role} profiles; validate that the current pain point costs them >$500/mo or 10+ hrs/wk.`, done: false },
          { title: "Launch Smoke Test Landing Page", detail: `Deploy a 1-page site with clear value proposition, pricing tiers, and an interactive lead capture waitlist.`, done: false },
          { title: "Secure 3-5 Letters of Intent (LOIs)", detail: `Get written commitments or refundable $50 deposits to test actual purchasing friction.`, done: false }
        ]
      },
      {
        phase: "Phase 2: Lean MVP & Alpha User Cohort",
        timeline: "Days 31 - 60",
        objective: "Ship the bare-minimum core loop that delivers instant 'Aha!' moment.",
        tasks: [
          { title: "Build Single-Feature MVP", detail: `Focus solely on the core workflow: solve one problem 10x better and 5x faster than competitors.`, done: false },
          { title: "Onboard First 10 Hand-Picked Alphas", detail: `Perform high-touch 'concierge' onboarding to monitor drop-off and collect telemetry directly.`, done: false },
          { title: "Iterate Weekly on Core Retention Loop", detail: `Track Daily/Weekly Active usage; iterate until weekly retention reaches >40%.`, done: false }
        ]
      },
      {
        phase: "Phase 3: Monetization & Scaled Distribution",
        timeline: "Days 61 - 90",
        objective: "Implement self-serve billing and systematically scale customer acquisition channels.",
        tasks: [
          { title: "Turn On Paid Subscriptions / Invoicing", detail: `Convert alpha users to paid accounts. Offer 20% annual discount incentives to frontload working capital.`, done: false },
          { title: "Scale Top-Performing Acquisition Loop", detail: `Double down on the single channel that drove 80% of alpha signups (SEO, LinkedIn outbound, or Creator affiliate).`, done: false },
          { title: "Establish Moat & Data Network Effects", detail: `Implement proprietary fine-tuning or proprietary workflow presets to build lasting defensibility.`, done: false }
        ]
      }
    ]
  };
};

/**
 * Live Google Gemini API Integration (Direct REST endpoint, zero SDK needed)
 */
async function callGeminiApi(startupData, apiKey, model = 'gemini-1.5-flash') {
  const prompt = `You are a world-class venture capitalist, market analyst, and startup validation engine.
Evaluate the following startup concept thoroughly and output strictly valid JSON matching the specified schema.

Startup Information:
- Name: ${startupData.name}
- Industry: ${startupData.industry}
- Pitch: ${startupData.pitch}
- Target Audience: ${startupData.targetAudience || 'General Industry Buyers'}
- Monetization Strategy: ${startupData.monetization || 'SaaS Subscription'}

Output JSON must follow this exact structure without markdown backticks:
{
  "startupName": "${startupData.name}",
  "pitch": "${startupData.pitch}",
  "industry": "${startupData.industry}",
  "industryLabel": "${startupData.industry}",
  "overallScore": 82, // integer 0-100
  "verdict": {
    "tier": "High Potential" // or "Promising Niche" or "Needs Strategic Pivot",
    "color": "emerald" // or "blue" or "amber",
    "summary": "1-2 sentence executive summary of the evaluation.",
    "recommendation": "Key next action for founders."
  },
  "metrics": [
    { "label": "Market Demand & TAM", "score": 85, "benchmark": "High Growth", "description": "Market size and interest" },
    { "label": "Competitive Defensibility", "score": 75, "benchmark": "Defensible", "description": "Moat and copycat defense" },
    { "label": "Execution Feasibility", "score": 88, "benchmark": "Achievable", "description": "Technical build viability" },
    { "label": "Monetization Potential", "score": 80, "benchmark": "High LTV/CAC", "description": "Willingness to pay and margins" }
  ],
  "marketContext": {
    "tam": "$50B+ Vertical Market (CAGR 25%)",
    "cagr": "25%",
    "regulatoryRisk": "Low to Moderate",
    "suggestedPricing": "$49 - $299/mo"
  },
  "swot": {
    "strengths": [{ "text": "Strength 1", "impact": "High" }, { "text": "Strength 2", "impact": "Critical" }, { "text": "Strength 3", "impact": "Medium" }],
    "weaknesses": [{ "text": "Weakness 1", "impact": "High" }, { "text": "Weakness 2", "impact": "Medium" }, { "text": "Weakness 3", "impact": "Medium" }],
    "opportunities": [{ "text": "Opportunity 1", "impact": "Critical" }, { "text": "Opportunity 2", "impact": "High" }, { "text": "Opportunity 3", "impact": "High" }],
    "threats": [{ "text": "Threat 1", "impact": "High" }, { "text": "Threat 2", "impact": "Critical" }, { "text": "Threat 3", "impact": "Medium" }]
  },
  "targetPersona": {
    "role": "Target Customer Title",
    "archetype": "Archetype Name",
    "painPoint": "Detailed description of their core problem.",
    "willingnessToPay": "Pricing range",
    "channels": ["Channel 1", "Channel 2", "Channel 3", "Channel 4"]
  },
  "competitorLandscape": {
    "competitors": [
      { "name": "Competitor 1", "flaw": "Key flaw or gap" },
      { "name": "Competitor 2", "flaw": "Key flaw or gap" },
      { "name": "Competitor 3", "flaw": "Key flaw or gap" }
    ],
    "ourUnfairAdvantage": "What creates defensibility for this startup.",
    "defensibilityLevel": "High / Data Moat"
  },
  "executionRoadmap": [
    {
      "phase": "Phase 1: Validation & Problem-Solution Fit",
      "timeline": "Days 1 - 30",
      "objective": "Objective statement",
      "tasks": [
        { "title": "Task 1", "detail": "Task detail", "done": false },
        { "title": "Task 2", "detail": "Task detail", "done": false },
        { "title": "Task 3", "detail": "Task detail", "done": false }
      ]
    },
    {
      "phase": "Phase 2: Lean MVP & Alpha User Cohort",
      "timeline": "Days 31 - 60",
      "objective": "Objective statement",
      "tasks": [
        { "title": "Task 1", "detail": "Task detail", "done": false },
        { "title": "Task 2", "detail": "Task detail", "done": false },
        { "title": "Task 3", "detail": "Task detail", "done": false }
      ]
    },
    {
      "phase": "Phase 3: Monetization & Scaled Distribution",
      "timeline": "Days 61 - 90",
      "objective": "Objective statement",
      "tasks": [
        { "title": "Task 1", "detail": "Task detail", "done": false },
        { "title": "Task 2", "detail": "Task detail", "done": false },
        { "title": "Task 3", "detail": "Task detail", "done": false }
      ]
    }
  ]
}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini API");

  return JSON.parse(text);
}

/**
 * Live OpenAI API Integration
 */
async function callOpenAiApi(startupData, apiKey, model = 'gpt-4o-mini') {
  const prompt = `Evaluate this startup concept and return strictly JSON following the standard validation report schema:
Name: ${startupData.name}
Industry: ${startupData.industry}
Pitch: ${startupData.pitch}
Target Audience: ${startupData.targetAudience}
Monetization: ${startupData.monetization}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      response_format: { type: "json_object" },
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: "You are a Silicon Valley startup validator. Return a JSON object with overallScore (0-100), verdict {tier, color, summary, recommendation}, metrics array, marketContext, swot {strengths, weaknesses, opportunities, threats}, targetPersona, competitorLandscape, and executionRoadmap."
        },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  return JSON.parse(content);
}

/**
 * Main Evaluation Service Dispatcher
 * Allows caller to register step callbacks for smooth simulated multi-step loading UI
 */
export async function validateStartup(startupData, onProgressStep = null) {
  const config = getApiConfig();

  // Step progression helper for UX delight
  const runProgressSimulation = async () => {
    if (!onProgressStep) return;
    for (let i = 0; i < STEPS_CONFIG.length; i++) {
      onProgressStep(STEPS_CONFIG[i], i, STEPS_CONFIG.length);
      // Realistic cadence between 400ms - 600ms per step
      await new Promise(r => setTimeout(r, 480));
    }
  };

  if (config.engine === 'gemini' && config.geminiKey) {
    const progressPromise = runProgressSimulation();
    try {
      const [result] = await Promise.all([
        callGeminiApi(startupData, config.geminiKey, config.geminiModel),
        progressPromise
      ]);
      return { result, source: 'gemini' };
    } catch (err) {
      console.warn("Live Gemini API call failed, falling back to neural mock:", err);
      // Fallback seamlessly
      const mockResult = generateContextualMockReport(startupData);
      return { result: mockResult, source: 'mock_fallback', error: err.message };
    }
  }

  if (config.engine === 'openai' && config.openaiKey) {
    const progressPromise = runProgressSimulation();
    try {
      const [result] = await Promise.all([
        callOpenAiApi(startupData, config.openaiKey, config.openaiModel),
        progressPromise
      ]);
      return { result, source: 'openai' };
    } catch (err) {
      console.warn("Live OpenAI API call failed, falling back to neural mock:", err);
      const mockResult = generateContextualMockReport(startupData);
      return { result: mockResult, source: 'mock_fallback', error: err.message };
    }
  }

  // Default: Intelligent Mock Simulator
  await runProgressSimulation();
  const mockResult = generateContextualMockReport(startupData);
  return { result: mockResult, source: 'mock' };
}
