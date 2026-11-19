import { footerLinks, links, socials } from '../data'

const Phone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
)
const Mail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
)

export default function Footer() {
  return (
    <footer className="pxp-footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__left">
            <a href={links.home}><img className="footer__logo" src="/media/px/badge-partners.png" alt="NSquare" /></a>
            <nav className="footer__links">
              {footerLinks.map(([n, h]) => <a key={n} href={h}>{n}</a>)}
            </nav>
            <p className="footer__social-title">Connect on Social</p>
            <nav className="footer__links">
              {socials.map(([n, h]) => <a key={n} href={h} target="_blank" rel="noreferrer">{n}</a>)}
            </nav>
          </div>
          <div className="footer__contact">
            <a href="tel:+12146134891" className="footer__pill"><Phone /> +1 (214) 613 4891</a>
            <a href="mailto:info@nsquarexperts.com" className="footer__pill"><Mail /> info@nsquarexperts.com</a>
          </div>
          <img className="footer__badges" src="/media/px/badge-cert.png" alt="Salesforce Ridge Partner, Microsoft Partner, CMMI Level 5, ISO 27001:2013" />
        </div>
        <div className="footer__line" />
        <div className="footer__bottom">
          <span>© 2026 NSquare Xperts | All Rights Reserved</span>
          <span>United States | United Kingdom | Singapore | UAE | India</span>
        </div>
      </div>
    </footer>
  )
}
