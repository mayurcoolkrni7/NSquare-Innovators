import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { BlurWords, Lines, Reveal, RollLabel } from "./motion.jsx";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Contact us", href: "#contact" },
];

// Same menu on every page. Off the home page, links go back to the home sections (/#about etc.).
function NavLink({ item, onClick }) {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return (
      <a className="nav-link" href={item.href} onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link className="nav-link" to={`/${item.href}`} onClick={onClick}>
      {item.label}
    </Link>
  );
}

// logoOnly: show just the logo (used on the PredictaX page).
export function Header({ logoOnly = false }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" aria-label="NSquare Innovators home">
          <img className="logo" src="/media/logo.png" alt="NSquare Innovators" />
        </Link>
        {!logoOnly && (
        <nav className="nav desktop">
          {NAV.map((n) => (
            <NavLink key={n.href} item={n} />
          ))}
        </nav>
        )}
        {!logoOnly && (
        <button
          className={`menu-btn ${open ? "open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
        )}
      </div>
      <AnimatePresence>
        {open && !logoOnly && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
          >
            <nav>
              {NAV.map((n) => (
                <NavLink key={n.href} item={n} onClick={() => setOpen(false)} />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <video src="/media/hero.mp4" autoPlay muted loop playsInline preload="auto" />
      <div className="overlay" />
      <div className="container">
        <BlurWords
          as="h1"
          onLoad
          delay={0.2}
          lines={[[["Smarter Decisions,"]], [["Powered by AI", "accent"]]]}
        />
        <Reveal x={80} delay={0.4}>
          <a className="link-arrow" href="#contact">
            <span>Book Appointment</span>
            <img src="/arrow.svg" alt="" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section about" id="about">
      <Lines />
      <Reveal className="container" y={80}>
        <p className="bullet">About us</p>
        <div className="grid-3 details">
          <div className="col">
            <h2 className="h3">A Legacy of Experience and Trust</h2>
            <img className="title-img" src="/media/about-1.jpg" alt="Consultant with clients" />
          </div>
          <div className="col">
            <p className="body-text">
              For years, our team has built technology that solves real business problems. Now we bring
              that experience into AI products that are built to perform.
            </p>
            <div className="founder">
              <span className="sign">Nitesh Kankariya</span>
              <span className="rule" />
              <span className="role">CTO</span>
            </div>
            <div className="years">
              <strong>14+</strong>
              <span className="body-text">Years of experience</span>
            </div>
          </div>
          <div className="col">
            <img className="contact-img" src="/media/about-2.png" alt="Client consultation" />
            <a className="roll-btn" href="#contact">
              <RollLabel>Contact</RollLabel>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const PARTNERS = [
  ["whirlpool", "Whirlpool"],
  ["elevator-services", "Elevator Services Group"],
  ["lulu-exchange", "LuLu Exchange"],
  ["roha-tech", "Roha Tech"],
  ["maxus-coral", "Maxus Coral"],
  ["lg", "LG"],
  ["moonz", "Moonz"],
  ["ltimindtree", "LTIMindtree"],
].map(([file, name]) => ({ src: `/partners/${file}.png`, name }));

export function Partners() {
  // Two copies of the list make a seamless loop; speed = 70px/s like the original ticker.
  const loop = [...PARTNERS, ...PARTNERS];
  const duration = (PARTNERS.length * (200 + 40)) / 70;
  return (
    <section className="section ticker-section">
      <Lines />
      <div className="container">
        <BlurWords className="h2" lines={[[["Our Premium"]], [["Innovation Partners"]]]} />
        <div className="ticker">
          <div className="ticker-track" style={{ "--ticker-duration": `${duration}s` }}>
            {loop.map((p, i) => (
              <img key={i} src={p.src} alt={p.name} aria-hidden={i >= PARTNERS.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  { name: "PredictaX", img: "/media/product-predictax.jpg", to: "/predictaX", alt: "PredictaX – AI demand forecasting" },
  { name: "GenieHire", img: "/media/product-geniehire.png", href: "https://geniehire.ai/", alt: "GenieHire – AI recruitment automation", variant: "right" },
  { name: "Pass98", img: "/media/product-pass98.jpg", href: "https://www.pass98.com/", alt: "Pass98 – interview preparation" },
];

// Internal pages use the router; external products open their own sites.
function ProductLink({ p, className, children }) {
  return p.to ? (
    <Link className={className} to={p.to}>
      {children}
    </Link>
  ) : (
    <a className={className} href={p.href}>
      {children}
    </a>
  );
}

export function Products() {
  return (
    <section className="section products" id="products">
      <Lines />
      <div className="container">
        <BlurWords className="h2" lines={[[["Our AI Power House"]]]} />
        <div className="cards">
          {PRODUCTS.map((p) => (
            <article key={p.name} className={`product-card ${p.variant || ""}`}>
              <ProductLink p={p} className="img-wrap">
                <img src={p.img} alt={p.alt} loading="lazy" />
              </ProductLink>
              <div className="meta">
                <h3 className="h3">
                  <ProductLink p={p}>{p.name}</ProductLink>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
