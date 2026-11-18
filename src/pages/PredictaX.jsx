import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import "@fontsource/google-sans/400.css";
import "@fontsource/google-sans/500.css";
import "@fontsource/google-sans/600.css";
import "@fontsource/google-sans/700.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/600.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/inter/600.css";
import "../predictax.css";

const SITE = "https://www.nsquarexperts.com";
const CONTACT = `${SITE}/contact-us`;
const ease = [0.44, 0, 0.56, 1];

const EXPERTISE = [
  {
    title: "Business Applications",
    links: [
      ["Dynamics 365", "/expertise/dynamics-365-customer-service-consulting"],
      ["Salesforce", "/expertise/salesforce-cloud-services"],
      ["SAP", "/certified-dynamics-365-finance-operations-consultants-helping-usa-businesses-streamline-finance-supply-chain-operations.-get-a-free-consultation."],
      ["Oracle", "/expertise/oracle-consulting-services"],
      ["Dynamics-365-F&O", "/expertise/sap-consulting-services"],
    ],
  },
  {
    title: "Workflow Automation",
    links: [
      ["ServiceNow", "/expertise/servicenow-consulting-services"],
      ["Microsoft Power Platform", "/expertise/microsoft-power-platform-services-usa"],
    ],
  },
  {
    title: "AI Capabilities",
    links: [
      ["AI Consulting", "/ai-labs"],
      ["Copilot", "/expertise/microsoft-copilot-consulting-services-usa"],
      ["Agentforce", "/expertise/agentforce-implementation-consulting-services-texas-usa"],
    ],
  },
];

const PRODUCTS_MENU = [
  ["WhatsAppDynamics", `${SITE}/products/whatsapp-integration-services`],
  ["FIESA", "https://fiesa.app/"],
  ["Care Analytic Pro", `${SITE}/products/care-analytics`],
  ["Call Integra", `${SITE}/products/call-integra-integration-with-crm`],
  ["Predicta X", "/products/predicta-x"],
];

/* ---------- small building blocks ---------- */
function FadeUp({ children, className, delay = 0, as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </Tag>
  );
}

