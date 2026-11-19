import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BlurWords, FlipButton, Reveal } from './motion'
import { comparison, engines, layers, links, problems, reasons, stats, steps } from '../data'

/* ───────── Hero ───────── */
export function Hero() {
  return (
    <section className="pxp-hero">
      <video className="hero__video" src="/media/px/hero.mp4" autoPlay muted loop playsInline />
      <div className="hero__overlay" />
      <div className="hero__content">
        <BlurWords className="hero__title" text="Stop Running Your Business On Last Month's Data." />
      </div>
      <Reveal x={80} y={0} delay={0.4} className="hero__link-wrap">
        <a href={links.contact} className="hero__link">
          <span>Predicta-X-Automotive</span>
          <img src="/arrow.svg" alt="" width="24" height="24" />
        </a>
      </Reveal>
    </section>
  )
}

/* ───────── Stats ───────── */
export function Stats() {
  return (
    <section className="stats">
      <h2 className="stats__title">Powering Enterprise Decisions At</h2>
      <div className="stats__grid">
        {stats.map(([n, label], i) => (
          <Reveal key={n} y={50} delay={i * 0.1} className="stat">
            <div className="stat__num">{n}</div>
            <p className="stat__label">{label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ───────── Sticky text + card list (Problem / AI Engine) ───────── */
function SplitSection({ eyebrow, title, body, cards, reverse }) {
  return (
    <section className={`split ${reverse ? 'split--reverse' : ''}`}>
      <div className="split__container">
        <div className="split__text">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="split__title">{title}</h2>
          </Reveal>
          <Reveal>
            <p className="split__body">{body}</p>
          </Reveal>
          <Reveal className="split__btn">
            <FlipButton href={links.contact}>Get in touch</FlipButton>
          </Reveal>
        </div>
        <div className="split__cards">
          {cards.map(([h, p]) => (
            <Reveal key={h} className="problem-card">
              <h3>{h}</h3>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Problem() {
  return (
    <SplitSection
      eyebrow="THE PROBLEM"
      title={<>Your Business Is <br />Generating Data. <br />Not Decisions.</>}
      body="Every enterprise produces enormous amounts of data — sales records, customer history, inventory logs, market signals. But most leadership teams are still making AED 100M decisions based on last quarter's spreadsheet.  The gap between data and action is where your margin leaks. PredictaX closes that gap."
      cards={problems}
    />
  )
}

export function Engine() {
  return (
    <SplitSection
      reverse
      eyebrow="AI ENGINE"
      title={<>Built on Proven, <br />Production-Grade AI</>}
      body="Not a black box. Every model is explainable, configurable, and calibrated to your data, not a generic benchmark dataset."
      cards={engines}
    />
  )
}

/* ───────── Sticky stacking layer cards ───────── */
export function Layers() {
  return (
    <section className="layers">
      <div className="layers__container">
        <div className="layers__head">
          <h2 className="h-poppins">One Platform. <span className="orange">Three Business Layers.</span></h2>
          <p className="sub-poppins">No 12-month implementation. No rip-and-replace. Prove value on your data first, then scale.</p>
        </div>
        <div className="layers__stack">
          {layers.map(([h, p], i) => (
            <div key={h} className="layers__row" style={{ '--col': i }}>
              <article className="layer-card">
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── Stacked step carousel ───────── */
export function Steps() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = steps.length
  const go = (d) => setActive((a) => (a + d + n) % n)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 4000)
    return () => clearInterval(t)
  }, [paused, active])

  const stateFor = (i) => {
    if (i === active) return { y: 0, scale: 1, opacity: 1, zIndex: 3 }
    if (i === (active + 1) % n) return { y: 40, scale: 0.92, opacity: 0.5, zIndex: 1 }
    return { y: -40, scale: 0.92, opacity: 0.5, zIndex: 2 }
  }

  return (
    <section className="steps">
      <h2 className="h-poppins">Start Fast. <span className="orange">Scale with Confidence.</span></h2>
      <p className="sub-poppins">No 12-month implementation. No rip-and-replace. Prove value on your data first, then scale.</p>
      <div className="steps__carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="steps__deck">
          {steps.map(([label, title, body], i) => {
            const s = stateFor(i)
            return (
              <motion.div
                key={label}
                className="step-card"
                animate={{ y: s.y, scale: s.scale, opacity: s.opacity }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                style={{ zIndex: s.zIndex, pointerEvents: i === active ? 'auto' : 'none' }}
              >
                <div className="step-card__content">
                  <p className="step-card__label">{label}</p>
                  <h3>{title}</h3>
                  <p className="step-card__body">{body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
        <div className="steps__nav">
          <button aria-label="Previous step" onClick={() => go(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 19 5 12 12 5" /><line x1="19" y1="12" x2="5" y2="12" /></svg>
          </button>
          <button aria-label="Next step" onClick={() => go(1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 5 19 12 12 19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ───────── Before vs After ───────── */
export function Comparison() {
  return (
    <section className="compare">
      <h2 className="h-poppins">Before PredictaX <span className="orange-2">vs After PredictaX</span></h2>
      <p className="sub-poppins compare__sub">If your team has used Einstein Bots before, this question will come up. Here is a clear comparison.</p>
      <Reveal className="compare__box">
        <div className="compare__inner">
          <div className="compare__light" />
          <div className="compare__head">
            <h3 className="compare__without">Without PredictaX</h3>
            <div className="compare__vs"><img src="/media/px/compare-icon.png" alt="" /></div>
            <h3 className="compare__with">With PredictaX</h3>
          </div>
          <div className="compare__rows">
            {comparison.map(([a, b]) => (
              <div key={a} className="compare__row">
                <div className="compare__cell compare__cell--left">
                  <img className="compare__lines" src="/media/px/background-lines.svg" alt="" />
                  <img src="/media/px/icon-without.svg" alt="" width="24" height="24" />
                  <span>{a}</span>
                </div>
                <div className="compare__cell compare__cell--right">
                  <div className="compare__glow" />
                  <div className="compare__bar" />
                  <img src="/media/px/icon-with.svg" alt="" width="24" height="24" />
                  <span>{b}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ───────── Decision engine grid ───────── */
export function Decision() {
  return (
    <section className="decision">
      <h2 className="h-poppins">Not a Reporting Tool.<br /><span className="orange">A Decision Engine.</span></h2>
      <p className="sub-poppins decision__sub">There's no shortage of dashboards. PredictaX is different, it tells you what's going to happen, why it's happening, and exactly what to do about it.</p>
      <div className="decision__grid">
        {reasons.map(([h, p], i) => (
          <Reveal key={h} delay={(i % 3) * 0.08} className="reason-card">
            <span className="reason-card__hl" />
            <h3>{h}</h3>
            <span className="reason-card__sep" />
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ───────── CTA ───────── */
export function CTA() {
  return (
    <section className="cta-wrap">
      <Reveal className="cta">
        <h2>See Predicta-x-<span className="orange">Automotive</span></h2>
        <p>30 minutes. We connect to your data and show you your demand forecast, lead scores and inventory gaps, live. No slides. No pitch. Just intelligence.</p>
        <a className="cta__btn" href={links.automotive}>Predicta-x-Automotive</a>
        <div className="cta__glow" />
      </Reveal>
    </section>
  )
}
