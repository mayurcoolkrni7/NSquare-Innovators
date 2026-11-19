const SITE = 'https://www.nsquarexperts.com'

export const links = {
  home: `${SITE}/`,
  about: `${SITE}/about-nsquare-xperts`,
  industries: `${SITE}/industries-we-serve`,
  careers: `${SITE}/careers-at-nsquare-xperts`,
  contact: `${SITE}/contact-us`,
  blogs: `${SITE}/blogs`,
  privacy: `${SITE}/privacy-policy`,
  automotive: `${SITE}/predicta-x-automotive`,
}

export const expertiseMenu = [
  {
    title: 'Business Applications',
    href: `${SITE}/expertise/business-applications`,
    items: [
      ['Dynamics 365', `${SITE}/expertise/dynamics-365-customer-service-consulting`],
      ['Salesforce', `${SITE}/expertise/salesforce-cloud-services`],
      ['SAP', `${SITE}/certified-dynamics-365-finance-operations-consultants-helping-usa-businesses-streamline-finance-supply-chain-operations.-get-a-free-consultation.`],
      ['Oracle', `${SITE}/expertise/oracle-consulting-services`],
      ['Dynamics-365-F&O', `${SITE}/expertise/sap-consulting-services`],
    ],
  },
  {
    title: 'Workflow Automation',
    href: `${SITE}/expertise/microsoft-power-platform-services-usa`,
    items: [
      ['ServiceNow', `${SITE}/expertise/servicenow-consulting-services`],
      ['Microsoft Power Platform', `${SITE}/expertise/microsoft-power-platform-services-usa`],
    ],
  },
  {
    title: 'AI Capabilities',
    href: `${SITE}/ai-labs`,
    items: [
      ['AI Consulting', `${SITE}/ai-labs`],
      ['Copilot', `${SITE}/expertise/microsoft-copilot-consulting-services-usa`],
      ['Agentforce', `${SITE}/expertise/agentforce-implementation-consulting-services-texas-usa`],
    ],
  },
]

export const productsMenu = [
  ['WhatsAppDynamics', `${SITE}/products/whatsapp-integration-services`],
  ['FIESA', 'https://fiesa.app/'],
  ['Care Analytic Pro', `${SITE}/products/care-analytics`],
  ['Call Integra', `${SITE}/products/call-integra-integration-with-crm`],
  ['Predicta X', '/predictaX'],
]

export const stats = [
  ['8', 'AI modules in one unified decision platform'],
  ['83%', 'Demand forecast accuracy with Prophet AI model'],
  ['3', 'Business layers, Strategic, Operational, Sales'],
  ['30min', 'Free live demo on your actual data. No pitch. Just insight.'],
]

export const problems = [
  ['Demand Blind Spots', "Your team can't see what's coming — they react to demand after it peaks. You're always one step behind, overstocked on the wrong products and understocked on the right ones."],
  ['Wasted Sales Effort', 'Your sales team pursues leads in the wrong order, without knowing which prospects are actually ready to convert. High-value opportunities go cold while low-intent leads are chased.'],
  ['Inventory Without Intelligence', "Stock decisions are made on gut feel and last month's numbers. The result: capital locked in slow-moving inventory and stockouts costing you deals in peak periods."],
  ['Market Shifts Catch You Off-Guard', 'Regulation changes, economic shifts, competitive moves — your strategy reacts weeks after they happen. You need to model scenarios before the market moves, not after.'],
]

export const engines = [
  ['Prophet — Time-Series Forecasting', 'Handles trend, seasonality (weekly + yearly), outliers and irregular events. Forecast any time-horizon from 30 to 365 days with configurable confidence bounds.'],
  ['K-Means — Customer Clustering', 'Groups customers into distinct behavioral segments based on income, engagement, purchase history, and product affinity. Enables hyper-targeted marketing and sales allocation.'],
  ['SHAP — Explainable Lead Scoring', 'Predictive model scores each lead 0–100 for conversion probability. SHAP values break down exactly which inputs push the score up or down — so your team knows what to act on.'],
  ['Scenario Simulation Engine', 'Multi-variable impact modelling. Change any business or economic variable and see the forecasted impact — percentage change, absolute unit shift, baseline vs simulated curve.'],
]

export const layers = [
  ['Strategic Layer', 'Empowers leadership with market trend analysis, 90–365 day demand forecasting, and intelligent budget allocation.'],
  ['Operational Layer', 'Optimizes day-to-day logistics through inventory gap detection, reorder alerts, and supply chain signal generation.'],
  ['Sales Layer', 'Drives revenue by utilizing 0–100 lead scoring, customer segmentation, and actionable closing recommendations.'],
  ['Unified System', 'Connects high-level strategy, mid-level operations, and front-line sales into a single data-driven business framework.'],
]

export const steps = [
  ['Step 1', 'POC — Validate', 'We connect to your data and run PredictaX on it. You see forecast accuracy, lead scores, and inventory gaps against your actual business numbers — before any commitment.'],
  ['Step 2', 'Build — Tailor', 'Platform configured to your data schema, product taxonomy, customer model, and regional structure. Every module calibrated to your business — not a generic template.'],
  ['Step 3', 'Scale — Expand', 'Enterprise-grade deployment across business units, regions and teams. Model lifecycle management, continuous retraining, and ongoing refinement as your data grows.'],
]

export const comparison = [
  ["Decisions made on last quarter's reports", 'Real-time intelligence with forward-looking forecasts'],
  ['Sales team pursues leads in arrival order', 'Every lead ranked 0–100 by close probability, daily'],
  ['Inventory ordered on gut feel and past sales', 'Demand-driven stocking — 30 to 365 day foresight'],
  ['All customers treated with the same message', 'AI-segmented personas — right message to right buyer'],
]

export const reasons = [
  ['Predictive, Not Descriptive', 'Every other BI tool shows you what happened. PredictaX shows you what\'s going to happen — and gives your team time to act before the market moves.'],
  ['Explainable AI, Not a Black Box', 'SHAP explainability means your team sees the reasoning behind every score, not just a number. Decision-ready outputs, not data that needs another analyst to interpret.'],
  ['The Only Scenario Simulator', "Model the impact of pricing changes, policy shifts, inflation, supply disruption, before they happen. This capability doesn't exist in any competing platform at this price point."],
  ['Sector-Configurable, Not Generic', "One platform adapts to automotive, real estate, retail, finance and beyond. Every AI model, data pipeline and dashboard calibrates to your industry's data and KPIs."],
  ['POC in Weeks, Not Months', 'Start with a time-boxed proof of concept on your real data. See forecast accuracy and lead scores before you commit. Low risk, demonstrable value, fast time-to-insight.'],
  ['Backed by NSquare Xperts', '200+ enterprise technology experts. Microsoft Solution Partner. Salesforce Ridge Partner. Applied AI engineering combined with deep platform delivery experience across global enterprises.'],
]

export const footerLinks = [
  ['Home', links.home],
  ['Who We Are', links.about],
  ['Products', links.home],
  ['Industries', links.industries],
  ['Blogs', links.blogs],
  ['Privacy', links.privacy],
]

export const socials = [
  ['LinkedIn', 'https://www.linkedin.com/company/nsquare-xperts/'],
  ['Instagram', 'https://www.instagram.com/nsquarexpertstech/'],
  ['Meta', 'https://www.facebook.com/NSquarexperts'],
]
