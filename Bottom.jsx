import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { BlurWords, Lines, Reveal, RollLabel } from "./motion.jsx";

const spring = { type: "spring", bounce: 0, duration: 0.9 };

/** true once the top of `ref` has scrolled above `fraction` of the viewport height. */
function usePassed(ref, fraction) {
  const [passed, setPassed] = useState(false);
  useEffect(() => {
    const check = () => {
      if (!ref.current) return;
      setPassed(ref.current.getBoundingClientRect().top < window.innerHeight * fraction);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [ref, fraction]);
  return passed;
}

/* ---------------- Why choose us ---------------- */
const FACTS = [
  { title: "1,000+ CV, Ranked in One Afternoon", text: "Every CV Scored Against Your Criteria, Not Keywords.", offset: 80 },
  { title: "800+ Mock Interviews Completed", text: "Students Walk Into Placements Knowing Exactly What To Fix.", offset: 120 },
  { title: "83% Demand Forecast Accuracy", text: "Leaders Plan Stock And Sales Around What’s Coming Next.", offset: 160 },
];

function Fact({ fact, triggerRef }) {
  // Card sits lower until its scroll trigger reaches the middle of the screen.
  const active = usePassed(triggerRef, 0.5);
  return (
    <motion.div
      className="fact"
      initial={false}
      animate={{ y: active ? 0 : fact.offset }}
      transition={spring}
    >
      <motion.div
        className="bar"
        initial={{ opacity: 0, y: -80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={spring}
      >
        <img src="/dot.svg" alt="" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={spring}
      >
        <h4>{fact.title}</h4>
        <p>{fact.text}</p>
      </motion.div>
    </motion.div>
  );
}

export function WhyChooseUs() {
  const t1 = useRef(null);
  const t2 = useRef(null);
  const t3 = useRef(null);
  const triggers = [t1, t2, t3];
  return (
    <section className="section why">
      <Lines />
      <div className="container">
        <div className="track">
          <div className="sticky">
            <div className="title">
              <p className="bullet">Why Choose Us</p>
              <BlurWords className="h2" lines={[[["Trusted by"]], [["Drivers Worldwide"]]]} />
            </div>
            <div className="grid-3 facts">
              {FACTS.map((f, i) => (
                <Fact key={f.title} fact={f} triggerRef={triggers[i]} />
              ))}
            </div>
          </div>
          <div className="triggers" aria-hidden="true">
            {triggers.map((r, i) => (
              <div key={i} ref={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
export function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.6 });
  const scale = useTransform(progress, [0, 1], [1.8, 1]);
  const y = useTransform(progress, [0, 1], [-100, 0]);
  const cardY = useTransform(progress, [0, 1], [426, 0]);

  return (
    <section className="section cta-section">
      <Lines />
      <div className="container">
        <div className="cta-box" ref={ref}>
          <motion.div className="cta-media" style={{ scale, y, transformPerspective: 1200 }}>
            <video src="/media/cta.mp4" autoPlay muted loop playsInline preload="metadata" />
            <motion.div className="cta-card" style={{ y: cardY, transformPerspective: 1200 }}>
              <h2 className="h2">{"Your Next\nBig Decision\nStarts With AI"}</h2>
              <p>Book A Demo And Discover How Our AI Helps You Decide Faster And Smarter.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
const TESTIMONIALS = [
  {
    name: "Lucas Dubois",
    role: "Automotive Enthusiast",
    avatar: "/media/avatar-lucas.png",
    quote: "“I Purchased My Dream Car Here And The Entire Process Was Seamless. From Consultation To Delivery, Every Step Felt Premium.”",
    from: { opacity: 0, rotateX: 35, rotateY: -45, rotateZ: -12, scale: 0.9, x: 121, y: 77 },
  },
  {
    name: "Matteo Rossi",
    role: "Business Owner",
    avatar: "/media/avatar-matteo.jpg",
    quote: "\"From Browsing The Inventory To Final Delivery, The Process Was Seamless. Their Team Truly Understands Luxury Vehicles And Customer Service.\"",
    from: { opacity: 0, rotateX: 50, rotateY: -20, rotateZ: -15, scale: 0.5, x: 71, y: 106 },
    right: true,
  },
];

function TestimonialCard({ t, triggerRef }) {
  const active = usePassed(triggerRef, 0.9);
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 809px)").matches;
  const show = { opacity: 1, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, x: 0, y: 0 };
  return (
    <motion.div
      className={`testimonial ${t.right ? "right" : ""}`}
      initial={t.from}
      animate={isMobile || active ? show : t.from}
      transition={{ type: "spring", bounce: 0.1, duration: 1 }}
    >
      <div>
        <img className="avatar" src={t.avatar} alt={t.name} loading="lazy" />
        <p className="name">{t.name}</p>
        <p className="role">{t.role}</p>
      </div>
      <p className="quote">{t.quote}</p>
    </motion.div>
  );
}

export function Testimonials() {
  const t1 = useRef(null);
  const t2 = useRef(null);
  return (
    <section className="section testimonials">
      <Lines />
      <div className="container">
        <div className="track">
          <div className="grid-3 cards-wrap">
            <TestimonialCard t={TESTIMONIALS[0]} triggerRef={t1} />
            <TestimonialCard t={TESTIMONIALS[1]} triggerRef={t2} />
          </div>
          <div className="triggers" aria-hidden="true">
            <div ref={t1} />
            <div ref={t2} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const EMAIL = "contact@nsquareinnovators.com";

export function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (!ENDPOINT) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Free Consultation Request")}&body=${encodeURIComponent(body)}`;
      setStatus("done");
      return;
    }
    try {
      setStatus("sending");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      e.target.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const label =
    status === "sending" ? "Sending…" : status === "done" ? "Thank You!" : "Request A Free Consultation";

  return (
    <section className="section contact" id="contact">
      <Lines />
      <div className="container">
        <div className="grid-3">
          <BlurWords className="h2" lines={[[["Ready"]], [["for Your"]], [["Next Drive?"]]]} />
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" placeholder="Enter your full name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" placeholder="Enter your email address" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <button className="roll-btn solid" type="submit" disabled={status === "sending"}>
              <RollLabel>{label}</RollLabel>
            </button>
            {status === "error" && (
              <p className="form-status">Something went wrong. Please email us at {EMAIL}.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <BlurWords as="h2" className="wordmark" lines={[[["INNOVATORS"]]]} />
          <div className="divider" />
          <Reveal className="info" y={80}>
            <div className="col">
              <h5>Location</h5>
              <a href="https://google.com/maps" target="_blank" rel="noopener noreferrer">
                India, 511, World Trade Center
              </a>
              <a href="https://google.com/maps" target="_blank" rel="noopener noreferrer">
                Kharadi, Pune
              </a>
            </div>
            <div className="col">
              <h5>Sales</h5>
              <a href={`mailto:${EMAIL}`} target="_blank" rel="noopener noreferrer">
                {EMAIL}
              </a>
            </div>
          </Reveal>
          <Reveal className="copyright" y={40}>
            © {new Date().getFullYear()} NSquare Innovators | All Rights Reserved
          </Reveal>
        </div>
      </footer>
    </>
  );
}