function PillButton({ href, children }) {
  return (
    <a className="px-pill" href={href}>
      <span className="px-roll">
        <span>{children}</span>
        <span>{children}</span>
      </span>
    </a>
  );
}

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- header ---------- */
function PxHeader() {
  const [menu, setMenu] = useState(null); // "expertise" | "products" | null
  const [mobile, setMobile] = useState(false);
  const panel = { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.2 } };

  return (
    <header className="px-header" onMouseLeave={() => setMenu(null)}>
      <div className="px-wrap px-header-inner">
        <Link to="/" aria-label="Back to NSquare Innovators">
          <img className="px-logo" src="/media/px/logo.png" alt="NSquare" />
        </Link>

        <nav className="px-nav">
          <a href={`${SITE}/about-nsquare-xperts`} onMouseEnter={() => setMenu(null)}>Who We Are</a>
          <button onMouseEnter={() => setMenu("expertise")} onClick={() => setMenu(menu === "expertise" ? null : "expertise")}>
            Expertise <Chevron />
          </button>
          <button onMouseEnter={() => setMenu("products")} onClick={() => setMenu(menu === "products" ? null : "products")}>
            Products <Chevron />
          </button>
          <a href={`${SITE}/industries-we-serve`} onMouseEnter={() => setMenu(null)}>Industries</a>
          <a href={`${SITE}/careers-at-nsquare-xperts`} onMouseEnter={() => setMenu(null)}>Careers</a>

          <AnimatePresence>
            {menu === "expertise" && (
              <motion.div className="px-dropdown px-dropdown-wide" {...panel}>
                {EXPERTISE.map((col) => (
                  <div key={col.title} className="px-dd-col">
                    <p className="px-dd-title">{col.title}</p>
                    {col.links.map(([label, path]) => (
                      <a key={label} href={SITE + path}>{label}</a>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}
            {menu === "products" && (
              <motion.div className="px-dropdown px-dropdown-products" {...panel}>
                <div className="px-dd-col">
                  <p className="px-dd-title">Products</p>
                  {PRODUCTS_MENU.map(([label, href]) =>
                    href.startsWith("/") ? (
                      <Link key={label} to={href} onClick={() => setMenu(null)}>{label}</Link>
                    ) : (
                      <a key={label} href={href}>{label}</a>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <a className="px-talk" href={CONTACT}>
          <span className="px-roll">
            <span>Let's Talk</span>
            <span>Let's Talk</span>
          </span>
        </a>

        <button className={`px-burger ${mobile ? "open" : ""}`} aria-label="Menu" onClick={() => setMobile((m) => !m)}>
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.nav
            className="px-mobile"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <a href={`${SITE}/about-nsquare-xperts`}>Who We Are</a>
            <p className="px-dd-title">Expertise</p>
            {EXPERTISE.flatMap((c) => c.links).map(([label, path]) => (
              <a key={label} className="px-sub" href={SITE + path}>{label}</a>
            ))}
            <p className="px-dd-title">Products</p>
            {PRODUCTS_MENU.map(([label, href]) =>
              href.startsWith("/") ? (
                <Link key={label} className="px-sub" to={href} onClick={() => setMobile(false)}>{label}</Link>
              ) : (
                <a key={label} className="px-sub" href={href}>{label}</a>
              )
            )}
            <a href={`${SITE}/industries-we-serve`}>Industries</a>
            <a href={`${SITE}/careers-at-nsquare-xperts`}>Careers</a>
            <a className="px-talk" href={CONTACT}>Let's Talk</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- hero + stats ---------- */
function Hero() {
  return (
    <section className="px-hero">
      <video src="/media/px/hero.mp4" autoPlay muted loop playsInline />
      <div className="px-wrap px-hero-inner">
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
        >
          Stop Running Your Business On Last Month's Data.
        </motion.h1>
        <motion.a
          className="px-arrow-link"
          href={CONTACT}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
        >
          <span>Predicta-X-Automotive</span>
          <img src="/arrow.svg" alt="" />
        </motion.a>
      </div>
    </section>
  );
}

const STATS = [
  ["8", "AI modules in one unified decision platform"],
  ["83%", "Demand forecast accuracy with Prophet AI model"],
  ["3", "Business layers, Strategic, Operational, Sales"],
  ["30min", "Free live demo on your actual data. No pitch. Just insight."],
];

function Stats() {
  return (
    <section className="px-stats px-wrap">
      <FadeUp as="h2" className="px-stats-title">Powering Enterprise Decisions At</FadeUp>
      <div className="px-stats-grid">
        {STATS.map(([n, label], i) => (
          <FadeUp key={n} className="px-stat" delay={i * 0.1}>
            <strong>{n}</strong>
            <p>{label}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------- sticky split sections ---------- */
const PROBLEMS = [
  ["Demand Blind Spots", "Your team can't see what's coming — they react to demand after it peaks. You're always one step behind, overstocked on the wrong products and understocked on the right ones."],
  ["Wasted Sales Effort", "Your sales team pursues leads in the wrong order, without knowing which prospects are actually ready to convert. High-value opportunities go cold while low-intent leads are chased."],
  ["Inventory Without Intelligence", "Stock decisions are made on gut feel and last month's numbers. The result: capital locked in slow-moving inventory and stockouts costing you deals in peak periods."],
  ["Market Shifts Catch You Off-Guard", "Regulation changes, economic shifts, competitive moves — your strategy reacts weeks after they happen. You need to model scenarios before the market moves, not after."],
];

const ENGINES = [
  ["Prophet — Time-Series Forecasting", "Handles trend, seasonality (weekly + yearly), outliers and irregular events. Forecast any time-horizon from 30 to 365 days with configurable confidence bounds."],
  ["K-Means — Customer Clustering", "Groups customers into distinct behavioral segments based on income, engagement, purchase history, and product affinity. Enables hyper-targeted marketing and sales allocation."],
  ["SHAP — Explainable Lead Scoring", "Predictive model scores each lead 0–100 for conversion probability. SHAP values break down exactly which inputs push the score up or down — so your team knows what to act on."],
  ["Scenario Simulation Engine", "Multi-variable impact modelling. Change any business or economic variable and see the forecasted impact — percentage change, absolute unit shift, baseline vs simulated curve."],
];

function Split({ label, title, text, cards, reverse }) {
  return (
    <section className={`px-split px-wrap ${reverse ? "reverse" : ""}`}>
      <div className="px-split-text">
        <div className="px-sticky">
          <p className="px-label">{label}</p>
          <h2 className="px-h2">{title}</h2>
          <p className="px-lead">{text}</p>
          <PillButton href={CONTACT}>Get in touch</PillButton>
        </div>
      </div>
      <div className="px-split-cards">
        {cards.map(([t, d]) => (
          <FadeUp key={t} className="px-card">
            <h3>{t}</h3>
            <p>{d}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------- three business layers (scroll driven) ---------- */
const LAYERS = [
  ["Strategic Layer", "Empowers leadership with market trend analysis, 90–365 day demand forecasting, and intelligent budget allocation."],
  ["Operational Layer", "Optimizes day-to-day logistics through inventory gap detection, reorder alerts, and supply chain signal generation."],
  ["Sales Layer", "Drives revenue by utilizing 0–100 lead scoring, customer segmentation, and actionable closing recommendations."],
  ["Unified System", "Connects high-level strategy, mid-level operations, and front-line sales into a single data-driven business framework."],
];

function LayerCard({ layer, i, progress }) {
  const start = 0.1 + i * 0.17;
  const y = useTransform(progress, [start, start + 0.2], [320, i * 8]);
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  return (
    <motion.div className="px-layer" style={{ y, opacity }}>
      <h3>{layer[0]}</h3>
      <p>{layer[1]}</p>
    </motion.div>
  );
}

function Layers() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="px-layers" ref={ref}>
      <div className="px-layers-sticky">
        <div className="px-wrap">
          <h2 className="px-title">
            One Platform. <span>Three Business Layers.</span>
          </h2>
          <p className="px-sub-title">No 12-month implementation. No rip-and-replace. Prove value on your data first, then scale.</p>
          <div className="px-layer-row">
            {LAYERS.map((l, i) => (
              <LayerCard key={l[0]} layer={l} i={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- steps carousel ---------- */
const STEPS = [
  ["Step 1", "POC — Validate", "We connect to your data and run PredictaX on it. You see forecast accuracy, lead scores, and inventory gaps against your actual business numbers — before any commitment."],
  ["Step 2", "Build — Tailor", "Platform configured to your data schema, product taxonomy, customer model, and regional structure. Every module calibrated to your business — not a generic template."],
  ["Step 3", "Scale — Expand", "Enterprise-grade deployment across business units, regions and teams. Model lifecycle management, continuous retraining, and ongoing refinement as your data grows."],
];

function Steps() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d) => {
    setDir(d);
    setIndex((i) => (i + d + STEPS.length) % STEPS.length);
  };
  const step = STEPS[index];
  return (
    <section className="px-steps px-wrap">
      <FadeUp>
        <h2 className="px-title">
          Start Fast. <span>Scale with Confidence.</span>
        </h2>
        <p className="px-sub-title">No 12-month implementation. No rip-and-replace. Prove value on your data first, then scale.</p>
      </FadeUp>
      <div className="px-step-stack">
        <div className="px-step-back" aria-hidden="true" />
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={index}
            className="px-step"
            custom={dir}
            variants={{
              enter: (d) => ({ opacity: 0, x: d * 80, scale: 0.96 }),
              center: { opacity: 1, x: 0, scale: 1 },
              exit: (d) => ({ opacity: 0, x: d * -80, scale: 0.96 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease }}
          >
            <p className="px-step-num">{step[0]}</p>
            <h3>{step[1]}</h3>
            <p className="px-step-text">{step[2]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="px-step-nav">
        <button aria-label="Previous step" onClick={() => go(-1)}>←</button>
        <button aria-label="Next step" onClick={() => go(1)}>→</button>
      </div>
    </section>
  );
}

/* ---------- comparison ---------- */
const COMPARE = [
  ["Decisions made on last quarter's reports", "Real-time intelligence with forward-looking forecasts"],
  ["Sales team pursues leads in arrival order", "Every lead ranked 0–100 by close probability, daily"],
  ["Inventory ordered on gut feel and past sales", "Demand-driven stocking — 30 to 365 day foresight"],
  ["All customers treated with the same message", "AI-segmented personas — right message to right buyer"],
];

function Compare() {
  return (
    <section className="px-compare px-wrap">
      <FadeUp>
        <h2 className="px-title">
          Before PredictaX <span>vs After PredictaX</span>
        </h2>
        <p className="px-sub-title narrow">If your team has used Einstein Bots before, this question will come up. Here is a clear comparison.</p>
      </FadeUp>
      <FadeUp className="px-compare-box">
        <div className="px-compare-head">
          <h3>Without PredictaX</h3>
          <img src="/media/px/compare-icon.png" alt="" />
          <h3 className="with">With PredictaX</h3>
        </div>
        {COMPARE.map(([a, b]) => (
          <div key={a} className="px-compare-row">
            <div className="px-without">
              <img src="/media/px/icon-without.svg" alt="" />
              <span>{a}</span>
            </div>
            <div className="px-with">
              <img src="/media/px/icon-with.svg" alt="" />
              <span>{b}</span>
            </div>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}

/* ---------- decision engine ---------- */
const REASONS = [
  ["Predictive, Not Descriptive", "Every other BI tool shows you what happened. PredictaX shows you what's going to happen — and gives your team time to act before the market moves."],
  ["Explainable AI, Not a Black Box", "SHAP explainability means your team sees the reasoning behind every score, not just a number. Decision-ready outputs, not data that needs another analyst to interpret."],
  ["The Only Scenario Simulator", "Model the impact of pricing changes, policy shifts, inflation, supply disruption, before they happen. This capability doesn't exist in any competing platform at this price point."],
  ["Sector-Configurable, Not Generic", "One platform adapts to automotive, real estate, retail, finance and beyond. Every AI model, data pipeline and dashboard calibrates to your industry's data and KPIs."],
  ["POC in Weeks, Not Months", "Start with a time-boxed proof of concept on your real data. See forecast accuracy and lead scores before you commit. Low risk, demonstrable value, fast time-to-insight."],
  ["Backed by NSquare Xperts", "200+ enterprise technology experts. Microsoft Solution Partner. Salesforce Ridge Partner. Applied AI engineering combined with deep platform delivery experience across global enterprises."],
];

function DecisionEngine() {
  return (
    <section className="px-engine">
      <div className="px-wrap">
        <FadeUp>
          <h2 className="px-title stacked">
            Not a Reporting Tool.
            <br />
            <span>A Decision Engine.</span>
          </h2>
          <p className="px-sub-title">
            There's no shortage of dashboards. PredictaX is different, it tells you what's going to happen, why it's
            happening, and exactly what to do about it.
          </p>
        </FadeUp>
        <div className="px-engine-grid">
          {REASONS.map(([t, d], i) => (
            <FadeUp key={t} className="px-reason" delay={(i % 3) * 0.08}>
              <h3>{t}</h3>
              <p>{d}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- final CTA + footer ---------- */
function FinalCTA() {
  return (
    <section className="px-wrap">
      <FadeUp className="px-final">
        <h2>
          See Predicta-x-<span>Automotive</span>
        </h2>
        <p>30 minutes. We connect to your data and show you your demand forecast, lead scores and inventory gaps, live. No slides. No pitch. Just intelligence.</p>
        <PillButton href={`${SITE}/predicta-x-automotive`}>Predicta-x-Automotive</PillButton>
      </FadeUp>
    </section>
  );
}

function PxFooter() {
  return (
    <footer className="px-footer">
      <div className="px-wrap">
        <div className="px-footer-top">
          <div>
            <Link to="/">
              <img className="px-footer-logo" src="/media/px/logo.png" alt="NSquare" />
            </Link>
            <nav className="px-footer-links">
              <Link to="/">Home</Link>
              <a href={`${SITE}/about-nsquare-xperts`}>Who We Are</a>
              <a href={SITE}>Products</a>
              <a href={`${SITE}/industries-we-serve`}>Industries</a>
              <a href={`${SITE}/blogs`}>Blogs</a>
              <a href={`${SITE}/privacy-policy`}>Privacy</a>
            </nav>
            <p className="px-social-title">Connect on Social</p>
            <nav className="px-footer-links">
              <a href="https://www.linkedin.com/company/nsquare-xperts/posts/?feedView=all" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/nsquarexpertstech/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/NSquarexperts" target="_blank" rel="noopener noreferrer">Meta</a>
            </nav>
          </div>
          <div className="px-contact-boxes">
            <a href="tel:+12146134891">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" stroke="#808080" strokeWidth="1.6" strokeLinejoin="round" /></svg>
              +1 (214) 613 4891
            </a>
            <a href="mailto:info@nsquarexperts.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#808080" strokeWidth="1.6" /><path d="m3 7 9 6 9-6" stroke="#808080" strokeWidth="1.6" /></svg>
              info@nsquarexperts.com
            </a>
          </div>
          <div className="px-badges">
            <img src="/media/px/badge-partners.png" alt="Salesforce Ridge Partner and Microsoft Partner" />
            <img src="/media/px/badge-cert.png" alt="CMMI Level 5 and ISO certified" />
          </div>
        </div>
        <div className="px-footer-bottom">
          <p>© {new Date().getFullYear()} NSquare Xperts | All Rights Reserved</p>
          <p>United States | United Kingdom | Singapore | UAE | India</p>
        </div>
      </div>
    </footer>
  );
}

export default function PredictaXPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "PredictaX | AI Demand Forecasting – NSquare";
    return () => {
      document.title = prev;
    };
  }, []);
  return (
    <div className="px-page">
      <PxHeader />
      <main>
        <Hero />
        <Stats />
        <Split
          label="THE PROBLEM"
          title={<>Your Business Is Generating Data.<br />Not Decisions.</>}
          text="Every enterprise produces enormous amounts of data — sales records, customer history, inventory logs, market signals. But most leadership teams are still making AED 100M decisions based on last quarter's spreadsheet.  The gap between data and action is where your margin leaks. PredictaX closes that gap."
          cards={PROBLEMS}
        />
        <Split
          reverse
          label="AI ENGINE"
          title="Built on Proven, Production-Grade AI"
          text="Not a black box. Every model is explainable, configurable, and calibrated to your data, not a generic benchmark dataset."
          cards={ENGINES}
        />
        <Layers />
        <Steps />
        <Compare />
        <DecisionEngine />
        <FinalCTA />
      </main>
      <PxFooter />
    </div>
  );
}
