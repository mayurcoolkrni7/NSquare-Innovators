import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { expertiseMenu, productsMenu, links } from '../data'
import { FlipButton } from './motion'

const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const dropAnim = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
}

function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="nav__drop" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="nav__link" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {label} <Chevron />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="nav__menu" {...dropAnim}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="pxp-nav">
      <a href={links.home} className="nav__logo" aria-label="NSquare home">
        <img src="/media/px/logo.png" alt="NSquare" />
      </a>

      <nav className="nav__links">
        <a className="nav__link" href={links.about}>Who We Are</a>
        <Dropdown label="Expertise">
          <div className="nav__menu-cols">
            {expertiseMenu.map((col) => (
              <div key={col.title} className="nav__menu-col">
                <a className="nav__menu-title" href={col.href}>{col.title}</a>
                {col.items.map(([name, href]) => (
                  <a key={name} className="nav__menu-item" href={href}>{name}</a>
                ))}
              </div>
            ))}
          </div>
        </Dropdown>
        <Dropdown label="Products">
          <div className="nav__menu-col">
            <span className="nav__menu-title">Products</span>
            {productsMenu.map(([name, href]) => (
              <a key={name} className="nav__menu-item" href={href}>{name}</a>
            ))}
          </div>
        </Dropdown>
        <a className="nav__link" href={links.industries}>Industries</a>
        <a className="nav__link" href={links.careers}>Careers</a>
      </nav>

      <FlipButton href={links.contact} variant="white" className="nav__cta">Let's Talk</FlipButton>

      <button className="nav__burger" aria-label="Menu" onClick={() => setMobileOpen((o) => !o)}>
        <span className={mobileOpen ? 'pxp-open' : ''} />
        <span className={mobileOpen ? 'pxp-open' : ''} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <a href={links.about}>Who We Are</a>
            <span className="nav__mobile-title">Expertise</span>
            {expertiseMenu.flatMap((c) => c.items).map(([n, h]) => (
              <a key={n} href={h} className="sub">{n}</a>
            ))}
            <span className="nav__mobile-title">Products</span>
            {productsMenu.map(([n, h]) => (
              <a key={n} href={h} className="sub">{n}</a>
            ))}
            <a href={links.industries}>Industries</a>
            <a href={links.careers}>Careers</a>
            <FlipButton href={links.contact} variant="white">Let's Talk</FlipButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
